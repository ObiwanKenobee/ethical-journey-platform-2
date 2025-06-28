import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Network, Database } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>
          Atlas | Empowering Ethical Supply Chains with AI & Blockchain
        </title>
        <meta
          name="description"
          content="Atlas combines AI, blockchain & human intelligence to end modern slavery. Map supply chains, ensure compliance, and protect vulnerable workers globally."
        />
        <meta
          name="keywords"
          content="ethical supply chain solutions, AI and blockchain for modern slavery prevention, Atlas supply chain transparency, modern slavery compliance software, ESG risk management"
        />
        <meta name="author" content="Atlas" />
        <link rel="canonical" href="https://atlas.com/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://atlas.com/",
              "name": "Atlas",
              "description": "AI-powered platform for ethical supply chain transparency, protecting vulnerable workers worldwide from modern slavery through technology and human intelligence.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://atlas.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Atlas",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "AI and blockchain platform for ethical supply chain management and modern slavery compliance"
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />

        {/* Partner Logo section moved to Impact page */}

        <CallToAction />

        {/* Key Statistics Section */}
        <section className="py-16 bg-primary/5">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                The Reality We're Changing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Modern slavery isn't a distant problem—it's embedded in global
                supply chains that produce the products we use every day.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card text-center group hover:shadow-glass-md transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2 text-gradient">
                  $150B
                </div>
                <p className="text-sm text-muted-foreground">
                  Annual profits generated from forced labor in the private
                  economy
                </p>
              </div>

              <div className="glass-card text-center group hover:shadow-glass-md transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Network className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2 text-gradient">
                  1 in 4
                </div>
                <p className="text-sm text-muted-foreground">
                  Victims of modern slavery are children under the age of 18
                </p>
              </div>

              <div className="glass-card text-center group hover:shadow-glass-md transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Database className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2 text-gradient">71%</div>
                <p className="text-sm text-muted-foreground">
                  Of companies believe there is slavery in their supply chains
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Solutions Section */}
        <section className="py-16 bg-primary/5">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Trusted by Global Enterprises
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                500+ Fortune 500 companies rely on Atlas for enterprise-grade
                supply chain transparency, AI-powered risk assessment, and
                seamless integration with existing systems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Enterprise Integration Hub
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  200+ pre-built integrations with ERP, CRM, and enterprise
                  systems
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/enterprise/integration-hub">
                    Explore Integrations
                  </Link>
                </Button>
              </div>

              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Risk Engine</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  94% accuracy in predicting supply chain risks 6 months ahead
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/platform/risk-engine">Try Risk Engine</Link>
                </Button>
              </div>

              <div className="glass-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Network className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Global Intelligence
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Real-time monitoring across 180+ countries with 24/7 coverage
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/platform/intelligence-dashboard">
                    View Intelligence
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="px-8">
                <Link to="/enterprise">Explore Enterprise Solutions</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Zero to One Advantage Section */}
        <section className="py-16 bg-background">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Going From Zero to One in Supply Chain Ethics
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Unlike outdated compliance tools, Atlas creates a new category:
                scalable, decentralized ethical intelligence. We aren't
                iterating — we're inventing the future of supply chain trust.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-3">
                  Traditional Approaches
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground font-bold">•</span>
                    <span>Annual audits with limited visibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground font-bold">•</span>
                    <span>Manual compliance reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground font-bold">•</span>
                    <span>Fragmented supplier data across systems</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-3">
                  The Atlas Difference
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Real-time continuous monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>AI-powered risk prediction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    <span>Blockchain-verified supplier credentials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication Banner */}
        <section className="py-12 bg-primary/5">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Protecting Your Supply Chain Today
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join Atlas today and build ethical, transparent supply chains that
              protect human dignity while driving business success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
