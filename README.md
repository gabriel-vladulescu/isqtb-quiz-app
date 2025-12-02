# ISTQB Quiz App - Enhanced Edition

A modern, feature-rich quiz application for ISTQB Foundation Level exam preparation with support for visual aids, calculations, and interactive learning.

## 🚀 Quick Start

### Option 1: Database Mode (Recommended)

```bash
# Install dependencies
npm install

# Start API server (Terminal 1)
npm run server

# Start development server (Terminal 2)
npm run dev

# Open browser at http://localhost:5174 (or port shown in terminal)
```

**Ports:**
- API Server: http://localhost:3001
- Dev Server: http://localhost:5174

### Option 2: Standalone Mode

```bash
# Install dependencies
npm install

# Start development server only
npm run dev

# Add JSON files to src/data/ (they auto-load)
```

## ✨ Key Features

### Visual Learning Aids
- **Decision Tables** - Interactive tables with T/F/X notation
- **State Transition Tables** - Current State → Event → Next State
- **State Transition Diagrams** - Visual state flow with arrows
- **Equivalence Partition Tables** - Valid/Invalid partitions highlighted
- **Boundary Value Tables** - 2-value and 3-value BVA
- **Code Snippets** - Syntax-highlighted code with line numbers

### Calculation Support
- Step-by-step formula explanations
- Given values clearly displayed
- Work shown with mathematical steps
- Final results highlighted
- All ISTQB formulas supported

### Enhanced UI/UX (v2.0)
- **Clear Progression:** Confirm → See Result → Next
- **Professional Icons:** SVG icons throughout
- **Visual Feedback:** Color-coded correct/incorrect answers
- **Explanation System:** Show/hide detailed explanations
- **Progress Tracking:** Real-time timer, correct/wrong count
- **Auto-Save:** Progress persists in localStorage

## 📊 Latest Updates (v2.0)

### Fixed Confirm/Next Button Logic
**Before:** Confusing - Confirm and Next shown together
**After:** Linear flow:
1. Select answer
2. Click **"Confirm Answer"**
3. See result (Correct/Incorrect)
4. Optionally view explanation
5. Click **"Next Question"** or **"Finish Exam"**

### Replaced Emojis with SVG Icons
All emoji replaced with professional SVG icons:
- Clock icon for timer
- Checkmark for correct answers
- X for wrong answers
- Lightbulb for hints
- Eye for show/hide

### Removed Backward Compatibility
- Old exam files moved to `src/data/backup/`
- Only enhanced format now supported
- Cleaner codebase

## 📁 Project Structure

```
isqtb-quiz-app/
├── src/
│   ├── components/
│   │   ├── Question.jsx                  # Main question display
│   │   ├── Questionnaire.jsx             # Quiz flow
│   │   ├── CalculationDisplay.jsx        # Formulas
│   │   ├── DecisionTableDisplay.jsx      # Decision tables
│   │   ├── StateTransitionDisplay.jsx    # State transitions
│   │   ├── TableDisplay.jsx              # EP/BVA tables
│   │   └── CodeDisplay.jsx               # Code snippets
│   ├── data/
│   │   ├── sample-exam-enhanced.json     # Demo exam
│   │   ├── chapters.json                 # Chapter metadata
│   │   └── backup/                       # Old files
│   ├── database/
│   │   ├── database.sqlite               # SQLite database
│   │   ├── schema.sql                    # Database schema
│   │   ├── migrate.js                    # Migration script
│   │   ├── db-service.js                 # Database queries
│   │   ├── query-examples.js             # Example queries
│   │   └── README.md                     # Database docs
│   └── App.jsx
├── server.js                             # Express API server
├── GETTING_STARTED.md                    # Quick start
├── UPDATES.md                            # Recent changes
├── DATABASE_SUMMARY.md                   # Database overview
├── Summary.md                            # Study guide
└── README.md                             # This file
```

## 💾 Database Integration

