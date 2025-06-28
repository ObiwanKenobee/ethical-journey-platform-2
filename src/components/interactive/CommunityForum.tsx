
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Flag,
  Pin,
  Lock,
  Users,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Plus,
  Eye,
  Reply,
  Award,
  BookOpen,
  AlertCircle,
  Globe
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  upvotes: number;
  downvotes: number;
  replies: number;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  is_solved: boolean;
}

interface Reply {
  id: string;
  post_id: string;
  content: string;
  author: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  is_solution: boolean;
}

const CommunityForum = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '', tags: '' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'supply-chain', name: 'Supply Chain', icon: Globe },
    { id: 'esg', name: 'ESG & Sustainability', icon: Globe },
    { id: 'compliance', name: 'Compliance', icon: AlertCircle },
    { id: 'technology', name: 'Technology', icon: Globe },
    { id: 'policy', name: 'Policy & Regulation', icon: BookOpen },
    { id: 'case-studies', name: 'Case Studies', icon: Award },
    { id: 'general', name: 'General Discussion', icon: MessageCircle }
  ];

  useEffect(() => {
    loadPosts();
  }, [selectedCategory, searchQuery]);

  const loadPosts = () => {
    // Mock data - replace with actual API calls
    setPosts([
      {
        id: '1',
        title: 'Best practices for implementing AI in supply chain risk assessment',
        content: 'I\'m looking for insights on how to effectively implement AI-driven risk assessment tools in our supply chain. What are the key considerations and potential pitfalls?',
        author: 'Sarah Chen',
        category: 'technology',
        tags: ['AI', 'Risk Assessment', 'Best Practices'],
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        upvotes: 23,
        downvotes: 2,
        replies: 15,
        views: 234,
        is_pinned: true,
        is_locked: false,
        is_solved: false
      },
      {
        id: '2',
        title: 'New EU regulations on supply chain due diligence - Impact discussion',
        content: 'The new EU Corporate Sustainability Due Diligence Directive is coming into effect. How is everyone preparing for compliance?',
        author: 'Marcus Weber',
        category: 'policy',
        tags: ['EU Regulations', 'Due Diligence', 'Compliance'],
        created_at: '2024-01-14T14:20:00Z',
        updated_at: '2024-01-14T14:20:00Z',
        upvotes: 41,
        downvotes: 3,
        replies: 28,
        views: 567,
        is_pinned: false,
        is_locked: false,
        is_solved: true
      },
      {
        id: '3',
        title: 'Case Study: Reducing carbon footprint in textile supply chains',
        content: 'Sharing our experience implementing carbon reduction strategies across our textile supply chain. 40% reduction achieved in 18 months.',
        author: 'Lisa Rodriguez',
        category: 'case-studies',
        tags: ['Carbon Reduction', 'Textile Industry', 'Case Study'],
        created_at: '2024-01-13T09:15:00Z',
        updated_at: '2024-01-13T09:15:00Z',
        upvotes: 67,
        downvotes: 1,
        replies: 22,
        views: 892,
        is_pinned: false,
        is_locked: false,
        is_solved: false
      }
    ]);
  };

  const createPost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and content",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Post Created!",
      description: "Your discussion has been posted to the community.",
    });

    setNewPost({ title: '', content: '', category: '', tags: '' });
    setShowNewPostForm(false);
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      'technology': 'bg-blue-500',
      'policy': 'bg-purple-500',
      'case-studies': 'bg-green-500',
      'esg': 'bg-emerald-500',
      'compliance': 'bg-orange-500',
      'supply-chain': 'bg-cyan-500',
      'general': 'bg-gray-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-muted-foreground">Connect, discuss, and share knowledge with the global supply chain community</p>
        </div>
        <Button onClick={() => setShowNewPostForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Discussion
        </Button>
      </div>

      {showNewPostForm && (
        <Card>
          <CardHeader>
            <CardTitle>Start a New Discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Discussion title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.filter(cat => cat.id !== 'all').map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <Textarea
              placeholder="Share your thoughts, questions, or insights..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={6}
            />
            <Input
              placeholder="Tags (comma-separated)"
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={createPost}>Post Discussion</Button>
              <Button variant="outline" onClick={() => setShowNewPostForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="solved">Solved</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              className="px-3 py-2 border rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {post.is_pinned && <Pin className="h-4 w-4 text-blue-500" />}
                            {post.is_locked && <Lock className="h-4 w-4 text-gray-500" />}
                            <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                              {post.title}
                            </h3>
                            {post.is_solved && (
                              <Badge className="bg-green-500">
                                <Award className="h-3 w-3 mr-1" />
                                Solved
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryBadgeColor(post.category)}>
                          {categories.find(c => c.id === post.category)?.name}
                        </Badge>
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>by {post.author}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {getTimeAgo(post.created_at)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Reply className="h-3 w-3" />
                            {post.replies}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {post.upvotes}
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
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

        <TabsContent value="trending" className="space-y-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { topic: 'AI in Supply Chain', discussions: 23, growth: '+45%' },
                    { topic: 'Carbon Tracking', discussions: 18, growth: '+32%' },
                    { topic: 'Worker Rights Technology', discussions: 15, growth: '+28%' },
                    { topic: 'Blockchain Verification', discussions: 12, growth: '+25%' }
                  ].map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="font-medium">{trend.topic}</div>
                        <div className="text-sm text-muted-foreground">{trend.discussions} discussions</div>
                      </div>
                      <Badge className="bg-green-500">{trend.growth}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="solved" className="space-y-6">
          <div className="space-y-4">
            {filteredPosts.filter(post => post.is_solved).map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">
                          <Award className="h-3 w-3 mr-1" />
                          Solved
                        </Badge>
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{post.content}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Solved by community • {post.replies} helpful replies</span>
                        <Button size="sm" variant="outline">View Solution</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Chen', posts: 47, solutions: 23, reputation: 2847 },
                    { name: 'Marcus Weber', posts: 34, solutions: 18, reputation: 2134 },
                    { name: 'Lisa Rodriguez', posts: 29, solutions: 15, reputation: 1923 }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.posts} posts • {user.solutions} solutions
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{user.reputation} rep</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Discussions</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Members</span>
                    <span className="font-bold">3,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Solutions Provided</span>
                    <span className="font-bold">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Countries Represented</span>
                    <span className="font-bold">67</span>
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

export default CommunityForum;
