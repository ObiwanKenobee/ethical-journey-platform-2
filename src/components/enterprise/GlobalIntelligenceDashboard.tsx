import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Bar,
} from "recharts";
import {
  Globe2,
  Satellite,
  Radio,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Clock,
  Users,
  Building,
  Truck,
  Ship,
  Plane,
  Package,
  DollarSign,
  BarChart3,
  Activity,
  Shield,
  Zap,
  Eye,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Bell,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

interface GlobalEvent {
  id: string;
  type:
    | "disruption"
    | "opportunity"
    | "risk"
    | "compliance"
    | "market"
    | "geopolitical";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  region: string;
  country: string;
  coordinates: [number, number];
  impact: {
    suppliers: number;
    routes: number;
    revenue: number;
    timeline: string;
  };
  timestamp: string;
  source: string;
  confidence: number;
  predictedDuration: string;
  recommendations: string[];
}

interface SupplyRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  status: "active" | "delayed" | "disrupted" | "rerouted";
  risk: number;
  mode: "ocean" | "air" | "land" | "rail";
  distance: number;
  duration: string;
  cost: number;
  co2Emissions: number;
  suppliers: number;
  volume: number;
  lastUpdate: string;
}

interface MarketIntelligence {
  market: string;
  region: string;
  indicators: {
    demand: number;
    supply: number;
    pricing: number;
    volatility: number;
    growthRate: number;
  };
  trends: {
    shortTerm: "up" | "down" | "stable";
    mediumTerm: "up" | "down" | "stable";
    longTerm: "up" | "down" | "stable";
  };
  opportunities: string[];
  threats: string[];
  lastUpdated: string;
}

interface ComplianceAlert {
  id: string;
  jurisdiction: string;
  regulation: string;
  type: "new" | "updated" | "enforcement" | "deadline";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  effectiveDate: string;
  deadline: string;
  affectedOperations: string[];
  requiredActions: string[];
  estimatedCost: number;
  complianceStatus: "compliant" | "partial" | "non-compliant" | "unknown";
}

const GlobalIntelligenceDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock real-time data
  const [globalEvents] = useState<GlobalEvent[]>([
    {
      id: "GE001",
      type: "disruption",
      title: "Suez Canal Traffic Congestion",
      description:
        "Heavy traffic causing 3-day delays for container ships. 45 vessels currently queued.",
      severity: "high",
      region: "Middle East",
      country: "Egypt",
      coordinates: [32.3, 30.0],
      impact: {
        suppliers: 234,
        routes: 12,
        revenue: 2400000,
        timeline: "7-10 days",
      },
      timestamp: "2024-01-15T14:30:00Z",
      source: "Maritime Traffic Control",
      confidence: 94,
      predictedDuration: "5-7 days",
      recommendations: [
        "Reroute shipments via Cape of Good Hope",
        "Negotiate priority passage for critical cargo",
        "Communicate delays to customers proactively",
      ],
    },
    {
      id: "GE002",
      type: "geopolitical",
      title: "New Trade Sanctions Announced",
      description:
        "Economic sanctions affecting technology components import/export in Eastern Europe.",
      severity: "critical",
      region: "Europe",
      country: "Multiple",
      coordinates: [25.0, 50.0],
      impact: {
        suppliers: 89,
        routes: 8,
        revenue: 5600000,
        timeline: "Immediate",
      },
      timestamp: "2024-01-15T10:15:00Z",
      source: "Government Agencies",
      confidence: 99,
      predictedDuration: "6-12 months",
      recommendations: [
        "Review supplier base for compliance",
        "Identify alternative suppliers",
        "Consult legal team for compliance strategy",
      ],
    },
    {
      id: "GE003",
      type: "opportunity",
      title: "New Free Trade Agreement Ratified",
      description:
        "USMCA expansion includes new textile trade provisions reducing tariffs by 15%.",
      severity: "medium",
      region: "North America",
      country: "USA/Mexico/Canada",
      coordinates: [-100.0, 40.0],
      impact: {
        suppliers: 156,
        routes: 24,
        revenue: 3200000,
        timeline: "30 days",
      },
      timestamp: "2024-01-15T08:45:00Z",
      source: "Trade Associations",
      confidence: 87,
      predictedDuration: "Ongoing",
      recommendations: [
        "Expand supplier network in USMCA regions",
        "Renegotiate contracts with cost savings",
        "Accelerate regional sourcing strategy",
      ],
    },
  ]);

  const [supplyRoutes] = useState<SupplyRoute[]>([
    {
      id: "SR001",
      name: "Asia-Europe Express",
      origin: "Shanghai, China",
      destination: "Rotterdam, Netherlands",
      status: "delayed",
      risk: 72,
      mode: "ocean",
      distance: 18500,
      duration: "28 days",
      cost: 2850,
      co2Emissions: 45.2,
      suppliers: 78,
      volume: 12400,
      lastUpdate: "2024-01-15T16:20:00Z",
    },
    {
      id: "SR002",
      name: "Trans-Pacific Direct",
      origin: "Los Angeles, USA",
      destination: "Tokyo, Japan",
      status: "active",
      risk: 23,
      mode: "ocean",
      distance: 8800,
      duration: "14 days",
      cost: 1950,
      co2Emissions: 28.7,
      suppliers: 45,
      volume: 8900,
      lastUpdate: "2024-01-15T16:15:00Z",
    },
    {
      id: "SR003",
      name: "Europe-Americas Bridge",
      origin: "Hamburg, Germany",
      destination: "New York, USA",
      status: "rerouted",
      risk: 56,
      mode: "ocean",
      distance: 6200,
      duration: "12 days",
      cost: 2200,
      co2Emissions: 32.1,
      suppliers: 34,
      volume: 6700,
      lastUpdate: "2024-01-15T16:10:00Z",
    },
  ]);

  const [marketIntelligence] = useState<MarketIntelligence[]>([
    {
      market: "Electronics",
      region: "Asia-Pacific",
      indicators: {
        demand: 78,
        supply: 65,
        pricing: 82,
        volatility: 34,
        growthRate: 12.5,
      },
      trends: {
        shortTerm: "up",
        mediumTerm: "stable",
        longTerm: "up",
      },
      opportunities: [
        "AI chip demand surge",
        "Electric vehicle component growth",
        "IoT device expansion",
      ],
      threats: [
        "Semiconductor shortage",
        "Trade policy uncertainty",
        "Supply chain concentration risk",
      ],
      lastUpdated: "2024-01-15T15:30:00Z",
    },
    {
      market: "Textiles",
      region: "South Asia",
      indicators: {
        demand: 65,
        supply: 89,
        pricing: 45,
        volatility: 67,
        growthRate: 8.2,
      },
      trends: {
        shortTerm: "down",
        mediumTerm: "stable",
        longTerm: "up",
      },
      opportunities: [
        "Sustainable textile demand",
        "Fast fashion alternatives",
        "Technical textile growth",
      ],
      threats: [
        "Labor cost inflation",
        "Environmental regulations",
        "Cotton price volatility",
      ],
      lastUpdated: "2024-01-15T15:25:00Z",
    },
  ]);

  const [complianceAlerts] = useState<ComplianceAlert[]>([
    {
      id: "CA001",
      jurisdiction: "European Union",
      regulation: "Supply Chain Due Diligence Directive",
      type: "new",
      severity: "critical",
      description:
        "New mandatory human rights and environmental due diligence requirements for large companies.",
      effectiveDate: "2024-07-01",
      deadline: "2024-06-01",
      affectedOperations: [
        "Sourcing",
        "Supplier Management",
        "Risk Assessment",
      ],
      requiredActions: [
        "Conduct supply chain mapping",
        "Implement due diligence processes",
        "Establish grievance mechanisms",
        "Regular monitoring and reporting",
      ],
      estimatedCost: 450000,
      complianceStatus: "partial",
    },
    {
      id: "CA002",
      jurisdiction: "United States",
      regulation: "Uyghur Forced Labor Prevention Act",
      type: "enforcement",
      severity: "high",
      description:
        "Enhanced enforcement actions targeting supply chains with potential forced labor connections.",
      effectiveDate: "2024-01-01",
      deadline: "2024-03-01",
      affectedOperations: [
        "Import/Export",
        "Supplier Verification",
        "Documentation",
      ],
      requiredActions: [
        "Enhanced supplier auditing",
        "Supply chain traceability documentation",
        "Third-party verification",
        "Regular compliance training",
      ],
      estimatedCost: 280000,
      complianceStatus: "compliant",
    },
  ]);

  const globalMetrics = {
    totalSuppliers: 2847,
    activeRoutes: 156,
    dailyVolume: 45600,
    carbonFootprint: 1234.5,
    complianceScore: 94.2,
    riskLevel: "Medium",
    costOptimization: 12.7,
    onTimeDelivery: 96.8,
  };

  const regionalData = [
    {
      region: "Asia-Pacific",
      suppliers: 1124,
      risk: 65,
      volume: 18500,
      compliance: 89,
    },
    {
      region: "Europe",
      suppliers: 789,
      risk: 42,
      volume: 12300,
      compliance: 96,
    },
    {
      region: "North America",
      suppliers: 567,
      risk: 38,
      volume: 9800,
      compliance: 98,
    },
    {
      region: "Latin America",
      suppliers: 234,
      risk: 58,
      volume: 3200,
      compliance: 87,
    },
    {
      region: "Middle East & Africa",
      suppliers: 133,
      risk: 72,
      volume: 1800,
      compliance: 82,
    },
  ];

  const timeSeriesData = [
    { time: "00:00", volume: 1200, risk: 45, compliance: 94, alerts: 2 },
    { time: "04:00", volume: 980, risk: 42, compliance: 95, alerts: 1 },
    { time: "08:00", volume: 1540, risk: 48, compliance: 93, alerts: 3 },
    { time: "12:00", volume: 1890, risk: 52, compliance: 92, alerts: 5 },
    { time: "16:00", volume: 2100, risk: 55, compliance: 91, alerts: 4 },
    { time: "20:00", volume: 1650, risk: 49, compliance: 94, alerts: 2 },
  ];

  useEffect(() => {
    if (isRealTimeActive) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isRealTimeActive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "delayed":
        return "bg-yellow-100 text-yellow-800";
      case "disrupted":
        return "bg-red-100 text-red-800";
      case "rerouted":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "ocean":
        return <Ship className="h-4 w-4" />;
      case "air":
        return <Plane className="h-4 w-4" />;
      case "land":
        return <Truck className="h-4 w-4" />;
      case "rail":
        return <Activity className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Real-time Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Globe2 className="h-8 w-8 text-primary" />
            Global Supply Chain Intelligence
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring and intelligence across global supply networks
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <div
              className={`w-2 h-2 rounded-full ${isRealTimeActive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
            />
            <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRealTimeActive(!isRealTimeActive)}
          >
            {isRealTimeActive ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause Live
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume Live
              </>
            )}
          </Button>

          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Global Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Suppliers
                </p>
                <p className="text-lg font-bold">
                  {globalMetrics.totalSuppliers.toLocaleString()}
                </p>
              </div>
              <Building className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Active Routes
                </p>
                <p className="text-lg font-bold">
                  {globalMetrics.activeRoutes}
                </p>
              </div>
              <MapPin className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Daily Volume
                </p>
                <p className="text-lg font-bold">
                  {globalMetrics.dailyVolume.toLocaleString()}
                </p>
              </div>
              <Package className="h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Carbon (tCO2)
                </p>
                <p className="text-lg font-bold">
                  {globalMetrics.carbonFootprint}
                </p>
              </div>
              <Globe2 className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Compliance
                </p>
                <p className="text-lg font-bold">
                  {globalMetrics.complianceScore}%
                </p>
              </div>
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Risk Level
                </p>
                <p className="text-lg font-bold">{globalMetrics.riskLevel}</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Cost Opt.
                </p>
                <p className="text-lg font-bold">
                  {globalMetrics.costOptimization}%
                </p>
              </div>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  On-Time
                </p>
                <p className="text-lg font-bold">
                  {globalMetrics.onTimeDelivery}%
                </p>
              </div>
              <Clock className="h-5 w-5 text-blue-500" />
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Global Events</TabsTrigger>
          <TabsTrigger value="routes">Supply Routes</TabsTrigger>
          <TabsTrigger value="intelligence">Market Intel</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Real-time Monitoring */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="volume"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Regional Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="suppliers" fill="#8884d8" />
                    <Line
                      type="monotone"
                      dataKey="compliance"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Critical Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Critical Alerts & Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalEvents.slice(0, 3).map((event) => (
                  <Alert
                    key={event.id}
                    className={`border-l-4 ${
                      event.severity === "critical"
                        ? "border-l-red-500"
                        : event.severity === "high"
                          ? "border-l-orange-500"
                          : "border-l-yellow-500"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span>
                              Impact: ${event.impact.revenue.toLocaleString()}
                            </span>
                            <span>Suppliers: {event.impact.suppliers}</span>
                            <span>Region: {event.region}</span>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Global Events & Disruptions
            </h2>
            <div className="flex gap-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {globalEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          event.type === "disruption"
                            ? "bg-red-500"
                            : event.type === "opportunity"
                              ? "bg-green-500"
                              : event.type === "risk"
                                ? "bg-yellow-500"
                                : event.type === "geopolitical"
                                  ? "bg-purple-500"
                                  : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline" className="capitalize">
                            {event.type}
                          </Badge>
                          <span>
                            {event.region}, {event.country}
                          </span>
                          <span>Confidence: {event.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity.toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-sm mb-4">{event.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Affected Suppliers</p>
                      <p className="text-lg font-bold text-primary">
                        {event.impact.suppliers}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Supply Routes</p>
                      <p className="text-lg font-bold text-primary">
                        {event.impact.routes}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Revenue Impact</p>
                      <p className="text-lg font-bold text-primary">
                        ${(event.impact.revenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-lg font-bold text-primary">
                        {event.predictedDuration}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">
                      Recommended Actions:
                    </p>
                    <ul className="text-sm space-y-1">
                      {event.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-xs text-muted-foreground">
                      <span>Source: {event.source}</span>
                      <span className="ml-4">
                        Detected: {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">Create Response Plan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Supply Routes</h2>
            <Button>
              <MapPin className="h-4 w-4 mr-2" />
              View Global Map
            </Button>
          </div>

          <div className="grid gap-4">
            {supplyRoutes.map((route) => (
              <Card key={route.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {getModeIcon(route.mode)}
                        {route.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {route.origin} → {route.destination}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(route.status)}>
                        {route.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">Risk: {route.risk}%</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Distance</p>
                      <p className="text-lg font-bold">
                        {route.distance.toLocaleString()} km
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-lg font-bold">{route.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cost</p>
                      <p className="text-lg font-bold">${route.cost}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">CO2 Emissions</p>
                      <p className="text-lg font-bold">{route.co2Emissions}t</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Suppliers</p>
                      <p className="text-lg font-bold">{route.suppliers}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Volume</p>
                      <p className="text-lg font-bold">
                        {route.volume.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Last updated:{" "}
                      {new Date(route.lastUpdate).toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Track Shipments
                      </Button>
                      <Button size="sm" variant="outline">
                        Optimize Route
                      </Button>
                      <Button size="sm">View Analytics</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Market Intelligence</h2>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Configure Alerts
            </Button>
          </div>

          <div className="grid gap-6">
            {marketIntelligence.map((market, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">{market.market}</h3>
                      <p className="text-muted-foreground">{market.region}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Growth Rate
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        +{market.indicators.growthRate}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2">Demand</p>
                      <Progress
                        value={market.indicators.demand}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {market.indicators.demand}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2">Supply</p>
                      <Progress
                        value={market.indicators.supply}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {market.indicators.supply}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2">Pricing</p>
                      <Progress
                        value={market.indicators.pricing}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {market.indicators.pricing}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2">Volatility</p>
                      <Progress
                        value={market.indicators.volatility}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {market.indicators.volatility}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2">Growth</p>
                      <div className="flex items-center justify-center">
                        {getTrendIcon(market.trends.longTerm)}
                        <span className="ml-1 text-sm font-bold">
                          {market.indicators.growthRate}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-green-700">
                        Opportunities
                      </h4>
                      <ul className="space-y-2">
                        {market.opportunities.map((opp, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {opp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-red-700">Threats</h4>
                      <ul className="space-y-2">
                        {market.threats.map((threat, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Last updated:{" "}
                      {new Date(market.lastUpdated).toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Detailed Analysis
                      </Button>
                      <Button size="sm">Create Strategy</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Compliance Alerts & Regulations
            </h2>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Compliance Dashboard
            </Button>
          </div>

          <div className="grid gap-4">
            {complianceAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {alert.regulation}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {alert.jurisdiction}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {alert.type}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{alert.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Effective Date</p>
                      <p className="text-lg font-bold">{alert.effectiveDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Compliance Deadline</p>
                      <p className="text-lg font-bold text-red-600">
                        {alert.deadline}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Estimated Cost</p>
                      <p className="text-lg font-bold">
                        ${alert.estimatedCost.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">
                      Affected Operations:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {alert.affectedOperations.map((op, index) => (
                        <Badge key={index} variant="outline">
                          {op}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">
                      Required Actions:
                    </p>
                    <ul className="text-sm space-y-1">
                      {alert.requiredActions.map((action, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Compliance Status:</span>
                      <Badge
                        className={
                          alert.complianceStatus === "compliant"
                            ? "bg-green-100 text-green-800"
                            : alert.complianceStatus === "partial"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {alert.complianceStatus.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Requirements
                      </Button>
                      <Button size="sm">Create Action Plan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Supply Chain Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="compliance"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk vs Performance Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={regionalData}>
                    <CartesianGrid />
                    <XAxis dataKey="risk" />
                    <YAxis dataKey="compliance" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter dataKey="suppliers" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalIntelligenceDashboard;
