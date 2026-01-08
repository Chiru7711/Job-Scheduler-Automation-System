export interface Job {
  id: number;
  taskName: string;
  payload: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'pending' | 'running' | 'completed';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CreateJobData {
  taskName: string;
  payload: any;
  priority: 'Low' | 'Medium' | 'High';
}

export interface JobFilters {
  status?: string;
  priority?: string;
}