
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  globalMapService, 
  MapLocation,
  RiskZone 
} from '@/services/dashboard/global-map.service';
import { toast } from '@/hooks/use-toast';
import { RefreshCw, Map, Layers, AlertTriangle } from 'lucide-react';

// Define location types at the module level so it's available throughout the component
const locationTypes: MapLocation['type'][] = [
  'supplier', 'factory', 'distributor', 'headquarters', 'warehouse', 'retail'
];

const SupplyChainMap = () => {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<MapLocation['type'] | 'all'>('all');

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      setLoading(true);
      
      // Get all locations
      const allLocations: MapLocation[] = [];
      
      for (const type of locationTypes) {
        const typeLocations = await globalMapService.getLocationsByType(type);
        allLocations.push(...typeLocations);
      }
      
      setLocations(allLocations);
      
      // Get active risk zones
      const activeZones = await globalMapService.getActiveRiskZones();
      setRiskZones(activeZones);
      
    } catch (error) {
      console.error('Error fetching map data:', error);
      toast({
        title: 'Error loading map data',
        description: 'Could not load supply chain map data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter: MapLocation['type'] | 'all') => {
    setActiveFilter(filter);
  };

  const getFilteredLocations = () => {
    if (activeFilter === 'all') {
      return locations;
    }
    return locations.filter(location => location.type === activeFilter);
  };

  const renderMap = () => {
    return (
      <div className="w-full h-[400px] relative bg-slate-100 rounded-md overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Map className="h-16 w-16 text-muted-foreground mb-3" />
              <p>Interactive Supply Chain Map</p>
              <p className="text-sm text-muted-foreground mt-1">
                Displays {getFilteredLocations().length} locations and {riskZones.length} active risk zones
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle>Global Supply Chain Map</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchMapData}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1" />
            )}
            Refresh
          </Button>
        </div>
        <Tabs value={activeFilter} onValueChange={handleFilterChange} className="w-full mt-2">
          <TabsList className="grid grid-cols-4 sm:grid-cols-7 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="supplier">Suppliers</TabsTrigger>
            <TabsTrigger value="factory">Factories</TabsTrigger>
            <TabsTrigger value="warehouse">Warehouses</TabsTrigger>
            <TabsTrigger value="distributor">Distributors</TabsTrigger>
            <TabsTrigger value="retail">Retail</TabsTrigger>
            <TabsTrigger value="headquarters">HQ</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {renderMap()}
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
              Risk Zones
            </h3>
            <div className="flex flex-wrap gap-2">
              {riskZones.slice(0, 3).map(zone => (
                <Badge key={zone.id} variant="outline" className="text-xs">
                  {zone.name}
                </Badge>
              ))}
              {riskZones.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{riskZones.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <Layers className="h-4 w-4 mr-1 text-blue-500" />
              Location Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {locationTypes.map(type => {
                const count = locations.filter(l => l.type === type).length;
                return count > 0 ? (
                  <Badge key={type} variant="outline" className="text-xs">
                    {type}: {count}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Risk Distribution</h3>
            <div className="flex flex-wrap gap-2">
              {['low', 'medium', 'high', 'critical'].map(risk => {
                const count = locations.filter(l => l.risk_level === risk).length;
                return count > 0 ? (
                  <Badge 
                    key={risk} 
                    variant={
                      risk === 'low' ? 'default' : 
                      risk === 'medium' ? 'secondary' : 
                      risk === 'high' ? 'destructive' : 
                      'outline'
                    }
                    className={risk === 'critical' ? 'bg-red-800 text-white' : risk === 'medium' ? 'bg-yellow-500 text-white' : ''}
                  >
                    {risk}: {count}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyChainMap;
