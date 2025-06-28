
import { apiService } from '@/services/api.service';

export interface BlockchainTransaction {
  id: string;
  hash: string;
  type: 'certification' | 'audit' | 'worker_feedback' | 'compliance_report' | 'supply_transfer';
  entityId: string;
  entityType: string;
  data: Record<string, any>;
  timestamp: string;
  verified: boolean;
  verificationScore: number;
  immutable: boolean;
}

export interface DigitalCertificate {
  id: string;
  type: 'ethical_certification' | 'labor_compliance' | 'environmental_standard' | 'fair_trade';
  issuerId: string;
  issuerName: string;
  recipientId: string;
  recipientName: string;
  validFrom: string;
  validUntil: string;
  blockchainHash: string;
  verified: boolean;
  criteria: CertificationCriteria[];
  auditData: AuditRecord[];
}

export interface CertificationCriteria {
  criterion: string;
  requirement: string;
  status: 'passed' | 'failed' | 'pending';
  evidence: string[];
  verificationMethod: string;
}

export interface AuditRecord {
  id: string;
  auditorId: string;
  auditorName: string;
  date: string;
  type: 'labor_conditions' | 'environmental' | 'safety' | 'financial';
  findings: AuditFinding[];
  overallScore: number;
  blockchainHash: string;
}

export interface AuditFinding {
  category: string;
  finding: string;
  severity: 'critical' | 'major' | 'minor' | 'observation';
  evidence: string[];
  corrective_action: string;
  status: 'open' | 'in_progress' | 'resolved';
}

export interface WorkerFeedback {
  id: string;
  workerId: string;
  facilityId: string;
  anonymous: boolean;
  categories: string[];
  feedback: Record<string, any>;
  sentiment: 'positive' | 'neutral' | 'negative';
  severity: number;
  timestamp: string;
  blockchainHash: string;
  verified: boolean;
}

class BlockchainVerificationService {
  async getTransactions(filters?: {
    type?: string;
    entityId?: string;
    dateRange?: { from: string; to: string };
  }): Promise<BlockchainTransaction[]> {
    try {
      const response = await apiService.getAll('blockchain/transactions', { filters });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching blockchain transactions:', error);
      return this.getMockTransactions();
    }
  }

  async getCertificates(entityId?: string): Promise<DigitalCertificate[]> {
    try {
      const response = await apiService.getAll('blockchain/certificates', { filters: { entityId } });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching certificates:', error);
      return this.getMockCertificates();
    }
  }

  async verifyTransaction(hash: string): Promise<{ verified: boolean; details: any }> {
    try {
      const response = await apiService.create(`blockchain/verify/${hash}`, {});
      return response.data;
    } catch (error) {
      console.error('Error verifying transaction:', error);
      return { verified: false, details: null };
    }
  }

  async submitAuditRecord(auditData: Omit<AuditRecord, 'blockchainHash'>): Promise<AuditRecord> {
    try {
      const response = await apiService.create('blockchain/audit', auditData);
      return response.data;
    } catch (error) {
      console.error('Error submitting audit record:', error);
      throw error;
    }
  }

  async submitWorkerFeedback(feedback: Omit<WorkerFeedback, 'blockchainHash' | 'verified'>): Promise<WorkerFeedback> {
    try {
      const response = await apiService.create('blockchain/worker-feedback', feedback);
      return response.data;
    } catch (error) {
      console.error('Error submitting worker feedback:', error);
      throw error;
    }
  }

  async issueCertificate(certificateData: Omit<DigitalCertificate, 'blockchainHash' | 'verified'>): Promise<DigitalCertificate> {
    try {
      const response = await apiService.create('blockchain/certificates', certificateData);
      return response.data;
    } catch (error) {
      console.error('Error issuing certificate:', error);
      throw error;
    }
  }

  private getMockTransactions(): BlockchainTransaction[] {
    return [
      {
        id: '1',
        hash: '0x1234567890abcdef',
        type: 'audit',
        entityId: 'supplier_123',
        entityType: 'supplier',
        data: {
          auditScore: 92,
          findings: 3,
          improvements: 7
        },
        timestamp: new Date().toISOString(),
        verified: true,
        verificationScore: 0.98,
        immutable: true
      },
      {
        id: '2',
        hash: '0xabcdef1234567890',
        type: 'worker_feedback',
        entityId: 'facility_456',
        entityType: 'facility',
        data: {
          satisfaction: 8.5,
          concerns: 2,
          anonymous: true
        },
        timestamp: new Date().toISOString(),
        verified: true,
        verificationScore: 0.95,
        immutable: true
      }
    ];
  }

  private getMockCertificates(): DigitalCertificate[] {
    return [
      {
        id: 'cert_1',
        type: 'ethical_certification',
        issuerId: 'issuer_123',
        issuerName: 'Global Ethics Council',
        recipientId: 'supplier_456',
        recipientName: 'Ethical Textiles Co.',
        validFrom: '2024-01-01',
        validUntil: '2024-12-31',
        blockchainHash: '0xcertificate123',
        verified: true,
        criteria: [
          {
            criterion: 'Fair Wages',
            requirement: 'Minimum living wage standards',
            status: 'passed',
            evidence: ['payroll_records', 'worker_interviews'],
            verificationMethod: 'third_party_audit'
          }
        ],
        auditData: []
      }
    ];
  }
}

export const blockchainVerificationService = new BlockchainVerificationService();
