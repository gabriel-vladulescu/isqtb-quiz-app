# 🤖 AI Instructions - ISTQB Question Generation

## START HERE

You are generating ISTQB Foundation Level exam questions. This folder contains everything you need.

---

## 📖 Read Files in This Order

### Step 1: Read This File (You Are Here)
Understand the workflow and when to read each guide.

### Step 2: Read Based on Your Task

**For ANY question generation:**
1. **01_K_Levels_Guide.md** - Understand K1, K2, K3 levels (2 min read)
2. **02_Question_Structure.md** - Learn the JSON format (3 min read)

**If your questions involve calculations/formulas:**
3. **04_Calculations_Guide.md** - Formulas and examples (5 min read)

**If your questions need tables/diagrams:**
4. **05_Visual_Aids_Guide.md** - Visual requirements (2 min read)

**Before finalizing:**
5. **03_Quality_Guidelines.md** - Checklist and best practices (3 min read)

---

## ⚡ Quick Decision Tree

```
START: I need to generate questions

├─ Read 01_K_Levels_Guide.md (What K-level is this topic?)
├─ Read 02_Question_Structure.md (What's the JSON format?)
│
├─ Does topic involve math/formulas/metrics?
│  ├─ YES → Read 04_Calculations_Guide.md
│  └─ NO → Skip
│
├─ Does topic need tables/diagrams?
│  ├─ YES → Read 05_Visual_Aids_Guide.md
│  └─ NO → Skip
│
└─ Read 03_Quality_Guidelines.md (Check quality before output)

DONE → Generate questions
```

---

## 📁 File Guide

| File | Purpose | When to Read |
|------|---------|--------------|
| **00_README_AI_START_HERE.md** | Overview & workflow | Always (start here) |
| **01_K_Levels_Guide.md** | K1, K2, K3 definitions & examples | Always |
| **02_Question_Structure.md** | JSON format & required fields | Always |
| **03_Quality_Guidelines.md** | Quality checklist & best practices | Before finalizing |
| **04_Calculations_Guide.md** | Formulas & calculation examples | Only if calculations needed |
| **05_Visual_Aids_Guide.md** | Tables/diagrams requirements | Only if visuals needed |
| **Chap[X].md** | Chapter content to create questions from | When generating for that chapter |

---

## 🎯 Your Task Workflow

### Input You'll Receive:
- Chapter number or topic
- Number of questions needed
- (Optional) Specific K-level distribution

### Your Workflow:
```
1. Read this README (done ✓)
2. Read 01_K_Levels_Guide.md
3. Read 02_Question_Structure.md
4. Read the chapter content file (Chap[X].md)
5. Identify: Does topic need calculations? → Read 04_Calculations_Guide.md
6. Identify: Does topic need visual aids? → Read 05_Visual_Aids_Guide.md
7. Generate questions in JSON format
8. Read 03_Quality_Guidelines.md
9. Run quality checklist on each question
10. Output final JSON
```

---

## 📊 Quick Reference

### K-Level Distribution (Default)
- **40% K1** (Remember) - Definitions, facts, keywords
- **40% K2** (Understand) - Explain, compare, interpret
- **20% K3** (Apply) - Scenarios, problem-solving

### Required Fields in Every Question
```json
{
    "id": "sequential number",
    "questionText": "clear question",
    "options": [4 options with keys a,b,c,d],
    "correctAnswer": ["array of correct key(s)"],
    "selectType": "single or multiple",
    "explanation": {explanation for ALL options},
    "learningObjective": "FL-X.Y.Z",
    "kLevel": "K1, K2, or K3",
    "points": 1
}
```

### Topics That Need Calculations Guide
- Statement/Branch Coverage
- Cyclomatic Complexity
- Defect Density, DRE
- Test Progress, Pass Rate
- Velocity (Agile)
- Boundary Value Analysis
- Equivalence Partitioning

### Topics That Need Visual Aids Guide
- State Transition Testing (REQUIRED)
- Decision Table Testing (REQUIRED)
- Cyclomatic Complexity (REQUIRED)
- Branch/Path Coverage (Often)

---

## ✅ Quality Checklist (Quick Version)

Before outputting questions, verify:
- [ ] 4 answer options (a, b, c, d)
- [ ] Clear, unambiguous question
- [ ] All options grammatically parallel
- [ ] Explanation for ALL options
- [ ] Correct K-level assigned
- [ ] Calculations shown (if applicable)
- [ ] Visual aid marked (if required)

**Full checklist in:** 03_Quality_Guidelines.md

---

## 🚀 Ready to Start?

1. ✓ You've read this overview
2. → Next: Open **01_K_Levels_Guide.md**
3. → Then: Open **02_Question_Structure.md**
4. → Then: Open the chapter content file you need
5. → Generate questions
6. → Check with **03_Quality_Guidelines.md**

**Total reading time: 10-15 minutes before you start generating**

---

## 📝 Example Output Format

```json
[
    {
        "id": "1",
        "questionText": "What is a defect?",
        "options": [
            {"key": "a", "text": "A flaw in code"},
            {"key": "b", "text": "A human mistake"},
            {"key": "c", "text": "A system failure"},
            {"key": "d", "text": "A test case"}
        ],
        "correctAnswer": ["a"],
        "selectType": "single",
        "explanation": {
            "a": "✓ Correct. A defect is a flaw in code or design.",
            "b": "✗ Incorrect. This describes an error.",
            "c": "✗ Incorrect. This describes a failure.",
            "d": "✗ Incorrect. This is a test artifact."
        },
        "learningObjective": "FL-1.2.3",
        "kLevel": "K1",
        "points": 1
    }
]
```

---

**Version:** 3.0
**Last Updated:** 2025-11-07
**For:** ISTQB Foundation Level (FL)

---

**Go to:** [01_K_Levels_Guide.md](01_K_Levels_Guide.md) →
