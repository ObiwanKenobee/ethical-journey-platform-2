
import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "How does Guardian-IO compare to traditional compliance tools?",
    answer: "Guardian-IO eliminates manual compliance tracking with AI & blockchain automation. Unlike traditional tools that rely on manual data entry and human verification, our platform uses artificial intelligence to automatically detect risks, verify compliance, and generate reports in real-time."
  },
  {
    question: "Can I cancel at any time?",
    answer: "Yes. Our transparent pricing ensures no lock-in contracts. You can upgrade, downgrade or cancel your subscription at any time without penalty. For annual plans, we offer a prorated refund for the unused portion."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. End-to-end encryption and blockchain verification ensure security. We use enterprise-grade security protocols, including ISO 27001 and SOC 2 Type II compliance. Your data is encrypted both in transit and at rest, and our blockchain verification creates an immutable audit trail."
  },
  {
    question: "Do you offer custom pricing for enterprises?",
    answer: "Yes! We tailor solutions based on company size and compliance needs. Our enterprise team will work with you to understand your specific requirements and create a custom package that scales with your organization."
  },
  {
    question: "How long is the free trial?",
    answer: "Our free trial lasts for 30 days with no credit card required. You'll get access to our core features with some limitations on data volume and advanced analytics."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to additional features. Downgrades take effect at the end of your current billing cycle."
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees for our standard plans. For Enterprise customers with custom integration needs, implementation costs will be outlined in your custom proposal."
  },
  {
    question: "How do you handle data security?",
    answer: "We take security seriously. Guardian-IO is SOC 2 Type II compliant, and we use industry-standard encryption for all data in transit and at rest. All data is stored in secure AWS facilities with regular security audits."
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer: "Yes, we offer special pricing for registered nonprofit organizations. Please contact our sales team with proof of your nonprofit status to discuss available discounts."
  },
  {
    question: "What support is included in each plan?",
    answer: "Free trial users get community forum support. SME plan users receive email support with a 24-hour response time. Enterprise customers get a dedicated account manager and 24/7 priority support. Government and NGO users receive specialized regulatory support."
  }
];

const PricingFaq = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container-tight max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className={cn(
          "transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className={cn(
          "mt-12 text-center transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <p className="mb-6 text-muted-foreground">
            Have more questions? We're here to help.
          </p>
          <button className="btn-secondary">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingFaq;
