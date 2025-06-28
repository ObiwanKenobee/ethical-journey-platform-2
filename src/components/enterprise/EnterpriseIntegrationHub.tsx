import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Puzzle,
  Database,
  Cloud,
  Webhook,
  Key,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash,
  Copy,
  Eye,
  EyeOff,
  Refresh,
  Download,
  Upload,
  Code,
  GitBranch,
  Zap,
  Lock,
  Unlock,
  Clock,
  Activity,
  BarChart3,
  Users,
  Globe,
  Shield,
  Cpu,
  Monitor,
  Server,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  type:
    | "erp"
    | "crm"
    | "api"
    | "database"
    | "blockchain"
    | "ai"
    | "iot"
    | "compliance";
  status: "active" | "inactive" | "error" | "connecting" | "pending";
  provider: string;
  description: string;
  version: string;
  lastSync: string;
  syncFrequency: string;
  dataVolume: number;
  uptime: number;
  errorRate: number;
  endpoints: number;
  authentication: {
    type: "api_key" | "oauth" | "basic" | "certificate";
    status: "valid" | "expired" | "invalid";
    expiresAt?: string;
  };
  configuration: {
    baseUrl: string;
    timeout: number;
    retries: number;
    rateLimits: {
      requests: number;
      period: string;
    };
  };
  metrics: {
    requestsToday: number;
    avgResponseTime: number;
    successRate: number;
    dataTransferred: number;
  };
  features: string[];
  pricing: {
    tier: string;
    cost: number;
    billing: "monthly" | "yearly" | "usage";
  };
}

interface APIEndpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  responses: {
    code: number;
    description: string;
    schema: string;
  }[];
  authentication: boolean;
  rateLimit: number;
  lastUsed: string;
  usage: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

interface WebhookConfiguration {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "active" | "inactive" | "failed";
  secret: string;
  retryPolicy: {
    maxRetries: number;
    backoffStrategy: "linear" | "exponential";
    initialDelay: number;
  };
  headers: { [key: string]: string };
  lastTriggered: string;
  successRate: number;
  totalDeliveries: number;
  failedDeliveries: number;
}

