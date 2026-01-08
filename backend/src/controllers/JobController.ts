import { Request, Response } from 'express';
import { JobService } from '../services/JobService';

export class JobController {
  private jobService = new JobService();

  createJob = async (req: Request, res: Response) => {
    const { taskName, payload, priority } = req.body;
    
    // Basic validation - we need at least a task name and priority
    if (!taskName || !priority) {
      return res.status(400).json({ 
        error: 'Missing required fields: taskName and priority' 
      });
    }

    try {
      const newJob = await this.jobService.createJob({
        taskName,
        payload: JSON.stringify(payload || {}),
        priority
      });

      res.status(201).json(newJob);
    } catch (err) {
      console.error('Error creating job:', err);
      res.status(500).json({ error: 'Something went wrong creating the job' });
    }
  };

  getJobs = async (req: Request, res: Response) => {
    try {
      const { status, priority } = req.query;
      
      const filters = {
        status: status as string,
        priority: priority as string
      };
      
      const jobList = await this.jobService.getJobs(filters);
      res.json(jobList);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      res.status(500).json({ error: 'Could not retrieve jobs' });
    }
  };

  getJobById = async (req: Request, res: Response) => {
    const jobId = parseInt(req.params.id);
    
    if (isNaN(jobId)) {
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    try {
      const job = await this.jobService.getJobById(jobId);
      
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      res.json(job);
    } catch (err) {
      console.error('Error getting job:', err);
      res.status(500).json({ error: 'Could not retrieve job details' });
    }
  };

  runJob = async (req: Request, res: Response) => {
    const jobId = parseInt(req.params.id);
    
    if (isNaN(jobId)) {
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    try {
      await this.jobService.runJob(jobId);
      res.json({ 
        message: 'Job execution started',
        jobId: jobId
      });
    } catch (err) {
      console.error('Error running job:', err);
      res.status(500).json({ error: 'Could not start job execution' });
    }
  };
}