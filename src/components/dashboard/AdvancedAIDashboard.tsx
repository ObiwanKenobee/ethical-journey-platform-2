
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Zap, 
  Activity,
  BarChart3,
  Eye,
  Shield,
  Lightbulb
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { aiIntelligenceService, AIInsight, PredictiveModel, AnomalyDetection } from '@/services/ai-intelligence.service';
import { toast } from '@/hooks/use-toast';

const AdvancedAIDashboard = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [models, setModels] = useState<PredictiveModel[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyDetection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  useEffect(() => {
    fetchAIData();
  }, [selectedTimeRange]);

  const fetchAIData = async () => {
    try {
      setLoading(true);
      const [insightsData, modelsData, anomaliesData] = await Promise.all([
        aiIntelligenceService.getInsights({ timeRange: selectedTimeRange }),
        aiIntelligenceService.getPredictiveModels(),
        aiIntelligenceService.getAnomalies(selectedTimeRange)
      ]);

      setInsights(insightsData);
      setModels(modelsData);
      setAnomalies(anomaliesData);
    } catch (error) {
      console.error('Error fetching AI data:', error);
      toast({
        title: 'Error loading AI insights',
        description: 'Failed to load AI dashboard data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'predictive': return <TrendingUp className="h-4 w-4" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4" />;
      case 'risk_assessment': return <Shield className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const riskTrendData = [
    { month: 'Jan', risk: 65, predicted: 67 },
    { month: 'Feb', risk: 68, predicted: 70 },
    { month: 'Mar', risk: 72, predicted: 69 },
    { month: 'Apr', risk: 71, predicted: 73 },
    { month: 'May', risk: 69, predicted: 68 },
    { month: 'Jun', risk: 66, predicted: 65 },
  ];

  const modelAccuracyData = models.map(model => ({
    name: model.name.split(' ')[0],
    accuracy: model.accuracy * 100
  }));

  const anomalyTypeData = [
    { name: 'Worker Distress', value: 45, color: '#ff6b6b' },
    { name: 'Supply Disruption', value: 30, color: '#4ecdc4' },
    { name: 'Compliance Deviation', value: 20, color: '#45b7d1' },
    { name: 'Financial Irregularity', value: 5, color: '#96ceb4' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Intelligence Center
          </h2>
          <p className="text-muted-foreground">Advanced analytics and predictive insights for supply chain protection</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedTimeRange === '24h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('24h')}
          >
            24H
          </Button>
          <Button
            variant={selectedTimeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('7d')}
          >
            7D
          </Button>
          <Button
            variant={selectedTimeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('30d')}
          >
            30D
          </Button>
        </div>
      </div>

      {/* AI Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Models</p>
                <h3 className="text-2xl font-bold">{models.length}</h3>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="default" className="text-xs">
                {models.filter(m => m.accuracy > 0.9).length} High Accuracy
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Insights</p>
                <h3 className="text-2xl font-bold">{insights.filter(i => i.impact === 'critical').length}</h3>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="destructive" className="text-xs">
                {insights.filter(i => i.actionable).length} Actionable
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Anomalies Detected</p>
                <h3 className="text-2xl font-bold">{anomalies.length}</h3>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs bg-orange-500 text-white">
                {anomalies.filter(a => a.severity > 7).length} High Severity
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Model Accuracy</p>
                <h3 className="text-2xl font-bold">
                  {models.length > 0 ? Math.round(models.reduce((acc, m) => acc + m.accuracy, 0) / models.length * 100) : 0}%
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={models.length > 0 ? models.reduce((acc, m) => acc + m.accuracy, 0) / models.length * 100 : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="models">Predictive Models</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${getImpactColor(insight.impact)}/10`}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{insight.title}</h4>
                          <Badge variant={insight.impact === 'critical' ? 'destructive' : 'default'}>
                            {insight.impact}
                          </Badge>
                          <Badge variant="outline">
                            {Math.round(insight.confidence * 100)}% confidence
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{insight.description}</p>
                        {insight.actionable && insight.recommendations && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Recommended Actions:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {insight.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(insight.timestamp).toLocaleDateString()}
                      </p>
                      <Badge variant="outline" className="mt-1">
                        {insight.source.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Accuracy Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <BarChart data={modelAccuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="accuracy" fill="#0ea5e9" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Prediction Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <LineChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} name="Actual" />
                    <Line type="monotone" dataKey="predicted" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {models.map((model) => (
              <Card key={model.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{model.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{model.type.replace('_', ' ')}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{Math.round(model.accuracy * 100)}%</div>
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Last Trained:</span>
                      <span>{new Date(model.lastTrained).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {model.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Anomaly Types Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <PieChart>
                    <Pie
                      data={anomalyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {anomalyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anomaly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Detected</span>
                    <Badge variant="outline">{anomalies.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Severity</span>
                    <Badge variant="destructive">{anomalies.filter(a => a.severity > 7).length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Severity</span>
                    <Badge variant="secondary">
                      {anomalies.length > 0 ? (anomalies.reduce((acc, a) => acc + a.severity, 0) / anomalies.length).toFixed(1) : '0'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Unique Locations</span>
                    <Badge variant="outline">
                      {new Set(anomalies.map(a => a.location)).size}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {anomalies.map((anomaly) => (
              <Card key={anomaly.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold capitalize">{anomaly.type.replace('_', ' ')}</h4>
                        <Badge 
                          variant={anomaly.severity > 7 ? 'destructive' : anomaly.severity > 5 ? 'secondary' : 'outline'}
                        >
                          Severity: {anomaly.severity}/10
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{anomaly.pattern}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>📍 {anomaly.location}</span>
                        <span>🏢 {anomaly.affectedEntities.length} entities affected</span>
                      </div>
                      {anomaly.recommendations.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Recommendations:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {anomaly.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(anomaly.timestamp).toLocaleDateString()}
                      </p>
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
                <CardTitle>AI Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Model Accuracy</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Prediction Reliability</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Anomaly Detection Rate</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Response Time</span>
                      <span>1.2s avg</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Model Training Queue</span>
                    <Badge variant="outline">3 pending</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Processing</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Endpoints</span>
                    <Badge variant="default">All operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Model Update</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAIDashboard;
