
import React, { useState } from 'react';
import { Shield, AlertTriangle, Check, Users, Globe, MapPin, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';
import ImpactMetricsMap from './ImpactMetricsMap';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Sample data
const monthlyComplianceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 75 },
  { month: 'May', score: 79 },
  { month: 'Jun', score: 82 },
  { month: 'Jul', score: 85 },
  { month: 'Aug', score: 87 },
  { month: 'Sep', score: 90 },
  { month: 'Oct', score: 92 },
  { month: 'Nov', score: 93 },
  { month: 'Dec', score: 95 },
];

const riskResolutionData = [
  { name: 'Identified', value: 324 },
  { name: 'In Progress', value: 45 },
  { name: 'Resolved', value: 279 },
];

const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

const GlobalImpactDashboard = () => {
  const [mapView, setMapView] = useState<'global' | 'region' | 'industry'>('global');
  
  return (
    <div className="space-y-8">
      <div className="glass-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Global Impact Dashboard</h2>
            <p className="text-muted-foreground">Real-time visualization of ethical supply chain data</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Tabs defaultValue="global" className="w-full">
              <TabsList>
                <TabsTrigger value="global" onClick={() => setMapView('global')}>Global View</TabsTrigger>
                <TabsTrigger value="region" onClick={() => setMapView('region')}>By Region</TabsTrigger>
                <TabsTrigger value="industry" onClick={() => setMapView('industry')}>By Industry</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="h-[400px] relative mb-8 bg-muted/20 rounded-lg overflow-hidden border border-border">
          <ImpactMetricsMap view={mapView} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Suppliers Verified" 
            value="4,829" 
            change="+12%" 
            positive 
            icon={Shield}
          />
          <MetricCard 
            title="Ethical Audits" 
            value="9,254" 
            change="+8%" 
            positive 
            icon={Check}
          />
          <MetricCard 
            title="Risks Identified" 
            value="324" 
            change="-5%" 
            positive={false} 
            icon={AlertTriangle}
          />
          <MetricCard 
            title="Worker Reports" 
            value="1,782" 
            change="+23%" 
            positive 
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Score Trend</CardTitle>
              <CardDescription>Monthly average across all suppliers</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer 
                config={{
                  score: { color: "#0ea5e9" }
                }}
              >
                <AreaChart data={monthlyComplianceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                    }
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#0ea5e9" 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern Slavery Risk Resolution</CardTitle>
              <CardDescription>Cases identified, in progress, and resolved</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer 
                config={{
                  Identified: { color: "#0088FE" },
                  "In Progress": { color: "#FF8042" },
                  Resolved: { color: "#00C49F" },
                }}
              >
                <PieChart>
                  <Pie
                    data={riskResolutionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {riskResolutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                      />
                    }
                  />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="text-xl font-semibold mb-4">Regional Compliance Overview</h3>
        <div className="grid grid-cols-1 gap-4">
          <RegionalCompliance region="North America" score={92} riskLevel="Low" />
          <RegionalCompliance region="Europe" score={94} riskLevel="Low" />
          <RegionalCompliance region="Asia Pacific" score={78} riskLevel="Medium" />
          <RegionalCompliance region="Latin America" score={81} riskLevel="Medium" />
          <RegionalCompliance region="Africa" score={68} riskLevel="High" />
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ 
  title, 
  value, 
  change, 
  positive, 
  icon: Icon 
}: { 
  title: string; 
  value: string;
  change: string;
  positive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2">
          <Badge variant={positive ? "default" : "destructive"} className="text-xs">
            {change} {positive ? "↑" : "↓"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// Regional Compliance Component
const RegionalCompliance = ({ 
  region, 
  score, 
  riskLevel 
}: { 
  region: string; 
  score: number;
  riskLevel: "Low" | "Medium" | "High";
}) => {
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "Low": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "High": return "bg-red-500";
      default: return "bg-primary";
    }
  };
  
  return (
    <div className="flex items-center p-4 rounded-lg border border-border bg-card">
      <div className="w-1/4">
        <p className="font-medium">{region}</p>
      </div>
      <div className="w-1/2 px-4">
        <Progress value={score} className="h-2" />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Score: {score}%</span>
          <span className="text-xs font-medium">{score >= 90 ? 'Excellent' : score >= 80 ? 'Good' : score >= 70 ? 'Fair' : 'Needs Improvement'}</span>
        </div>
      </div>
      <div className="w-1/4 text-right">
        <Badge className={`${getRiskColor(riskLevel)} text-white`}>
          {riskLevel} Risk
        </Badge>
      </div>
    </div>
  );
};

export default GlobalImpactDashboard;
