
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const caseStudies = [
  {
    title: "Eliminating Forced Labor in Textile Supply Chains",
    industry: "Apparel",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    description: "Helping a global fashion brand identify and remediate forced labor risks in their tier 2 and 3 suppliers.",
    results: "32 high-risk suppliers identified, 100% remediated within 12 months, 15,000+ workers protected."
  },
  {
    title: "Improving Ethical Sourcing in Food Production",
    industry: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1453956755457-7e575a01c440?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    description: "Working with a multinational food company to ensure ethical sourcing of agricultural products.",
    results: "Increased supplier compliance from 43% to 87%, reduced audit costs by 35%, improved farmer livelihoods."
  },
  {
    title: "Creating End-to-End Transparency in Electronics",
    industry: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    description: "Providing complete visibility into a tech company's complex supply chain across 14 countries.",
    results: "Complete mapping of 312 suppliers, 28 critical risks identified and addressed, 97% compliance achievement."
  },
  {
    title: "Sustainable Mining Practices Verification",
    industry: "Mining",
    image: "https://images.unsplash.com/photo-1601650267207-1755b378957d?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&q=80",
    description: "Implementing blockchain verification for ethically sourced minerals in consumer electronics.",
    results: "100% verification of conflict-free materials, 62% reduction in verification time, increased consumer trust."
  }
];

const CaseStudies = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-accent/30" ref={ref}>
      <div className="container-tight">
        <h2 className="text-3xl font-bold text-center mb-12">Case Studies</h2>
        
        <div className={cn(
          "transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Carousel className="w-full">
            <CarouselContent>
              {caseStudies.map((study, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="neo-card h-full group overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden rounded-t-xl mb-4">
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                          {study.industry}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                      <p className="text-muted-foreground mb-3">{study.description}</p>
                      <h4 className="text-sm font-semibold mb-2">Results:</h4>
                      <p className="text-sm text-muted-foreground">{study.results}</p>
                      
                      <button className="mt-4 text-primary font-medium text-sm flex items-center group-hover:text-primary group-hover:underline">
                        Read full case study
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mr-2 translate-y-0 left-0" />
              <CarouselNext className="relative static ml-2 translate-y-0 right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
