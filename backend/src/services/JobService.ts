import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const db = new PrismaClient();

export class JobService {
  async createJob(jobData: { taskName: string; payload: string; priority: string }) {
    const newJob = await db.job.create({
      data: {
        taskName: jobData.taskName,
        payload: jobData.payload,
        priority: jobData.priority,
        status: 'pending'
      }
    });
    
    return newJob;
  }

  async getJobs(filters: { status?: string; priority?: string }) {
    const searchCriteria: any = {};
    
    // Only add filters if they're provided
    if (filters.status) {
      searchCriteria.status = filters.status;
    }
    if (filters.priority) {
      searchCriteria.priority = filters.priority;
    }

    const jobs = await db.job.findMany({
      where: searchCriteria,
      orderBy: { createdAt: 'desc' }
    });
    
    return jobs;
  }

  async getJobById(jobId: number) {
    const job = await db.job.findUnique({
      where: { id: jobId }
    });
    
    return job;
  }

  async runJob(jobId: number) {
    // First, let's check if the job exists and is in the right state
    const existingJob = await db.job.findUnique({ where: { id: jobId } });
    
    if (!existingJob) {
      throw new Error('Job not found');
    }
    
    if (existingJob.status !== 'pending') {
      throw new Error('Job is not in pending state');
    }

    // Mark job as running
    await db.job.update({
      where: { id: jobId },
      data: { status: 'running' }
    });

    // Simulate some work being done (3 seconds)
    setTimeout(async () => {
      try {
        const completedJob = await db.job.update({
          where: { id: jobId },
          data: { 
            status: 'completed',
            completedAt: new Date()
          }
        });

        // Send webhook notification
        await this.sendWebhookNotification(completedJob);
      } catch (error) {
        console.error('Error completing job:', error);
      }
    }, 3000);
  }

  private async sendWebhookNotification(job: any) {
    const webhookUrl = process.env.WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.log('No webhook URL configured, skipping notification');
      return;
    }

    try {
      const notificationData = {
        jobId: job.id,
        taskName: job.taskName,
        priority: job.priority,
        payload: JSON.parse(job.payload),
        completedAt: job.completedAt,
        message: `Job '${job.taskName}' completed successfully`
      };

      await axios.post(webhookUrl, notificationData, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ Webhook sent successfully for job ${job.id}`);
    } catch (error: any) {
      console.error(`❌ Failed to send webhook for job ${job.id}:`, error.message);
    }
  }
}