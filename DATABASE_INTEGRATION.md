# Database Integration Guide

## Overview

The ISTQB Quiz App now uses a SQLite database with an Express REST API, replacing direct JSON file loading. This architecture is designed for easy migration to MySQL for production.

## Architecture

```
┌─────────────────┐      HTTP       ┌──────────────┐      SQL       ┌─────────────┐
│  React App      │ ←────────────→ │  Express API  │ ←──────────→ │  SQLite DB  │
│  (Port 5174)    │                 │  (Port 3001)  │               │             │
└─────────────────┘                 └──────────────┘               └─────────────┘
    Components                       REST Endpoints                 5 Tables
    - ExamSelector                   - GET /api/health              - resources
    - Questionnaire                  - GET /api/quizzes             - quizzes
    - Question                       - GET /api/quiz/:examId        - questions
                                                                    - question_options
                                                                    - question_explanations
```

## Quick Start

### 1. Start Both Servers

```bash
# Terminal 1: API Server
npm run server

# Terminal 2: Dev Server
npm run dev
```

### 2. Access the App

- **Frontend:** http://localhost:5174
- **API:** http://localhost:3001

### 3. Test API Endpoints

```bash
# Health check
curl http://localhost:3001/api/health

# List all quizzes
curl http://localhost:3001/api/quizzes

# Get specific quiz
curl http://localhost:3001/api/quiz/sample-exam-enhanced
```

## Files Created

### Backend Files

1. **server.js** - Express API server
   - 3 REST endpoints
   - CORS enabled
   - Error handling

2. **src/database/db-service.js** - Database service layer
   - `getAllQuizzes()` - Get all quizzes with resources
   - `getQuizByExamId(examId)` - Get quiz metadata
   - `getQuizQuestions(quizId)` - Get questions with options/explanations
   - `getCompleteQuiz(examId)` - Get full quiz data

3. **src/database/database.sqlite** - SQLite database
   - 4 resources
   - 6 quizzes
   - 10 questions
   - 40 options
   - 40 explanations

### Frontend Changes

1. **src/components/ExamSelector.jsx**
   - Removed `import.meta.glob` JSON loading
   - Added API fetch calls
   - Added error handling UI
   - Shows connection error if API is down

## API Endpoints

### GET /api/health

**Response:**
```json
{
  "success": true,
  "message": "API server is running",
  "timestamp": "2025-11-17T15:30:13.538Z"
}
```

### GET /api/quizzes

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "examId": "sample-exam-a",
      "examName": "ISTQB CTFL Sample Exam A",
      "version": "1.7",
      "releaseDate": "2025-04-01",
      "syllabusVersion": "4.0.1",
      "isOfficial": true,
      "totalQuestions": 40,
      "totalPoints": 40,
      "passingScore": 26,
      "resourceDocument": "ISTQB CTFL Sample Exam A v1.7"
    }
    // ... more quizzes
  ]
}
```

### GET /api/quiz/:examId

**Example:** `/api/quiz/sample-exam-enhanced`

**Response:**
```json
{
  "success": true,
  "data": {
    "examId": "sample-exam-enhanced",
    "examName": "ISTQB CTFL Enhanced Features Demo",
    "version": "1.0",
    "releaseDate": "2025-11-17",
    "syllabusVersion": "4.0.1",
    "isOfficial": false,
    "totalQuestions": 10,
    "totalPoints": 10,
    "passingScore": 7,
    "questions": [
      {
        "id": 1,
        "questionText": "...",
        "options": [...],
        "correctAnswer": ["c"],
        "explanation": {...},
        "visualAid": {...},
        "calculation": {...}
      }
      // ... more questions
    ]
  }
}
```

## Database Schema

### Tables

1. **resources** - ISTQB exam documents
2. **quizzes** - Quiz metadata (linked to resources)
3. **questions** - Questions with JSON fields for visual aids/calculations
4. **question_options** - Answer options for each question
5. **question_explanations** - Explanations for each option

### Relationships

```
resources (1:N) → quizzes (1:N) → questions (1:N) → options
                                              (1:N) → explanations
