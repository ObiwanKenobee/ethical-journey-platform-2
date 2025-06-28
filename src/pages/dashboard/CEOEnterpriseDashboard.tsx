import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Building,
  Target,
  Award,
  FileText,
  Eye,
  Calendar,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Activity,
  Briefcase,
  Crown,
  Star,
  Zap,
  Database,
  Settings,
  Filter,
  Search,
  Bell,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
  MapPin,
  Handshake,
  Gavel,
  BookOpen,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

interface StrategicMetric {
  title: string;
  value: string;
  change: number;
  changeType: "positive" | "negative" | "neutral";
  description: string;
  icon: React.ComponentType<any>;
}

interface ComplianceFramework {
  name: string;
  status: "compliant" | "partial" | "non-compliant";
  score: number;
  lastAudit: string;
  nextAudit: string;
  criticalIssues: number;
}

interface StakeholderMetric {
  category: string;
  satisfaction: number;
  engagement: number;
  keyIssues: string[];
  nextReview: string;
}

const CEOEnterpriseDashboard = () => {
  const [activeTab, setActiveTab] = useState("strategic-overview");
  const [timeRange, setTimeRange] = useState("quarterly");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const strategicMetrics: StrategicMetric[] = [
    {
      title: "Global ESG Score",
      value: "87.3",
      change: 8.2,
      changeType: "positive",
      description: "Comprehensive ESG performance across all operations",
      icon: Globe,
    },
    {
      title: "Supply Chain Transparency",
      value: "94.7%",
      change: 12.4,
      changeType: "positive",
      description: "Tier 1-3 supplier visibility and compliance",
      icon: Eye,
    },
    {
      title: "Risk Mitigation",
      value: "96.1%",
      change: 5.8,
      changeType: "positive",
      description: "Critical risks identified and addressed",
      icon: Shield,
    },
    {
      title: "Operational Efficiency",
      value: "$42.8M",
      change: -3.2,
      changeType: "negative",
      description: "Cost savings from supply chain optimization",
      icon: TrendingUp,
    },
    {
      title: "Stakeholder Satisfaction",
      value: "91.5%",
      change: 6.7,
      changeType: "positive",
      description: "Investor, customer, and partner satisfaction",
      icon: Handshake,
    },
    {
      title: "Regulatory Compliance",
      value: "98.9%",
      change: 2.1,
      changeType: "positive",
      description: "Global regulatory framework adherence",
      icon: Gavel,
    },
  ];

  const complianceFrameworks: ComplianceFramework[] = [
    {
      name: "SOC 2 Type II",
      status: "compliant",
      score: 98.5,
      lastAudit: "2024-09-15",
      nextAudit: "2025-03-15",
      criticalIssues: 0,
    },
    {
      name: "ISO 27001",
      status: "compliant",
      score: 96.8,
      lastAudit: "2024-08-20",
      nextAudit: "2025-02-20",
      criticalIssues: 1,
    },
    {
      name: "GDPR",
      status: "partial",
      score: 89.2,
      lastAudit: "2024-10-01",
      nextAudit: "2025-01-01",
      criticalIssues: 3,
    },
    {
      name: "CDP Climate",
      status: "compliant",
      score: 92.4,
      lastAudit: "2024-11-10",
      nextAudit: "2025-05-10",
      criticalIssues: 0,
    },
  ];

  const stakeholderMetrics: StakeholderMetric[] = [
    {
      category: "Investors",
      satisfaction: 94.2,
      engagement: 87.6,
      keyIssues: ["ESG reporting transparency", "Growth strategy clarity"],
      nextReview: "2024-12-15",
    },
    {
      category: "Customers",
      satisfaction: 89.8,
      engagement: 92.3,
      keyIssues: ["Supply chain transparency", "Sustainability initiatives"],
      nextReview: "2024-12-20",
    },
    {
      category: "Partners",
      satisfaction: 91.5,
      engagement: 85.9,
      keyIssues: ["Compliance requirements", "Technology integration"],
      nextReview: "2024-12-18",
    },
    {
      category: "Regulators",
      satisfaction: 96.1,
      engagement: 88.4,
      keyIssues: ["Data privacy protocols", "Cross-border compliance"],
      nextReview: "2025-01-05",
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "text-green-600 bg-green-50";
      case "partial":
        return "text-yellow-600 bg-yellow-50";
      case "non-compliant":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case "negative":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CEO Enterprise Dashboard | Atlas Strategic Command Center</title>
        <meta
          name="description"
          content="Executive leadership dashboard for strategic oversight of global operations, ESG performance, and stakeholder relations"
        />
      </Helmet>

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">
                    CEO Strategic Command Center
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Executive Leadership • Global Operations Oversight
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="ml-4">
                <Shield className="h-3 w-3 mr-1" />
                Enterprise Master
              </Badge>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Board Meeting
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Executive Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="strategic-overview">
              Strategic Overview
            </TabsTrigger>
            <TabsTrigger value="governance">
              Governance & Compliance
            </TabsTrigger>
            <TabsTrigger value="stakeholders">
              Stakeholder Relations
            </TabsTrigger>
            <TabsTrigger value="esg-performance">ESG Performance</TabsTrigger>
            <TabsTrigger value="decision-intelligence">
              Decision Intelligence
            </TabsTrigger>
          </TabsList>

          {/* Strategic Overview Tab */}
          <TabsContent value="strategic-overview" className="space-y-6">
            {/* Strategic Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategicMetrics.map((metric, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <metric.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex items-center space-x-1">
                        {getChangeIcon(metric.changeType)}
                        <span
                          className={`text-sm font-medium ${
                            metric.changeType === "positive"
                              ? "text-green-600"
                              : metric.changeType === "negative"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{metric.value}</h3>
                      <p className="text-sm font-medium">{metric.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {metric.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Executive Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Strategic Priorities
                  </CardTitle>
                  <CardDescription>
                    Current quarter focus areas and initiatives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Global ESG Leadership</p>
                        <p className="text-sm text-muted-foreground">
                          Achieve top 10% industry ESG rating
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          87% Complete
                        </p>
                        <Progress value={87} className="w-20 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Supply Chain Digitization</p>
                        <p className="text-sm text-muted-foreground">
                          End-to-end transparency by Q1 2025
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600">
                          73% Complete
                        </p>
                        <Progress value={73} className="w-20 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Stakeholder Engagement</p>
                        <p className="text-sm text-muted-foreground">
                          Enhance investor and customer relations
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-yellow-600">
                          45% Complete
                        </p>
                        <Progress value={45} className="w-20 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Executive Alerts
                  </CardTitle>
                  <CardDescription>
                    Critical issues requiring CEO attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>High Priority:</strong> GDPR compliance gap
                      identified in EU operations. Immediate action required to
                      avoid potential €20M penalty.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-yellow-200 bg-yellow-50">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Board Review:</strong> Q4 ESG performance report
                      due for board review by December 15th.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-blue-200 bg-blue-50">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Opportunity:</strong> AI risk engine
                      implementation could reduce compliance costs by 35%.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* Global Operations Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Global Operations Overview
                </CardTitle>
                <CardDescription>
                  Real-time status across all regions and business units
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">North America</h4>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">98.5%</p>
                    <p className="text-sm text-green-700">Compliance Score</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Europe</h4>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">96.2%</p>
                    <p className="text-sm text-green-700">Compliance Score</p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Asia Pacific</h4>
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">89.3%</p>
                    <p className="text-sm text-yellow-700">Compliance Score</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Latin America</h4>
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">92.7%</p>
                    <p className="text-sm text-blue-700">Compliance Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance & Compliance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Compliance Frameworks
                  </CardTitle>
                  <CardDescription>
                    Status of key regulatory and industry frameworks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {complianceFrameworks.map((framework, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{framework.name}</h4>
                          <Badge className={getStatusColor(framework.status)}>
                            {framework.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">
                            {framework.score}%
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Last Audit:
                          </span>
                          <span>
                            {new Date(framework.lastAudit).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Next Audit:
                          </span>
                          <span>
                            {new Date(framework.nextAudit).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Critical Issues:
                          </span>
                          <span
                            className={
                              framework.criticalIssues > 0
                                ? "text-red-600 font-medium"
                                : "text-green-600"
                            }
                          >
                            {framework.criticalIssues}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5 text-primary" />
                    Governance Metrics
                  </CardTitle>
                  <CardDescription>
                    Board and executive governance performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Board Independence
                        </span>
                        <span className="text-sm text-muted-foreground">
                          85%
                        </span>
                      </div>
                      <Progress value={85} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Executive Diversity
                        </span>
                        <span className="text-sm text-muted-foreground">
                          72%
                        </span>
                      </div>
                      <Progress value={72} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Risk Committee Effectiveness
                        </span>
                        <span className="text-sm text-muted-foreground">
                          94%
                        </span>
                      </div>
                      <Progress value={94} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Audit Committee Independence
                        </span>
                        <span className="text-sm text-muted-foreground">
                          100%
                        </span>
                      </div>
                      <Progress value={100} />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Recent Board Actions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ESG Strategy Approval</span>
                        <span className="text-muted-foreground">
                          Dec 1, 2024
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Framework Update</span>
                        <span className="text-muted-foreground">
                          Nov 15, 2024
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance Policy Review</span>
                        <span className="text-muted-foreground">
                          Nov 8, 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stakeholder Relations Tab */}
          <TabsContent value="stakeholders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stakeholderMetrics.map((stakeholder, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Handshake className="h-5 w-5 text-primary" />
                      {stakeholder.category}
                    </CardTitle>
                    <CardDescription>
                      Satisfaction and engagement metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {stakeholder.satisfaction}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Satisfaction Score
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {stakeholder.engagement}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Engagement Level
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Key Issues</h4>
                      <div className="space-y-1">
                        {stakeholder.keyIssues.map((issue, issueIndex) => (
                          <div
                            key={issueIndex}
                            className="flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                            <span className="text-sm">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Next Review:
                        </span>
                        <span className="font-medium">
                          {new Date(
                            stakeholder.nextReview,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ESG Performance Tab */}
          <TabsContent value="esg-performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Globe className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Environmental</h3>
                      <p className="text-2xl font-bold text-green-600">A-</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Carbon Reduction</span>
                      <span className="font-medium">-23.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renewable Energy</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Waste Reduction</span>
                      <span className="font-medium">-31.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Social</h3>
                      <p className="text-2xl font-bold text-blue-600">B+</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Worker Safety</span>
                      <span className="font-medium">96.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Diversity Index</span>
                      <span className="font-medium">72.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Impact</span>
                      <span className="font-medium">$12.3M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Governance</h3>
                      <p className="text-2xl font-bold text-purple-600">A</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Board Independence</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transparency Score</span>
                      <span className="font-medium">94.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ethics Compliance</span>
                      <span className="font-medium">98.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Decision Intelligence Tab */}
          <TabsContent value="decision-intelligence" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Strategic Decision Support
                </CardTitle>
                <CardDescription>
                  AI-powered insights and recommendations for executive
                  decision-making
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">High-Impact Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-5 w-5 text-green-600 mt-1" />
                          <div>
                            <h5 className="font-medium text-green-800">
                              Implement AI Risk Engine
                            </h5>
                            <p className="text-sm text-green-700 mt-1">
                              Projected 35% reduction in compliance costs and
                              60% faster risk identification
                            </p>
                            <p className="text-xs text-green-600 mt-2">
                              ROI: 340% over 18 months
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                        <div className="flex items-start gap-3">
                          <Target className="h-5 w-5 text-blue-600 mt-1" />
                          <div>
                            <h5 className="font-medium text-blue-800">
                              Expand ESG Reporting
                            </h5>
                            <p className="text-sm text-blue-700 mt-1">
                              Enhanced stakeholder transparency could improve
                              investor rating by 12%
                            </p>
                            <p className="text-xs text-blue-600 mt-2">
                              Implementation: Q1 2025
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Risk Scenarios</h4>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
                          <div>
                            <h5 className="font-medium text-yellow-800">
                              Regulatory Change Impact
                            </h5>
                            <p className="text-sm text-yellow-700 mt-1">
                              New EU regulations could increase compliance costs
                              by €15M annually
                            </p>
                            <p className="text-xs text-yellow-600 mt-2">
                              Probability: 72% by Q3 2025
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                          <div>
                            <h5 className="font-medium text-red-800">
                              Supply Chain Disruption
                            </h5>
                            <p className="text-sm text-red-700 mt-1">
                              Geopolitical tensions could impact 23% of tier-1
                              suppliers
                            </p>
                            <p className="text-xs text-red-600 mt-2">
                              Mitigation plan required
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CEOEnterpriseDashboard;
