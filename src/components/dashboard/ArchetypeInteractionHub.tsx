
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Network, 
  Zap, 
  MessageSquare, 
  TrendingUp, 
  Award,
  Target,
  Globe,
  Bot,
  Handshake,
  Brain,
  Eye,
  ArrowRight,
  Plus,
  Filter,
  Search,
  Star,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
  Rocket,
  Shield,
  BarChart3
} from 'lucide-react';
import { archetypeInteractionsService } from '@/services/archetype-interactions.service';
import { useAuth } from '@/context/AuthContext';

interface Archetype {
  id: string;
  name: string;
  type: string;
  description: string;
  strengths: string[];
  compatibilityScore: number;
  currentCollaborations: number;
  successRate: number;
  icon: React.ElementType;
  color: string;
  online: boolean;
}

const archetypes: Archetype[] = [
  {
    id: '1',
    name: 'Sustainability Director',
    type: 'sustainability_director',
    description: 'Expert in ESG strategy and environmental compliance',
    strengths: ['ESG Strategy', 'Carbon Footprint', 'Sustainable Supply Chain'],
    compatibilityScore: 94,
    currentCollaborations: 12,
    successRate: 87,
    icon: Award,
    color: 'text-green-600',
    online: true
  },
  {
    id: '2',
    name: 'Compliance Officer',
    type: 'compliance_officer',
    description: 'Regulatory compliance and risk management specialist',
    strengths: ['Regulatory Compliance', 'Risk Assessment', 'Audit Management'],
    compatibilityScore: 89,
    currentCollaborations: 8,
    successRate: 92,
    icon: Shield,
    color: 'text-blue-600',
    online: true
  },
  {
    id: '3',
    name: 'Data Scientist',
    type: 'data_scientist',
    description: 'Advanced analytics and AI model development',
    strengths: ['Predictive Analytics', 'Machine Learning', 'Data Visualization'],
    compatibilityScore: 85,
    currentCollaborations: 15,
    successRate: 78,
    icon: Brain,
    color: 'text-purple-600',
    online: false
  },
  {
    id: '4',
    name: 'NGO Director',
    type: 'ngo_director',
    description: 'Human rights advocacy and worker protection',
    strengths: ['Human Rights', 'Worker Protection', 'Policy Advocacy'],
    compatibilityScore: 91,
    currentCollaborations: 6,
    successRate: 95,
    icon: Handshake,
    color: 'text-orange-600',
    online: true
  },
  {
    id: '5',
    name: 'AI Specialist',
    type: 'ai_specialist',
    description: 'AI integration and automation solutions',
    strengths: ['AI Integration', 'Process Automation', 'Smart Analytics'],
    compatibilityScore: 88,
    currentCollaborations: 10,
    successRate: 83,
    icon: Bot,
    color: 'text-indigo-600',
    online: true
  }
];

const ArchetypeInteractionHub = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [collaborationMessage, setCollaborationMessage] = useState("");
  const [interactions, setInteractions] = useState<any[]>([]);
  const [synergies, setSynergies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [synergyData, interactionData] = await Promise.all([
        archetypeInteractionsService.getArchetypeSynergies(),
        profile?.id ? archetypeInteractionsService.getInteractionInsights(profile.id) : null
      ]);
      
      setSynergies(synergyData);
      if (interactionData) {
        setInteractions(interactionData.recentActivity || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load interaction data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollaborationRequest = async (archetype: Archetype) => {
    if (!profile?.id || !collaborationMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a collaboration message",
        variant: "destructive"
      });
      return;
    }

    try {
      await archetypeInteractionsService.createCollaborationRequest({
        requester_id: profile.id,
        target_archetype: archetype.type,
        message: collaborationMessage,
        status: 'pending'
      });

      await archetypeInteractionsService.updateInteractionAnalytics(
        profile.id,
        archetype.type,
        'collaboration_request'
      );

      toast({
        title: "Success",
        description: `Collaboration request sent to ${archetype.name}`,
      });

      setCollaborationMessage("");
      setSelectedArchetype(null);
    } catch (error) {
      console.error('Error sending collaboration request:', error);
      toast({
        title: "Error",
        description: "Failed to send collaboration request",
        variant: "destructive"
      });
    }
  };

  const filteredArchetypes = archetypes.filter(archetype =>
    archetype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    archetype.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Archetype Interaction Hub</h2>
          <p className="text-muted-foreground">Connect and collaborate with domain experts</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Users className="h-3 w-3 mr-1" />
            {archetypes.filter(a => a.online).length} Online
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="synergies">Synergies</TabsTrigger>
          <TabsTrigger value="collaborations">Active</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="innovations">Innovations</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search archetypes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArchetypes.map((archetype) => (
              <Card key={archetype.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-gray-100`}>
                        <archetype.icon className={`h-5 w-5 ${archetype.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{archetype.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={archetype.online ? "default" : "secondary"}>
                            {archetype.online ? "Online" : "Offline"}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-sm">{archetype.compatibilityScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{archetype.description}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Core Strengths</h4>
                    <div className="flex flex-wrap gap-1">
                      {archetype.strengths.map((strength, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Active Projects:</span>
                      <div className="font-medium">{archetype.currentCollaborations}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate:</span>
                      <div className="font-medium">{archetype.successRate}%</div>
                    </div>
                  </div>

                  <Progress value={archetype.compatibilityScore} className="h-2" />

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedArchetype(archetype)}
                      disabled={!archetype.online}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Collaborate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="synergies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Archetype Synergy Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {synergies.slice(0, 6).map((synergy, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{synergy.archetype_from}</Badge>
                        <ArrowRight className="h-3 w-3" />
                        <Badge variant="outline">{synergy.archetype_to}</Badge>
                      </div>
                      <Badge variant={synergy.unlocked ? "default" : "secondary"}>
                        {synergy.unlocked ? "Unlocked" : "Locked"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Strength Score:</span>
                        <span className="font-medium">{synergy.strength_score}/100</span>
                      </div>
                      <Progress value={synergy.strength_score} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Multiplier:</span>
                        <span className="font-medium">{synergy.multiplier}x</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" />
                Active Collaborations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Collaborations</h3>
                <p className="text-muted-foreground mb-4">
                  Start collaborating with other archetypes to unlock synergies and boost your impact.
                </p>
                <Button onClick={() => setActiveTab("discover")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Find Collaborators
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{interactions.length}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Collaboration Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Pending responses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Need more data</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="innovations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI-Powered Matchmaking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced algorithms analyze compatibility, project history, and expertise overlap to suggest optimal collaboration partners.
                </p>
                <Button size="sm">
                  <Rocket className="h-4 w-4 mr-2" />
                  Enable Smart Matching
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Collaboration Impact Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time measurement of collaboration outcomes, synergy multipliers, and collective impact on supply chain goals.
                </p>
                <Button size="sm" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Impact Metrics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Collaboration Request Modal */}
      {selectedArchetype && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Collaborate with {selectedArchetype.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your collaboration proposal..."
                value={collaborationMessage}
                onChange={(e) => setCollaborationMessage(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleCollaborationRequest(selectedArchetype)}
                  disabled={!collaborationMessage.trim()}
                >
                  Send Request
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedArchetype(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ArchetypeInteractionHub;
