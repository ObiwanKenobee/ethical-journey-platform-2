
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingTiers from '@/components/pricing/PricingTiers';
import PricingFaq from '@/components/pricing/PricingFaq';
import ValueProposition from '@/components/pricing/ValueProposition';
import UserTypePricing from '@/components/pricing/UserTypePricing';
import ComparisonTable from '@/components/pricing/ComparisonTable';
import PricingIntro from '@/components/pricing/PricingIntro';
import { Helmet } from 'react-helmet-async';
import { Heart, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Pricing = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Invest in Integrity: Flexible Plans for Every Organization | Marvel Avengers</title>
        <meta name="description" content="Flexible, scalable pricing plans designed to make ethical supply chains accessible to businesses of all sizes. Start making meaningful impact today." />
        <meta name="keywords" content="Marvel Avengers pricing plans, cost of ethical supply chain management, invest in supply chain transparency, ESG risk management" />
        <link rel="canonical" href="https://marvel-avengers.com/pricing" />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20 py-12 md:py-20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Pricing
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-up">
                Invest in Integrity: Flexible Plans for Every Organization
              </h1>
              <p className="text-base md:text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
                Our pricing is designed with a simple principle: making ethical supply chains accessible to 
                businesses of all sizes, because human rights shouldn't be a premium feature.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparent</h3>
                <p className="text-muted-foreground">
                  No hidden fees, no surprise charges. We believe transparency starts with us.
                </p>
              </div>
              
              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Scalable</h3>
                <p className="text-muted-foreground">
                  Start small and grow with confidence. Our platform scales with your impact goals.
                </p>
              </div>
              
              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Impactful</h3>
                <p className="text-muted-foreground">
                  A portion of every subscription directly funds our worker voice programs in vulnerable communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Introduction */}
        <PricingIntro />

        {/* Pricing Tiers */}
        <PricingTiers />

        {/* User Type Pricing */}
        <UserTypePricing />
        
        {/* Impact Investment Section */}
        <section className="section bg-accent/20 py-12 md:py-20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Beyond Business: The True ROI</h2>
              <p className="text-base md:text-lg text-muted-foreground">
                When you subscribe to Guardian-IO, you're not just purchasing software—you're investing in a world 
                where business is a force for human dignity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="glass-card">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">For Your Business</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Reduce risk of reputational damage and legal liability from forced labor in your supply chain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Meet and exceed increasingly stringent human rights due diligence requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Build consumer trust through verified ethical claims that differentiate your brand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Attract and retain mission-driven talent who seek purposeful work</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass-card">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">For Our World</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Help identify and free workers trapped in modern slavery conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Create market incentives that reward ethical manufacturers and punish exploitative ones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Fund direct support for vulnerable communities through our 5% revenue pledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Build momentum toward a tipping point where ethical supply chains become the norm</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Value Proposition */}
        <ValueProposition />
        
        {/* FAQ */}
        <PricingFaq />
        
        {/* CTA Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20 py-12 md:py-20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                Join hundreds of forward-thinking organizations already using Marvel Avengers to create more ethical, 
                transparent supply chains.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size={isMobile ? "default" : "lg"} className="w-full sm:w-auto">
                  <Link to="/join">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
