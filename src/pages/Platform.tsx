
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturesGrid from '@/components/platform/FeaturesGrid';
import Testimonials from '@/components/platform/Testimonials';
import GlobalSupplyChainMap from '@/components/platform/GlobalSupplyChainMap';
import { Shield, Database, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Platform = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Revolutionizing Supply Chain Management with Cutting-Edge Technology | Marvel Avengers</title>
        <meta name="description" content="Marvel Avengers' AI and blockchain platform brings unprecedented transparency to global supply chains, helping companies eliminate forced labor and protect human rights." />
        <meta name="keywords" content="AI-Powered Supply Chain Platform, Blockchain for Ethical Sourcing, Marvel Avengers Compliance Tools, real-time supply chain monitoring, interactive global supplier maps" />
        <link rel="canonical" href="https://marvel-avengers.com/platform" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Marvel Avengers Platform",
              "description": "AI and blockchain platform for ethical supply chain management and modern slavery compliance",
              "brand": {
                "@type": "Brand",
                "name": "Marvel Avengers"
              },
              "category": "Business Software"
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Platform
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                Revolutionizing Supply Chain Management with Cutting-Edge Technology
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
                In a world where 71% of companies believe there is slavery in their supply chains but only 20% are 
                confident they can find it, Marvel Avengers provides the clarity needed to take meaningful action.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="glass-card group hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Risk Detection</h3>
                <p className="text-muted-foreground">
                  Our algorithms analyze millions of data points to detect forced labor risk patterns others miss, 
                  from unusual production surges to geographic red flags.
                </p>
              </div>
              
              <div className="glass-card group hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Blockchain Verification</h3>
                <p className="text-muted-foreground">
                  Blockchain technology ensures that every audit, certification, and labor practice record 
                  cannot be altered, creating trust through unchangeable transparency.
                </p>
              </div>
              
              <div className="glass-card group hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Human Intelligence</h3>
                <p className="text-muted-foreground">
                  Technology alone isn't enough. Our platform connects with on-the-ground auditors and 
                  worker voice channels to verify conditions with those who experience them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Supply Chain Map */}
        <GlobalSupplyChainMap />

        {/* Features Grid */}
        <FeaturesGrid />

        {/* How It Works Section */}
        <section className="section bg-background">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-center mb-12">Next-Gen Features for Ethical Supply Chain Management</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="glass-card flex-1">
                <h3 className="text-2xl font-semibold mb-4">For Brands & Retailers</h3>
                <p className="mb-4">
                  Connect your existing supplier data, import third-party audit reports, and watch as our AI builds a 
                  comprehensive map of your entire supply network—including the tiers most companies never see.
                </p>
                <p>
                  Receive real-time alerts when risk patterns emerge, generate compliance reports with a single click, 
                  and demonstrate to consumers and regulators that your ethical claims are backed by data.
                </p>
              </div>
              
              <div className="glass-card flex-1">
                <h3 className="text-2xl font-semibold mb-4">For Suppliers & Manufacturers</h3>
                <p className="mb-4">
                  Streamline multiple brand compliance requirements into a single, secure platform that reduces audit 
                  fatigue and showcases your commitment to ethical practices.
                </p>
                <p>
                  Differentiate your business by proving ethical credentials that can't be fabricated, opening doors 
                  to premium brands and markets that prioritize human rights in their sourcing decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Platform;
