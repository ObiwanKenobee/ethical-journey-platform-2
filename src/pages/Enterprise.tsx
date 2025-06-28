import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Shield,
  Database,
  BarChart3,
  Zap,
  Globe,
  Network,
  CheckCircle,
  ArrowRight,
  Truck,
  Factory,
  Smartphone,
  Shirt,
} from "lucide-react";
import { Link } from "react-router-dom";

const Enterprise = () => {
  const enterpriseFeatures = [
    {
      icon: Database,
      title: "Enterprise Integration Hub",
      description:
        "Seamlessly connect with your existing ERP, CRM, SAP, and other enterprise systems. 200+ pre-built integrations available.",
      benefits: [
        "API-first architecture",
        "Real-time data sync",
        "Custom integration support",
        "Enterprise-grade security",
      ],
      link: "/enterprise/integration-hub",
    },
    {
      icon: Zap,
      title: "Advanced AI Risk Engine",
      description:
        "Predictive analytics and machine learning algorithms that identify supply chain risks before they become critical issues.",
      benefits: [
        "AI-powered predictions",
        "Risk pattern recognition",
        "Early warning systems",
        "Automated mitigation recommendations",
      ],
      link: "/platform/risk-engine",
    },
    {
      icon: BarChart3,
      title: "Global Intelligence Dashboard",
      description:
        "Real-time monitoring of global supply chain events, market intelligence, and compliance alerts across all regions.",
      benefits: [
        "Real-time global monitoring",
        "Market intelligence",
        "Geopolitical risk tracking",
        "Regulatory compliance alerts",
      ],
      link: "/platform/intelligence-dashboard",
    },
    {
      icon: Users,
      title: "Multi-Tenant Workspace Management",
      description:
        "Advanced workspace management with role-based access control, perfect for large organizations with multiple teams.",
      benefits: [
        "Multi-tenant architecture",
        "Role-based access control",
        "Department isolation",
        "Enterprise user management",
      ],
      link: "/enterprise/workspace-management",
    },
    {
      icon: Shield,
      title: "Security & Compliance Center",
      description:
        "Enterprise-grade security with SOC 2 Type II, ISO 27001, and GDPR compliance. Blockchain-verified audit trails.",
      benefits: [
        "SOC 2 Type II certified",
        "ISO 27001 compliant",
        "Blockchain verification",
        "Immutable audit trails",
      ],
      link: "/enterprise/security-compliance",
    },
    {
      icon: Building2,
      title: "Custom Enterprise Solutions",
      description:
        "White-label options, custom branding, and bespoke implementations tailored to your specific enterprise requirements.",
      benefits: [
        "White-label solutions",
        "Custom branding",
        "Dedicated support",
        "SLA guarantees",
      ],
      link: "/enterprise/custom-solutions",
    },
  ];

  const industries = [
    {
      icon: Factory,
      title: "Manufacturing",
      description:
        "Comprehensive supply chain visibility for complex manufacturing operations",
      companies: "500+ manufacturing enterprises",
      link: "/solutions/manufacturing",
    },
    {
      icon: Shirt,
      title: "Retail & Fashion",
      description:
        "Ethical sourcing solutions for fashion brands and retailers",
      companies: "200+ fashion brands",
      link: "/solutions/retail-fashion",
    },
    {
      icon: Smartphone,
      title: "Technology",
      description: "Hardware supply chain transparency for tech companies",
      companies: "150+ tech companies",
      link: "/solutions/technology",
    },
    {
      icon: Truck,
      title: "Logistics",
      description: "End-to-end visibility for logistics and transportation",
      companies: "300+ logistics providers",
      link: "/solutions/logistics",
    },
  ];

  const enterpriseStats = [
    {
      value: "500+",
      label: "Enterprise Customers",
      sublabel: "Fortune 500 companies trust Atlas",
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      sublabel: "Enterprise-grade reliability",
    },
    {
      value: "24/7",
      label: "Dedicated Support",
      sublabel: "White-glove enterprise support",
    },
    {
      value: "200+",
      label: "System Integrations",
      sublabel: "Pre-built enterprise connectors",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Enterprise Supply Chain Solutions | Atlas Platform</title>
        <meta
          name="description"
          content="Comprehensive enterprise supply chain transparency solutions with AI-powered risk assessment, global intelligence monitoring, and seamless enterprise integrations."
        />
        <meta
          name="keywords"
          content="enterprise supply chain, AI risk assessment, supply chain intelligence, enterprise integrations, compliance monitoring"
        />
        <link rel="canonical" href="https://atlas.com/enterprise" />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Enterprise Solutions
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-up">
                Enterprise-Grade Supply Chain{" "}
                <span className="text-gradient">Intelligence</span>
              </h1>
              <p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                Scale ethical supply chain management across your entire
                enterprise with AI-powered insights, real-time global
                monitoring, and seamless integration with your existing systems.
              </p>
              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                <Button asChild size="lg" className="px-8">
                  <Link to="/enterprise/demo">Request Enterprise Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/enterprise/pricing">View Enterprise Pricing</Link>
                </Button>
              </div>
            </div>

            {/* Enterprise Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-16">
              {enterpriseStats.map((stat, index) => (
                <div key={index} className="glass-card text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Features Grid */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Enterprise Capabilities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for enterprises that need scalable, secure, and compliant
                supply chain solutions with advanced AI capabilities and global
                coverage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {enterpriseFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="glass-card group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full group"
                    >
                      <Link to={feature.link}>
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="section bg-accent/20">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Industry-Specific Solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tailored enterprise solutions designed for the unique challenges
                and regulations of different industries and sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {industries.map((industry, index) => (
                <Card
                  key={index}
                  className="glass-card group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mx-auto">
                      <industry.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{industry.title}</CardTitle>
                    <CardDescription>{industry.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="mb-4">
                      {industry.companies}
                    </Badge>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full group"
                    >
                      <Link to={industry.link}>
                        Explore Solutions
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Benefits */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Global Enterprises Choose Atlas
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Global Scale
                      </h3>
                      <p className="text-muted-foreground">
                        Monitor supply chains across 180+ countries with
                        real-time intelligence and local regulatory compliance
                        support.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Enterprise Security
                      </h3>
                      <p className="text-muted-foreground">
                        SOC 2 Type II, ISO 27001, and GDPR compliance with
                        blockchain-verified audit trails and enterprise-grade
                        encryption.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Network className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Seamless Integration
                      </h3>
                      <p className="text-muted-foreground">
                        Connect with your existing enterprise systems through
                        200+ pre-built integrations and RESTful APIs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        AI-Powered Intelligence
                      </h3>
                      <p className="text-muted-foreground">
                        Advanced machine learning algorithms provide predictive
                        insights and automated risk detection across your supply
                        network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Enterprise Implementation
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <span className="text-sm">
                        Strategic consultation & requirement analysis
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <span className="text-sm">
                        Custom integration & system configuration
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <span className="text-sm">
                        Team training & change management
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        4
                      </div>
                      <span className="text-sm">
                        Ongoing support & optimization
                      </span>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6">
                    <Link to="/enterprise/implementation">
                      Learn About Implementation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-br from-primary/5 to-accent/20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Enterprise Supply Chain?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of global enterprises already using Atlas to
                create transparent, ethical, and compliant supply chains at
                scale.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="px-8">
                  <Link to="/enterprise/demo">Schedule Enterprise Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/contact/enterprise">Contact Enterprise Sales</Link>
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

export default Enterprise;
