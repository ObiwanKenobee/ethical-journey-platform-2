
import { CrudService } from './api.crud.service';

// Interface for supplier evaluations
export interface SupplierEvaluation {
  id: string;
  supplier_id: string;
  assessor_id: string;
  assessment_type: string;
  score: number;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  findings: any[];
  recommendations: any[];
  assessment_date: string;
  next_assessment_date?: string;
  created_at: string;
  updated_at: string;
}

// Interface for compliance monitoring
export interface ComplianceMonitoring {
  id: string;
  supplier_id?: string;
  framework: string;
  requirement: string;
  status: 'compliant' | 'non_compliant' | 'under_review' | 'remediation_required';
  evidence_url?: string;
  last_checked: string;
  next_check_date?: string;
  responsible_party?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Interface for supply chain incidents
export interface SupplyChainIncident {
  id: string;
  supplier_id?: string;
  incident_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description?: string;
  impact_assessment?: string;
  root_cause?: string;
  corrective_actions?: string;
  status: string;
  reported_by: string;
  reported_date: string;
  resolved_date?: string;
  created_at: string;
  updated_at: string;
}

// Interface for supplier performance
export interface SupplierPerformance {
  id: string;
  supplier_id: string;
  metric_name: string;
  value: number;
  benchmark_value?: number;
  measurement_period?: string;
  measurement_date: string;
  created_at: string;
}

// Enhanced supplier interface to match the database
export interface EnhancedSupplier {
  id: string;
  name: string;
  category: string;
  location: string;
  status: string;
  contact_email: string;
  contact_phone: string;
  risk_score: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

// Create CRUD service instances for each table
export const supplierEvaluationService = new CrudService<SupplierEvaluation>('supplier_evaluations');
export const complianceMonitoringService = new CrudService<ComplianceMonitoring>('compliance_monitoring');
export const supplyChainIncidentService = new CrudService<SupplyChainIncident>('supply_chain_incidents');
export const supplierPerformanceService = new CrudService<SupplierPerformance>('supplier_performance');
export const enhancedSupplierService = new CrudService<EnhancedSupplier>('suppliers');

// Enhanced ESG metrics service with supplier relationship
export interface EnhancedEsgMetric {
  id: string;
  supplier_id?: string;
  metric_type: string;
  metric_name: string;
  value: number;
  unit?: string;
  target_value?: number;
  measurement_date: string;
  reporting_period?: string;
  verified: boolean;
  verification_source?: string;
  created_at: string;
}

export const enhancedEsgMetricsService = new CrudService<EnhancedEsgMetric>('esg_metrics');

// Specialized methods for supply chain management
export class SupplyChainCrudService {
  
  /**
   * Get all suppliers with their latest evaluations
   */
  async getSuppliersWithEvaluations() {
    try {
      const suppliers = await enhancedSupplierService.getAll();
      const evaluations = await supplierEvaluationService.getAll();
      
      // Map evaluations to suppliers
      const suppliersWithEvaluations = suppliers.data?.map(supplier => {
        const latestEvaluation = evaluations.data?.find(evaluation => evaluation.supplier_id === supplier.id);
        return {
          ...supplier,
          latest_evaluation: latestEvaluation
        };
      });
      
      return { data: suppliersWithEvaluations, error: null };
    } catch (error) {
      return { data: [], error: error as Error };
    }
  }
  
  /**
   * Get compliance status overview
   */
  async getComplianceOverview() {
    try {
      const compliance = await complianceMonitoringService.getAll();
      
      const overview = {
        total: compliance.data?.length || 0,
        compliant: compliance.data?.filter(c => c.status === 'compliant').length || 0,
        non_compliant: compliance.data?.filter(c => c.status === 'non_compliant').length || 0,
        under_review: compliance.data?.filter(c => c.status === 'under_review').length || 0,
        remediation_required: compliance.data?.filter(c => c.status === 'remediation_required').length || 0
      };
      
      return { data: overview, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
  
  /**
   * Get risk assessment summary
   */
  async getRiskAssessmentSummary() {
    try {
      const suppliers = await enhancedSupplierService.getAll();
      const incidents = await supplyChainIncidentService.getAll();
      
      const riskSummary = {
        total_suppliers: suppliers.data?.length || 0,
        high_risk_suppliers: suppliers.data?.filter(s => s.risk_score > 70).length || 0,
        active_incidents: incidents.data?.filter(i => i.status === 'open').length || 0,
        critical_incidents: incidents.data?.filter(i => i.severity === 'critical').length || 0,
        average_risk_score: suppliers.data?.reduce((sum, s) => sum + s.risk_score, 0) / (suppliers.data?.length || 1) || 0
      };
      
      return { data: riskSummary, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
  
  /**
   * Get ESG performance metrics
   */
  async getEsgPerformanceMetrics() {
    try {
      const metrics = await enhancedEsgMetricsService.getAll();
      
      const performance = {
        total_metrics: metrics.data?.length || 0,
        verified_metrics: metrics.data?.filter(m => m.verified).length || 0,
        environmental: metrics.data?.filter(m => m.metric_type?.toLowerCase().includes('environment')).length || 0,
        social: metrics.data?.filter(m => m.metric_type?.toLowerCase().includes('social')).length || 0,
        governance: metrics.data?.filter(m => m.metric_type?.toLowerCase().includes('governance')).length || 0
      };
      
      return { data: performance, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
  
  /**
   * Create a new supplier with initial evaluation
   */
  async createSupplierWithEvaluation(supplierData: Partial<EnhancedSupplier>, evaluationData?: Partial<SupplierEvaluation>) {
    try {
      // Create supplier first
      const supplier = await enhancedSupplierService.create(supplierData);
      
      // Create initial evaluation if provided
      if (evaluationData && supplier.id) {
        const supplierEvaluation = await supplierEvaluationService.create({
          ...evaluationData,
          supplier_id: supplier.id,
          assessor_id: evaluationData.assessor_id || 'system'
        });
        
        return { data: { supplier, evaluation: supplierEvaluation }, error: null };
      }
      
      return { data: { supplier }, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}

export const supplyChainCrudService = new SupplyChainCrudService();
