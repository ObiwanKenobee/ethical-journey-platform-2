
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Globe, 
  Filter, 
  Download, 
  Share2, 
  Search, 
  MapPin, 
  Shield, 
  AlertTriangle, 
  Check, 
  BarChart3,
  Layers,
  Info,
  Users,
  FileCheck,
  Truck,
  Settings,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

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
    aiInsights: "Low risk region with strong regulatory compliance. Recent worker reports show positive sentiment.",
    industries: ["Electronics", "Software"],
    certifications: ["ISO 9001", "Fair Trade"],
    workforceCount: 5200,
    co2Emissions: "Low",
    laborRating: "A+"
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
    aiInsights: "Strong compliance framework in place. Recent regulatory changes require additional documentation.",
    industries: ["Finance", "Consulting"],
    certifications: ["SOC 2", "ISO 27001"],
    workforceCount: 9400,
    co2Emissions: "Medium-Low",
    laborRating: "A"
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
    aiInsights: "Excellent ESG compliance. Brexit-related regulatory shifts have been well-managed.",
    industries: ["Finance", "Manufacturing", "Pharmaceuticals"],
    certifications: ["ISO 14001", "B Corp"],
    workforceCount: 11200,
    co2Emissions: "Low",
    laborRating: "A+"
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
    aiInsights: "Recent energy policy changes have impacted manufacturing compliance. Recommend reassessment.",
    industries: ["Automotive", "Electronics"],
    certifications: ["ISO 9001"],
    workforceCount: 7800,
    co2Emissions: "Medium",
    laborRating: "B+"
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
    aiInsights: "Growing compliance concerns with tier-2 suppliers. Recommend deeper supply chain audit.",
    industries: ["Electronics", "Logistics", "Semiconductors"],
    certifications: ["ISO 9001"],
    workforceCount: 14500,
    co2Emissions: "Medium",
    laborRating: "B"
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
    aiInsights: "Strong environmental compliance. Recent policy changes strengthen labor protections.",
    industries: ["Mining", "Agriculture"],
    certifications: ["ISO 14001", "Fair Trade"],
    workforceCount: 4200,
    co2Emissions: "Medium-Low",
    laborRating: "A"
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
    aiInsights: "Aging workforce presents compliance challenges. Recent regulatory changes require updates.",
    industries: ["Electronics", "Automotive", "Robotics"],
    certifications: ["ISO 9001", "ISO 14001"],
    workforceCount: 19800,
    co2Emissions: "Medium",
    laborRating: "B+"
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
    aiInsights: "High risk detected in agricultural supply chains. Worker reports indicate potential labor issues.",
    industries: ["Agriculture", "Manufacturing", "Textiles"],
    certifications: [],
    workforceCount: 8700,
    co2Emissions: "High",
    laborRating: "C"
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
    aiInsights: "Emerging compliance concerns in mining operations. Recommend immediate audit and intervention.",
    industries: ["Mining", "Agriculture"],
    certifications: [],
    workforceCount: 3900,
    co2Emissions: "High",
    laborRating: "C-"
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
    aiInsights: "Textile industry compliance remains challenging. Recent worker reports show concerning patterns.",
    industries: ["Textiles", "Manufacturing"],
    certifications: ["ISO 9001"],
    workforceCount: 16300,
    co2Emissions: "Medium-High",
    laborRating: "C+"
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
    aiInsights: "Improving compliance scores, but supply chain transparency remains challenging.",
    industries: ["Electronics", "Manufacturing", "Automotive"],
    certifications: ["ISO 9001", "ISO 14001"],
    workforceCount: 25400,
    co2Emissions: "Medium-High",
    laborRating: "B-"
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
    aiInsights: "Construction sector labor compliance requires immediate attention. Recommend enhanced monitoring.",
    industries: ["Construction", "Logistics", "Retail"],
    certifications: ["ISO 9001"],
    workforceCount: 6800,
    co2Emissions: "High",
    laborRating: "C"
  }
];

