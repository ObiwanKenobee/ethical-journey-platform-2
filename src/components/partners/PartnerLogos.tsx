
import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import AutoplayPlugin from 'embla-carousel-autoplay';

// Flatten all partners into a single array
const allPartners = [
  // NGOs & Social Impact Organizations
  { 
    name: "Human Trafficking Institute (HTI)", 
    initial: "HTI",
    logo: "../images.png",
    category: "NGO"
  },
  { 
    name: "Africa Uncensored", 
    initial: "AU",
    logo: "../africauncesnored.png",
    category: "NGO"
  },
  { 
    name: "Amnesty International", 
    initial: "A.I",
    logo: "../international.png",
    category: "NGO"
  },
  { 
    name: "Mercy Corps", 
    initial: "M.C",
    logo: "../mercycorps.jpeg",
    category: "NGO"
  },
  { 
    name: "Compassion International", 
    initial: "HTI",
    logo: "../CompassionInternationalLogo.png",
    category: "NGO"
  },
  { 
    name: "Slave-Free Alliance", 
    initial: "SFA",
    logo: "../slavealliance.jpeg",
    category: "NGO"
  },
  // Tech & Data Analytics Partners
  { 
    name: "Palantir Technologies", 
    initial: "PT",
    logo: "../palantir.jpg",
    category: "Tech"
  },
  { 
    name: "Ycombinator", 
    initial: "PT",
    logo: "../y-combinator.jpg",
    category: "Tech"
  },
  { 
    name: "Salesforce.org", 
    initial: "SF",
    logo: "../salesforce.jpg",
    category: "Tech"
  },
  { 
    name: "Snowflake", 
    initial: "SF",
    logo: "../snowflake.png",
    category: "Tech"
  },
  // Industry & Ethical Trade Alliances
  { 
    name: "Stronger Together", 
    initial: "ST",
    logo: "../strongertogether.jpeg",
    category: "Alliance"
  },
  { 
    name: "Sedex", 
    initial: "SDX",
    logo: "../sedex.png",
    category: "Alliance"
  },
  { 
    name: "Fair Trade International", 
    initial: "FTI",
    logo: "../fairtrade.jpg",
    category: "Alliance"
  },
  // Government & Intergovernmental Organizations
  { 
    name: "U.S. Department of Labor – ILAB", 
    initial: "DOL",
    logo: "../labor.png",
    category: "Gov"
  },
  { 
    name: "UK Home Office Modern Slavery Unit", 
    initial: "UK",
    logo: "../modern-slavery-image.jpg",
    category: "Gov"
  },
  { 
    name: "International Labour Organization", 
    initial: "ILO",
    logo: "../international.jpeg",
    category: "Gov"
  },
  // Corporate & Enterprise Partners
  { 
    name: "Patagonia", 
    initial: "PTG",
    logo: "../patagonia.gif",
    category: "Corporate"
  },
  { 
    name: "Unilever", 
    initial: "UL",
    logo: "../unilever.jpeg",
    category: "Corporate"
  },
  { 
    name: "Nestlé", 
    initial: "NST",
    logo: "../Nestle.png",
    category: "Corporate"
  }
];

// Separate component for partner logo cards with error handling
const PartnerLogoCard = ({ partner }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    console.log(`Failed to load image for ${partner.name}`);
    setImageError(true);
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="h-24 flex flex-col items-center justify-center p-3 glass group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              {!imageError ? (
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-center">
                  <span className="text-base font-semibold">{partner.initial || partner.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="p-2 z-50">
          <p className="font-medium">{partner.name}</p>
          <p className="text-xs text-muted-foreground">{partner.category}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const PartnerLogoCarousel = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Get screen size to determine slides to show
  const [slidesInView, setSlidesInView] = useState(5);
  
  // Configure autoplay plugin with loop enabled and slower speed
  const autoplayPlugin = React.useMemo(() => 
    AutoplayPlugin({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true, playOnInit: true }),
    []
  );
  
  const configureResponsiveView = useCallback(() => {
    if (window.innerWidth < 640) {
      setSlidesInView(2);
    } else if (window.innerWidth < 768) {
      setSlidesInView(3);
    } else if (window.innerWidth < 1024) {
      setSlidesInView(4);
    } else if (window.innerWidth < 1280) {
      setSlidesInView(5);
    } else {
      setSlidesInView(6);
    }
  }, []);

  useEffect(() => {
    // Set initial value
    configureResponsiveView();
    
    // Add resize event listener
    window.addEventListener('resize', configureResponsiveView);
    
    return () => {
      window.removeEventListener('resize', configureResponsiveView);
    };
  }, [configureResponsiveView]);
  
  return (
    <section ref={ref} className="py-16 bg-accent/5 overflow-hidden">
      <div className="container-tight">
        <h2 className="text-3xl font-bold text-center mb-8">Our Global Partners</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Atlas collaborates with leading organizations worldwide to build ethical, 
          transparent supply chains and combat modern slavery through technology and innovation.
        </p>
        
        <div className={cn(
          "transition-opacity duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Carousel
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              dragFree: true
            }}
            plugins={[autoplayPlugin]}
            className="w-full"
          >
            <CarouselContent>
              {allPartners.map((partner) => (
                <CarouselItem 
                  key={partner.name} 
                  className={`basis-1/${Math.min(slidesInView, 2)} sm:basis-1/${Math.min(slidesInView, 3)} md:basis-1/${Math.min(slidesInView, 4)} lg:basis-1/${Math.min(slidesInView, 6)}`}
                >
                  <PartnerLogoCard partner={partner} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="inline-flex gap-2">
            {['NGO', 'Tech', 'Alliance', 'Gov', 'Corporate'].map((category) => (
              <div key={category} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full bg-primary/70`}></span>
                <span className="text-xs text-muted-foreground">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogoCarousel;
