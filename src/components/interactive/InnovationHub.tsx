
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Lightbulb,
  Users,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Vote,
  Rocket,
  Brain,
  Globe,
  Zap,
  Heart,
  Star,
  Share2,
  BookOpen,
  Code,
  Database,
  Shield
} from 'lucide-react';

interface Innovation {
  id: string;
  title: string;
  description: string;
  category: string;
  impact_score: number;
  votes: number;
  contributors: number;
  status: 'ideation' | 'development' | 'testing' | 'deployed';
  tags: string[];
  author: string;
  created_at: string;
}

interface Collaboration {
  id: string;
  project_name: string;
  description: string;
  skills_needed: string[];
  participants: number;
  progress: number;
  deadline: string;
  category: string;
}

const InnovationHub = () => {
  const [activeTab, setActiveTab] = useState('innovations');
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [newIdea, setNewIdea] = useState({ title: '', description: '', category: '', tags: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadInnovations();
    loadCollaborations();
  }, []);

  const loadInnovations = () => {
    // Mock data - replace with actual API calls
    setInnovations([
      {
        id: '1',
        title: 'AI-Powered Supply Chain Risk Predictor',
        description: 'Machine learning model that predicts supply chain disruptions 30 days in advance using satellite data and market indicators.',
        category: 'AI/ML',
        impact_score: 94,
        votes: 147,
        contributors: 23,
        status: 'development',
        tags: ['AI', 'Supply Chain', 'Risk Management', 'Predictive Analytics'],
        author: 'Dr. Sarah Chen',
        created_at: '2024-01-15'
      },
      {
        id: '2',
        title: 'Blockchain Worker Identity Verification',
        description: 'Decentralized identity system for workers to maintain verified credentials across different employers and regions.',
        category: 'Blockchain',
        impact_score: 87,
        votes: 98,
        contributors: 15,
        status: 'testing',
        tags: ['Blockchain', 'Identity', 'Worker Rights', 'Verification'],
        author: 'Alex Rodriguez',
        created_at: '2024-01-10'
      },
      {
        id: '3',
        title: 'Real-time ESG Impact Dashboard',
        description: 'Live dashboard showing real-time environmental and social impact metrics across global supply chains.',
        category: 'Data Visualization',
        impact_score: 91,
        votes: 203,
        contributors: 31,
        status: 'deployed',
        tags: ['ESG', 'Real-time', 'Dashboard', 'Impact Measurement'],
        author: 'Maria Santos',
        created_at: '2024-01-05'
      }
    ]);
  };

  const loadCollaborations = () => {
    // Mock data - replace with actual API calls
    setCollaborations([
      {
        id: '1',
        project_name: 'Global Worker Protection Protocol',
        description: 'Developing standardized protocols for worker protection across international supply chains.',
        skills_needed: ['Policy Design', 'Legal Framework', 'International Relations'],
        participants: 12,
        progress: 65,
        deadline: '2024-03-15',
        category: 'Policy'
      },
      {
        id: '2',
        project_name: 'Open Source Supplier Verification',
        description: 'Building an open-source platform for transparent supplier verification and certification.',
        skills_needed: ['Full-stack Development', 'Blockchain', 'UI/UX Design'],
        participants: 8,
        progress: 40,
        deadline: '2024-04-01',
        category: 'Technology'
      }
    ]);
  };

  const submitIdea = async () => {
    if (!newIdea.title || !newIdea.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and description",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Submit idea logic here
      toast({
        title: "Idea Submitted!",
        description: "Your innovation idea has been submitted for community review.",
      });
      setNewIdea({ title: '', description: '', category: '', tags: '' });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ideation': return 'bg-yellow-500';
      case 'development': return 'bg-blue-500';
      case 'testing': return 'bg-orange-500';
      case 'deployed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI/ML': return Brain;
      case 'Blockchain': return Shield;
      case 'Data Visualization': return Database;
      case 'Policy': return BookOpen;
      case 'Technology': return Code;
      default: return Lightbulb;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Innovation Hub</h1>
          <p className="text-muted-foreground">Collaborate, innovate, and drive positive change in supply chain governance</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            247 Active Contributors
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Rocket className="h-3 w-3" />
            23 Projects Deployed
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="innovations">Innovations</TabsTrigger>
          <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
          <TabsTrigger value="submit">Submit Idea</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="innovations" className="space-y-6">
          <div className="grid gap-6">
            {innovations.map((innovation) => {
              const CategoryIcon = getCategoryIcon(innovation.category);
              return (
                <Card key={innovation.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{innovation.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">by {innovation.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(innovation.status)}>
                          {innovation.status}
                        </Badge>
                        <Badge variant="outline">
                          <Star className="h-3 w-3 mr-1" />
                          {innovation.impact_score}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{innovation.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {innovation.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Vote className="h-4 w-4" />
                          {innovation.votes} votes
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {innovation.contributors} contributors
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4 mr-1" />
                          Support
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Discuss
                        </Button>
                        <Button size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Join Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="collaborate" className="space-y-6">
          <div className="grid gap-6">
            {collaborations.map((collab) => (
              <Card key={collab.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{collab.project_name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{collab.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Deadline</div>
                      <div className="font-medium">{new Date(collab.deadline).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{collab.description}</p>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Project Progress</span>
                      <span className="text-sm text-muted-foreground">{collab.progress}%</span>
                    </div>
                    <Progress value={collab.progress} className="h-2" />
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Skills Needed:</div>
                    <div className="flex flex-wrap gap-1">
                      {collab.skills_needed.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {collab.participants} participants
                    </span>
                    <Button>
                      <Zap className="h-4 w-4 mr-1" />
                      Join Collaboration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Submit Your Innovation Idea
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Give your innovation a compelling title"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  placeholder="e.g., AI/ML, Blockchain, Policy, etc."
                  value={newIdea.category}
                  onChange={(e) => setNewIdea({ ...newIdea, category: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your innovation idea, its potential impact, and how it addresses supply chain challenges..."
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                  rows={6}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tags</label>
                <Input
                  placeholder="Comma-separated tags (e.g., AI, sustainability, worker rights)"
                  value={newIdea.tags}
                  onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
                />
              </div>

              <Button 
                onClick={submitIdea} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Submitting...' : 'Submit Innovation Idea'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Dr. Sarah Chen', points: 2847, projects: 5 },
                  { name: 'Alex Rodriguez', points: 2134, projects: 3 },
                  { name: 'Maria Santos', points: 1923, projects: 4 },
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{contributor.name}</div>
                        <div className="text-xs text-muted-foreground">{contributor.projects} projects</div>
                      </div>
                    </div>
                    <Badge variant="secondary">{contributor.points} pts</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Trending Ideas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'Carbon Credit Blockchain', votes: 145 },
                  { title: 'Worker Safety IoT Network', votes: 132 },
                  { title: 'Supply Chain Transparency AI', votes: 118 },
                ].map((idea, index) => (
                  <div key={index} className="p-2 rounded-lg bg-muted/50">
                    <div className="font-medium text-sm">{idea.title}</div>
                    <div className="text-xs text-muted-foreground">{idea.votes} votes this week</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Global Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">23M+</div>
                  <div className="text-sm text-muted-foreground">Workers Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1.2B</div>
                  <div className="text-sm text-muted-foreground">Tons CO2 Reduced</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">847</div>
                  <div className="text-sm text-muted-foreground">Companies Transformed</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InnovationHub;
