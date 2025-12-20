# 📅 Job Scheduler (Full Stack Project)

A full-stack **Job Scheduler** application that allows users to create, manage, and execute jobs with priorities and scheduled times. The system supports webhook callbacks on job execution and provides a REST-based API with a React frontend.

GitHub Repository: https://github.com/shashikant347/Job-Scheduler
live - https://job-scheduler-2.onrender.com
---

## 🚀 Features

- Create, update, and delete jobs  
- Assign priority to jobs (low / medium / high)  
- Schedule jobs for future execution  
- Track job status (pending, running, completed, failed)  
- Manual job execution  
- Webhook callback support  
- REST API-based backend  

---

## 🧰 Tech Stack

### Frontend
- React  
- Axios  
- CSS  

### Backend
- Node.js  
- Express.js  
- MySQL  
- dotenv  
- cors  

---

## 📦 Setup Instructions

### Prerequisites

Ensure the following are installed:
- Node.js (v14 or higher)
- npm
- MySQL Server

---

### Clone Repository

```bash
git clone https://github.com/shashikant347/Job-Scheduler.git
cd Job-Scheduler
Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file:

env
Copy code
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=job_scheduler
Start backend server:

bash
Copy code
npm start
Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
Frontend runs at:
http://localhost:3000

Backend runs at:
http://localhost:5000

🗄️ Database Schema / ER Design
Table: jobs
Column Name	Type	Description
id	INT (PK)	Job ID
name	VARCHAR	Job name
payload	JSON	Job data
priority	ENUM	low / medium / high
status	ENUM	pending / running / completed / failed
webhook_url	VARCHAR	Webhook callback URL
schedule_time	DATETIME	Job execution time
created_at	TIMESTAMP	Created time
updated_at	TIMESTAMP	Updated time

ER Diagram (Text Representation)
lua
Copy code
+----------------+
|      jobs      |
+----------------+
| id (PK)        |
| name           |
| payload        |
| priority       |
| status         |
| webhook_url    |
| schedule_time  |
| created_at     |
| updated_at     |
+----------------+
🏛 Architecture Explanation
yaml
Copy code
React Frontend
      |
      | REST APIs
      ↓
Express Backend
      |
      | Job Scheduler Logic
      ↓
MySQL Database
      |
      | Webhook Trigger
      ↓
External Systems
Flow:
User creates a job from UI

Backend stores job in database

Scheduler checks for due jobs

Job executes at scheduled time

Webhook is triggered with execution result

📡 API Documentation
Base URL
bash
Copy code
http://localhost:5000/api
Create Job
POST /jobs

json
Copy code
{
  "name": "Sample Job",
  "payload": { "message": "Hello" },
  "priority": "high",
  "webhook_url": "https://example.com/webhook",
  "schedule_time": "2025-12-20T10:00:00Z"
}
Get All Jobs
GET /jobs

Get Job by ID
GET /jobs/:id

Update Job
PUT /jobs/:id

Delete Job
DELETE /jobs/:id

Execute Job Manually
POST /jobs/:id/execute

🔔 How Webhook Works
Scheduler finds pending jobs whose schedule time has arrived

Job status is set to running

Job logic executes

A POST request is sent to webhook_url

Example payload:

json
Copy code
{
  "jobId": 1,
  "status": "completed",
  "result": "Job executed successfully"
}
Status updated to completed or failed

🤖 AI Usage
 chargpt




