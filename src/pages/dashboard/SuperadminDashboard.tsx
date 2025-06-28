
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Building, 
  Globe, 
  TrendingUp, 
  Shield, 
  Database, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SuperadminDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    const { error } = await logoutUser();
    
    if (error) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate('/login');
  };

  const systemMetrics = [
    { label: "Active Users", value: "12,847", change: "+14%", icon: Users },
    { label: "Organizations", value: "3,421", change: "+8%", icon: Building },
    { label: "Global Suppliers", value: "45,692", change: "+23%", icon: Globe },
    { label: "Platform Revenue", value: "$2.4M", change: "+31%", icon: DollarSign },
  ];

  const systemHealth = [
    { service: "API Gateway", status: "healthy", uptime: "99.99%" },
    { service: "AI Intelligence", status: "healthy", uptime: "99.97%" },
    { service: "Blockchain Network", status: "warning", uptime: "99.85%" },
    { service: "Worker Protection", status: "healthy", uptime: "99.99%" },
    { service: "Enterprise Hub", status: "healthy", uptime: "99.98%" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Platform Administrator</h1>
          <p className="text-muted-foreground">Guardian-IO Global Operations Control</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-green-500/10 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            All Systems Operational
          </Badge>
          <span className="text-muted-foreground">
            Welcome, {profile?.name || 'Administrator'}
          </span>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-green-600 mt-1">{metric.change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      {service.status === 'healthy' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="font-medium">{service.service}</span>
                    </div>
                    <div className="text-right">
                      <Badge variant={service.status === 'healthy' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{service.uptime} uptime</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Global Activity Feed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 border-l-2 border-blue-500">
                    <Activity className="h-4 w-4 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">New AI Risk Detection Deployed</p>
                      <p className="text-xs text-muted-foreground">Enhanced forced labor detection in Southeast Asia</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 border-l-2 border-green-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Blockchain Verification Completed</p>
                      <p className="text-xs text-muted-foreground">1,247 new worker certificates verified</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 border-l-2 border-yellow-500">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">High-Risk Supplier Alert</p>
                      <p className="text-xs text-muted-foreground">Textile manufacturer flagged for investigation</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">8,423</div>
                  <p className="text-sm text-muted-foreground">Business Users</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">2,156</div>
                  <p className="text-sm text-muted-foreground">Compliance Officers</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">1,234</div>
                  <p className="text-sm text-muted-foreground">NGO Analysts</p>
                </div>
              </div>
              <Button>Manage User Roles</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>API Response Time</span>
                      <span>245ms avg</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Database Performance</span>
                      <span>98.7%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>67%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "67%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>54%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "54%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">247%</div>
                  <p className="text-muted-foreground">Year-over-year growth</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Global Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Workers Protected</span>
                    <span className="font-semibold">2.4M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suppliers Verified</span>
                    <span className="font-semibold">45K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Countries Covered</span>
                    <span className="font-semibold">127</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">AI Model Configuration</Button>
              <Button variant="outline">Blockchain Network Settings</Button>
              <Button variant="outline">Enterprise API Management</Button>
              <Button variant="outline">Global Compliance Rules</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperadminDashboard;
