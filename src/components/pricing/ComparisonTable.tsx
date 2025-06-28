import React from "react";
import { useInView } from "react-intersection-observer";
import { CheckCircle, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ComparisonTable = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      category: "AI Risk Detection",
      free: { value: "Basic Alerts", tooltip: "Standard compliance alerts" },
      sme: { value: "Advanced Alerts", tooltip: "AI-powered risk detection" },
      enterprise: {
        value: "Advanced AI Predictions",
        tooltip: "Predictive analytics and advanced warning system",
      },
    },
    {
      category: "Supplier Tracking",
      free: { value: "Up to 50", tooltip: "Track up to 50 suppliers" },
      sme: { value: "Up to 500", tooltip: "Track up to 500 suppliers" },
      enterprise: {
        value: "Unlimited Suppliers",
        tooltip: "No limits on supplier tracking",
      },
    },
    {
      category: "Blockchain Verification",
      free: { value: "No Access", tooltip: "Not available in free plan" },
      sme: {
        value: "Basic Verification",
        tooltip: "Standard blockchain verification",
      },
      enterprise: {
        value: "Full Access",
        tooltip: "Complete verification system with audit trails",
      },
    },
    {
      category: "Custom Reports",
      free: { value: "Standard Reports", tooltip: "Pre-built reports only" },
      sme: {
        value: "Custom Reports",
        tooltip: "Customizable reports with your branding",
      },
      enterprise: {
        value: "Customizable Reports",
        tooltip: "Fully customizable reports for your specific needs",
      },
    },
    {
      category: "Global Coverage",
      free: {
        value: "Regional Only",
        tooltip: "Limited to your primary region",
      },
      sme: {
        value: "Multi-Regional",
        tooltip: "Coverage across multiple regions",
      },
      enterprise: { value: "Global Scope", tooltip: "Worldwide visibility" },
    },
    {
      category: "Team Collaboration",
      free: { value: "Individual Access", tooltip: "Single user access" },
      sme: { value: "Team Access", tooltip: "Up to 25 team members" },
      enterprise: {
        value: "Full Organization Access",
        tooltip: "Enterprise-wide collaboration",
      },
    },
    {
      category: "Support Level",
      free: {
        value: "Community Support",
        tooltip: "Forum and documentation support",
      },
      sme: {
        value: "Email Support",
        tooltip: "Email support with 24-hour response",
      },
      enterprise: {
        value: "24/7 Support & Consulting",
        tooltip: "Round-the-clock support and dedicated consultants",
      },
    },
  ];

  return (
    <section className="py-16 bg-accent/20">
      <div className="container-tight">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700 ease-out",
            inView
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8",
          )}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Detailed Feature Comparison
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your organization's needs and scale
              as you grow.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Mobile-friendly cards for smaller screens */}
              <div className="block md:hidden space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="glass-card p-4">
                    <h3 className="font-semibold mb-4">{feature.category}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Free Plan</span>
                        <div className="flex items-center gap-2">
                          {feature.free.value === "No Access" ? (
                            <X className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                          <span className="text-sm">{feature.free.value}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">SME Plan</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature.sme.value}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Enterprise Plan</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">
                            {feature.enterprise.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold">
                        Features
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="font-bold text-muted-foreground">
                          Free Plan 🌱
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Perfect for testing
                        </div>
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="font-bold text-primary">
                          SME Solution 🚀
                        </div>
                        <div className="text-sm text-muted-foreground">
                          For growing businesses
                        </div>
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="font-bold text-primary">
                          Enterprise Solution 🌍
                        </div>
                        <div className="text-sm text-muted-foreground">
                          For large organizations
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr
                        key={index}
                        className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium">
                          {feature.category}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-help">
                                  {feature.free.value === "No Access" ? (
                                    <X className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                  )}
                                  {feature.free.tooltip && (
                                    <Info className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </div>
                              </TooltipTrigger>
                              {feature.free.tooltip && (
                                <TooltipContent>
                                  <p>{feature.free.tooltip}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                          <div className="text-xs mt-1">
                            {feature.free.value !== "No Access" &&
                              feature.free.value}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-help">
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                  {feature.sme.tooltip && (
                                    <Info className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </div>
                              </TooltipTrigger>
                              {feature.sme.tooltip && (
                                <TooltipContent>
                                  <p>{feature.sme.tooltip}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                          <div className="text-xs mt-1">
                            {feature.sme.value}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-help">
                                  {feature.enterprise.value === "No Access" ? (
                                    <X className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                  )}
                                  {feature.enterprise.tooltip && (
                                    <Info className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </div>
                              </TooltipTrigger>
                              {feature.enterprise.tooltip && (
                                <TooltipContent>
                                  <p>{feature.enterprise.tooltip}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                          <div className="text-xs">
                            {feature.enterprise.value !== "No Access" &&
                              feature.enterprise.value}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              All plans include core compliance monitoring, basic reporting, and
              access to our global supplier database.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="px-8">
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Contact Sales for Custom Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
