
import { apiService } from '@/services/api.service';

export interface WorkerProfile {
  id: string;
  anonymousId: string;
  facilityId: string;
  role: string;
  department: string;
  startDate: string;
  demographic: {
    age_range: string;
    gender: string;
    education_level: string;
    family_status: string;
  };
  protectionLevel: 'high' | 'medium' | 'low';
  riskFactors: string[];
  supportNeeds: string[];
}

export interface WorkerVoiceChannel {
  id: string;
  type: 'hotline' | 'app' | 'sms' | 'survey' | 'grievance_box';
  facilityId: string;
  active: boolean;
  anonymous: boolean;
  languages: string[];
  accessInstructions: string;
  responseTime: string;
  escalationPath: string[];
}

export interface GrievanceCase {
  id: string;
  workerId: string;
  facilityId: string;
  category: 'wages' | 'working_conditions' | 'safety' | 'harassment' | 'discrimination' | 'overtime';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  status: 'submitted' | 'investigating' | 'resolved' | 'escalated';
  submissionDate: string;
  anonymous: boolean;
  assignedInvestigator?: string;
  resolutionSteps: ResolutionStep[];
  outcome?: string;
  satisfactionRating?: number;
}

export interface ResolutionStep {
  id: string;
  step: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  evidence: string[];
  notes: string;
}

export interface WellnessProgram {
  id: string;
  name: string;
  type: 'mental_health' | 'financial_literacy' | 'skills_training' | 'health_services';
  facilityIds: string[];
  description: string;
  eligibility: string[];
  benefits: string[];
  enrollment: {
    open: boolean;
    capacity: number;
    enrolled: number;
    waitlist: number;
  };
  schedule: {
    frequency: string;
    duration: string;
    sessions: string[];
  };
}

export interface WorkerSafety {
  facilityId: string;
  safetyScore: number;
  incidents: SafetyIncident[];
  training: SafetyTraining[];
  equipment: SafetyEquipment[];
  inspections: SafetyInspection[];
}

export interface SafetyIncident {
  id: string;
  type: 'injury' | 'near_miss' | 'hazard' | 'equipment_failure';
  severity: 'fatal' | 'major' | 'minor' | 'first_aid';
  description: string;
  date: string;
  location: string;
  injured_count: number;
  root_cause: string;
  corrective_actions: string[];
  status: 'open' | 'investigating' | 'resolved';
}

export interface SafetyTraining {
  id: string;
  program: string;
  mandatory: boolean;
  frequency: string;
  completion_rate: number;
  next_due: string;
  trainer: string;
}

export interface SafetyEquipment {
  type: string;
  required: boolean;
  available: number;
  in_use: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  last_inspection: string;
}

export interface SafetyInspection {
  id: string;
  inspector: string;
  date: string;
  type: 'routine' | 'surprise' | 'incident_follow_up';
  areas_checked: string[];
  violations: string[];
  recommendations: string[];
  score: number;
}

class WorkerProtectionService {
  async getWorkerProfiles(facilityId?: string): Promise<WorkerProfile[]> {
    try {
      const response = await apiService.getAll('workers/profiles', { filters: { facilityId } });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching worker profiles:', error);
      return this.getMockWorkerProfiles();
    }
  }

  async getVoiceChannels(facilityId?: string): Promise<WorkerVoiceChannel[]> {
    try {
      const response = await apiService.getAll('workers/voice-channels', { filters: { facilityId } });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching voice channels:', error);
      return this.getMockVoiceChannels();
    }
  }

  async getGrievances(filters?: {
    facilityId?: string;
    status?: string;
    severity?: string;
    category?: string;
  }): Promise<GrievanceCase[]> {
    try {
      const response = await apiService.getAll('workers/grievances', { filters });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching grievances:', error);
      return this.getMockGrievances();
    }
  }

  async submitGrievance(grievance: Omit<GrievanceCase, 'id' | 'submissionDate' | 'status'>): Promise<GrievanceCase> {
    try {
      const response = await apiService.create('workers/grievances', grievance);
      return response.data;
    } catch (error) {
      console.error('Error submitting grievance:', error);
      throw error;
    }
  }

  async getWellnessPrograms(facilityId?: string): Promise<WellnessProgram[]> {
    try {
      const response = await apiService.getAll('workers/wellness-programs', { filters: { facilityId } });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching wellness programs:', error);
      return this.getMockWellnessPrograms();
    }
  }

