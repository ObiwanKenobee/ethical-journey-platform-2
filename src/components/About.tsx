
import React from 'react';
import { Shield, Heart, Globe, Fingerprint, Brain, Zap, Users, Target } from 'lucide-react';

// Enhanced impact stats reflecting super-level tech company status
const stats = [
  { value: "500+", label: "Enterprise Partners", icon: <Shield className="h-5 w-5" /> },
  { value: "250M+", label: "Workers Protected", icon: <Heart className="h-5 w-5" /> },
  { value: "120", label: "Countries Active", icon: <Globe className="h-5 w-5" /> },
  { value: "99.2%", label: "AI Accuracy Rate", icon: <Brain className="h-5 w-5" /> },
  { value: "50B+", label: "Blockchain Transactions", icon: <Fingerprint className="h-5 w-5" /> },
  { value: "98%", label: "Risk Prevention", icon: <Zap className="h-5 w-5" /> },
  { value: "10K+", label: "Data Scientists", icon: <Users className="h-5 w-5" /> },
  { value: "$2.5T", label: "Supply Chain Value", icon: <Target className="h-5 w-5" /> }
];

export default function About() {
  return (
    <section className="section bg-accent/30" id="about">
      <div className="container-tight">
        {/* Vision Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-up">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Super-Level Technology Company
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Atlas: The Global Operating System for Ethical Supply Chains
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Atlas has evolved into the world's most comprehensive platform for supply chain ethics, powered by 
            advanced AI, blockchain infrastructure, and human intelligence networks. We've transformed from a 
            compliance tool into the global standard for protecting human dignity in commerce—serving enterprises, 
            governments, NGOs, and workers across every industry and continent.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="glass-card animate-fade-up text-left">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                AI-First Architecture
              </h3>
              <p className="text-muted-foreground">
                Our neural networks process billions of data points in real-time, predicting and preventing 
                human rights violations before they occur. With 99.2% accuracy, our AI has become the gold 
                standard for ethical intelligence.
              </p>
            </div>
            
            <div className="glass-card animate-fade-up text-left" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Fingerprint className="h-6 w-6 text-primary" />
                Blockchain Infrastructure
              </h3>
              <p className="text-muted-foreground">
                Every audit, worker voice, and compliance record is immutably stored on our proprietary 
                blockchain, creating an unbreakable chain of trust that spans the entire global economy.
              </p>
            </div>
            
            <div className="glass-card animate-fade-up text-left" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Worker Protection Network
              </h3>
              <p className="text-muted-foreground">
                Direct channels connecting 250M+ workers to support systems, grievance mechanisms, and 
                protection services, ensuring every voice is heard and every concern is addressed.
              </p>
            </div>
            
            <div className="glass-card animate-fade-up text-left" style={{ animationDelay: '300ms' }}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Global Integration Hub
              </h3>
              <p className="text-muted-foreground">
                Seamlessly integrates with every major ERP, CRM, and compliance system, creating a 
                unified ecosystem where ethical practices become the backbone of global commerce.
              </p>
            </div>
          </div>
        </div>
        
        {/* Enhanced Impact Stats */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-12 animate-fade-up">Transforming Global Commerce</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="glass-card text-center animate-fade-up group hover:shadow-glass-md transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2 text-gradient">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Leadership Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8">Leading the Future of Ethical Technology</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card">
              <div className="text-3xl mb-4">🏆</div>
              <h4 className="font-bold mb-2">Industry Awards</h4>
              <p className="text-sm text-muted-foreground">
                Recognized by the UN, World Economic Forum, and Fortune 500 as the definitive 
                platform for supply chain ethics and human rights protection.
              </p>
            </div>
            
            <div className="glass-card">
              <div className="text-3xl mb-4">🚀</div>
              <h4 className="font-bold mb-2">Innovation Engine</h4>
              <p className="text-sm text-muted-foreground">
                Over 10,000 data scientists, engineers, and human rights experts continuously 
                advancing the frontiers of ethical AI and blockchain technology.
              </p>
            </div>
            
            <div className="glass-card">
              <div className="text-3xl mb-4">🌍</div>
              <h4 className="font-bold mb-2">Global Impact</h4>
              <p className="text-sm text-muted-foreground">
                Operating in 120 countries with $2.5T in supply chain value under protection, 
                making Atlas the largest ethical commerce platform in human history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
