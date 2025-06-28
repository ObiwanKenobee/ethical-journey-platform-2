
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Gavel, 
  Building, 
  Globe, 
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Scale,
  Search,
  Filter,
  Download,
  Calendar,
  MessageSquare,
  Eye,
  UserCheck,
  Settings,
  Target,
  Zap,
  Database,
  Award,
  BookOpen,
  Megaphone,
  Lock,
  Unlock,
  Activity,
  MapPin,
  Camera,
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegulatoryCase {
  id: string;
  title: string;
  caseType: 'policy_violation' | 'compliance_breach' | 'safety_violation' | 'environmental_breach' | 'labor_violation';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'investigating' | 'enforcement_pending' | 'sanctions_applied' | 'resolved' | 'appealing';
  entity: string;
  jurisdiction: string;
  reportedDate: string;
  lastUpdate: string;
  assignedOfficer: string;
  evidenceCount: number;
  penaltyAmount?: number;
  priority: number;
}

interface PolicyFramework {
  id: string;
  name: string;
  type: 'regulation' | 'directive' | 'standard' | 'guideline';
  status: 'active' | 'under_review' | 'draft' | 'archived';
  effectiveDate: string;
  lastUpdated: string;
  affectedEntities: number;
  complianceRate: number;
  jurisdictions: string[];
  internationalAlignment: boolean;
}

interface EnforcementAction {
  id: string;
  actionType: 'warning' | 'fine' | 'suspension' | 'revocation' | 'criminal_referral';
  targetEntity: string;
  violation: string;
  severity: 'minor' | 'major' | 'severe' | 'critical';
  status: 'planned' | 'in_progress' | 'completed' | 'under_appeal';
  initiatedDate: string;
  completionDate?: string;
  penaltyAmount?: number;
  responsibleOfficer: string;
  appealDeadline?: string;
}

interface InternationalCoordination {
  id: string;
  initiative: string;
  coordinatingBody: string;
  participatingCountries: string[];
  status: 'active' | 'planning' | 'completed' | 'suspended';
  startDate: string;
  nextMeeting?: string;
  harmonizationLevel: number;
  sharedStandards: string[];
  coordinationOfficer: string;
}

