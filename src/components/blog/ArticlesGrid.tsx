
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Understanding the Modern Slavery Act: A Guide for Businesses",
    excerpt: "A comprehensive breakdown of compliance requirements and best practices for the Modern Slavery Act.",
    date: "April 28, 2023",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    categories: ["Compliance", "Legal"]
  },
  {
    id: 2,
    title: "Blockchain in Supply Chain: Beyond the Hype",
    excerpt: "Exploring practical applications of blockchain technology for supply chain transparency and verification.",
    date: "April 15, 2023",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    categories: ["Technology", "Blockchain"]
  },
  {
    id: 3,
    title: "The ROI of Ethical Supply Chains",
    excerpt: "How investments in supply chain ethics translate to tangible business benefits and competitive advantage.",
    date: "March 30, 2023",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    categories: ["Business", "ESG"]
  },
  {
    id: 4,
    title: "Supply Chain Resilience in Uncertain Times",
    excerpt: "Strategies for building adaptable, risk-resistant supply chains that withstand global disruptions.",
    date: "March 22, 2023",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    categories: ["Risk Management", "Strategy"]
  },
  {
    id: 5,
    title: "From Compliance to Commitment: Evolving Your ESG Strategy",
    excerpt: "Moving beyond checkbox compliance to create authentic environmental and social impact.",
    date: "March 15, 2023",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1623265300797-4a3541e29a60?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    categories: ["ESG", "Strategy"]
  },
  {
    id: 6,
    title: "AI Ethics: Ensuring Responsible Use in Supply Chain Monitoring",
    excerpt: "Balancing powerful AI capabilities with ethical considerations in automated supply chain oversight.",
    date: "March 8, 2023",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    categories: ["Technology", "AI", "Ethics"]
  },
  {
    id: 7,
    title: "Ant Trafficking Bust in Nairobi",
    excerpt: "Kenyan authorities arrested four men in April 2025 for smuggling thousands of Giant African Harvester Ants, highlighting the growing issue of biopiracy and the need for advanced monitoring in wildlife trafficking.",
    date: "April 24, 2025",
    readTime: "8 min",
    image: "../ant.jpg",
    categories: ["Wildlife", "Crime", "Conservation"]
},
 
];

// Available categories for filtering
const categories = [
  "All",
  "ESG",
  "Technology",
  "Compliance",
  "Risk Management",
  "Business",
  "Strategy"
];

const ArticlesGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || 
                            post.categories.includes(activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section bg-accent/30" ref={ref}>
      <div className="container-tight">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Articles</h2>
          
          <div className={cn(
            "max-w-md mx-auto mb-8 transition-all duration-700 transform",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className={cn(
            "transition-all duration-700 transform",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category}
                    value={category}
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                {filteredPosts.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                      <div 
                        key={post.id}
                        className={cn(
                          "neo-card group overflow-hidden transition-all duration-500 transform",
                          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        )}
                        style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
                      >
                        <div className="aspect-video w-full overflow-hidden mb-4">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                          />
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category, idx) => (
                            <span 
                              key={idx}
                              className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                        
                        <div className="flex items-center text-xs text-muted-foreground mb-4">
                          <div className="flex items-center mr-3">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{post.readTime} read</span>
                          </div>
                        </div>
                        
                        <button className="text-sm text-primary font-medium flex items-center group-hover:text-primary group-hover:underline">
                          Read article
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className={cn(
          "text-center transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesGrid;
