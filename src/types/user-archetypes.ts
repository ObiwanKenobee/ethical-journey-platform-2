
export type UserArchetype = 
  | 'supply_chain_executive'
  | 'sustainability_director'
  | 'compliance_officer'
  | 'procurement_manager'
  | 'risk_analyst'
  | 'esg_specialist'
  | 'ngo_director'
  | 'policy_maker'
  | 'worker_advocate'
  | 'auditor'
  | 'investor'
  | 'tech_integrator'
  | 'data_scientist'
  | 'ai_specialist';

export interface UserPersona {
  archetype: UserArchetype;
  title: string;
  description: string;
  primaryGoals: string[];
  keyMetrics: string[];
  dashboardConfig: DashboardConfig;
  aiInsights: AIInsightConfig[];
  permissions: PermissionSet;
}

export interface DashboardConfig {
  layout: 'executive' | 'operational' | 'analytical' | 'strategic';
  widgets: DashboardWidget[];
  automations: AutomationRule[];
  alerts: AlertConfig[];
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'map' | 'list' | 'ai_insight' | 'blockchain_verify';
  size: 'small' | 'medium' | 'large' | 'full';
  position: { x: number; y: number };
  config: Record<string, any>;
}

export interface AIInsightConfig {
  type: 'predictive' | 'anomaly' | 'recommendation' | 'trend';
  scope: 'global' | 'regional' | 'supplier' | 'industry';
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface AutomationRule {
  id: string;
  trigger: string;
  conditions: Record<string, any>;
  actions: string[];
  enabled: boolean;
}

export interface AlertConfig {
  type: 'risk' | 'compliance' | 'performance' | 'opportunity';
  severity: 'critical' | 'high' | 'medium' | 'low';
  channels: ('dashboard' | 'email' | 'sms' | 'webhook')[];
}

export interface PermissionSet {
  read: string[];
  write: string[];
  execute: string[];
  admin: string[];
}
