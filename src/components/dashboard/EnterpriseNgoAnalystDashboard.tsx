
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
  Users, 
  Globe,
  MessageSquare,
  Eye,
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  Heart,
  Scale,
  Camera,
  MapPin,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Zap,
  Database,
  BarChart3,
  Award,
  Target,
  Megaphone,
  BookOpen,
  Gavel,
  Lock,
  Unlock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HumanRightsCase {
  id: string;
  title: string;
  caseType: 'forced_labor' | 'child_labor' | 'discrimination' | 'wage_theft' | 'unsafe_conditions' | 'freedom_of_association';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'investigating' | 'verified' | 'resolved' | 'escalated' | 'pending_review';
  region: string;
  workersAffected: number;
  reportedDate: string;
  lastUpdate: string;
  assignedInvestigator: string;
  evidenceCount: number;
  anonymous: boolean;
  priority: number;
}

interface WorkerProtectionAlert {
  id: string;
  alertType: 'safety_violation' | 'rights_abuse' | 'policy_violation' | 'emergency';
  facility: string;
  location: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  workersAtRisk: number;
  detectedAt: string;
  aiConfidence: number;
  status: 'active' | 'investigating' | 'resolved';
  description: string;
}

interface AdvocacyCampaign {
  id: string;
  name: string;
  campaignType: 'policy_change' | 'corporate_accountability' | 'awareness' | 'legal_action';
  targetEntity: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  participantCount: number;
  goalReached: boolean;
  impact: string;
  budget: number;
  currentFunding: number;
}

interface InvestigationReport {
  id: string;
  title: string;
  investigationType: 'field_investigation' | 'document_review' | 'witness_interview' | 'facility_audit';
  leadInvestigator: string;
  status: 'draft' | 'under_review' | 'published' | 'confidential';
  completionDate?: string;
  findings: string[];
  recommendations: string[];
  evidenceCount: number;
  confidentialityLevel: 'public' | 'restricted' | 'confidential';
}

