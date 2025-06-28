
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "Guardian-IO has transformed how we approach due diligence in our global supply chain. We've identified and remediated risks we didn't know existed.",
    name: "Sarah Johnson",
    title: "Chief Sustainability Officer",
    company: "Global Retail Corp"
  },
  {
    quote: "The platform's AI capabilities have saved us countless hours of manual assessment work, while simultaneously increasing the accuracy of our risk identification.",
    name: "Michael Chang",
    title: "Head of Procurement",
    company: "Tech Solutions Inc."
  },
  {
    quote: "Our investors and customers demand transparency. Guardian-IO helps us deliver it with confidence and authenticity.",
    name: "Priya Sharma",
    title: "ESG Director",
    company: "Eco Manufacturers"
  },
  {
    quote: "The ROI has been remarkable - we've reduced audit costs by 40% while expanding our visibility deeper into our supply chain than ever before.",
    name: "James Wilson",
    title: "COO",
    company: "Sustainable Apparel"
  }
];

const Testimonials = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container-tight">
        <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
        
        <div className={cn(
          "transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="glass-card h-full flex flex-col justify-between">
                    <p className="italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
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

export default Testimonials;
