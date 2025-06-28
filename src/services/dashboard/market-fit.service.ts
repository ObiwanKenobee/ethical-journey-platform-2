
import { CrudService } from '../api.crud.service';
import { supabase } from '@/integrations/supabase/client';

// Types
export interface UserFeedback {
  id: string;
  user_id: string;
  score: number; // 1-10
  feedback: string;
  source: 'in-app' | 'email' | 'survey' | 'interview';
  created_at: string;
  feature?: string;
  tags?: string[];
}

export interface FeatureUsage {
  id: string;
  feature_id: string;
  feature_name: string;
  views: number;
  interactions: number;
  completion_rate: number;
  average_time_spent: number;
  period_start: string;
  period_end: string;
  created_at: string;
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  criteria: Record<string, any>;
  size: number;
  retention_rate: number;
  engagement_score: number;
  created_at: string;
  updated_at: string;
}

export interface ProductMetric {
  id: string;
  name: string;
  value: number;
  previous_value?: number;
  unit: string;
  date: string;
  category: 'engagement' | 'retention' | 'growth' | 'satisfaction';
  created_at: string;
}

// Services
export const userFeedbackService = new CrudService<UserFeedback>('user_feedback');
export const featureUsageService = new CrudService<FeatureUsage>('feature_usage');
export const userSegmentService = new CrudService<UserSegment>('user_segments');
export const productMetricService = new CrudService<ProductMetric>('product_metrics');

// Additional methods
export const marketFitService = {
  /**
   * Submit user feedback
   */
  async submitFeedback(score: number, feedback: string, feature?: string): Promise<UserFeedback> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    return userFeedbackService.create({
      user_id: user.id,
      score,
      feedback,
      source: 'in-app',
      feature,
      created_at: new Date().toISOString()
    } as Partial<UserFeedback>);
  },

  /**
   * Get feature usage metrics
   */
  async getFeatureUsageMetrics(featureId: string, days: number = 30): Promise<FeatureUsage[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const response = await featureUsageService.getAll({
      feature_id: featureId,
      period_start_gte: startDate.toISOString(),
      period_end_lte: endDate.toISOString()
    });
    
    return response.data || [];
  },

  /**
   * Get user segments
   */
  async getUserSegments(): Promise<UserSegment[]> {
    const response = await userSegmentService.getAll();
    return response.data || [];
  },

  /**
   * Get user segment by id
   */
  async getUserSegmentById(segmentId: string): Promise<UserSegment | null> {
    try {
      return await userSegmentService.getById(segmentId);
    } catch (error) {
      console.error('Failed to fetch user segment:', error);
      return null;
    }
  },

  /**
   * Get recent product metrics
   */
  async getRecentProductMetrics(category?: ProductMetric['category'], limit: number = 10): Promise<ProductMetric[]> {
    const options: any = { 
      limit, 
      order: 'date.desc' 
    };
    
    if (category) {
      options.filters = { category };
    }
    
    const response = await productMetricService.getAll({}, options);
    return response.data || [];
  },

  /**
   * Track feature usage
   */
  async trackFeatureView(featureId: string, featureName: string): Promise<void> {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    const response = await featureUsageService.getAll({
      feature_id: featureId,
      period_start: formattedDate,
      period_end: formattedDate
    });
    
    if (response.data && response.data[0]) {
      const existing = response.data[0];
      await featureUsageService.update(existing.id, {
        views: existing.views + 1
      });
    } else {
      await featureUsageService.create({
        feature_id: featureId,
        feature_name: featureName,
        views: 1,
        interactions: 0,
        completion_rate: 0,
        average_time_spent: 0,
        period_start: formattedDate,
        period_end: formattedDate
      } as Partial<FeatureUsage>);
    }
  }
};
