
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TrendingUp, MessageSquare, Target, Download, BarChart2, PieChart, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductMarketFitDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [feedbackType, setFeedbackType] = useState('feature');
  const { toast } = useToast();

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. Our team will review it shortly.",
    });
  };

  const handleSurveyResponse = (type: 'positive' | 'negative') => {
    toast({
      title: type === 'positive' ? "Great to hear!" : "Thanks for your honesty",
      description: type === 'positive' 
        ? "We're glad to hear you're finding value in our platform." 
        : "Your feedback helps us improve. We'd love to hear more details.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Product Market Fit</h1>
          <p className="text-muted-foreground">Measure and improve product-market alignment</p>
        </div>
        <Button variant="default">
          <Target className="w-4 h-4 mr-2" />
          Run PMF Survey
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">User Feedback</span>
          </TabsTrigger>
          <TabsTrigger value="adoption" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">User Adoption</span>
          </TabsTrigger>
          <TabsTrigger value="competitive" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Market Analysis</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-6 rounded-lg flex flex-col">
              <span className="text-muted-foreground text-sm mb-1">PMF Score</span>
              <span className="text-4xl font-bold">72%</span>
              <span className="text-green-600 text-sm mt-1">+8% from last quarter</span>
              <p className="text-xs text-muted-foreground mt-3">
                Based on 240 responses to our "How would you feel if you could no longer use this product?" survey
              </p>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg flex flex-col">
              <span className="text-muted-foreground text-sm mb-1">User Retention</span>
              <span className="text-4xl font-bold">86%</span>
              <span className="text-green-600 text-sm mt-1">+2% from last month</span>
              <p className="text-xs text-muted-foreground mt-3">
                Percentage of users who return to the platform within 30 days
              </p>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg flex flex-col">
              <span className="text-muted-foreground text-sm mb-1">Net Promoter Score</span>
              <span className="text-4xl font-bold">42</span>
              <span className="text-amber-600 text-sm mt-1">No change from last quarter</span>
              <p className="text-xs text-muted-foreground mt-3">
                Measures customer experience and predicts business growth
              </p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Product-Market Fit Dashboard</CardTitle>
              <CardDescription>Key indicators of how well your product meets market needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">PMF Trend Visualization Will Appear Here</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Recent User Feedback</h3>
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Very Satisfied</Badge>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="mt-2 text-sm">
                        "The compliance tracking features have completely transformed how we manage our supply chain risks."
                      </p>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Somewhat Satisfied</Badge>
                        <span className="text-xs text-muted-foreground">5 days ago</span>
                      </div>
                      <p className="mt-2 text-sm">
                        "Good platform overall, but the reporting features could use more customization options."
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Feature Adoption Rates</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Risk Intelligence Dashboard</span>
                      <span className="font-medium">94%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Supplier Assessment Tools</span>
                      <span className="font-medium">87%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Compliance Automation</span>
                      <span className="font-medium">78%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Market Impact Analytics</span>
                      <span className="font-medium">62%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Collaboration Hub</span>
                      <span className="font-medium">45%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="default">
                View Detailed Analysis
              </Button>
            </CardFooter>
          </Card>
          
          <div className="p-6 border border-dashed rounded-lg">
            <h3 className="text-lg font-medium mb-3">Quick PMF Pulse Check</h3>
            <p className="mb-4">How would you feel if you could no longer use Guardian-IO?</p>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="flex items-center" 
                onClick={() => handleSurveyResponse('positive')}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Very disappointed
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center" 
                onClick={() => handleSurveyResponse('positive')}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Somewhat disappointed
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center" 
                onClick={() => handleSurveyResponse('negative')}
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Not disappointed
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>Share your thoughts on how we can improve</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="feedback-type" className="block text-sm font-medium mb-1">Feedback Type</label>
                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                      <SelectTrigger id="feedback-type">
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="other">Other Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="feedback-title" className="block text-sm font-medium mb-1">Title</label>
                    <Input id="feedback-title" placeholder="Brief summary of your feedback" />
                  </div>
                  
                  <div>
                    <label htmlFor="feedback-details" className="block text-sm font-medium mb-1">Details</label>
                    <Textarea 
                      id="feedback-details" 
                      placeholder="Please provide as much detail as possible" 
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Submit Feedback</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Feedback Analysis</CardTitle>
                <CardDescription>Trends from user feedback over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Feedback Trends Chart Will Appear Here</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Top Requested Features</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Advanced export options for reports</span>
                      <Badge>32 requests</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Mobile app for field assessments</span>
                      <Badge>28 requests</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>AI-powered risk predictions</span>
                      <Badge>23 requests</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Integration with procurement systems</span>
                      <Badge>19 requests</Badge>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent User Feedback</CardTitle>
              <CardDescription>Latest feedback submitted by users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                    <div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mb-2 sm:mb-0">Feature Request</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Submitted 3 days ago by Compliance Officer</div>
                  </div>
                  <h4 className="font-medium">Automated compliance alert system</h4>
                  <p className="mt-2 text-sm">
                    "It would be very helpful to have an automated alert system that notifies us when regulations change or when suppliers fall out of compliance. This would save us significant time in monitoring."
                  </p>
                  <div className="mt-3 flex items-center text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>2 comments</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                    <div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 mb-2 sm:mb-0">Improvement</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Submitted 5 days ago by Business Owner</div>
                  </div>
                  <h4 className="font-medium">Dashboard customization options</h4>
                  <p className="mt-2 text-sm">
                    "The dashboard is great but I'd love to be able to customize which widgets appear and how they're arranged. Different team members need different views."
                  </p>
                  <div className="mt-3 flex items-center text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>4 comments</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                    <div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 mb-2 sm:mb-0">Bug Report</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Submitted 1 week ago by NGO User</div>
                  </div>
                  <h4 className="font-medium">Export functionality not working correctly</h4>
                  <p className="mt-2 text-sm">
                    "When trying to export data in CSV format, some of the special characters in comments are causing formatting issues in the exported file."
                  </p>
                  <div className="mt-3 flex items-center text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>1 comment</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Feedback
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="adoption" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-6 rounded-lg flex flex-col">
              <span className="text-muted-foreground text-sm mb-1">Active Users</span>
              <span className="text-4xl font-bold">1,248</span>
              <span className="text-green-600 text-sm mt-1">+124 this month</span>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg flex flex-col">
              <span className="text-muted-foreground text-sm mb-1">Activation Rate</span>
              <span className="text-4xl font-bold">78%</span>
              <span className="text-green-600 text-sm mt-1">+5% from previous</span>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg flex flex-col">
              <span className="text-muted-foreground text-sm mb-1">Avg. Session Time</span>
              <span className="text-4xl font-bold">18:42</span>
              <span className="text-green-600 text-sm mt-1">+2:18 from previous</span>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Adoption Metrics</CardTitle>
              <CardDescription>Track how users are adopting different features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">User Adoption Charts Will Appear Here</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">User Growth by Segment</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Business Owners</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+32%</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Compliance Officers</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+28%</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>NGO Users</span>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">+12%</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Government Users</span>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">+8%</Badge>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">User Retention by Cohort</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>30-day retention</span>
                      <span className="font-medium">86%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>60-day retention</span>
                      <span className="font-medium">78%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>90-day retention</span>
                      <span className="font-medium">72%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>6-month retention</span>
                      <span className="font-medium">68%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="default">
                View User Segments
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage Analysis</CardTitle>
              <CardDescription>Understand which features drive the most engagement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Feature Usage Charts Will Appear Here</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Most Used Features</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Risk Intelligence Dashboard</span>
                      <span className="font-medium">94% of users</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Supplier Assessment Tools</span>
                      <span className="font-medium">87% of users</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Compliance Reports</span>
                      <span className="font-medium">83% of users</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Global Map</span>
                      <span className="font-medium">76% of users</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Engagement Drivers</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Risk Alerts</span>
                      <span className="font-medium">4.8 sessions/week</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Supplier Dashboard</span>
                      <span className="font-medium">3.2 sessions/week</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Compliance Tools</span>
                      <span className="font-medium">2.7 sessions/week</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Report Generation</span>
                      <span className="font-medium">1.5 sessions/week</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Analysis</CardTitle>
              <CardDescription>Competitive landscape and market positioning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Competitive Positioning Map Will Appear Here</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Competitive Differentiators</h3>
                  <ul className="space-y-3">
                    <li className="border-l-4 border-green-500 pl-3 py-1">
                      <p className="font-medium">AI-Powered Risk Intelligence</p>
                      <p className="text-sm text-muted-foreground">Our predictive risk analysis outperforms competitors by 37%</p>
                    </li>
                    <li className="border-l-4 border-green-500 pl-3 py-1">
                      <p className="font-medium">Blockchain Verification</p>
                      <p className="text-sm text-muted-foreground">Only solution with immutable audit trail validation</p>
                    </li>
                    <li className="border-l-4 border-amber-500 pl-3 py-1">
                      <p className="font-medium">Real-time Monitoring</p>
                      <p className="text-sm text-muted-foreground">Comparable to industry leaders, opportunity for improvement</p>
                    </li>
                    <li className="border-l-4 border-red-500 pl-3 py-1">
                      <p className="font-medium">Mobile Capabilities</p>
                      <p className="text-sm text-muted-foreground">Area for improvement compared to competitors</p>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Market Trends</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Increasing regulatory scrutiny</p>
                        <p className="text-sm text-muted-foreground">Growing demand for compliance automation solutions</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">ESG integration into supply chains</p>
                        <p className="text-sm text-muted-foreground">Rising focus on environmental and social governance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">AI and automation adoption</p>
                        <p className="text-sm text-muted-foreground">Increased integration of intelligent analytics</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Multi-tier supply chain visibility</p>
                        <p className="text-sm text-muted-foreground">Growing but still maturing market segment</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Analysis
              </Button>
              <Button variant="default">
                View Full Report
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Positioning</CardTitle>
                <CardDescription>How Guardian-IO stands out in the market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Feature Completeness</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ease of Use</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Innovation</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Support</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '88%' }}></div>
                    </div>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Value for Money</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '82%' }}></div>
                    </div>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Overall Market Position</h4>
                  <p className="text-sm text-muted-foreground">
                    Guardian-IO is positioned as a premium innovator in the ethical supply chain intelligence market, with strong scores in innovation and customer support.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Voice</CardTitle>
                <CardDescription>What customers say about us vs. competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Guardian-IO</Badge>
                      <span className="text-xs text-muted-foreground">Business Owner</span>
                    </div>
                    <p className="mt-2 text-sm">
                      "The AI-powered risk analysis has helped us identify issues before they become problems. We've saved thousands in potential compliance violations."
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Competitor</Badge>
                      <span className="text-xs text-muted-foreground">Compliance Officer</span>
                    </div>
                    <p className="mt-2 text-sm">
                      "Their platform has good reporting tools, but lacks the predictive capabilities that would make it truly valuable for our compliance team."
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Guardian-IO</Badge>
                      <span className="text-xs text-muted-foreground">NGO Partner</span>
                    </div>
                    <p className="mt-2 text-sm">
                      "The transparency and verification features are unmatched. We can finally trust the sustainability claims being made by suppliers."
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Competitor</Badge>
                      <span className="text-xs text-muted-foreground">Supply Chain Manager</span>
                    </div>
                    <p className="mt-2 text-sm">
                      "Their mobile app is better for field assessments, but their analytics aren't as sophisticated as what Guardian-IO offers."
                    </p>
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

export default ProductMarketFitDashboard;
