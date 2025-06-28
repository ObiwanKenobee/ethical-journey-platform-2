
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';
import TypewriterEffect from '@/components/about/TypewriterEffect';
import TeamSection from '@/components/about/TeamSection';
import ImpactStats from '@/components/about/ImpactStats';
import { Shield, Heart, Lightbulb } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Our Mission: Building a World Free from Exploitation | Vought International</title>
        <meta name="description" content="Learn how Vought International is transforming supply chains to end modern slavery and protect human dignity through innovative AI and blockchain technology." />
        <meta name="keywords" content="Vought International mission and vision, ethical supply chain advocacy, innovators in supply chain transparency, corporate social responsibility tech" />
        <link rel="canonical" href="https://vought-international.com/about" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vought International",
              "url": "https://vought-international.com",
              "logo": "https://vought-international.com/logo.png",
              "description": "Vought International is a human rights technology platform fighting modern slavery through transparent supply chains, combining AI and human intelligence to protect vulnerable workers worldwide.",
              "foundingDate": "2024",
              "foundingLocation": "Global",
              "sameAs": [
                "https://twitter.com/Vought_International",
                "https://www.linkedin.com/company/vought-international",
                "https://www.facebook.com/VoughtInternational"
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Vision Section with Typewriter */}
        <section className="section bg-gradient-to-br from-background to-accent/30">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Vision
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-up">
                Our Mission: Building a World Free from Exploitation
              </h1>
              <TypewriterEffect 
                text="Behind every product is a human story. We're writing a new chapter where dignity, transparency, and prosperity go hand in hand."
                delay={50}
              />
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card group hover:shadow-lg transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Protection</h3>
                  <p className="text-muted-foreground">
                    We shield vulnerable workers from exploitation through uncompromising transparency and accountability.
                  </p>
                </div>
                
                <div className="glass-card group hover:shadow-lg transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Humanity</h3>
                  <p className="text-muted-foreground">
                    We center human dignity in business operations, recognizing that profit and ethical treatment are not competing interests.
                  </p>
                </div>
                
                <div className="glass-card group hover:shadow-lg transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-muted-foreground">
                    We leverage AI and blockchain to bring unprecedented visibility to complex global supply chains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Journey</h2>
              <div className="glass-card">
                <p className="mb-6">
                  The Vought International story began with an internet idea and technical research showcasing firsthand the devastating human cost of 
                  opaque supply chains while looking into manufacturing companies across Southeast Asia and Africa. 
                </p>
                <p className="mb-6">
                  In garment factories where workers faced 16-hour shifts without breaks, in mines where children as young as nine 
                  extracted minerals for our electronics, in fishing vessels where men were trapped in debt bondage—these experiences 
                  revealed a hard truth: modern business often thrives on modern slavery.
                </p>
                <p>
                  Founded in 2024, Vought International was built on the conviction that technology could shine a light into these dark corners. 
                  By combining AI's analytical power, blockchain's immutable records, and human intelligence on the ground, we've created 
                  a platform that makes it impossible for businesses to claim ignorance about exploitation in their supply chains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />

        {/* Impact Stats */}
        <ImpactStats />
      </main>
      <Footer />
    </div>
  );
};

export default About;