const supplyRoutes = [
  { id: 1, from: 7, to: 5, type: "sea", riskLevel: "medium", volume: "high", distance: 5400, co2: 2850 },
  { id: 2, from: 5, to: 3, type: "sea", riskLevel: "low", volume: "high", distance: 10800, co2: 5200 },
  { id: 3, from: 3, to: 1, type: "air", riskLevel: "low", volume: "medium", distance: 8700, co2: 7800 },
  { id: 4, from: 11, to: 7, type: "sea", riskLevel: "medium", volume: "high", distance: 1800, co2: 920 },
  { id: 5, from: 11, to: 5, type: "sea", riskLevel: "medium", volume: "high", distance: 4200, co2: 2100 },
  { id: 6, from: 10, to: 12, type: "land", riskLevel: "high", volume: "medium", distance: 1900, co2: 780 },
  { id: 7, from: 12, to: 3, type: "sea", riskLevel: "medium", volume: "medium", distance: 6800, co2: 3400 },
  { id: 8, from: 9, to: 12, type: "sea", riskLevel: "high", volume: "low", distance: 3600, co2: 1800 },
  { id: 9, from: 8, to: 2, type: "sea", riskLevel: "medium", volume: "medium", distance: 8400, co2: 4100 },
  { id: 10, from: 2, to: 1, type: "land", riskLevel: "low", volume: "high", distance: 4800, co2: 1400 },
  { id: 11, from: 6, to: 5, type: "sea", riskLevel: "low", volume: "medium", distance: 6200, co2: 3100 },
  { id: 12, from: 4, to: 3, type: "land", riskLevel: "low", volume: "high", distance: 1100, co2: 420 }
];

interface SupplierDetail {
  name: string;
  id: string;
  riskScore: number;
  complianceStatus: string;
  lastAudit: string;
  products: string[];
  certifications: string[];
  workforceSize: number;
  workforceComposition: {
    male: number;
    female: number;
    nonBinary: number;
  };
  laborIssues: {
    open: number;
    resolved: number;
    critical: number;
  };
}

// Sample supplier data for demonstration
const supplierData: Record<string, SupplierDetail[]> = {
  "1": [
    {
      name: "TechFusion Industries",
      id: "TF-2315",
      riskScore: 18,
      complianceStatus: "Compliant",
      lastAudit: "2023-11-10",
      products: ["Semiconductors", "Circuit Boards"],
      certifications: ["ISO 9001", "ISO 14001", "Fair Labor"],
      workforceSize: 1250,
      workforceComposition: {
        male: 60,
        female: 38,
        nonBinary: 2
      },
      laborIssues: {
        open: 2,
        resolved: 14,
        critical: 0
      }
    },
    {
      name: "Innovatech Solutions",
      id: "ITS-9876",
      riskScore: 22,
      complianceStatus: "Compliant",
      lastAudit: "2023-10-22",
      products: ["Software Development", "Cloud Services"],
      certifications: ["ISO 27001", "SOC 2"],
      workforceSize: 850,
      workforceComposition: {
        male: 65,
        female: 33,
        nonBinary: 2
      },
      laborIssues: {
        open: 1,
        resolved: 8,
        critical: 0
      }
    }
  ],
  "8": [
    {
      name: "AgroBrazil Exports",
      id: "ABE-4532",
      riskScore: 68,
      complianceStatus: "Non-Compliant",
      lastAudit: "2023-07-15",
      products: ["Coffee", "Cacao", "Sugar"],
      certifications: [],
      workforceSize: 3200,
      workforceComposition: {
        male: 72,
        female: 28,
        nonBinary: 0
      },
      laborIssues: {
        open: 14,
        resolved: 6,
        critical: 3
      }
    },
    {
      name: "TextileMundo SA",
      id: "TM-7821",
      riskScore: 61,
      complianceStatus: "Under Review",
      lastAudit: "2023-08-30",
      products: ["Cotton Textiles", "Apparel"],
      certifications: ["ISO 9001"],
      workforceSize: 1750,
      workforceComposition: {
        male: 45,
        female: 55,
        nonBinary: 0
      },
      laborIssues: {
        open: 8,
        resolved: 11,
        critical: 2
      }
    }
  ]
};

