import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  Building2,
  BarChart3,
  Globe,
  Settings,
  Database,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Award,
  Network,
  Server,
  Cloud,
  HardDrive,
  Cpu,
  Monitor,
  RefreshCw,
  Plus,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

// Import our enterprise components
import WorkspaceManager from "@/components/enterprise/WorkspaceManager";
import EnterpriseRBAC from "@/components/enterprise/EnterpriseRBAC";
import EnterpriseAnalytics from "@/components/enterprise/EnterpriseAnalytics";
import SecurityComplianceCenter from "@/components/enterprise/SecurityComplianceCenter";
import AutonomousComplianceEngine from "@/components/revolutionary/AutonomousComplianceEngine";

interface PlatformMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  unit: string;
  category: "users" | "workspaces" | "revenue" | "performance" | "security";
  target?: number;
}

interface SystemHealth {
  component: string;
  status: "healthy" | "warning" | "critical" | "maintenance";
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastCheck: string;
}

interface GlobalOperation {
  id: string;
  type: "deployment" | "maintenance" | "incident" | "upgrade";
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  priority: "low" | "medium" | "high" | "critical";
  assignee: string;
  startTime: string;
  endTime?: string;
  affectedRegions: string[];
}

const EnterpriseSuperadminDashboard = () => {
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetric[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([]);
  const [globalOperations, setGlobalOperations] = useState<GlobalOperation[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    fetchDashboardData();

    // Set up real-time updates
    const interval = setInterval(fetchDashboardData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Mock data for enterprise superadmin dashboard
      const mockPlatformMetrics: PlatformMetric[] = [
        {
          id: "total-users",
          name: "Total Users",
          value: 247892,
          change: 12.3,
          changeType: "increase",
          unit: "users",
          category: "users",
          target: 300000,
        },
        {
          id: "active-workspaces",
          name: "Active Workspaces",
          value: 3421,
          change: 8.7,
          changeType: "increase",
          unit: "workspaces",
          category: "workspaces",
          target: 4000,
        },
        {
          id: "monthly-revenue",
          name: "Monthly Revenue",
          value: 28475920,
          change: 15.2,
          changeType: "increase",
          unit: "USD",
          category: "revenue",
          target: 30000000,
        },
        {
          id: "global-suppliers",
          name: "Global Suppliers",
          value: 45692,
          change: 6.8,
          changeType: "increase",
          unit: "suppliers",
          category: "users",
        },
        {
          id: "api-requests",
          name: "API Requests/hour",
          value: 2847592,
          change: -3.2,
          changeType: "decrease",
          unit: "requests",
          category: "performance",
        },
        {
          id: "platform-uptime",
          name: "Platform Uptime",
          value: 99.97,
          change: 0.02,
          changeType: "increase",
          unit: "%",
          category: "performance",
          target: 99.99,
        },
        {
          id: "security-incidents",
          name: "Security Incidents",
          value: 7,
          change: -42.9,
          changeType: "decrease",
          unit: "incidents",
          category: "security",
        },
        {
          id: "compliance-score",
          name: "Global Compliance Score",
          value: 94.2,
          change: 2.1,
          changeType: "increase",
          unit: "%",
          category: "security",
          target: 95,
        },
      ];

      const mockSystemHealth: SystemHealth[] = [
        {
          component: "Authentication Service",
          status: "healthy",
          uptime: 99.98,
          responseTime: 145,
          errorRate: 0.02,
          lastCheck: new Date().toISOString(),
        },
        {
          component: "Database Cluster",
          status: "healthy",
          uptime: 99.95,
          responseTime: 89,
          errorRate: 0.01,
          lastCheck: new Date().toISOString(),
        },
        {
          component: "API Gateway",
          status: "warning",
          uptime: 99.87,
          responseTime: 234,
          errorRate: 0.08,
          lastCheck: new Date().toISOString(),
        },
        {
          component: "Message Queue",
          status: "healthy",
          uptime: 99.99,
          responseTime: 12,
          errorRate: 0.0,
          lastCheck: new Date().toISOString(),
        },
        {
          component: "File Storage",
          status: "healthy",
          uptime: 99.94,
          responseTime: 178,
          errorRate: 0.03,
          lastCheck: new Date().toISOString(),
        },
        {
          component: "Search Engine",
          status: "maintenance",
          uptime: 99.82,
          responseTime: 345,
          errorRate: 0.15,
          lastCheck: new Date().toISOString(),
        },
      ];

      const mockGlobalOperations: GlobalOperation[] = [
        {
          id: "op-001",
          type: "deployment",
          title: "Platform v3.2.1 Deployment",
          description:
            "Rolling deployment of new platform version across all regions",
          status: "in-progress",
          priority: "high",
          assignee: "DevOps Team",
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          affectedRegions: ["us-east-1", "eu-west-1", "ap-southeast-1"],
        },
        {
          id: "op-002",
          type: "maintenance",
          title: "Database Index Optimization",
          description:
            "Optimizing database indexes for improved query performance",
          status: "completed",
          priority: "medium",
          assignee: "Database Team",
          startTime: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          affectedRegions: ["global"],
        },
        {
          id: "op-003",
          type: "incident",
          title: "API Rate Limiting Issue",
          description: "Investigating elevated error rates in API gateway",
          status: "pending",
          priority: "critical",
          assignee: "Platform Engineering",
          startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          affectedRegions: ["us-west-2"],
        },
      ];

      setPlatformMetrics(mockPlatformMetrics);
      setSystemHealth(mockSystemHealth);
      setGlobalOperations(mockGlobalOperations);
    } catch (error) {
      toast({
        title: "Error loading dashboard data",
        description: "Failed to fetch platform metrics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "completed":
        return "bg-green-500";
      case "warning":
      case "in-progress":
        return "bg-yellow-500";
      case "critical":
      case "failed":
        return "bg-red-500";
      case "maintenance":
      case "pending":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "users":
        return Users;
      case "workspaces":
        return Building2;
      case "revenue":
        return TrendingUp;
      case "performance":
        return Zap;
      case "security":
        return Shield;
      default:
        return BarChart3;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
    }

    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M ${unit}`;
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K ${unit}`;
    }

    return `${value.toLocaleString()} ${unit}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading enterprise dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Enterprise Superadmin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Global platform oversight, operations management, and enterprise
            administration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Platform Report
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Incident Response
          </Button>
        </div>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
          <TabsTrigger value="users">Users & RBAC</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="ai-compliance">🚀 AI Engine</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Platform Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformMetrics.map((metric) => {
              const IconComponent = getCategoryIcon(metric.category);
              const changeColor =
                metric.changeType === "increase"
                  ? "text-green-600"
                  : metric.changeType === "decrease"
                    ? "text-red-600"
                    : "text-gray-600";

              return (
                <Card
                  key={metric.id}
                  className="hover:shadow-lg transition-all duration-200"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {metric.category}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">{metric.name}</h3>
                      <div className="text-2xl font-bold">
                        {formatValue(metric.value, metric.unit)}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className={`text-sm ${changeColor}`}>
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}% from last month
                        </div>
                        {metric.target && (
                          <div className="text-xs text-muted-foreground">
                            Target: {formatValue(metric.target, metric.unit)}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* System Health Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Health Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemHealth.map((system, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm">
                        {system.component}
                      </h4>
                      <Badge className={getStatusColor(system.status)}>
                        {system.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="font-medium">{system.uptime}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Response:</span>
                        <span className="font-medium">
                          {system.responseTime}ms
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Error Rate:
                        </span>
                        <span className="font-medium">{system.errorRate}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last check:{" "}
                        {new Date(system.lastCheck).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Global Operations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalOperations.map((operation) => (
                  <div key={operation.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{operation.title}</h4>
                          <Badge className={getStatusColor(operation.status)}>
                            {operation.status}
                          </Badge>
                          <Badge
                            className={getPriorityColor(operation.priority)}
                          >
                            {operation.priority}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {operation.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {operation.description}
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Assignee:</span>
                            <p className="text-muted-foreground">
                              {operation.assignee}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Started:</span>
                            <p className="text-muted-foreground">
                              {new Date(operation.startTime).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span>
                            <p className="text-muted-foreground">
                              {operation.endTime
                                ? `${Math.round((new Date(operation.endTime).getTime() - new Date(operation.startTime).getTime()) / (1000 * 60))} min`
                                : `${Math.round((Date.now() - new Date(operation.startTime).getTime()) / (1000 * 60))} min`}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Regions:</span>
                            <p className="text-muted-foreground">
                              {operation.affectedRegions.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                        {operation.status === "in-progress" && (
                          <Button size="sm" variant="destructive">
                            Abort
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Building2 className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Manage Workspaces</h3>
                <p className="text-sm text-muted-foreground">
                  Create, configure, and monitor enterprise workspaces
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                <h3 className="font-semibold mb-2">User Management</h3>
                <p className="text-sm text-muted-foreground">
                  Control access, roles, and permissions globally
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-3 text-green-500" />
                <h3 className="font-semibold mb-2">Platform Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive usage and performance insights
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 text-red-500" />
                <h3 className="font-semibold mb-2">Security Center</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor security and compliance across all regions
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workspaces">
          <WorkspaceManager />
        </TabsContent>

        <TabsContent value="users">
          <EnterpriseRBAC />
        </TabsContent>

        <TabsContent value="analytics">
          <EnterpriseAnalytics />
        </TabsContent>

        <TabsContent value="security">
          <SecurityComplianceCenter />
        </TabsContent>

        <TabsContent value="ai-compliance">
          <AutonomousComplianceEngine />
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Global Operations Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Global Operations Management
                </h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive platform operations including deployments,
                  maintenance, monitoring, and incident response across all
                  global regions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <Cloud className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Infrastructure</h4>
                    <p className="text-xs text-muted-foreground">
                      Multi-region deployment
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Monitor className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Monitoring</h4>
                    <p className="text-xs text-muted-foreground">
                      24/7 system monitoring
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                    <h4 className="font-medium">Incident Response</h4>
                    <p className="text-xs text-muted-foreground">
                      Automated escalation
                    </p>
                  </div>
                </div>
                <Button>
                  <Activity className="h-4 w-4 mr-2" />
                  Launch Operations Console
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseSuperadminDashboard;
