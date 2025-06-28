
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Gavel, 
  Shield, 
  Building, 
  Globe, 
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Scale
} from 'lucide-react';

const GovernmentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const regulatoryMetrics = [
    { 
      label: "Compliance Rate", 
      value: "87%", 
      change: "+4%", 
      icon: Shield,
      color: "text-green-600" 
    },
    { 
      label: "Active Investigations", 
      value: "23", 
      change: "+2", 
      icon: FileText,
      color: "text-blue-600" 
    },
    { 
      label: "Policy Updates", 
      value: "7", 
      change: "+3", 
      icon: Gavel,
      color: "text-purple-600" 
    },
    { 
      label: "Registered Entities", 
      value: "4,567", 
      change: "+89", 
      icon: Building,
      color: "text-orange-600" 
    }
  ];

  const activeEnforcement = [
    {
      case: "ENV-2024-007",
      company: "Industrial Corp Ltd",
      violation: "Environmental Standards Breach",
      severity: "Critical",
      status: "Under Investigation",
      deadline: "2024-02-15"
    },
    {
      case: "LAB-2024-012",
      company: "Global Manufacturing Inc",
      violation: "Labor Rights Violation",
      severity: "High",
      status: "Sanctions Pending",
      deadline: "2024-02-20"
    },
    {
      case: "COR-2024-003",
      company: "Supply Chain Solutions",
      violation: "Transparency Reporting Failure",
      severity: "Medium",
      status: "Compliance Review",
      deadline: "2024-03-01"
    }
  ];

  const policyUpdates = [
    {
      title: "Enhanced Supply Chain Transparency Requirements",
      type: "Regulation",
      status: "Active",
      effectiveDate: "2024-03-01",
      affectedEntities: 1247
    },
    {
      title: "Modern Slavery Reporting Standards v2.1",
      type: "Amendment",
      status: "Pending Approval",
      effectiveDate: "2024-04-15",
      affectedEntities: 892
    },
    {
      title: "Environmental Impact Assessment Guidelines",
      type: "Guidance",
      status: "Published",
      effectiveDate: "2024-02-01",
      affectedEntities: 567
    }
  ];

  return (
    <div className="space-y-6">
      {/* Regulatory Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {regulatoryMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{metric.change}</span> from last quarter
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Active Enforcement Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeEnforcement.map((enforcement, index) => (
                  <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={enforcement.severity === 'Critical' ? 'destructive' : enforcement.severity === 'High' ? 'default' : 'secondary'}>
                          {enforcement.severity}
                        </Badge>
                        <span className="font-medium text-sm">{enforcement.case}</span>
                      </div>
                      <p className="text-sm font-medium mb-1">{enforcement.company}</p>
                      <p className="text-xs text-muted-foreground">{enforcement.violation}</p>
                      <p className="text-xs text-muted-foreground">Deadline: {enforcement.deadline}</p>
                    </div>
                    <Badge variant="outline">{enforcement.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Recent Policy Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {policyUpdates.map((policy, index) => (
                  <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={policy.type === 'Regulation' ? 'default' : policy.type === 'Amendment' ? 'secondary' : 'outline'}>
                          {policy.type}
                        </Badge>
                        <span className="font-medium text-sm">{policy.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Effective: {policy.effectiveDate} • Affects {policy.affectedEntities} entities
                      </p>
                    </div>
                    <Badge variant={policy.status === 'Active' ? 'default' : policy.status === 'Published' ? 'secondary' : 'outline'}>
                      {policy.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Regulatory Performance Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Compliance Metrics</h4>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Labor Standards</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Environmental</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Supply Chain</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Enforcement Efficiency</h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <p className="text-sm text-muted-foreground">Cases Resolved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <p className="text-sm text-muted-foreground">Days Avg Resolution</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Global Impact</h4>
                  <div className="text-center">
                    <Scale className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <div className="text-lg font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">Companies Regulated</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <div className="text-lg font-bold">2.4M</div>
                    <p className="text-sm text-muted-foreground">Workers Protected</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enforcement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enforcement Operations Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Comprehensive Enforcement Tools</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced case management, investigation tracking, and penalty enforcement systems.
                </p>
                <Button>Access Enforcement Center</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Policy Development Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Gavel className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Smart Policy Making</h3>
                <p className="text-muted-foreground mb-4">
                  AI-assisted policy development, impact assessment, and stakeholder consultation tools.
                </p>
                <Button>View Policy Tools</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Monitoring System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Real-time Compliance Tracking</h3>
                <p className="text-muted-foreground mb-4">
                  Automated monitoring, risk assessment, and early warning systems for regulatory compliance.
                </p>
                <Button>View Compliance Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Analytics Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-lg font-bold">Trend Analysis</div>
                  <p className="text-sm text-muted-foreground">Compliance trend forecasting</p>
                  <Button size="sm" className="mt-2" variant="outline">View Trends</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-lg font-bold">Impact Reports</div>
                  <p className="text-sm text-muted-foreground">Policy effectiveness analysis</p>
                  <Button size="sm" className="mt-2" variant="outline">Generate Report</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <div className="text-lg font-bold">Risk Assessment</div>
                  <p className="text-sm text-muted-foreground">Predictive compliance modeling</p>
                  <Button size="sm" className="mt-2" variant="outline">View Risks</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="international" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>International Cooperation Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Cross-Border Regulatory Coordination</h3>
                <p className="text-muted-foreground mb-4">
                  Collaborate with international partners on global supply chain governance and standards.
                </p>
                <Button>Access International Portal</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GovernmentDashboard;