  async getSafetyData(facilityId: string): Promise<WorkerSafety> {
    try {
      const response = await apiService.getById('workers/safety', facilityId);
      return response.data;
    } catch (error) {
      console.error('Error fetching safety data:', error);
      return this.getMockSafetyData();
    }
  }

  async reportSafetyIncident(incident: Omit<SafetyIncident, 'id' | 'status'>): Promise<SafetyIncident> {
    try {
      const response = await apiService.create('workers/safety/incidents', incident);
      return response.data;
    } catch (error) {
      console.error('Error reporting safety incident:', error);
      throw error;
    }
  }

  private getMockWorkerProfiles(): WorkerProfile[] {
    return [
      {
        id: 'worker_1',
        anonymousId: 'anon_001',
        facilityId: 'facility_123',
        role: 'Production Line Worker',
        department: 'Manufacturing',
        startDate: '2023-06-15',
        demographic: {
          age_range: '25-35',
          gender: 'female',
          education_level: 'high_school',
          family_status: 'married_with_children'
        },
        protectionLevel: 'medium',
        riskFactors: ['long_hours', 'repetitive_work'],
        supportNeeds: ['childcare', 'healthcare']
      }
    ];
  }

  private getMockVoiceChannels(): WorkerVoiceChannel[] {
    return [
      {
        id: 'channel_1',
        type: 'hotline',
        facilityId: 'facility_123',
        active: true,
        anonymous: true,
        languages: ['english', 'spanish', 'mandarin'],
        accessInstructions: 'Call 1-800-WORKER or text HELP to 555-0123',
        responseTime: '24 hours',
        escalationPath: ['facility_manager', 'corporate_hr', 'external_ombudsman']
      }
    ];
  }

  private getMockGrievances(): GrievanceCase[] {
    return [
      {
        id: 'grievance_1',
        workerId: 'worker_1',
        facilityId: 'facility_123',
        category: 'working_conditions',
        severity: 'medium',
        description: 'Inadequate ventilation in production area causing health concerns',
        status: 'investigating',
        submissionDate: new Date().toISOString(),
        anonymous: true,
        assignedInvestigator: 'safety_officer_1',
        resolutionSteps: [
          {
            id: 'step_1',
            step: 'Site Inspection',
            description: 'Conduct air quality assessment',
            assignee: 'safety_officer_1',
            dueDate: '2024-01-20',
            status: 'in_progress',
            evidence: [],
            notes: 'Scheduled for next week'
          }
        ]
      }
    ];
  }

  private getMockWellnessPrograms(): WellnessProgram[] {
    return [
      {
        id: 'program_1',
        name: 'Financial Literacy Workshop',
        type: 'financial_literacy',
        facilityIds: ['facility_123'],
        description: 'Learn budgeting, saving, and investment basics',
        eligibility: ['all_employees'],
        benefits: ['financial_planning', 'debt_management', 'savings_strategies'],
        enrollment: {
          open: true,
          capacity: 50,
          enrolled: 32,
          waitlist: 8
        },
        schedule: {
          frequency: 'weekly',
          duration: '2 hours',
          sessions: ['Tuesday 6PM', 'Saturday 10AM']
        }
      }
    ];
  }

  private getMockSafetyData(): WorkerSafety {
    return {
      facilityId: 'facility_123',
      safetyScore: 87,
      incidents: [
        {
          id: 'incident_1',
          type: 'injury',
          severity: 'minor',
          description: 'Cut on hand from machinery',
          date: '2024-01-15',
          location: 'Production Line 2',
          injured_count: 1,
          root_cause: 'Inadequate safety guard',
          corrective_actions: ['Install additional safety guards', 'Retrain operators'],
          status: 'resolved'
        }
      ],
      training: [
        {
          id: 'training_1',
          program: 'Machine Safety',
          mandatory: true,
          frequency: 'quarterly',
          completion_rate: 95,
          next_due: '2024-04-01',
          trainer: 'Safety Team'
        }
      ],
      equipment: [
        {
          type: 'Safety Gloves',
          required: true,
          available: 200,
          in_use: 180,
          condition: 'good',
          last_inspection: '2024-01-10'
        }
      ],
      inspections: [
        {
          id: 'inspection_1',
          inspector: 'Safety Officer',
          date: '2024-01-12',
          type: 'routine',
          areas_checked: ['production_floor', 'emergency_exits', 'equipment_storage'],
          violations: ['blocked_emergency_exit'],
          recommendations: ['Clear emergency exit', 'Update safety signage'],
          score: 87
        }
      ]
    };
  }
}

export const workerProtectionService = new WorkerProtectionService();
