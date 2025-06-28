
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { 
  Users, GraduationCap, Leaf, Smile, 
  Sun, Rainbow, Handshake, Award
} from 'lucide-react';

const Workforce = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true });
  const { ref: programsRef, inView: programsInView } = useInView({ triggerOnce: true });
  const { ref: joinRef, inView: joinInView } = useInView({ triggerOnce: true });

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Next Generation Workforce | Marvel Avengers</title>
        <meta 
          name="description" 
          content="Join Marvel Avengers in building the next generation of ethical workers. Together, we can create a world where human dignity and sustainable practices are the foundation of global supply chains." 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          ref={heroRef} 
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-primary/5"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-utopian/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-harmony/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-tight relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className={cn(
                "transition-all duration-700 transform",
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                <div className="inline-flex items-center justify-center gap-2 p-2 px-4 rounded-full bg-primary/10 mb-6">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Empower the Next Generation</span>
                </div>
              </div>
              
              <h1 className={cn(
                "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 transition-all duration-700 transform",
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Building the <span className="text-gradient">Ethical Workforce</span> of Tomorrow
              </h1>
              
              <p className={cn(
                "text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-700 transform",
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )} style={{ transitionDelay: '100ms' }}>
                Join Marvel Avengers in creating a globally connected workforce focused on dignity, ethical supply chains, and 
                sustainable practices. Together, we're designing the future of work.
              </p>
              
              <div className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 transform",
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )} style={{ transitionDelay: '200ms' }}>
                <Button className="utopian-btn" size="lg">
                  Join Our Workforce
                </Button>
                <Button className="harmony-btn" size="lg">
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section ref={statsRef} className="section bg-accent/10">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Growing Global Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our workforce initiatives are creating opportunities and transforming lives across the globe.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, value: "5,000+", label: "Workers Empowered", delay: 0 },
                { icon: Leaf, value: "72%", label: "Sustainable Practices", delay: 100 },
                { icon: Handshake, value: "35", label: "Countries Reached", delay: 200 },
                { icon: Sun, value: "94%", label: "Worker Satisfaction", delay: 300 }
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "utopian-card text-center group transition-all duration-700 transform",
                    statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${stat.delay}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:scale-110 transition-transform">
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold mb-2 text-gradient">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Programs Section */}
        <section ref={programsRef} className="section">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Workforce Programs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the various paths to join our global collective of ethical supply chain experts.
              </p>
            </div>
            
            <Tabs defaultValue="training" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 max-w-xl mx-auto">
                <TabsTrigger value="training" className="text-foreground">Training</TabsTrigger>
                <TabsTrigger value="certification" className="text-foreground">Certification</TabsTrigger>
                <TabsTrigger value="employment" className="text-foreground">Employment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="training" className="border-0 p-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Ethical Supply Basics",
                      icon: GraduationCap,
                      duration: "4 weeks",
                      difficulty: "Beginner",
                      progress: 75,
                      description: "Learn the fundamentals of ethical supply chain management and modern slavery prevention."
                    },
                    {
                      title: "Field Investigator Training",
                      icon: Users,
                      duration: "8 weeks",
                      difficulty: "Intermediate",
                      progress: 60,
                      description: "Develop skills to identify and document potential labor rights violations in the field."
                    },
                    {
                      title: "Advanced Data Analysis",
                      icon: Award,
                      duration: "6 weeks",
                      difficulty: "Advanced",
                      progress: 40,
                      description: "Master the techniques for analyzing supply chain data to detect ethical breaches and risks."
                    }
                  ].map((program, idx) => (
                    <div 
                      key={idx}
                      className={cn(
                        "harmony-card group transition-all duration-700 transform flex flex-col",
                        programsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-harmony/20 text-harmony-dark">
                          <program.icon className="h-6 w-6" />
                        </div>
                        <div className="text-sm px-3 py-1 bg-harmony/10 rounded-full text-harmony-dark">
                          {program.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{program.description}</p>
                      
                      <div className="mt-auto">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="text-primary">{program.progress}%</span>
                        </div>
                        <Progress value={program.progress} className="h-2 mb-4" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{program.duration}</span>
                          <Button variant="outline" size="sm" className="rounded-full">Enroll Now</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="certification" className="border-0 p-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Certified Ethics Analyst",
                      icon: Award,
                      duration: "3 months",
                      description: "Become a recognized expert in analyzing and improving ethical standards across supply chains."
                    },
                    {
                      title: "Supply Chain Auditor",
                      icon: Smile,
                      duration: "4 months",
                      description: "Learn to perform comprehensive ethical audits of complex global supply networks."
                    },
                    {
                      title: "Human Rights Specialist",
                      icon: Rainbow,
                      duration: "6 months",
                      description: "Specialize in the human rights aspects of global trade and manufacturing."
                    }
                  ].map((cert, idx) => (
                    <div 
                      key={idx}
                      className={cn(
                        "utopian-card transition-all duration-700 transform",
                        programsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-utopian/20 text-utopian-dark">
                        <cert.icon className="h-6 w-6" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                      <p className="text-muted-foreground mb-4">{cert.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Duration: {cert.duration}</span>
                        <Button variant="outline" size="sm" className="rounded-full">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="employment" className="border-0 p-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Field Investigator",
                      location: "Multiple Locations",
                      type: "Full-time",
                      description: "Join our global team of investigators who verify ethical compliance through on-site visits and interviews."
                    },
                    {
                      title: "Supply Chain Analyst",
                      location: "Remote",
                      type: "Full-time",
                      description: "Analyze supply chain data to identify risks and recommend improvements for ethical sourcing."
                    },
                    {
                      title: "Community Educator",
                      location: "Regional Hubs",
                      type: "Part-time",
                      description: "Educate local communities about their rights and how to report labor violations."
                    },
                    {
                      title: "Technology Developer",
                      location: "Remote",
                      type: "Contract",
                      description: "Help build the next generation of tools for tracking and verifying ethical supply chains."
                    }
                  ].map((job, idx) => (
                    <div 
                      key={idx}
                      className={cn(
                        "neo-card group transition-all duration-700 transform",
                        programsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <div className="flex gap-2">
                          <span className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        📍 {job.location}
                      </p>
                      
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      
                      <Button className="w-full">View Position</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Join Form Section */}
        <section ref={joinRef} className="section bg-gradient-to-br from-primary/5 to-harmony/5">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
              <div className={cn(
                "transition-all duration-700 transform",
                joinInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}>
                <h2 className="text-3xl font-bold mb-4">Join Our Global Mission</h2>
                <p className="text-muted-foreground mb-6">
                  Whether you're a recent graduate or an experienced professional, there's a place for you in our global 
                  movement to transform supply chains and protect human dignity.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-utopian/20 text-utopian-dark mt-1">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Continuous Learning</h3>
                      <p className="text-sm text-muted-foreground">
                        Access ongoing education and skill development opportunities in ethical supply chain management.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-harmony/20 text-harmony-dark mt-1">
                      <Handshake className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Global Community</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with like-minded professionals from diverse backgrounds across the world.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-utopian/20 text-utopian-dark mt-1">
                      <Sun className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Meaningful Impact</h3>
                      <p className="text-sm text-muted-foreground">
                        Make a tangible difference in the lives of vulnerable workers around the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "utopian-card transition-all duration-700 transform",
                joinInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              )}>
                <h3 className="text-xl font-bold mb-4">Express Interest</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Enter last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interest">Area of Interest</Label>
                    <select id="interest" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <option value="" disabled>Select area of interest</option>
                      <option value="training">Training Programs</option>
                      <option value="certification">Certification</option>
                      <option value="employment">Employment</option>
                      <option value="partnership">Corporate Partnership</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <textarea 
                      id="message" 
                      rows={3} 
                      placeholder="Tell us about your background and interest in Marvel Avengers"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full utopian-btn">Submit Application</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="section">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Voices from Our Global Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from those who are already making a difference in our worldwide workforce.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Elena Rodriguez",
                  role: "Field Investigator",
                  location: "Colombia",
                  quote: "Working with Marvel Avengers has given me the tools to protect vulnerable workers in my region. I've seen real change in how companies operate after our interventions."
                },
                {
                  name: "Kwame Osei",
                  role: "Supply Chain Analyst",
                  location: "Ghana",
                  quote: "The training I received was world-class, and now I'm helping businesses across West Africa implement ethical practices while growing their operations."
                },
                {
                  name: "Sarah Chen",
                  role: "Community Educator",
                  location: "Malaysia",
                  quote: "From teaching workers about their rights to helping companies implement better practices, every day brings new challenges and rewards."
                }
              ].map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="harmony-card flex flex-col"
                >
                  <div className="mb-4">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15H7.5C6.12 15 5 16.12 5 17.5V20H7.5V22.5H12.5V15H12ZM10.75 20H7.5V17.5H10.75V20Z" fill="currentColor" className="text-harmony" />
                      <path d="M22.5 15H18C16.62 15 15.5 16.12 15.5 17.5V20H18V22.5H23V15H22.5ZM21.25 20H18V17.5H21.25V20Z" fill="currentColor" className="text-harmony" />
                      <path d="M17.5 12.5C18.88 12.5 20 11.38 20 10C20 8.62 18.88 7.5 17.5 7.5C16.12 7.5 15 8.62 15 10C15 11.38 16.12 12.5 17.5 12.5Z" fill="currentColor" className="text-harmony" />
                      <path d="M10 12.5C11.38 12.5 12.5 11.38 12.5 10C12.5 8.62 11.38 7.5 10 7.5C8.62 7.5 7.5 8.62 7.5 10C7.5 11.38 8.62 12.5 10 12.5Z" fill="currentColor" className="text-harmony" />
                    </svg>
                  </div>
                  
                  <p className="text-muted-foreground italic mb-6 flex-grow">{testimonial.quote}</p>
                  
                  <div className="mt-auto">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Workforce;