const EnterpriseGovernmentDashboard = () => {
  const [activeView, setActiveView] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const { toast } = useToast();

  // Mock data for regulatory cases
  const regulatoryCases: RegulatoryCase[] = [
    {
      id: 'REG-2024-089',
      title: 'Supply Chain Transparency Violations - Global Manufacturing Inc',
      caseType: 'compliance_breach',
      severity: 'critical',
      status: 'enforcement_pending',
      entity: 'Global Manufacturing Inc',
      jurisdiction: 'Federal',
      reportedDate: '2024-01-15',
      lastUpdate: '2 hours ago',
      assignedOfficer: 'Director Sarah Williams',
      evidenceCount: 47,
      penaltyAmount: 2500000,
      priority: 1
    },
    {
      id: 'REG-2024-088',
      title: 'Environmental Impact Assessment Non-Compliance - Tech Industries',
      caseType: 'environmental_breach',
      severity: 'high',
      status: 'investigating',
      entity: 'Tech Industries Ltd',
      jurisdiction: 'State',
      reportedDate: '2024-01-12',
      lastUpdate: '1 day ago',
      assignedOfficer: 'Inspector Michael Chen',
      evidenceCount: 23,
      penaltyAmount: 750000,
      priority: 2
    },
    {
      id: 'REG-2024-087',
      title: 'Labor Standards Violation - Textile Corporation',
      caseType: 'labor_violation',
      severity: 'critical',
      status: 'sanctions_applied',
      entity: 'Textile Corporation LLC',
      jurisdiction: 'Federal',
      reportedDate: '2024-01-08',
      lastUpdate: '3 days ago',
      assignedOfficer: 'Chief Investigator Lisa Park',
      evidenceCount: 61,
      penaltyAmount: 4200000,
      priority: 1
    }
  ];

  // Mock policy frameworks
  const policyFrameworks: PolicyFramework[] = [
    {
      id: 'PF-2024-12',
      name: 'Corporate Supply Chain Due Diligence Act',
      type: 'regulation',
      status: 'active',
      effectiveDate: '2024-01-01',
      lastUpdated: '2024-01-15',
      affectedEntities: 2847,
      complianceRate: 87,
      jurisdictions: ['Federal', 'State'],
      internationalAlignment: true
    },
    {
      id: 'PF-2024-11',
      name: 'Environmental Impact Reporting Standards v3.0',
      type: 'standard',
      status: 'under_review',
      effectiveDate: '2024-03-01',
      lastUpdated: '2024-01-14',
      affectedEntities: 1523,
      complianceRate: 0,
      jurisdictions: ['Federal'],
      internationalAlignment: true
    },
    {
      id: 'PF-2024-10',
      name: 'Modern Slavery Prevention Guidelines',
      type: 'guideline',
      status: 'active',
      effectiveDate: '2023-12-01',
      lastUpdated: '2024-01-10',
      affectedEntities: 3641,
      complianceRate: 92,
      jurisdictions: ['Federal', 'State', 'Local'],
      internationalAlignment: true
    }
  ];

  // Mock enforcement actions
  const enforcementActions: EnforcementAction[] = [
    {
      id: 'EA-2024-234',
      actionType: 'fine',
      targetEntity: 'Global Manufacturing Inc',
      violation: 'Supply chain transparency failure',
      severity: 'critical',
      status: 'in_progress',
      initiatedDate: '2024-01-15',
      penaltyAmount: 2500000,
      responsibleOfficer: 'Director Sarah Williams',
      appealDeadline: '2024-02-15'
    },
    {
      id: 'EA-2024-233',
      actionType: 'suspension',
      targetEntity: 'Industrial Solutions Corp',
      violation: 'Environmental compliance breach',
      severity: 'severe',
      status: 'completed',
      initiatedDate: '2024-01-10',
      completionDate: '2024-01-14',
      responsibleOfficer: 'Chief Regulator Mark Thompson'
    }
  ];

  // Mock international coordination
  const internationalCoordination: InternationalCoordination[] = [
    {
      id: 'IC-2024-08',
      initiative: 'Global Supply Chain Standards Harmonization',
      coordinatingBody: 'International Trade Standards Organization',
      participatingCountries: ['USA', 'EU', 'Canada', 'Australia', 'Japan'],
      status: 'active',
      startDate: '2024-01-01',
      nextMeeting: '2024-02-15',
      harmonizationLevel: 78,
      sharedStandards: ['Due Diligence', 'Environmental Impact', 'Labor Rights'],
      coordinationOfficer: 'Director International Affairs'
    },
    {
      id: 'IC-2024-07',
      initiative: 'Cross-Border Enforcement Cooperation Protocol',
      coordinatingBody: 'Multi-National Regulatory Alliance',
      participatingCountries: ['USA', 'UK', 'Germany', 'France'],
      status: 'planning',
      startDate: '2024-03-01',
      nextMeeting: '2024-02-20',
      harmonizationLevel: 45,
      sharedStandards: ['Enforcement Procedures', 'Evidence Sharing'],
      coordinationOfficer: 'Deputy Director Cross-Border Operations'
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'investigating':
      case 'in_progress':
      case 'active':
      case 'planning':
        return 'default';
      case 'enforcement_pending':
      case 'under_review':
      case 'draft':
        return 'secondary';
      case 'sanctions_applied':
      case 'completed':
      case 'resolved':
        return 'outline';
      case 'appealing':
      case 'under_appeal':
      case 'suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
      case 'minor': return 'text-green-600';
      case 'medium':
      case 'major': return 'text-yellow-600';
      case 'high':
      case 'severe': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleExportReport = () => {
    toast({
      title: "Regulatory Report Export Initiated",
      description: "Comprehensive regulatory oversight report is being generated for download.",
    });
  };

  const handleInitiateEnforcement = () => {
    toast({
      title: "Enforcement Action Initiated",
      description: "New enforcement action has been started and relevant parties notified.",
    });
  };

  const handlePolicyUpdate = () => {
    toast({
      title: "Policy Development Initiated",
      description: "New policy development process has been started with stakeholder consultation.",
    });
  };

  // Calculate overview metrics
  const overviewMetrics = {
    activeCases: regulatoryCases.filter(c => c.status === 'investigating' || c.status === 'enforcement_pending').length,
    criticalViolations: regulatoryCases.filter(c => c.severity === 'critical').length,
    totalPenalties: regulatoryCases.reduce((sum, c) => sum + (c.penaltyAmount || 0), 0),
    activeFrameworks: policyFrameworks.filter(f => f.status === 'active').length,
    complianceRate: Math.round(policyFrameworks.reduce((sum, f) => sum + f.complianceRate, 0) / policyFrameworks.length),
    internationalInitiatives: internationalCoordination.filter(i => i.status === 'active').length
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Regulatory Enforcement Command Center</h2>
          <p className="text-muted-foreground">Enterprise-level regulatory oversight, policy enforcement, and international coordination</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleInitiateEnforcement}>
            <Gavel className="h-4 w-4 mr-2" />
            Initiate Enforcement
          </Button>
          <Button size="sm" onClick={handlePolicyUpdate}>
            <FileText className="h-4 w-4 mr-2" />
            Policy Development
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.activeCases}</div>
            <p className="text-xs text-muted-foreground">Under investigation</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.criticalViolations}</div>
            <p className="text-xs text-muted-foreground">Requiring immediate action</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penalties</CardTitle>
            <Scale className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(overviewMetrics.totalPenalties / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Frameworks</CardTitle>
            <Gavel className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.activeFrameworks}</div>
            <p className="text-xs text-muted-foreground">Policy frameworks</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.complianceRate}%</div>
            <p className="text-xs text-muted-foreground">Average across frameworks</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">International Initiatives</CardTitle>
            <Globe className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.internationalInitiatives}</div>
            <p className="text-xs text-muted-foreground">Active coordination</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Regulatory Cases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Active Regulatory Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regulatoryCases.slice(0, 3).map((regCase) => (
                  <div key={regCase.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{regCase.title}</h4>
                        <p className="text-xs text-muted-foreground">{regCase.entity} • {regCase.jurisdiction}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(regCase.status)}>
                        {regCase.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Case ID: {regCase.id}</span>
                      <span className={getSeverityColor(regCase.severity)}>
                        {regCase.severity} severity
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Officer: {regCase.assignedOfficer}</span>
                      <span>Updated: {regCase.lastUpdate}</span>
                    </div>
                    {regCase.penaltyAmount && (
                      <div className="text-xs">
                        <span className="font-medium">Penalty: ${regCase.penaltyAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Review Case
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Gavel className="h-4 w-4 mr-2" />
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Policy Frameworks Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Policy Framework Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {policyFrameworks.map((framework) => (
                  <div key={framework.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{framework.name}</h4>
                        <p className="text-xs text-muted-foreground">{framework.affectedEntities} entities affected</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(framework.status)}>
                        {framework.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Effective:</span>
                        <p className="font-medium">{framework.effectiveDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Compliance Rate:</span>
                        <p className="font-medium">{framework.complianceRate}%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Compliance Progress</span>
                        <span>{framework.complianceRate}%</span>
                      </div>
                      <Progress value={framework.complianceRate} className="h-2" />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                      <Button size="sm" className="flex-1">Update Framework</Button>
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
                Regulatory Command Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <h4 className="font-medium mb-1">Emergency Response</h4>
                  <p className="text-xs text-muted-foreground mb-3">Immediate enforcement actions</p>
                  <Button size="sm" variant="outline" className="w-full">Activate Response</Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium mb-1">Policy Development</h4>
                  <p className="text-xs text-muted-foreground mb-3">Create new regulations</p>
                  <Button size="sm" variant="outline" className="w-full">Start Development</Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium mb-1">International Coordination</h4>
                  <p className="text-xs text-muted-foreground mb-3">Cross-border collaboration</p>
                  <Button size="sm" variant="outline" className="w-full">Join Initiative</Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-medium mb-1">Analytics Dashboard</h4>
                  <p className="text-xs text-muted-foreground mb-3">Regulatory insights</p>
                  <Button size="sm" variant="outline" className="w-full">View Analytics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search regulatory cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="federal">Federal</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Cases Grid */}
          <div className="space-y-4">
            {regulatoryCases.map((regCase) => (
              <Card key={regCase.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{regCase.title}</h3>
                        <Badge variant={getStatusBadgeVariant(regCase.status)}>
                          {regCase.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant={regCase.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {regCase.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Case ID: {regCase.id}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Entity:</span>
                          <p className="font-medium">{regCase.entity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Jurisdiction:</span>
                          <p className="font-medium">{regCase.jurisdiction}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reported:</span>
                          <p className="font-medium">{regCase.reportedDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Evidence Items:</span>
                          <p className="font-medium">{regCase.evidenceCount}</p>
                        </div>
                      </div>
                      {regCase.penaltyAmount && (
                        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm">
                          <span className="text-red-700 dark:text-red-300 font-medium">
                            Proposed Penalty: ${regCase.penaltyAmount.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Officer: {regCase.assignedOfficer}</span>
                      <span>Updated: {regCase.lastUpdate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review Evidence</Button>
                      <Button size="sm">Initiate Enforcement</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enforcement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Enforcement Action Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {enforcementActions.map((action) => (
                <div key={action.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{action.actionType.replace('_', ' ')}</h4>
                        <Badge variant={getStatusBadgeVariant(action.status)}>
                          {action.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant={action.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {action.severity}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{action.targetEntity}</p>
                      <p className="text-xs text-muted-foreground">{action.violation}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Initiated:</span>
                      <p className="font-medium">{action.initiatedDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Officer:</span>
                      <p className="font-medium">{action.responsibleOfficer}</p>
                    </div>
                    {action.penaltyAmount && (
                      <div>
                        <span className="text-muted-foreground">Penalty:</span>
                        <p className="font-medium">${action.penaltyAmount.toLocaleString()}</p>
                      </div>
                    )}
                    {action.appealDeadline && (
                      <div>
                        <span className="text-muted-foreground">Appeal Deadline:</span>
                        <p className="font-medium">{action.appealDeadline}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Update Status</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Policy Development & Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Assisted Policy Development</h3>
                <p className="text-muted-foreground mb-4">
                  Intelligent policy drafting, stakeholder consultation management, and impact assessment tools.
                </p>
                <Button onClick={handlePolicyUpdate}>Launch Policy Development Suite</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Compliance Monitoring Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Real-time Compliance Monitoring</h3>
                <p className="text-muted-foreground mb-4">
                  Automated compliance tracking, risk assessment, and early warning systems across all regulatory frameworks.
                </p>
                <Button>Access Compliance Center</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="international" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                International Standards Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {internationalCoordination.map((initiative) => (
                <div key={initiative.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{initiative.initiative}</h4>
                      <p className="text-sm text-muted-foreground">{initiative.coordinatingBody}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(initiative.status)}>
                      {initiative.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Countries:</span>
                      <p className="font-medium">{initiative.participatingCountries.length}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Start Date:</span>
                      <p className="font-medium">{initiative.startDate}</p>
                    </div>
                    {initiative.nextMeeting && (
                      <div>
                        <span className="text-muted-foreground">Next Meeting:</span>
                        <p className="font-medium">{initiative.nextMeeting}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Harmonization Progress</span>
                      <span>{initiative.harmonizationLevel}%</span>
                    </div>
                    <Progress value={initiative.harmonizationLevel} className="h-2" />
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {initiative.sharedStandards.map((standard, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Join Initiative</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Regulatory Analytics & Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-lg font-bold">Enforcement Trends</div>
                  <p className="text-sm text-muted-foreground">Pattern analysis and forecasting</p>
                  <Button size="sm" className="mt-2" variant="outline">View Trends</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Database className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-lg font-bold">Compliance Intelligence</div>
                  <p className="text-sm text-muted-foreground">AI-powered compliance insights</p>
                  <Button size="sm" className="mt-2" variant="outline">Access Intelligence</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-lg font-bold">Impact Assessment</div>
                  <p className="text-sm text-muted-foreground">Policy effectiveness analysis</p>
                  <Button size="sm" className="mt-2" variant="outline">Generate Assessment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseGovernmentDashboard;
