# CipherSQLStudio

Browser-based SQL learning platform where learners attempt pre-configured assignments, execute SQL in real time, and request LLM-powered hints.

## Tech Stack
- Frontend: React (Vite), SCSS, Monaco Editor
- Backend: Node.js, Express
- Sandbox DB: PostgreSQL
- Persistence DB: MongoDB (attempt history)
- LLM: Google Gemini API (`generateContent`)

## Project Structure
```text
assignmenttt/
  backend/
    sql/schema.sql
    src/
  frontend/
    src/
  docs/
    data-flow-diagram-template.md
```

## Core Features Implemented
- Assignment listing page with title, description, difficulty
- Assignment attempt page with:
  - question panel
  - sample schema/data viewer
  - Monaco SQL editor
  - results table
  - hint button (LLM hint, no full solution)
- Query execution API with SQL safety validation and read-only execution

## Optional Feature Implemented
- Login/Signup (JWT auth)
- Query attempt history persisted to MongoDB per logged-in user

## Setup

### 1. Backend
```bash
cd backend
cp .env.example .env
npm install
```

Create PostgreSQL database and run schema:
```bash
psql -U postgres -d ciphersqlstudio -f sql/schema.sql
```

Start backend:
```bash
npm run dev
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and calls backend on `http://localhost:5000/api`.

## Environment Variables

### Backend (`backend/.env`)
- `PORT`
- `FRONTEND_ORIGIN`
- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `POSTGRES_SSL`
- `MONGODB_URI`
- `MONGO_URI` (alias supported)
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

### Frontend (`frontend/.env`)
- `VITE_API_BASE_URL`

## API Endpoints
- `GET /api/assignments`
- `GET /api/assignments/:assignmentId`
- `GET /api/assignments/:assignmentId/dataset`
- `POST /api/query/execute`
- `POST /api/hints`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/attempts/me`

## LLM Hint Guardrails
Prompt rules ensure:
- hints only
- no full executable SQL solution
- concise conceptual guidance

## Data-Flow Diagram (Compulsory in Submission)
Create a hand-drawn diagram for:
`Execute Query click -> frontend state update -> API call -> backend validation -> PostgreSQL read-only query -> response -> result rendering`

Use [`docs/data-flow-diagram-template.md`](/e:/assignmenttt/docs/data-flow-diagram-template.md) as a labeling checklist.
