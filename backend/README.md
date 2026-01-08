# Backend Setup Instructions

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

3. **Configure environment**
   - Update `.env` file with your webhook URL from https://webhook.site
   - Get a unique webhook URL and replace `your-unique-id` in WEBHOOK_URL

4. **Start development server**
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:3001

## API Endpoints

- `POST /api/jobs` - Create new job
- `GET /api/jobs` - List jobs (with optional filters)
- `GET /api/jobs/:id` - Get job details
- `POST /api/run-job/:id` - Execute job
- `GET /health` - Health check

## Testing the API

Use tools like Postman or curl to test the endpoints:

```bash
# Create a job
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"taskName": "Test Job", "priority": "High", "payload": {"test": true}}'

# List jobs
curl http://localhost:3001/api/jobs

# Run a job
curl -X POST http://localhost:3001/api/run-job/1
```