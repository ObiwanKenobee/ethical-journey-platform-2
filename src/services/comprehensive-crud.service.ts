import { supabase } from '@/integrations/supabase/client';
import { BaseApiService } from './api/base.service';

export interface CrudEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  [key: string]: any;
}

export interface CrudOptions {
  includeDeleted?: boolean;
  relations?: string[];
  search?: string;
  filters?: Record<string, any>;
  orderBy?: { column: string; direction: 'asc' | 'desc' };
  pagination?: { page: number; limit: number };
}

/**
 * Comprehensive CRUD service with advanced features
 */
export class ComprehensiveCrudService<T extends CrudEntity> extends BaseApiService<T> {
  constructor(tableName: string) {
    super(tableName);
  }

  // Advanced search with multiple criteria
  async advancedSearch(criteria: {
    query?: string;
    filters?: Record<string, any>;
    dateRange?: { start: Date; end: Date };
    tags?: string[];
    category?: string;
    status?: string;
    userRole?: string;
  }): Promise<{ data: T[]; meta: { total: number; pages: number } }> {
    try {
      let query = supabase
        .from(this.tableName as any)
        .select('*', { count: 'exact' });

      // Text search
      if (criteria.query) {
        query = query.or(`title.ilike.%${criteria.query}%,description.ilike.%${criteria.query}%,content.ilike.%${criteria.query}%`);
      }

      // Apply filters
      if (criteria.filters) {
        Object.entries(criteria.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Date range filter
      if (criteria.dateRange) {
        query = query
          .gte('created_at', criteria.dateRange.start.toISOString())
          .lte('created_at', criteria.dateRange.end.toISOString());
      }

      // Tags filter (if table has tags column)
      if (criteria.tags && criteria.tags.length > 0) {
        query = query.contains('tags', criteria.tags);
      }

      // Category filter
      if (criteria.category) {
        query = query.eq('category', criteria.category);
      }

      // Status filter
      if (criteria.status) {
        query = query.eq('status', criteria.status);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: ((data || []) as unknown) as T[],
        meta: {
          total: count || 0,
          pages: Math.ceil((count || 0) / 10)
        }
      };
    } catch (error) {
      console.error('Advanced search error:', error);
      throw error;
    }
  }

  // Bulk operations
  async bulkCreate(items: Partial<T>[]): Promise<T[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName as any)
        .insert(items)
        .select();

      if (error) throw error;
      return ((data || []) as unknown) as T[];
    } catch (error) {
      console.error('Bulk create error:', error);
      throw error;
    }
  }

  async bulkUpdate(updates: { id: string; data: Partial<T> }[]): Promise<T[]> {
    try {
      const results = await Promise.all(
        updates.map(({ id, data }) => this.update(id, data))
      );
      return results;
    } catch (error) {
      console.error('Bulk update error:', error);
      throw error;
    }
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName as any)
        .delete()
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Bulk delete error:', error);
      throw error;
    }
  }

  // Soft delete functionality
  async softDelete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName as any)
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Soft delete error:', error);
      throw error;
    }
  }

  async restore(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName as any)
        .update({ deleted_at: null })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Restore error:', error);
      throw error;
    }
  }

  // Versioning and history
  async createVersion(id: string, changes: Partial<T>): Promise<boolean> {
    try {
      // Get current record
      const current = await this.getById(id);
      
      // Create version record
      const { error } = await supabase
        .from(`${this.tableName}_versions` as any)
        .insert({
          entity_id: id,
          version_data: current,
          changes: changes,
          created_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Create version error:', error);
      throw error;
    }
  }

  async getVersionHistory(id: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from(`${this.tableName}_versions` as any)
        .select('*')
        .eq('entity_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get version history error:', error);
      throw error;
    }
  }

  // Analytics and insights
  async getAnalytics(timeRange: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<{
    total: number;
    growth: number;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
    timeline: Array<{ date: string; count: number }>;
  }> {
    try {
      // Calculate date range
      const now = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case 'day':
          startDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      // Get total count
      const { count: total } = await supabase
        .from(this.tableName as any)
        .select('*', { count: 'exact', head: true });

      // Get previous period for growth calculation
      const previousStart = new Date(startDate);
      previousStart.setTime(previousStart.getTime() - (now.getTime() - startDate.getTime()));

      const { count: previousTotal } = await supabase
        .from(this.tableName as any)
        .select('*', { count: 'exact', head: true })
        .gte('created_at', previousStart.toISOString())
        .lt('created_at', startDate.toISOString());

      const growth = previousTotal ? ((total || 0) - previousTotal) / previousTotal * 100 : 0;

      // Get data for analysis
      const { data } = await supabase
        .from(this.tableName as any)
        .select('*')
        .gte('created_at', startDate.toISOString());

      // Analyze by category and status
      const byCategory: Record<string, number> = {};
      const byStatus: Record<string, number> = {};
      const timelineData: Record<string, number> = {};

      (data || []).forEach((item: any) => {
        // Category analysis
        if (item.category) {
          byCategory[item.category] = (byCategory[item.category] || 0) + 1;
        }

        // Status analysis
        if (item.status) {
          byStatus[item.status] = (byStatus[item.status] || 0) + 1;
        }

        // Timeline analysis
        const date = new Date(item.created_at).toISOString().split('T')[0];
        timelineData[date] = (timelineData[date] || 0) + 1;
      });

      const timeline = Object.entries(timelineData)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return {
        total: total || 0,
        growth,
        byCategory,
        byStatus,
        timeline
      };
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }
}

// Specialized CRUD services for different domains
export const supplierCrudService = new ComprehensiveCrudService('suppliers');
export const riskCrudService = new ComprehensiveCrudService('risk_assessments');
export const reportCrudService = new ComprehensiveCrudService('reports');
export const notificationCrudService = new ComprehensiveCrudService('notifications');
export const collaborationCrudService = new ComprehensiveCrudService('collaborations');
