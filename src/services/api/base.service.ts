
import { supabase } from '@/integrations/supabase/client';
import { ApiServiceOptions } from '@/types/api';
import { PostgrestResponse } from '@supabase/supabase-js';

/**
 * A generic base service for API operations on Supabase tables
 */
export class BaseApiService<T extends Record<string, any>> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  // Get all records with optional filtering and pagination
  async getAll(options: ApiServiceOptions = {}): Promise<{ data: T[], meta: { totalCount: number } }> {
    try {
      // Start building the query
      // We need to use any here because Supabase expects literal string table names
      // but we're using dynamic table names for our generic service
      let query = supabase
        .from(this.tableName as any)
        .select('*', { count: 'exact' });

      // Apply filters if provided
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          // Need to use any because we're chaining methods dynamically
          query = query.eq(key, value) as any;
        });
      }

      // Apply pagination if provided
      if (options.page !== undefined && options.limit !== undefined) {
        const start = options.page * options.limit;
        query = query.range(start, start + options.limit - 1) as any;
      } else if (options.limit !== undefined) {
        query = query.limit(options.limit) as any;
      }

      // Apply ordering if provided
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.direction === 'asc' 
        }) as any;
      }

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      // Use type assertion to handle the dynamic nature of the data
      return { 
        data: data as unknown as T[],
        meta: { 
          totalCount: count || 0 
        }
      };
    } catch (error) {
      console.error(`Error fetching all ${this.tableName}:`, error);
      throw error;
    }
  }

  // Get a single record by ID
  async getById(id: string): Promise<T> {
    try {
      const { data, error } = await supabase
        .from(this.tableName as any)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data as unknown as T;
    } catch (error) {
      console.error(`Error fetching ${this.tableName} by ID:`, error);
      throw error;
    }
  }

  // Create a new record
  async create(record: Partial<T>): Promise<T> {
    try {
      const { data, error } = await supabase
        .from(this.tableName as any)
        .insert([record])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as unknown as T;
    } catch (error) {
      console.error(`Error creating ${this.tableName}:`, error);
      throw error;
    }
  }

  // Update an existing record
  async update(id: string, record: Partial<T>): Promise<T> {
    try {
      const { data, error } = await supabase
        .from(this.tableName as any)
        .update(record)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as unknown as T;
    } catch (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      throw error;
    }
  }

  // Delete a record
  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableName as any)
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error(`Error deleting ${this.tableName}:`, error);
      throw error;
    }
  }

  // Search records by string matching
  async search(term: string, searchColumns: string[], limit: number = 10): Promise<{ data: T[] }> {
    try {
      // Build the search query with OR conditions
      const searchQuery = searchColumns
        .map(column => `${column}.ilike.%${term}%`)
        .join(',');
      
      // Execute the search query
      const { data, error } = await supabase
        .from(this.tableName as any)
        .select('*')
        .or(searchQuery)
        .limit(limit);

      if (error) {
        throw error;
      }

      return { data: data as unknown as T[] };
    } catch (error) {
      console.error(`Error searching ${this.tableName}:`, error);
      throw error;
    }
  }
}
