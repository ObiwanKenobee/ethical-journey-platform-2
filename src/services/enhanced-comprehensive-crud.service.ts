
import { supplyChainCrudService, enhancedSupplierService, supplierEvaluationService, complianceMonitoringService, supplyChainIncidentService, enhancedEsgMetricsService } from './supply-chain-crud.service';
import { CrudService } from './api.crud.service';

// Enhanced risk assessments interface
export interface EnhancedRiskAssessment {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  impact_score: number;
  probability_score: number;
  status: string;
  mitigation_plan?: string;
  due_date?: string;
  created_at: string;
  updated_at?: string;
}

// Export types from supply-chain-crud.service
export type {
  EnhancedSupplier,
  SupplierEvaluation,
  ComplianceMonitoring,
  SupplyChainIncident,
  SupplierPerformance,
  EnhancedEsgMetric
} from './supply-chain-crud.service';

// Create enhanced service instances
export const enhancedRiskCrudService = new CrudService<EnhancedRiskAssessment>('risk_assessments');

// Export all enhanced services
export {
  supplyChainCrudService,
  enhancedSupplierService as supplierCrudService,
  enhancedRiskCrudService as riskCrudService,
  supplierEvaluationService,
  complianceMonitoringService,
  supplyChainIncidentService,
  enhancedEsgMetricsService
};

// Enhanced comprehensive service for dashboard operations
export class EnhancedComprehensiveCrudService {
  
  /**
   * Get dashboard overview data
   */
  async getDashboardOverview() {
    try {
      const [
        complianceOverview,
        riskSummary,
        esgPerformance,
        suppliersWithEvaluations
      ] = await Promise.all([
        supplyChainCrudService.getComplianceOverview(),
        supplyChainCrudService.getRiskAssessmentSummary(),
        supplyChainCrudService.getEsgPerformanceMetrics(),
        supplyChainCrudService.getSuppliersWithEvaluations()
      ]);
      
      return {
        data: {
          compliance: complianceOverview.data,
          risk: riskSummary.data,
          esg: esgPerformance.data,
          suppliers: suppliersWithEvaluations.data?.slice(0, 5) // Latest 5 suppliers
        },
        error: null
      };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
  
  /**
   * Get analytics data for charts and visualizations
   */
  async getAnalyticsData() {
    try {
      const suppliers = await enhancedSupplierService.getAll();
      const risks = await enhancedRiskCrudService.getAll();
      const incidents = await supplyChainIncidentService.getAll();
      
      // Calculate analytics
      const suppliersByCategory = suppliers.data?.reduce((acc, supplier) => {
        acc[supplier.category] = (acc[supplier.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};
      
      const risksByLevel = risks.data?.reduce((acc, risk) => {
        acc[risk.risk_level] = (acc[risk.risk_level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};
      
      const incidentTrends = incidents.data?.reduce((acc, incident) => {
        const month = new Date(incident.reported_date).toISOString().slice(0, 7);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};
      
      return {
        data: {
          suppliersByCategory,
          risksByLevel,
          incidentTrends,
          totalSuppliers: suppliers.data?.length || 0,
          totalRisks: risks.data?.length || 0,
          totalIncidents: incidents.data?.length || 0
        },
        error: null
      };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
  
  /**
   * Search across all supply chain entities
   */
  async globalSearch(query: string) {
    try {
      const [suppliers, risks, incidents] = await Promise.all([
        enhancedSupplierService.search(query),
        enhancedRiskCrudService.search(query),
        supplyChainIncidentService.search(query)
      ]);
      
      return {
        data: {
          suppliers: suppliers || [],
          risks: risks || [],
          incidents: incidents || []
        },
        error: null
      };
    } catch (error) {
      return { data: { suppliers: [], risks: [], incidents: [] }, error: error as Error };
    }
  }
  
  /**
   * Export comprehensive supply chain data
   */
  async exportSupplyChainData(format: 'csv' | 'xlsx' | 'json') {
    try {
      const [suppliers, evaluations, compliance, incidents] = await Promise.all([
        enhancedSupplierService.exportData(format),
        supplierEvaluationService.exportData(format),
        complianceMonitoringService.exportData(format),
        supplyChainIncidentService.exportData(format)
      ]);
      
      return {
        suppliers,
        evaluations,
        compliance,
        incidents
      };
    } catch (error) {
      throw new Error(`Failed to export supply chain data: ${error}`);
    }
  }
}

export const enhancedComprehensiveCrudService = new EnhancedComprehensiveCrudService();
