
import { BaseApiService } from './base.service';
import { supabase } from '@/integrations/supabase/client';

// Define interfaces for the Platform Overview entities
export interface FeatureMetric {
  id: string;
  name: string;
  description?: string;
  value: number;
  change_percentage?: number;
  comparison_period?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  industry: string;
  impact_metrics: Record<string, any>;
  published_at?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  role: string;
  content: string;
  rating?: number;
  approved: boolean;
  created_at?: string;
  updated_at?: string;
}

// Service classes for each entity type
export class PlatformFeatureMetricsService extends BaseApiService<FeatureMetric> {
  constructor() {
    super('esg_metrics'); // Table name in Supabase
  }
  
  // Add any platform-specific methods here
  async getMetricsByCategory(category: string): Promise<FeatureMetric[]> {
    const result = await this.getAll({
      filters: { metric_type: category },
      orderBy: { column: 'created_at', direction: 'desc' }
    });
    return result.data;
  }
  
  async getTrendingMetrics(limit = 5): Promise<FeatureMetric[]> {
    const result = await this.getAll({
      limit,
      orderBy: { column: 'metric_value', direction: 'desc' }
    });
    return result.data;
  }
}

export class CaseStudiesService extends BaseApiService<CaseStudy> {
  constructor() {
    super('esg_reports'); // Using this table for case studies
  }
  
  // Get featured case studies
  async getFeaturedCaseStudies(): Promise<CaseStudy[]> {
    try {
      const { data, error } = await supabase
        .from('esg_reports' as any)
        .select('*')
        .eq('report_type', 'case_study')
        .order('published_at', { ascending: false })
        .limit(3);
        
      if (error) throw error;
      return data as unknown as CaseStudy[];
    } catch (error) {
      console.error('Error fetching featured case studies:', error);
      throw error;
    }
  }
  
  // Get case studies by industry
  async getCaseStudiesByIndustry(industry: string): Promise<CaseStudy[]> {
    const result = await this.getAll({
      filters: { 
        report_type: 'case_study',
        industry 
      }
    });
    return result.data;
  }
}

export class TestimonialsService extends BaseApiService<Testimonial> {
  constructor() {
    super('testimonials'); // You may need to create this table
  }
  
  // Get approved testimonials only
  async getApprovedTestimonials(): Promise<Testimonial[]> {
    const result = await this.getAll({
      filters: { approved: true },
      orderBy: { column: 'created_at', direction: 'desc' }
    });
    return result.data;
  }
}

// Export instances for easy use
export const platformMetricsService = new PlatformFeatureMetricsService();
export const caseStudiesService = new CaseStudiesService();
export const testimonialsService = new TestimonialsService();
