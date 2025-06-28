
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle, Shield, Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ImpactMetricsMapProps {
  view: 'global' | 'region' | 'industry';
}

// Sample data for supply chain nodes
const supplyChainNodes = [
  { id: 1, lat: 40.7128, lng: -74.0060, name: 'New York Distribution', type: 'warehouse', risk: 'low', compliance: 95 },
  { id: 2, lat: 34.0522, lng: -118.2437, name: 'Los Angeles Factory', type: 'factory', risk: 'low', compliance: 91 },
  { id: 3, lat: 51.5074, lng: -0.1278, name: 'London Logistics', type: 'warehouse', risk: 'low', compliance: 94 },
  { id: 4, lat: 48.8566, lng: 2.3522, name: 'Paris Production', type: 'factory', risk: 'medium', compliance: 88 },
  { id: 5, lat: 35.6762, lng: 139.6503, name: 'Tokyo Assembly', type: 'factory', risk: 'low', compliance: 96 },
  { id: 6, lat: 22.3193, lng: 114.1694, name: 'Hong Kong Distribution', type: 'warehouse', risk: 'medium', compliance: 84 },
  { id: 7, lat: 19.0760, lng: 72.8777, name: 'Mumbai Textiles', type: 'factory', risk: 'high', compliance: 72 },
  { id: 8, lat: 31.2304, lng: 121.4737, name: 'Shanghai Electronics', type: 'factory', risk: 'medium', compliance: 79 },
  { id: 9, lat: -33.8688, lng: 151.2093, name: 'Sydney Distribution', type: 'warehouse', risk: 'low', compliance: 92 },
  { id: 10, lat: -22.9068, lng: -43.1729, name: 'Rio Materials', type: 'raw-materials', risk: 'high', compliance: 69 },
  { id: 11, lat: 55.7558, lng: 37.6173, name: 'Moscow Logistics', type: 'warehouse', risk: 'medium', compliance: 81 },
  { id: 12, lat: 1.3521, lng: 103.8198, name: 'Singapore Hub', type: 'warehouse', risk: 'low', compliance: 93 },
];

const ImpactMetricsMap = ({ view }: ImpactMetricsMapProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [mapMode, setMapMode] = useState<'risk' | 'compliance'>('risk');
  
  // In a real implementation, you would use an actual map library
  // For this prototype, we'll create a simple visualization
  
  return (
    <div ref={ref} className="w-full h-full relative overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="sm" 
              variant={mapMode === 'risk' ? 'default' : 'outline'}
              onClick={() => setMapMode('risk')}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Risk View
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Highlight supply chain risk areas
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="sm" 
              variant={mapMode === 'compliance' ? 'default' : 'outline'}
              onClick={() => setMapMode('compliance')}
            >
              <Check className="h-4 w-4 mr-1" />
              Compliance View
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Show compliance scores
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Map Background Placeholder */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover opacity-20"></div>
      
      {/* Map Content */}
      <TooltipProvider>
        <div className="absolute inset-0 flex items-center justify-center">
          {supplyChainNodes.map((node) => {
            // For this prototype, we're placing nodes based on their relative position
            // In a real implementation, you would use map coordinates
            const left = `${((node.lng + 180) / 360) * 100}%`;
            const top = `${((90 - node.lat) / 180) * 100}%`;
            
            const getNodeColor = () => {
              if (mapMode === 'risk') {
                switch(node.risk) {
                  case 'low': return 'bg-green-500';
                  case 'medium': return 'bg-yellow-500';
                  case 'high': return 'bg-red-500';
                  default: return 'bg-primary';
                }
              } else {
                if (node.compliance >= 90) return 'bg-green-500';
                if (node.compliance >= 80) return 'bg-green-300';
                if (node.compliance >= 70) return 'bg-yellow-500';
                return 'bg-red-500';
              }
            };
            
            const nodeColor = getNodeColor();
            
            return (
              <Tooltip key={node.id}>
                <TooltipTrigger asChild>
                  <button
                    className={`absolute w-3 h-3 rounded-full ${nodeColor} hover:w-4 hover:h-4 transition-all duration-200 hover:ring-2 hover:ring-white hover:ring-opacity-50 ${activeNode === node.id ? 'ring-2 ring-white w-4 h-4' : ''}`}
                    style={{ left, top }}
                    onClick={() => setActiveNode(node.id === activeNode ? null : node.id)}
                  />
                </TooltipTrigger>
                <TooltipContent className="p-0 overflow-hidden" side="top">
                  <div className="p-3 max-w-xs">
                    <h4 className="font-semibold text-sm">{node.name}</h4>
                    <div className="flex gap-2 items-center mt-1 text-xs text-muted-foreground">
                      <span className="capitalize">{node.type}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground"/>
                      <span className="capitalize">Risk: {node.risk}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground"/>
                      <span>Compliance: {node.compliance}%</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
      
      {/* Active Node Details Panel */}
      {activeNode && (
        <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg max-w-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{supplyChainNodes.find(n => n.id === activeNode)?.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Type: {supplyChainNodes.find(n => n.id === activeNode)?.type} | 
                Risk Level: {supplyChainNodes.find(n => n.id === activeNode)?.risk} | 
                Compliance Score: {supplyChainNodes.find(n => n.id === activeNode)?.compliance}%
              </p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setActiveNode(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
      
      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3">
        <h4 className="text-xs font-medium mb-2">
          {mapMode === 'risk' ? 'Risk Level' : 'Compliance Score'}
        </h4>
        <div className="flex flex-col gap-2">
          {mapMode === 'risk' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Low Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">High Risk</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">90-100%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-300"></div>
                <span className="text-xs">80-89%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">70-79%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Below 70%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactMetricsMap;
