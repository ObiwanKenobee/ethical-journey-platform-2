
import { supabase } from '@/integrations/supabase/client';

export interface RiskZone {
  id: string;
  name: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  reported_at: string;
  // Database fields
  coordinates?: any;
  status?: string;
  timestamp?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export interface SupplierAssessment {
  id: string;
  supplier_name: string;
  compliance_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  last_assessed: string;
  // Database fields
  status?: string;
  last_audit_date?: string;
  next_audit_date?: string;
  risk_areas?: string[];
  certification_details?: any;
  contact_information?: any;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export interface EsgMetric {
  id: string;
  category: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  // Database fields
  metric_name?: string;
  metric_value?: number;
  metric_type?: string;
  source?: string;
  timestamp?: string;
  user_id?: string;
}

/**
 * Get risk zones
 */
export const getRiskZones = async (): Promise<{ data: RiskZone[]; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('risk_zones')
      .select('*')
      .order('risk_level', { ascending: false });

    if (error) throw error;

    // Map database fields to our interface
    const mappedData: RiskZone[] = data.map(item => ({
      id: item.id,
      name: item.location, // Use location as name
      risk_level: item.risk_level as 'low' | 'medium' | 'high' | 'critical',
      location: item.location,
      description: item.description,
      reported_at: item.timestamp, // Use timestamp as reported_at
      coordinates: item.coordinates,
      status: item.status,
      timestamp: item.timestamp,
      created_at: item.created_at,
      updated_at: item.updated_at,
      user_id: item.user_id
    }));

    return { data: mappedData, error: null };
  } catch (error) {
    console.error('Get risk zones error:', error);
    return { data: [], error: error as Error };
  }
};

/**
 * Get supplier assessments
 */
export const getSupplierAssessments = async (): Promise<{ data: SupplierAssessment[]; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('supplier_assessments')
      .select('*')
      .order('compliance_score', { ascending: true });

    if (error) throw error;

    // Map database fields to our interface
    const mappedData: SupplierAssessment[] = data.map(item => ({
      id: item.id,
      supplier_name: item.supplier_name,
      compliance_score: item.compliance_score,
      risk_level: determineRiskLevel(item.compliance_score),
      last_assessed: item.last_audit_date || new Date().toISOString(),
      status: item.status,
      last_audit_date: item.last_audit_date,
      next_audit_date: item.next_audit_date,
      risk_areas: item.risk_areas,
      certification_details: item.certification_details,
      contact_information: item.contact_information,
      created_at: item.created_at,
      updated_at: item.updated_at,
      user_id: item.user_id
    }));

    return { data: mappedData, error: null };
  } catch (error) {
    console.error('Get supplier assessments error:', error);
    return { data: [], error: error as Error };
  }
};

/**
 * Helper function to determine risk level based on compliance score
 */
function determineRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score >= 80) return 'low';
  if (score >= 60) return 'medium';
  if (score >= 40) return 'high';
  return 'critical';
}

/**
 * Get ESG metrics
 */
export const getEsgMetrics = async (): Promise<{ data: EsgMetric[]; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('esg_metrics')
      .select('*');

    if (error) throw error;

    // Map database fields to our interface
    const mappedData: EsgMetric[] = data.map(item => ({
      id: item.id,
      category: item.metric_type, // Use metric_type as category
      name: item.metric_name,
      value: item.metric_value,
      target: item.metric_value * 1.2, // Just for demo, set target 20% higher than current value
      unit: item.unit,
      metric_name: item.metric_name,
      metric_value: item.metric_value,
      metric_type: item.metric_type,
      source: item.source,
      timestamp: item.timestamp,
      user_id: item.user_id
    }));

    return { data: mappedData, error: null };
  } catch (error) {
    console.error('Get ESG metrics error:', error);
    return { data: [], error: error as Error };
  }
};

/**
 * Save dashboard preference
 */
export const saveDashboardPreference = async (userId: string, preferences: any): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const { error } = await supabase
      .from('dashboard_preferences')
      .upsert({
        user_id: userId,
        preferences,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Save dashboard preference error:', error);
    return { success: false, error: error as Error };
  }
};
