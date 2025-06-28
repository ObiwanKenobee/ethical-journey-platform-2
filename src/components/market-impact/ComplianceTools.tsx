
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileCheck, Download, Bell, Shield, Calendar, Filter, CheckCircle2, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const ComplianceTools = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <div ref={ref} className="space-y-8">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-2">Compliance & ESG Reporting Tools</h2>
        <p className="text-muted-foreground mb-8">
          Guardian-IO's platform provides comprehensive tools for managing all aspects of supply chain compliance,
          from automated reporting to real-time risk monitoring.
        </p>
        
        <Tabs defaultValue="reports">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Automated ESG Reporting</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Risk Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Blockchain Verification</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="space-y-6">
            <ESGReportingTab inView={inView} />
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <RiskAlertsTab inView={inView} />
          </TabsContent>
          
          <TabsContent value="verification" className="space-y-6">
            <BlockchainVerificationTab inView={inView} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="glass-card">
        <h3 className="text-xl font-semibold mb-4">Key Compliance Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={cn(
            "transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileCheck className="h-5 w-5 text-primary" />
                  One-Click Compliance Reports
                </CardTitle>
                <CardDescription>
                  Generate comprehensive ESG and compliance reports for regulators, 
                  investors, and stakeholders with a single click.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Support for major ESG frameworks (GRI, SASB, TCFD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Modern Slavery Act compliance documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Customizable metrics and KPIs for various stakeholders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Historical data tracking and trend analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className={cn(
            "transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )} style={{ transitionDelay: inView ? '100ms' : '0ms' }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-primary" />
                  Real-Time Risk Monitoring
                </CardTitle>
                <CardDescription>
                  Receive instant alerts about emerging risks in your supply chain,
                  from labor violations to geopolitical instability.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>AI-powered risk detection models specific to your industry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Geographic risk mapping and monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Custom alert thresholds and notification preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Integration with crisis management workflows</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ESG Reporting Tab Content
const ESGReportingTab = ({ inView }: { inView: boolean }) => {
  const [reportType, setReportType] = useState<string>("modern-slavery");
  
  const reportTypes = [
    { id: "modern-slavery", label: "Modern Slavery", icon: Shield },
    { id: "environmental", label: "Environmental Impact", icon: FileCheck },
    { id: "social", label: "Social Responsibility", icon: FileText },
  ];
  
  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        {reportTypes.map((type) => (
          <Button
            key={type.id}
            variant={reportType === type.id ? 'default' : 'outline'}
            onClick={() => setReportType(type.id)}
            className="flex items-center gap-2"
          >
            <type.icon className="h-4 w-4" />
            {type.label}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card className={cn(
            "transform transition-all duration-700",
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Report Preview</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
              <CardDescription>
                {reportType === "modern-slavery" ? "Modern Slavery Act Compliance Report" : 
                 reportType === "environmental" ? "Environmental Impact Assessment" : 
                 "Social Responsibility Report"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 h-[350px] bg-muted/20 overflow-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      {reportType === "modern-slavery" ? "Modern Slavery Statement" : 
                       reportType === "environmental" ? "Environmental Impact Report" : 
                       "Social Impact Assessment"}
                    </h3>
                    <Badge variant="outline">Draft</Badge>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      This report provides a comprehensive assessment of our supply chain's 
                      {reportType === "modern-slavery" ? " compliance with modern slavery regulations and human rights standards." : 
                       reportType === "environmental" ? " environmental impact and sustainability metrics." : 
                       " social responsibility and community engagement initiatives."}
                    </p>
                    
                    <h4 className="font-medium mt-4">Executive Summary</h4>
                    <p className="text-muted-foreground">
                      Our organization is committed to ensuring
                      {reportType === "modern-slavery" ? " ethical labor practices throughout our entire supply chain. This report outlines the steps we have taken to identify, prevent, and mitigate modern slavery risks." : 
                       reportType === "environmental" ? " sustainable operations with minimal environmental impact. This report details our carbon footprint, resource usage, and sustainability initiatives." : 
                       " positive social impact in communities where we operate. This report highlights our community programs, labor practices, and stakeholder engagement."}
                    </p>
                    
                    <h4 className="font-medium mt-4">Key Metrics</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>YoY Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportType === "modern-slavery" ? (
                          <>
                            <TableRow>
                              <TableCell>Suppliers Audited</TableCell>
                              <TableCell>98%</TableCell>
                              <TableCell className="text-green-500">↑ 12%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>High-Risk Suppliers</TableCell>
                              <TableCell>4.2%</TableCell>
                              <TableCell className="text-green-500">↓ 8%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Remediation Cases</TableCell>
                              <TableCell>12</TableCell>
                              <TableCell className="text-amber-500">↑ 2</TableCell>
                            </TableRow>
                          </>
                        ) : reportType === "environmental" ? (
                          <>
                            <TableRow>
                              <TableCell>Carbon Footprint</TableCell>
                              <TableCell>12,450 tCO₂e</TableCell>
                              <TableCell className="text-green-500">↓ 15%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Water Usage</TableCell>
                              <TableCell>245,000 m³</TableCell>
                              <TableCell className="text-green-500">↓ 8%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Renewable Energy</TableCell>
                              <TableCell>42%</TableCell>
                              <TableCell className="text-green-500">↑ 12%</TableCell>
                            </TableRow>
                          </>
                        ) : (
                          <>
                            <TableRow>
                              <TableCell>Fair Wage Compliance</TableCell>
                              <TableCell>97%</TableCell>
                              <TableCell className="text-green-500">↑ 5%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Community Investment</TableCell>
                              <TableCell>$1.2M</TableCell>
                              <TableCell className="text-green-500">↑ 20%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Worker Satisfaction</TableCell>
                              <TableCell>85%</TableCell>
                              <TableCell className="text-green-500">↑ 7%</TableCell>
                            </TableRow>
                          </>
                        )}
                      </TableBody>
                    </Table>
                    
                    {/* More report content would be here */}
                    <div className="h-[100px]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground">
                Last generated: Yesterday at 14:32
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button size="sm">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className={cn(
            "transform transition-all duration-700",
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
              <CardDescription>
                Customize your report parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Include Risk Analysis</div>
                    <div className="text-xs text-muted-foreground">AI-powered risk assessment</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Blockchain Verification</div>
                    <div className="text-xs text-muted-foreground">Immutable proof of authenticity</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Include Recommendations</div>
                    <div className="text-xs text-muted-foreground">AI-generated improvement areas</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Executive Summary</div>
                    <div className="text-xs text-muted-foreground">Condensed overview of findings</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Benchmark Comparison</div>
                    <div className="text-xs text-muted-foreground">Compare against industry standards</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Schedule Recurring Reports</div>
                    <div className="text-xs text-muted-foreground">Automate report generation</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">Monthly</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

// Risk Alerts Tab Content
const RiskAlertsTab = ({ inView }: { inView: boolean }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={cn(
        "space-y-4 transform transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <Card>
          <CardHeader>
            <CardTitle>Risk Alert Configuration</CardTitle>
            <CardDescription>
              Customize your risk monitoring preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="font-medium text-sm">Labor Rights Violations</div>
                  <div className="text-xs text-muted-foreground">Monitor for potential exploitation</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="font-medium text-sm">Geopolitical Instability</div>
                  <div className="text-xs text-muted-foreground">Regional conflicts and trade restrictions</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="font-medium text-sm">Environmental Compliance</div>
                  <div className="text-xs text-muted-foreground">Emissions and waste management issues</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="font-medium text-sm">Financial Instability</div>
                  <div className="text-xs text-muted-foreground">Supplier financial health monitoring</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="font-medium text-sm">Regulatory Changes</div>
                  <div className="text-xs text-muted-foreground">New compliance requirements</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alert Delivery Methods</CardTitle>
            <CardDescription>
              Choose how you want to receive alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">Email Notifications</div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">Mobile App Alerts</div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">SMS for Critical Alerts</div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">Dashboard Notifications</div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">API Webhooks</div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className={cn(
        "transform transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )} style={{ transitionDelay: inView ? '100ms' : '0ms' }}>
        <Card className="h-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Sample Risk Alerts</CardTitle>
              <Badge variant="outline">Demo Data</Badge>
            </div>
            <CardDescription>
              Examples of AI-generated risk alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30">
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm flex items-center">
                      Critical: Forced Labor Risk Detected
                      <Badge variant="destructive" className="ml-2 text-xs">High</Badge>
                    </h4>
                    <p className="text-xs mt-1 text-muted-foreground">
                      Unusual production patterns detected at textile supplier in Southeast Asia. 
                      AI analysis indicates potential forced labor risk based on output vs. 
                      workforce ratio anomalies.
                    </p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/30">
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm flex items-center">
                      Warning: Regional Instability
                      <Badge variant="outline" className="ml-2 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-900/50">Medium</Badge>
                    </h4>
                    <p className="text-xs mt-1 text-muted-foreground">
                      Political unrest increasing in region with 3 active suppliers. 
                      Travel restrictions and logistics disruptions likely in next 30 days.
                      Contingency planning recommended.
                    </p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30">
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm flex items-center">
                      Regulatory Update
                      <Badge variant="outline" className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-900/50">Info</Badge>
                    </h4>
                    <p className="text-xs mt-1 text-muted-foreground">
                      New environmental reporting requirements enacted in EU. 
                      All suppliers must comply by Q2 2024. Guardian-IO will update 
                      reporting templates automatically.
                    </p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm flex items-center">
                      Audit Verification Complete
                      <Badge variant="outline" className="ml-2 text-xs">Resolved</Badge>
                    </h4>
                    <p className="text-xs mt-1 text-muted-foreground">
                      Third-party audit for Supplier XYZ completed and blockchain verified.
                      All compliance requirements met with 92% score. Certification valid for 12 months.
                    </p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">3 days ago</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              View All Alerts
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Blockchain Verification Tab Content
const BlockchainVerificationTab = ({ inView }: { inView: boolean }) => {
  return (
    <div className="space-y-6">
      <div className={cn(
        "transform transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Verification System</CardTitle>
            <CardDescription>
              Guardian-IO uses blockchain technology to create immutable records of all supply chain data, 
              ensuring transparency and preventing fraudulent reporting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card flex flex-col items-center text-center p-4">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium mb-1">Tamper-Proof Records</h3>
                  <p className="text-xs text-muted-foreground">
                    All audit reports and compliance data are cryptographically secured
                    and cannot be altered retroactively.
                  </p>
                </div>
                
                <div className="glass-card flex flex-col items-center text-center p-4">
                  <FileCheck className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium mb-1">Verification Layer</h3>
                  <p className="text-xs text-muted-foreground">
                    Each document receives a unique hash stored on the blockchain
                    that proves authenticity and timestamp.
                  </p>
                </div>
                
                <div className="glass-card flex flex-col items-center text-center p-4">
                  <Bell className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium mb-1">Regulatory Compliance</h3>
                  <p className="text-xs text-muted-foreground">
                    Blockchain verification satisfies regulatory requirements for 
                    data integrity and audit trails.
                  </p>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Verification Method</TableHead>
                    <TableHead>Stakeholder Access</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Supplier Audits</TableCell>
                    <TableCell>Multi-signature verification</TableCell>
                    <TableCell>Regulators, Brands, Suppliers</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ESG Reports</TableCell>
                    <TableCell>Smart contract verification</TableCell>
                    <TableCell>Public, Investors, Regulators</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Worker Voice Data</TableCell>
                    <TableCell>Zero-knowledge proof</TableCell>
                    <TableCell>Brands, Auditors</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sustainability Claims</TableCell>
                    <TableCell>Chainlink oracle verification</TableCell>
                    <TableCell>Consumers, Brands, Certifiers</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className={cn(
        "transform transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )} style={{ transitionDelay: inView ? '100ms' : '0ms' }}>
        <Card>
          <CardHeader>
            <CardTitle>Verification Process</CardTitle>
            <CardDescription>
              How Guardian-IO ensures data integrity through blockchain verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Process timeline visualization */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="pl-12 relative">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    1
                  </div>
                  <h4 className="font-medium mb-1">Data Submission</h4>
                  <p className="text-sm text-muted-foreground">
                    Audit reports, certifications, and compliance data are submitted through 
                    the Guardian-IO platform by approved stakeholders.
                  </p>
                </div>
                
                <div className="pl-12 relative">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-primary-foreground">
                    2
                  </div>
                  <h4 className="font-medium mb-1">AI-Powered Validation</h4>
                  <p className="text-sm text-muted-foreground">
                    Guardian-IO's AI engine checks the data for inconsistencies, potential 
                    fraud patterns, and compliance with regulatory standards.
                  </p>
                </div>
                
                <div className="pl-12 relative">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/60 flex items-center justify-center text-primary-foreground">
                    3
                  </div>
                  <h4 className="font-medium mb-1">Cryptographic Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Each document receives a cryptographic hash that uniquely identifies it and 
                    serves as a digital fingerprint that cannot be forged.
                  </p>
                </div>
                
                <div className="pl-12 relative">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/40 flex items-center justify-center text-primary-foreground">
                    4
                  </div>
                  <h4 className="font-medium mb-1">Blockchain Registration</h4>
                  <p className="text-sm text-muted-foreground">
                    The document hash is registered on the blockchain with a timestamp, creating 
                    an immutable record that can be verified by any authorized party.
                  </p>
                </div>
                
                <div className="pl-12 relative">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground">
                    5
                  </div>
                  <h4 className="font-medium mb-1">Verification Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Stakeholders can verify any document's authenticity by comparing its 
                    hash to the blockchain record, ensuring data hasn't been altered.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Verify Document
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceTools;
