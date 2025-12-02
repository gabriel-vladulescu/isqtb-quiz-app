# Getting Started with Enhanced ISTQB Quiz App

## Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to the URL shown in terminal (typically `http://localhost:5173`)

---

## What's New

Your ISTQB Quiz App has been enhanced with comprehensive support for:

### ✅ Visual Aids
- **Decision Tables** - For K3 decision table testing questions
- **State Transition Tables/Diagrams** - For K3 state transition questions
- **Equivalence Partition Tables** - Shows valid/invalid partitions
- **Boundary Value Tables** - 2-value and 3-value BVA
- **Code Snippets** - With syntax highlighting and line numbers
- **Generic Tables** - For any tabular data

### ✅ Calculation Support
- Formula display with proper formatting
- Given values clearly shown
- Step-by-step work displayed
- Final result highlighted
- Supports all ISTQB formulas (coverage, estimation, DRE, etc.)

### ✅ Enhanced Question Format
- Optional hints for students
- Backward compatible with all existing questions
- Mix old and new formats in same exam

---

## Try the Demo

1. Start the dev server (see above)
2. In the exam selector, choose **"ISTQB CTFL Enhanced Features Demo"**
3. This 10-question exam showcases all new features:
   - Question 1: Code snippet + statement coverage calculation
   - Question 2: Decision table + coverage calculation
   - Question 3: State transition table
   - Question 4: Velocity calculation
   - Question 5: Three-point estimation calculation
   - Question 6: Boundary value table (3-value BVA)
   - Question 7: Equivalence partition table + EP coverage
   - Questions 8-9: Additional calculations
   - Question 10: Basic testing principles

---

## Creating Your Own Questions

### Quick Start
1. Copy `src/data/sample-exam-enhanced.json`
2. Rename it (e.g., `my-exam.json`)
3. Modify the questions
4. It will automatically appear in the exam selector!

