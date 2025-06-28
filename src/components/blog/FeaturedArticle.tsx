
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeaturedArticle = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container-tight">
        <div className={cn(
          "neo overflow-hidden rounded-xl transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="lg:grid lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto">
              <img 
                src="https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80" 
                alt="Featured article" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  ESG Compliance
                </span>
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  Featured
                </span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                The Future of ESG Reporting: How AI is Transforming Transparency
              </h2>
              
              <p className="text-muted-foreground mb-6">
                As new regulations like the Corporate Sustainability Reporting Directive come into force, 
                organizations are looking to AI to streamline compliance and gain deeper insights from their data.
              </p>
              
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <div className="flex items-center mr-4">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>May 12, 2023</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>8 min read</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <button className="flex items-center text-primary font-medium group">
                  Read full article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