const EnterpriseIntegrationHub: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showAPIKey, setShowAPIKey] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(
    null,
  );

  const [integrations] = useState<Integration[]>([
    {
      id: "int001",
      name: "SAP ERP",
      type: "erp",
      status: "active",
      provider: "SAP",
      description:
        "Enterprise resource planning system integration for procurement and supply chain data",
      version: "2.1.4",
      lastSync: "2024-01-15T16:45:00Z",
      syncFrequency: "Real-time",
      dataVolume: 156000,
      uptime: 99.8,
      errorRate: 0.2,
      endpoints: 24,
      authentication: {
        type: "oauth",
        status: "valid",
        expiresAt: "2024-06-15T00:00:00Z",
      },
      configuration: {
        baseUrl: "https://api.sap.company.com",
        timeout: 30000,
        retries: 3,
        rateLimits: {
          requests: 1000,
          period: "hour",
        },
      },
      metrics: {
        requestsToday: 2847,
        avgResponseTime: 245,
        successRate: 99.8,
        dataTransferred: 1.2,
      },
      features: [
        "Procurement",
        "Inventory",
        "Financial Data",
        "Supplier Management",
      ],
      pricing: {
        tier: "Enterprise",
        cost: 2500,
        billing: "monthly",
      },
    },
    {
      id: "int002",
      name: "Salesforce CRM",
      type: "crm",
      status: "active",
      provider: "Salesforce",
      description:
        "Customer relationship management system for supplier and partner data synchronization",
      version: "1.8.2",
      lastSync: "2024-01-15T16:30:00Z",
      syncFrequency: "Every 15 minutes",
      dataVolume: 89000,
      uptime: 99.9,
      errorRate: 0.1,
      endpoints: 18,
      authentication: {
        type: "oauth",
        status: "valid",
        expiresAt: "2024-08-20T00:00:00Z",
      },
      configuration: {
        baseUrl: "https://api.salesforce.com",
        timeout: 20000,
        retries: 2,
        rateLimits: {
          requests: 5000,
          period: "hour",
        },
      },
      metrics: {
        requestsToday: 1456,
        avgResponseTime: 180,
        successRate: 99.9,
        dataTransferred: 0.8,
      },
      features: [
        "Contact Management",
        "Account Data",
        "Opportunity Tracking",
        "Reports",
      ],
      pricing: {
        tier: "Professional",
        cost: 1200,
        billing: "monthly",
      },
    },
    {
      id: "int003",
      name: "Ethereum Blockchain",
      type: "blockchain",
      status: "active",
      provider: "Ethereum Foundation",
      description:
        "Blockchain integration for supply chain transparency and smart contract execution",
      version: "3.2.1",
      lastSync: "2024-01-15T16:47:00Z",
      syncFrequency: "Real-time",
      dataVolume: 45000,
      uptime: 99.5,
      errorRate: 0.5,
      endpoints: 12,
      authentication: {
        type: "api_key",
        status: "valid",
      },
      configuration: {
        baseUrl: "https://mainnet.infura.io/v3",
        timeout: 15000,
        retries: 5,
        rateLimits: {
          requests: 100000,
          period: "day",
        },
      },
      metrics: {
        requestsToday: 5623,
        avgResponseTime: 320,
        successRate: 99.5,
        dataTransferred: 2.1,
      },
      features: [
        "Smart Contracts",
        "Transaction Verification",
        "Asset Tokenization",
        "Audit Trail",
      ],
      pricing: {
        tier: "Custom",
        cost: 800,
        billing: "monthly",
      },
    },
    {
      id: "int004",
      name: "IBM Watson AI",
      type: "ai",
      status: "error",
      provider: "IBM",
      description:
        "AI and machine learning services for predictive analytics and risk assessment",
      version: "2.5.0",
      lastSync: "2024-01-15T14:20:00Z",
      syncFrequency: "On-demand",
      dataVolume: 234000,
      uptime: 98.2,
      errorRate: 1.8,
      endpoints: 16,
      authentication: {
        type: "api_key",
        status: "expired",
        expiresAt: "2024-01-10T00:00:00Z",
      },
      configuration: {
        baseUrl: "https://api.watson.cloud.ibm.com",
        timeout: 60000,
        retries: 3,
        rateLimits: {
          requests: 10000,
          period: "day",
        },
      },
      metrics: {
        requestsToday: 0,
        avgResponseTime: 0,
        successRate: 0,
        dataTransferred: 0,
      },
      features: [
        "Natural Language Processing",
        "Predictive Analytics",
        "Risk Assessment",
        "Data Mining",
      ],
      pricing: {
        tier: "Enterprise",
        cost: 3500,
        billing: "monthly",
      },
    },
  ]);

  const [apiEndpoints] = useState<APIEndpoint[]>([
    {
      id: "api001",
      name: "Get Supplier Data",
      method: "GET",
      path: "/api/v1/suppliers/{id}",
      description: "Retrieve detailed information about a specific supplier",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Unique supplier identifier",
        },
        {
          name: "include",
          type: "array",
          required: false,
          description:
            "Additional data to include (contacts, assessments, etc.)",
        },
      ],
      responses: [
        {
          code: 200,
          description: "Supplier data retrieved successfully",
          schema: "SupplierResponse",
        },
        {
          code: 404,
          description: "Supplier not found",
          schema: "ErrorResponse",
        },
      ],
      authentication: true,
      rateLimit: 1000,
      lastUsed: "2024-01-15T16:30:00Z",
      usage: {
        daily: 234,
        weekly: 1567,
        monthly: 6789,
      },
    },
    {
      id: "api002",
      name: "Create Risk Assessment",
      method: "POST",
      path: "/api/v1/assessments",
      description:
        "Create a new risk assessment for a supplier or supply chain route",
      parameters: [
        {
          name: "supplierId",
          type: "string",
          required: true,
          description: "Target supplier for assessment",
        },
        {
          name: "assessmentType",
          type: "string",
          required: true,
          description: "Type of assessment (labor, environmental, etc.)",
        },
        {
          name: "data",
          type: "object",
          required: true,
          description: "Assessment data payload",
        },
      ],
      responses: [
        {
          code: 201,
          description: "Assessment created successfully",
          schema: "AssessmentResponse",
        },
        {
          code: 400,
          description: "Invalid assessment data",
          schema: "ValidationErrorResponse",
        },
      ],
      authentication: true,
      rateLimit: 500,
      lastUsed: "2024-01-15T15:45:00Z",
      usage: {
        daily: 45,
        weekly: 298,
        monthly: 1234,
      },
    },
    {
      id: "api003",
      name: "Get Compliance Status",
      method: "GET",
      path: "/api/v1/compliance/{framework}",
      description:
        "Retrieve compliance status for a specific regulatory framework",
      parameters: [
        {
          name: "framework",
          type: "string",
          required: true,
          description: "Compliance framework (GDPR, SOC2, etc.)",
        },
        {
          name: "workspaceId",
          type: "string",
          required: false,
          description: "Specific workspace scope",
        },
      ],
      responses: [
        {
          code: 200,
          description: "Compliance status retrieved",
          schema: "ComplianceResponse",
        },
        { code: 403, description: "Access denied", schema: "ErrorResponse" },
      ],
      authentication: true,
      rateLimit: 2000,
      lastUsed: "2024-01-15T16:15:00Z",
      usage: {
        daily: 89,
        weekly: 567,
        monthly: 2345,
      },
    },
  ]);

  const [webhooks] = useState<WebhookConfiguration[]>([
    {
      id: "wh001",
      name: "Risk Alert Notifications",
      url: "https://alerts.company.com/webhook/risk",
      events: ["risk.detected", "risk.escalated", "risk.resolved"],
      status: "active",
      secret: "wh_secret_abc123...",
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: "exponential",
        initialDelay: 1000,
      },
      headers: {
        "Content-Type": "application/json",
        "X-Source": "Atlas-Platform",
      },
      lastTriggered: "2024-01-15T16:20:00Z",
      successRate: 98.5,
      totalDeliveries: 1247,
      failedDeliveries: 19,
    },
    {
      id: "wh002",
      name: "Compliance Updates",
      url: "https://compliance.company.com/webhook",
      events: [
        "compliance.violation",
        "compliance.resolved",
        "regulation.updated",
      ],
      status: "active",
      secret: "wh_secret_def456...",
      retryPolicy: {
        maxRetries: 5,
        backoffStrategy: "linear",
        initialDelay: 2000,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token_xyz789",
      },
      lastTriggered: "2024-01-15T14:35:00Z",
      successRate: 99.2,
      totalDeliveries: 892,
      failedDeliveries: 7,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "connecting":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "erp":
        return <Database className="h-5 w-5 text-blue-500" />;
      case "crm":
        return <Users className="h-5 w-5 text-green-500" />;
      case "api":
        return <Code className="h-5 w-5 text-purple-500" />;
      case "blockchain":
        return <GitBranch className="h-5 w-5 text-orange-500" />;
      case "ai":
        return <Cpu className="h-5 w-5 text-pink-500" />;
      case "iot":
        return <Monitor className="h-5 w-5 text-cyan-500" />;
      case "compliance":
        return <Shield className="h-5 w-5 text-red-500" />;
      default:
        return <Puzzle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800";
      case "POST":
        return "bg-green-100 text-green-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Puzzle className="h-8 w-8 text-primary" />
            Enterprise Integration Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage integrations, APIs, and data connections across your
            enterprise ecosystem
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Integrations
                </p>
                <p className="text-xl font-bold">{integrations.length}</p>
              </div>
              <Puzzle className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Active
                </p>
                <p className="text-xl font-bold text-green-600">
                  {integrations.filter((i) => i.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  API Endpoints
                </p>
                <p className="text-xl font-bold">
                  {integrations.reduce((sum, i) => sum + i.endpoints, 0)}
                </p>
              </div>
              <Code className="h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Daily Requests
                </p>
                <p className="text-xl font-bold">
                  {integrations
                    .reduce((sum, i) => sum + i.metrics.requestsToday, 0)
                    .toLocaleString()}
                </p>
              </div>
              <Activity className="h-5 w-5 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Avg Uptime
                </p>
                <p className="text-xl font-bold">
                  {(
                    integrations.reduce((sum, i) => sum + i.uptime, 0) /
                    integrations.length
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <BarChart3 className="h-5 w-5 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Data Volume
                </p>
                <p className="text-xl font-bold">
                  {(
                    integrations.reduce((sum, i) => sum + i.dataVolume, 0) /
                    1000
                  ).toFixed(0)}
                  K
                </p>
              </div>
              <Server className="h-5 w-5 text-pink-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Management</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Health Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Integration Health Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getTypeIcon(integration.type)}
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {integration.provider}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right text-sm">
                          <p>Uptime: {integration.uptime}%</p>
                          <p className="text-muted-foreground">
                            {integration.metrics.requestsToday} requests today
                          </p>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Success Rate</span>
                      <span className="font-medium">99.2%</span>
                    </div>
                    <Progress value={99.2} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Response Time</span>
                      <span className="font-medium">248ms</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Transfer Rate</span>
                      <span className="font-medium">4.1 GB/day</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Error Rate</span>
                      <span className="font-medium">0.8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Integration Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border-l-4 border-l-green-500 bg-green-50">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">
                      SAP ERP synchronization completed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      156,000 records processed successfully
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    2 mins ago
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 border-l-4 border-l-red-500 bg-red-50">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium">
                      IBM Watson AI authentication expired
                    </p>
                    <p className="text-sm text-muted-foreground">
                      API key needs renewal for continued access
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    1 hour ago
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 border-l-4 border-l-blue-500 bg-blue-50">
                  <Plus className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">
                      New webhook endpoint configured
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Risk alert notifications webhook is now active
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    3 hours ago
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Integration Management</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Refresh className="h-4 w-4 mr-2" />
                Sync All
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {integrations.map((integration) => (
              <Card
                key={integration.id}
                className="border-l-4 border-l-primary"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(integration.type)}
                      <div>
                        <h3 className="text-xl font-semibold">
                          {integration.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {integration.provider} • Version {integration.version}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status.toUpperCase()}
                      </Badge>
                      {integration.authentication.status === "expired" && (
                        <Badge variant="destructive">Auth Expired</Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm mb-4">{integration.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-medium">Uptime</p>
                      <p className="text-lg font-bold text-green-600">
                        {integration.uptime}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Requests Today</p>
                      <p className="text-lg font-bold">
                        {integration.metrics.requestsToday.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Success Rate</p>
                      <p className="text-lg font-bold">
                        {integration.metrics.successRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Avg Response</p>
                      <p className="text-lg font-bold">
                        {integration.metrics.avgResponseTime}ms
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Data Volume</p>
                      <p className="text-lg font-bold">
                        {(integration.dataVolume / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Monthly Cost</p>
                      <p className="text-lg font-bold">
                        ${integration.pricing.cost}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Configuration</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Base URL:</span>
                          <span className="font-mono text-xs">
                            {integration.configuration.baseUrl}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sync Frequency:</span>
                          <span>{integration.syncFrequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rate Limit:</span>
                          <span>
                            {integration.configuration.rateLimits.requests}/
                            {integration.configuration.rateLimits.period}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Authentication:</span>
                          <Badge variant="outline" className="capitalize">
                            {integration.authentication.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {integration.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-xs text-muted-foreground">
                      Last sync:{" "}
                      {new Date(integration.lastSync).toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Logs
                      </Button>
                      <Button size="sm" variant="outline">
                        <Refresh className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                      {integration.status === "error" && (
                        <Button size="sm">
                          <Zap className="h-4 w-4 mr-2" />
                          Fix Issues
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">API Endpoint Management</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export OpenAPI
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Endpoint
              </Button>
            </div>
          </div>

          {/* API Key Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Key Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">Primary API Key</p>
                  <div className="flex items-center gap-2">
                    <Input
                      type={showAPIKey ? "text" : "password"}
                      value="sk_live_abcd1234567890efghijklmnopqrstuvwxyz"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAPIKey(!showAPIKey)}
                    >
                      {showAPIKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Refresh className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <div className="grid gap-4">
            {apiEndpoints.map((endpoint) => (
              <Card key={endpoint.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <div>
                        <h3 className="font-semibold">{endpoint.name}</h3>
                        <p className="text-sm font-mono text-muted-foreground">
                          {endpoint.path}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {endpoint.authentication && (
                        <Badge variant="outline">
                          <Lock className="h-3 w-3 mr-1" />
                          Auth Required
                        </Badge>
                      )}
                      <Badge variant="outline">
                        Rate Limit: {endpoint.rateLimit}/hour
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{endpoint.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Daily Usage</p>
                      <p className="text-lg font-bold">
                        {endpoint.usage.daily}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Weekly Usage</p>
                      <p className="text-lg font-bold">
                        {endpoint.usage.weekly}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Monthly Usage</p>
                      <p className="text-lg font-bold">
                        {endpoint.usage.monthly}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Parameters</h4>
                      <div className="space-y-2">
                        {endpoint.parameters.map((param, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Badge
                              variant={param.required ? "default" : "outline"}
                              className="text-xs"
                            >
                              {param.type}
                            </Badge>
                            <span className="font-mono">{param.name}</span>
                            {param.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <span className="text-muted-foreground">
                              - {param.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Responses</h4>
                      <div className="space-y-2">
                        {endpoint.responses.map((response, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Badge
                              className={
                                response.code < 300
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {response.code}
                            </Badge>
                            <span>{response.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Last used: {new Date(endpoint.lastUsed).toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Code className="h-4 w-4 mr-2" />
                        Test API
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Docs
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Webhook Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Webhook
            </Button>
          </div>

          <div className="grid gap-6">
            {webhooks.map((webhook) => (
              <Card key={webhook.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{webhook.name}</h3>
                      <p className="text-sm font-mono text-muted-foreground">
                        {webhook.url}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(webhook.status)}>
                        {webhook.status.toUpperCase()}
                      </Badge>
                      <Switch checked={webhook.status === "active"} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-medium">Success Rate</p>
                      <p className="text-lg font-bold text-green-600">
                        {webhook.successRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Deliveries</p>
                      <p className="text-lg font-bold">
                        {webhook.totalDeliveries}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Failed Deliveries</p>
                      <p className="text-lg font-bold text-red-600">
                        {webhook.failedDeliveries}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Triggered</p>
                      <p className="text-lg font-bold">
                        {new Date(webhook.lastTriggered).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Events</h4>
                      <div className="flex flex-wrap gap-2">
                        {webhook.events.map((event, index) => (
                          <Badge key={index} variant="outline">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Configuration</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Max Retries:</span>
                          <span>{webhook.retryPolicy.maxRetries}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Backoff Strategy:</span>
                          <span className="capitalize">
                            {webhook.retryPolicy.backoffStrategy}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Initial Delay:</span>
                          <span>{webhook.retryPolicy.initialDelay}ms</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-3">Webhook Secret</h4>
                    <div className="flex items-center gap-2">
                      <Input
                        type="password"
                        value={webhook.secret}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Refresh className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-xs text-muted-foreground">
                      Last triggered:{" "}
                      {new Date(webhook.lastTriggered).toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Code className="h-4 w-4 mr-2" />
                        Test Webhook
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Logs
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Integration Monitoring & Analytics
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure Alerts
              </Button>
            </div>
          </div>

          {/* Monitoring Dashboard would go here */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Real-time Monitoring Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Advanced monitoring dashboard with real-time metrics,
                  alerting, and performance analytics is available in the
                  enterprise monitoring module. Configure custom dashboards, set
                  up automated alerts, and track SLA compliance across all
                  integrations.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseIntegrationHub;
