# Frontend Setup Instructions

## Prerequisites
- Node.js 18+ installed
- Backend server running on port 3001

## Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:3000

## Features

- ✅ Create jobs with task name, priority, and JSON payload
- ✅ View all jobs in a responsive table
- ✅ Filter jobs by status and priority
- ✅ Run pending jobs with real-time status updates
- ✅ Clean, modern UI with Tailwind CSS

## Usage

1. **Create a Job**: Fill out the form on the left side
2. **View Jobs**: See all jobs in the table on the right
3. **Filter Jobs**: Use the dropdown filters above the table
4. **Run Jobs**: Click "Run Job" button for pending jobs
5. **Monitor Status**: Watch jobs transition from pending → running → completed

## Environment Variables

Create a `.env.local` file if you need to change the API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```