### Documentation
- **Complete Structure Guide:** `src/data/QUESTION_STRUCTURE.md`
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`
- **Examples:** All questions in `sample-exam-enhanced.json`

### Question Templates

**Simple Question (no enhancements):**
```json
{
  "id": 1,
  "questionText": "Which testing principle...",
  "options": [
    {"key": "a", "text": "Option A"},
    {"key": "b", "text": "Option B"},
    {"key": "c", "text": "Option C"},
    {"key": "d", "text": "Option D"}
  ],
  "correctAnswer": ["c"],
  "selectType": "single",
  "explanation": {
    "a": "✗ Incorrect...",
    "b": "✗ Incorrect...",
    "c": "✓ Correct...",
    "d": "✗ Incorrect..."
  },
  "learningObjective": "FL-1.3.1",
  "kLevel": "K1",
  "points": 1
}
```

**With Decision Table:**
```json
{
  "id": 2,
  "questionText": "Referring to the decision table...",
  "visualAid": {
    "type": "decisionTable",
    "title": "Your Table Title",
    "conditions": [
      {"name": "Condition 1?", "rules": ["T", "F", "T"]},
      {"name": "Condition 2?", "rules": ["T", "T", "F"]}
    ],
    "actions": [
      {"name": "Action 1", "rules": ["X", "", ""]},
      {"name": "Action 2", "rules": ["", "X", "X"]}
    ],
    "legend": {
      "T": "True", "F": "False", "X": "Action occurs"
    }
  },
  // ... rest of question
}
```

**With Calculation:**
```json
{
  "id": 3,
  "questionText": "Calculate the coverage...",
  "calculation": {
    "formula": "Coverage = (Executed / Total) × 100",
    "given": {
      "Executed": 15,
      "Total": 20
    },
    "workShown": "(15 / 20) × 100 = 75%",
    "result": "75%"
  },
  // ... rest of question
}
```

---

## File Structure

```
isqtb-quiz-app/
├── src/
│   ├── components/
│   │   ├── Question.jsx                  ← Enhanced with new features
│   │   ├── CalculationDisplay.jsx        ← NEW
│   │   ├── DecisionTableDisplay.jsx      ← NEW
│   │   ├── StateTransitionDisplay.jsx    ← NEW
│   │   ├── TableDisplay.jsx              ← NEW
│   │   ├── CodeDisplay.jsx               ← NEW
│   │   └── ... (other components unchanged)
│   └── data/
│       ├── QUESTION_STRUCTURE.md         ← Complete documentation
│       ├── sample-exam-enhanced.json     ← Demo exam (NEW)
│       ├── sample-exam-a.json            ← Works unchanged
│       └── ... (other exams work unchanged)
├── IMPLEMENTATION_SUMMARY.md             ← Technical details
├── GETTING_STARTED.md                    ← This file
└── Summary.md                            ← ISTQB study guide
```

---

## Features

### Visual Aids

| Type | Use Case | Color |
|------|----------|-------|
| Decision Table | K3 decision table testing | Blue |
| State Transition Table | K3 state transition testing | Green |
| State Transition Diagram | Visual state flow | Green |
| EP Table | Equivalence partitioning | Amber |
| BVA Table | Boundary value analysis | Orange |
| Code Snippet | White-box testing | Dark |
| Generic Table | Any tabular data | Gray |

### Calculations

All formulas from ISTQB syllabus supported:
- **Statement Coverage:** (Executed / Total) × 100
- **Branch Coverage:** (Executed Branches / Total) × 100
- **EP Coverage:** (Partitions / Total) × 100
- **Decision Table Coverage:** (Columns / Total Feasible) × 100
- **Three-Point Estimation:** E = (a + 4m + b) / 6
- **DRE:** (Before Release / Total) × 100
- **Velocity:** Total Points / Sprints
- **Custom:** Any formula you need

---

## Key Points

✅ **All existing exams still work** - No changes needed
✅ **Automatic loading** - Just add JSON file to `src/data/`
✅ **Mix formats** - Old and new questions in same exam
✅ **Optional enhancements** - Add only what you need
✅ **Complete documentation** - Examples for everything
✅ **Production ready** - Tested and working

---

## Need Help?

### Documentation Files
1. **GETTING_STARTED.md** (this file) - Quick start guide
2. **src/data/QUESTION_STRUCTURE.md** - Complete data structure reference
3. **IMPLEMENTATION_SUMMARY.md** - Technical implementation details
4. **Summary.md** - ISTQB Foundation Level study guide

### Examples
- Look at `src/data/sample-exam-enhanced.json` for all feature examples
- Each of 10 questions demonstrates different capabilities

### Common Tasks

**Add a new exam:**
1. Copy any exam JSON file
2. Rename it
3. Edit questions
4. Done! (Auto-loaded)

**Add decision table to question:**
- Copy decision table structure from Question #2 in sample-exam-enhanced.json
- Modify conditions, actions, and legend

**Add calculation to question:**
- Copy calculation structure from Question #4 or #5
- Modify formula, given values, work shown, and result

**Add code snippet:**
- Copy code structure from Question #1
- Replace with your code

---

## Troubleshooting

**Exam not appearing?**
- Check JSON syntax (use JSON validator)
- Ensure file is in `src/data/` directory
- File must have `.json` extension
- Restart dev server

**Visual aid not showing?**
- Check `visualAid.type` matches a supported type
- Verify structure matches documentation
- Check browser console for errors

**Calculation not displaying?**
- Ensure `calculation` object is at question root level
- Check all required fields present

---

## Next Steps

1. **Run the app** (`npm install` then `npm run dev`)
2. **Try the demo exam** (Enhanced Features Demo)
3. **Review documentation** (QUESTION_STRUCTURE.md)
4. **Create your own questions** (copy and modify sample-exam-enhanced.json)
5. **Study for ISTQB** (use Summary.md)

---

**Questions? Issues?**
- Check `IMPLEMENTATION_SUMMARY.md` for technical details
- Review examples in `sample-exam-enhanced.json`
- All components are well-commented

**Ready to create ISTQB exam questions with:**
- Decision tables ✅
- State transitions ✅
- Calculations ✅
- Code examples ✅
- And more! ✅

---

**Version:** 1.0
**Date:** 2025-11-17
**Status:** 🚀 Ready to use!
