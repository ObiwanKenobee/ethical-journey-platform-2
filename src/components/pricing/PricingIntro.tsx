import React from "react";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Scale, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const PricingIntro = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const introPoints = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Transparency First",
      description: "No hidden fees, no unnecessary complexity.",
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Scalability Built-In",
      description:
        "Solutions for startups, SMEs, enterprises, and institutions.",
    },
    {
      icon: <MoreHorizontal className="h-6 w-6" />,
      title: "Impact-Driven",
      description:
        "The more companies onboard, the greater the global ethical impact.",
    },
  ];

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container">
        <div
          className={cn(
            "max-w-3xl mx-auto text-center mb-12 transition-all duration-700 transform",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h2 className="text-3xl font-bold mb-8">
            Clear, Transparent, and Scalable Pricing for Every User
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Guardian-IO's pricing model is designed for scalability, ensuring
            that businesses of all sizes, NGOs, and regulators can access the
            tools they need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {introPoints.map((point, index) => (
            <div
              key={index}
              className={cn(
                "neo-card group hover:shadow-md transition-all duration-500 transform text-center",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
            >
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-all duration-300">
                {point.title}
              </h3>
              <p className="text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingIntro;
