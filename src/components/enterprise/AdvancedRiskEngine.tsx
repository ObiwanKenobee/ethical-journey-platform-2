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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Eye,
  Brain,
  Zap,
  Globe,
  Target,
  Activity,
  Users,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Download,
  RefreshCw,
  Settings,
  Filter,
} from "lucide-react";

interface RiskFactor {
  id: string;
  category: string;
  name: string;
  severity: "low" | "medium" | "high" | "critical";
  probability: number;
  impact: number;
  trend: "increasing" | "stable" | "decreasing";
  aiConfidence: number;
  detectedAt: string;
  affectedSuppliers: number;
  mitigation: string[];
  predictedOutcome: string;
}

interface SupplierRiskProfile {
  supplierId: string;
  name: string;
  location: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  categories: {
    laborRisk: number;
    environmentalRisk: number;
    financialRisk: number;
    complianceRisk: number;
    operationalRisk: number;
  };
  recentAlerts: number;
  lastAssessment: string;
  certificationStatus: string;
  aiPredictions: {
    futureRiskScore: number;
    nextAssessmentDate: string;
    recommendedActions: string[];
  };
}

interface AIInsight {
  id: string;
  type: "prediction" | "anomaly" | "trend" | "recommendation";
  title: string;
  description: string;
  confidence: number;
  impact: "low" | "medium" | "high";
  timeline: string;
  actionRequired: boolean;
  dataPoints: number;
  category: string;
}

