
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Zap, 
  Link2, 
  Settings, 
  Key, 
  Webhook,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Download,
  Upload,
  Play,
  Pause,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { 
  enterpriseIntegrationService,
  Integration,
  APIEndpoint,
  APIKey,
  WebhookEndpoint
} from '@/services/enterprise-integration.service';
import { toast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

const EnterpriseIntegrationHub = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [apiEndpoints, setApiEndpoints] = useState<APIEndpoint[]>([]);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntegrationData();
  }, []);

  const fetchIntegrationData = async () => {
    try {
      setLoading(true);
      const [integrationsData, endpointsData, keysData, webhooksData] = await Promise.all([
        enterpriseIntegrationService.getIntegrations(),
        enterpriseIntegrationService.getAPIEndpoints(),
        enterpriseIntegrationService.getAPIKeys(),
        enterpriseIntegrationService.getWebhooks()
      ]);

      setIntegrations(integrationsData);
      setApiEndpoints(endpointsData);
      setApiKeys(keysData);
      setWebhooks(webhooksData);
    } catch (error) {
      console.error('Error fetching integration data:', error);
      toast({
        title: 'Error loading integration data',
        description: 'Failed to load integration hub data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestIntegration = async (integrationId: string) => {
    try {
      const result = await enterpriseIntegrationService.testIntegration(integrationId);
      if (result.success) {
        toast({
          title: 'Integration test successful',
          description: result.message,
        });
      } else {
        toast({
          title: 'Integration test failed',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Test failed',
        description: 'Failed to test integration. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleSyncIntegration = async (integrationId: string) => {
    try {
      const result = await enterpriseIntegrationService.syncIntegration(integrationId);
      if (result.success) {
        toast({
          title: 'Sync started',
          description: `Sync ID: ${result.syncId}`,
        });
        fetchIntegrationData(); // Refresh data
      } else {
        toast({
          title: 'Sync failed',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Sync failed',
        description: 'Failed to start sync. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      case 'configuring': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getIntegrationTypeIcon = (type: string) => {
    switch (type) {
      case 'erp': return '📊';
      case 'crm': return '👥';
      case 'audit_platform': return '📋';
      case 'compliance_tool': return '✅';
      case 'analytics': return '📈';
      case 'blockchain': return '🔗';
      default: return '🔧';
    }
  };

  const integrationTypeData = integrations.reduce((acc, integration) => {
    acc[integration.type] = (acc[integration.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeChartData = Object.entries(integrationTypeData).map(([type, count]) => ({
    name: type.replace('_', ' '),
    value: count,
    color: getColorForIntegrationType(type)
  }));

  function getColorForIntegrationType(type: string): string {
    const colors: Record<string, string> = {
      erp: '#3b82f6',
      crm: '#22c55e',
      audit_platform: '#f59e0b',
      compliance_tool: '#8b5cf6',
      analytics: '#ec4899',
      blockchain: '#06b6d4'
    };
    return colors[type] || '#6b7280';
  }

  const dataVolumeData = integrations.map(integration => ({
    name: integration.name.substring(0, 8) + '...',
    imported: integration.dataVolume.imported,
    exported: integration.dataVolume.exported,
    processed: integration.dataVolume.processed
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Enterprise Integration Hub
          </h2>
          <p className="text-muted-foreground">Connect Atlas with your enterprise systems and third-party platforms</p>
        </div>
        <Button onClick={fetchIntegrationData} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Integrations</p>
                <h3 className="text-2xl font-bold">{integrations.filter(i => i.status === 'active').length}</h3>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="default" className="text-xs">
                {integrations.length} Total
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">API Keys</p>
                <h3 className="text-2xl font-bold">{apiKeys.filter(k => k.active).length}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Key className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {apiKeys.length} Total Keys
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Webhooks</p>
                <h3 className="text-2xl font-bold">{webhooks.filter(w => w.active).length}</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Webhook className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="default" className="text-xs bg-green-500">
                {Math.round(webhooks.reduce((acc, w) => acc + w.successRate, 0) / webhooks.length)}% Success Rate
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Processed</p>
                <h3 className="text-2xl font-bold">
                  {(integrations.reduce((acc, i) => acc + i.dataVolume.processed, 0) / 1000).toFixed(1)}k
                </h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                Last 30 days
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api-endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-2xl">
                        {getIntegrationTypeIcon(integration.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{integration.name}</h4>
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {integration.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Provider: {integration.provider}
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Last Sync:</span>
                            <p className="text-muted-foreground">
                              {new Date(integration.lastSync).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Frequency:</span>
                            <p className="text-muted-foreground capitalize">
                              {integration.syncFrequency}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Data Imported:</span>
                            <p className="text-muted-foreground">
                              {integration.dataVolume.imported.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Errors:</span>
                            <p className={integration.errorCount > 0 ? 'text-red-500' : 'text-green-500'}>
                              {integration.errorCount}
                            </p>
                          </div>
                        </div>
                        {integration.dataFlow.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Data Flows:</p>
                            <div className="space-y-1">
                              {integration.dataFlow.map((flow, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span>{flow.source} → {flow.target}</span>
                                  <Badge variant={
                                    flow.status === 'success' ? 'default' :
                                    flow.status === 'error' ? 'destructive' : 'secondary'
                                  }>
                                    {flow.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTestIntegration(integration.id)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleSyncIntegration(integration.id)}
                        disabled={integration.status !== 'active'}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sync
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api-endpoints" className="space-y-4">
          <div className="grid gap-4">
            {apiEndpoints.map((endpoint) => (
              <Card key={endpoint.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="font-mono">
                          {endpoint.method}
                        </Badge>
                        <h4 className="font-semibold">{endpoint.name}</h4>
                        <Badge variant="secondary" className="capitalize">
                          {endpoint.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{endpoint.description}</p>
                      <div className="bg-muted p-2 rounded text-sm font-mono mb-3">
                        {endpoint.path}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Authentication:</span>
                          <p className="text-muted-foreground capitalize">
                            {endpoint.authentication.replace('_', ' ')}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Rate Limit:</span>
                          <p className="text-muted-foreground">
                            {endpoint.rateLimit.requests}/{endpoint.rateLimit.period}
                          </p>
                        </div>
                      </div>
                      {endpoint.parameters.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">Parameters:</p>
                          <div className="space-y-1">
                            {endpoint.parameters.map((param, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span className="font-mono">{param.name}</span>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {param.type}
                                  </Badge>
                                  {param.required && (
                                    <Badge variant="destructive" className="text-xs">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Docs
                      </Button>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Try It
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">API Keys</h3>
            <Button>
              <Key className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
          </div>
          <div className="grid gap-4">
            {apiKeys.map((apiKey) => (
              <Card key={apiKey.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{apiKey.name}</h4>
                        <Badge variant={apiKey.active ? 'default' : 'secondary'}>
                          {apiKey.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="bg-muted p-2 rounded text-sm font-mono mb-3 break-all">
                        {apiKey.key}
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Created:</span>
                          <p className="text-muted-foreground">
                            {new Date(apiKey.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Last Used:</span>
                          <p className="text-muted-foreground">
                            {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : 'Never'}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Rate Limit:</span>
                          <p className="text-muted-foreground">
                            {apiKey.rateLimit.requests}/{apiKey.rateLimit.period}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Expires:</span>
                          <p className="text-muted-foreground">
                            {apiKey.expiresAt ? new Date(apiKey.expiresAt).toLocaleDateString() : 'Never'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {apiKey.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {apiKey.ipWhitelist && apiKey.ipWhitelist.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">IP Whitelist:</p>
                          <div className="flex flex-wrap gap-1">
                            {apiKey.ipWhitelist.map((ip, index) => (
                              <Badge key={index} variant="secondary" className="text-xs font-mono">
                                {ip}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        Regenerate
                      </Button>
                      <Button 
                        size="sm" 
                        variant={apiKey.active ? 'destructive' : 'default'}
                      >
                        {apiKey.active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Webhook Endpoints</h3>
            <Button>
              <Webhook className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </div>
          <div className="grid gap-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">Webhook Endpoint</h4>
                        <Badge variant={webhook.active ? 'default' : 'secondary'}>
                          {webhook.active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline">
                          {Math.round(webhook.successRate)}% Success
                        </Badge>
                      </div>
                      <div className="bg-muted p-2 rounded text-sm font-mono mb-3 break-all">
                        {webhook.url}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium">Created:</span>
                          <p className="text-muted-foreground">
                            {new Date(webhook.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Last Triggered:</span>
                          <p className="text-muted-foreground">
                            {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleDateString() : 'Never'}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Events:</p>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 text-sm">
                        <span className="font-medium">Retry Policy:</span>
                        <span className="text-muted-foreground ml-2">
                          Max {webhook.retryPolicy.maxRetries} retries, {webhook.retryPolicy.timeout}ms timeout
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        Test
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant={webhook.active ? 'destructive' : 'default'}
                      >
                        {webhook.active ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Types</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <PieChart>
                    <Pie
                      data={typeChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {typeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Volume by Integration</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <BarChart data={dataVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="imported" fill="#3b82f6" name="Imported" />
                    <Bar dataKey="exported" fill="#22c55e" name="Exported" />
                    <Bar dataKey="processed" fill="#f59e0b" name="Processed" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integration Health Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {Math.round((integrations.filter(i => i.status === 'active').length / integrations.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {integrations.reduce((acc, i) => acc + i.dataVolume.processed, 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Records Processed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {Math.round(webhooks.reduce((acc, w) => acc + w.successRate, 0) / webhooks.length)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Webhook Success</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    {integrations.reduce((acc, i) => acc + i.errorCount, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Errors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseIntegrationHub;