const EnterpriseNgoAnalystDashboard = () => {
  const [activeView, setActiveView] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const { toast } = useToast();

  // Mock data for human rights cases
  const humanRightsCases: HumanRightsCase[] = [
    {
      id: 'HR-2024-089',
      title: 'Forced Labor in Textile Manufacturing - Southeast Asia',
      caseType: 'forced_labor',
      severity: 'critical',
      status: 'investigating',
      region: 'Southeast Asia',
      workersAffected: 247,
      reportedDate: '2024-01-15',
      lastUpdate: '2 hours ago',
      assignedInvestigator: 'Sarah Chen',
      evidenceCount: 23,
      anonymous: true,
      priority: 1
    },
    {
      id: 'HR-2024-088',
      title: 'Child Labor in Agricultural Supply Chain - West Africa',
      caseType: 'child_labor',
      severity: 'critical',
      status: 'verified',
      region: 'West Africa',
      workersAffected: 89,
      reportedDate: '2024-01-12',
      lastUpdate: '1 day ago',
      assignedInvestigator: 'Marcus Thompson',
      evidenceCount: 31,
      anonymous: false,
      priority: 1
    },
    {
      id: 'HR-2024-087',
      title: 'Wage Theft and Overtime Violations - Latin America',
      caseType: 'wage_theft',
      severity: 'high',
      status: 'resolved',
      region: 'Latin America',
      workersAffected: 156,
      reportedDate: '2024-01-08',
      lastUpdate: '3 days ago',
      assignedInvestigator: 'Elena Rodriguez',
      evidenceCount: 18,
      anonymous: true,
      priority: 2
    }
  ];

  // Mock worker protection alerts
  const workerProtectionAlerts: WorkerProtectionAlert[] = [
    {
      id: 'WPA-2024-156',
      alertType: 'safety_violation',
      facility: 'Global Manufacturing Co - Factory 7',
      location: 'Bangladesh',
      riskLevel: 'critical',
      workersAtRisk: 340,
      detectedAt: '2024-01-15 14:30',
      aiConfidence: 94,
      status: 'active',
      description: 'Fire safety violations detected: blocked emergency exits, faulty alarm systems'
    },
    {
      id: 'WPA-2024-155',
      alertType: 'rights_abuse',
      facility: 'Mega Corp Processing Center',
      location: 'Vietnam',
      riskLevel: 'high',
      workersAtRisk: 128,
      detectedAt: '2024-01-15 09:15',
      aiConfidence: 87,
      status: 'investigating',
      description: 'Reports of excessive overtime and restricted movement of workers'
    }
  ];

  // Mock advocacy campaigns
  const advocacyCampaigns: AdvocacyCampaign[] = [
    {
      id: 'AC-2024-12',
      name: 'Corporate Accountability for Supply Chain Transparency',
      campaignType: 'corporate_accountability',
      targetEntity: 'Fortune 500 Retailers',
      status: 'active',
      startDate: '2024-01-01',
      participantCount: 12847,
      goalReached: false,
      impact: 'Policy changes at 3 major corporations',
      budget: 250000,
      currentFunding: 187500
    },
    {
      id: 'AC-2024-11',
      name: 'Legislative Reform for Worker Protection',
      campaignType: 'policy_change',
      targetEntity: 'EU Parliament',
      status: 'completed',
      startDate: '2023-09-01',
      endDate: '2024-01-10',
      participantCount: 28934,
      goalReached: true,
      impact: 'New legislation passed strengthening worker rights',
      budget: 400000,
      currentFunding: 400000
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'investigating':
      case 'active':
      case 'under_review':
        return 'default';
      case 'verified':
      case 'resolved':
      case 'completed':
        return 'secondary';
      case 'escalated':
      case 'critical':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleExportReport = () => {
    toast({
      title: "Report Export Initiated",
      description: "Human rights investigation report is being generated for download.",
    });
  };

  const handleLaunchCampaign = () => {
    toast({
      title: "Campaign Launched",
      description: "New advocacy campaign has been initiated and stakeholders notified.",
    });
  };

  // Calculate overview metrics
  const overviewMetrics = {
    activeCases: humanRightsCases.filter(c => c.status === 'investigating').length,
    criticalAlerts: workerProtectionAlerts.filter(a => a.riskLevel === 'critical').length,
    workersProtected: humanRightsCases.reduce((sum, c) => sum + c.workersAffected, 0),
    activeCampaigns: advocacyCampaigns.filter(c => c.status === 'active').length,
    aiAccuracy: 94.7,
    globalReach: 127
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Human Rights Intelligence Center</h2>
          <p className="text-muted-foreground">Global human rights monitoring, investigation, and advocacy platform</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleLaunchCampaign}>
            <Megaphone className="h-4 w-4 mr-2" />
            Launch Campaign
          </Button>
          <Button size="sm">
            <Zap className="h-4 w-4 mr-2" />
            AI Assistant
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
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workers Protected</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.workersProtected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Megaphone className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">Advocacy initiatives</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Detection Accuracy</CardTitle>
            <Database className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.aiAccuracy}%</div>
            <p className="text-xs text-muted-foreground">Violation detection</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Reach</CardTitle>
            <Globe className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.globalReach}</div>
            <p className="text-xs text-muted-foreground">Countries monitored</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="protection">Protection</TabsTrigger>
          <TabsTrigger value="advocacy">Advocacy</TabsTrigger>
          <TabsTrigger value="investigations">Investigations</TabsTrigger>
          <TabsTrigger value="ai-intelligence">AI Intelligence</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Human Rights Cases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Active Human Rights Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {humanRightsCases.slice(0, 3).map((hrCase) => (
                  <div key={hrCase.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{hrCase.title}</h4>
                        <p className="text-xs text-muted-foreground">{hrCase.region} • {hrCase.workersAffected} workers affected</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(hrCase.status)}>
                        {hrCase.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Case ID: {hrCase.id}</span>
                      <span className={getSeverityColor(hrCase.severity)}>
                        {hrCase.severity} priority
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Assigned: {hrCase.assignedInvestigator}</span>
                      <span>Updated: {hrCase.lastUpdate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Case
                      </Button>
                      <Button size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Worker Protection Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Real-time Protection Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workerProtectionAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{alert.facility}</h4>
                        <p className="text-xs text-muted-foreground">{alert.location}</p>
                      </div>
                      <Badge variant={alert.riskLevel === 'critical' ? 'destructive' : 'default'}>
                        {alert.riskLevel}
                      </Badge>
                    </div>
                    <p className="text-xs">{alert.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {alert.workersAtRisk} workers at risk
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        AI: {alert.aiConfidence}% confidence
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Investigate
                      </Button>
                      <Button size="sm" className="flex-1">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Deploy Response
                      </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium mb-1">Anonymous Report Portal</h4>
                  <p className="text-xs text-muted-foreground mb-3">Secure whistleblower reporting system</p>
                  <Button size="sm" variant="outline" className="w-full">Access Portal</Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Search className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium mb-1">Investigation Tools</h4>
                  <p className="text-xs text-muted-foreground mb-3">Digital evidence collection and analysis</p>
                  <Button size="sm" variant="outline" className="w-full">Launch Tools</Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Megaphone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-medium mb-1">Campaign Builder</h4>
                  <p className="text-xs text-muted-foreground mb-3">Create advocacy campaigns</p>
                  <Button size="sm" variant="outline" className="w-full">Start Campaign</Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h4 className="font-medium mb-1">Impact Analytics</h4>
                  <p className="text-xs text-muted-foreground mb-3">Measure advocacy effectiveness</p>
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
                placeholder="Search human rights cases..."
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
                <SelectItem value="asia">Asia Pacific</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
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
              More Filters
            </Button>
          </div>

          {/* Cases Grid */}
          <div className="space-y-4">
            {humanRightsCases.map((hrCase) => (
              <Card key={hrCase.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{hrCase.title}</h3>
                        <Badge variant={getStatusBadgeVariant(hrCase.status)}>
                          {hrCase.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant={hrCase.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {hrCase.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Case ID: {hrCase.id}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Region:</span>
                          <p className="font-medium">{hrCase.region}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Workers Affected:</span>
                          <p className="font-medium">{hrCase.workersAffected}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reported:</span>
                          <p className="font-medium">{hrCase.reportedDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Evidence Items:</span>
                          <p className="font-medium">{hrCase.evidenceCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Assigned: {hrCase.assignedInvestigator}</span>
                      <span>Updated: {hrCase.lastUpdate}</span>
                      {hrCase.anonymous && (
                        <Badge variant="outline" className="text-xs">
                          <Lock className="h-3 w-3 mr-1" />
                          Anonymous
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">Update Case</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="protection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Worker Protection Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Powered Worker Protection</h3>
                <p className="text-muted-foreground mb-4">
                  Real-time monitoring and early warning system for worker rights violations.
                </p>
                <Button>Access Protection Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advocacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Advocacy Campaign Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {advocacyCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{campaign.name}</h4>
                      <p className="text-sm text-muted-foreground">{campaign.targetEntity}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Participants:</span>
                      <p className="font-medium">{campaign.participantCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Start Date:</span>
                      <p className="font-medium">{campaign.startDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Impact:</span>
                      <p className="font-medium">{campaign.impact}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>{Math.round((campaign.currentFunding / campaign.budget) * 100)}%</span>
                    </div>
                    <Progress value={(campaign.currentFunding / campaign.budget) * 100} className="h-2" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">View Campaign</Button>
                    <Button size="sm">Update Progress</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Investigation Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Digital Investigation Suite</h3>
                <p className="text-muted-foreground mb-4">
                  Secure evidence management, witness protection, and collaborative investigation tools.
                </p>
                <Button>Launch Investigation Tools</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-intelligence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                AI Human Rights Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Violation Detection Engine
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI analyzes patterns across global supply chains to detect potential human rights violations.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Detection Accuracy</span>
                      <span className="font-medium">94.7%</span>
                    </div>
                    <Progress value={95} className="h-1" />
                  </div>
                  <Button size="sm" variant="outline" className="w-full">View Detection Results</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-500" />
                    Predictive Risk Assessment
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Machine learning models predict high-risk areas and facilities for proactive intervention.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Prediction Accuracy</span>
                      <span className="font-medium">91.3%</span>
                    </div>
                    <Progress value={91} className="h-1" />
                  </div>
                  <Button size="sm" variant="outline" className="w-full">Access Risk Models</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Impact Reporting & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-lg font-bold">Impact Reports</div>
                  <p className="text-sm text-muted-foreground">Comprehensive impact analysis</p>
                  <Button size="sm" className="mt-2" variant="outline">Generate Report</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Camera className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-lg font-bold">Evidence Documentation</div>
                  <p className="text-sm text-muted-foreground">Secure evidence management</p>
                  <Button size="sm" className="mt-2" variant="outline">View Evidence</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Award className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-lg font-bold">Success Stories</div>
                  <p className="text-sm text-muted-foreground">Advocacy achievements</p>
                  <Button size="sm" className="mt-2" variant="outline">View Stories</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseNgoAnalystDashboard;
