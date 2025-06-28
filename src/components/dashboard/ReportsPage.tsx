
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, BarChart2, PieChart, TrendingUp, Calendar, Filter, Plus, Share2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [timeframe, setTimeframe] = useState('month');
  const { toast } = useToast();

  const handleDownload = (reportType: string) => {
    toast({
      title: "Report Download Started",
      description: `Your ${reportType} report is being prepared for download.`,
    });
    // In a real app, this would trigger the actual download
  };

  const handleGenerateReport = () => {
    toast({
      title: "New Report Generated",
      description: "Your custom report has been generated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track performance, compliance, and market impact</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Impact</span>
          </TabsTrigger>
          <TabsTrigger value="sustainability" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            <span className="hidden sm:inline">Sustainability</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Custom</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReportCard 
              title="Supplier Performance" 
              description="Analysis of supplier compliance and risk levels"
              status="Updated 2 days ago"
              icon={<BarChart2 className="w-12 h-12 text-primary" />}
              onDownload={() => handleDownload('Supplier Performance')}
            />
            <ReportCard 
              title="Risk Assessment" 
              description="Detailed risk analysis across regions and categories"
              status="Updated yesterday"
              icon={<PieChart className="w-12 h-12 text-amber-500" />}
              onDownload={() => handleDownload('Risk Assessment')}
            />
            <ReportCard 
              title="Market Growth" 
              description="Quarterly market growth and opportunities"
              status="Updated 5 days ago"
              icon={<TrendingUp className="w-12 h-12 text-green-500" />}
              onDownload={() => handleDownload('Market Growth')}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Key metrics for the selected time period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive Analytics Dashboard Charts Will Appear Here</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard title="Total Suppliers" value="124" change="+12%" positive />
                <MetricCard title="Risk Score" value="24" change="-8%" positive />
                <MetricCard title="Compliance Rate" value="92%" change="+3%" positive />
                <MetricCard title="Market Share" value="14.2%" change="-0.5%" positive={false} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleDownload('Analytics Overview')}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReportCard 
              title="Compliance Summary" 
              description="Overall compliance status and key findings"
              status="Updated yesterday"
              icon={<FileText className="w-12 h-12 text-primary" />}
              onDownload={() => handleDownload('Compliance Summary')}
            />
            <ReportCard 
              title="Regulation Tracker" 
              description="Updates on regulatory changes and impacts"
              status="Updated 3 days ago"
              icon={<FileText className="w-12 h-12 text-amber-500" />}
              onDownload={() => handleDownload('Regulation Tracker')}
            />
            <ReportCard 
              title="Audit Results" 
              description="Findings from recent supplier audits"
              status="Updated 1 week ago"
              icon={<FileText className="w-12 h-12 text-green-500" />}
              onDownload={() => handleDownload('Audit Results')}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
              <CardDescription>Compliance status by category and region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Compliance Charts and Status Will Appear Here</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recent Compliance Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Supplier ABC Certification</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Quarterly Compliance Report</span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Environmental Audit</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Compliance by Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>North America</span>
                        <span className="font-medium">96%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Europe</span>
                        <span className="font-medium">94%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Asia Pacific</span>
                        <span className="font-medium">87%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Latin America</span>
                        <span className="font-medium">82%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleDownload('Compliance Overview')}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="default">
                Schedule Audit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReportCard 
              title="Social Impact" 
              description="Analysis of social impact initiatives and outcomes"
              status="Updated last week"
              icon={<TrendingUp className="w-12 h-12 text-primary" />}
              onDownload={() => handleDownload('Social Impact')}
            />
            <ReportCard 
              title="Environmental Metrics" 
              description="Carbon footprint and sustainability measures"
              status="Updated 2 weeks ago"
              icon={<TrendingUp className="w-12 h-12 text-green-500" />}
              onDownload={() => handleDownload('Environmental Metrics')}
            />
            <ReportCard 
              title="Governance Report" 
              description="Overview of governance structures and improvements"
              status="Updated last month"
              icon={<TrendingUp className="w-12 h-12 text-blue-500" />}
              onDownload={() => handleDownload('Governance Report')}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
              <CardDescription>Key ESG metrics and improvement trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Impact Visualization Charts Will Appear Here</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <MetricCard title="Communities Supported" value="47" change="+5" positive />
                <MetricCard title="Carbon Reduction" value="28%" change="+6%" positive />
                <MetricCard title="Worker Welfare Score" value="87/100" change="+4" positive />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleDownload('Impact Assessment')}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="default">
                Set New Targets
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReportCard 
              title="Carbon Footprint" 
              description="Detailed carbon emissions analysis"
              status="Updated 2 days ago"
              icon={<PieChart className="w-12 h-12 text-green-500" />}
              onDownload={() => handleDownload('Carbon Footprint')}
            />
            <ReportCard 
              title="Resource Utilization" 
              description="Water, energy and materials consumption"
              status="Updated last week"
              icon={<PieChart className="w-12 h-12 text-blue-500" />}
              onDownload={() => handleDownload('Resource Utilization')}
            />
            <ReportCard 
              title="Waste Management" 
              description="Waste reduction and recycling metrics"
              status="Updated 3 days ago"
              icon={<PieChart className="w-12 h-12 text-amber-500" />}
              onDownload={() => handleDownload('Waste Management')}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Dashboard</CardTitle>
              <CardDescription>Progress towards sustainability goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Sustainability Charts Will Appear Here</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Sustainability Objectives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Carbon Neutral by 2030</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">On Track</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Zero Waste to Landfill</span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">At Risk</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>100% Renewable Energy</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">On Track</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Top Performing Suppliers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>EcoSolutions Inc</span>
                        <span className="font-medium">98/100</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Green Manufacturing Co</span>
                        <span className="font-medium">95/100</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Sustainable Logistics Ltd</span>
                        <span className="font-medium">93/100</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleDownload('Sustainability Dashboard')}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="default">
                Update Goals
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create a tailored report with the metrics you need</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Report Type</h3>
                    <Select defaultValue="analytics">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="impact">Impact</SelectItem>
                        <SelectItem value="sustainability">Sustainability</SelectItem>
                        <SelectItem value="combined">Combined Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Time Period</h3>
                    <Select defaultValue="quarter">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Report Format</h3>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Select Metrics</h3>
                  <div className="border rounded-md p-4 h-[200px] overflow-y-auto">
                    <div className="space-y-2">
                      <MetricCheckbox id="supplier_performance" label="Supplier Performance" />
                      <MetricCheckbox id="risk_levels" label="Risk Levels by Region" />
                      <MetricCheckbox id="compliance_rate" label="Compliance Rate" />
                      <MetricCheckbox id="certifications" label="Certification Status" />
                      <MetricCheckbox id="carbon_footprint" label="Carbon Footprint" />
                      <MetricCheckbox id="labor_practices" label="Labor Practices" />
                      <MetricCheckbox id="water_usage" label="Water Usage" />
                      <MetricCheckbox id="waste_management" label="Waste Management" />
                      <MetricCheckbox id="governance" label="Governance Scores" />
                      <MetricCheckbox id="community_impact" label="Community Impact" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                Save Template
              </Button>
              <Button variant="default" onClick={handleGenerateReport}>
                Generate Report
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Report Templates</CardTitle>
                <CardDescription>Your custom report configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                    <span>Quarterly Executive Summary</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownload('Quarterly Executive Summary')}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                  <li className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                    <span>Sustainability Dashboard</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownload('Sustainability Dashboard')}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                  <li className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                    <span>Compliance Audit Preparation</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownload('Compliance Audit Preparation')}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Reports you've generated recently</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Q2 Impact Analysis</p>
                      <p className="text-xs text-muted-foreground">Generated 2 days ago</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload('Q2 Impact Analysis')}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </li>
                  <li className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Monthly Compliance Update</p>
                      <p className="text-xs text-muted-foreground">Generated 1 week ago</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload('Monthly Compliance Update')}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </li>
                  <li className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Supplier Risk Assessment</p>
                      <p className="text-xs text-muted-foreground">Generated 2 weeks ago</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload('Supplier Risk Assessment')}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for report cards
const ReportCard = ({ 
  title, 
  description, 
  status, 
  icon, 
  onDownload 
}: { 
  title: string;
  description: string;
  status: string;
  icon: React.ReactNode;
  onDownload: () => void;
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          {icon}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{status}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper component for metric cards
const MetricCard = ({ 
  title, 
  value, 
  change, 
  positive 
}: { 
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) => {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className={`text-xs mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </div>
  );
};

// Helper component for metric checkboxes
const MetricCheckbox = ({ 
  id, 
  label 
}: { 
  id: string;
  label: string;
}) => {
  return (
    <div className="flex items-center">
      <input 
        type="checkbox"
        id={id}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label htmlFor={id} className="ml-2 text-sm">{label}</label>
    </div>
  );
};

export default ReportsPage;
