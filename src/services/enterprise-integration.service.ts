import { supabase } from "@/integrations/supabase/client";

export interface Integration {
  id: string;
  name: string;
  provider: string;
  type:
    | "erp"
    | "crm"
    | "audit_platform"
    | "compliance_tool"
    | "analytics"
    | "blockchain";
  status: "active" | "inactive" | "error" | "configuring";
  configuration: IntegrationConfiguration;
  dataFlow: DataFlow[];
  lastSync: string;
  syncFrequency: "realtime" | "hourly" | "daily" | "weekly" | "manual";
  dataVolume: {
    imported: number;
    exported: number;
    processed: number;
  };
  errorCount: number;
  createdAt: string;
  updatedAt: string;
  workspaceId?: string;
}

export interface IntegrationConfiguration {
  endpoint?: string;
  authentication: {
    type: "api_key" | "oauth2" | "basic_auth" | "certificate";
    credentials: Record<string, any>;
  };
  mapping: {
    inbound: FieldMapping[];
    outbound: FieldMapping[];
  };
  filters: IntegrationFilter[];
  transformation: TransformationRule[];
  validation: ValidationRule[];
}

export interface DataFlow {
  id: string;
  source: string;
  target: string;
  dataType: string;
  status: "success" | "error" | "pending";
  recordCount: number;
  lastRun: string;
  errorMessage?: string;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  transformation?: string;
  required: boolean;
  defaultValue?: any;
}

export interface IntegrationFilter {
  field: string;
  operator:
    | "equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in";
  value: any;
}

export interface TransformationRule {
  field: string;
  operation:
    | "uppercase"
    | "lowercase"
    | "format_date"
    | "calculate"
    | "lookup"
    | "custom";
  parameters: Record<string, any>;
}

export interface ValidationRule {
  field: string;
  type: "required" | "format" | "range" | "custom";
  parameters: Record<string, any>;
  errorMessage: string;
}

export interface APIEndpoint {
  id: string;
  name: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  category:
    | "users"
    | "workspaces"
    | "data"
    | "analytics"
    | "compliance"
    | "security";
  authentication: {
    required: boolean;
    type: "api_key" | "oauth2" | "jwt";
  };
  rateLimit: {
    requests: number;
    period: "minute" | "hour" | "day";
  };
  parameters: APIParameter[];
  responses: APIResponse[];
  deprecated: boolean;
  version: string;
}

export interface APIParameter {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "object";
  required: boolean;
  description: string;
  example?: any;
  validation?: ValidationRule[];
}

export interface APIResponse {
  statusCode: number;
  description: string;
  schema: any;
  example?: any;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  rateLimit: {
    requests: number;
    period: "minute" | "hour" | "day";
  };
  ipWhitelist?: string[];
  active: boolean;
  expiresAt?: string;
  lastUsed?: string;
  createdAt: string;
  createdBy: string;
  workspaceId?: string;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  secret: string;
  retryPolicy: {
    maxRetries: number;
    timeout: number;
    backoffMultiplier: number;
  };
  headers?: Record<string, string>;
  successRate: number;
  lastTriggered?: string;
  createdAt: string;
  workspaceId?: string;
}

export interface SyncOperation {
  id: string;
  integrationId: string;
  type: "full" | "incremental" | "manual";
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  startedAt: string;
  completedAt?: string;
  recordsProcessed: number;
  recordsSucceeded: number;
  recordsFailed: number;
  errors: SyncError[];
  logs: SyncLog[];
}

export interface SyncError {
  recordId?: string;
  field?: string;
  message: string;
  code: string;
  timestamp: string;
}

