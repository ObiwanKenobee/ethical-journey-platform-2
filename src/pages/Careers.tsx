
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { jobService } from '@/services/job.service';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

const departments = [
  "All",
  "Engineering",
  "Data Science",
  "Product",
  "Design",
  "Marketing",
  "Customer Success",
  "HR",
  "Operations",
  "Legal",
];

const Careers: React.FC = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote (Global)",
      type: "Full-time",
      description: "Join our engineering team to build products that help eradicate modern slavery in global supply chains. You'll work on our core platform using React, TypeScript, and modern web technologies.",
      requirements: [
        "5+ years of experience with React and modern JavaScript",
        "Experience with TypeScript, TailwindCSS and state management libraries",
        "Strong understanding of web performance optimization",
        "Experience building accessible web applications",
        "Passion for human rights and social impact"
      ],
      postedDate: "2025-04-15"
    },
    {
      id: "2",
      title: "Data Scientist - Risk Modeling",
      department: "Data Science",
      location: "Remote (US/Canada)",
      type: "Full-time",
      description: "Help build our risk detection models that identify patterns of forced labor in complex global supply chains. Your work will directly contribute to freeing people from modern slavery.",
      requirements: [
        "MS or PhD in Computer Science, Statistics, or related field",
        "3+ years experience in machine learning and risk modeling",
        "Experience with Python, TensorFlow, and SQL",
        "Understanding of NLP techniques",
        "Interest in applying AI for social good"
      ],
      postedDate: "2025-04-18"
    },
    {
      id: "3",
      title: "Supply Chain Transparency Specialist",
      department: "Operations",
      location: "London, UK",
      type: "Full-time",
      description: "Use your expertise in global supply chains to help our customers map and understand their entire supplier network, with a focus on identifying and remediating human rights risks.",
      requirements: [
        "5+ years experience in supply chain management or compliance",
        "Understanding of global labor standards and compliance frameworks",
        "Experience with supply chain mapping and risk assessment",
        "Excellent communication and client management skills",
        "Languages beyond English a plus (esp. Mandarin, Spanish, Vietnamese)"
      ],
      postedDate: "2025-04-20"
    },
    {
      id: "4",
      title: "Product Manager - Enterprise Solutions",
      department: "Product",
      location: "New York, US",
      type: "Full-time",
      description: "Lead our enterprise product strategy to help Fortune 500 companies eliminate forced labor from their supply chains. Work with cross-functional teams to deliver features that matter.",
      requirements: [
        "5+ years of product management experience",
        "Experience with enterprise SaaS products",
        "Strategic thinking and strong prioritization skills",
        "Experience working with engineering, design, and business stakeholders",
        "Passion for creating products with positive social impact"
      ],
      postedDate: "2025-04-25"
    }
  ]);

  // Filter jobs based on department and search query
  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDepartment && matchesSearch;
  });

  // Display job posting date in a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days ago from posting date
  const getDaysAgo = (dateString: string) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - postedDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  const handleApply = async (jobId: string) => {
    setIsLoading(true);
    try {
      await jobService.applyForJob(jobId);
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest! We'll be in touch soon.",
      });
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Join Our Mission to End Modern Slavery | Careers at Vought International</title>
        <meta name="description" content="Build a career with purpose at Vought International. Join our global team working to eradicate modern slavery through technology, innovation, and collaboration." />
        <meta name="keywords" content="ethical tech careers, social impact jobs, Vought International careers, anti-slavery technology jobs, purpose-driven tech company" />
        <link rel="canonical" href="https://vought-international.com/careers" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-accent/20 py-20">
          <div className="container-tight text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Build a <span className="text-gradient">Career With Purpose</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our global team on a mission to eradicate modern slavery through technology, innovation, and collaboration.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#openings" className="btn-primary">View Open Positions</a>
              <a href="#values" className="btn-outline">Our Values</a>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16" id="values">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Vought International</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4">Real-World Impact</h3>
                <p className="text-muted-foreground">
                  Your work will directly contribute to protecting vulnerable workers globally. Every feature you build has the potential to free people from forced labor.
                </p>
              </div>
              
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4">Innovation at Scale</h3>
                <p className="text-muted-foreground">
                  We're solving complex problems with cutting-edge technology. Work with AI, blockchain, and data science to create solutions that scale globally.
                </p>
              </div>
              
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4">Global Flexibility</h3>
                <p className="text-muted-foreground">
                  We have team members in over 20 countries. Whether you prefer remote work or one of our hub offices, we support flexible working arrangements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-accent/10" id="openings">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join our diverse team of technologists, human rights experts, and business leaders working to create a world without modern slavery.
            </p>
            
            <div className="mb-8">
              <div className="flex flex-col md:flex-row mb-6 gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search positions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Tabs defaultValue="All" className="w-full md:w-auto">
                  <TabsList className="w-full md:w-auto overflow-x-auto flex whitespace-nowrap px-1">
                    {departments.map(dept => (
                      <TabsTrigger 
                        key={dept} 
                        value={dept}
                        onClick={() => setSelectedDepartment(dept)}
                        className="px-4"
                      >
                        {dept}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Job Listings */}
              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div key={job.id} className="glass-card hover:shadow-lg transition-all">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="badge badge-outline">{job.department}</span>
                            <span className="badge badge-outline">{job.location}</span>
                            <span className="badge badge-outline">{job.type}</span>
                            <span className="badge badge-outline">{getDaysAgo(job.postedDate)}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:min-w-[120px]">
                          <Button onClick={() => handleApply(job.id)} disabled={isLoading}>
                            Apply Now
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-muted-foreground mb-4">{job.description}</p>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 text-muted-foreground">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-xl">No positions found matching your criteria</p>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or department filter</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">JP</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Jane Park</h3>
                <p className="text-sm text-muted-foreground mb-4">Engineering Director, Seattle</p>
                <p className="italic">
                  "I've worked at big tech companies before, but nothing compares to seeing your code directly impact human lives. The technical challenges are immense, but so is the reward."
                </p>
              </div>
              
              <div className="glass-card text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">MO</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Malik Omar</h3>
                <p className="text-sm text-muted-foreground mb-4">Data Scientist, Remote (Kenya)</p>
                <p className="italic">
                  "Working remotely from Nairobi hasn't held me back at all. If anything, my proximity to supply chains in Africa has made my contributions even more valuable to our global team."
                </p>
              </div>
              
              <div className="glass-card text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">LZ</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Lin Zhao</h3>
                <p className="text-sm text-muted-foreground mb-4">Product Manager, New York</p>
                <p className="italic">
                  "The most exciting part of working here is the collaboration between tech experts and human rights professionals. It creates a unique culture where innovation meets real-world impact."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-accent/10">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits and Perks</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="glass-card text-center py-6 px-4">
                <h3 className="text-lg font-semibold mb-2">Competitive Salary</h3>
                <p className="text-sm text-muted-foreground">Market-competitive compensation globally</p>
              </div>
              
              <div className="glass-card text-center py-6 px-4">
                <h3 className="text-lg font-semibold mb-2">Flexible Work</h3>
                <p className="text-sm text-muted-foreground">Remote-first with flexible hours</p>
              </div>
              
              <div className="glass-card text-center py-6 px-4">
                <h3 className="text-lg font-semibold mb-2">Learning Budget</h3>
                <p className="text-sm text-muted-foreground">Annual budget for courses and conferences</p>
              </div>
              
              <div className="glass-card text-center py-6 px-4">
                <h3 className="text-lg font-semibold mb-2">Health & Wellness</h3>
                <p className="text-sm text-muted-foreground">Comprehensive health benefits</p>
              </div>
              
              <div className="glass-card text-center py-6 px-4">
                <h3 className="text-lg font-semibold mb-2">4-Day Work Week</h3>
                <p className="text-sm text-muted-foreground">We work 32 hours across 4 days</p>
              </div>
              
              <div className="glass-card text-center py-6 px-4">
                <h3 className="text-lg font-semibold mb-2">Sabbatical</h3>
                <p className="text-sm text-muted-foreground">3-month paid sabbatical after 3 years</p>
              </div>
              
              <div className="glass-card text-center py-6 px-4">
                <h3 className="text-lg font-semibold mb-2">Equity</h3>
                <p className="text-sm text-muted-foreground">All employees receive equity options</p>
              </div>
              
              <div className="glass-card text-center py-6 px-4">
                <h3 className="text-lg font-semibold mb-2">Volunteer Time</h3>
                <p className="text-sm text-muted-foreground">Paid time for volunteering</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container-tight text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See the Right Position?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We're always looking for talented people passionate about our mission. Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button size="lg" asChild>
              <a href="mailto:careers@vought-international.com">Contact Our Recruiting Team</a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