// Worker reports for locations
const workerReports = {
  // Low risk locations have mostly positive reports
  "1": [
    { id: "WR-2301", severity: "low", verified: true, date: "2023-11-20", issue: "Cafeteria food quality concern", status: "Resolved", resolution: "Menu expanded with healthier options" },
    { id: "WR-2302", severity: "low", verified: true, date: "2023-11-15", issue: "HVAC temperature inconsistency", status: "Resolved", resolution: "Climate control system updated" }
  ],
  // High risk locations have more severe reports
  "8": [
    { id: "WR-8401", severity: "high", verified: true, date: "2023-10-05", issue: "Overtime without compensation", status: "Open", resolution: "" },
    { id: "WR-8402", severity: "critical", verified: true, date: "2023-09-22", issue: "Unsafe working conditions in warehouse", status: "In Progress", resolution: "Safety audit scheduled" },
    { id: "WR-8403", severity: "high", verified: true, date: "2023-09-15", issue: "Child labor allegations at supplier", status: "In Progress", resolution: "Investigation team deployed" }
  ]
};

const GlobalMapContent = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("map");
  const [mapView, setMapView] = useState<"standard" | "risk" | "compliance" | "emissions">("standard");
  const [showRoutes, setShowRoutes] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [filterIndustry, setFilterIndustry] = useState<string>("all");
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierDetail | null>(null);
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.industries.some(ind => ind.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = filterRegion === "all" || location.region === filterRegion;
    const matchesRisk = filterRisk === "all" || location.riskLevel === filterRisk;
    const matchesIndustry = filterIndustry === "all" || location.industries.some(ind => ind === filterIndustry);
    
    return matchesSearch && matchesRegion && matchesRisk && matchesIndustry;
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
    setSelectedSupplier(null);
    setSelectedTab("map");
  };

  const handleViewSupplier = (supplier: SupplierDetail) => {
    setSelectedSupplier(supplier);
  };

  const handleBackToLocation = () => {
    setSelectedSupplier(null);
  };

  const getRiskColor = (riskLevel: string): string => {
    switch(riskLevel) {
      case "low": return "bg-green-500";
      case "medium": return "bg-amber-500";
      case "high": return "bg-red-500";
      case "critical": return "bg-red-800";
      default: return "bg-blue-500";
    }
  };

  const getLocationColor = (location: any): string => {
    if (mapView === "standard" || mapView === "risk") {
      return getRiskColor(location.riskLevel);
    } else if (mapView === "compliance") {
      return location.complianceScore >= 80 ? "bg-green-500" : 
             location.complianceScore >= 70 ? "bg-amber-500" : "bg-red-500";
    } else if (mapView === "emissions") {
      return location.co2Emissions === "Low" ? "bg-green-500" :
             location.co2Emissions === "Medium-Low" ? "bg-green-400" :
             location.co2Emissions === "Medium" ? "bg-amber-500" :
             location.co2Emissions === "Medium-High" ? "bg-amber-600" : "bg-red-500";
    }
    return "bg-blue-500";
  };

  const handleAddSupplier = () => {
    setIsAddingSupplier(true);
    setTimeout(() => {
      setIsAddingSupplier(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Global Supply Chain Map</h2>
          <p className="text-muted-foreground">AI-powered visualization of your global supplier network with real-time risk analysis</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          <Button variant="default" size="sm" className="flex items-center gap-1" onClick={handleAddSupplier} disabled={isAddingSupplier}>
            <MapPin className="h-4 w-4" />
            <span>{isAddingSupplier ? "Adding..." : "Add Supplier"}</span>
          </Button>
        </div>
      </header>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search suppliers, regions, or industries..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={filterRegion} onValueChange={setFilterRegion}>
            <SelectTrigger className="w-[170px]">
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
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterIndustry} onValueChange={setFilterIndustry}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Software">Software</SelectItem>
              <SelectItem value="Automotive">Automotive</SelectItem>
              <SelectItem value="Textiles">Textiles</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Agriculture">Agriculture</SelectItem>
              <SelectItem value="Mining">Mining</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Construction">Construction</SelectItem>
              <SelectItem value="Logistics">Logistics</SelectItem>
              <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedLocation}>Location Details</TabsTrigger>
          <TabsTrigger value="supplier" disabled={!selectedSupplier}>Supplier Details</TabsTrigger>
          <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="p-0">
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            <Button 
              variant={mapView === "standard" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setMapView("standard")}
            >
              <Globe className="h-4 w-4 mr-2" />
              Standard View
            </Button>
            <Button 
              variant={mapView === "risk" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setMapView("risk")}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Risk Heatmap
            </Button>
            <Button 
              variant={mapView === "compliance" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setMapView("compliance")}
            >
              <FileCheck className="h-4 w-4 mr-2" />
              Compliance Status
            </Button>
            <Button 
              variant={mapView === "emissions" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setMapView("emissions")}
            >
              <Layers className="h-4 w-4 mr-2" />
              Carbon Emissions
            </Button>
            <Button 
              variant={showRoutes ? "default" : "outline"} 
              size="sm" 
              onClick={() => setShowRoutes(!showRoutes)}
            >
              <Truck className="h-4 w-4 mr-2" />
              {showRoutes ? "Hide Routes" : "Show Routes"}
            </Button>
          </div>

          <div className={cn(
            "relative aspect-[2/1] bg-accent/20 overflow-hidden transition-all duration-700 transform rounded-xl shadow-md",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
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
                    getLocationColor(location),
                    `before:${getLocationColor(location)}/30`,
                    activeLocation === location.id && "ring-2 ring-white"
                  )}
                ></div>
                
                {activeLocation === location.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-background/90 backdrop-blur-sm text-sm rounded-lg shadow-lg z-20 border border-border">
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
              <p><span className="font-bold">{filteredLocations.length}</span> Locations</p>
              <p><span className="font-bold">{filteredLocations.reduce((sum, loc) => sum + loc.supplierCount, 0)}</span> Suppliers</p>
              <p><span className="font-bold">{filteredLocations.reduce((sum, loc) => sum + loc.workforceCount, 0).toLocaleString()}+</span> Workers</p>
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
                          <Shield className="h-4 w-4" />
                          <span>AI Risk Assessment</span>
                        </h4>
                        <div className="bg-background p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Info className="h-4 w-4 text-blue-500" />
                            <p className="text-sm">{selectedLocation.aiInsights}</p>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-xs mb-1">Risk Score: {selectedLocation.riskScore}/100</p>
                            <Progress value={selectedLocation.riskScore} max={100} className="h-2" 
                              style={{
                                background: 'linear-gradient(to right, rgb(34 197 94), rgb(245 158 11), rgb(239 68 68))'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Industries & Certifications</h4>
                          <div className="bg-background p-3 rounded-lg">
                            <div className="flex flex-wrap gap-1 mb-3">
                              {selectedLocation.industries.map((industry: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {industry}
                                </Badge>
                              ))}
                            </div>
                            
                            <div>
                              <h5 className="text-xs font-medium mb-1">Certifications:</h5>
                              {selectedLocation.certifications.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {selectedLocation.certifications.map((cert: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs bg-green-500/10">
                                      <Check className="h-3 w-3 mr-1" /> {cert}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground">No certifications</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Worker Reports</h4>
                          <div className="bg-background p-3 rounded-lg">
                            {workerReports[selectedLocation.id as keyof typeof workerReports]?.length > 0 ? (
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {workerReports[selectedLocation.id as keyof typeof workerReports]?.map((report: any) => (
                                  <div key={report.id} className="text-xs p-2 border-l-2 border-l-muted-foreground">
                                    <div className="flex justify-between mb-1">
                                      <div className="flex items-center gap-1">
                                        <Badge variant={
                                          report.severity === "low" ? "default" :
                                          report.severity === "medium" ? "secondary" :
                                          report.severity === "high" ? "destructive" : "outline"
                                        } className="text-[10px]">
                                          {report.severity}
                                        </Badge>
                                        <span className="font-medium">{report.id}</span>
                                      </div>
                                      <span>{new Date(report.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="mb-1">{report.issue}</p>
                                    <div className="flex justify-between text-[10px]">
                                      <Badge variant={
                                        report.status === "Resolved" ? "default" :
                                        report.status === "In Progress" ? "secondary" : "outline"
                                      } className="text-[10px]">
                                        {report.status}
                                      </Badge>
                                      {report.resolution && <span className="text-muted-foreground">{report.resolution}</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground">No worker reports available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Key Suppliers</CardTitle>
                    <CardDescription>Suppliers and manufacturers in this location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {supplierData[selectedLocation.id as keyof typeof supplierData] ? (
                        supplierData[selectedLocation.id as keyof typeof supplierData].map((supplier) => (
                          <div key={supplier.id} className="p-3 bg-muted rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium text-sm">{supplier.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {supplier.id}</p>
                              </div>
                              <Badge variant={
                                supplier.riskScore < 30 ? "default" :
                                supplier.riskScore < 50 ? "secondary" : "destructive"
                              } className="text-xs">
                                {supplier.riskScore}/100
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-2">
                              {supplier.products.map((product, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {product}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{supplier.workforceSize.toLocaleString()}</span>
                              </div>
                              
                              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => handleViewSupplier(supplier)}>
                                Details
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-4">
                          <p className="text-sm text-muted-foreground">No supplier data available</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Add Supplier
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="supplier">
          {selectedSupplier && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-b-xl">
              <Button variant="ghost" size="sm" onClick={handleBackToLocation} className="mb-4">
                ← Back to Location Details
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedSupplier.name}</CardTitle>
                        <CardDescription>ID: {selectedSupplier.id}</CardDescription>
                      </div>
                      <Badge variant={
                        selectedSupplier.complianceStatus === "Compliant" ? "default" :
                        selectedSupplier.complianceStatus === "Under Review" ? "secondary" : "destructive"
                      }>
                        {selectedSupplier.complianceStatus}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Risk Assessment</h4>
                        <div className="bg-background p-3 rounded-lg">
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs mb-1">Risk Score: {selectedSupplier.riskScore}/100</p>
                              <Progress value={selectedSupplier.riskScore} max={100} className="h-2"
                                style={{
                                  background: 'linear-gradient(to right, rgb(34 197 94), rgb(245 158 11), rgb(239 68 68))'
                                }}
                              />
                            </div>
                            
                            <div className="text-xs">
                              <div className="flex justify-between mb-1">
                                <span>Last Audited:</span>
                                <span>{new Date(selectedSupplier.lastAudit).toLocaleDateString()}</span>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                                <div className="bg-red-50 p-2 rounded">
                                  <p className="text-red-600 font-bold">{selectedSupplier.laborIssues.open}</p>
                                  <p className="text-xs text-muted-foreground">Open Issues</p>
                                </div>
                                <div className="bg-amber-50 p-2 rounded">
                                  <p className="text-amber-600 font-bold">{selectedSupplier.laborIssues.critical}</p>
                                  <p className="text-xs text-muted-foreground">Critical</p>
                                </div>
                                <div className="bg-green-50 p-2 rounded">
                                  <p className="text-green-600 font-bold">{selectedSupplier.laborIssues.resolved}</p>
                                  <p className="text-xs text-muted-foreground">Resolved</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Workforce Analysis</h4>
                        <div className="bg-background p-3 rounded-lg">
                          <p className="text-xs mb-2">Total Workforce: <span className="font-bold">{selectedSupplier.workforceSize.toLocaleString()}</span></p>
                          
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Male</span>
                                <span>{selectedSupplier.workforceComposition.male}%</span>
                              </div>
                              <Progress value={selectedSupplier.workforceComposition.male} max={100} className="h-2 bg-muted" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Female</span>
                                <span>{selectedSupplier.workforceComposition.female}%</span>
                              </div>
                              <Progress value={selectedSupplier.workforceComposition.female} max={100} className="h-2 bg-muted" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Non-Binary</span>
                                <span>{selectedSupplier.workforceComposition.nonBinary}%</span>
                              </div>
                              <Progress value={selectedSupplier.workforceComposition.nonBinary} max={100} className="h-2 bg-muted" />
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <Button variant="ghost" size="sm" className="text-xs">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              <span>View Full Demographics</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Blockchain Verification</h4>
                        <div className="bg-background p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            {selectedSupplier.certifications.length > 0 ? (
                              <Badge variant="outline" className="bg-green-500/10 text-green-700">
                                <Check className="h-3 w-3 mr-1" /> 
                                Blockchain Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-500/10 text-red-700">
                                <AlertTriangle className="h-3 w-3 mr-1" /> 
                                Not Verified
                              </Badge>
                            )}
                            
                            <span className="text-xs text-muted-foreground">
                              {selectedSupplier.certifications.length > 0 
                                ? "All certifications verified on blockchain" 
                                : "No blockchain verification available"}
                            </span>
                          </div>
                          
                          {selectedSupplier.certifications.length > 0 && (
                            <div className="space-y-1">
                              <h5 className="text-xs font-medium">Verified Certifications:</h5>
                              <div className="flex flex-wrap gap-1">
                                {selectedSupplier.certifications.map((cert, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-2">AI-Generated Insights</h4>
                        <div className="bg-background p-3 rounded-lg">
                          {selectedSupplier.riskScore < 30 ? (
                            <div className="text-xs space-y-2">
                              <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                <div>
                                  <p className="font-medium text-green-800">Low Risk Supplier</p>
                                  <p>This supplier maintains excellent compliance records and has minimal labor concerns. Regular audits confirm consistent ethical practices.</p>
                                </div>
                              </div>
                              <p>Recommendation: Continue standard monitoring protocols and consider featuring this supplier in ESG reporting as an exemplar.</p>
                            </div>
                          ) : selectedSupplier.riskScore < 50 ? (
                            <div className="text-xs space-y-2">
                              <div className="flex items-start gap-2 p-2 bg-amber-50 rounded">
                                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                                <div>
                                  <p className="font-medium text-amber-800">Medium Risk Detected</p>
                                  <p>Our AI has identified several potential compliance issues that require attention. Recent worker reports suggest some labor practice concerns.</p>
                                </div>
                              </div>
                              <p>Recommendation: Schedule a focused audit within 30 days and implement more frequent check-ins with worker representatives.</p>
                            </div>
                          ) : (
                            <div className="text-xs space-y-2">
                              <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
                                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                                <div>
                                  <p className="font-medium text-red-800">High Risk Alert</p>
                                  <p>Urgent intervention required. Multiple compliance violations detected, including potential labor rights issues. Supply chain ethics significantly compromised.</p>
                                </div>
                              </div>
                              <p>Recommendation: Immediate audit required. Consider suspending new orders until compliance issues are resolved. Develop formal remediation plan.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Actions & Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Supplier Actions</h4>
                        <div className="space-y-2">
                          <Button variant="default" size="sm" className="w-full justify-start">
                            <FileCheck className="h-4 w-4 mr-2" />
                            Request Audit
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Users className="h-4 w-4 mr-2" />
                            Worker Voice Survey
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Shield className="h-4 w-4 mr-2" />
                            Review Compliance
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-1 pt-2 border-t border-border">
                        <h4 className="text-sm font-medium">Recent Documents</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <FileCheck className="h-4 w-4 mr-2 text-blue-500" />
                              <span>Audit Report</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(selectedSupplier.lastAudit).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <FileCheck className="h-4 w-4 mr-2 text-blue-500" />
                              <span>Worker Interviews</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(Date.now() - 7 * 86400000).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <FileCheck className="h-4 w-4 mr-2 text-blue-500" />
                              <span>Environmental Report</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(Date.now() - 30 * 86400000).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="analytics" className="p-0">
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
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Supply Chain Intelligence</CardTitle>
                  <CardDescription>AI-powered network analysis</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">High Risk Supplier Connections</p>
                        <p className="text-xs text-muted-foreground">8 Tier-1 suppliers connect to high-risk Tier-2</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Geographic Concentration</p>
                        <p className="text-xs text-muted-foreground">42% of electronics suppliers in Southeast Asia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Route Optimization</p>
                        <p className="text-xs text-muted-foreground">12% carbon reduction possible with new routes</p>
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
  );
};

export default GlobalMapContent;
