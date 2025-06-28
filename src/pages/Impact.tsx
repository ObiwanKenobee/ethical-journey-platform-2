
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectLocationsMap from '@/components/impact/ProjectLocationsMap';
import CaseStudies from '@/components/impact/CaseStudies';
import PartnerLogoCarousel from '@/components/partners/PartnerLogos';
import { Helmet } from 'react-helmet-async';
import { Shield, Users, FileText, BarChart } from 'lucide-react';

const Impact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Driving Global Change: Our Impact in Numbers | Guardian-IO</title>
        <meta name="description" content="See the tangible difference Guardian-IO is making in fighting modern slavery and creating transparent, ethical supply chains across industries and regions worldwide." />
        <meta name="keywords" content="Guardian-IO global impact, success stories in ethical supply chains, measuring modern slavery prevention, corporate social responsibility tech" />
        <link rel="canonical" href="https://guardian-io.com/impact" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Driving Global Change: Our Impact | Guardian-IO",
              "description": "See the tangible difference Guardian-IO is making in fighting modern slavery and creating ethical supply chains across industries and regions worldwide.",
              "mainEntity": {
                "@type": "Article",
                "headline": "Turning Transparency Into Freedom",
                "description": "How Guardian-IO is transforming visibility into tangible freedom for workers worldwide through AI and blockchain technology.",
                "author": {
                  "@type": "Organization",
                  "name": "Guardian-IO"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Guardian-IO",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://guardian-io.com/logo.png"
                  }
                }
              }
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
                Our Impact
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                Driving Global Change: Our Impact in Numbers
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
                Technology alone doesn't end exploitation—action does. Here's how Guardian-IO is transforming 
                visibility into tangible freedom for workers worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Key Impact Metrics */}
        <section className="section bg-background">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-center mb-12">The Difference We're Making</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">3,218</div>
                <p className="text-sm text-muted-foreground">Workers freed from forced labor conditions</p>
              </div>
              
              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">487</div>
                <p className="text-sm text-muted-foreground">Exploitation cases reported through our platform</p>
              </div>
              
              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">24</div>
                <p className="text-sm text-muted-foreground">Policy changes influenced by our data</p>
              </div>
              
              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <BarChart className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">$4.2M</div>
                <p className="text-sm text-muted-foreground">In wage remediation facilitated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Locations Map (Simpler version replacing the detailed Global Map) */}
        <ProjectLocationsMap />

        {/* Story Section */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Success Stories in Ethical Supply Chains</h2>
              <div className="glass-card">
                <h3 className="text-2xl font-semibold mb-4">Puja's Journey to Freedom</h3>
                <p className="mb-4 text-muted-foreground">
                  Puja left her village in rural Bangladesh after recruiters promised good wages at a garment factory 
                  supplying global fashion brands. Upon arrival, her identity documents were confiscated, and she was 
                  told she owed a "recruitment fee" that would take years to repay.
                </p>
                <p className="mb-4 text-muted-foreground">
                  Through Guardian-IO's worker voice channel, implemented by one of the factory's buyers, Puja was able 
                  to anonymously report her situation. Our risk detection system flagged the pattern across multiple 
                  workers, triggering an investigation.
                </p>
                <p className="text-muted-foreground">
                  Today, Puja and 26 other workers from the same factory have received document returns, debt cancellation, 
                  and fair employment terms. The brand has implemented stronger monitoring across all their Bangladesh suppliers, 
                  protecting thousands more workers from similar exploitation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <CaseStudies />

        {/* Our Approach Section */}
        <section className="section bg-background">
          <div className="container-tight">
            <h2 className="text-3xl font-bold text-center mb-12">Measuring Modern Slavery Prevention</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-3">Identify</h3>
                <p className="text-muted-foreground">
                  Our technology doesn't just detect risk—it pinpoints exactly where human beings are most vulnerable 
                  in complex global supply networks, making the invisible visible.
                </p>
              </div>
              
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-3">Intervene</h3>
                <p className="text-muted-foreground">
                  We believe in collaborative remediation that centers workers' needs. Our platform connects brands, 
                  suppliers, and local NGOs to create tailored intervention plans.
                </p>
              </div>
              
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-3">Transform</h3>
                <p className="text-muted-foreground">
                  Beyond addressing individual cases, we work to transform the underlying systems by sharing anonymized 
                  data insights that help shape industry practices and policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <PartnerLogoCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Impact;
