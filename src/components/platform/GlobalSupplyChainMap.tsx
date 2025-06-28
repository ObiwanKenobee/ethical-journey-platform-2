
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Globe, MapPin, Shield, Database, BarChart3, AlertTriangle, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const GlobalSupplyChainMap = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container-tight">
        <h2 className="text-3xl font-bold text-center mb-6">Interactive Global Supply Chain Map</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Our AI-powered visualization brings unprecedented transparency to your entire supplier network, helping you track, audit, and optimize every aspect of your global supply chain.
        </p>
        
        <div className={cn(
          "glass-card p-6 aspect-[16/9] relative overflow-hidden mb-8 shadow-lg transform transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover opacity-20"></div>
          <div className="relative flex flex-col items-center justify-center h-full">
            <Globe className="h-16 w-16 text-primary mb-4" />
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Global Supply Chain Visualization</h3>
              <p className="text-muted-foreground mb-6">
                Track every supplier, factory, and distribution point with blockchain-verified compliance and AI-powered risk scores. 
                Identify high-risk areas before they become compliance problems.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-background/50 p-3 rounded-lg border border-border text-center transform transition-all hover:scale-105">
                  <p className="text-2xl font-bold text-primary">127</p>
                  <p className="text-xs text-muted-foreground">Countries</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-border text-center transform transition-all hover:scale-105">
                  <p className="text-2xl font-bold text-primary">4,829</p>
                  <p className="text-xs text-muted-foreground">Suppliers</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-border text-center transform transition-all hover:scale-105">
                  <p className="text-2xl font-bold text-primary">312</p>
                  <p className="text-xs text-muted-foreground">Risk Zones</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-border text-center transform transition-all hover:scale-105">
                  <p className="text-2xl font-bold text-primary">95%</p>
                  <p className="text-xs text-muted-foreground">Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={cn(
            "glass-card transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )} style={{ transitionDelay: inView ? '100ms' : '0ms' }}>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-3">AI-Powered Risk Scores</h3>
            <p className="text-muted-foreground mb-4">
              Instantly assess supplier risk based on compliance reports, worker feedback, and fraud detection algorithms.
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">Forced Labor Detection</Badge>
              <Badge variant="outline" className="text-xs">Fraud Analysis</Badge>
              <Badge variant="outline" className="text-xs">Risk Prediction</Badge>
            </div>
          </div>
          
          <div className={cn(
            "glass-card transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )} style={{ transitionDelay: inView ? '200ms' : '0ms' }}>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Blockchain Verification</h3>
            <p className="text-muted-foreground mb-4">
              Every supplier's ethical rating, audit history, and ESG score is transparently recorded on-chain for immutable proof.
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">Tamper-Proof Records</Badge>
              <Badge variant="outline" className="text-xs">Compliance Certification</Badge>
              <Badge variant="outline" className="text-xs">Audit Trail</Badge>
            </div>
          </div>
          
          <div className={cn(
            "glass-card transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )} style={{ transitionDelay: inView ? '300ms' : '0ms' }}>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Smart Risk Alerts</h3>
            <p className="text-muted-foreground mb-4">
              AI flags geopolitical instability, forced labor hotspots, and non-compliant suppliers before they impact your business.
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">Real-Time Monitoring</Badge>
              <Badge variant="outline" className="text-xs">Predictive Intelligence</Badge>
              <Badge variant="outline" className="text-xs">Compliance Warnings</Badge>
            </div>
          </div>
          
          <div className={cn(
            "glass-card transform transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )} style={{ transitionDelay: inView ? '400ms' : '0ms' }}>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Worker Verification</h3>
            <p className="text-muted-foreground mb-4">
              Empower workers with a secure, anonymous reporting system that provides ground-truth verification of labor conditions.
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">Anonymous Reporting</Badge>
              <Badge variant="outline" className="text-xs">Labor Rights Monitoring</Badge>
              <Badge variant="outline" className="text-xs">Ethics Validation</Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" className="animate-bounce">
            <Check className="mr-2 h-4 w-4" /> Schedule Platform Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GlobalSupplyChainMap;
