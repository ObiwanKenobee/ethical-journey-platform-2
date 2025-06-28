
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  FileCheck,
  TrendingUp,
  Globe,
  Users,
  Calendar,
  Bell,
  Search,
  Filter,
  Download,
  Settings,
  Eye,
  RefreshCw,
  BarChart3,
  Activity,
  Target,
  Zap,
  Database,
  Network,
  Scale,
  Gavel,
  FileText,
  Award,
  MapPin,
  Building,
  Factory
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComplianceFramework {
  id: string;
  name: string;
  region: string;
  status: 'compliant' | 'non_compliant' | 'under_review' | 'overdue';
  lastAssessment: string;
  nextDeadline: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  completionRate: number;
  requirements: number;
  completedRequirements: number;
}

interface RegulatoryUpdate {
  id: string;
  title: string;
  jurisdiction: string;
  effectiveDate: string;
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending_review' | 'analyzed' | 'implemented';
  affectedAreas: string[];
  description: string;
}

interface AuditRecord {
  id: string;
  type: string;
  scope: string;
  auditor: string;
  scheduledDate: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  findings: number;
  criticalFindings: number;
  supplier?: string;
  region: string;
}

const EnterpriseComplianceDashboard = () => {
  const [activeView, setActiveView] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedFramework, setSelectedFramework] = useState("all");
  const { toast } = useToast();

  // Mock data for compliance frameworks
  const complianceFrameworks: ComplianceFramework[] = [
    {
      id: '1',
      name: 'EU Corporate Sustainability Reporting Directive',
      region: 'European Union',
      status: 'compliant',
      lastAssessment: '2024-11-15',
      nextDeadline: '2025-01-31',
      riskLevel: 'low',
      completionRate: 94,
      requirements: 127,
      completedRequirements: 119
    },
    {
      id: '2',
      name: 'UK Modern Slavery Act',
      region: 'United Kingdom',
      status: 'compliant',
      lastAssessment: '2024-10-22',
      nextDeadline: '2025-03-31',
      riskLevel: 'low',
      completionRate: 98,
      requirements: 45,
      completedRequirements: 44
    },
    {
      id: '3',
      name: 'California Transparency in Supply Chains Act',
      region: 'United States',
      status: 'under_review',
      lastAssessment: '2024-09-10',
      nextDeadline: '2024-12-31',
      riskLevel: 'medium',
      completionRate: 87,
      requirements: 78,
      completedRequirements: 68
    },
    {
      id: '4',
      name: 'Australia Modern Slavery Act',
      region: 'Australia',
      status: 'non_compliant',
      lastAssessment: '2024-08-15',
      nextDeadline: '2024-12-15',
      riskLevel: 'high',
      completionRate: 67,
      requirements: 89,
      completedRequirements: 60
    }
  ];

  // Mock regulatory updates
  const regulatoryUpdates: RegulatoryUpdate[] = [
    {
      id: '1',
      title: 'EU Due Diligence Directive - Final Text Published',
      jurisdiction: 'European Union',
      effectiveDate: '2025-07-01',
      impactLevel: 'critical',
      status: 'pending_review',
      affectedAreas: ['Supply Chain', 'Human Rights', 'Environmental'],
      description: 'New mandatory due diligence requirements for large companies operating in the EU.'
    },
    {
      id: '2',
      title: 'UK Employment Rights Bill - Modern Slavery Provisions',
      jurisdiction: 'United Kingdom',
      effectiveDate: '2024-12-31',
      impactLevel: 'high',
      status: 'analyzed',
      affectedAreas: ['Worker Rights', 'Reporting'],
      description: 'Enhanced reporting requirements for modern slavery statements.'
    },
    {
      id: '3',
      title: 'Canada Fighting Against Forced Labour Act',
      jurisdiction: 'Canada',
      effectiveDate: '2024-12-01',
      impactLevel: 'medium',
      status: 'implemented',
      affectedAreas: ['Import Controls', 'Supply Chain'],
      description: 'New import restrictions on goods produced with forced labour.'
    }
  ];

  // Mock audit records
  const auditRecords: AuditRecord[] = [
    {
      id: '1',
      type: 'ESG Compliance Audit',
      scope: 'Tier 1 Suppliers',
      auditor: 'PwC Global',
      scheduledDate: '2024-12-20',
      status: 'scheduled',
      findings: 0,
      criticalFindings: 0,
      supplier: 'Global Textiles Ltd',
      region: 'Asia Pacific'
    },
    {
      id: '2',
      type: 'Worker Rights Assessment',
      scope: 'Manufacturing Facilities',
      auditor: 'Deloitte',
      scheduledDate: '2024-12-15',
      status: 'in_progress',
      findings: 3,
      criticalFindings: 1,
      supplier: 'Vietnam Manufacturing Co',
      region: 'Asia Pacific'
    },
    {
      id: '3',
      type: 'Environmental Compliance',
      scope: 'All Operations',
      auditor: 'KPMG',
      scheduledDate: '2024-11-30',
      status: 'completed',
      findings: 7,
      criticalFindings: 2,
      region: 'Europe'
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'completed':
      case 'implemented':
        return 'default';
      case 'under_review':
      case 'in_progress':
      case 'analyzed':
        return 'secondary';
      case 'non_compliant':
      case 'overdue':
      case 'pending_review':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleExportCompliance = () => {
    toast({
      title: "Export Initiated",
      description: "Compliance report is being generated and will be available for download shortly.",
    });
  };

  const handleScheduleAudit = () => {
    toast({
      title: "Audit Scheduled",
      description: "New audit has been scheduled and notifications sent to relevant stakeholders.",
    });
  };

  // Calculate overview metrics
  const overviewMetrics = {
    totalFrameworks: complianceFrameworks.length,
    compliantFrameworks: complianceFrameworks.filter(f => f.status === 'compliant').length,
    averageCompletionRate: Math.round(complianceFrameworks.reduce((sum, f) => sum + f.completionRate, 0) / complianceFrameworks.length),
    pendingUpdates: regulatoryUpdates.filter(u => u.status === 'pending_review').length,
    scheduledAudits: auditRecords.filter(a => a.status === 'scheduled').length,
    criticalFindings: auditRecords.reduce((sum, a) => sum + a.criticalFindings, 0)
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Enterprise Compliance Command Center</h2>
          <p className="text-muted-foreground">Global regulatory oversight and compliance management</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportCompliance}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleScheduleAudit}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Audit
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.averageCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant Frameworks</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewMetrics.compliantFrameworks}/{overviewMetrics.totalFrameworks}
            </div>
            <p className="text-xs text-muted-foreground">Active frameworks</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Updates</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.pendingUpdates}</div>
            <p className="text-xs text-muted-foreground">Regulatory changes</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Audits</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.scheduledAudits}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.criticalFindings}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.8%</div>
            <p className="text-xs text-muted-foreground">Analysis accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Compliance Framework Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceFrameworks.map((framework) => (
                  <div key={framework.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{framework.name}</h4>
                        <p className="text-xs text-muted-foreground">{framework.region}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(framework.status)}>
                        {framework.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress: {framework.completedRequirements}/{framework.requirements}</span>
                      <span className={getRiskColor(framework.riskLevel)}>
                        Risk: {framework.riskLevel}
                      </span>
                    </div>
                    <Progress value={framework.completionRate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Last assessed: {framework.lastAssessment}</span>
                      <span>Due: {framework.nextDeadline}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Regulatory Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recent Regulatory Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regulatoryUpdates.map((update) => (
                  <div key={update.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{update.title}</h4>
                        <p className="text-xs text-muted-foreground">{update.jurisdiction}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(update.status)}>
                        {update.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs">{update.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Effective: {update.effectiveDate}
                      </Badge>
                      <Badge variant={update.impactLevel === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                        {update.impactLevel} impact
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {update.affectedAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions & AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <FileCheck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium mb-1">Generate Compliance Report</h4>
                  <p className="text-xs text-muted-foreground mb-3">Create comprehensive compliance status report</p>
                  <Button size="sm" variant="outline" className="w-full">Generate</Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium mb-1">Schedule Risk Assessment</h4>
                  <p className="text-xs text-muted-foreground mb-3">Plan upcoming compliance assessments</p>
                  <Button size="sm" variant="outline" className="w-full">Schedule</Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <h4 className="font-medium mb-1">Review Critical Issues</h4>
                  <p className="text-xs text-muted-foreground mb-3">Address high-priority compliance gaps</p>
                  <Button size="sm" variant="outline" className="w-full">Review</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search compliance frameworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="apac">Asia Pacific</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Frameworks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {complianceFrameworks.map((framework) => (
              <Card key={framework.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{framework.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{framework.region}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(framework.status)}>
                      {framework.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Progress</span>
                      <span>{framework.completionRate}%</span>
                    </div>
                    <Progress value={framework.completionRate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{framework.completedRequirements} of {framework.requirements} requirements</span>
                      <span className={getRiskColor(framework.riskLevel)}>
                        {framework.riskLevel} risk
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Assessment:</span>
                    <span>{framework.lastAssessment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Deadline:</span>
                    <span className="font-medium">{framework.nextDeadline}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      <FileCheck className="h-4 w-4 mr-2" />
                      Update Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Audit Management Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditRecords.map((audit) => (
                  <div key={audit.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{audit.type}</h4>
                        <p className="text-sm text-muted-foreground">{audit.scope}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(audit.status)}>
                        {audit.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Auditor:</span>
                        <p className="font-medium">{audit.auditor}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <p className="font-medium">{audit.scheduledDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Findings:</span>
                        <p className="font-medium">{audit.findings}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Critical:</span>
                        <p className="font-medium text-red-600">{audit.criticalFindings}</p>
                      </div>
                    </div>
                    {audit.supplier && (
                      <div className="mt-2 text-sm">
                        <span className="text-muted-foreground">Supplier:</span>
                        <span className="ml-2 font-medium">{audit.supplier}</span>
                      </div>
                    )}
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">View Report</Button>
                      <Button size="sm" variant="outline">Schedule Follow-up</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulatory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Regulatory Intelligence Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Powered Regulatory Monitoring</h3>
                <p className="text-muted-foreground mb-4">
                  Continuous monitoring of global regulatory changes with impact analysis and implementation guidance.
                </p>
                <Button>Access Regulatory Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Compliance Analytics & Reporting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Compliance Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive analytics platform with predictive compliance modeling and trend analysis.
                </p>
                <Button>Launch Analytics Platform</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Compliance Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Database className="h-4 w-4 text-blue-500" />
                    Regulatory Change Detection
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI monitors 127 jurisdictions for regulatory changes, analyzing impact and providing implementation guidance.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Detection Accuracy</span>
                      <span className="font-medium">99.2%</span>
                    </div>
                    <Progress value={99} className="h-1" />
                  </div>
                  <Button size="sm" variant="outline" className="w-full">View AI Insights</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-500" />
                    Compliance Risk Prediction
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Predictive models identify potential compliance gaps and recommend preventive actions.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Prediction Accuracy</span>
                      <span className="font-medium">94.7%</span>
                    </div>
                    <Progress value={95} className="h-1" />
                  </div>
                  <Button size="sm" variant="outline" className="w-full">Access Predictions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Compliance Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Configure Compliance Parameters</h3>
                <p className="text-muted-foreground mb-4">
                  Customize notification settings, audit schedules, and compliance thresholds.
                </p>
                <Button>Access Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseComplianceDashboard;
