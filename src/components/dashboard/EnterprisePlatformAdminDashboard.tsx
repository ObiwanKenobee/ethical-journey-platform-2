
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Activity, 
  Users, 
  Globe, 
  Server, 
  Shield, 
  Database, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  HardDrive,
  Cpu,
  Network,
  Monitor,
  UserCheck,
  Lock,
  Bell,
  Wrench,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const EnterprisePlatformAdminDashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [systemStatus, setSystemStatus] = useState('operational');

  // Mock data for demonstration
  const systemMetrics = {
    totalUsers: 45782,
    activeUsers: 12456,
    systemUptime: 99.98,
    responseTime: 89,
    errorRate: 0.02,
    dataProcessed: '2.4TB',
    apiCalls: '1.2M',
    regions: 8
  };

  const regionalData = [
    { region: 'North America', users: 18500, status: 'operational', load: 72 },
    { region: 'Europe', users: 15200, status: 'operational', load: 68 },
    { region: 'Asia Pacific', users: 8900, status: 'maintenance', load: 45 },
    { region: 'Latin America', users: 2100, status: 'operational', load: 34 },
    { region: 'Africa', users: 1082, status: 'operational', load: 28 }
  ];

  const systemHealth = [
    { component: 'API Gateway', status: 'healthy', uptime: 99.99, responseTime: 45 },
    { component: 'Database Cluster', status: 'healthy', uptime: 99.97, responseTime: 12 },
    { component: 'Authentication Service', status: 'healthy', uptime: 99.95, responseTime: 38 },
    { component: 'Analytics Engine', status: 'warning', uptime: 99.87, responseTime: 156 },
    { component: 'File Storage', status: 'healthy', uptime: 99.99, responseTime: 23 },
    { component: 'Notification Service', status: 'healthy', uptime: 99.94, responseTime: 67 }
  ];

  const recentActivities = [
    { time: '2 min ago', action: 'System backup completed', type: 'success', user: 'System' },
    { time: '15 min ago', action: 'Security patch deployed to EU region', type: 'info', user: 'Admin Team' },
    { time: '1 hour ago', action: 'Performance optimization applied', type: 'success', user: 'DevOps' },
    { time: '2 hours ago', action: 'High memory usage alert resolved', type: 'warning', user: 'Monitoring' },
    { time: '4 hours ago', action: 'New compliance policy activated', type: 'info', user: 'Compliance Team' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'maintenance':
        return 'text-blue-600 bg-blue-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'maintenance':
        return <Clock className="h-4 w-4" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Platform Operations Center</h2>
          <p className="text-muted-foreground">
            Global system monitoring and platform administration
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={getStatusColor(systemStatus)}>
            {getStatusIcon(systemStatus)}
            System {systemStatus}
          </Badge>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Platform Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">
              99.5% SLA target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.responseTime}ms</div>
            <p className="text-xs text-muted-foreground">
              -15ms from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.errorRate}%</div>
            <p className="text-xs text-muted-foreground">
              Within acceptable limits
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="security">Security Center</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Regional Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Regional Operations
                </CardTitle>
                <CardDescription>
                  Global system status and regional performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {regionalData.map((region) => (
                  <div key={region.region} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={getStatusColor(region.status)}>
                        {getStatusIcon(region.status)}
                        {region.status}
                      </Badge>
                      <div>
                        <p className="font-medium">{region.region}</p>
                        <p className="text-sm text-muted-foreground">
                          {region.users.toLocaleString()} users
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{region.load}% load</p>
                      <Progress value={region.load} className="w-16 h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest system events and administrative actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${getStatusColor(activity.type)}`}>
                      {getStatusIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time} • {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance Dashboard
              </CardTitle>
              <CardDescription>
                Real-time system performance and resource utilization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm text-muted-foreground">67%</span>
                  </div>
                  <Progress value={67} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-muted-foreground">54%</span>
                  </div>
                  <Progress value={54} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                  <Progress value={78} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="h-5 w-5 mr-2" />
                System Health Monitoring
              </CardTitle>
              <CardDescription>
                Detailed health status of all system components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((component) => (
                  <div key={component.component} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className={getStatusColor(component.status)}>
                        {getStatusIcon(component.status)}
                        {component.status}
                      </Badge>
                      <div>
                        <p className="font-medium">{component.component}</p>
                        <p className="text-sm text-muted-foreground">
                          Uptime: {component.uptime}% • Response: {component.responseTime}ms
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Wrench className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  User Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between">
                    <span>Active Users (24h)</span>
                    <span className="font-medium">{systemMetrics.activeUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Registrations</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>User Retention Rate</span>
                    <span className="font-medium">87.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  User Management Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage User Accounts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Role Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Access Controls
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Security Score</span>
                  <Badge className="bg-green-100 text-green-800">98/100</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Threats</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Failed Login Attempts</span>
                  <Badge variant="outline">23</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Security Scan</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Security Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Scan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Review Access Logs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Threat Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Platform Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Database Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Network className="h-4 w-4 mr-2" />
                  Network Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Server className="h-4 w-4 mr-2" />
                  Server Management
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  Maintenance Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start">
                  <HardDrive className="h-4 w-4 mr-2" />
                  Backup Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Performance Optimization
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  System Diagnostics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterprisePlatformAdminDashboard;
