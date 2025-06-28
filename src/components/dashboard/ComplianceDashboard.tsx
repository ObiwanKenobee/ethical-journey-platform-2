
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { 
  Shield, AlertTriangle, CheckCircle2, FileCheck, 
  Users, TrendingUp, Globe, BarChart3, PieChart as PieChartIcon
} from 'lucide-react';

// Risk trend data for charts
const riskTrendData = [
  { month: 'Jan', value: 35, verified: 28 },
  { month: 'Feb', value: 28, verified: 22 },
  { month: 'Mar', value: 42, verified: 30 },
  { month: 'Apr', value: 25, verified: 25 },
  { month: 'May', value: 18, verified: 16 },
  { month: 'Jun', value: 15, verified: 14 },
  { month: 'Jul', value: 12, verified: 10 },
];

// Compliance data
const complianceData = [
  { name: 'Tier 1', value: 85, target: 90 },
  { name: 'Tier 2', value: 68, target: 80 },
  { name: 'Tier 3', value: 45, target: 70 },
];

// Risk distribution data
const riskDistributionData = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 10, color: '#ef4444' },
];

// ESG metrics data
const esgMetricsData = [
  { name: 'Environmental', score: 72, previous: 65 },
  { name: 'Social', score: 84, previous: 79 },
  { name: 'Governance', score: 68, previous: 60 },
];

// Worker reports data
const workerReportsData = [
  { month: 'Jan', reports: 5, resolved: 3 },
  { month: 'Feb', reports: 8, resolved: 7 },
  { month: 'Mar', reports: 12, resolved: 8 },
  { month: 'Apr', reports: 7, resolved: 6 },
  { month: 'May', reports: 10, resolved: 9 },
  { month: 'Jun', reports: 6, resolved: 4 },
];

// Supplier compliance data
const supplierComplianceData = [
  { name: 'Certified', value: 58, color: '#10b981' },
  { name: 'In Progress', value: 32, color: '#f59e0b' },
  { name: 'Non-Compliant', value: 10, color: '#ef4444' },
];

// Recent alerts data
const recentAlerts = [
  { id: 1, severity: 'high', message: 'Supplier XYZ labor practices report requires review', time: '2h ago', blockchain: true },
  { id: 2, severity: 'medium', message: 'ESG reporting deadline approaching for Q3', time: '5h ago', blockchain: false },
  { id: 3, severity: 'low', message: 'Worker verification update needed for Facility A', time: '1d ago', blockchain: true },
];

const ComplianceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Calculate the compliance score as an average of various metrics
  const complianceScore = 78;
  
  // Helper function to get the risk level based on score
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low', color: '#10b981' };
    if (score >= 60) return { level: 'Medium', color: '#f59e0b' };
    return { level: 'High', color: '#ef4444' };
  };

  // Get current risk level
  const riskStatus = getRiskLevel(complianceScore);

  return (
    <div className="space-y-6" ref={ref}>
      <h2 className="text-2xl font-bold">Guardian-IO Unified Compliance Dashboard</h2>
      <p className="text-muted-foreground mb-6">
        AI-powered ethical supply chain monitoring with blockchain verification and real-time ESG tracking
      </p>
      
      <div className={cn(
        "glass transition-all duration-700 p-6 rounded-2xl shadow-glass-md",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Overall Compliance</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                <span className="mr-2">{complianceScore}%</span>
                <Badge className={cn(
                  "ml-auto",
                  riskStatus.level === 'Low' ? "bg-green-100 text-green-800" :
                  riskStatus.level === 'Medium' ? "bg-amber-100 text-amber-800" :
                  "bg-red-100 text-red-800"
                )}>
                  {riskStatus.level} Risk
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={complianceScore} className="h-2" />
            </CardContent>
            <CardFooter className="pt-0 text-xs text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                <span>Blockchain Verified</span>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Supplier Verification</CardDescription>
              <CardTitle className="text-2xl">198/248</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={79} className="h-2" />
            </CardContent>
            <CardFooter className="pt-0 text-xs text-muted-foreground">
              <span>79% of suppliers verified</span>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Worker Reports</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                48 <Badge className="ml-auto bg-amber-100 text-amber-800">5 new</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs">
                <div>Resolved: 43</div>
                <div>Pending: 5</div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 text-xs text-muted-foreground">
              <span>90% resolution rate</span>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>AI Risk Assessment</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                15 <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs">
                <div>High: 3</div>
                <div>Medium: 5</div>
                <div>Low: 7</div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 text-xs text-muted-foreground">
              <span>Alerts decreased by 12% this month</span>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="risk">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              <Users className="h-4 w-4 mr-2" />
              Supplier Status
            </TabsTrigger>
            <TabsTrigger value="workers">
              <Shield className="h-4 w-4 mr-2" />
              Worker Reports
            </TabsTrigger>
            <TabsTrigger value="esg">
              <Globe className="h-4 w-4 mr-2" />
              ESG Metrics
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Compliance Trend Analysis</CardTitle>
                  <CardDescription>AI-powered risk assessment over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={riskTrendData}>
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" name="Risk Incidents" />
                      <Area type="monotone" dataKey="verified" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" name="Blockchain Verified" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View Detailed Analytics</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Current supplier risk assessment</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                  <ul className="space-y-2">
                    {recentAlerts.map(alert => (
                      <li key={alert.id} className="p-2 rounded bg-muted flex flex-col">
                        <div className="flex items-center">
                          <span className={cn(
                            "h-2 w-2 rounded-full mr-2",
                            alert.severity === 'high' ? "bg-red-500" : 
                            alert.severity === 'medium' ? "bg-amber-500" : "bg-green-500"
                          )} />
                          <span className="text-sm flex-1">{alert.message}</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{alert.time}</span>
                          {alert.blockchain && (
                            <span className="flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                              Blockchain verified
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Alerts</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <FileCheck className="h-4 w-4 mr-2 text-blue-500" />
                    Required Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Review supplier XYZ audit</span>
                      <Badge variant="outline">High</Badge>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Update Q3 ESG report</span>
                      <Badge variant="outline">Medium</Badge>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">Respond to worker report #42</span>
                      <Badge variant="outline">High</Badge>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Tasks</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    ESG Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {esgMetricsData.map(metric => (
                    <div key={metric.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{metric.name}</span>
                        <span className="font-medium">{metric.score}/100</span>
                      </div>
                      <Progress value={metric.score} className="h-2" />
                      <div className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                        <span>{metric.score - metric.previous > 0 ? '+' : ''}{metric.score - metric.previous} since last quarter</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View ESG Report</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Risk Analysis Tab */}
          <TabsContent value="risk" className="h-80">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Risk Assessment Timeline</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={riskTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" name="Risk Incidents" />
                      <Line type="monotone" dataKey="verified" stroke="#82ca9d" name="Verified & Resolved" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Level Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Supplier Status Tab */}
          <TabsContent value="suppliers" className="h-80">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Supplier Compliance Scores</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={complianceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Current Score" />
                      <Bar dataKey="target" fill="#82ca9d" name="Target Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Status</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={supplierComplianceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {supplierComplianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Worker Reports Tab */}
          <TabsContent value="workers" className="h-80">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Worker Reports Activity</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workerReportsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="reports" fill="#8884d8" name="Reports Filed" />
                      <Bar dataKey="resolved" fill="#82ca9d" name="Reports Resolved" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Report Categories</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Working Conditions', value: 45, color: '#8884d8' },
                          { name: 'Wages', value: 25, color: '#82ca9d' },
                          { name: 'Hours', value: 18, color: '#ffc658' },
                          { name: 'Safety', value: 12, color: '#ff8042' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[
                          { name: 'Working Conditions', value: 45, color: '#8884d8' },
                          { name: 'Wages', value: 25, color: '#82ca9d' },
                          { name: 'Hours', value: 18, color: '#ffc658' },
                          { name: 'Safety', value: 12, color: '#ff8042' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* ESG Metrics Tab */}
          <TabsContent value="esg" className="h-80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Metrics</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', carbon: 120, water: 40, waste: 65 },
                        { month: 'Feb', carbon: 110, water: 38, waste: 60 },
                        { month: 'Mar', carbon: 105, water: 35, waste: 55 },
                        { month: 'Apr', carbon: 95, water: 32, waste: 50 },
                        { month: 'May', carbon: 90, water: 30, waste: 45 },
                        { month: 'Jun', carbon: 85, water: 28, waste: 42 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="carbon" stroke="#8884d8" name="Carbon Emissions" />
                      <Line type="monotone" dataKey="water" stroke="#82ca9d" name="Water Usage" />
                      <Line type="monotone" dataKey="waste" stroke="#ffc658" name="Waste" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social & Governance</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: 'Worker Rights', score: 85, industry: 65 },
                        { category: 'Diversity', score: 72, industry: 60 },
                        { category: 'Community', score: 68, industry: 55 },
                        { category: 'Transparency', score: 90, industry: 62 },
                        { category: 'Ethics', score: 78, industry: 58 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#8884d8" name="Your Score" />
                      <Bar dataKey="industry" fill="#82ca9d" name="Industry Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Bottom Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-secondary/30 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Total Suppliers</p>
            <p className="text-2xl font-bold">248</p>
          </div>
          <div className="bg-secondary/30 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <FileCheck className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">Compliance Rate</p>
            <p className="text-2xl font-bold">87%</p>
          </div>
          <div className="bg-secondary/30 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-sm text-muted-foreground">Risk Level</p>
            <p className="text-2xl font-bold">Low</p>
          </div>
          <div className="bg-secondary/30 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground">Global Presence</p>
            <p className="text-2xl font-bold">32 Countries</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-center mt-8 gap-4">
          <Button className="bg-primary text-white">
            Generate AI Compliance Report
          </Button>
          <Button variant="outline">
            View Supplier Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
