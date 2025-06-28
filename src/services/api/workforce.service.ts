
import { BaseApiService } from './base.service';
import { supabase } from '@/integrations/supabase/client';

// Define interfaces for the Workforce entities
export interface WorkforceProgram {
  id: string;
  title: string;
  description: string;
  program_type: string;
  status: 'active' | 'inactive' | 'planned';
  start_date?: string;
  end_date?: string;
  metrics?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface TrainingResource {
  id: string;
  title: string;
  description: string;
  resource_type: 'video' | 'document' | 'course' | 'webinar';
  url?: string;
  duration_minutes?: number;
  created_at?: string;
  updated_at?: string;
}

export interface WorkforceMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  unit: string;
  timestamp: string;
  category: string;
  target_value?: number;
  created_at?: string;
  updated_at?: string;
}

// Service classes for each entity type
export class WorkforceProgramsService extends BaseApiService<WorkforceProgram> {
  constructor() {
    super('ethical_sourcing_initiatives'); // Using this existing table
  }
  
  // Get active programs
  async getActivePrograms() {
    return this.getAll({
      filters: { status: 'active' },
      orderBy: { column: 'created_at', direction: 'desc' }
    });
  }
  
  // Get programs by type
  async getProgramsByType(programType: string) {
    return this.getAll({
      filters: { program_type: programType }
    });
  }
  
  // Create a program with metrics
  async createProgramWithMetrics(program: Partial<WorkforceProgram>, metrics: WorkforceMetric[]) {
    try {
      // Start a transaction
      const { data: programData, error: programError } = await supabase
        .from('ethical_sourcing_initiatives' as any)
        .insert(program)
        .select()
        .single();
        
      if (programError) throw programError;
      
      if (metrics.length > 0 && programData) {
        // Add program ID to each metric
        const metricsWithProgramId = metrics.map(metric => ({
          ...metric,
          program_id: (programData as any).id
        }));
        
        // Create metrics
        const { error: metricsError } = await supabase
          .from('ethical_impact_metrics' as any)
          .insert(metricsWithProgramId);
          
        if (metricsError) throw metricsError;
      }
      
      return programData as unknown as WorkforceProgram;
    } catch (error) {
      console.error('Error creating program with metrics:', error);
      throw error;
    }
  }
}

export class TrainingResourcesService extends BaseApiService<TrainingResource> {
  constructor() {
    super('training_resources'); 
  }
  
  // Get resources by type
  async getResourcesByType(resourceType: string) {
    return this.getAll({
      filters: { resource_type: resourceType }
    });
  }
  
  // Get featured resources
  async getFeaturedResources(limit = 5): Promise<{ data: TrainingResource[] }> {
    try {
      const { data, error } = await supabase
        .from('training_resources' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
        
      if (error) throw error;
      return { data: data as unknown as TrainingResource[] };
    } catch (error) {
      console.error('Error fetching featured training resources:', error);
      throw error;
    }
  }
}

export class WorkforceMetricsService extends BaseApiService<WorkforceMetric> {
  constructor() {
    super('ethical_impact_metrics');
  }
  
  // Get metrics by category
  async getMetricsByCategory(category: string) {
    return this.getAll({
      filters: { category },
      orderBy: { column: 'timestamp', direction: 'desc' }
    });
  }
  
  // Get metrics trend (time series data)
  async getMetricsTrend(metricName: string, timeRange: { start: string; end: string }): Promise<{ data: WorkforceMetric[] }> {
    try {
      const { data, error } = await supabase
        .from('ethical_impact_metrics' as any)
        .select('*')
        .eq('metric_name', metricName)
        .gte('timestamp', timeRange.start)
        .lte('timestamp', timeRange.end)
        .order('timestamp', { ascending: true });
        
      if (error) throw error;
      return { data: data as unknown as WorkforceMetric[] };
    } catch (error) {
      console.error(`Error fetching metrics trend for ${metricName}:`, error);
      throw error;
    }
  }
  
  // Compare metrics with targets
  async getMetricsWithTargetComparison(): Promise<{ data: WorkforceMetric[] }> {
    try {
      const { data, error } = await supabase
        .from('ethical_impact_metrics' as any)
        .select('*')
        .not('target_value', 'is', null)
        .order('timestamp', { ascending: false });
        
      if (error) throw error;
      
      // Calculate achievement percentage for each metric
      const enrichedData = data.map((metric: any) => ({
        ...metric,
        achievement_percentage: metric.target_value ? 
          (metric.metric_value / metric.target_value) * 100 : null
      })) as unknown as WorkforceMetric[];

      return { data: enrichedData };
    } catch (error) {
      console.error('Error fetching metrics with target comparison:', error);
      throw error;
    }
  }
}

// Export instances for easy use
export const workforceProgramsService = new WorkforceProgramsService();
export const trainingResourcesService = new TrainingResourcesService();
export const workforceMetricsService = new WorkforceMetricsService();
