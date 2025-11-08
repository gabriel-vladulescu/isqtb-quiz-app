# 04 - Calculations Guide

## When to Use This Guide

Read this guide when generating questions involving:
- Formulas or mathematical calculations
- Coverage metrics (statement, branch, path)
- Test management metrics (defect density, DRE)
- Agile metrics (velocity)

---

## Table of Contents

1. [Coverage Metrics](#1-coverage-metrics)
2. [Black-Box Techniques with Math](#2-black-box-techniques)
3. [Test Management Metrics](#3-test-management-metrics)
4. [Agile Metrics](#4-agile-metrics)
5. [Adding Calculations to JSON](#5-adding-calculations-to-json)
6. [Number Formatting Rules](#6-number-formatting-rules)

---

## 1. Coverage Metrics

### Statement Coverage

**Formula:**
```
Statement Coverage (%) = (Executed Statements / Total Statements) × 100
```

**When to use:** K2-K3, white-box testing

**Example:**
- Program has 8 statements
- Tests execute 6 statements
- Coverage = (6/8) × 100 = 75%

**Sample Question:**
```json
{
    "questionText": "A module contains 20 statements. Tests execute 15 statements. What is the statement coverage?",
    "options": [
        {"key": "a", "text": "70%"},
        {"key": "b", "text": "75%"},
        {"key": "c", "text": "80%"},
        {"key": "d", "text": "85%"}
    ],
    "correctAnswer": ["b"],
    "calculation": {
        "formula": "Statement Coverage = (Executed / Total) × 100",
        "workShown": "(15 / 20) × 100 = 0.75 × 100 = 75%",
        "result": "75%"
    },
    "kLevel": "K2"
}
```

---

### Branch (Decision) Coverage

**Formula:**
```
Branch Coverage (%) = (Executed Branches / Total Branches) × 100
```

**When to use:** K2-K3, decision points in code

**Example:**
- Code has 12 possible branches
- Tests execute 9 branches
- Coverage = (9/12) × 100 = 75%

**Note:** May include flowchart diagram

---

### Cyclomatic Complexity

**Formula:**
```
Cyclomatic Complexity = E - N + 2P

Where:
E = Number of edges (arrows)
N = Number of nodes (shapes)
P = Number of connected components (usually 1)
```

**When to use:** K2-K3, determining test cases for path coverage

**ALWAYS requires:** Flow graph diagram

**Example:**
- Flow graph: 10 edges, 8 nodes, 1 component
- CC = 10 - 8 + 2(1) = 4
- **Result:** Need 4 test cases for 100% path coverage

**Sample Question:**
```json
{
    "questionText": "A flow graph has 12 edges and 9 nodes. What is the cyclomatic complexity?",
    "options": [
        {"key": "a", "text": "3"},
        {"key": "b", "text": "4"},
        {"key": "c", "text": "5"},
        {"key": "d", "text": "6"}
    ],
    "correctAnswer": ["c"],
    "calculation": {
        "formula": "CC = E - N + 2P",
        "workShown": "CC = 12 - 9 + 2(1) = 5",
        "result": "5"
    },
    "visualAid": {
        "type": "flowgraph",
        "required": true
    },
    "kLevel": "K3"
}
```

---

## 2. Black-Box Techniques

### Boundary Value Analysis (BVA)

**Concept:** Test at boundaries, just inside, and just outside ranges

**For range [min, max]:**
- Test: min-1, min, min+1, max-1, max, max+1

**Example:**
- Input range: 10 to 100
- BVA test values: 9, 10, 11, 99, 100, 101
- Total: 6 test cases

**Sample Question:**
```json
{
    "questionText": "An age field accepts values 18-65. Using two-value BVA, which values should be tested?",
    "options": [
        {"key": "a", "text": "17, 18, 65, 66"},
        {"key": "b", "text": "18, 19, 64, 65"},
        {"key": "c", "text": "17, 18, 19, 64, 65, 66"},
        {"key": "d", "text": "18, 40, 65"}
    ],
    "correctAnswer": ["c"],
    "explanation": {
        "a": "✗ Incorrect. Missing just-inside values (19, 64).",
        "b": "✗ Incorrect. Missing just-outside values (17, 66).",
        "c": "✓ Correct. Includes min-1 (17), min (18), min+1 (19), max-1 (64), max (65), max+1 (66).",
        "d": "✗ Incorrect. Only tests boundaries, not adjacent values."
    },
    "kLevel": "K3"
}
```

---

### Equivalence Partitioning

**Concept:** Count partitions to determine test cases

**Example:**
- Range < 1 (invalid)
- Range 1-10 (valid)
- Range 11-100 (valid)
- Range > 100 (invalid)
- **Result:** 4 partitions = minimum 4 test cases

---

## 3. Test Management Metrics

### Defect Density

**Formula:**
```
Defect Density = Number of Defects / Size (KLOC or Function Points)
```

**KLOC = Thousands of Lines of Code (10,000 lines = 10 KLOC)**

**Example:**
- 30 defects found
- 10,000 lines of code (10 KLOC)
- Defect Density = 30 / 10 = 3 defects per KLOC

---

### Defect Removal Efficiency (DRE)

**Formula:**
```
DRE (%) = (Defects Found Before Release / Total Defects) × 100
```

**Example:**
- 45 defects found in testing
- 5 defects found after release
- Total defects = 45 + 5 = 50
- DRE = (45/50) × 100 = 90%

**Sample Question:**
```json
{
    "questionText": "Testing found 80 defects. After release, users reported 20 more defects. What is the DRE?",
    "options": [
        {"key": "a", "text": "75%"},
        {"key": "b", "text": "80%"},
        {"key": "c", "text": "85%"},
        {"key": "d", "text": "90%"}
    ],
    "correctAnswer": ["b"],
    "calculation": {
        "formula": "DRE = (Defects Before Release / Total Defects) × 100",
        "workShown": "DRE = (80 / (80 + 20)) × 100 = (80 / 100) × 100 = 80%",
        "result": "80%"
    },
    "kLevel": "K2"
}
```

---

### Test Progress

**Formula:**
```
Test Progress (%) = (Test Cases Executed / Total Test Cases) × 100
```

**Example:**
- 75 test cases executed
- 100 total test cases
- Progress = (75/100) × 100 = 75%

---

### Pass Rate

**Formula:**
```
Pass Rate (%) = (Test Cases Passed / Test Cases Executed) × 100
```

**Example:**
- 60 test cases passed
- 80 test cases executed
- Pass Rate = (60/80) × 100 = 75%

---

### Test Case Efficiency

**Formula:**
```
Test Case Efficiency = Defects Found / Test Cases Executed
```

**Example:**
- 25 defects found
- 100 test cases executed
- Efficiency = 25/100 = 0.25 defects per test case

---

## 4. Agile Metrics

### Velocity

**Formula:**
```
Velocity = Total Story Points Completed / Number of Sprints

Required Sprints = Total Story Points Remaining / Velocity
```

**Example:**
- Sprint 1: 40 points
- Sprint 2: 50 points
- Sprint 3: 60 points
- Velocity = (40+50+60) / 3 = 50 points per sprint
- Remaining: 200 points
- Sprints needed = 200 / 50 = 4 sprints

**Sample Question:**
```json
{
    "questionText": "A team completed 30, 45, and 60 story points in three sprints. If 180 points remain, how many sprints are needed?",
    "options": [
        {"key": "a", "text": "3 sprints"},
        {"key": "b", "text": "4 sprints"},
        {"key": "c", "text": "5 sprints"},
        {"key": "d", "text": "6 sprints"}
    ],
    "correctAnswer": ["b"],
    "calculation": {
        "formula": "Velocity = Total Points / Sprints, Then: Sprints Needed = Remaining / Velocity",
        "workShown": "Velocity = (30+45+60) / 3 = 135 / 3 = 45\nSprints = 180 / 45 = 4",
        "result": "4 sprints"
    },
    "kLevel": "K3"
}
```

---

## 5. Adding Calculations to JSON

### The `calculation` Field

When a question involves formulas, add this optional field:

```json
"calculation": {
    "formula": "The formula name or expression",
    "workShown": "Step-by-step calculation",
    "result": "Final answer with units"
}
```

**Example:**
```json
"calculation": {
    "formula": "Statement Coverage = (Executed / Total) × 100",
    "workShown": "(15 / 20) × 100 = 0.75 × 100 = 75%",
    "result": "75%"
}
```

### When to Include

✅ **Always include** for:
- Coverage calculations
- Metric calculations
- Any question with numbers and formulas

✅ **Show work** for:
- Multi-step calculations
- Questions where process matters
- K3 application questions

---

## 6. Number Formatting Rules

### Percentages
```
GOOD: 75%, 66.7%, 83.3%
BAD: 75, 0.75, 75 percent, 66.666666%
```

### Decimals
```
GOOD: 3.5, 12.75, 0.25
BAD: 3.5000000, 12.750, .25
```

**Rules:**
- Use 1-2 decimal places maximum
- Include % symbol for percentages
- Round consistently (usually to nearest tenth)
- Use commas for large numbers: 10,000 not 10000

### Units
```
GOOD: "3 defects per KLOC", "4 test cases", "75%"
BAD: "3", "4", "75" (missing units)
```

---

## 7. Calculation Question Patterns

### Pattern 1: Direct Calculation (K2)
- Give all values
- Ask for result
- One formula application

**Example:** "8 statements, 6 executed. What is coverage?"

---

### Pattern 2: Multi-Step (K3)
- Calculate intermediate values
- Then apply to another formula
- More complex

**Example:** "Calculate velocity from 3 sprints, then determine sprints needed."

---

### Pattern 3: Value Extraction (K3)
- Present table or scenario
- Candidate identifies relevant values
- Then calculates

**Example:** "Given the state transition table, how many test cases for 100% transition coverage?"

---

### Pattern 4: Inverse Calculation (K2-K3)
- Give result and some inputs
- Ask for missing input

**Example:** "To achieve 80% coverage of X statements, how many must be executed?"

---

## 8. Calculation Formula Quick Reference

| Metric | Formula | Result |
|--------|---------|--------|
| **Statement Coverage** | (Executed / Total) × 100 | Percentage |
| **Branch Coverage** | (Executed Branches / Total Branches) × 100 | Percentage |
| **Cyclomatic Complexity** | E - N + 2P | Number |
| **Defect Density** | Defects / Size (KLOC) | Number per KLOC |
| **DRE** | (Defects Before Release / Total) × 100 | Percentage |
| **Test Progress** | (Executed / Total) × 100 | Percentage |
| **Pass Rate** | (Passed / Executed) × 100 | Percentage |
| **Velocity** | Story Points / Sprints | Points per sprint |

---

## 9. Checklist for Calculation Questions

Before finalizing:
- [ ] Formula is correct and clearly stated
- [ ] All values needed are provided
- [ ] Calculation steps are shown
- [ ] Result includes proper units (%, number, etc.)
- [ ] Numbers formatted correctly (1-2 decimals)
- [ ] If visual aid needed, marked as required
- [ ] Distractors are plausible (near the correct answer or common mistakes)

---

**Next:** If your question needs tables/diagrams, read [05_Visual_Aids_Guide.md](05_Visual_Aids_Guide.md)

**Otherwise:** Review [03_Quality_Guidelines.md](03_Quality_Guidelines.md) before finalizing.

---

**Version:** 3.0
**Last Updated:** 2025-11-07
