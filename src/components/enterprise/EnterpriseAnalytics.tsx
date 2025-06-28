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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Globe,
  Database,
  Zap,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Filter,
  Search,
  Calendar,
  FileText,
  PieChart,
  LineChart,
  Eye,
  Settings,
  Share2,
  Bookmark,
  PlayCircle,
  Pause,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  ResponsiveContainer,
  ComposedChart,
  Tooltip,
  ScatterChart,
  Scatter,
} from "recharts";

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  unit: string;
  target?: number;
  category:
    | "operational"
    | "financial"
    | "compliance"
    | "engagement"
    | "performance";
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: "standard" | "custom" | "automated";
  category: "executive" | "operational" | "compliance" | "financial";
  frequency:
    | "real-time"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "quarterly";
  status: "active" | "paused" | "draft";
  lastGenerated: string;
  createdBy: string;
  subscribers: string[];
  format: "pdf" | "excel" | "csv" | "dashboard";
  permissions: string[];
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  type: "executive" | "operational" | "analytical" | "compliance";
  owner: string;
  isPublic: boolean;
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  filters: DashboardFilter[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  favoriteCount: number;
}

export interface DashboardWidget {
  id: string;
  type: "chart" | "metric" | "table" | "map" | "text" | "iframe";
  title: string;
  description?: string;
  dataSource: string;
  configuration: Record<string, any>;
  position: { x: number; y: number; w: number; h: number };
  refreshInterval?: number;
  permissions: string[];
}

export interface DashboardLayout {
  cols: number;
  rows: number;
  gap: number;
  responsive: boolean;
}

export interface DashboardFilter {
  id: string;
  name: string;
  type: "date" | "select" | "multi-select" | "text" | "number";
  options?: string[];
  defaultValue?: any;
  required: boolean;
}

