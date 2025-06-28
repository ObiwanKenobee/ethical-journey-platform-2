
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileCheck, 
  AlertTriangle, 
  Shield, 
  Clock, 
  BookOpen,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const ComplianceDashboardView = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const complianceMetrics = [
    { 
      label: "Overall Compliance", 
      value: "94%", 
      change: "+2%", 
      icon: Shield,
      color: "text-green-600" 
    },
    { 
      label: "Pending Reviews", 
      value: "23", 
      change: "-5", 
      icon: Clock,
      color: "text-yellow-600" 
    },
    { 
      label: "Critical Issues", 
      value: "3", 
      change: "-2", 
      icon: AlertTriangle,
      color: "text-red-600" 
    },
    { 
      label: "Certifications", 
      value: "147", 
      change: "+12", 
      icon: FileCheck,
      color: "text-blue-600" 
    }
  ];

  const regulatoryUpdates = [
    {
      title: "EU Corporate Sustainability Reporting Directive",
      type: "Critical",
      deadline: "2024-03-15",
      status: "In Progress"
    },
    {
      title: "California Transparency in Supply Chains Act Update",
      type: "Important",
      deadline: "2024-04-01", 
      status: "Pending Review"
    },
    {
      title: "Modern Slavery Act Compliance Report",
      type: "Standard",
      deadline: "2024-05-30",
      status: "Completed"
    }
  ];

  const auditResults = [
    { supplier: "Global Textiles Inc.", score: 94, status: "Passed", lastAudit: "2024-01-15" },
    { supplier: "Pacific Manufacturing", score: 87, status: "Passed", lastAudit: "2024-01-10" },
    { supplier: "Eastern Apparel Co.", score: 72, status: "Conditional", lastAudit: "2024-01-08" },
    { supplier: "Continental Fabrics", score: 56, status: "Failed", lastAudit: "2024-01-05" },
  ];

  return (
    <div className="space-y-6">
      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{metric.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Regulatory Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regulatoryUpdates.map((update, index) => (
                  <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={update.type === 'Critical' ? 'destructive' : update.type === 'Important' ? 'default' : 'secondary'}>
                          {update.type}
                        </Badge>
                        <span className="font-medium text-sm">{update.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Due: {update.deadline}</p>
                    </div>
                    <Badge variant="outline">{update.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Compliance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Labor Standards</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Environmental</span>
                      <span>91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Anti-Corruption</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Data Protection</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Audit Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Supplier</th>
                      <th className="text-left p-2">Score</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Last Audit</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditResults.map((result, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{result.supplier}</td>
                        <td className="p-2">
                          <span className={`font-semibold ${result.score >= 90 ? 'text-green-600' : result.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {result.score}%
                          </span>
                        </td>
                        <td className="p-2">
                          <Badge variant={result.status === 'Passed' ? 'default' : result.status === 'Conditional' ? 'secondary' : 'destructive'}>
                            {result.status === 'Passed' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {result.status === 'Conditional' && <AlertCircle className="h-3 w-3 mr-1" />}
                            {result.status === 'Failed' && <XCircle className="h-3 w-3 mr-1" />}
                            {result.status}
                          </Badge>
                        </td>
                        <td className="p-2 text-sm text-muted-foreground">{result.lastAudit}</td>
                        <td className="p-2">
                          <Button size="sm" variant="outline">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Management Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Comprehensive Audit Tracking</h3>
                <p className="text-muted-foreground mb-4">
                  Schedule, track, and analyze supplier audits with automated compliance scoring.
                </p>
                <Button>Access Audit Center</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Stay Ahead of Regulations</h3>
                <p className="text-muted-foreground mb-4">
                  AI-powered regulatory monitoring keeps you informed of changing compliance requirements.
                </p>
                <Button>View Regulatory Updates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Proactive Risk Management</h3>
                <p className="text-muted-foreground mb-4">
                  Identify and mitigate compliance risks before they become critical issues.
                </p>
                <Button>View Risk Analysis</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reporting Suite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <FileCheck className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-lg font-bold">ESG Reports</div>
                  <p className="text-sm text-muted-foreground">Automated sustainability reporting</p>
                  <Button size="sm" className="mt-2" variant="outline">Generate Report</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Shield className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-lg font-bold">Audit Reports</div>
                  <p className="text-sm text-muted-foreground">Comprehensive audit summaries</p>
                  <Button size="sm" className="mt-2" variant="outline">View Reports</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Globe className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-lg font-bold">Global Compliance</div>
                  <p className="text-sm text-muted-foreground">Multi-jurisdiction tracking</p>
                  <Button size="sm" className="mt-2" variant="outline">View Status</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceDashboardView;
