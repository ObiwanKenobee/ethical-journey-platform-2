
import { apiService } from './api.service';

/**
 * Generic CRUD service for dashboard entities
 */
export class CrudService<T> {
  private resource: string;

  constructor(resourceName: string) {
    this.resource = resourceName;
  }

  /**
   * Get all entities
   * @param filters Optional filters
   * @param pagination Optional pagination
   * @param userRole Optional user role for role-based filtering
   */
  async getAll(
    filters: Record<string, any> = {}, 
    pagination?: { page: number; limit: number },
    userRole?: 'business' | 'compliance' | 'ngo' | 'government'
  ) {
    const options: any = { filters };
    
    if (pagination) {
      options.limit = pagination.limit;
      options.offset = (pagination.page - 1) * pagination.limit;
    }
    
    // Apply role-based filtering if a role is provided
    if (userRole) {
      options.role = userRole;
    }
    
    return apiService.getAll(this.resource, options);
  }

  /**
   * Get entity by ID
   * @param id Entity ID
   * @param userRole Optional user role for role-based permissions
   */
  async getById(id: string, userRole?: 'business' | 'compliance' | 'ngo' | 'government'): Promise<T> {
    const options: any = {};
    
    if (userRole) {
      options.role = userRole;
    }
    
    return apiService.getById(this.resource, id, options);
  }

  /**
   * Create new entity
   * @param data Entity data
   * @param userRole Optional user role for role-based permissions
   */
  async create(data: Partial<T>, userRole?: 'business' | 'compliance' | 'ngo' | 'government'): Promise<T> {
    const options: any = {};
    
    if (userRole) {
      options.role = userRole;
    }
    
    return apiService.create(this.resource, data, options);
  }

  /**
   * Update entity
   * @param id Entity ID
   * @param data Updated data
   * @param userRole Optional user role for role-based permissions
   */
  async update(id: string, data: Partial<T>, userRole?: 'business' | 'compliance' | 'ngo' | 'government'): Promise<T> {
    const options: any = {};
    
    if (userRole) {
      options.role = userRole;
    }
    
    return apiService.update(this.resource, id, data, options);
  }

  /**
   * Delete entity
   * @param id Entity ID
   * @param userRole Optional user role for role-based permissions
   */
  async delete(id: string, userRole?: 'business' | 'compliance' | 'ngo' | 'government'): Promise<boolean> {
    const options: any = {};
    
    if (userRole) {
      options.role = userRole;
    }
    
    await apiService.delete(this.resource, id, options);
    return true;
  }

  /**
   * Search entities
   * @param query Search query
   * @param userRole Optional user role for role-based filtering
   */
  async search(query: string, userRole?: 'business' | 'compliance' | 'ngo' | 'government'): Promise<T[]> {
    const options: any = { filters: { search: query } };
    
    if (userRole) {
      options.role = userRole;
    }
    
    return apiService.getAll(this.resource, options);
  }

  /**
   * Perform bulk operations
   * @param operation Operation type
   * @param items Items to process
   * @param userRole Optional user role for role-based permissions
   */
  async bulkOperation(
    operation: 'create' | 'update' | 'delete',
    items: Array<Partial<T> & { id?: string }>,
    userRole?: 'business' | 'compliance' | 'ngo' | 'government'
  ): Promise<{success: boolean; processed: number; failed: number}> {
    const options: any = {};
    
    if (userRole) {
      options.role = userRole;
    }
    
    return apiService.bulkOperation(this.resource, operation, items, options);
  }

  /**
   * Export data in specified format
   * @param format Export format
   * @param filters Optional filters
   * @param userRole Optional user role for role-based filtering
   */
  async exportData(
    format: 'csv' | 'xlsx' | 'json',
    filters: Record<string, any> = {},
    userRole?: 'business' | 'compliance' | 'ngo' | 'government'
  ): Promise<Blob> {
    const options: any = { 
      filters,
      format 
    };
    
    if (userRole) {
      options.role = userRole;
    }
    
    return apiService.exportData(this.resource, options);
  }
}

// Role-based permission types
export type UserRole = 'business' | 'compliance' | 'ngo' | 'government';

export interface RolePermissions {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  export: boolean;
}

// Default role permissions map
export const defaultRolePermissions: Record<UserRole, Record<string, RolePermissions>> = {
  business: {
    'default': {
      create: true,
      read: true,
      update: true, 
      delete: true,
      export: true
    }
  },
  compliance: {
    'default': {
      create: true,
      read: true,
      update: true,
      delete: false,
      export: true
    },
    'risk_assessments': {
      create: true,
      read: true,
      update: true,
      delete: true,
      export: true
    }
  },
  ngo: {
    'default': {
      create: false,
      read: true,
      update: false,
      delete: false,
      export: true
    },
    'reports': {
      create: true,
      read: true,
      update: true,
      delete: true,
      export: true
    }
  },
  government: {
    'default': {
      create: false,
      read: true,
      update: false,
      delete: false,
      export: true
    },
    'policy_recommendations': {
      create: true,
      read: true,
      update: true,
      delete: true,
      export: true
    }
  }
};

/**
 * Check if a user role has permission for an action on a resource
 */
export function hasPermission(
  role: UserRole,
  resource: string,
  action: keyof RolePermissions
): boolean {
  const rolePerms = defaultRolePermissions[role];
  const resourcePerms = rolePerms[resource] || rolePerms['default'];
  return resourcePerms[action];
}
