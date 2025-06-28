
import React, { useState } from 'react';
import { 
  Search, 
  Book, 
  MessageSquare, 
  FileQuestion, 
  Video, 
  Headphones,
  ArrowRight,
  Play,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Youtube
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data
const FAQS = [
  {
    id: 1,
    question: "How do I add a new supplier to my dashboard?",
    answer: "You can add a new supplier by navigating to the Suppliers tab in your dashboard and clicking the 'Add Supplier' button. Fill in the required information, including contact details and compliance documentation. Once submitted, our AI will analyze the data and assign an initial risk score.",
    category: "Suppliers"
  },
  {
    id: 2,
    question: "How is the risk score calculated?",
    answer: "Guardian-IO's proprietary risk algorithm analyzes over 200 data points including compliance history, geographical location, industry risk factors, worker feedback, audit results, and blockchain verification data. Risk scores are updated in real-time as new information becomes available.",
    category: "Risk Intelligence"
  },
  {
    id: 3,
    question: "Can I customize the compliance requirements for different suppliers?",
    answer: "Yes, you can create custom compliance templates for different supplier types, regions, or product categories. Navigate to Settings > Compliance Templates to create and manage your templates. These can be automatically assigned to new suppliers based on rules you define.",
    category: "Compliance"
  },
  {
    id: 4,
    question: "How do I grant access to my team members?",
    answer: "To add team members, go to Settings > Team Access. Click 'Invite User' and enter their email address. You can assign them specific roles with customized permissions, such as Admin, Compliance Officer, Viewer, or create custom roles with granular access controls.",
    category: "Account"
  },
  {
    id: 5,
    question: "How does the anonymous worker reporting system work?",
    answer: "Workers can submit anonymous reports through multiple channels, including our mobile app, SMS, or QR codes posted in facilities. Reports are encrypted and anonymized to protect workers' identities. You'll receive alerts for serious issues, and all reports contribute to the supplier risk assessment.",
    category: "Worker Rights"
  },
  {
    id: 6,
    question: "How do I export compliance reports for regulatory submission?",
    answer: "In the Reports tab, select 'Compliance Reports' and choose the reporting period and regulatory framework (e.g., SMETA, UNGP, Modern Slavery Act). Click 'Generate Report' to create a compliant document that can be downloaded in PDF, XLSX, or CSV format for submission.",
    category: "Reporting"
  },
];

const VIDEOS = [
  {
    id: 1,
    title: "Getting Started with Guardian-IO",
    duration: "5:23",
    thumbnail: "/placeholder.svg",
    category: "Onboarding"
  },
  {
    id: 2,
    title: "Configuring Risk Intelligence Alerts",
    duration: "8:47",
    thumbnail: "/placeholder.svg",
    category: "Risk Management"
  },
  {
    id: 3,
    title: "Supplier Onboarding Best Practices",
    duration: "6:12",
    thumbnail: "/placeholder.svg",
    category: "Suppliers"
  },
  {
    id: 4,
    title: "Generating Compliance Reports",
    duration: "4:35",
    thumbnail: "/placeholder.svg",
    category: "Reporting"
  },
];

const QUICK_LINKS = [
  { id: 1, title: "User Guide", icon: Book, url: "#" },
  { id: 2, title: "API Documentation", icon: FileQuestion, url: "#" },
  { id: 3, title: "Video Tutorials", icon: Video, url: "#" },
  { id: 4, title: "Contact Support", icon: Headphones, url: "#" },
];

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Here you would typically filter results or navigate to search results
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Help & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for help topics..."
                className="w-full pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8"
              >
                Search
              </Button>
            </form>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {QUICK_LINKS.map((link) => (
                <Card key={link.id} className="hover:shadow-md transition-shadow">
                  <a href={link.url} className="block p-4">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <link.icon className="h-8 w-8 text-primary" />
                      <span className="font-medium">{link.title}</span>
                    </div>
                  </a>
                </Card>
              ))}
            </div>

            {/* Tabs for different help sections */}
            <Tabs defaultValue="faqs" className="w-full mt-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="faqs">FAQ</TabsTrigger>
                <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
                <TabsTrigger value="contact">Contact Support</TabsTrigger>
              </TabsList>

              <TabsContent value="faqs" className="mt-6">
                <Accordion 
                  type="single" 
                  collapsible 
                  className="w-full" 
                  value={activeFaq}
                  onValueChange={setActiveFaq}
                >
                  {FAQS.map((faq) => (
                    <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-start">
                          <span>{faq.question}</span>
                          <Badge variant="outline" className="ml-2">{faq.category}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2">
                          <p className="text-muted-foreground">{faq.answer}</p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-muted-foreground">
                              Was this helpful?
                              <Button variant="ghost" size="sm" className="ml-2">
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button variant="link" className="text-sm flex items-center gap-1 p-0">
                              Read more
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>View All FAQs</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {VIDEOS.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative aspect-video bg-muted">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full bg-primary/90 p-3">
                            <Play className="h-6 w-6 text-white" fill="white" />
                          </div>
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black/70">
                          {video.duration}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{video.title}</h3>
                            <Badge variant="outline" className="mt-1">{video.category}</Badge>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Youtube className="h-5 w-5 text-red-600" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>View All Tutorials</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
                      <p className="text-muted-foreground mb-4">
                        Our support team is available 24/7 to help you with any questions or issues.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium">Name</label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium">Email</label>
                          <Input id="email" type="email" placeholder="Your email" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                          <Input id="subject" placeholder="How can we help?" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="block text-sm font-medium">Message</label>
                          <textarea 
                            id="message" 
                            rows={4} 
                            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Describe your issue or question in detail"
                          ></textarea>
                        </div>
                        <Button className="w-full">Submit Request</Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-6">
                      <h3 className="text-xl font-semibold mb-2">Other Ways to Reach Us</h3>
                      
                      <div className="space-y-6 mt-4">
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            Live Chat
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Chat with our support team in real-time, available Monday-Friday, 9AM-5PM ET.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Start Chat
                          </Button>
                        </div>
                        
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <Headphones className="h-4 w-4 text-primary" />
                            Phone Support
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Call our dedicated support line for urgent assistance.
                          </p>
                          <p className="font-medium mt-1">+1 (888) 123-4567</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <Video className="h-4 w-4 text-primary" />
                            Schedule a Demo
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Book a personalized demo with our product specialists.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Book Demo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport;
