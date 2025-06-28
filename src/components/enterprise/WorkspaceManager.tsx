import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  Building2,
  Users,
  Settings,
  Shield,
  Globe,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Crown,
  Lock,
  Unlock,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Database,
  Key,
  Activity,
  TrendingUp,
  BarChart3,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ExternalLink,
  Zap,
  Target,
  Award,
  Network,
  FileText,
  MessageSquare,
} from "lucide-react";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  domain: string;
  plan: "starter" | "professional" | "enterprise" | "custom";
  status: "active" | "suspended" | "trial" | "expired";
  createdAt: string;
  updatedAt: string;
  settings: WorkspaceSettings;
  metrics: WorkspaceMetrics;
  members: WorkspaceMember[];
  integrations: WorkspaceIntegration[];
  billing: BillingInfo;
  compliance: ComplianceInfo;
}

export interface WorkspaceSettings {
  branding: {
    primaryColor: string;
    logo: string;
    favicon: string;
    customDomain?: string;
  };
  security: {
    sso: {
      enabled: boolean;
      provider?: "saml" | "oidc" | "google" | "microsoft";
      configuration?: Record<string, any>;
    };
    mfa: {
      enabled: boolean;
      required: boolean;
    };
    ipWhitelist: string[];
    sessionTimeout: number;
  };
  features: {
    apiAccess: boolean;
    customReports: boolean;
    advancedAnalytics: boolean;
    webhooks: boolean;
    auditLogs: boolean;
    dataExport: boolean;
  };
  notifications: {
    email: boolean;
    slack: boolean;
    webhook: boolean;
    inApp: boolean;
  };
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  role: "owner" | "admin" | "manager" | "analyst" | "viewer";
  status: "active" | "invited" | "suspended";
  joinedAt: string;
  lastActive: string;
  permissions: string[];
  department?: string;
  title?: string;
}

export interface WorkspaceMetrics {
  users: {
    total: number;
    active: number;
    growth: number;
  };
  usage: {
    apiCalls: number;
    dataProcessed: number;
    reports: number;
    storage: number;
  };
  compliance: {
    score: number;
    issues: number;
    audits: number;
  };
  engagement: {
    dailyActive: number;
    sessionDuration: number;
    retention: number;
  };
}

export interface WorkspaceIntegration {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "error";
  lastSync: string;
  dataVolume: number;
}

export interface BillingInfo {
  plan: string;
  status: "active" | "past_due" | "canceled" | "trial";
  nextBilling: string;
  amount: number;
  currency: string;
  seats: number;
  usage: {
    api: number;
    storage: number;
    users: number;
  };
  limits: {
    api: number;
    storage: number;
    users: number;
  };
}

export interface ComplianceInfo {
  certifications: string[];
  audits: Array<{
    id: string;
    type: string;
    status: string;
    date: string;
    score: number;
  }>;
  policies: Array<{
    name: string;
    version: string;
    lastUpdated: string;
    status: string;
  }>;
  incidents: Array<{
    id: string;
    severity: string;
    status: string;
    reportedAt: string;
  }>;
}

