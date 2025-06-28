
import { apiService } from './api.service';
import { CrudService } from './api.crud.service';

/**
 * Job interface definition
 */
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract, etc.
  description: string;
  requirements: string[];
  responsibilities?: string[];
  postedDate: string;
  status: 'active' | 'filled' | 'expired';
  salary_range?: {
    min: number;
    max: number;
    currency: string;
  };
  views?: number;
  applications?: number;
}

/**
 * Job Application interface
 */
export interface JobApplication {
  id?: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  status?: 'submitted' | 'reviewed' | 'interviewing' | 'offered' | 'hired' | 'rejected';
  submittedAt?: string;
}

/**
 * Service for managing job postings and applications
 */
class JobService {
  private jobCrud: CrudService<Job>;
  private applicationCrud: CrudService<JobApplication>;

  constructor() {
    this.jobCrud = new CrudService<Job>('jobs');
    this.applicationCrud = new CrudService<JobApplication>('job_applications');
  }

  /**
   * Get all job postings with optional filters
   * @param filters Optional filters
   * @param pagination Optional pagination
   */
  async getAllJobs(filters: Record<string, any> = {}, pagination?: { page: number; limit: number }) {
    return this.jobCrud.getAll(filters, pagination);
  }

  /**
   * Get a job posting by ID
   * @param id Job ID
   */
  async getJobById(id: string): Promise<Job> {
    return this.jobCrud.getById(id);
  }

  /**
   * Create a new job posting
   * @param job Job data
   */
  async createJob(job: Partial<Job>): Promise<Job> {
    // Add default values if not provided
    const jobData = {
      ...job,
      status: job.status || 'active',
      postedDate: job.postedDate || new Date().toISOString().split('T')[0],
      views: 0,
      applications: 0
    };

    return this.jobCrud.create(jobData);
  }

  /**
   * Update a job posting
   * @param id Job ID
   * @param job Job data
   */
  async updateJob(id: string, job: Partial<Job>): Promise<Job> {
    return this.jobCrud.update(id, job);
  }

  /**
   * Delete a job posting
   * @param id Job ID
   */
  async deleteJob(id: string): Promise<boolean> {
    return this.jobCrud.delete(id);
  }

  /**
   * Track a job view
   * @param id Job ID
   */
  async trackJobView(id: string): Promise<void> {
    try {
      const job = await this.getJobById(id);
      await this.updateJob(id, { views: (job.views || 0) + 1 });
    } catch (error) {
      console.error('Failed to track job view:', error);
    }
  }

  /**
   * Search for jobs
   * @param query Search query
   */
  async searchJobs(query: string): Promise<Job[]> {
    return this.jobCrud.search(query);
  }

  /**
   * Apply for a job
   * @param jobId Job ID
   * @param application Application data
   */
  async applyForJob(jobId: string, application?: Partial<JobApplication>): Promise<JobApplication> {
    // If full application data is provided, use it
    if (application) {
      const applicationData: Partial<JobApplication> = {
        ...application,
        jobId,
        status: 'submitted' as const,
        submittedAt: new Date().toISOString()
      };

      try {
        // Increment the application count for the job
        const job = await this.getJobById(jobId);
        await this.updateJob(jobId, { applications: (job.applications || 0) + 1 });
        
        // Create the application record
        return this.applicationCrud.create(applicationData);
      } catch (error) {
        console.error('Failed to submit application:', error);
        throw new Error('Failed to submit application');
      }
    }
    
    // For simple "interest shown" tracking - create a minimal valid application
    try {
      const job = await this.getJobById(jobId);
      await this.updateJob(jobId, { applications: (job.applications || 0) + 1 });
      
      // Return a minimal but valid application object
      const minimalApplication: JobApplication = {
        jobId,
        firstName: 'Interest',
        lastName: 'Shown',
        email: 'interest@example.com',
        status: 'submitted',
        submittedAt: new Date().toISOString()
      };
      
      return minimalApplication;
    } catch (error) {
      console.error('Failed to register interest in job:', error);
      throw new Error('Failed to register interest');
    }
  }

  /**
   * Get all applications for a job
   * @param jobId Job ID
   * @param filters Optional filters
   * @param pagination Optional pagination
   */
  async getApplicationsByJobId(
    jobId: string,
    filters: Record<string, any> = {},
    pagination?: { page: number; limit: number }
  ): Promise<JobApplication[]> {
    return this.applicationCrud.getAll({ ...filters, jobId }, pagination);
  }

  /**
   * Update an application status
   * @param id Application ID
   * @param status New status
   */
  async updateApplicationStatus(
    id: string,
    status: JobApplication['status']
  ): Promise<JobApplication> {
    return this.applicationCrud.update(id, { status });
  }

  /**
   * Get application statistics
   * @param jobId Optional job ID to filter by
   */
  async getApplicationStats(jobId?: string): Promise<Record<string, number>> {
    try {
      const options: Record<string, any> = {};
      if (jobId) {
        options.filters = { jobId };
      }
      
      const response = await apiService.getAll('job_applications/stats', options);
      return response.data || {};
    } catch (error) {
      console.error('Failed to get application statistics:', error);
      return {};
    }
  }

  /**
   * Export job postings data
   * @param format Export format
   * @param filters Optional filters
   */
  async exportJobs(format: 'csv' | 'xlsx' | 'json', filters: Record<string, any> = {}): Promise<Blob> {
    return this.jobCrud.exportData(format, filters);
  }

  /**
   * Export job applications data
   * @param format Export format
   * @param filters Optional filters
   */
  async exportApplications(format: 'csv' | 'xlsx' | 'json', filters: Record<string, any> = {}): Promise<Blob> {
    return this.applicationCrud.exportData(format, filters);
  }
}

export const jobService = new JobService();