const AdvancedRiskEngine: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - in production, this would come from AI/ML services
  const [riskFactors] = useState<RiskFactor[]>([
    {
      id: "1",
      category: "Labor Rights",
      name: "Excessive Overtime in Manufacturing Facilities",
      severity: "high",
      probability: 85,
      impact: 78,
      trend: "increasing",
      aiConfidence: 92,
      detectedAt: "2024-01-15T10:30:00Z",
      affectedSuppliers: 24,
      mitigation: [
        "Implement shift rotation policies",
        "Increase workforce",
        "Monitor work hours digitally",
      ],
      predictedOutcome:
        "High probability of regulatory intervention within 60 days",
    },
    {
      id: "2",
      category: "Environmental",
      name: "Water Contamination Risk in Textile Suppliers",
      severity: "critical",
      probability: 92,
      impact: 95,
      trend: "increasing",
      aiConfidence: 88,
      detectedAt: "2024-01-14T15:45:00Z",
      affectedSuppliers: 12,
      mitigation: [
        "Install water treatment systems",
        "Conduct environmental audits",
        "Switch to eco-friendly dyes",
      ],
      predictedOutcome:
        "Immediate action required to prevent environmental disaster",
    },
    {
      id: "3",
      category: "Financial",
      name: "Supply Chain Disruption Due to Economic Instability",
      severity: "medium",
      probability: 68,
      impact: 72,
      trend: "stable",
      aiConfidence: 81,
      detectedAt: "2024-01-13T09:15:00Z",
      affectedSuppliers: 45,
      mitigation: [
        "Diversify supplier base",
        "Establish contingency contracts",
        "Monitor economic indicators",
      ],
      predictedOutcome: "Potential delays in Q2 2024 if not addressed",
    },
  ]);

  const [supplierProfiles] = useState<SupplierRiskProfile[]>([
    {
      supplierId: "SUP001",
      name: "Global Textiles Manufacturing Co.",
      location: "Bangladesh",
      riskScore: 85,
      riskLevel: "high",
      categories: {
        laborRisk: 82,
        environmentalRisk: 88,
        financialRisk: 65,
        complianceRisk: 78,
        operationalRisk: 71,
      },
      recentAlerts: 7,
      lastAssessment: "2024-01-10",
      certificationStatus: "Pending Renewal",
      aiPredictions: {
        futureRiskScore: 78,
        nextAssessmentDate: "2024-02-15",
        recommendedActions: [
          "Implement worker safety protocols",
          "Environmental compliance audit",
          "Financial stability review",
        ],
      },
    },
    {
      supplierId: "SUP002",
      name: "EcoFriendly Materials Ltd.",
      location: "Vietnam",
      riskScore: 35,
      riskLevel: "low",
      categories: {
        laborRisk: 25,
        environmentalRisk: 20,
        financialRisk: 45,
        complianceRisk: 30,
        operationalRisk: 55,
      },
      recentAlerts: 1,
      lastAssessment: "2024-01-12",
      certificationStatus: "Certified",
      aiPredictions: {
        futureRiskScore: 32,
        nextAssessmentDate: "2024-03-01",
        recommendedActions: ["Continue monitoring", "Quarterly check-in"],
      },
    },
  ]);

  const [aiInsights] = useState<AIInsight[]>([
    {
      id: "AI001",
      type: "prediction",
      title: "Predicted Labor Strike in Electronics Sector",
      description:
        "AI models indicate 73% probability of coordinated labor strikes across electronics suppliers in Southeast Asia within the next 45 days.",
      confidence: 73,
      impact: "high",
      timeline: "45 days",
      actionRequired: true,
      dataPoints: 15420,
      category: "Labor Rights",
    },
    {
      id: "AI002",
      type: "anomaly",
      title: "Unusual Energy Consumption Patterns Detected",
      description:
        "Anomalous energy usage patterns detected in 8 manufacturing facilities, potentially indicating unauthorized operations or equipment issues.",
      confidence: 87,
      impact: "medium",
      timeline: "Immediate",
      actionRequired: true,
      dataPoints: 8934,
      category: "Environmental",
    },
    {
      id: "AI003",
      type: "trend",
      title: "Improving Compliance Scores Across APAC Region",
      description:
        "Positive trend in compliance scores across 156 suppliers in Asia-Pacific region, with 23% improvement over last quarter.",
      confidence: 91,
      impact: "medium",
      timeline: "Ongoing",
      actionRequired: false,
      dataPoints: 23456,
      category: "Compliance",
    },
  ]);

  const riskTrendData = [
    {
      month: "Jan",
      overall: 72,
      labor: 75,
      environmental: 68,
      financial: 70,
      compliance: 74,
    },
    {
      month: "Feb",
      overall: 68,
      labor: 71,
      environmental: 65,
      financial: 72,
      compliance: 69,
    },
    {
      month: "Mar",
      overall: 74,
      labor: 78,
      environmental: 70,
      financial: 68,
      compliance: 76,
    },
    {
      month: "Apr",
      overall: 69,
      labor: 72,
      environmental: 67,
      financial: 71,
      compliance: 68,
    },
    {
      month: "May",
      overall: 65,
      labor: 68,
      environmental: 62,
      financial: 67,
      compliance: 65,
    },
    {
      month: "Jun",
      overall: 71,
      labor: 74,
      environmental: 69,
      financial: 73,
      compliance: 70,
    },
  ];

  const riskDistributionData = [
    { name: "Labor Rights", value: 35, color: "#ef4444" },
    { name: "Environmental", value: 28, color: "#f97316" },
    { name: "Financial", value: 18, color: "#eab308" },
    { name: "Compliance", value: 12, color: "#22c55e" },
    { name: "Operational", value: 7, color: "#3b82f6" },
  ];

  const performanceMetrics = [
    { name: "Risk Detection Accuracy", value: 94, target: 95 },
    { name: "False Positive Rate", value: 8, target: 5 },
    { name: "Response Time (hours)", value: 2.3, target: 2.0 },
    { name: "Supplier Coverage", value: 87, target: 90 },
  ];

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
  };

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Advanced AI Risk Assessment Engine
          </h1>
          <p className="text-muted-foreground mt-2">
            Predictive risk analysis powered by machine learning and real-time
            data intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Run AI Analysis
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Overall Risk Score
                </p>
                <p className="text-2xl font-bold">69</p>
                <p className="text-xs text-muted-foreground">
                  -5 from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Risk Factors
                </p>
                <p className="text-2xl font-bold">127</p>
                <p className="text-xs text-muted-foreground">
                  +12 new this week
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  AI Predictions
                </p>
                <p className="text-2xl font-bold">43</p>
                <p className="text-xs text-muted-foreground">
                  92% accuracy rate
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Suppliers Monitored
                </p>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-xs text-muted-foreground">
                  Across 47 countries
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
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
          <TabsTrigger value="risks">Risk Factors</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Profiles</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Risk Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="overall"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="labor"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="environmental"
                      stroke="#ffc658"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Risk Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                AI Engine Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">
                        {metric.value}
                        {metric.name.includes("Rate")
                          ? "%"
                          : metric.name.includes("hours")
                            ? "h"
                            : "%"}
                      </span>
                    </div>
                    <Progress
                      value={(metric.value / metric.target) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Target: {metric.target}
                      {metric.name.includes("Rate")
                        ? "%"
                        : metric.name.includes("hours")
                          ? "h"
                          : "%"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Risk Factors</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="labor">Labor Rights</option>
                <option value="environmental">Environmental</option>
                <option value="financial">Financial</option>
                <option value="compliance">Compliance</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4">
            {riskFactors.map((risk) => (
              <Card key={risk.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{risk.name}</h3>
                        <Badge className={getSeverityColor(risk.severity)}>
                          {risk.severity.toUpperCase()}
                        </Badge>
                        {getTrendIcon(risk.trend)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Category: {risk.category}
                      </p>
                      <p className="text-sm mb-4">{risk.predictedOutcome}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        AI Confidence
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {risk.aiConfidence}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Probability</p>
                      <Progress value={risk.probability} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {risk.probability}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Impact</p>
                      <Progress value={risk.impact} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {risk.impact}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">
                        Affected Suppliers
                      </p>
                      <p className="text-lg font-semibold">
                        {risk.affectedSuppliers}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">
                      Recommended Mitigation Actions:
                    </p>
                    <ul className="text-sm space-y-1">
                      {risk.mitigation.map((action, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Detected: {new Date(risk.detectedAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">Create Action Plan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Supplier Risk Profiles</h2>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </div>

          <div className="grid gap-6">
            {supplierProfiles.map((supplier) => (
              <Card key={supplier.supplierId}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {supplier.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {supplier.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Last assessed: {supplier.lastAssessment}
                        </span>
                        <Badge
                          variant={
                            supplier.riskLevel === "low"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {supplier.certificationStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Risk Score
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        {supplier.riskScore}
                      </p>
                      <Badge className={getSeverityColor(supplier.riskLevel)}>
                        {supplier.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    {Object.entries(supplier.categories).map(
                      ([category, score]) => (
                        <div key={category} className="text-center">
                          <p className="text-sm font-medium mb-2 capitalize">
                            {category.replace("Risk", "")}
                          </p>
                          <div className="relative w-16 h-16 mx-auto">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="90%"
                                data={[{ value: score }]}
                              >
                                <RadialBar
                                  dataKey="value"
                                  cornerRadius={10}
                                  fill={
                                    score > 70
                                      ? "#ef4444"
                                      : score > 50
                                        ? "#f97316"
                                        : "#22c55e"
                                  }
                                />
                              </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold">{score}</span>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Current Status</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Recent Alerts:</span>
                          <Badge
                            variant={
                              supplier.recentAlerts > 5
                                ? "destructive"
                                : "default"
                            }
                          >
                            {supplier.recentAlerts}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Certification:</span>
                          <span>{supplier.certificationStatus}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">AI Predictions</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Future Risk Score:</span>
                          <span className="font-medium">
                            {supplier.aiPredictions.futureRiskScore}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Assessment:</span>
                          <span>
                            {supplier.aiPredictions.nextAssessmentDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-3">AI Recommended Actions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {supplier.aiPredictions.recommendedActions.map(
                        (action, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Target className="h-4 w-4 text-primary" />
                            {action}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Schedule Assessment
                      </Button>
                    </div>
                    <Button size="sm">Generate Report</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">AI-Generated Insights</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Generate New Insights
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure AI Models
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {aiInsights.map((insight) => (
              <Card key={insight.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          insight.type === "prediction"
                            ? "bg-blue-500"
                            : insight.type === "anomaly"
                              ? "bg-red-500"
                              : insight.type === "trend"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                        }`}
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {insight.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline" className="capitalize">
                            {insight.type}
                          </Badge>
                          <span>{insight.category}</span>
                          <span>Confidence: {insight.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {insight.actionRequired && (
                        <Badge variant="destructive">Action Required</Badge>
                      )}
                      <Badge
                        className={
                          insight.impact === "high"
                            ? "bg-red-100 text-red-800"
                            : insight.impact === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {insight.impact.toUpperCase()} IMPACT
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{insight.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Timeline: {insight.timeline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Data Points: {insight.dataPoints.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        AI Confidence: {insight.confidence}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Info className="h-4 w-4 mr-2" />
                        More Details
                      </Button>
                      {insight.actionRequired && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Create Action Plan
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Generated by AI Model v2.3.1
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Advanced Analytics Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Correlation Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="labor"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="environmental"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                    <Area
                      type="monotone"
                      dataKey="financial"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                    <Area
                      type="monotone"
                      dataKey="compliance"
                      stackId="1"
                      stroke="#ff7300"
                      fill="#ff7300"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Predictive Risk Modeling</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedRiskEngine;
