
import { CrudService } from '../api.crud.service';

// Types
export interface RiskFactor {
  id: string;
  name: string;
  description: string;
  category: 'environmental' | 'social' | 'governance' | 'economic' | 'political' | 'operational';
  severity: 'low' | 'medium' | 'high' | 'critical';
  likelihood: number; // 0-100
  impact: number; // 0-100
  mitigation_plan?: string;
  status: 'identified' | 'assessed' | 'mitigated' | 'monitored';
  region?: string;
  created_at: string;
  updated_at: string;
}

export interface RiskAlert {
  id: string;
  risk_factor_id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'acknowledged' | 'resolved';
  date_occurred: string;
  date_detected: string;
  affected_entities: string[];
  created_at: string;
  updated_at: string;
}

export interface RiskAssessment {
  id: string;
  entity_id: string;
  entity_type: 'supplier' | 'region' | 'product';
  overall_score: number; // 0-100
  risk_factors: {
    factor_id: string;
    score: number;
    notes?: string;
  }[];
  assessor_id: string;
  review_date: string;
  next_review_date?: string;
  created_at: string;
  updated_at: string;
}

// Services
export const riskFactorService = new CrudService<RiskFactor>('risk_factors');
export const riskAlertService = new CrudService<RiskAlert>('risk_alerts');
export const riskAssessmentService = new CrudService<RiskAssessment>('risk_assessments');

// Additional methods
export const riskService = {
  /**
   * Get active alerts
   */
  async getActiveAlerts(): Promise<RiskAlert[]> {
    const response = await riskAlertService.getAll({ 
      status: ['new', 'acknowledged'] 
    });
    return response.data || [];
  },

  /**
   * Get risk factors by category
   */
  async getRiskFactorsByCategory(category: RiskFactor['category']): Promise<RiskFactor[]> {
    const response = await riskFactorService.getAll({ category });
    return response.data || [];
  },

  /**
   * Acknowledge risk alert
   */
  async acknowledgeAlert(alertId: string): Promise<boolean> {
    await riskAlertService.update(alertId, { status: 'acknowledged' });
    return true;
  },

  /**
   * Get risk assessment by entity
   */
  async getAssessmentByEntity(entityType: RiskAssessment['entity_type'], entityId: string): Promise<RiskAssessment | null> {
    const response = await riskAssessmentService.getAll({ 
      entity_type: entityType,
      entity_id: entityId
    });
    return response.data?.[0] || null;
  },

  /**
   * Get high severity risks
   */
  async getHighSeverityRisks(): Promise<RiskFactor[]> {
    const response = await riskFactorService.getAll({ 
      severity: ['high', 'critical']
    });
    return response.data || [];
  }
};
