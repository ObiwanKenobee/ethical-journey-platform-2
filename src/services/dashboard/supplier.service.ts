
import { CrudService } from '../api.crud.service';

// Types
export interface Supplier {
  id: string;
  name: string;
  location: string;
  contact_info: {
    name: string;
    email: string;
    phone: string;
  };
  tier: number; // 1, 2, 3, etc.
  products: string[];
  compliance_score: number; // 0-100
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'inactive' | 'onboarding' | 'suspended';
  certifications: {
    name: string;
    expiry_date: string;
    status: 'valid' | 'expired' | 'pending';
  }[];
  created_at: string;
  updated_at: string;
}

export interface SupplierAssessment {
  id: string;
  supplier_id: string;
  assessment_date: string;
  assessor_id: string;
  categories: {
    name: string;
    score: number;
    max_score: number;
    findings: string[];
  }[];
  overall_score: number;
  status: 'draft' | 'completed' | 'approved' | 'rejected';
  next_assessment_date: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierContract {
  id: string;
  supplier_id: string;
  start_date: string;
  end_date: string;
  value: number;
  currency: string;
  terms: string;
  status: 'active' | 'expired' | 'terminated' | 'draft';
  created_at: string;
  updated_at: string;
}

// Services
export const supplierService = new CrudService<Supplier>('suppliers');
export const supplierAssessmentService = new CrudService<SupplierAssessment>('supplier_assessments');
export const supplierContractService = new CrudService<SupplierContract>('supplier_contracts');

// Additional methods
export const supplierManagementService = {
  /**
   * Get suppliers by tier
   */
  async getSuppliersByTier(tier: number): Promise<Supplier[]> {
    const response = await supplierService.getAll({ tier });
    return response.data || [];
  },

  /**
   * Get high-risk suppliers
   */
  async getHighRiskSuppliers(): Promise<Supplier[]> {
    const response = await supplierService.getAll({ 
      risk_level: ['high', 'critical'] 
    });
    return response.data || [];
  },

  /**
   * Get supplier assessments
   */
  async getSupplierAssessments(supplierId: string): Promise<SupplierAssessment[]> {
    const response = await supplierAssessmentService.getAll({ supplier_id: supplierId });
    return response.data || [];
  },

  /**
   * Update supplier compliance score
   */
  async updateComplianceScore(supplierId: string, score: number): Promise<boolean> {
    await supplierService.update(supplierId, { 
      compliance_score: score,
      risk_level: this.calculateRiskLevel(score)
    });
    return true;
  },

  /**
   * Calculate risk level from compliance score
   */
  calculateRiskLevel(score: number): Supplier['risk_level'] {
    if (score >= 80) return 'low';
    if (score >= 60) return 'medium';
    if (score >= 40) return 'high';
    return 'critical';
  },

  /**
   * Get active contracts
   */
  async getActiveContracts(): Promise<SupplierContract[]> {
    const response = await supplierContractService.getAll({ 
      status: 'active' 
    });
    return response.data || [];
  }
};
