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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Settings,
  Users,
  Globe,
  Database,
  Activity,
  FileText,
  Award,
  Zap,
  Network,
  Bell,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Fingerprint,
  Smartphone,
  Wifi,
  HardDrive,
  Cloud,
  Server,
  Monitor,
  Laptop,
  Tablet,
} from "lucide-react";

export interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  status: "critical" | "warning" | "good" | "excellent";
  lastUpdated: string;
  trend: "up" | "down" | "stable";
  category: "access" | "data" | "network" | "compliance" | "incidents";
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  status: "compliant" | "partial" | "non-compliant" | "in-progress";
  score: number;
  requirements: ComplianceRequirement[];
  lastAudit: string;
  nextAudit: string;
  certificationLevel: "basic" | "advanced" | "expert";
  region: string[];
}

export interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: "met" | "partial" | "not-met" | "not-applicable";
  priority: "critical" | "high" | "medium" | "low";
  category: string;
  evidence: string[];
  assignee: string;
  dueDate?: string;
}

export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "open" | "investigating" | "resolved" | "closed";
  category:
    | "data-breach"
    | "unauthorized-access"
    | "malware"
    | "phishing"
    | "ddos"
    | "insider-threat";
  reportedAt: string;
  reportedBy: string;
  assignee: string;
  affectedSystems: string[];
  affectedUsers: number;
  impact: string;
  resolution?: string;
  timeToDetection: number; // minutes
  timeToResolution?: number; // minutes
}

export interface AccessControl {
  id: string;
  type: "user" | "service" | "api" | "device";
  name: string;
  status: "active" | "suspended" | "expired";
  permissions: string[];
  lastAccess: string;
  location: string;
  device: string;
  ipAddress: string;
  riskScore: number;
  mfaEnabled: boolean;
  sessionCount: number;
}

export interface DataProtection {
  id: string;
  dataType: "pii" | "financial" | "health" | "intellectual-property" | "system";
  classification: "public" | "internal" | "confidential" | "restricted";
  location: string;
  encryption: "none" | "transit" | "rest" | "both";
  backupStatus: "current" | "outdated" | "failed";
  accessControls: number;
  lastAccessed: string;
  dataOwner: string;
  retentionPeriod: number; // days
  complianceFlags: string[];
}

