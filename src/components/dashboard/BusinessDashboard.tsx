import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Globe, 
  Users, 
  DollarSign,
  Target,
  Award,
  Activity,
  BarChart3,
  Map,
  Bot,
  Zap,
  Database,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  FileText,
  Settings,
  Filter,
  Download,
  Briefcase,
  Factory,
  Truck,
  Package,
  AlertCircle as Alert,
  TrendingDown,
  Calendar,
  Bell,
  Search,
  RefreshCw,
  MoreHorizontal,
  Network,
  Handshake
} from 'lucide-react';
import ArchetypeInteractionHub from './ArchetypeInteractionHub';
import SupplyChainCRUD from './SupplyChainCRUD';

const BusinessDashboard = () => {
  const [activeView, setActiveView] = useState("executive");
  const [timeRange, setTimeRange] = useState("7d");

  // Enhanced KPI Metrics with real-time data simulation
  const kpiMetrics = [
    { 
      label: "ESG Compliance Score", 
      value: "94.2%", 
      change: "+3.2%", 
      trend: "up",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      target: "95%",
      status: "on-track"
    },
    { 
      label: "Supply Chain Risk Index", 
      value: "2.3/10", 
      change: "-12%", 
      trend: "down",
      icon: AlertTriangle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      target: "< 3.0",
      status: "excellent"
    },
    { 
      label: "Supplier Diversity Score", 
      value: "67.8%", 
      change: "+8.4%", 
      trend: "up",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      target: "70%",
      status: "approaching"
    },
    { 
      label: "Cost Optimization Impact", 
      value: "$2.34M", 
      change: "+15.2%", 
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      target: "$2.5M",
      status: "on-track"
    },
    { 
      label: "Supplier Verification Rate", 
      value: "98.7%", 
      change: "+2.1%", 
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      target: "99%",
      status: "on-track"
    },
    { 
      label: "Carbon Footprint Reduction", 
      value: "23.4%", 
      change: "+5.7%", 
      trend: "up",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-50",
      target: "25%",
      status: "approaching"
    }
  ];

  // Executive Alerts with priority levels
  const executiveAlerts = [
    {
      id: 1,
      level: "critical",
      title: "Tier-1 Supplier Audit Overdue",
      description: "3 critical suppliers in Southeast Asia require immediate ESG audit within 48 hours",
      impact: "High revenue risk: $12.3M",
      action: "Schedule Emergency Audits",
      timeAgo: "2 hours ago",
      assignee: "Compliance Team Lead"
    },
    {
      id: 2,
      level: "high",
      title: "Regulatory Compliance Gap",
      description: "New EU Supply Chain Due Diligence Act requirements need implementation",
      impact: "Regulatory risk: Market access",
      action: "Review Legal Requirements",
      timeAgo: "4 hours ago",
      assignee: "Legal & Compliance"
    },
    {
      id: 3,
      level: "medium", 
      title: "Worker Safety Incident Report",
      description: "Anonymous report from Facility #247 requires investigation",
      impact: "Reputational risk: Medium",
      action: "Initiate Investigation",
      timeAgo: "6 hours ago",
      assignee: "Worker Protection Team"
    },
    {
      id: 4,
      level: "low",
      title: "Supplier Performance Review",
      description: "Q2 performance reviews pending for 23 suppliers",
      impact: "Operational efficiency",
      action: "Schedule Reviews",
      timeAgo: "1 day ago",
      assignee: "Procurement Team"
    }
  ];

  // Global Supply Chain Metrics with enhanced data
  const globalSupplyChainMetrics = [
    { 
      region: "North America", 
      suppliers: 127, 
      risk: "Low", 
      compliance: 96.2,
      revenue: "$45.2M",
      trend: "up",
      criticalSuppliers: 2
    },
    { 
      region: "Europe", 
      suppliers: 89, 
      risk: "Low", 
      compliance: 94.8,
      revenue: "$32.7M",
      trend: "up",
      criticalSuppliers: 1
    },
    { 
      region: "Asia Pacific", 
      suppliers: 234, 
      risk: "Medium", 
      compliance: 87.3,
      revenue: "$78.9M",
      trend: "down",
      criticalSuppliers: 8
    },
    { 
      region: "Latin America", 
      suppliers: 56, 
      risk: "Medium", 
      compliance: 91.4,
      revenue: "$18.5M",
      trend: "stable",
      criticalSuppliers: 3
    },
    { 
      region: "Africa & Middle East", 
      suppliers: 42, 
      risk: "High", 
      compliance: 83.7,
      revenue: "$12.1M",
      trend: "up",
      criticalSuppliers: 5
    }
  ];

  // AI Insights and Recommendations
  const aiInsights = [
    {
      type: "prediction",
      title: "Supply Chain Disruption Risk",
      description: "89% probability of minor disruption in Asia Pacific region within next 30 days",
      confidence: 89,
      action: "Diversify supplier base in Vietnam and Thailand",
      impact: "Potential 3-5 day delay in production"
    },
    {
      type: "optimization",
      title: "Cost Reduction Opportunity",
      description: "AI identified $780K potential savings through supplier consolidation",
      confidence: 94,
      action: "Consolidate 12 suppliers into 3 strategic partners",
      impact: "12% cost reduction in Q4"
    },
    {
      type: "compliance",
      title: "ESG Score Improvement",
      description: "Upgrade 5 suppliers to achieve 97% overall ESG compliance",
      confidence: 76,
      action: "Implement enhanced training program",
      impact: "3.2% ESG score improvement"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Executive Supply Chain Command Center</h2>
          <p className="text-muted-foreground">Real-time visibility across global operations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Review
          </Button>
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Time Range:</span>
        {["24h", "7d", "30d", "90d", "1y"].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range}
          </Button>
        ))}
        <Button variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Enhanced KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`flex items-center text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {metric.change}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Target: {metric.target}</span>
                  <Badge variant={metric.status === 'excellent' ? 'default' : metric.status === 'on-track' ? 'secondary' : 'outline'}>
                    {metric.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="executive" className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="executive">Executive</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="risk">Risk Intel</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="sustainability">ESG</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="interactions">Archetypes</TabsTrigger>
          <TabsTrigger value="crud">Data Mgmt</TabsTrigger>
        </TabsList>

        <TabsContent value="executive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Critical Alerts Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-500" />
                  Executive Alerts
                  <Badge variant="destructive">4</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {executiveAlerts.map((alert, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          alert.level === 'critical' ? 'destructive' : 
                          alert.level === 'high' ? 'default' : 
                          alert.level === 'medium' ? 'secondary' : 'outline'
                        }>
                          {alert.level.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-sm">{alert.title}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-red-600">{alert.impact}</span>
                      <span className="text-xs text-muted-foreground">{alert.timeAgo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Assigned: {alert.assignee}</span>
                      <Button size="sm" variant="outline">{alert.action}</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI-Powered Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  AI Strategic Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${
                        insight.type === 'prediction' ? 'bg-yellow-100 text-yellow-600' :
                        insight.type === 'optimization' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {insight.type === 'prediction' ? <Eye className="h-3 w-3" /> :
                         insight.type === 'optimization' ? <Zap className="h-3 w-3" /> :
                         <Shield className="h-3 w-3" />}
                      </div>
                      <span className="font-medium text-sm">{insight.title}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <Badge variant="outline">{insight.confidence}%</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs"><strong>Recommended Action:</strong> {insight.action}</p>
                      <p className="text-xs"><strong>Expected Impact:</strong> {insight.impact}</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Implement Recommendation
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Global Supply Chain Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Supply Chain Command Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {globalSupplyChainMetrics.map((region, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{region.region}</h4>
                      <div className="flex items-center gap-1">
                        {region.trend === 'up' ? <TrendingUp className="h-3 w-3 text-green-500" /> :
                         region.trend === 'down' ? <TrendingDown className="h-3 w-3 text-red-500" /> :
                         <Activity className="h-3 w-3 text-gray-500" />}
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Suppliers:</span>
                        <span className="font-medium">{region.suppliers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-medium">{region.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Level:</span>
                        <Badge variant={region.risk === 'Low' ? 'secondary' : region.risk === 'Medium' ? 'outline' : 'destructive'} className="text-xs">
                          {region.risk}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance:</span>
                        <span className="font-medium">{region.compliance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Critical Issues:</span>
                        <span className={`font-medium ${region.criticalSuppliers > 5 ? 'text-red-600' : region.criticalSuppliers > 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {region.criticalSuppliers}
                        </span>
                      </div>
                    </div>
                    <Progress value={region.compliance} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="h-5 w-5" />
                  Production Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">247</div>
                    <p className="text-sm text-muted-foreground">Active Facilities</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Operational Efficiency</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Logistics Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">Active Shipments</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-Time Delivery</span>
                      <span className="font-medium">96.8%</span>
                    </div>
                    <Progress value={97} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Inventory Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">$847M</div>
                    <p className="text-sm text-muted-foreground">Total Inventory Value</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Turnover Rate</span>
                      <span className="font-medium">4.2x</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Enterprise Risk Intelligence Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Powered Predictive Risk Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced machine learning algorithms continuously analyze global patterns to predict and prevent supply chain risks across all operational dimensions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Geopolitical Risk</h4>
                    <div className="text-2xl font-bold text-yellow-600">Medium</div>
                    <p className="text-xs text-muted-foreground">3 regions monitored</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Climate Risk</h4>
                    <div className="text-2xl font-bold text-green-600">Low</div>
                    <p className="text-xs text-muted-foreground">Seasonal analysis</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Cyber Security</h4>
                    <div className="text-2xl font-bold text-red-600">High</div>
                    <p className="text-xs text-muted-foreground">Active monitoring</p>
                  </div>
                </div>
                <Button>Access Full Risk Intelligence Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Global Compliance Command Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Regulatory Compliance Status</h4>
                  <div className="space-y-3">
                    {[
                      { name: "EU CSDDD", status: "Compliant", score: 96 },
                      { name: "UK Modern Slavery Act", status: "Compliant", score: 98 },
                      { name: "US UFLPA", status: "Under Review", score: 89 },
                      { name: "Australia Modern Slavery Act", status: "Compliant", score: 94 }
                    ].map((reg, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <span className="font-medium">{reg.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={reg.status === 'Compliant' ? 'secondary' : 'outline'}>
                            {reg.status}
                          </Badge>
                          <span className="text-sm">{reg.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Audit Schedule</h4>
                  <div className="space-y-2">
                    {[
                      { date: "Dec 15", supplier: "Textile Corp Vietnam", type: "ESG Audit" },
                      { date: "Dec 18", supplier: "Electronics Ltd Thailand", type: "Worker Rights" },
                      { date: "Dec 22", supplier: "Manufacturing Inc Mexico", type: "Environmental" }
                    ].map((audit, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded text-sm">
                        <div>
                          <div className="font-medium">{audit.supplier}</div>
                          <div className="text-muted-foreground">{audit.type}</div>
                        </div>
                        <Badge variant="outline">{audit.date}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                ESG Performance Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold">2.4M</div>
                  <p className="text-sm text-muted-foreground">Workers Protected</p>
                  <Progress value={87} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <Target className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold">45K</div>
                  <p className="text-sm text-muted-foreground">Suppliers Verified</p>
                  <Progress value={92} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-sm text-muted-foreground">Countries Monitored</p>
                  <Progress value={95} className="mt-2 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI-Powered Business Intelligence Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Predictive Analytics Engine
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI models predict supply chain disruptions 30 days in advance with 94% accuracy across global operations.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Model Accuracy</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <Progress value={94} className="h-1" />
                  </div>
                  <Button size="sm" variant="outline" className="w-full">Access Prediction Dashboard</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Database className="h-4 w-4 text-blue-500" />
                    Anomaly Detection System
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Real-time monitoring identifies unusual patterns in supplier behavior, worker conditions, and operational metrics.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Detection Rate</span>
                      <span className="font-medium">98.7%</span>
                    </div>
                    <Progress value={99} className="h-1" />
                  </div>
                  <Button size="sm" variant="outline" className="w-full">View Anomalies</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Advanced Analytics & Reporting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Enterprise Analytics Suite</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive analytics platform with custom dashboards, automated reporting, and executive insights.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Custom Reports</h4>
                    <p className="text-xs text-muted-foreground">247 active reports</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Real-time Dashboards</h4>
                    <p className="text-xs text-muted-foreground">15 live dashboards</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Target className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">KPI Tracking</h4>
                    <p className="text-xs text-muted-foreground">89 metrics monitored</p>
                  </div>
                </div>
                <Button>Launch Analytics Platform</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Archetype Interactions Tab */}
        <TabsContent value="interactions" className="space-y-6">
          <ArchetypeInteractionHub />
        </TabsContent>

        {/* New CRUD Management Tab */}
        <TabsContent value="crud" className="space-y-6">
          <SupplyChainCRUD />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDashboard;
