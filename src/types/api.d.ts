
/**
 * API Response Types
 */
export interface ApiResponse<T> {
  data: T[];
  meta: {
    totalCount: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  }
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

/**
 * API service options
 */
export interface ApiServiceOptions {
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
  orderBy?: { column: string; direction: 'asc' | 'desc' };
}

/**
 * API Search Options
 */
export interface ApiSearchOptions {
  searchColumns: string[];
  page?: number;
  limit?: number;
}

/**
 * Base entity interface that all database entities should extend
 */
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}
