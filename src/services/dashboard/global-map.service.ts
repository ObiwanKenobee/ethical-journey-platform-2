
import { CrudService } from '../api.crud.service';

// Types
export interface MapLocation {
  id: string;
  name: string;
  type: 'supplier' | 'factory' | 'distributor' | 'headquarters' | 'warehouse' | 'retail';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  country: string;
  region: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  metrics: {
    name: string;
    value: number;
    unit: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface RiskZone {
  id: string;
  name: string;
  type: 'environmental' | 'social' | 'political' | 'economic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  geometry: {
    type: 'polygon';
    coordinates: number[][][];
  };
  description: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TradeRoute {
  id: string;
  name: string;
  type: 'air' | 'sea' | 'land' | 'rail';
  origin_id: string;
  destination_id: string;
  waypoints?: {
    lat: number;
    lng: number;
  }[];
  distance: number;
  average_time: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  updated_at: string;
}

// Services
export const mapLocationService = new CrudService<MapLocation>('map_locations');
export const riskZoneService = new CrudService<RiskZone>('risk_zones');
export const tradeRouteService = new CrudService<TradeRoute>('trade_routes');

// Additional methods
export const globalMapService = {
  /**
   * Get locations by type
   */
  async getLocationsByType(type: MapLocation['type']): Promise<MapLocation[]> {
    const response = await mapLocationService.getAll({ type });
    return response.data || [];
  },

  /**
   * Get locations by risk level
   */
  async getLocationsByRiskLevel(level: MapLocation['risk_level']): Promise<MapLocation[]> {
    const response = await mapLocationService.getAll({ risk_level: level });
    return response.data || [];
  },

  /**
   * Get active risk zones
   */
  async getActiveRiskZones(): Promise<RiskZone[]> {
    const today = new Date().toISOString();
    const response = await riskZoneService.getAll({
      start_date_lte: today,
      end_date_gte: today,
      end_date_null: true
    });
    return response.data || [];
  },

  /**
   * Get routes between locations
   */
  async getRoutesBetweenLocations(originId: string, destinationId: string): Promise<TradeRoute[]> {
    const response = await tradeRouteService.getAll({
      origin_id: originId,
      destination_id: destinationId
    });
    return response.data || [];
  },

  /**
   * Get locations within bounds
   */
  async getLocationsWithinBounds(bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }): Promise<MapLocation[]> {
    const response = await mapLocationService.getAll({
      lat_gte: bounds.south,
      lat_lte: bounds.north,
      lng_gte: bounds.west,
      lng_lte: bounds.east
    });
    return response.data || [];
  }
};
