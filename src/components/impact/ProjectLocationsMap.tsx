
import React from 'react';
import { MapPin } from 'lucide-react';

const ProjectLocationsMap = () => {
  return (
    <section className="section bg-accent/20">
      <div className="container-tight">
        <h2 className="text-3xl font-bold text-center mb-12">Where We're Making an Impact</h2>
        
        <div className="glass-card p-6 aspect-[16/9] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover opacity-30"></div>
          <div className="relative flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Our Global Presence</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Guardian-IO is active in regions where forced labor and modern slavery are most 
                prevalent, working directly with communities, businesses, and governments to create lasting change.
              </p>
              
              <div className="flex justify-center space-x-8 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">24</p>
                  <p className="text-xs text-muted-foreground">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">118</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">450K+</p>
                  <p className="text-xs text-muted-foreground">Lives Impacted</p>
                </div>
              </div>
              
              <div className="inline-flex items-center text-primary text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Map shows current project locations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectLocationsMap;
