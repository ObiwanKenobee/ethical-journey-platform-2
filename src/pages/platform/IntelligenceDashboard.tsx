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
  Globe,
  Satellite,
  TrendingUp,
  AlertCircle,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Eye,
  Network,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import GlobalIntelligenceDashboard from "@/components/enterprise/GlobalIntelligenceDashboard";

const IntelligenceDashboard = () => {
  const capabilities = [
    {
      icon: Satellite,
      title: "Real-time Global Monitoring",
      description:
        "Monitor supply chain events, disruptions, and opportunities across 180+ countries in real-time.",
      benefits: [
        "24/7 global coverage",
        "Real-time event detection",
        "Multi-source data fusion",
        "Instant alert system",
      ],
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence Analytics",
      description:
        "Advanced analytics providing insights into market trends, commodity prices, and trade patterns.",
      benefits: [
        "Predictive market indicators",
        "Price trend analysis",
        "Trade flow monitoring",
        "Economic impact assessment",
      ],
    },
    {
      icon: AlertCircle,
      title: "Compliance Alert System",
      description:
        "Automated monitoring of regulatory changes, sanctions, and compliance requirements worldwide.",
      benefits: [
        "Regulatory change tracking",
        "Sanctions monitoring",
        "Compliance alerts",
        "Legal requirement updates",
      ],
    },
    {
      icon: Network,
      title: "Supply Route Optimization",
      description:
        "Real-time visibility into supply routes with optimization recommendations and risk assessments.",
      benefits: [
        "Route performance tracking",
        "Optimization suggestions",
        "Risk-based routing",
        "Multi-modal visibility",
      ],
    },
  ];

  const monitoringAreas = [
    {
      category: "Global Events",
      description:
        "Political unrest, natural disasters, trade disputes, economic changes",
      coverage: "180+ countries",
    },
    {
      category: "Supply Routes",
      description:
        "Transportation corridors, shipping lanes, border crossings, logistics hubs",
      coverage: "5,000+ routes",
    },
    {
      category: "Market Intelligence",
      description:
        "Commodity prices, demand forecasts, trade volumes, market sentiment",
      coverage: "500+ commodities",
    },
    {
      category: "Compliance Tracking",
      description:
        "Regulatory changes, sanctions updates, legal requirements, policy shifts",
      coverage: "50+ jurisdictions",
    },
  ];

  const metrics = [
    {
      value: "180+",
      label: "Countries Monitored",
      sublabel: "Global coverage",
    },
    {
      value: "24/7",
      label: "Real-time Monitoring",
      sublabel: "Continuous intelligence",
    },
    { value: "5,000+", label: "Supply Routes", sublabel: "Tracked globally" },
    { value: "99.9%", label: "Uptime", sublabel: "Reliable monitoring" },
  ];

  const dataSources = [
    "Government databases",
    "News and media feeds",
    "Economic indicators",
    "Weather and climate data",
    "Transportation networks",
    "Regulatory bodies",
    "Trade associations",
    "Financial markets",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Global Intelligence Dashboard | Atlas Platform</title>
        <meta
          name="description"
          content="Real-time global supply chain intelligence monitoring with market analytics, compliance alerts, and supply route optimization."
        />
        <meta
          name="keywords"
          content="global intelligence, supply chain monitoring, market intelligence, compliance tracking, real-time analytics"
        />
        <link
          rel="canonical"
          href="https://atlas.com/platform/intelligence-dashboard"
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Global Intelligence Dashboard
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
                Real-time Global Supply Chain{" "}
                <span className="text-gradient">Intelligence</span>
              </h1>
              <p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                Monitor global events, track supply routes, analyze market
                intelligence, and receive compliance alerts in real-time across
                180+ countries with our comprehensive intelligence platform.
              </p>
              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                <Button asChild size="lg" className="px-8">
                  <Link to="/platform/intelligence-dashboard/demo">
                    Try Intelligence Demo
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/platform/intelligence-dashboard/features">
                    Explore Features
                  </Link>
                </Button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-4 gap-8 mt-16">
              {metrics.map((metric, index) => (
                <div key={index} className="glass-card text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium mb-1">{metric.label}</div>
                  <p className="text-xs text-muted-foreground">
                    {metric.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intelligence Capabilities */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Intelligence Capabilities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our intelligence platform provides unprecedented visibility into
                global supply chain dynamics through advanced monitoring and
                analytics.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {capabilities.map((capability, index) => (
                <Card
                  key={index}
                  className="glass-card group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <capability.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">
                      {capability.title}
                    </CardTitle>
                    <CardDescription>{capability.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {capability.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Monitoring Areas */}
        <section className="section bg-accent/20">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Global Monitoring Coverage
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive monitoring across multiple dimensions of global
                supply chain intelligence with unparalleled coverage and depth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {monitoringAreas.map((area, index) => (
                <Card key={index} className="glass-card text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{area.category}</CardTitle>
                    <Badge variant="secondary">{area.coverage}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Live Intelligence Dashboard
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience real-time global supply chain intelligence with our
                interactive dashboard showing live monitoring, analytics, and
                alerts.
              </p>
            </div>

            {/* Intelligence Dashboard Component */}
            <div className="max-w-6xl mx-auto">
              <GlobalIntelligenceDashboard />
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="section bg-primary/5">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Comprehensive Data Intelligence
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Global Data Sources
                      </h3>
                      <p className="text-muted-foreground">
                        Our platform aggregates data from hundreds of trusted
                        sources worldwide to provide comprehensive intelligence
                        coverage.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Real-time Processing
                      </h3>
                      <p className="text-muted-foreground">
                        Advanced data processing pipelines ensure that critical
                        intelligence reaches you within minutes of events
                        occurring.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Intelligent Filtering
                      </h3>
                      <p className="text-muted-foreground">
                        AI-powered filtering ensures you only receive relevant
                        intelligence based on your specific supply chain and
                        risk profile.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Verified Intelligence
                      </h3>
                      <p className="text-muted-foreground">
                        Multi-source verification and credibility scoring ensure
                        the reliability and accuracy of intelligence reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Intelligence Data Sources
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {dataSources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm p-2 rounded bg-background/50"
                      >
                        <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                        <span>{source}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-6">
                    <Link to="/platform/intelligence-dashboard/data-sources">
                      View All Sources
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Intelligence Features Overview
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive intelligence capabilities designed for modern
                supply chain management and risk mitigation strategies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-card">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary mx-auto">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle>Market Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Commodity price tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Demand forecasting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Trade flow analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Economic indicators</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary mx-auto">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <CardTitle>Risk Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Political risk tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Natural disaster alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Trade disruption monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Security threat intelligence</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary mx-auto">
                    <Network className="h-6 w-6" />
                  </div>
                  <CardTitle>Route Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Route optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Performance tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Alternative route suggestions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>Multi-modal visibility</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Gain Global Supply Chain Intelligence
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Transform your supply chain decision-making with real-time
                global intelligence, market analytics, and comprehensive risk
                monitoring.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="px-8">
                  <Link to="/platform/intelligence-dashboard/trial">
                    Start Intelligence Trial
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/contact/intelligence">
                    Contact Intelligence Team
                  </Link>
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

export default IntelligenceDashboard;
