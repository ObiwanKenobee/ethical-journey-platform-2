
import { apiService } from '@/services/api.service';

export interface AIInsight {
  id: string;
  type: 'predictive' | 'anomaly' | 'recommendation' | 'trend' | 'risk_assessment';
  title: string;
  description: string;
  confidence: number;
  impact: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  data: Record<string, any>;
  actionable: boolean;
  recommendations?: string[];
  timestamp: string;
  source: 'ml_model' | 'pattern_detection' | 'blockchain_analysis' | 'worker_feedback';
}

export interface PredictiveModel {
  id: string;
  name: string;
  type: 'risk_prediction' | 'demand_forecast' | 'compliance_score' | 'worker_satisfaction';
  accuracy: number;
  lastTrained: string;
  features: string[];
  predictions: ModelPrediction[];
}

export interface ModelPrediction {
  entityId: string;
  entityType: 'supplier' | 'facility' | 'region' | 'product';
  prediction: number;
  confidence: number;
  factors: PredictionFactor[];
  timeframe: string;
}

export interface PredictionFactor {
  factor: string;
  impact: number;
  description: string;
}

export interface AnomalyDetection {
  id: string;
  type: 'supply_disruption' | 'compliance_deviation' | 'worker_distress' | 'financial_irregularity';
  severity: number;
  location: string;
  affectedEntities: string[];
  pattern: string;
  recommendations: string[];
  timestamp: string;
}

class AIIntelligenceService {
  async getInsights(filters?: {
    type?: string;
    category?: string;
    impact?: string;
    timeRange?: string;
  }): Promise<AIInsight[]> {
    try {
      const response = await apiService.getAll('ai/insights', { filters });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      return this.getMockInsights();
    }
  }

  async getPredictiveModels(): Promise<PredictiveModel[]> {
    try {
      const response = await apiService.getAll('ai/models');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching predictive models:', error);
      return this.getMockModels();
    }
  }

  async getAnomalies(timeRange?: string): Promise<AnomalyDetection[]> {
    try {
      const response = await apiService.getAll('ai/anomalies', { filters: { timeRange } });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching anomalies:', error);
      return this.getMockAnomalies();
    }
  }

  async runPrediction(modelId: string, inputData: Record<string, any>): Promise<ModelPrediction> {
    try {
      const response = await apiService.create(`ai/models/${modelId}/predict`, inputData);
      return response.data;
    } catch (error) {
      console.error('Error running prediction:', error);
      throw error;
    }
  }

  async generateRecommendations(context: {
    type: string;
    entityId: string;
    scope: string;
  }): Promise<string[]> {
    try {
      const response = await apiService.create('ai/recommendations', context);
      return response.data.recommendations || [];
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  private getMockInsights(): AIInsight[] {
    return [
      {
        id: '1',
        type: 'risk_assessment',
        title: 'Elevated Risk Detected in Southeast Asian Textile Facilities',
        description: 'AI analysis detected patterns consistent with forced labor indicators across 12 textile facilities in the region.',
        confidence: 0.89,
        impact: 'critical',
        category: 'Human Rights',
        data: {
          affectedFacilities: 12,
          riskScore: 8.7,
          primaryIndicators: ['excessive overtime', 'restricted movement', 'debt bondage patterns']
        },
        actionable: true,
        recommendations: [
          'Conduct immediate on-site audits',
          'Implement worker feedback systems',
          'Review supplier contracts and conditions'
        ],
        timestamp: new Date().toISOString(),
        source: 'ml_model'
      },
      {
        id: '2',
        type: 'predictive',
        title: 'Supply Chain Disruption Forecast',
        description: 'Weather patterns and geopolitical tensions indicate 73% probability of disruption in key supply routes.',
        confidence: 0.73,
        impact: 'high',
        category: 'Supply Chain',
        data: {
          affectedRoutes: ['Asia-Europe', 'Americas-Pacific'],
          timeframe: '2-3 weeks',
          impactDuration: '4-6 weeks'
        },
        actionable: true,
        recommendations: [
          'Activate alternative supply routes',
          'Increase inventory buffers',
          'Communicate with key suppliers'
        ],
        timestamp: new Date().toISOString(),
        source: 'pattern_detection'
      }
    ];
  }

  private getMockModels(): PredictiveModel[] {
    return [
      {
        id: 'model_1',
        name: 'Forced Labor Risk Predictor',
        type: 'risk_prediction',
        accuracy: 0.89,
        lastTrained: '2024-01-15',
        features: ['worker_turnover', 'overtime_hours', 'wage_patterns', 'facility_conditions'],
        predictions: []
      },
      {
        id: 'model_2',
        name: 'Compliance Score Forecaster',
        type: 'compliance_score',
        accuracy: 0.92,
        lastTrained: '2024-01-10',
        features: ['audit_history', 'regulatory_changes', 'supplier_performance', 'industry_trends'],
        predictions: []
      }
    ];
  }

  private getMockAnomalies(): AnomalyDetection[] {
    return [
      {
        id: 'anomaly_1',
        type: 'worker_distress',
        severity: 8.5,
        location: 'Bangladesh Textile Region',
        affectedEntities: ['facility_123', 'facility_456'],
        pattern: 'Unusual spike in worker complaints and turnover rates',
        recommendations: [
          'Deploy worker advocacy team',
          'Conduct anonymous worker surveys',
          'Review working conditions immediately'
        ],
        timestamp: new Date().toISOString()
      }
    ];
  }
}

export const aiIntelligenceService = new AIIntelligenceService();
