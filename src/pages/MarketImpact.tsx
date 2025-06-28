
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalImpactDashboard from '@/components/market-impact/GlobalImpactDashboard';
import MarketGrowthSection from '@/components/market-impact/MarketGrowthSection';
import RoiCalculator from '@/components/market-impact/RoiCalculator';
import ComplianceTools from '@/components/market-impact/ComplianceTools';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Shield, TrendingUp, DollarSign, FileCheck } from 'lucide-react';

const MarketImpact = () => {
  const [activeTab, setActiveTab] = useState<string>('impact');

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Market Impact | Guardian-IO | Ethical Supply Chain Intelligence</title>
        <meta name="description" content="Explore how Guardian-IO is revolutionizing ethical supply chains with AI and blockchain technology, delivering measurable impact through verified data and real-time compliance monitoring." />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Market Impact
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                Transforming Ethical Supply Chains with AI & Blockchain
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
                Guardian-IO is pioneering ethical supply chain transparency through our innovative 
                fusion of artificial intelligence, blockchain verification, and human intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="section bg-background pt-0">
          <div className="container-tight">
            <Tabs defaultValue="impact" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-muted/50 p-1">
                  <TabsTrigger value="impact" className="flex items-center gap-2 px-4 py-2">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Global Impact</span>
                  </TabsTrigger>
                  <TabsTrigger value="growth" className="flex items-center gap-2 px-4 py-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Market Growth</span>
                  </TabsTrigger>
                  <TabsTrigger value="roi" className="flex items-center gap-2 px-4 py-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="hidden sm:inline">ROI Calculator</span>
                  </TabsTrigger>
                  <TabsTrigger value="compliance" className="flex items-center gap-2 px-4 py-2">
                    <FileCheck className="h-4 w-4" />
                    <span className="hidden sm:inline">Compliance Tools</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="impact" className="space-y-8 mt-4">
                <GlobalImpactDashboard />
              </TabsContent>

              <TabsContent value="growth" className="space-y-8 mt-4">
                <MarketGrowthSection />
              </TabsContent>

              <TabsContent value="roi" className="space-y-8 mt-4">
                <RoiCalculator />
              </TabsContent>

              <TabsContent value="compliance" className="space-y-8 mt-4">
                <ComplianceTools />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MarketImpact;