### SQLite Database (v3.0)

The app now includes a SQLite database with full quiz data:

**Features:**
- 4 ISTQB resources (Sample Exams A-D)
- 6 quizzes (5 backup + 1 enhanced demo)
- 10 enhanced questions with visual aids
- Normalized structure (5 tables)
- MySQL-compatible design

**Database Structure:**
```
resources (1) → (N) quizzes (1) → (N) questions
                                      ↓
                                   options
                                   explanations
```

**API Endpoints:**
- `GET /api/health` - Server status
- `GET /api/quizzes` - List all quizzes
- `GET /api/quiz/:examId` - Complete quiz with questions

**Migrate/Reset Database:**
```bash
node src/database/migrate.js
```

**Query Database:**
```bash
# Run examples
node src/database/query-examples.js

# Direct SQL
sqlite3 src/database/database.sqlite
```

See `DATABASE_SUMMARY.md` and `src/database/README.md` for details.

## 📝 Creating Questions

### Basic Structure
```json
{
  "id": 1,
  "questionText": "Your question?",
  "options": [
    {"key": "a", "text": "Option A"},
    {"key": "b", "text": "Option B"}
  ],
  "correctAnswer": ["c"],
  "selectType": "single",
  "explanation": {...},
  "learningObjective": "FL-X.X.X",
  "kLevel": "K2",
  "points": 1
}
```

### Add Visual Aid
```json
"visualAid": {
  "type": "decisionTable",
  "conditions": [...],
  "actions": [...]
}
```

### Add Calculation
```json
"calculation": {
  "formula": "Coverage = (Executed / Total) × 100",
  "given": {"Executed": 15, "Total": 20},
  "workShown": "(15 / 20) × 100 = 75%",
  "result": "75%"
}
```

See `src/data/QUESTION_STRUCTURE.md` for complete documentation.

## 🧪 Demo Exam

The `sample-exam-enhanced.json` demonstrates all features:
- Q1: Code + statement coverage calculation
- Q2: Decision table + coverage formula
- Q3: State transition table
- Q4: Velocity calculation
- Q5: Three-point estimation
- Q6: Boundary value table
- Q7: Equivalence partition table
- Q8-9: Various calculations
- Q10: Basic question

## 🎯 ISTQB Coverage

Supports all v4.0.1 syllabus topics:
- Chapter 1: Fundamentals
- Chapter 2: Testing Throughout SDLC
- Chapter 3: Static Testing
- Chapter 4: Test Analysis & Design (with visual aids)
- Chapter 5: Managing Test Activities (with calculations)
- Chapter 6: Test Tools

## 🔧 Technology

**Frontend:**
- React 18
- Vite 6
- Tailwind CSS
- SVG Icons
- LocalStorage

**Backend:**
- Express 5
- SQLite 3 (MySQL-compatible)
- REST API
- CORS enabled

## 📚 Documentation

- **GETTING_STARTED.md** - Installation guide
- **src/data/QUESTION_STRUCTURE.md** - Question format reference
- **UPDATES.md** - Recent changes
- **Summary.md** - ISTQB study guide

## 🚨 Important

### Adding New Exams
1. Create JSON file in `src/data/`
2. Use structure from `sample-exam-enhanced.json`
3. File auto-loads in exam selector

### Old Exams
Moved to `src/data/backup/` - can be restored if needed

## 📖 Study Tips

1. Try the enhanced demo exam
2. Review explanations after each question
3. Practice calculations (three-point estimation, coverage)
4. Understand visual aids (decision tables, state transitions)
5. Use Summary.md for comprehensive review

---

**Version:** 3.0
**Status:** ✅ Production Ready

**URLs:**
- Dev Server: http://localhost:5174
- API Server: http://localhost:3001

**Features:** Visual Aids ✓ | Calculations ✓ | Icons ✓ | Enhanced UI ✓ | Database ✓ | REST API ✓
