
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Shield, Brain, BarChart3, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Risk Detection",
    description: "Our AI systems analyze millions of data points to detect risk patterns and ethical concerns in your supply chain with unprecedented accuracy and efficiency."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "ESG Compliance Dashboard",
    description: "Streamline compliance with regulations like the Modern Slavery Act, CSRD, and UN Sustainable Development Goals with automated reporting and real-time updates."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Real-time Supplier Monitoring",
    description: "From rapid supplier assessment to continuous monitoring, our platform provides end-to-end visibility of ethical practices across your entire value chain."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Interactive Global Supplier Maps",
    description: "Visualize hotspots of forced labor, environmental violations, and human rights issues across your global operations with precision and actionable insights."
  }
];

const FeaturesGrid = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-accent/30" ref={ref}>
      <div className="container-tight">
        <h2 className="text-3xl font-bold text-center mb-12">Next-Gen Features for Ethical Supply Chain Management</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card group hover:shadow-lg transition-all duration-500 transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
            >
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
