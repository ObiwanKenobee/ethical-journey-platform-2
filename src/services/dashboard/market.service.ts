
import { CrudService } from '../api.crud.service';
import { supabase } from '@/integrations/supabase/client';

// Types
export interface MarketTrend {
  id: string;
  name: string;
  description: string;
  impact_score: number; // 0-100
  confidence: number; // 0-100
  category: 'regulatory' | 'technological' | 'social' | 'environmental' | 'economic';
  start_date: string;
  projected_end_date?: string;
  regions: string[];
  data_sources: string[];
  created_at: string;
  updated_at: string;
}

export interface Competitor {
  id: string;
  name: string;
  description: string;
  website: string;
  market_share?: number;
  strengths: string[];
  weaknesses: string[];
  key_products: {
    name: string;
    category: string;
    price_point: 'budget' | 'mid-range' | 'premium';
  }[];
  sustainability_score?: number;
  created_at: string;
  updated_at: string;
}

export interface MarketReport {
  id: string;
  title: string;
  summary: string;
  generated_date: string;
  period: {
    start: string;
    end: string;
  };
  metrics: {
    name: string;
    value: number;
    previous_value?: number;
    unit: string;
  }[];
  highlights: string[];
  challenges: string[];
  opportunities: string[];
  created_at: string;
  updated_at: string;
}

// Services
export const marketTrendService = new CrudService<MarketTrend>('market_trends');
export const competitorService = new CrudService<Competitor>('competitors');
export const marketReportService = new CrudService<MarketReport>('market_reports');

// Additional methods
export const marketService = {
  /**
   * Get high impact trends
   */
  async getHighImpactTrends(): Promise<MarketTrend[]> {
    const response = await marketTrendService.getAll({
      impact_score_gt: 70,
      confidence_gt: 60
    });
    return response.data || [];
  },

  /**
   * Get trends by category
   */
  async getTrendsByCategory(category: MarketTrend['category']): Promise<MarketTrend[]> {
    const response = await marketTrendService.getAll({ category });
    return response.data || [];
  },

  /**
   * Get competitor comparison
   */
  async getCompetitorComparison(competitorIds: string[]): Promise<Competitor[]> {
    const competitors: Competitor[] = [];
    
    for (const id of competitorIds) {
      try {
        const competitor = await competitorService.getById(id);
        competitors.push(competitor);
      } catch (error) {
        console.error(`Failed to fetch competitor ${id}:`, error);
      }
    }
    
    return competitors;
  },

  /**
   * Get latest market report
   */
  async getLatestMarketReport(): Promise<MarketReport | null> {
    const response = await marketReportService.getAll({}, { 
      page: 1, 
      limit: 1 
    });
    return response.data?.[0] || null;
  },

  /**
   * Track new trend
   */
  async trackNewTrend(trend: Omit<MarketTrend, 'id' | 'created_at' | 'updated_at'>): Promise<MarketTrend> {
    return marketTrendService.create(trend as Partial<MarketTrend>);
  }
};
