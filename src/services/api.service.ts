
import { supabase } from '@/integrations/supabase/client';

/**
 * Service to interact with the API endpoints
 */
export const apiService = {
  /**
   * Fetch all items from a resource
   * @param resource The resource name (table)
   * @param options Query options
   */
  async getAll(resource: string, options: {
    filters?: Record<string, any>,
    limit?: number,
    offset?: number,
    order?: string,
    role?: string
  } = {}) {
    const { filters = {}, limit, offset, order, role } = options;
    
    const functionName = 'api';
    let url = `${resource}`;
    
    // Add query parameters
    const params = new URLSearchParams();
    
    // Add filters
    Object.entries(filters).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    
    // Add pagination
    if (limit) params.append('limit', String(limit));
    if (offset) params.append('offset', String(offset));
    if (order) params.append('order', order);
    
    // Add user role if provided
    if (role) params.append('role', role);
    
    // Add query params to URL if we have any
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const { data, error } = await supabase.functions.invoke(`${functionName}/${url}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Fetch a single item by ID
   * @param resource The resource name (table)
   * @param id The item ID
   * @param options Additional options
   */
  async getById(resource: string, id: string, options: { role?: string } = {}) {
    const url = `${resource}/${id}`;
    const params = new URLSearchParams();
    
    // Add user role if provided
    if (options.role) {
      params.append('role', options.role);
    }
    
    // Append query params if we have any
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    const { data, error } = await supabase.functions.invoke(`api/${fullUrl}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Create a new item
   * @param resource The resource name (table)
   * @param item The item data
   * @param options Additional options
   */
  async create(resource: string, item: any, options: { role?: string } = {}) {
    let url = `${resource}`;
    const params = new URLSearchParams();
    
    // Add user role if provided
    if (options.role) {
      params.append('role', options.role);
    }
    
    // Append query params if we have any
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const { data, error } = await supabase.functions.invoke(`api/${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: item
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Update an existing item
   * @param resource The resource name (table)
   * @param id The item ID
   * @param item The updated item data
   * @param options Additional options
   */
  async update(resource: string, id: string, item: any, options: { role?: string } = {}) {
    let url = `${resource}/${id}`;
    const params = new URLSearchParams();
    
    // Add user role if provided
    if (options.role) {
      params.append('role', options.role);
    }
    
    // Append query params if we have any
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const { data, error } = await supabase.functions.invoke(`api/${url}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: item
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Delete an item
   * @param resource The resource name (table)
   * @param id The item ID
   * @param options Additional options
   */
  async delete(resource: string, id: string, options: { role?: string } = {}) {
    let url = `${resource}/${id}`;
    const params = new URLSearchParams();
    
    // Add user role if provided
    if (options.role) {
      params.append('role', options.role);
    }
    
    // Append query params if we have any
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const { data, error } = await supabase.functions.invoke(`api/${url}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Parse data with a specific format
   * @param resource The resource name
   * @param data The data to parse
   * @param format The format type
   */
  async parseData(resource: string, data: any, format: 'json' | 'csv' | 'xml') {
    const { data: parsedData, error } = await supabase.functions.invoke(`api/${resource}/parse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { data, format }
    });
    
    if (error) throw new Error(error.message);
    return parsedData;
  },
  
  /**
   * Perform bulk operations
   * @param resource The resource name
   * @param operation Operation type
   * @param items Items to process
   * @param options Additional options
   */
  async bulkOperation(
    resource: string, 
    operation: 'create' | 'update' | 'delete',
    items: Array<any>,
    options: { role?: string } = {}
  ) {
    let url = `${resource}/bulk/${operation}`;
    const params = new URLSearchParams();
    
    // Add user role if provided
    if (options.role) {
      params.append('role', options.role);
    }
    
    // Append query params if we have any
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const { data, error } = await supabase.functions.invoke(`api/${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { items }
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Export data in a specified format
   * @param resource The resource name
   * @param options Export options
   */
  async exportData(
    resource: string, 
    options: { 
      filters?: Record<string, any>,
      format: 'csv' | 'xlsx' | 'json',
      role?: string
    }
  ) {
    let url = `${resource}/export`;
    const params = new URLSearchParams();
    
    // Add format
    params.append('format', options.format);
    
    // Add filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }
    
    // Add user role if provided
    if (options.role) {
      params.append('role', options.role);
    }
    
    // Append query params
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const { data, error } = await supabase.functions.invoke(`api/${url}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (error) throw new Error(error.message);
    
    // Convert to Blob based on format
    const contentType = options.format === 'json' 
      ? 'application/json' 
      : options.format === 'csv' 
        ? 'text/csv' 
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      
    return new Blob([data], { type: contentType });
  }
};
