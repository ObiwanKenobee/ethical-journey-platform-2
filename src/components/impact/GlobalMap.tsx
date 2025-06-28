import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  Check, 
  Clock, 
  Filter, 
  Info, 
  MapPin, 
  Plus, 
  RefreshCw, 
  Search, 
  Settings, 
  ShieldAlert, 
  Truck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const locations = [
  { 
    id: 1, 
    name: "San Francisco", 
    x: 15, 
    y: 40, 
    region: "North America", 
    projects: 32,
    riskScore: 24,
    riskLevel: "low",
    complianceScore: 91,
    lastAudit: "2023-11-15",
    supplierCount: 8,
    activeCases: 2,
    supplyChainType: "Technology",
    blockchainVerified: true,
    aiInsights: "Low risk region with strong regulatory compliance. Recent worker reports show positive sentiment."
  },
  { 
    id: 2, 
    name: "New York", 
    x: 23, 
    y: 38, 
    region: "North America", 
    projects: 27,
    riskScore: 32,
    riskLevel: "low",
    complianceScore: 88,
    lastAudit: "2023-12-01",
    supplierCount: 12,
    activeCases: 3,
    supplyChainType: "Finance & Services",
    blockchainVerified: true,
    aiInsights: "Strong compliance framework in place. Recent regulatory changes require additional documentation."
  },
  { 
    id: 3, 
    name: "London", 
    x: 48, 
    y: 33, 
    region: "Europe", 
    projects: 41,
    riskScore: 28,
    riskLevel: "low",
    complianceScore: 93,
    lastAudit: "2023-10-22",
    supplierCount: 15,
    activeCases: 1,
    supplyChainType: "Finance & Manufacturing",
    blockchainVerified: true,
    aiInsights: "Excellent ESG compliance. Brexit-related regulatory shifts have been well-managed."
  },
  { 
    id: 4, 
    name: "Berlin", 
    x: 52, 
    y: 33, 
    region: "Europe", 
    projects: 18,
    riskScore: 35,
    riskLevel: "medium",
    complianceScore: 82,
    lastAudit: "2023-09-18",
    supplierCount: 9,
    activeCases: 4,
    supplyChainType: "Manufacturing & Technology",
    blockchainVerified: true,
    aiInsights: "Recent energy policy changes have impacted manufacturing compliance. Recommend reassessment."
  },
  { 
    id: 5, 
    name: "Singapore", 
    x: 75, 
    y: 55, 
    region: "Asia", 
    projects: 24,
    riskScore: 41,
    riskLevel: "medium",
    complianceScore: 79,
    lastAudit: "2023-11-05",
    supplierCount: 17,
    activeCases: 6,
    supplyChainType: "Electronics & Logistics",
    blockchainVerified: true,
    aiInsights: "Growing compliance concerns with tier-2 suppliers. Recommend deeper supply chain audit."
  },
  { 
    id: 6, 
    name: "Sydney", 
    x: 85, 
    y: 70, 
    region: "Oceania", 
    projects: 15,
    riskScore: 27,
    riskLevel: "low",
    complianceScore: 87,
    lastAudit: "2023-12-10",
    supplierCount: 6,
    activeCases: 2,
    supplyChainType: "Natural Resources",
    blockchainVerified: true,
    aiInsights: "Strong environmental compliance. Recent policy changes strengthen labor protections."
  },
  { 
    id: 7, 
    name: "Tokyo", 
    x: 83, 
    y: 40, 
    region: "Asia", 
    projects: 29,
    riskScore: 38,
    riskLevel: "medium",
    complianceScore: 81,
    lastAudit: "2023-10-28",
    supplierCount: 14,
    activeCases: 5,
    supplyChainType: "Electronics & Automotive",
    blockchainVerified: true,
    aiInsights: "Aging workforce presents compliance challenges. Recent regulatory changes require updates."
  },
  { 
    id: 8, 
    name: "São Paulo", 
    x: 30, 
    y: 65, 
    region: "South America", 
    projects: 12,
    riskScore: 56,
    riskLevel: "high",
    complianceScore: 68,
    lastAudit: "2023-08-15",
    supplierCount: 11,
    activeCases: 8,
    supplyChainType: "Agriculture & Manufacturing",
    blockchainVerified: false,
    aiInsights: "High risk detected in agricultural supply chains. Worker reports indicate potential labor issues."
  },
  { 
    id: 9, 
    name: "Nairobi", 
    x: 55, 
    y: 58, 
    region: "Africa", 
    projects: 8,
    riskScore: 62,
    riskLevel: "high",
    complianceScore: 61,
    lastAudit: "2023-09-05",
    supplierCount: 7,
    activeCases: 5,
    supplyChainType: "Agriculture & Mining",
    blockchainVerified: false,
    aiInsights: "Emerging compliance concerns in mining operations. Recommend immediate audit and intervention."
  },
  { 
    id: 10, 
    name: "Mumbai", 
    x: 65, 
    y: 50, 
    region: "Asia", 
    projects: 18,
    riskScore: 54,
    riskLevel: "high",
    complianceScore: 72,
    lastAudit: "2023-10-10",
    supplierCount: 19,
    activeCases: 7,
    supplyChainType: "Textiles & Manufacturing",
    blockchainVerified: false,
    aiInsights: "Textile industry compliance remains challenging. Recent worker reports show concerning patterns."
  },
  { 
    id: 11, 
    name: "Shanghai", 
    x: 79, 
    y: 45, 
    region: "Asia", 
    projects: 31,
    riskScore: 48,
    riskLevel: "medium",
    complianceScore: 76,
    lastAudit: "2023-11-18",
    supplierCount: 23,
    activeCases: 9,
    supplyChainType: "Electronics & Manufacturing",
    blockchainVerified: true,
    aiInsights: "Improving compliance scores, but supply chain transparency remains challenging."
  },
  { 
    id: 12, 
    name: "Dubai", 
    x: 61, 
    y: 47, 
    region: "Middle East", 
    projects: 14,
    riskScore: 51,
    riskLevel: "high",
    complianceScore: 73,
    lastAudit: "2023-09-30",
    supplierCount: 8,
    activeCases: 6,
    supplyChainType: "Logistics & Construction",
    blockchainVerified: false,
    aiInsights: "Construction sector labor compliance requires immediate attention. Recommend enhanced monitoring."
  }
];

