
import React from 'react';
import { Brain, Shield, BarChart3, Globe, Heart, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  problem?: string;
  solution?: string;
}

const FeatureCard = ({ icon, title, description, delay, problem, solution }: FeatureCardProps) => (
  <div 
    className="neo-card group hover:shadow-neo-sm transition-all duration-500 animate-fade-up" 
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-500">
      {title}
    </h3>
    <p className="text-muted-foreground mb-4">
      {description}
    </p>
    
    {(problem || solution) && (
      <div className="mt-4 pt-4 border-t border-border">
        {problem && (
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{problem}</p>
          </div>
        )}
        
        {solution && (
          <div className="flex items-start gap-2">
            <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{solution}</p>
          </div>
        )}
      </div>
    )}
  </div>
);

export default function Features() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Transparency",
      description: "Our AI systems analyze millions of data points to detect risk patterns and ethical concerns in your supply chain with unprecedented accuracy.",
      delay: 100,
      problem: "Traditional audits miss 71% of labor violations in complex supply chains",
      solution: "AI pattern recognition identifies hidden exploitation risks with 95% accuracy"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "ESG Compliance Reporting",
      description: "Streamline compliance with regulations like the Modern Slavery Act, CSRD, and UN Sustainable Development Goals with automated reporting.",
      delay: 200,
      problem: "Companies spend 230+ hours annually on fragmented ESG reporting",
      solution: "Reduce reporting time by 85% with our unified compliance dashboard"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Ethical Sourcing Solutions",
      description: "From rapid supplier assessment to continuous monitoring, our platform provides end-to-end visibility of ethical practices across your value chain.",
      delay: 300,
      problem: "62% of companies can't trace suppliers beyond tier 1 relationships",
      solution: "Map your entire supply network with our blockchain verification system"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Risk Mapping",
      description: "Visualize hotspots of forced labor, environmental violations, and human rights issues across your global operations with precision.",
      delay: 400,
      problem: "Human trafficking networks adapt rapidly to avoid detection",
      solution: "Real-time alerts on emerging exploitation trends in your supply regions"
    }
  ];

  return (
    <section className="section bg-background relative">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Human-Centered Technology for Human Rights
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe technology is most powerful when it amplifies human dignity. Our platform combines cutting-edge 
            AI with human expertise to transform how companies approach transparency and ethical sourcing.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
              problem={feature.problem}
              solution={feature.solution}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
