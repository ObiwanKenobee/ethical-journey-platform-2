
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Check, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PaystackPaymentButton from './PaystackPaymentButton';

// Expanded pricing features
const pricingTiers = [
  {
    name: "Free Trial",
    price: "$0",
    priceNGN: 0, // Nigerian Naira equivalent
    description: "Perfect for exploring the platform",
    duration: "14 days",
    features: [
      { name: "Basic Risk Assessment", tooltip: "Simple risk assessment for your initial suppliers" },
      { name: "Supply Chain Mapping", tooltip: "Create basic maps of your direct suppliers" },
      { name: "Limited Supplier Profiles (up to 10)", tooltip: "Add up to 10 suppliers to track" },
      { name: "Standard Reports", tooltip: "Access to standard compliance reports" },
      { name: "Email Support", tooltip: "Support via email with 48-hour response time" },
      { name: "Basic Training Resources", tooltip: "Access to our knowledge base and basic training materials" },
    ],
    limitations: [
      "No AI risk detection",
      "Limited reporting capabilities",
      "No API access",
    ],
    cta: "Start Free Trial",
    ctaSecondary: "No credit card required",
    popular: false
  },
  {
    name: "SME Plan",
    price: "$499",
    priceNGN: 499000, // Nigerian Naira equivalent
    period: "per month",
    description: "For small to medium businesses",
    features: [
      { name: "Advanced Risk Detection", tooltip: "AI-powered risk detection to identify issues before they occur" },
      { name: "Full Supply Chain Mapping", tooltip: "Comprehensive mapping of your entire supply chain, including tier 2 and 3 suppliers" },
      { name: "Unlimited Supplier Profiles", tooltip: "Add as many suppliers as you need to track" },
      { name: "Compliance Reporting", tooltip: "Generate customizable compliance reports for regulatory bodies" },
      { name: "API Access", tooltip: "Full API access for integration with your existing systems" },
      { name: "Priority Support", tooltip: "Priority email and chat support with 24-hour response time" },
      { name: "Blockchain Verification", tooltip: "Basic blockchain verification for your compliance documents" },
      { name: "Customizable Dashboards", tooltip: "Create dashboards tailored to your specific needs" },
      { name: "Team Collaboration", tooltip: "Add up to 5 team members for collaboration" },
    ],
    cta: "Get Started",
    ctaSecondary: "14-day free trial included",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceNGN: 0, // Will be customized
    description: "For large organizations with complex needs",
    features: [
      { name: "Full Platform Access", tooltip: "Complete access to all Guardian-IO features and capabilities" },
      { name: "Custom Integration", tooltip: "Tailored integration with your existing tools and systems" },
      { name: "Advanced Analytics", tooltip: "Sophisticated analytics and reporting capabilities" },
      { name: "Dedicated Account Manager", tooltip: "A dedicated account manager to ensure your success" },
      { name: "Custom Reporting", tooltip: "Fully customizable reports tailored to your organization's needs" },
      { name: "24/7 Priority Support", tooltip: "Round-the-clock support with guaranteed response times" },
      { name: "White-labeling Options", tooltip: "Customize the platform with your organization's branding" },
      { name: "Advanced AI Risk Prediction", tooltip: "Predictive analytics to forecast potential compliance issues" },
      { name: "Global Compliance Database", tooltip: "Access to our comprehensive global compliance database" },
      { name: "Unlimited Team Members", tooltip: "Add as many team members as needed for your organization" },
      { name: "Multi-department Management", tooltip: "Manage compliance across multiple departments or divisions" },
      { name: "Custom Training Programs", tooltip: "Tailored training programs for your organization" },
    ],
    cta: "Contact Sales",
    ctaSecondary: "Get a customized quote",
    popular: false
  }
];

const PricingTiers = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getDiscountedPrice = (price: string) => {
    if (price === "$0" || price === "Custom") return price;
    const numericPrice = parseInt(price.replace('$', ''));
    const discountedPrice = Math.round(numericPrice * 0.8); // 20% discount
    return `$${discountedPrice}`;
  };
  
  const getDiscountedPriceNGN = (priceNGN: number) => {
    if (priceNGN === 0) return priceNGN; // Free or custom
    return Math.round(priceNGN * 0.8); // 20% discount
  };

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container-tight">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Choose the Perfect Plan for Your Organization</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Select the plan that fits your needs. All plans include our core platform features with flexible scaling options.
          </p>
          
          <div className="inline-flex items-center p-1 neo rounded-full mb-8">
            <button
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                billing === 'monthly' && "bg-primary text-primary-foreground shadow-sm"
              )}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                billing === 'annual' && "bg-primary text-primary-foreground shadow-sm"
              )}
              onClick={() => setBilling('annual')}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={cn(
                "neo-card relative flex flex-col h-full transform transition-all duration-700",
                tier.popular && "border-primary shadow-lg md:scale-105 z-10",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6 p-6 pb-0">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold">
                    {billing === 'monthly' ? tier.price : getDiscountedPrice(tier.price)}
                  </span>
                  {tier.period && (
                    <span className="text-muted-foreground"> {tier.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
                {tier.duration && (
                  <p className="text-sm mt-2"><AlertCircle className="inline h-4 w-4 mr-1" /> {tier.duration}</p>
                )}
              </div>
              
              <div className="flex-grow px-6">
                <TooltipProvider>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature.name}
                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground inline-block ml-1 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TooltipProvider>

                {tier.limitations && (
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Limitations:</h4>
                    <ul className="space-y-2">
                      {tier.limitations.map((limitation, lIndex) => (
                        <li key={lIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2">•</span> {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="p-6 pt-0">
                {tier.name === "Free Trial" ? (
                  <PaystackPaymentButton 
                    planName={tier.name}
                    amount={0}
                    variant={tier.popular ? "default" : "outline"}
                    buttonText={tier.cta}
                    className="w-full mb-2"
                  />
                ) : tier.name === "SME Plan" ? (
                  <PaystackPaymentButton 
                    planName={tier.name}
                    amount={billing === 'monthly' ? tier.priceNGN / 100 : getDiscountedPriceNGN(tier.priceNGN) / 100}
                    variant={tier.popular ? "default" : "outline"}
                    buttonText={tier.cta}
                    className="w-full mb-2"
                  />
                ) : (
                  <Button 
                    className="w-full mb-2" 
                    variant={tier.popular ? "default" : "outline"}
                    onClick={() => window.location.href = '/join'}
                  >
                    {tier.cta}
                  </Button>
                )}

                {tier.ctaSecondary && (
                  <p className="text-xs text-center text-muted-foreground mt-2">{tier.ctaSecondary}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-12 p-4 bg-muted/50 rounded-lg neo-card">
          <h3 className="text-center text-lg font-medium mb-4">Need Something Custom?</h3>
          <p className="text-center text-muted-foreground mb-4">
            We offer customized solutions for organizations with unique requirements. Our team will work with you to create a tailored package.
          </p>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => window.location.href = '/join?plan=custom'}>Contact Our Sales Team</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