const SecurityComplianceCenter = () => {
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);
  const [complianceFrameworks, setComplianceFrameworks] = useState<
    ComplianceFramework[]
  >([]);
  const [securityIncidents, setSecurityIncidents] = useState<
    SecurityIncident[]
  >([]);
  const [accessControls, setAccessControls] = useState<AccessControl[]>([]);
  const [dataProtection, setDataProtection] = useState<DataProtection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFramework, setSelectedFramework] =
    useState<ComplianceFramework | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      setLoading(true);

      // Mock data for demonstration
      const mockSecurityMetrics: SecurityMetric[] = [
        {
          id: "overall-security-score",
          name: "Overall Security Score",
          value: 94.2,
          status: "excellent",
          lastUpdated: "2024-12-15T10:30:00Z",
          trend: "up",
          category: "compliance",
        },
        {
          id: "failed-login-attempts",
          name: "Failed Login Attempts",
          value: 23,
          status: "warning",
          lastUpdated: "2024-12-15T10:25:00Z",
          trend: "up",
          category: "access",
        },
        {
          id: "data-encryption-coverage",
          name: "Data Encryption Coverage",
          value: 98.7,
          status: "excellent",
          lastUpdated: "2024-12-15T10:20:00Z",
          trend: "stable",
          category: "data",
        },
        {
          id: "vulnerability-scan-score",
          name: "Vulnerability Scan Score",
          value: 87.3,
          status: "good",
          lastUpdated: "2024-12-15T09:00:00Z",
          trend: "up",
          category: "network",
        },
        {
          id: "incident-response-time",
          name: "Avg Incident Response Time",
          value: 18.5,
          status: "good",
          lastUpdated: "2024-12-15T08:45:00Z",
          trend: "down",
          category: "incidents",
        },
        {
          id: "mfa-adoption",
          name: "MFA Adoption Rate",
          value: 96.1,
          status: "excellent",
          lastUpdated: "2024-12-15T10:15:00Z",
          trend: "up",
          category: "access",
        },
      ];

      const mockComplianceFrameworks: ComplianceFramework[] = [
        {
          id: "soc2",
          name: "SOC 2 Type II",
          description:
            "Service Organization Control 2 Type II compliance for security, availability, and confidentiality",
          status: "compliant",
          score: 96.2,
          requirements: [
            {
              id: "cc6.1",
              title: "Logical and Physical Access Controls",
              description:
                "Organization implements logical and physical access controls",
              status: "met",
              priority: "critical",
              category: "Access Control",
              evidence: [
                "Access control policy",
                "User access reviews",
                "Physical security measures",
              ],
              assignee: "Security Team",
              dueDate: "2024-12-31T00:00:00Z",
            },
            {
              id: "cc6.2",
              title: "Authentication and Authorization",
              description:
                "Organization implements authentication and authorization controls",
              status: "met",
              priority: "critical",
              category: "Access Control",
              evidence: [
                "Identity management system",
                "Role-based access controls",
              ],
              assignee: "IT Team",
            },
          ],
          lastAudit: "2024-11-15T00:00:00Z",
          nextAudit: "2025-11-15T00:00:00Z",
          certificationLevel: "advanced",
          region: ["United States", "Canada"],
        },
        {
          id: "iso27001",
          name: "ISO 27001",
          description:
            "International standard for information security management systems",
          status: "compliant",
          score: 92.8,
          requirements: [
            {
              id: "a.9.1.1",
              title: "Access Control Policy",
              description: "An access control policy shall be established",
              status: "met",
              priority: "critical",
              category: "Access Control",
              evidence: [
                "Access control policy document",
                "Management approval",
              ],
              assignee: "Compliance Officer",
            },
          ],
          lastAudit: "2024-10-20T00:00:00Z",
          nextAudit: "2025-10-20T00:00:00Z",
          certificationLevel: "expert",
          region: ["Global"],
        },
        {
          id: "gdpr",
          name: "GDPR",
          description:
            "General Data Protection Regulation for EU data protection",
          status: "compliant",
          score: 94.5,
          requirements: [
            {
              id: "art.32",
              title: "Security of Processing",
              description:
                "Implement appropriate technical and organizational measures",
              status: "met",
              priority: "critical",
              category: "Data Protection",
              evidence: [
                "Encryption implementation",
                "Access logging",
                "Security monitoring",
              ],
              assignee: "Data Protection Officer",
            },
          ],
          lastAudit: "2024-09-15T00:00:00Z",
          nextAudit: "2025-03-15T00:00:00Z",
          certificationLevel: "advanced",
          region: ["European Union"],
        },
        {
          id: "hipaa",
          name: "HIPAA",
          description:
            "Health Insurance Portability and Accountability Act compliance",
          status: "in-progress",
          score: 78.3,
          requirements: [
            {
              id: "164.312",
              title: "Technical Safeguards",
              description: "Implement technical safeguards for electronic PHI",
              status: "partial",
              priority: "critical",
              category: "Technical Controls",
              evidence: ["Encryption protocols", "Access controls"],
              assignee: "Healthcare Compliance Team",
              dueDate: "2025-01-31T00:00:00Z",
            },
          ],
          lastAudit: "2024-08-10T00:00:00Z",
          nextAudit: "2025-02-10T00:00:00Z",
          certificationLevel: "basic",
          region: ["United States"],
        },
      ];

      const mockSecurityIncidents: SecurityIncident[] = [
        {
          id: "inc-001",
          title: "Suspicious Login Activity",
          description:
            "Multiple failed login attempts from unknown IP addresses",
          severity: "medium",
          status: "investigating",
          category: "unauthorized-access",
          reportedAt: "2024-12-15T09:15:00Z",
          reportedBy: "Security Monitoring System",
          assignee: "Security Analyst",
          affectedSystems: ["Authentication System"],
          affectedUsers: 5,
          impact: "No data breach, investigating potential brute force attack",
          timeToDetection: 12,
        },
        {
          id: "inc-002",
          title: "Phishing Email Detected",
          description: "Malicious email targeting finance department",
          severity: "high",
          status: "resolved",
          category: "phishing",
          reportedAt: "2024-12-14T14:30:00Z",
          reportedBy: "Employee",
          assignee: "Security Team Lead",
          affectedSystems: ["Email System"],
          affectedUsers: 15,
          impact: "Email quarantined, users notified",
          resolution:
            "Email blocked, sender blacklisted, security awareness training scheduled",
          timeToDetection: 5,
          timeToResolution: 45,
        },
      ];

      const mockAccessControls: AccessControl[] = [
        {
          id: "access-001",
          type: "user",
          name: "sarah.johnson@company.com",
          status: "active",
          permissions: ["admin", "read", "write"],
          lastAccess: "2024-12-15T10:30:00Z",
          location: "New York, NY",
          device: "MacBook Pro",
          ipAddress: "203.0.113.45",
          riskScore: 15,
          mfaEnabled: true,
          sessionCount: 3,
        },
        {
          id: "access-002",
          type: "api",
          name: "Integration API Key",
          status: "active",
          permissions: ["read", "webhook"],
          lastAccess: "2024-12-15T10:25:00Z",
          location: "Cloud Service",
          device: "API Client",
          ipAddress: "198.51.100.22",
          riskScore: 5,
          mfaEnabled: false,
          sessionCount: 1,
        },
      ];

      const mockDataProtection: DataProtection[] = [
        {
          id: "data-001",
          dataType: "pii",
          classification: "confidential",
          location: "Primary Database",
          encryption: "both",
          backupStatus: "current",
          accessControls: 15,
          lastAccessed: "2024-12-15T09:45:00Z",
          dataOwner: "Data Protection Officer",
          retentionPeriod: 2555, // 7 years
          complianceFlags: ["GDPR", "CCPA"],
        },
        {
          id: "data-002",
          dataType: "financial",
          classification: "restricted",
          location: "Secure Finance DB",
          encryption: "both",
          backupStatus: "current",
          accessControls: 8,
          lastAccessed: "2024-12-15T08:30:00Z",
          dataOwner: "Finance Director",
          retentionPeriod: 3650, // 10 years
          complianceFlags: ["SOX", "PCI-DSS"],
        },
      ];

      setSecurityMetrics(mockSecurityMetrics);
      setComplianceFrameworks(mockComplianceFrameworks);
      setSecurityIncidents(mockSecurityIncidents);
      setAccessControls(mockAccessControls);
      setDataProtection(mockDataProtection);
      setSelectedFramework(mockComplianceFrameworks[0]);
    } catch (error) {
      toast({
        title: "Error loading security data",
        description:
          "Failed to fetch security and compliance information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
      case "compliant":
      case "met":
      case "current":
        return "bg-green-500";
      case "good":
      case "partial":
      case "investigating":
        return "bg-yellow-500";
      case "warning":
      case "in-progress":
      case "outdated":
        return "bg-orange-500";
      case "critical":
      case "non-compliant":
      case "not-met":
      case "failed":
      case "open":
        return "bg-red-500";
      case "resolved":
      case "closed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-orange-600";
    if (score >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getMetricIcon = (category: string) => {
    switch (category) {
      case "access":
        return Key;
      case "data":
        return Database;
      case "network":
        return Network;
      case "compliance":
        return Award;
      case "incidents":
        return AlertTriangle;
      default:
        return Shield;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading security dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Security & Compliance Center</h1>
          <p className="text-muted-foreground">
            Comprehensive security monitoring, compliance tracking, and risk
            management across your enterprise
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Security Report
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Audit
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
        </div>
      </div>

      {/* Security Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityMetrics.map((metric) => {
          const IconComponent = getMetricIcon(metric.category);
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
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">{metric.name}</h3>
                  <div className="text-2xl font-bold">
                    {metric.category === "incidents"
                      ? `${metric.value} min`
                      : metric.name.includes("Rate") ||
                          metric.name.includes("Coverage") ||
                          metric.name.includes("Score")
                        ? `${metric.value}%`
                        : metric.value.toLocaleString()}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Updated:{" "}
                      {new Date(metric.lastUpdated).toLocaleTimeString()}
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {metric.category}
                    </Badge>
                  </div>

                  {(metric.name.includes("Rate") ||
                    metric.name.includes("Coverage") ||
                    metric.name.includes("Score")) &&
                    metric.value <= 100 && (
                      <Progress value={metric.value} className="h-2" />
                    )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="compliance" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="data">Data Protection</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Compliance Frameworks List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Frameworks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[600px] overflow-y-auto">
                    {complianceFrameworks.map((framework) => (
                      <div
                        key={framework.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedFramework?.id === framework.id
                            ? "bg-muted"
                            : ""
                        }`}
                        onClick={() => setSelectedFramework(framework)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">
                              {framework.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {framework.description}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(framework.status)}>
                              {framework.status}
                            </Badge>
                            <span className="text-sm font-bold">
                              {framework.score}%
                            </span>
                          </div>
                          <Progress value={framework.score} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              Next audit:{" "}
                              {new Date(
                                framework.nextAudit,
                              ).toLocaleDateString()}
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {framework.certificationLevel}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Framework Details */}
            <div className="lg:col-span-2">
              {selectedFramework ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      {selectedFramework.name}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {selectedFramework.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Framework Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedFramework.score}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Compliance Score
                        </p>
                        <Badge
                          className={getStatusColor(selectedFramework.status)}
                        >
                          {selectedFramework.status}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedFramework.requirements.length}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Requirements
                        </p>
                        <Badge variant="outline">
                          {
                            selectedFramework.requirements.filter(
                              (r) => r.status === "met",
                            ).length
                          }{" "}
                          Met
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {Math.ceil(
                            (new Date(selectedFramework.nextAudit).getTime() -
                              Date.now()) /
                              (1000 * 60 * 60 * 24),
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Days to Next Audit
                        </p>
                        <Badge variant="outline" className="capitalize">
                          {selectedFramework.certificationLevel}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Framework Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Audit Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Last Audit:
                            </span>
                            <span>
                              {new Date(
                                selectedFramework.lastAudit,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Next Audit:
                            </span>
                            <span>
                              {new Date(
                                selectedFramework.nextAudit,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Certification Level:
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {selectedFramework.certificationLevel}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Coverage</h4>
                        <div className="space-y-2">
                          <span className="text-sm font-medium">Regions:</span>
                          <div className="flex flex-wrap gap-1">
                            {selectedFramework.region.map((region, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {region}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Requirements */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Requirements</h4>
                      <div className="space-y-3">
                        {selectedFramework.requirements.map((requirement) => (
                          <div
                            key={requirement.id}
                            className="p-4 border rounded-lg"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h5 className="font-medium text-sm">
                                  {requirement.title}
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                  {requirement.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Badge
                                  className={getSeverityColor(
                                    requirement.priority,
                                  )}
                                >
                                  {requirement.priority}
                                </Badge>
                                <Badge
                                  className={getStatusColor(requirement.status)}
                                >
                                  {requirement.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                              <div>
                                <span className="font-medium">Category:</span>
                                <p className="text-muted-foreground">
                                  {requirement.category}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">Assignee:</span>
                                <p className="text-muted-foreground">
                                  {requirement.assignee}
                                </p>
                              </div>
                              {requirement.dueDate && (
                                <div>
                                  <span className="font-medium">Due Date:</span>
                                  <p className="text-muted-foreground">
                                    {new Date(
                                      requirement.dueDate,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                              <div>
                                <span className="font-medium">Evidence:</span>
                                <p className="text-muted-foreground">
                                  {requirement.evidence.length} items
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Evidence
                      </Button>
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Assessment
                      </Button>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Select a Compliance Framework
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a framework from the list to view its requirements
                      and compliance status.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Security Incidents</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search incidents..."
                  className="pl-10 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {securityIncidents.map((incident) => (
              <Card
                key={incident.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{incident.title}</h4>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {incident.category.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {incident.description}
                      </p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Reported:</span>
                          <p className="text-muted-foreground">
                            {new Date(incident.reportedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Assignee:</span>
                          <p className="text-muted-foreground">
                            {incident.assignee}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Affected Users:</span>
                          <p className="text-muted-foreground">
                            {incident.affectedUsers}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Detection Time:</span>
                          <p className="text-muted-foreground">
                            {incident.timeToDetection} min
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="font-medium text-sm">Impact:</span>
                        <p className="text-sm text-muted-foreground">
                          {incident.impact}
                        </p>
                      </div>
                      {incident.resolution && (
                        <div className="mt-3">
                          <span className="font-medium text-sm">
                            Resolution:
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {incident.resolution}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Control Management</CardTitle>
              <p className="text-muted-foreground">
                Monitor and manage user access, sessions, and authentication
                across your enterprise
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessControls.map((access) => (
                  <div key={access.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{access.name}</h4>
                          <Badge variant="outline" className="capitalize">
                            {access.type}
                          </Badge>
                          <Badge className={getStatusColor(access.status)}>
                            {access.status}
                          </Badge>
                          {access.mfaEnabled && (
                            <Badge variant="default" className="bg-green-500">
                              MFA
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Last Access:</span>
                            <p className="text-muted-foreground">
                              {new Date(access.lastAccess).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>
                            <p className="text-muted-foreground">
                              {access.location}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Device:</span>
                            <p className="text-muted-foreground">
                              {access.device}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Risk Score:</span>
                            <p
                              className={`font-semibold ${getRiskScoreColor(access.riskScore)}`}
                            >
                              {access.riskScore}/100
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="font-medium text-sm">
                            Permissions:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {access.permissions.map((permission, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lock className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Protection & Privacy</CardTitle>
              <p className="text-muted-foreground">
                Monitor data classification, encryption status, and compliance
                requirements
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataProtection.map((data) => (
                  <div key={data.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold capitalize">
                            {data.dataType.replace("-", " ")}
                          </h4>
                          <Badge variant="outline" className="capitalize">
                            {data.classification}
                          </Badge>
                          <Badge className={getStatusColor(data.backupStatus)}>
                            {data.backupStatus}
                          </Badge>
                          {data.encryption === "both" && (
                            <Badge variant="default" className="bg-green-500">
                              Encrypted
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Location:</span>
                            <p className="text-muted-foreground">
                              {data.location}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Data Owner:</span>
                            <p className="text-muted-foreground">
                              {data.dataOwner}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">
                              Access Controls:
                            </span>
                            <p className="text-muted-foreground">
                              {data.accessControls}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Retention:</span>
                            <p className="text-muted-foreground">
                              {Math.round(data.retentionPeriod / 365)} years
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="font-medium text-sm">
                            Compliance:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {data.complianceFlags.map((flag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Security Monitoring & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Real-time Security Monitoring
                </h3>
                <p className="text-muted-foreground mb-4">
                  24/7 monitoring with AI-powered threat detection, behavioral
                  analysis, and automated incident response.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <Eye className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Threat Detection</h4>
                    <p className="text-xs text-muted-foreground">
                      AI-powered analysis
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Bell className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                    <h4 className="font-medium">Real-time Alerts</h4>
                    <p className="text-xs text-muted-foreground">
                      Instant notifications
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Zap className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Auto Response</h4>
                    <p className="text-xs text-muted-foreground">
                      Automated mitigation
                    </p>
                  </div>
                </div>
                <Button>
                  <Activity className="h-4 w-4 mr-2" />
                  Launch Security Operations Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Security Policies & Procedures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Policy Management Center
                </h3>
                <p className="text-muted-foreground mb-4">
                  Centralized management of security policies, procedures, and
                  governance documentation with version control and approval
                  workflows.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Policy Library</h4>
                    <p className="text-xs text-muted-foreground">
                      147 active policies
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Training & Awareness</h4>
                    <p className="text-xs text-muted-foreground">
                      98% completion rate
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <CheckCircle className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Compliance Tracking</h4>
                    <p className="text-xs text-muted-foreground">
                      Real-time monitoring
                    </p>
                  </div>
                </div>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Access Policy Library
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityComplianceCenter;
