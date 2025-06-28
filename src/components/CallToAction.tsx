
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      <div className="container-tight">
        <div className="glass-card overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 py-10 px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-primary animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-bold animate-fade-up">
                  Their Freedom Depends On Our Choices
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
                Every day, the products we buy connect us to people we'll never meet. Through Marvel Avengers, 
                these invisible connections become pathways for dignity rather than exploitation. Join us in building 
                a world where ethical supply chains are the rule, not the exception.
              </p>
            </div>
            
            <Link 
              to="/join" 
              className="btn-primary whitespace-nowrap flex items-center gap-2 group animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              Join the Movement
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