const WorkspaceManager = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      const mockWorkspaces: Workspace[] = [
        {
          id: "1",
          name: "Global Supply Corp",
          slug: "global-supply",
          description: "Multinational supply chain management enterprise",
          domain: "globalsupply.com",
          plan: "enterprise",
          status: "active",
          createdAt: "2024-01-15T00:00:00Z",
          updatedAt: "2024-12-15T10:30:00Z",
          settings: {
            branding: {
              primaryColor: "#1e40af",
              logo: "https://example.com/logo1.png",
              favicon: "https://example.com/favicon1.ico",
              customDomain: "supply.globalsupply.com",
            },
            security: {
              sso: { enabled: true, provider: "saml" },
              mfa: { enabled: true, required: true },
              ipWhitelist: ["203.0.113.0/24", "198.51.100.0/24"],
              sessionTimeout: 3600,
            },
            features: {
              apiAccess: true,
              customReports: true,
              advancedAnalytics: true,
              webhooks: true,
              auditLogs: true,
              dataExport: true,
            },
            notifications: {
              email: true,
              slack: true,
              webhook: true,
              inApp: true,
            },
          },
          metrics: {
            users: { total: 247, active: 189, growth: 12.3 },
            usage: {
              apiCalls: 2847592,
              dataProcessed: 47382,
              reports: 1247,
              storage: 847,
            },
            compliance: { score: 94.2, issues: 3, audits: 12 },
            engagement: {
              dailyActive: 156,
              sessionDuration: 2847,
              retention: 89.4,
            },
          },
          members: [],
          integrations: [],
          billing: {
            plan: "Enterprise",
            status: "active",
            nextBilling: "2025-01-15T00:00:00Z",
            amount: 15000,
            currency: "USD",
            seats: 250,
            usage: { api: 2847592, storage: 847, users: 247 },
            limits: { api: 5000000, storage: 2000, users: 500 },
          },
          compliance: {
            certifications: ["SOC 2 Type II", "ISO 27001", "GDPR", "CCPA"],
            audits: [
              {
                id: "1",
                type: "SOC 2",
                status: "completed",
                date: "2024-11-15",
                score: 96.2,
              },
              {
                id: "2",
                type: "ISO 27001",
                status: "in_progress",
                date: "2024-12-01",
                score: 0,
              },
            ],
            policies: [
              {
                name: "Data Protection Policy",
                version: "2.1",
                lastUpdated: "2024-10-15",
                status: "active",
              },
              {
                name: "Access Control Policy",
                version: "1.3",
                lastUpdated: "2024-11-01",
                status: "active",
              },
            ],
            incidents: [
              {
                id: "1",
                severity: "low",
                status: "resolved",
                reportedAt: "2024-12-10T14:30:00Z",
              },
            ],
          },
        },
        {
          id: "2",
          name: "Sustainable Solutions Ltd",
          slug: "sustainable-solutions",
          description: "ESG compliance and sustainability consulting firm",
          domain: "sustainablesolutions.com",
          plan: "professional",
          status: "active",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-12-14T16:45:00Z",
          settings: {
            branding: {
              primaryColor: "#059669",
              logo: "https://example.com/logo2.png",
              favicon: "https://example.com/favicon2.ico",
            },
            security: {
              sso: { enabled: false },
              mfa: { enabled: true, required: false },
              ipWhitelist: [],
              sessionTimeout: 7200,
            },
            features: {
              apiAccess: true,
              customReports: true,
              advancedAnalytics: false,
              webhooks: false,
              auditLogs: true,
              dataExport: true,
            },
            notifications: {
              email: true,
              slack: false,
              webhook: false,
              inApp: true,
            },
          },
          metrics: {
            users: { total: 67, active: 52, growth: 8.7 },
            usage: {
              apiCalls: 847592,
              dataProcessed: 12847,
              reports: 342,
              storage: 247,
            },
            compliance: { score: 91.8, issues: 2, audits: 8 },
            engagement: {
              dailyActive: 41,
              sessionDuration: 1947,
              retention: 84.2,
            },
          },
          members: [],
          integrations: [],
          billing: {
            plan: "Professional",
            status: "active",
            nextBilling: "2025-03-20T00:00:00Z",
            amount: 4500,
            currency: "USD",
            seats: 75,
            usage: { api: 847592, storage: 247, users: 67 },
            limits: { api: 1000000, storage: 500, users: 100 },
          },
          compliance: {
            certifications: ["ISO 27001", "GDPR"],
            audits: [
              {
                id: "3",
                type: "GDPR",
                status: "completed",
                date: "2024-09-15",
                score: 92.1,
              },
            ],
            policies: [
              {
                name: "Privacy Policy",
                version: "1.2",
                lastUpdated: "2024-09-01",
                status: "active",
              },
            ],
            incidents: [],
          },
        },
        {
          id: "3",
          name: "TechFlow Innovations",
          slug: "techflow",
          description: "Technology startup focused on supply chain automation",
          domain: "techflow.io",
          plan: "starter",
          status: "trial",
          createdAt: "2024-11-01T00:00:00Z",
          updatedAt: "2024-12-15T09:15:00Z",
          settings: {
            branding: {
              primaryColor: "#7c3aed",
              logo: "https://example.com/logo3.png",
              favicon: "https://example.com/favicon3.ico",
            },
            security: {
              sso: { enabled: false },
              mfa: { enabled: false, required: false },
              ipWhitelist: [],
              sessionTimeout: 3600,
            },
            features: {
              apiAccess: false,
              customReports: false,
              advancedAnalytics: false,
              webhooks: false,
              auditLogs: false,
              dataExport: false,
            },
            notifications: {
              email: true,
              slack: false,
              webhook: false,
              inApp: true,
            },
          },
          metrics: {
            users: { total: 12, active: 9, growth: 25.0 },
            usage: {
              apiCalls: 47592,
              dataProcessed: 1247,
              reports: 23,
              storage: 12,
            },
            compliance: { score: 78.5, issues: 5, audits: 1 },
            engagement: {
              dailyActive: 7,
              sessionDuration: 847,
              retention: 75.0,
            },
          },
          members: [],
          integrations: [],
          billing: {
            plan: "Starter",
            status: "trial",
            nextBilling: "2024-12-31T00:00:00Z",
            amount: 0,
            currency: "USD",
            seats: 15,
            usage: { api: 47592, storage: 12, users: 12 },
            limits: { api: 100000, storage: 50, users: 20 },
          },
          compliance: {
            certifications: [],
            audits: [
              {
                id: "4",
                type: "Security Assessment",
                status: "scheduled",
                date: "2024-12-20",
                score: 0,
              },
            ],
            policies: [],
            incidents: [],
          },
        },
      ];

      setWorkspaces(mockWorkspaces);
      setSelectedWorkspace(mockWorkspaces[0]);
    } catch (error) {
      toast({
        title: "Error loading workspaces",
        description: "Failed to fetch workspace data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkspaces = workspaces.filter((workspace) => {
    const matchesSearch =
      workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workspace.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || workspace.status === statusFilter;
    const matchesPlan = planFilter === "all" || workspace.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "trial":
        return "bg-blue-500";
      case "suspended":
        return "bg-red-500";
      case "expired":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "starter":
        return "bg-gray-100 text-gray-800";
      case "professional":
        return "bg-blue-100 text-blue-800";
      case "enterprise":
        return "bg-purple-100 text-purple-800";
      case "custom":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading workspace management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Enterprise Workspace Management
          </h1>
          <p className="text-muted-foreground">
            Manage multi-tenant workspaces, users, and enterprise features
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Workspace
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Workspaces
                </p>
                <h3 className="text-2xl font-bold">{workspaces.length}</h3>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2">
              <Badge variant="default">
                {workspaces.filter((w) => w.status === "active").length} Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold">
                  {workspaces.reduce(
                    (acc, w) => acc + w.metrics.users.total,
                    0,
                  )}
                </h3>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <Badge variant="outline">
                {workspaces.reduce((acc, w) => acc + w.metrics.users.active, 0)}{" "}
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly Revenue
                </p>
                <h3 className="text-2xl font-bold">
                  {formatCurrency(
                    workspaces.reduce((acc, w) => acc + w.billing.amount, 0),
                  )}
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              <Badge variant="default" className="bg-green-500">
                +12.3% from last month
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  API Calls
                </p>
                <h3 className="text-2xl font-bold">
                  {(
                    workspaces.reduce(
                      (acc, w) => acc + w.metrics.usage.apiCalls,
                      0,
                    ) / 1000000
                  ).toFixed(1)}
                  M
                </h3>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-2">
              <Badge variant="outline">Last 30 days</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workspace List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Workspaces</CardTitle>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search workspaces..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {filteredWorkspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedWorkspace?.id === workspace.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedWorkspace(workspace)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={workspace.settings.branding.logo} />
                          <AvatarFallback>
                            {workspace.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-sm">
                            {workspace.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {workspace.domain}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(workspace.status)}>
                          {workspace.status}
                        </Badge>
                        <Badge className={getPlanColor(workspace.plan)}>
                          {workspace.plan}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {workspace.metrics.users.total} users
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workspace Details */}
        <div className="lg:col-span-2">
          {selectedWorkspace ? (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {selectedWorkspace.name}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {selectedWorkspace.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedWorkspace.metrics.users.total}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total Users
                        </p>
                        <Badge variant="outline" className="mt-1">
                          +{selectedWorkspace.metrics.users.growth}%
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedWorkspace.metrics.compliance.score}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Compliance Score
                        </p>
                        <Badge variant="default" className="mt-1 bg-green-500">
                          Excellent
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {(
                            selectedWorkspace.metrics.usage.apiCalls / 1000
                          ).toFixed(0)}
                          K
                        </div>
                        <p className="text-sm text-muted-foreground">
                          API Calls
                        </p>
                        <Badge variant="outline" className="mt-1">
                          30 days
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedWorkspace.metrics.engagement.retention}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          User Retention
                        </p>
                        <Badge variant="default" className="mt-1">
                          High
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Workspace Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Workspace Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Created:
                            </span>
                            <span>
                              {new Date(
                                selectedWorkspace.createdAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Last Updated:
                            </span>
                            <span>
                              {new Date(
                                selectedWorkspace.updatedAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Domain:
                            </span>
                            <span className="flex items-center gap-1">
                              {selectedWorkspace.domain}
                              <ExternalLink className="h-3 w-3" />
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Slug:</span>
                            <span className="font-mono">
                              {selectedWorkspace.slug}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Plan & Billing</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Plan:</span>
                            <Badge
                              className={getPlanColor(selectedWorkspace.plan)}
                            >
                              {selectedWorkspace.plan}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Monthly Cost:
                            </span>
                            <span className="font-semibold">
                              {formatCurrency(selectedWorkspace.billing.amount)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Next Billing:
                            </span>
                            <span>
                              {new Date(
                                selectedWorkspace.billing.nextBilling,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Seats Used:
                            </span>
                            <span>
                              {selectedWorkspace.billing.usage.users}/
                              {selectedWorkspace.billing.seats}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Usage Progress */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Resource Usage</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>API Calls</span>
                            <span>
                              {selectedWorkspace.billing.usage.api.toLocaleString()}{" "}
                              /{" "}
                              {selectedWorkspace.billing.limits.api.toLocaleString()}
                            </span>
                          </div>
                          <Progress
                            value={
                              (selectedWorkspace.billing.usage.api /
                                selectedWorkspace.billing.limits.api) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Storage (GB)</span>
                            <span>
                              {selectedWorkspace.billing.usage.storage} /{" "}
                              {selectedWorkspace.billing.limits.storage}
                            </span>
                          </div>
                          <Progress
                            value={
                              (selectedWorkspace.billing.usage.storage /
                                selectedWorkspace.billing.limits.storage) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Users</span>
                            <span>
                              {selectedWorkspace.billing.usage.users} /{" "}
                              {selectedWorkspace.billing.limits.users}
                            </span>
                          </div>
                          <Progress
                            value={
                              (selectedWorkspace.billing.usage.users /
                                selectedWorkspace.billing.limits.users) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        User Management
                      </span>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite User
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        User Management Interface
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Comprehensive user management with role-based access
                        control, SSO integration, and audit trails.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 border rounded-lg">
                          <Crown className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                          <h4 className="font-medium">Role Management</h4>
                          <p className="text-xs text-muted-foreground">
                            5 roles configured
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <Shield className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                          <h4 className="font-medium">SSO Integration</h4>
                          <p className="text-xs text-muted-foreground">
                            SAML enabled
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <Activity className="h-6 w-6 mx-auto mb-2 text-green-500" />
                          <h4 className="font-medium">Audit Logs</h4>
                          <p className="text-xs text-muted-foreground">
                            Real-time tracking
                          </p>
                        </div>
                      </div>
                      <Button>Launch User Management</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Billing & Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(selectedWorkspace.billing.amount)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Monthly Billing
                        </p>
                        <Badge variant="default" className="mt-2 bg-green-500">
                          {selectedWorkspace.billing.status}
                        </Badge>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold">
                          {selectedWorkspace.billing.seats}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Licensed Seats
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedWorkspace.billing.usage.users} in use
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold">
                          {new Date(
                            selectedWorkspace.billing.nextBilling,
                          ).toLocaleDateString()}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Next Billing
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Auto-renew enabled
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold">Plan Features</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(
                          selectedWorkspace.settings.features,
                        ).map(([feature, enabled]) => (
                          <div
                            key={feature}
                            className="flex items-center justify-between p-3 border rounded"
                          >
                            <span className="capitalize text-sm">
                              {feature.replace(/([A-Z])/g, " $1")}
                            </span>
                            {enabled ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </Button>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Plan
                      </Button>
                      <Button>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Upgrade Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Authentication</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <span className="font-medium">
                                Single Sign-On (SSO)
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {selectedWorkspace.settings.security.sso.enabled
                                  ? `Provider: ${selectedWorkspace.settings.security.sso.provider}`
                                  : "Configure SAML or OIDC"}
                              </p>
                            </div>
                            {selectedWorkspace.settings.security.sso.enabled ? (
                              <Badge variant="default">Enabled</Badge>
                            ) : (
                              <Badge variant="outline">Disabled</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <span className="font-medium">
                                Multi-Factor Authentication
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {selectedWorkspace.settings.security.mfa
                                  .required
                                  ? "Required for all users"
                                  : "Optional"}
                              </p>
                            </div>
                            {selectedWorkspace.settings.security.mfa.enabled ? (
                              <Badge variant="default">Enabled</Badge>
                            ) : (
                              <Badge variant="outline">Disabled</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Access Control</h4>
                        <div className="space-y-3">
                          <div className="p-3 border rounded">
                            <div className="font-medium mb-2">
                              Session Timeout
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {selectedWorkspace.settings.security
                                .sessionTimeout / 60}{" "}
                              minutes
                            </p>
                          </div>
                          <div className="p-3 border rounded">
                            <div className="font-medium mb-2">IP Whitelist</div>
                            {selectedWorkspace.settings.security.ipWhitelist
                              .length > 0 ? (
                              <div className="space-y-1">
                                {selectedWorkspace.settings.security.ipWhitelist.map(
                                  (ip, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="font-mono text-xs"
                                    >
                                      {ip}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No IP restrictions
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure SSO
                      </Button>
                      <Button variant="outline">
                        <Key className="h-4 w-4 mr-2" />
                        Manage API Keys
                      </Button>
                      <Button>
                        <Shield className="h-4 w-4 mr-2" />
                        Security Audit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Compliance & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedWorkspace.metrics.compliance.score}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Compliance Score
                        </p>
                        <Badge variant="default" className="mt-1 bg-green-500">
                          Excellent
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedWorkspace.compliance.certifications.length}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Active Certifications
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {selectedWorkspace.metrics.compliance.issues}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Open Issues
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold">Active Certifications</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {selectedWorkspace.compliance.certifications.map(
                          (cert, index) => (
                            <Badge
                              key={index}
                              variant="default"
                              className="text-center py-2"
                            >
                              {cert}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent Audits</h4>
                      <div className="space-y-2">
                        {selectedWorkspace.compliance.audits.map((audit) => (
                          <div
                            key={audit.id}
                            className="flex items-center justify-between p-3 border rounded"
                          >
                            <div>
                              <span className="font-medium">{audit.type}</span>
                              <p className="text-xs text-muted-foreground">
                                {new Date(audit.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {audit.score > 0 && (
                                <span className="text-sm font-medium">
                                  {audit.score}%
                                </span>
                              )}
                              <Badge
                                variant={
                                  audit.status === "completed"
                                    ? "default"
                                    : audit.status === "in_progress"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {audit.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Policies
                      </Button>
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Audit
                      </Button>
                      <Button>
                        <Award className="h-4 w-4 mr-2" />
                        Compliance Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Workspace Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Branding</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="workspace-name">
                              Workspace Name
                            </Label>
                            <Input
                              id="workspace-name"
                              value={selectedWorkspace.name}
                              readOnly
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="primary-color">Primary Color</Label>
                            <div className="flex items-center gap-3 mt-1">
                              <div
                                className="w-8 h-8 rounded border"
                                style={{
                                  backgroundColor:
                                    selectedWorkspace.settings.branding
                                      .primaryColor,
                                }}
                              />
                              <Input
                                id="primary-color"
                                value={
                                  selectedWorkspace.settings.branding
                                    .primaryColor
                                }
                                readOnly
                                className="flex-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="custom-domain">Custom Domain</Label>
                            <Input
                              id="custom-domain"
                              value={
                                selectedWorkspace.settings.branding
                                  .customDomain || ""
                              }
                              placeholder="custom.domain.com"
                              readOnly
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Notifications</h4>
                        <div className="space-y-3">
                          {Object.entries(
                            selectedWorkspace.settings.notifications,
                          ).map(([type, enabled]) => (
                            <div
                              key={type}
                              className="flex items-center justify-between p-3 border rounded"
                            >
                              <span className="capitalize">
                                {type} Notifications
                              </span>
                              {enabled ? (
                                <Badge variant="default">Enabled</Badge>
                              ) : (
                                <Badge variant="outline">Disabled</Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold">Danger Zone</h4>
                      <div className="p-4 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h5 className="font-medium text-red-800">
                              Suspend Workspace
                            </h5>
                            <p className="text-sm text-red-600">
                              Temporarily disable access to this workspace
                            </p>
                          </div>
                          <Button variant="destructive" size="sm">
                            <Lock className="h-4 w-4 mr-2" />
                            Suspend
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-red-800">
                              Delete Workspace
                            </h5>
                            <p className="text-sm text-red-600">
                              Permanently delete this workspace and all its data
                            </p>
                          </div>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Settings
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Settings
                      </Button>
                      <Button>
                        <Settings className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Select a Workspace
                </h3>
                <p className="text-muted-foreground">
                  Choose a workspace from the list to view its details and
                  manage settings.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceManager;