const EnterpriseAnalytics = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedTimeRange, selectedCategory]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Mock data for demonstration
      const mockMetrics: AnalyticsMetric[] = [
        {
          id: "total-users",
          name: "Total Users",
          value: 12847,
          change: 12.3,
          changeType: "increase",
          period: "vs last month",
          unit: "users",
          target: 15000,
          category: "engagement",
        },
        {
          id: "active-workspaces",
          name: "Active Workspaces",
          value: 247,
          change: 8.7,
          changeType: "increase",
          period: "vs last month",
          unit: "workspaces",
          target: 300,
          category: "operational",
        },
        {
          id: "monthly-revenue",
          name: "Monthly Revenue",
          value: 2847592,
          change: 15.2,
          changeType: "increase",
          period: "vs last month",
          unit: "USD",
          target: 3000000,
          category: "financial",
        },
        {
          id: "compliance-score",
          name: "Global Compliance Score",
          value: 94.2,
          change: 2.1,
          changeType: "increase",
          period: "vs last quarter",
          unit: "%",
          target: 95,
          category: "compliance",
        },
        {
          id: "api-calls",
          name: "API Calls",
          value: 28475920,
          change: -3.2,
          changeType: "decrease",
          period: "vs last week",
          unit: "calls",
          category: "performance",
        },
        {
          id: "data-processed",
          name: "Data Processed",
          value: 847.2,
          change: 18.4,
          changeType: "increase",
          period: "vs last month",
          unit: "GB",
          category: "performance",
        },
        {
          id: "user-retention",
          name: "User Retention",
          value: 89.4,
          change: 4.7,
          changeType: "increase",
          period: "vs last quarter",
          unit: "%",
          target: 90,
          category: "engagement",
        },
        {
          id: "security-incidents",
          name: "Security Incidents",
          value: 3,
          change: -50,
          changeType: "decrease",
          period: "vs last month",
          unit: "incidents",
          target: 0,
          category: "compliance",
        },
      ];

      const mockReports: Report[] = [
        {
          id: "executive-summary",
          name: "Executive Summary Report",
          description: "High-level overview of business metrics and KPIs",
          type: "standard",
          category: "executive",
          frequency: "weekly",
          status: "active",
          lastGenerated: "2024-12-15T08:00:00Z",
          createdBy: "System",
          subscribers: ["ceo@company.com", "cfo@company.com"],
          format: "pdf",
          permissions: ["executive", "admin"],
        },
        {
          id: "compliance-audit",
          name: "Compliance Audit Report",
          description: "Detailed compliance status across all workspaces",
          type: "automated",
          category: "compliance",
          frequency: "monthly",
          status: "active",
          lastGenerated: "2024-12-01T00:00:00Z",
          createdBy: "Compliance Team",
          subscribers: ["compliance@company.com", "legal@company.com"],
          format: "pdf",
          permissions: ["compliance", "admin"],
        },
        {
          id: "financial-performance",
          name: "Financial Performance Dashboard",
          description: "Revenue, costs, and financial KPIs analysis",
          type: "custom",
          category: "financial",
          frequency: "daily",
          status: "active",
          lastGenerated: "2024-12-15T09:30:00Z",
          createdBy: "Finance Team",
          subscribers: ["finance@company.com"],
          format: "dashboard",
          permissions: ["finance", "executive"],
        },
        {
          id: "operational-metrics",
          name: "Operational Metrics Report",
          description:
            "System performance, usage statistics, and operational health",
          type: "automated",
          category: "operational",
          frequency: "hourly",
          status: "active",
          lastGenerated: "2024-12-15T10:00:00Z",
          createdBy: "Operations Team",
          subscribers: ["ops@company.com", "tech@company.com"],
          format: "dashboard",
          permissions: ["operations", "tech"],
        },
      ];

      const mockDashboards: Dashboard[] = [
        {
          id: "executive-overview",
          name: "Executive Overview",
          description: "High-level business metrics and strategic KPIs",
          type: "executive",
          owner: "CEO",
          isPublic: false,
          widgets: [],
          layout: { cols: 12, rows: 8, gap: 16, responsive: true },
          filters: [
            {
              id: "date-range",
              name: "Date Range",
              type: "date",
              required: true,
              defaultValue: "30d",
            },
            {
              id: "workspace",
              name: "Workspace",
              type: "select",
              options: ["All", "Enterprise", "SMB"],
              required: false,
            },
          ],
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-12-15T10:00:00Z",
          viewCount: 1247,
          favoriteCount: 23,
        },
        {
          id: "compliance-monitoring",
          name: "Compliance Monitoring",
          description: "Real-time compliance status and risk indicators",
          type: "compliance",
          owner: "Compliance Officer",
          isPublic: true,
          widgets: [],
          layout: { cols: 12, rows: 10, gap: 16, responsive: true },
          filters: [
            {
              id: "region",
              name: "Region",
              type: "multi-select",
              options: ["North America", "Europe", "Asia Pacific"],
              required: false,
            },
            {
              id: "compliance-type",
              name: "Compliance Type",
              type: "select",
              options: ["SOC 2", "GDPR", "ISO 27001"],
              required: false,
            },
          ],
          createdAt: "2024-02-15T00:00:00Z",
          updatedAt: "2024-12-14T16:30:00Z",
          viewCount: 892,
          favoriteCount: 34,
        },
      ];

      setMetrics(mockMetrics);
      setReports(mockReports);
      setDashboards(mockDashboards);
    } catch (error) {
      toast({
        title: "Error loading analytics data",
        description: "Failed to fetch analytics information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredMetrics = metrics.filter((metric) => {
    const matchesCategory =
      selectedCategory === "all" || metric.category === selectedCategory;
    const matchesSearch = metric.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case "increase":
        return ArrowUpRight;
      case "decrease":
        return ArrowDownRight;
      default:
        return Minus;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "operational":
        return Activity;
      case "financial":
        return TrendingUp;
      case "compliance":
        return CheckCircle;
      case "engagement":
        return Users;
      case "performance":
        return Zap;
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

  // Sample chart data
  const revenueData = [
    { month: "Jan", revenue: 2200000, growth: 12 },
    { month: "Feb", revenue: 2350000, growth: 15 },
    { month: "Mar", revenue: 2180000, growth: 8 },
    { month: "Apr", revenue: 2480000, growth: 18 },
    { month: "May", revenue: 2620000, growth: 22 },
    { month: "Jun", revenue: 2780000, growth: 25 },
    { month: "Jul", revenue: 2650000, growth: 20 },
    { month: "Aug", revenue: 2890000, growth: 28 },
    { month: "Sep", revenue: 2750000, growth: 24 },
    { month: "Oct", revenue: 2950000, growth: 32 },
    { month: "Nov", revenue: 2820000, growth: 26 },
    { month: "Dec", revenue: 2847592, growth: 30 },
  ];

  const userEngagementData = [
    { day: "Mon", active: 8450, new: 234, returning: 8216 },
    { day: "Tue", active: 9120, new: 287, returning: 8833 },
    { day: "Wed", active: 8890, new: 198, returning: 8692 },
    { day: "Thu", active: 9540, new: 312, returning: 9228 },
    { day: "Fri", active: 10240, new: 445, returning: 9795 },
    { day: "Sat", active: 7650, new: 156, returning: 7494 },
    { day: "Sun", active: 6890, new: 123, returning: 6767 },
  ];

  const complianceData = [
    { name: "SOC 2", value: 96, color: "#22c55e" },
    { name: "GDPR", value: 94, color: "#3b82f6" },
    { name: "ISO 27001", value: 92, color: "#f59e0b" },
    { name: "CCPA", value: 98, color: "#8b5cf6" },
    { name: "HIPAA", value: 90, color: "#ef4444" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading analytics dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Enterprise Analytics & Reporting
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analytics, custom reports, and business intelligence
            across your enterprise
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search metrics..."
                className="pl-10 w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMetrics.map((metric) => {
            const IconComponent = getCategoryIcon(metric.category);
            const ChangeIcon = getChangeIcon(metric.changeType);
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
                      <div
                        className={`flex items-center text-sm ${getChangeColor(metric.changeType)}`}
                      >
                        <ChangeIcon className="h-3 w-3 mr-1" />
                        {Math.abs(metric.change)}% {metric.period}
                      </div>
                      {metric.target && (
                        <div className="text-xs text-muted-foreground">
                          Target: {formatValue(metric.target, metric.unit)}
                        </div>
                      )}
                    </div>

                    {metric.target && (
                      <div className="space-y-1">
                        <Progress
                          value={(metric.value / metric.target) * 100}
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground text-right">
                          {Math.round((metric.value / metric.target) * 100)}% of
                          target
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        formatter={(value, name) => [
                          name === "revenue"
                            ? formatValue(Number(value), "USD")
                            : `${value}%`,
                          name === "revenue" ? "Revenue" : "Growth Rate",
                        ]}
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        fill="#3b82f6"
                        fillOpacity={0.1}
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="growth"
                        fill="#22c55e"
                        opacity={0.7}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Engagement Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="returning"
                        stackId="1"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="new"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Compliance Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm font-bold">{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      99.9%
                    </div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      145ms
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Avg Response
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      2.4M
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Requests/hour
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      0.02%
                    </div>
                    <p className="text-sm text-muted-foreground">Error Rate</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">34%</span>
                  </div>
                  <Progress value={34} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Storage Usage</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Enterprise Reports</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </div>

          <div className="grid gap-4">
            {reports.map((report) => (
              <Card
                key={report.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{report.name}</h4>
                        <Badge
                          variant={
                            report.status === "active" ? "default" : "secondary"
                          }
                        >
                          {report.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {report.type}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {report.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {report.description}
                      </p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Frequency:</span>
                          <p className="text-muted-foreground capitalize">
                            {report.frequency}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Format:</span>
                          <p className="text-muted-foreground uppercase">
                            {report.format}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Last Generated:</span>
                          <p className="text-muted-foreground">
                            {new Date(
                              report.lastGenerated,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Subscribers:</span>
                          <p className="text-muted-foreground">
                            {report.subscribers.length} users
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Custom Dashboards</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((dashboard) => (
              <Card
                key={dashboard.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{dashboard.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dashboard.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {dashboard.type}
                      </Badge>
                      {dashboard.isPublic && (
                        <Badge variant="secondary">Public</Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Owner:</span>
                        <p className="text-muted-foreground">
                          {dashboard.owner}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Views:</span>
                        <p className="text-muted-foreground">
                          {dashboard.viewCount}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Favorites:</span>
                        <p className="text-muted-foreground">
                          {dashboard.favoriteCount}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Updated:</span>
                        <p className="text-muted-foreground">
                          {new Date(dashboard.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Open
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bookmark className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Live Analytics Stream
                </h3>
                <p className="text-muted-foreground mb-4">
                  Real-time monitoring of system performance, user activity, and
                  business metrics with millisecond precision.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Live Data Stream</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      WebSocket connections active
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      145ms
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Average latency
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      2,847
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Events/second
                    </p>
                  </div>
                </div>
                <Button>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Launch Real-time Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                AI-Powered Business Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Intelligent Analytics Engine
                </h3>
                <p className="text-muted-foreground mb-4">
                  Advanced machine learning algorithms analyze your data to
                  provide actionable insights, predictive forecasts, and
                  automated recommendations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <Eye className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Anomaly Detection</h4>
                    <p className="text-xs text-muted-foreground">
                      Auto-identify unusual patterns
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Predictive Analytics</h4>
                    <p className="text-xs text-muted-foreground">
                      Forecast future trends
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Target className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Smart Recommendations</h4>
                    <p className="text-xs text-muted-foreground">
                      AI-driven action items
                    </p>
                  </div>
                </div>
                <Button>
                  <Zap className="h-4 w-4 mr-2" />
                  Access AI Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseAnalytics;
