
import { CrudService } from '../api.crud.service';
import { supabase } from '@/integrations/supabase/client';

// Types
export interface UserSettings {
  id: string;
  user_id: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    risk_alerts: boolean;
    updates: boolean;
  };
  dashboard_layout: Record<string, any>;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface SystemIntegration {
  id: string;
  user_id: string;
  provider: string;
  status: 'active' | 'inactive' | 'pending';
  credentials: Record<string, any>;
  last_sync: string;
  created_at: string;
  updated_at: string;
}

// Services
export const userSettingsService = new CrudService<UserSettings>('user_settings');
export const systemIntegrationService = new CrudService<SystemIntegration>('system_integrations');

// Additional methods
export const settingsService = {
  /**
   * Get settings for current user
   */
  async getCurrentUserSettings(): Promise<UserSettings | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const response = await userSettingsService.getAll({ user_id: user.id });
    return response.data?.[0] || null;
  },

  /**
   * Update user theme
   */
  async updateTheme(theme: 'light' | 'dark' | 'system'): Promise<boolean> {
    const settings = await this.getCurrentUserSettings();
    if (!settings) return false;
    
    await userSettingsService.update(settings.id, { theme });
    return true;
  },

  /**
   * Update notification preferences
   */
  async updateNotifications(preferences: Partial<UserSettings['notifications']>): Promise<boolean> {
    const settings = await this.getCurrentUserSettings();
    if (!settings) return false;
    
    const updatedNotifications = { ...settings.notifications, ...preferences };
    await userSettingsService.update(settings.id, { notifications: updatedNotifications });
    return true;
  },

  /**
   * Save dashboard layout
   */
  async saveDashboardLayout(layout: Record<string, any>): Promise<boolean> {
    const settings = await this.getCurrentUserSettings();
    if (!settings) return false;
    
    await userSettingsService.update(settings.id, { dashboard_layout: layout });
    return true;
  },

  /**
   * Connect third-party integration
   */
  async connectIntegration(provider: string, credentials: Record<string, any>): Promise<SystemIntegration> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    return systemIntegrationService.create({
      user_id: user.id,
      provider,
      status: 'active',
      credentials,
      last_sync: new Date().toISOString()
    } as Partial<SystemIntegration>);
  }
};
