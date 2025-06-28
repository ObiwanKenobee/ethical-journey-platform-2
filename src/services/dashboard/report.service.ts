
import { CrudService } from '../api.crud.service';
import { supabase } from '@/integrations/supabase/client';

// Types
export interface Report {
  id: string;
  title: string;
  description: string;
  type: 'compliance' | 'risk' | 'sustainability' | 'supplier' | 'custom';
  created_by: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  status: 'draft' | 'published' | 'archived';
  data: Record<string, any>;
  shared_with: string[];
  tags: string[];
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: Report['type'];
  fields: {
    id: string;
    name: string;
    type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
    required: boolean;
    options?: string[];
  }[];
  created_at: string;
  updated_at: string;
}

export interface ReportSchedule {
  id: string;
  report_id: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  recipients: string[];
  next_run: string;
  last_run?: string;
  status: 'active' | 'paused';
  created_at: string;
  updated_at: string;
}

// Services
export const reportService = new CrudService<Report>('reports');
export const reportTemplateService = new CrudService<ReportTemplate>('report_templates');
export const reportScheduleService = new CrudService<ReportSchedule>('report_schedules');

// Additional methods
export const reportingService = {
  /**
   * Create report from template
   */
  async createFromTemplate(templateId: string, data: Record<string, any>): Promise<Report> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    const template = await reportTemplateService.getById(templateId);
    
    return reportService.create({
      title: `New ${template.name}`,
      description: template.description,
      type: template.type,
      created_by: user.id,
      status: 'draft',
      data,
      shared_with: [user.id],
      tags: []
    } as Partial<Report>);
  },

  /**
   * Publish report
   */
  async publishReport(reportId: string): Promise<Report> {
    const updatedReport = await reportService.update(reportId, {
      status: 'published',
      published_at: new Date().toISOString()
    });
    return updatedReport;
  },

  /**
   * Schedule report
   */
  async scheduleReport(reportId: string, frequency: ReportSchedule['frequency'], recipients: string[]): Promise<ReportSchedule> {
    // Calculate next run based on frequency
    const now = new Date();
    let nextRun = new Date();
    
    switch (frequency) {
      case 'daily':
        nextRun.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        nextRun.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        nextRun.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        nextRun.setMonth(now.getMonth() + 3);
        break;
      case 'yearly':
        nextRun.setFullYear(now.getFullYear() + 1);
        break;
    }
    
    return reportScheduleService.create({
      report_id: reportId,
      frequency,
      recipients,
      next_run: nextRun.toISOString(),
      status: 'active'
    } as Partial<ReportSchedule>);
  },

  /**
   * Share report with users
   */
  async shareReport(reportId: string, userIds: string[]): Promise<Report> {
    const report = await reportService.getById(reportId);
    const uniqueUsers = [...new Set([...report.shared_with, ...userIds])];
    
    return reportService.update(reportId, {
      shared_with: uniqueUsers
    });
  },

  /**
   * Get user reports
   */
  async getUserReports(): Promise<Report[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    const response = await reportService.getAll({ 
      shared_with: user.id 
    });
    return response.data || [];
  }
};
