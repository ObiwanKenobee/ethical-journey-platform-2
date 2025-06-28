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
  Zap,
  Brain,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Globe,
  Network,
  Eye,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdvancedRiskEngine from "@/components/enterprise/AdvancedRiskEngine";

const RiskEngine = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Machine Learning Risk Detection",
      description:
        "Advanced algorithms analyze millions of data points to identify risk patterns invisible to traditional auditing methods.",
      benefits: [
        "Pattern recognition across 50+ risk factors",
        "Real-time anomaly detection",
        "Predictive risk modeling",
        "Continuous learning algorithms",
      ],
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description:
        "Forecast potential supply chain disruptions and human rights violations before they occur with 94% accuracy.",
      benefits: [
        "6-month risk forecasting",
        "Scenario modeling",
        "Impact prediction",
        "Early warning systems",
      ],
    },
    {
      icon: Globe,
      title: "Global Risk Intelligence",
      description:
        "Comprehensive database of global risk factors including geopolitical events, natural disasters, and regulatory changes.",
      benefits: [
        "180+ country coverage",
        "Real-time event monitoring",
        "Regulatory change tracking",
        "Local risk indicators",
      ],
    },
    {
      icon: Target,
      title: "Automated Risk Scoring",
      description:
        "Dynamic risk scoring system that automatically updates based on new data and changing conditions.",
      benefits: [
        "Real-time score updates",
        "Multi-factor analysis",
        "Weighted risk algorithms",
        "Historical trend analysis",
      ],
    },
  ];

  const riskFactors = [
    {
      category: "Labor Practices",
      factors: [
        "Working hours violations",
        "Child labor indicators",
        "Wage payment irregularities",
        "Safety violations",
      ],
    },
    {
      category: "Environmental",
      factors: [
        "Pollution incidents",
        "Resource depletion",
        "Waste management",
        "Carbon footprint",
      ],
    },
    {
      category: "Geopolitical",
      factors: [
        "Political instability",
        "Trade sanctions",
        "Currency fluctuations",
        "Border restrictions",
      ],
    },
    {
      category: "Financial",
      factors: [
        "Credit risk",
        "Payment delays",
        "Financial instability",
        "Bankruptcy indicators",
      ],
    },
  ];

  const metrics = [
    {
      value: "94%",
      label: "Prediction Accuracy",
      sublabel: "For high-risk events",
    },
    { value: "50+", label: "Risk Factors", sublabel: "Continuously monitored" },
    {
      value: "6 months",
      label: "Forecast Window",
      sublabel: "Early warning system",
    },
    {
      value: "24/7",
      label: "Real-time Monitoring",
      sublabel: "Global coverage",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>AI-Powered Risk Engine | Atlas Platform</title>
        <meta
          name="description"
          content="Advanced AI risk assessment engine for supply chain management with predictive analytics, real-time monitoring, and automated risk scoring."
        />
        <meta
          name="keywords"
          content="AI risk assessment, supply chain risk, predictive analytics, risk management, machine learning"
        />
        <link rel="canonical" href="https://atlas.com/platform/risk-engine" />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                AI Risk Engine
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
                Predict & Prevent Supply Chain{" "}
                <span className="text-gradient">Risks with AI</span>
              </h1>
              <p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                Our advanced AI engine analyzes millions of data points to
                predict supply chain risks with 94% accuracy, giving you the
                power to prevent issues before they impact your business.
              </p>
              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                <Button asChild size="lg" className="px-8">
                  <Link to="/platform/risk-engine/demo">
                    Try Risk Engine Demo
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/platform/risk-engine/documentation">
                    View Documentation
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

        {/* AI Capabilities */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Advanced AI Capabilities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our machine learning algorithms continuously analyze global data
                sources to provide unprecedented visibility into supply chain
                risks.
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

        {/* Risk Factors */}
        <section className="section bg-accent/20">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Risk Factor Analysis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Monitor and analyze over 50 risk factors across multiple
                categories to ensure comprehensive supply chain visibility.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {riskFactors.map((category, index) => (
                <Card key={index} className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.factors.map((factor, factorIndex) => (
                        <li
                          key={factorIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <AlertTriangle className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
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
                See the Risk Engine in Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience our advanced risk assessment capabilities with this
                interactive demo showing real-time risk analysis and
                predictions.
              </p>
            </div>

            {/* Risk Engine Component */}
            <div className="max-w-6xl mx-auto">
              <AdvancedRiskEngine />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section bg-primary/5">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Transform Risk Management with AI
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Unprecedented Visibility
                      </h3>
                      <p className="text-muted-foreground">
                        See risks that traditional auditing methods miss with
                        AI-powered pattern recognition across your entire supply
                        network.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Proactive Protection
                      </h3>
                      <p className="text-muted-foreground">
                        Prevent issues before they occur with 6-month risk
                        forecasting and automated early warning systems.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Data-Driven Decisions
                      </h3>
                      <p className="text-muted-foreground">
                        Make informed decisions with quantified risk scores,
                        impact assessments, and actionable recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Network className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Continuous Improvement
                      </h3>
                      <p className="text-muted-foreground">
                        Our AI continuously learns and improves, becoming more
                        accurate and effective over time with new data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Risk Engine Implementation
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <span className="text-sm">
                        Connect your data sources & systems
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <span className="text-sm">
                        Configure risk parameters & thresholds
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <span className="text-sm">
                        AI begins analysis & risk assessment
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        4
                      </div>
                      <span className="text-sm">
                        Receive predictions & recommendations
                      </span>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6">
                    <Link to="/platform/risk-engine/setup">
                      Start Implementation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Revolutionize Risk Management?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join leading enterprises already using our AI Risk Engine to
                predict and prevent supply chain risks before they impact their
                business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="px-8">
                  <Link to="/platform/risk-engine/trial">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/contact/risk-engine">Contact AI Specialists</Link>
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

export default RiskEngine;
