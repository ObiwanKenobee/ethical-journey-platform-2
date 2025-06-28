import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  Target,
  Brain,
  Eye,
  Bell,
  FileText,
  Globe,
  Users,
  Building,
  MapPin,
  Calendar,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  Lightbulb,
  Rocket,
  Sparkles,
  Cpu,
  Database,
  Network,
  Server,
  CloudLightning,
  BookOpen,
  GraduationCap,
  Award,
  Scale,
  Gavel,
  Download,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react";

const AutonomousComplianceEngine = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const complianceMetrics = {
    overallScore: 87,
    riskLevel: "Medium",
    violationsDetected: 23,
    issuesResolved: 156,
    autonomousActions: 42,
    timeToResolution: "2.3 hours",
  };

  const recentViolations = [
    {
      id: 1,
      type: "Labor Standards",
      severity: "high",
      location: "Bangladesh Factory #12",
      description: "Excessive overtime hours detected",
      status: "investigating",
      detectedAt: "2 hours ago",
    },
    {
      id: 2,
      type: "Environmental",
      severity: "medium",
      location: "Vietnam Facility #8",
      description: "Water quality parameters exceeded",
      status: "resolved",
      detectedAt: "5 hours ago",
    },
    {
      id: 3,
      type: "Safety Protocol",
      severity: "low",
      location: "Mexico Plant #3",
      description: "Missing safety equipment documentation",
      status: "auto-resolved",
      detectedAt: "1 day ago",
    },
  ];

  const autonomousActions = [
    {
      id: 1,
      action: "Supplier Alert Sent",
      target: "Bangladesh Factory #12",
      result: "Acknowledged",
      timestamp: "1 hour ago",
    },
    {
      id: 2,
      action: "Compliance Report Generated",
      target: "Monthly Environmental Report",
      result: "Completed",
      timestamp: "3 hours ago",
    },
    {
      id: 3,
      action: "Risk Assessment Updated",
      target: "Southeast Asia Region",
      result: "Risk Level Adjusted",
      timestamp: "6 hours ago",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Autonomous Compliance Engine
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered compliance monitoring and automatic violation resolution
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">
                  {complianceMetrics.overallScore}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Compliance Score
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">
                  {complianceMetrics.violationsDetected}
                </div>
                <div className="text-xs text-muted-foreground">
                  Active Violations
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">
                  {complianceMetrics.issuesResolved}
                </div>
                <div className="text-xs text-muted-foreground">
                  Issues Resolved
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">
                  {complianceMetrics.autonomousActions}
                </div>
                <div className="text-xs text-muted-foreground">
                  Auto Actions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">
                  {complianceMetrics.timeToResolution}
                </div>
                <div className="text-xs text-muted-foreground">
                  Avg Resolution
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">
                  {complianceMetrics.riskLevel}
                </div>
                <div className="text-xs text-muted-foreground">Risk Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="autonomous">Autonomous Actions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Violations</CardTitle>
                <CardDescription>
                  Latest compliance issues detected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentViolations.map((violation) => (
                    <div
                      key={violation.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            violation.severity === "high"
                              ? "text-red-500"
                              : violation.severity === "medium"
                                ? "text-yellow-500"
                                : "text-blue-500"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{violation.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {violation.location}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          violation.status === "resolved"
                            ? "default"
                            : violation.status === "investigating"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {violation.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Autonomous Actions</CardTitle>
                <CardDescription>
                  Recent AI-driven interventions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {autonomousActions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{action.action}</div>
                          <div className="text-sm text-muted-foreground">
                            {action.target}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {action.result}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {action.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Violations</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {recentViolations.map((violation) => (
              <Card key={violation.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`h-5 w-5 mt-1 ${
                          violation.severity === "high"
                            ? "text-red-500"
                            : violation.severity === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        }`}
                      />
                      <div>
                        <div className="font-semibold">{violation.type}</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {violation.description}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {violation.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {violation.detectedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          violation.severity === "high"
                            ? "destructive"
                            : violation.severity === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {violation.severity}
                      </Badge>
                      <Badge
                        variant={
                          violation.status === "resolved"
                            ? "default"
                            : violation.status === "investigating"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {violation.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="autonomous" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Autonomous Actions Log</h3>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {autonomousActions.map((action) => (
              <Card key={action.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{action.action}</div>
                        <div className="text-sm text-muted-foreground">
                          {action.target}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        {action.result}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {action.timestamp}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Trends</CardTitle>
                <CardDescription>30-day compliance score trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Compliance trend chart
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Violation Categories</CardTitle>
                <CardDescription>
                  Distribution of violation types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Violation distribution chart
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutonomousComplianceEngine;
