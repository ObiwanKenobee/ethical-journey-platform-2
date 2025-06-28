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
  CheckCircle,
  ArrowRight,
  Globe,
  Zap,
  BarChart3,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const EnterprisePricing = () => {
  const enterpriseFeatures = [
    "Unlimited users and suppliers",
    "Advanced AI Risk Engine with 6-month forecasting",
    "Global Intelligence Dashboard (180+ countries)",
    "Enterprise Integration Hub (200+ integrations)",
    "Multi-tenant workspace management",
    "SOC 2 Type II & ISO 27001 compliance",
    "Blockchain verification & audit trails",
    "Custom branding & white-label options",
    "24/7 dedicated support & account manager",
    "99.9% uptime SLA with priority support",
    "Advanced analytics & custom reporting",
    "API access & developer support",
    "Custom training & change management",
    "Regulatory compliance automation",
    "Real-time global event monitoring",
  ];

  const pricingTiers = [
    {
      name: "Enterprise",
      description: "For large organizations (1,000+ employees)",
      price: "Custom",
      features: [
        "Up to 10,000 users",
        "Unlimited suppliers",
        "All platform features",
        "Standard integrations",
        "Business hour support",
        "99.5% uptime SLA",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
    {
      name: "Enterprise Plus",
      description: "For Fortune 500 & global enterprises",
      price: "Custom",
      features: [
        "Unlimited users",
        "Unlimited suppliers",
        "All platform features",
        "Custom integrations",
        "24/7 priority support",
        "99.9% uptime SLA",
        "Dedicated account manager",
        "Custom training",
      ],
      buttonText: "Contact Sales",
      popular: true,
    },
    {
      name: "Enterprise Elite",
      description: "For mission-critical implementations",
      price: "Custom",
      features: [
        "Everything in Enterprise Plus",
        "White-label deployment",
        "On-premise options",
        "Custom development",
        "Dedicated infrastructure",
        "99.99% uptime SLA",
        "Executive support",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  const addOns = [
    { name: "Additional User Tiers", price: "Volume discounts available" },
    { name: "Custom Integrations", price: "Starting at $10,000" },
    { name: "Professional Services", price: "$500/hour" },
    { name: "Advanced Training", price: "$2,500 per session" },
    { name: "White-label Deployment", price: "Custom quote" },
    { name: "On-premise Deployment", price: "Custom quote" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Enterprise Pricing | Atlas Platform</title>
        <meta
          name="description"
          content="Enterprise pricing for Atlas supply chain transparency platform. Custom solutions for large organizations with volume discounts."
        />
        <meta
          name="keywords"
          content="enterprise pricing, supply chain software pricing, Atlas enterprise cost, volume licensing"
        />
        <link rel="canonical" href="https://atlas.com/enterprise/pricing" />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Enterprise Pricing
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                Scalable Pricing for{" "}
                <span className="text-gradient">Enterprise Success</span>
              </h1>
              <p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                Flexible enterprise pricing designed to scale with your
                organization. All plans include comprehensive features with
                custom options for unique requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Enterprise Plans</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All enterprise plans include our full feature set. Pricing is
                customized based on your organization size, usage requirements,
                and specific needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`glass-card relative ${tier.popular ? "ring-2 ring-primary" : ""}`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="text-3xl font-bold text-primary mt-4">
                      {tier.price}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                    >
                      <Link to="/enterprise/demo">{tier.buttonText}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="section bg-accent/20">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                All Enterprise Plans Include
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive enterprise features designed for large-scale
                supply chain operations and compliance requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enterpriseFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 glass-card p-4"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons & Services */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Add-ons & Professional Services
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Enhance your enterprise deployment with additional services
                  and customizations tailored to your specific requirements.
                </p>

                <div className="space-y-4">
                  {addOns.map((addon, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 glass-card"
                    >
                      <span className="font-medium">{addon.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {addon.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Volume Discounts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>1,000 - 5,000 users</span>
                        <Badge variant="secondary">15% discount</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>5,000 - 10,000 users</span>
                        <Badge variant="secondary">25% discount</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>10,000+ users</span>
                        <Badge variant="secondary">Custom pricing</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Enterprise Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        <span>Dedicated account manager</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        <span>24/7 priority support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        <span>Custom SLA agreements</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        <span>Implementation consulting</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Contact Enterprise Sales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm">enterprise@atlas.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                      <Button asChild className="w-full mt-4">
                        <Link to="/enterprise/demo">
                          Schedule a Consultation
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator CTA */}
        <section className="section bg-primary/5">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Calculate Your ROI</h2>
              <p className="text-lg text-muted-foreground mb-8">
                See how Atlas can deliver measurable value to your organization
                with our enterprise ROI calculator and cost-benefit analysis.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="px-8">
                  <Link to="/enterprise/roi-calculator">Calculate ROI</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/enterprise/demo">Request Custom Quote</Link>
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

export default EnterprisePricing;