const supplyRoutes = [
  { id: 1, from: 7, to: 5, type: "sea", riskLevel: "medium", volume: "high" },
  { id: 2, from: 5, to: 3, type: "sea", riskLevel: "low", volume: "high" },
  { id: 3, from: 3, to: 1, type: "air", riskLevel: "low", volume: "medium" },
  { id: 4, from: 11, to: 7, type: "sea", riskLevel: "medium", volume: "high" },
  { id: 5, from: 11, to: 5, type: "sea", riskLevel: "medium", volume: "high" },
  { id: 6, from: 10, to: 12, type: "land", riskLevel: "high", volume: "medium" },
  { id: 7, from: 12, to: 3, type: "sea", riskLevel: "medium", volume: "medium" },
  { id: 8, from: 9, to: 12, type: "sea", riskLevel: "high", volume: "low" },
  { id: 9, from: 8, to: 2, type: "sea", riskLevel: "medium", volume: "medium" },
  { id: 10, from: 2, to: 1, type: "land", riskLevel: "low", volume: "high" },
  { id: 11, from: 6, to: 5, type: "sea", riskLevel: "low", volume: "medium" },
  { id: 12, from: 4, to: 3, type: "land", riskLevel: "low", volume: "high" }
];

const GlobalMap = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [showRoutes, setShowRoutes] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = filterRegion === "all" || location.region === filterRegion;
    const matchesRisk = filterRisk === "all" || location.riskLevel === filterRisk;
    
    return matchesSearch && matchesRegion && matchesRisk;
  });

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location);
    setSelectedTab("details");
  };

  const handleBackToMap = () => {
    setSelectedLocation(null);
    setSelectedTab("map");
  };

  const getRiskColor = (riskLevel: string): string => {
    switch(riskLevel) {
      case "low": return "bg-green-500";
      case "medium": return "bg-amber-500";
      case "high": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  const handleAddSupplier = () => {
    setIsAddingSupplier(true);
    setTimeout(() => {
      setIsAddingSupplier(false);
    }, 1500);
  };

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container-tight">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Global Supply Chain Map</h2>
            <p className="text-muted-foreground">Monitor your global supply chain network, risks, and compliance in real-time</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-1" onClick={handleAddSupplier} disabled={isAddingSupplier}>
              <Plus className="h-4 w-4" />
              <span>{isAddingSupplier ? "Adding..." : "Add Supplier"}</span>
            </Button>
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search locations, regions, or suppliers..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="South America">South America</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
                <SelectItem value="Middle East">Middle East</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedLocation}>Supplier Details</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="p-0">
            <div className={cn(
              "relative aspect-[2/1] neo-card overflow-hidden transition-all duration-700 transform rounded-b-xl",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-white bg-opacity-90" onClick={() => setShowRoutes(!showRoutes)}>
                        <Truck className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {showRoutes ? "Hide Routes" : "Show Routes"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-white bg-opacity-90">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Map Settings
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="absolute inset-0 bg-accent/20 rounded-xl">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80')] bg-cover bg-center opacity-20"></div>
              </div>
              
              {showRoutes && supplyRoutes.map((route) => {
                const fromLocation = locations.find(l => l.id === route.from);
                const toLocation = locations.find(l => l.id === route.to);
                
                if (!fromLocation || !toLocation) return null;
                
                const routeColor = route.riskLevel === "high" ? "#ef4444" : 
                                  route.riskLevel === "medium" ? "#f59e0b" : "#22c55e";
                
                const x1 = `${fromLocation.x}%`;
                const y1 = `${fromLocation.y}%`;
                const x2 = `${toLocation.x}%`;
                const y2 = `${toLocation.y}%`;
                
                return (
                  <svg key={route.id} className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                    <line 
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      stroke={routeColor}
                      strokeWidth={route.volume === "high" ? 3 : route.volume === "medium" ? 2 : 1}
                      strokeDasharray={route.type === "sea" ? "5,5" : route.type === "air" ? "10,5" : "none"}
                      strokeOpacity={0.7}
                    />
                  </svg>
                );
              })}
              
              {filteredLocations.map((location) => (
                <div 
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ 
                    left: `${location.x}%`, 
                    top: `${location.y}%`,
                    transition: "all 0.5s ease",
                    transitionDelay: inView ? `${location.id * 100}ms` : '0ms',
                    opacity: inView ? 1 : 0,
                    transform: inView 
                      ? "translate(-50%, -50%) scale(1)" 
                      : "translate(-50%, -50%) scale(0.5)"
                  }}
                  onMouseEnter={() => setActiveLocation(location.id)}
                  onMouseLeave={() => setActiveLocation(null)}
                  onClick={() => handleLocationClick(location)}
                >
                  <div 
                    className={cn(
                      "w-3 h-3 rounded-full relative cursor-pointer",
                      "before:content-[''] before:absolute before:-inset-2 before:rounded-full before:animate-pulse-slow",
                      getRiskColor(location.riskLevel),
                      `before:${getRiskColor(location.riskLevel)}/30`,
                      activeLocation === location.id && "ring-2 ring-white"
                    )}
                  ></div>
                  
                  {activeLocation === location.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 glass text-sm rounded-lg shadow-lg z-20">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold">{location.name}</p>
                        <Badge variant={
                          location.riskLevel === "low" ? "default" : 
                          location.riskLevel === "medium" ? "secondary" : "destructive"
                        } className="ml-1">
                          {location.riskLevel === "low" ? "Low Risk" : 
                           location.riskLevel === "medium" ? "Medium Risk" : "High Risk"}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">{location.region} • {location.supplyChainType}</p>
                      
                      <div className="mt-2 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Compliance Score:</span>
                          <span className={
                            location.complianceScore >= 80 ? "text-green-500" : 
                            location.complianceScore >= 70 ? "text-amber-500" : "text-red-500"
                          }>{location.complianceScore}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Suppliers:</span>
                          <span>{location.supplierCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active Cases:</span>
                          <span>{location.activeCases}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-2">
                        {location.blockchainVerified && (
                          <Badge variant="outline" className="text-xs flex items-center gap-1 bg-blue-500/10">
                            <Check className="h-3 w-3" />
                            <span>Blockchain Verified</span>
                          </Badge>
                        )}
                      </div>
                      
                      <Button variant="secondary" size="sm" className="w-full mt-2" onClick={() => handleLocationClick(location)}>
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="absolute bottom-4 left-4 glass p-3 rounded-lg text-sm max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Low Risk</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">High Risk</span>
                </div>
                
                <div className="border-t border-border pt-2 text-xs text-muted-foreground">
                  <p>Last updated: {lastUpdated.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 glass p-3 rounded-lg text-sm">
                <p><span className="font-bold">32</span> Countries</p>
                <p><span className="font-bold">206</span> Projects</p>
                <p><span className="font-bold">1.2M+</span> Workers Protected</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            {selectedLocation && (
              <div className="space-y-4 p-4 bg-muted/30 rounded-b-xl">
                <Button variant="ghost" size="sm" onClick={handleBackToMap} className="mb-4">
                  ← Back to Global Map
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {selectedLocation.name}
                          {selectedLocation.blockchainVerified && (
                            <Badge variant="outline" className="flex items-center gap-1 bg-blue-500/10">
                              <Check className="h-3 w-3" />
                              <span>Verified</span>
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{selectedLocation.region} • {selectedLocation.supplyChainType}</CardDescription>
                      </div>
                      
                      <Badge variant={
                        selectedLocation.riskLevel === "low" ? "default" : 
                        selectedLocation.riskLevel === "medium" ? "secondary" : "destructive"
                      } className="uppercase">
                        {selectedLocation.riskLevel} Risk
                      </Badge>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-background rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Compliance Score</p>
                          <p className={`text-xl font-bold ${
                            selectedLocation.complianceScore >= 80 ? "text-green-500" : 
                            selectedLocation.complianceScore >= 70 ? "text-amber-500" : "text-red-500"
                          }`}>
                            {selectedLocation.complianceScore}%
                          </p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Suppliers</p>
                          <p className="text-xl font-bold">{selectedLocation.supplierCount}</p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Active Cases</p>
                          <p className="text-xl font-bold">{selectedLocation.activeCases}</p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Last Audit</p>
                          <p className="text-xl font-bold">{new Date(selectedLocation.lastAudit).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <ShieldAlert className="h-4 w-4" />
                            <span>AI Risk Assessment</span>
                          </h4>
                          <p className="text-sm bg-background p-3 rounded-lg">
                            {selectedLocation.aiInsights}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Recent Activity</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs">
                                <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">
                                  <Clock className="h-3 w-3" />
                                </Badge>
                                <span>Compliance audit completed on {new Date(selectedLocation.lastAudit).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">
                                  <AlertTriangle className="h-3 w-3" />
                                </Badge>
                                <span>New worker report filed 3 days ago</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">
                                  <Info className="h-3 w-3" />
                                </Badge>
                                <span>Supply chain route updated 1 week ago</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Actions Required</h4>
                            {selectedLocation.riskLevel === "high" ? (
                              <div className="space-y-2">
                                <Button variant="destructive" size="sm" className="w-full justify-start">
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Schedule Emergency Audit
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  Review Worker Reports
                                </Button>
                              </div>
                            ) : selectedLocation.riskLevel === "medium" ? (
                              <div className="space-y-2">
                                <Button variant="secondary" size="sm" className="w-full justify-start">
                                  <Clock className="h-4 w-4 mr-2" />
                                  Schedule Follow-up Assessment
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <Info className="h-4 w-4 mr-2" />
                                  Review Compliance Documentation
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <Clock className="h-4 w-4 mr-2" />
                                  Schedule Routine Check
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <Info className="h-4 w-4 mr-2" />
                                  Update ESG Metrics
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Connected Supply Chain</CardTitle>
                      <CardDescription>Suppliers and manufacturers connected to this location</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {supplyRoutes
                          .filter(route => route.from === selectedLocation.id || route.to === selectedLocation.id)
                          .map(route => {
                            const isSource = route.from === selectedLocation.id;
                            const connectedLocationId = isSource ? route.to : route.from;
                            const connectedLocation = locations.find(l => l.id === connectedLocationId);
                            
                            if (!connectedLocation) return null;
                            
                            return (
                              <div key={route.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                                <div className="flex items-center gap-2">
                                  <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    getRiskColor(connectedLocation.riskLevel)
                                  )}></div>
                                  <div>
                                    <p className="text-sm font-medium">{connectedLocation.name}</p>
                                    <p className="text-xs text-muted-foreground">{isSource ? "Destination" : "Source"} • {route.type}</p>
                                  </div>
                                </div>
                                
                                <Button variant="ghost" size="sm" onClick={() => handleLocationClick(connectedLocation)}>
                                  View
                                </Button>
                              </div>
                            );
                          })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list">
            <div className="rounded-b-xl overflow-hidden border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Suppliers</TableHead>
                    <TableHead>Last Audit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell className="font-medium">{location.name}</TableCell>
                      <TableCell>{location.region}</TableCell>
                      <TableCell>
                        <Badge variant={
                          location.riskLevel === "low" ? "default" : 
                          location.riskLevel === "medium" ? "secondary" : "destructive"
                        }>
                          {location.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{location.complianceScore}%</TableCell>
                      <TableCell>{location.supplierCount}</TableCell>
                      <TableCell>{new Date(location.lastAudit).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleLocationClick(location)}>
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="rounded-b-xl space-y-4 p-4 bg-muted/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Risk Distribution</CardTitle>
                    <CardDescription>Global supplier risk breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center pt-2">
                    <div className="relative h-32 w-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-full rounded-full overflow-hidden">
                          <div className="h-[33%] w-full bg-red-500"></div>
                          <div className="h-[25%] w-full bg-amber-500"></div>
                          <div className="h-[42%] w-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full mt-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                          <span className="text-xs">Low</span>
                        </div>
                        <p className="font-bold">42%</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                          <span className="text-xs">Medium</span>
                        </div>
                        <p className="font-bold">25%</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                          <span className="text-xs">High</span>
                        </div>
                        <p className="font-bold">33%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Compliance Trend</CardTitle>
                    <CardDescription>6-month compliance improvement</CardDescription>
                  </CardHeader>
                  <CardContent className="h-48 flex items-center justify-center">
                    <div className="relative w-full h-32">
                      <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div className="w-1/6 h-[65%] bg-primary/20 mx-0.5"></div>
                        <div className="w-1/6 h-[60%] bg-primary/20 mx-0.5"></div>
                        <div className="w-1/6 h-[70%] bg-primary/20 mx-0.5"></div>
                        <div className="w-1/6 h-[75%] bg-primary/20 mx-0.5"></div>
                        <div className="w-1/6 h-[78%] bg-primary/20 mx-0.5"></div>
                        <div className="w-1/6 h-[82%] bg-primary/40 mx-0.5"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full border-t border-muted-foreground/20"></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Regional Analysis</CardTitle>
                    <CardDescription>Compliance by region</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">North America</span>
                          <span className="text-xs font-medium">89%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">Europe</span>
                          <span className="text-xs font-medium">87%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">Asia</span>
                          <span className="text-xs font-medium">76%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "76%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">Africa</span>
                          <span className="text-xs font-medium">61%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "61%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">South America</span>
                          <span className="text-xs font-medium">68%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>Actionable intelligence based on your supply chain data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-500/10 border border-amber-200 rounded-lg">
                      <h4 className="font-medium flex items-center gap-2 text-amber-700">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Medium Risk Alert: Textile Supply Chain</span>
                      </h4>
                      <p className="text-sm mt-1 text-muted-foreground">Multiple textile suppliers in South Asia show declining compliance scores over the past 3 months. Consider scheduling audits for these suppliers to address emerging risks.</p>
                    </div>
                    
                    <div className="p-3 bg-red-500/10 border border-red-200 rounded-lg">
                      <h4 className="font-medium flex items-center gap-2 text-red-700">
                        <AlertTriangle className="h-4 w-4" />
                        <span>High Risk Alert: Agricultural Supply Chain</span>
                      </h4>
                      <p className="text-sm mt-1 text-muted-foreground">Worker reports in South American agricultural suppliers indicate potential labor violations. Immediate investigation recommended to ensure compliance with international standards.</p>
                    </div>
                    
                    <div className="p-3 bg-green-500/10 border border-green-200 rounded-lg">
                      <h4 className="font-medium flex items-center gap-2 text-green-700">
                        <Check className="h-4 w-4" />
                        <span>Compliance Improvement Opportunity</span>
                      </h4>
                      <p className="text-sm mt-1 text-muted-foreground">Your European suppliers show high compliance but could benefit from blockchain verification. Consider implementing our verification program to enhance transparency.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default GlobalMap;
