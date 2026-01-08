'use client';

import { useState } from 'react';
import { CreateJobData } from '@/types/job';
import { jobService } from '@/lib/api';

interface JobFormProps {
  onJobCreated: () => void;
}

export function JobForm({ onJobCreated }: JobFormProps) {
  const [formData, setFormData] = useState<CreateJobData>({
    taskName: '',
    payload: {},
    priority: 'Medium'
  });
  const [payloadInput, setPayloadInput] = useState('{}');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Try to parse the payload as JSON, fallback to simple object
      let jobPayload = {};
      try {
        jobPayload = JSON.parse(payloadInput);
      } catch {
        // If JSON parsing fails, just wrap the text
        jobPayload = { data: payloadInput };
      }

      const jobToCreate = {
        taskName: formData.taskName,
        payload: jobPayload,
        priority: formData.priority
      };

      await jobService.createJob(jobToCreate);

      // Reset form after successful creation
      setFormData({ taskName: '', payload: {}, priority: 'Medium' });
      setPayloadInput('{}');
      onJobCreated();
    } catch (error) {
      console.error('Failed to create job:', error);
      alert('Something went wrong creating the job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Job</h2>
      
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Name
            </label>
            <input
              type="text"
              required
              value={formData.taskName}
              onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Send Email, Generate Report"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Data (JSON format)
            </label>
            <textarea
              value={payloadInput}
              onChange={(e) => setPayloadInput(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='{"email": "user@example.com", "reportId": 123}'
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Job...' : 'Create New Job'}
          </button>
        </form>
    </div>
  );
}