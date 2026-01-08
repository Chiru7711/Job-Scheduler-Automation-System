'use client';

import { useState, useEffect } from 'react';
import { JobForm } from '@/components/JobForm';
import { JobTable } from '@/components/JobTable';
import { Job } from '@/types/job';
import { jobService } from '@/lib/api';

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', priority: '' });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobs(filters);
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleJobCreated = () => {
    fetchJobs();
  };

  const handleRunJob = async (jobId: number) => {
    try {
      await jobService.runJob(jobId);
      fetchJobs();
    } catch (error) {
      console.error('Failed to run job:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Scheduler Dashboard</h1>
          <p className="mt-2 text-gray-600">Create and manage background jobs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <JobForm onJobCreated={handleJobCreated} />
          </div>
          
          <div className="lg:col-span-2">
            <JobTable 
              jobs={jobs} 
              loading={loading}
              filters={filters}
              onFiltersChange={setFilters}
              onRunJob={handleRunJob}
            />
          </div>
        </div>
      </div>
    </div>
  );
}