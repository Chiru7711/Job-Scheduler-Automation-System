import axios from 'axios';
import { Job, CreateJobData, JobFilters } from '@/types/job';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://job-scheduler-automation-system.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobService = {
  async createJob(data: CreateJobData): Promise<Job> {
    const response = await api.post('/jobs', data);
    return response.data;
  },

  async getJobs(filters: JobFilters = {}): Promise<Job[]> {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    
    const response = await api.get(`/jobs?${params.toString()}`);
    return response.data;
  },

  async getJobById(id: number): Promise<Job> {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  async runJob(id: number): Promise<void> {
    await api.post(`/run-job/${id}`);
  },
};