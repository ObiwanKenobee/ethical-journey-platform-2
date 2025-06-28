
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  AlertTriangle, 
  Users, 
  Globe, 
  MessageSquare,
  TrendingDown,
  Shield,
  Eye,
  FileText,
  BarChart3,
  Map,
  Camera
} from 'lucide-react';

const NgoDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const impactMetrics = [
    { 
      label: "Active Cases", 
      value: "47", 
      change: "+3", 
      icon: FileText,
      color: "text-blue-600" 
    },
    { 
      label: "Workers Protected", 
      value: "2,847", 
      change: "+127", 
      icon: Shield,
      color: "text-green-600" 
    },
    { 
      label: "Critical Alerts", 
      value: "8", 
      change: "-2", 
      icon: AlertTriangle,
      color: "text-red-600" 
    },
    { 
      label: "Facilities Monitored", 
      value: "234", 
      change: "+15", 
      icon: Eye,
      color: "text-purple-600" 
    }
  ];

  const activeInvestigations = [
    {
      id: "INV-2024-007",
      title: "Forced Labor Investigation - Textile Facility",
      region: "Southeast Asia",
      severity: "Critical",
      status: "Active",
      workersAffected: 247,
      lastUpdate: "2 hours ago"
    },
    {
      id: "INV-2024-006", 
      title: "Child Labor Report - Agricultural Sector",
      region: "West Africa",
      severity: "High",
      status: "Under Review",
      workersAffected: 89,
      lastUpdate: "1 day ago"
    },
    {
      id: "INV-2024-005",
      title: "Wage Theft Documentation - Manufacturing",
      region: "Latin America", 
      severity: "Medium",
      status: "Evidence Collection",
      workersAffected: 156,
      lastUpdate: "3 days ago"
    }
  ];

  const whistleblowerReports = [
    {
      id: "WB-2024-089",
      type: "Labor Conditions",
      region: "Eastern Europe",
      severity: "High",
      status: "Verified",
      anonymous: true,
      submitted: "Today"
    },
    {
      id: "WB-2024-088",
      type: "Safety Violations", 
      region: "South Asia",
      severity: "Critical",
      status: "Under Investigation",
      anonymous: true,
      submitted: "Yesterday"
    },
    {
      id: "WB-2024-087",
      type: "Discrimination",
      region: "North America",
      severity: "Medium", 
      status: "Closed",
      anonymous: false,
      submitted: "3 days ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Impact Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{metric.change}</span> this month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investigations">Investigations</TabsTrigger>
          <TabsTrigger value="whistleblower">Whistleblower</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="advocacy">Advocacy</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Active Investigations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeInvestigations.slice(0, 3).map((investigation, index) => (
                  <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={investigation.severity === 'Critical' ? 'destructive' : investigation.severity === 'High' ? 'default' : 'secondary'}>
                          {investigation.severity}
                        </Badge>
                        <span className="font-medium text-sm">{investigation.id}</span>
                      </div>
                      <p className="text-sm font-medium mb-1">{investigation.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {investigation.region} • {investigation.workersAffected} workers affected
                      </p>
                    </div>
                    <Button size="sm" variant="outline">View Case</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Whistleblower Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {whistleblowerReports.slice(0, 3).map((report, index) => (
                  <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={report.severity === 'Critical' ? 'destructive' : report.severity === 'High' ? 'default' : 'secondary'}>
                          {report.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{report.id}</span>
                      </div>
                      <p className="text-sm font-medium">{report.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.region} • {report.anonymous ? 'Anonymous' : 'Identified'} • {report.submitted}
                      </p>
                    </div>
                    <Badge variant="outline">{report.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Impact Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
                  <div className="text-2xl font-bold">2.4M</div>
                  <p className="text-sm text-muted-foreground">Lives Impacted</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">567</div>
                  <p className="text-sm text-muted-foreground">Cases Resolved</p>
                </div>
                <div className="text-center">
                  <Map className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-sm text-muted-foreground">Countries Covered</p>
                </div>
                <div className="text-center">
                  <TrendingDown className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <div className="text-2xl font-bold">23%</div>
                  <p className="text-sm text-muted-foreground">Violations Reduced</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investigation Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Comprehensive Case Management</h3>
                <p className="text-muted-foreground mb-4">
                  Track, document, and collaborate on human rights investigations with secure evidence management.
                </p>
                <Button>Access Investigation Center</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whistleblower" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Whistleblower Protection Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure Reporting Platform</h3>
                <p className="text-muted-foreground mb-4">
                  Encrypted, anonymous reporting system with advanced source protection and case tracking.
                </p>
                <Button>View Reporting Portal</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Impact Measurement Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cases Successfully Resolved</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Worker Rights Improvements</span>
                      <span>74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Facility Compliance</span>
                      <span>91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Recent Victories</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 247 workers freed from forced labor conditions</li>
                      <li>• $1.2M in back wages recovered</li>
                      <li>• 12 facilities improved safety standards</li>
                      <li>• 5 new worker protection policies enacted</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advocacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advocacy & Campaign Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Digital Advocacy Tools</h3>
                <p className="text-muted-foreground mb-4">
                  Organize campaigns, mobilize supporters, and track policy impact with integrated advocacy tools.
                </p>
                <Button>Launch Campaign</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Impact Reporting Suite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-lg font-bold">Annual Reports</div>
                  <p className="text-sm text-muted-foreground">Comprehensive impact analysis</p>
                  <Button size="sm" className="mt-2" variant="outline">Generate Report</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Camera className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-lg font-bold">Photo Stories</div>
                  <p className="text-sm text-muted-foreground">Visual impact documentation</p>
                  <Button size="sm" className="mt-2" variant="outline">View Gallery</Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Globe className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-lg font-bold">Global Updates</div>
                  <p className="text-sm text-muted-foreground">Worldwide progress tracking</p>
                  <Button size="sm" className="mt-2" variant="outline">View Updates</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NgoDashboard;
