# Job Scheduler & Automation System

A mini job scheduling and automation system built for Dotix Technologies.

## 🛠️ Tech Stack

- **Frontend**: Next.js + TypeScript + Tailwind CSS + Shadcn UI
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite + Prisma ORM
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 🚀 Features

- ✅ Create background jobs with priority levels
- ✅ Track job status (Pending → Running → Completed)
- ✅ Filter jobs by status and priority
- ✅ Run jobs manually with real-time status updates
- ✅ Automatic webhook triggers on job completion
- ✅ Clean, responsive UI with Tailwind CSS

## 📁 Project Structure

```
├── frontend/          # Next.js application
├── backend/           # Express API server
└── README.md         # This file
```

## 🔧 Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
npm run db:generate
npm run db:push
npm run dev
```

### 2. Frontend Setup (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

### 3. Configure Webhook (Optional)
1. Go to https://webhook.site
2. Copy your unique webhook URL
3. Update `backend/.env` file with your webhook URL

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🤖 AI Usage Documentation

**AI Tools Used**: [To be documented during development]
**Models**: [To be documented]
**Prompts**: [To be documented]

## 📊 Database Schema

```sql
CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  taskName TEXT NOT NULL,
  payload TEXT NOT NULL,  -- JSON string
  priority TEXT NOT NULL, -- Low, Medium, High
  status TEXT NOT NULL DEFAULT 'pending', -- pending, running, completed
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  completedAt DATETIME
);
```

## 🔗 API Documentation

### Endpoints
- `POST /api/jobs` - Create new job
- `GET /api/jobs?status=pending&priority=High` - List jobs with filters
- `GET /api/jobs/:id` - Get job details
- `POST /api/run-job/:id` - Execute job
- `GET /health` - Health check

### Example Usage
```bash
# Create a job
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"taskName": "Send Email", "priority": "High", "payload": {"email": "test@example.com"}}'

# List all jobs
curl http://localhost:3001/api/jobs

# Run a job
curl -X POST http://localhost:3001/api/run-job/1
```

## 🪝 Webhook Integration

Jobs automatically trigger webhooks to configured endpoints when completed.

---

**Developed for Dotix Technologies Assignment**