export interface SyncLog {
  level: "info" | "warn" | "error" | "debug";
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface IntegrationTemplate {
  id: string;
  name: string;
  description: string;
  provider: string;
  type: string;
  configuration: Partial<IntegrationConfiguration>;
  requiredCredentials: string[];
  supportedFeatures: string[];
  documentation: string;
  logoUrl?: string;
  category: string;
  popularity: number;
}

class EnterpriseIntegrationService {
  // Integration Management
  async getIntegrations(workspaceId?: string): Promise<Integration[]> {
    try {
      let query = supabase
        .from("integrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (workspaceId) {
        query = query.eq("workspace_id", workspaceId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Mock data for demonstration
      const mockIntegrations: Integration[] = [
        {
          id: "int-001",
          name: "SAP ERP Integration",
          provider: "SAP",
          type: "erp",
          status: "active",
          configuration: {
            endpoint: "https://api.sap.com/v1",
            authentication: {
              type: "oauth2",
              credentials: { client_id: "xxx", client_secret: "xxx" },
            },
            mapping: { inbound: [], outbound: [] },
            filters: [],
            transformation: [],
            validation: [],
          },
          dataFlow: [
            {
              id: "flow-001",
              source: "SAP Suppliers",
              target: "Guardian-IO Suppliers",
              dataType: "supplier_data",
              status: "success",
              recordCount: 1247,
              lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            },
          ],
          lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          syncFrequency: "daily",
          dataVolume: {
            imported: 45892,
            exported: 12847,
            processed: 58739,
          },
          errorCount: 3,
          createdAt: "2024-01-15T00:00:00Z",
          updatedAt: new Date().toISOString(),
          workspaceId: workspaceId || "default",
        },
        {
          id: "int-002",
          name: "Salesforce CRM Sync",
          provider: "Salesforce",
          type: "crm",
          status: "active",
          configuration: {
            endpoint: "https://api.salesforce.com/v1",
            authentication: {
              type: "oauth2",
              credentials: { access_token: "xxx", refresh_token: "xxx" },
            },
            mapping: { inbound: [], outbound: [] },
            filters: [],
            transformation: [],
            validation: [],
          },
          dataFlow: [
            {
              id: "flow-002",
              source: "Salesforce Accounts",
              target: "Guardian-IO Companies",
              dataType: "company_data",
              status: "success",
              recordCount: 892,
              lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            },
          ],
          lastSync: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          syncFrequency: "hourly",
          dataVolume: {
            imported: 23847,
            exported: 8947,
            processed: 32794,
          },
          errorCount: 1,
          createdAt: "2024-02-01T00:00:00Z",
          updatedAt: new Date().toISOString(),
          workspaceId: workspaceId || "default",
        },
        {
          id: "int-003",
          name: "Hyperledger Blockchain",
          provider: "Hyperledger",
          type: "blockchain",
          status: "active",
          configuration: {
            endpoint: "https://blockchain-api.company.com",
            authentication: {
              type: "certificate",
              credentials: { cert: "xxx", key: "xxx" },
            },
            mapping: { inbound: [], outbound: [] },
            filters: [],
            transformation: [],
            validation: [],
          },
          dataFlow: [
            {
              id: "flow-003",
              source: "Guardian-IO Transactions",
              target: "Blockchain Ledger",
              dataType: "transaction_data",
              status: "success",
              recordCount: 2847,
              lastRun: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            },
          ],
          lastSync: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          syncFrequency: "realtime",
          dataVolume: {
            imported: 5847,
            exported: 28947,
            processed: 34794,
          },
          errorCount: 0,
          createdAt: "2024-03-10T00:00:00Z",
          updatedAt: new Date().toISOString(),
          workspaceId: workspaceId || "default",
        },
      ];

      return data || mockIntegrations;
    } catch (error) {
      console.error("Error fetching integrations:", error);
      return [];
    }
  }

  async createIntegration(
    integration: Omit<Integration, "id" | "createdAt" | "updatedAt">,
  ): Promise<{ data?: Integration; error?: Error }> {
    try {
      const { data, error } = await supabase
        .from("integrations")
        .insert([
          {
            ...integration,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async updateIntegration(
    id: string,
    updates: Partial<Integration>,
  ): Promise<{ data?: Integration; error?: Error }> {
    try {
      const { data, error } = await supabase
        .from("integrations")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async deleteIntegration(id: string): Promise<{ error?: Error }> {
    try {
      const { error } = await supabase
        .from("integrations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      return {};
    } catch (error) {
      return { error: error as Error };
    }
  }

  async testIntegration(
    id: string,
  ): Promise<{ success: boolean; message: string; error?: Error }> {
    try {
      // Mock implementation - in real scenario this would test the actual connection
      const testResult = Math.random() > 0.2; // 80% success rate for demo

      return {
        success: testResult,
        message: testResult
          ? "Connection successful"
          : "Connection failed - check credentials",
      };
    } catch (error) {
      return {
        success: false,
        message: "Test failed",
        error: error as Error,
      };
    }
  }

  async syncIntegration(
    id: string,
  ): Promise<{
    success: boolean;
    syncId: string;
    message: string;
    error?: Error;
  }> {
    try {
      const syncId = `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Mock implementation - in real scenario this would trigger actual sync
      const { error } = await supabase.from("sync_operations").insert([
        {
          id: syncId,
          integration_id: id,
          type: "manual",
          status: "pending",
          started_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      return {
        success: true,
        syncId,
        message: "Sync operation initiated",
      };
    } catch (error) {
      return {
        success: false,
        syncId: "",
        message: "Failed to start sync",
        error: error as Error,
      };
    }
  }

  // API Endpoints Management
  async getAPIEndpoints(): Promise<APIEndpoint[]> {
    try {
      const { data, error } = await supabase
        .from("api_endpoints")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;

      // Mock data for demonstration
      const mockEndpoints: APIEndpoint[] = [
        {
          id: "ep-001",
          name: "List Users",
          description: "Retrieve a list of all users in the workspace",
          method: "GET",
          path: "/api/v1/users",
          category: "users",
          authentication: {
            required: true,
            type: "api_key",
          },
          rateLimit: {
            requests: 1000,
            period: "hour",
          },
          parameters: [
            {
              name: "page",
              type: "number",
              required: false,
              description: "Page number for pagination",
              example: 1,
            },
            {
              name: "limit",
              type: "number",
              required: false,
              description: "Number of records per page",
              example: 20,
            },
          ],
          responses: [
            {
              statusCode: 200,
              description: "Successful response",
              schema: { type: "object" },
              example: { users: [], pagination: {} },
            },
          ],
          deprecated: false,
          version: "1.0",
        },
        {
          id: "ep-002",
          name: "Create Workspace",
          description: "Create a new workspace",
          method: "POST",
          path: "/api/v1/workspaces",
          category: "workspaces",
          authentication: {
            required: true,
            type: "oauth2",
          },
          rateLimit: {
            requests: 100,
            period: "hour",
          },
          parameters: [
            {
              name: "name",
              type: "string",
              required: true,
              description: "Workspace name",
              example: "My Company",
            },
            {
              name: "plan",
              type: "string",
              required: true,
              description: "Subscription plan",
              example: "enterprise",
            },
          ],
          responses: [
            {
              statusCode: 201,
              description: "Workspace created successfully",
              schema: { type: "object" },
            },
          ],
          deprecated: false,
          version: "1.0",
        },
      ];

      return data || mockEndpoints;
    } catch (error) {
      console.error("Error fetching API endpoints:", error);
      return [];
    }
  }

  // API Keys Management
  async getAPIKeys(workspaceId?: string): Promise<APIKey[]> {
    try {
      let query = supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });

      if (workspaceId) {
        query = query.eq("workspace_id", workspaceId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Mock data for demonstration
      const mockAPIKeys: APIKey[] = [
        {
          id: "key-001",
          name: "Production API Key",
          key: "gdo_live_sk_1234567890abcdef",
          permissions: ["read", "write", "admin"],
          rateLimit: {
            requests: 10000,
            period: "hour",
          },
          ipWhitelist: ["203.0.113.0/24", "198.51.100.0/24"],
          active: true,
          expiresAt: "2025-12-31T23:59:59Z",
          lastUsed: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          createdAt: "2024-01-15T00:00:00Z",
          createdBy: "admin@company.com",
          workspaceId: workspaceId || "default",
        },
        {
          id: "key-002",
          name: "Development API Key",
          key: "gdo_test_sk_abcdef1234567890",
          permissions: ["read", "write"],
          rateLimit: {
            requests: 1000,
            period: "hour",
          },
          active: true,
          lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          createdAt: "2024-02-01T00:00:00Z",
          createdBy: "developer@company.com",
          workspaceId: workspaceId || "default",
        },
      ];

      return data || mockAPIKeys;
    } catch (error) {
      console.error("Error fetching API keys:", error);
      return [];
    }
  }

  async createAPIKey(
    apiKey: Omit<APIKey, "id" | "key" | "createdAt">,
  ): Promise<{ data?: APIKey; error?: Error }> {
    try {
      const generatedKey = `gdo_${apiKey.name.includes("test") ? "test" : "live"}_sk_${Math.random().toString(36).substr(2, 24)}`;

      const { data, error } = await supabase
        .from("api_keys")
        .insert([
          {
            ...apiKey,
            key: generatedKey,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async revokeAPIKey(id: string): Promise<{ error?: Error }> {
    try {
      const { error } = await supabase
        .from("api_keys")
        .update({ active: false })
        .eq("id", id);

      if (error) throw error;

      return {};
    } catch (error) {
      return { error: error as Error };
    }
  }

  // Webhooks Management
  async getWebhooks(workspaceId?: string): Promise<WebhookEndpoint[]> {
    try {
      let query = supabase
        .from("webhooks")
        .select("*")
        .order("created_at", { ascending: false });

      if (workspaceId) {
        query = query.eq("workspace_id", workspaceId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Mock data for demonstration
      const mockWebhooks: WebhookEndpoint[] = [
        {
          id: "webhook-001",
          url: "https://api.company.com/webhooks/guardian-io",
          events: ["user.created", "workspace.updated", "compliance.alert"],
          active: true,
          secret: "whsec_1234567890abcdef",
          retryPolicy: {
            maxRetries: 3,
            timeout: 30000,
            backoffMultiplier: 2,
          },
          headers: {
            Authorization: "Bearer token123",
            "X-Custom-Header": "value",
          },
          successRate: 98.5,
          lastTriggered: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          createdAt: "2024-01-15T00:00:00Z",
          workspaceId: workspaceId || "default",
        },
        {
          id: "webhook-002",
          url: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
          events: ["security.incident", "compliance.violation"],
          active: true,
          secret: "whsec_abcdef1234567890",
          retryPolicy: {
            maxRetries: 5,
            timeout: 15000,
            backoffMultiplier: 1.5,
          },
          successRate: 99.2,
          lastTriggered: new Date(
            Date.now() - 2 * 60 * 60 * 1000,
          ).toISOString(),
          createdAt: "2024-02-01T00:00:00Z",
          workspaceId: workspaceId || "default",
        },
      ];

      return data || mockWebhooks;
    } catch (error) {
      console.error("Error fetching webhooks:", error);
      return [];
    }
  }

  async createWebhook(
    webhook: Omit<
      WebhookEndpoint,
      "id" | "secret" | "successRate" | "createdAt"
    >,
  ): Promise<{ data?: WebhookEndpoint; error?: Error }> {
    try {
      const secret = `whsec_${Math.random().toString(36).substr(2, 24)}`;

      const { data, error } = await supabase
        .from("webhooks")
        .insert([
          {
            ...webhook,
            secret,
            success_rate: 100,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async updateWebhook(
    id: string,
    updates: Partial<WebhookEndpoint>,
  ): Promise<{ data?: WebhookEndpoint; error?: Error }> {
    try {
      const { data, error } = await supabase
        .from("webhooks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async deleteWebhook(id: string): Promise<{ error?: Error }> {
    try {
      const { error } = await supabase.from("webhooks").delete().eq("id", id);

      if (error) throw error;

      return {};
    } catch (error) {
      return { error: error as Error };
    }
  }

  // Integration Templates
  async getIntegrationTemplates(): Promise<IntegrationTemplate[]> {
    try {
      const mockTemplates: IntegrationTemplate[] = [
        {
          id: "template-001",
          name: "SAP ERP",
          description:
            "Connect with SAP ERP systems for supplier and procurement data",
          provider: "SAP",
          type: "erp",
          configuration: {
            authentication: { type: "oauth2", credentials: {} },
            mapping: { inbound: [], outbound: [] },
            filters: [],
            transformation: [],
            validation: [],
          },
          requiredCredentials: ["client_id", "client_secret", "tenant_id"],
          supportedFeatures: ["Supplier Sync", "Purchase Orders", "Invoices"],
          documentation: "https://docs.guardian-io.com/integrations/sap",
          logoUrl: "https://cdn.guardian-io.com/logos/sap.png",
          category: "ERP",
          popularity: 95,
        },
        {
          id: "template-002",
          name: "Salesforce CRM",
          description: "Sync customer and account data from Salesforce",
          provider: "Salesforce",
          type: "crm",
          configuration: {
            authentication: { type: "oauth2", credentials: {} },
            mapping: { inbound: [], outbound: [] },
            filters: [],
            transformation: [],
            validation: [],
          },
          requiredCredentials: ["client_id", "client_secret", "instance_url"],
          supportedFeatures: [
            "Account Sync",
            "Contact Sync",
            "Opportunity Tracking",
          ],
          documentation: "https://docs.guardian-io.com/integrations/salesforce",
          logoUrl: "https://cdn.guardian-io.com/logos/salesforce.png",
          category: "CRM",
          popularity: 88,
        },
      ];

      return mockTemplates;
    } catch (error) {
      console.error("Error fetching integration templates:", error);
      return [];
    }
  }

  // Sync Operations
  async getSyncOperations(integrationId: string): Promise<SyncOperation[]> {
    try {
      const { data, error } = await supabase
        .from("sync_operations")
        .select("*")
        .eq("integration_id", integrationId)
        .order("started_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error("Error fetching sync operations:", error);
      return [];
    }
  }

  async getSyncOperation(id: string): Promise<SyncOperation | null> {
    try {
      const { data, error } = await supabase
        .from("sync_operations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error fetching sync operation:", error);
      return null;
    }
  }

  async cancelSyncOperation(id: string): Promise<{ error?: Error }> {
    try {
      const { error } = await supabase
        .from("sync_operations")
        .update({ status: "cancelled" })
        .eq("id", id);

      if (error) throw error;

      return {};
    } catch (error) {
      return { error: error as Error };
    }
  }
}

export const enterpriseIntegrationService = new EnterpriseIntegrationService();
export default enterpriseIntegrationService;
