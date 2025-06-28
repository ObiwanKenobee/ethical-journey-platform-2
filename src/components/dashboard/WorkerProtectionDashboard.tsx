
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Heart, 
  Shield, 
  MessageSquare, 
  AlertTriangle,
  Phone,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3
} from 'lucide-react';
import { 
  workerProtectionService, 
  WorkerProfile, 
  GrievanceCase, 
  WellnessProgram,
  WorkerSafety,
  WorkerVoiceChannel
} from '@/services/worker-protection.service';
import { toast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

const WorkerProtectionDashboard = () => {
  const [workerProfiles, setWorkerProfiles] = useState<WorkerProfile[]>([]);
  const [grievances, setGrievances] = useState<GrievanceCase[]>([]);
  const [wellnessPrograms, setWellnessPrograms] = useState<WellnessProgram[]>([]);
  const [safetyData, setSafetyData] = useState<WorkerSafety | null>(null);
  const [voiceChannels, setVoiceChannels] = useState<WorkerVoiceChannel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkerProtectionData();
  }, []);

  const fetchWorkerProtectionData = async () => {
    try {
      setLoading(true);
      const [profiles, grievancesData, programs, safety, channels] = await Promise.all([
        workerProtectionService.getWorkerProfiles(),
        workerProtectionService.getGrievances(),
        workerProtectionService.getWellnessPrograms(),
        workerProtectionService.getSafetyData('facility_123'),
        workerProtectionService.getVoiceChannels()
      ]);

      setWorkerProfiles(profiles);
      setGrievances(grievancesData);
      setWellnessPrograms(programs);
      setSafetyData(safety);
      setVoiceChannels(channels);
    } catch (error) {
      console.error('Error fetching worker protection data:', error);
      toast({
        title: 'Error loading worker protection data',
        description: 'Failed to load dashboard data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'investigating': return 'bg-blue-500';
      case 'escalated': return 'bg-orange-500';
      case 'submitted': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const protectionLevelData = workerProfiles.reduce((acc, worker) => {
    acc[worker.protectionLevel] = (acc[worker.protectionLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const protectionChartData = Object.entries(protectionLevelData).map(([level, count]) => ({
    name: level,
    value: count,
    color: level === 'high' ? '#22c55e' : level === 'medium' ? '#f59e0b' : '#ef4444'
  }));

  const grievanceTrendData = [
    { month: 'Jan', submitted: 12, resolved: 10 },
    { month: 'Feb', submitted: 15, resolved: 13 },
    { month: 'Mar', submitted: 8, resolved: 12 },
    { month: 'Apr', submitted: 11, resolved: 9 },
    { month: 'May', submitted: 6, resolved: 8 },
    { month: 'Jun', submitted: 9, resolved: 11 },
  ];

  const safetyIncidentData = safetyData?.incidents.map(incident => ({
    date: new Date(incident.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    severity: incident.severity === 'fatal' ? 4 : incident.severity === 'major' ? 3 : incident.severity === 'minor' ? 2 : 1
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            Worker Protection Center
          </h2>
          <p className="text-muted-foreground">Comprehensive worker safety, welfare, and voice systems</p>
        </div>
        <Button onClick={fetchWorkerProtectionData} disabled={loading}>
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Protected Workers</p>
                <h3 className="text-2xl font-bold">{workerProfiles.length}</h3>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="default" className="text-xs">
                {workerProfiles.filter(w => w.protectionLevel === 'high').length} High Protection
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Grievances</p>
                <h3 className="text-2xl font-bold">{grievances.filter(g => g.status !== 'resolved').length}</h3>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="destructive" className="text-xs">
                {grievances.filter(g => g.severity === 'critical').length} Critical
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Safety Score</p>
                <h3 className="text-2xl font-bold">{safetyData?.safetyScore || 0}</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={safetyData?.safetyScore || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Wellness Programs</p>
                <h3 className="text-2xl font-bold">{wellnessPrograms.length}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {wellnessPrograms.reduce((acc, p) => acc + p.enrollment.enrolled, 0)} Enrolled
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grievances" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="grievances">Grievances</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="voice-channels">Voice Channels</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="grievances" className="space-y-4">
          <div className="grid gap-4">
            {grievances.map((grievance) => (
              <Card key={grievance.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold capitalize">{grievance.category.replace('_', ' ')}</h4>
                        <Badge variant={
                          grievance.severity === 'critical' ? 'destructive' :
                          grievance.severity === 'high' ? 'secondary' : 'outline'
                        }>
                          {grievance.severity}
                        </Badge>
                        <Badge className={getStatusColor(grievance.status)}>
                          {grievance.status}
                        </Badge>
                        {grievance.anonymous && (
                          <Badge variant="outline">Anonymous</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{grievance.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>📅 Submitted: {new Date(grievance.submissionDate).toLocaleDateString()}</span>
                        <span>🏢 Facility: {grievance.facilityId}</span>
                        {grievance.assignedInvestigator && (
                          <span>👤 Investigator: {grievance.assignedInvestigator}</span>
                        )}
                      </div>
                      {grievance.resolutionSteps.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Resolution Progress:</p>
                          <div className="space-y-2">
                            {grievance.resolutionSteps.map((step) => (
                              <div key={step.id} className="flex items-center justify-between text-sm">
                                <span>{step.step}</span>
                                <Badge variant={
                                  step.status === 'completed' ? 'default' :
                                  step.status === 'in_progress' ? 'secondary' : 'outline'
                                }>
                                  {step.status.replace('_', ' ')}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {grievance.outcome && (
                        <div className="mb-2">
                          <Badge variant="default">Resolved</Badge>
                          {grievance.satisfactionRating && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Rating: {grievance.satisfactionRating}/10
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          {safetyData && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Safety Incidents</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ChartContainer config={{}}>
                      <BarChart data={safetyIncidentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="severity" fill="#ef4444" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Safety Training Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {safetyData.training.map((training) => (
                        <div key={training.id}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{training.program}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{training.completion_rate}%</span>
                              {training.mandatory && <Badge variant="destructive" className="text-xs">Mandatory</Badge>}
                            </div>
                          </div>
                          <Progress value={training.completion_rate} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            Next due: {new Date(training.next_due).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Incidents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safetyData.incidents.map((incident) => (
                        <div key={incident.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={
                              incident.severity === 'fatal' ? 'destructive' :
                              incident.severity === 'major' ? 'secondary' : 'outline'
                            }>
                              {incident.severity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(incident.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm font-medium">{incident.description}</p>
                          <p className="text-xs text-muted-foreground">📍 {incident.location}</p>
                          <Badge className={getStatusColor(incident.status)} variant="outline">
                            {incident.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Safety Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safetyData.equipment.map((equipment, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{equipment.type}</span>
                            <Badge variant={equipment.required ? 'destructive' : 'outline'}>
                              {equipment.required ? 'Required' : 'Optional'}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Available: {equipment.available}</span>
                            <span>In Use: {equipment.in_use}</span>
                          </div>
                          <Progress value={(equipment.in_use / equipment.available) * 100} className="h-2" />
                          <div className="flex justify-between text-xs">
                            <span>Condition: {equipment.condition}</span>
                            <span>Last Checked: {new Date(equipment.last_inspection).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Inspections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safetyData.inspections.map((inspection) => (
                        <div key={inspection.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{inspection.type.replace('_', ' ')}</span>
                            <div className="text-right">
                              <div className="font-bold">{inspection.score}</div>
                              <div className="text-xs text-muted-foreground">Score</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Inspector: {inspection.inspector}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(inspection.date).toLocaleDateString()}
                          </p>
                          {inspection.violations.length > 0 && (
                            <div className="mt-2">
                              <Badge variant="destructive" className="text-xs">
                                {inspection.violations.length} Violations
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="wellness" className="space-y-4">
          <div className="grid gap-4">
            {wellnessPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{program.name}</h4>
                        <Badge variant="outline" className="capitalize">
                          {program.type.replace('_', ' ')}
                        </Badge>
                        {program.enrollment.open && (
                          <Badge variant="default">Open Enrollment</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{program.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium">Enrollment:</p>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={(program.enrollment.enrolled / program.enrollment.capacity) * 100} 
                              className="h-2 flex-1" 
                            />
                            <span className="text-sm text-muted-foreground">
                              {program.enrollment.enrolled}/{program.enrollment.capacity}
                            </span>
                          </div>
                          {program.enrollment.waitlist > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {program.enrollment.waitlist} on waitlist
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Schedule:</p>
                          <p className="text-sm text-muted-foreground">
                            {program.schedule.frequency} • {program.schedule.duration}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {program.schedule.sessions.map((session, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {session}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      {program.benefits.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Benefits:</p>
                          <div className="flex flex-wrap gap-1">
                            {program.benefits.map((benefit, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {benefit.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <Button size="sm" className="mb-2">
                        View Details
                      </Button>
                      {program.enrollment.open && (
                        <Button size="sm" variant="outline">
                          Enroll Workers
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="voice-channels" className="space-y-4">
          <div className="grid gap-4">
            {voiceChannels.map((channel) => (
              <Card key={channel.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-full bg-primary/10">
                        {channel.type === 'hotline' ? <Phone className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold capitalize">{channel.type}</h4>
                          <Badge variant={channel.active ? 'default' : 'secondary'}>
                            {channel.active ? 'Active' : 'Inactive'}
                          </Badge>
                          {channel.anonymous && (
                            <Badge variant="outline">Anonymous</Badge>
                          )}
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p><span className="font-medium">Facility:</span> {channel.facilityId}</p>
                          <p><span className="font-medium">Languages:</span> {channel.languages.join(', ')}</p>
                          <p><span className="font-medium">Access:</span> {channel.accessInstructions}</p>
                          <p><span className="font-medium">Response Time:</span> {channel.responseTime}</p>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Escalation Path:</p>
                          <div className="flex flex-wrap gap-1">
                            {channel.escalationPath.map((step, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {index + 1}. {step.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
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
                <CardTitle>Worker Protection Levels</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <PieChart>
                    <Pie
                      data={protectionChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {protectionChartData.map((entry, index) => (
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
                <CardTitle>Grievance Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <AreaChart data={grievanceTrendData}>
                    <defs>
                      <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="submitted" stroke="#ef4444" fillOpacity={1} fill="url(#colorSubmitted)" name="Submitted" />
                    <Area type="monotone" dataKey="resolved" stroke="#22c55e" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Worker Protection Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {Math.round((grievances.filter(g => g.status === 'resolved').length / grievances.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {Math.round(grievances.reduce((acc, g) => {
                      const submitDate = new Date(g.submissionDate);
                      const now = new Date();
                      const days = Math.floor((now.getTime() - submitDate.getTime()) / (1000 * 60 * 60 * 24));
                      return acc + days;
                    }, 0) / grievances.length)}
                  </div>
                  <p className="text-sm text-muted-foreground">Avg Resolution Days</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {wellnessPrograms.reduce((acc, p) => acc + p.enrollment.enrolled, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Program Participants</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    {safetyData?.safetyScore || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Safety Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkerProtectionDashboard;
