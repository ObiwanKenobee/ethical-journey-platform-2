import React from "react";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Shield, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Compliance Assurance",
    description:
      "Stay ahead of regulatory requirements with automated compliance checking and reporting.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Risk Mitigation",
    description:
      "Identify and address ethical and environmental risks before they impact your business.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Efficiency",
    description:
      "Reduce manual assessment time by up to 80% with our AI-powered analysis tools.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Reputation Growth",
    description:
      "Build trust with customers and investors through transparent, ethical operations.",
  },
];

const ValueProposition = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-accent/30" ref={ref}>
      <div className="container-tight">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Guardian-IO
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={cn(
                "neo-card group hover:shadow-neo-sm transition-all duration-500 transform",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
            >
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-500">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "mt-16 p-8 glass-card text-center transition-all duration-700 transform",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to transform your supply chain?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Join hundreds of forward-thinking companies using Guardian-IO to
            create more ethical, transparent supply chains.
          </p>
          <Button variant="default">Get Started Today</Button>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