```

## Data Flow

### Loading Exam List

1. User opens app
2. `ExamSelector` component mounts
3. Fetches `GET /api/quizzes`
4. API calls `getAllQuizzes()` from db-service
5. db-service queries SQLite database
6. Returns quiz list to frontend
7. ExamSelector displays quizzes

### Loading Exam Details

1. User clicks on a quiz
2. `ExamSelector.handleSelectExam(examId)` called
3. Fetches `GET /api/quiz/:examId`
4. API calls `getCompleteQuiz(examId)` from db-service
5. db-service queries database for quiz + questions + options + explanations
6. Assembles complete quiz object
7. Returns to frontend
8. App switches to `Questionnaire` component

## Error Handling

### API Server Not Running

If API server isn't running, the app shows:

```
┌─────────────────────────────────────┐
│  ❌ Connection Error                │
│                                     │
│  Failed to fetch quizzes            │
│                                     │
│  Make sure the API server is        │
│  running:                           │
│                                     │
│  npm run server                     │
│                                     │
│  [ Retry ]                          │
└─────────────────────────────────────┘
```

### Database Issues

If database file is missing or corrupted, run migration:

```bash
node src/database/migrate.js
```

This will recreate the database from scratch.

## MySQL Migration Path

The database is designed for easy MySQL migration:

### 1. Export Data

```bash
sqlite3 src/database/database.sqlite .dump > backup.sql
```

### 2. Convert Schema

Changes needed:
- `INTEGER AUTOINCREMENT` → `INT AUTO_INCREMENT`
- `BOOLEAN` → `TINYINT(1)`
- `TEXT` → `LONGTEXT` or `JSON`
- Add `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`

### 3. Update Connection

Replace in `db-service.js`:

```javascript
// Before
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(DB_PATH);

// After
import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'istqb_quiz',
  password: 'password'
});
```

See `DATABASE_SUMMARY.md` for complete migration guide.

## Debugging

### Check API Server Status

```bash
curl http://localhost:3001/api/health
```

### View Server Logs

Server logs show all API requests:
```
✓ API Server running on http://localhost:3001
GET /api/quizzes - 200
GET /api/quiz/sample-exam-enhanced - 200
```

### Query Database Directly

```bash
# Run query examples
node src/database/query-examples.js

# Open SQLite CLI
sqlite3 src/database/database.sqlite

# List tables
.tables

# View quizzes
SELECT * FROM quizzes;

# Exit
.quit
```

## Package.json Scripts

```json
{
  "dev": "vite",              // Start frontend (port 5174)
  "server": "node server.js", // Start API (port 3001)
  "start": "node server.js",  // Alias for server
  "build": "vite build",      // Build for production
  "preview": "vite preview"   // Preview production build
}
```

## Benefits

### Development
- ✅ Single source of truth (database)
- ✅ Easy to query and update data
- ✅ No JSON file editing needed
- ✅ Better data integrity
- ✅ Proper relationships enforced

### Production Ready
- ✅ MySQL-compatible from day one
- ✅ RESTful API architecture
- ✅ Scalable for multiple clients
- ✅ Easy to add authentication
- ✅ Easy to add more endpoints

## Next Steps

1. **Add Authentication** - JWT tokens for user login
2. **User Progress Tracking** - Save quiz attempts to database
3. **Statistics** - Track performance by K-level, learning objective
4. **Admin Panel** - UI for adding/editing questions
5. **Migrate to MySQL** - When ready for production
6. **Deploy** - Backend to Heroku/Railway, Frontend to Vercel

## Troubleshooting

### "Failed to fetch quizzes"

**Cause:** API server not running
**Fix:** Run `npm run server` in separate terminal

### "EADDRINUSE: Port 3001 already in use"

**Cause:** Another process using port 3001
**Fix:** Kill process or change port in `server.js`

### "Cannot find module 'express'"

**Cause:** Missing dependencies
**Fix:** Run `npm install`

### "Database file not found"

**Cause:** Database needs to be created
**Fix:** Run `node src/database/migrate.js`

---

**Status:** ✅ Fully Integrated and Tested
**Date:** 2025-11-17
**Version:** 3.0
