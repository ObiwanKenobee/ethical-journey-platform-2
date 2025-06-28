
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Briefcase, Shield, Globe, Landmark, 
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const userTypes = [
  {
    color: "bg-green-100 text-green-600",
    icon: <Briefcase className="h-6 w-6" />,
    title: "Businesses & Supply Chain Managers",
    subtitle: "SMEs, Enterprises, Retailers, Manufacturers",
    goal: "Ensure seamless compliance and risk mitigation.",
    features: [
      "AI-Powered Risk Detection – Know supplier risks before they happen",
      "Blockchain-Verified Compliance – Instantly prove ethical sourcing",
      "Automated Reporting – Generate compliance reports with one click"
    ]
  },
  {
    color: "bg-yellow-100 text-yellow-600",
    icon: <Shield className="h-6 w-6" />,
    title: "ESG & Compliance Officers",
    subtitle: "Corporations, Compliance Departments, Legal Teams",
    goal: "Automate due diligence and ensure real-time monitoring.",
    features: [
      "Regulatory Compliance AI – Tracks global ESG laws (Modern Slavery Act, etc.)",
      "Real-Time Supplier Audits – AI-assisted document verification",
      "Audit Trail & Legal Safeguards – Tamper-proof compliance history"
    ]
  },
  {
    color: "bg-orange-100 text-orange-600",
    icon: <Globe className="h-6 w-6" />,
    title: "NGOs & Human Rights Watchdogs",
    subtitle: "Ethical Advocacy, Labor Rights, Research Groups",
    goal: "Provide oversight and enforce accountability.",
    features: [
      "Crowdsourced Violation Reporting – Secure whistleblower platform",
      "Live Investigation Dashboard – Track corporate accountability cases",
      "AI-Powered Risk Predictions – Identify high-risk regions before violations occur"
    ]
  },
  {
    color: "bg-red-100 text-red-600",
    icon: <Landmark className="h-6 w-6" />,
    title: "Governments & Regulatory Bodies",
    subtitle: "Policy Makers, Trade Regulators, International Organizations",
    goal: "Monitor industry-wide compliance & enforce policies.",
    features: [
      "Industry-Wide Risk Analytics – AI-driven insights across multiple sectors",
      "Sanction & Legal Enforcement Tools – Automate regulatory actions",
      "Corporate ESG Performance Benchmarking – Compare ethical leaders vs. violators"
    ]
  }
];

const UserTypePricing = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-accent/20" ref={ref}>
      <div className="container">
        <div className={cn(
          "max-w-3xl mx-auto text-center mb-12 transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl font-bold mb-4">Targeted Pricing for Different User Types</h2>
          <p className="text-lg text-muted-foreground">
            Unlike traditional "one-size-fits-all" compliance software, Guardian-IO customizes access and value for each type of user.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {userTypes.map((type, index) => (
            <div 
              key={index}
              className={cn(
                "neo-card overflow-hidden transition-all duration-700 transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
            >
              <div className={`p-4 flex items-center gap-3 ${type.color}`}>
                {type.icon}
                <div>
                  <h3 className="text-xl font-bold">{type.title}</h3>
                  <p className="text-sm">{type.subtitle}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="font-medium mb-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-primary">🎯</span> Goal:
                  </span> {type.goal}
                </p>
                
                <p className="font-medium mb-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-primary">📌</span> Why Guardian-IO is Different?
                  </span>
                </p>
                
                <ul className="space-y-3">
                  {type.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypePricing;
