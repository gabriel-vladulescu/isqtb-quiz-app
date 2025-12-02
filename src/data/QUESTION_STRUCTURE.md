# Enhanced Question Data Structure

## Overview
This document defines the enhanced question structure that supports visual aids, calculations, tables, and diagrams as specified in the ISTQB v4.0.1 syllabus.

## Base Question Structure

```json
{
  "id": 1,
  "questionText": "Main question text",
  "options": [
    {"key": "a", "text": "Option A text"},
    {"key": "b", "text": "Option B text"},
    {"key": "c", "text": "Option C text"},
    {"key": "d", "text": "Option D text"}
  ],
  "correctAnswer": ["c"], // or ["b","c"] for multiple
  "selectType": "single", // or "multiple"
  "explanation": {
    "a": "Explanation for option A",
    "b": "Explanation for option B",
    "c": "✓ Correct explanation",
    "d": "Explanation for option D"
  },
  "learningObjective": "FL-X.X.X",
  "kLevel": "K2",
  "points": 1,

  // OPTIONAL ENHANCEMENTS (add as needed)
  "calculation": {...},      // For questions with formulas
  "visualAid": {...},        // For tables, diagrams, etc.
  "codeSnippet": {...},      // For code examples
  "hint": "Optional hint text"
}
```

## 1. Calculation Structure

Used for questions requiring mathematical calculations (Ch 4, Ch 5).

```json
"calculation": {
  "formula": "Statement Coverage = (Executed / Total) × 100",
  "given": {
    "Executed Statements": 15,
    "Total Statements": 20
  },
  "workShown": "(15 / 20) × 100 = 0.75 × 100 = 75%",
  "result": "75%"
}
```

### Examples:

**Three-Point Estimation:**
```json
"calculation": {
  "formula": "E = (a + 4m + b) / 6, SD = (b - a) / 6",
  "given": {
    "a (optimistic)": 6,
    "m (most likely)": 9,
    "b (pessimistic)": 18
  },
  "workShown": "E = (6 + 4×9 + 18) / 6 = 60 / 6 = 10\nSD = (18 - 6) / 6 = 2",
  "result": "10 ± 2 person-hours"
}
```

## 2. Visual Aid Structure

### 2.1 Decision Table

```json
"visualAid": {
  "type": "decisionTable",
  "title": "Discount Decision Table",
  "conditions": [
    {
      "name": "Customer has card?",
      "rules": ["T", "T", "F"]
    },
    {
      "name": "Purchase > $100?",
      "rules": ["T", "F", "–"]
    }
  ],
  "actions": [
    {
      "name": "Give 10% discount",
      "rules": ["X", "", ""]
    },
    {
      "name": "Give 5% discount",
      "rules": ["", "X", ""]
    },
    {
      "name": "No discount",
      "rules": ["", "", "X"]
    }
  ],
  "legend": {
    "T": "True/Yes",
    "F": "False/No",
    "X": "Action occurs",
    "–": "Irrelevant",
    "": "No action"
  }
}
```

### 2.2 State Transition Table

```json
"visualAid": {
  "type": "stateTransitionTable",
  "title": "ATM State Transitions",
  "headers": ["Current State", "Event", "Next State", "Action"],
  "rows": [
    ["Idle", "Insert Card", "Card Inserted", "Read card data"],
    ["Card Inserted", "Enter PIN", "PIN Entered", "Validate PIN"],
    ["PIN Entered", "Valid PIN", "Ready", "Show menu"],
    ["PIN Entered", "Invalid PIN", "Card Inserted", "Show error"],
    ["Ready", "Select Withdrawal", "Processing", "Check balance"]
  ],
  "invalidTransitions": [
    {
      "from": "Idle",
      "event": "Enter PIN",
      "description": "Cannot enter PIN without card"
    }
  ]
}
```

### 2.3 State Transition Diagram

```json
"visualAid": {
  "type": "stateTransitionDiagram",
  "title": "Order Processing States",
  "states": [
    {"id": "new", "label": "New", "isInitial": true},
    {"id": "processing", "label": "Processing"},
    {"id": "shipped", "label": "Shipped"},
    {"id": "delivered", "label": "Delivered", "isFinal": true},
    {"id": "cancelled", "label": "Cancelled", "isFinal": true}
  ],
  "transitions": [
    {"from": "new", "to": "processing", "event": "Confirm Payment", "action": "Reserve items"},
    {"from": "new", "to": "cancelled", "event": "Cancel Order"},
    {"from": "processing", "to": "shipped", "event": "Package Ready", "action": "Generate tracking"},
    {"from": "shipped", "to": "delivered", "event": "Delivery Confirmed"},
    {"from": "processing", "to": "cancelled", "event": "Cancel Order", "action": "Refund"}
  ]
}
```

### 2.4 Equivalence Partition Table

```json
"visualAid": {
  "type": "equivalencePartitionTable",
  "title": "Age Field Partitions",
  "headers": ["Partition ID", "Range", "Valid/Invalid", "Example"],
  "rows": [
    ["EP1", "< 0", "Invalid", "-1"],
    ["EP2", "0-17", "Valid", "10"],
    ["EP3", "18-64", "Valid", "35"],
    ["EP4", "65-120", "Valid", "70"],
    ["EP5", "> 120", "Invalid", "150"]
  ]
}
```

### 2.5 Boundary Value Table

```json
"visualAid": {
  "type": "boundaryValueTable",
  "title": "Age Field Boundaries (18-65)",
  "boundaryType": "3-value", // or "2-value"
  "headers": ["Boundary", "Test Value", "Description"],
  "rows": [
    ["Min - 1", "17", "Just below minimum"],
    ["Min", "18", "Minimum valid value"],
    ["Min + 1", "19", "Just above minimum"],
    ["Max - 1", "64", "Just below maximum"],
    ["Max", "65", "Maximum valid value"],
    ["Max + 1", "66", "Just above maximum"]
  ]
}
```

### 2.6 Simple Data Table

```json
"visualAid": {
  "type": "table",
  "title": "Test Execution Results",
  "headers": ["Test Case", "Status", "Defects Found"],
  "rows": [
    ["TC-001", "Passed", "0"],
    ["TC-002", "Failed", "2"],
    ["TC-003", "Passed", "0"]
  ]
}
```

### 2.7 Code Snippet

```json
"visualAid": {
  "type": "code",
  "language": "javascript",
  "title": "Function to Test",
  "code": "function validate(x) {\n  if (x < 10) {\n    return 'Low';\n  } else if (x >= 10 && x < 100) {\n    return 'Medium';\n  } else {\n    return 'High';\n  }\n}",
  "lineNumbers": true
}
```

### 2.8 Control Flow Graph

```json
"visualAid": {
  "type": "controlFlowGraph",
  "title": "Control Flow for validate()",
  "nodes": [
    {"id": 1, "label": "Start", "type": "start"},
    {"id": 2, "label": "x < 10?", "type": "decision"},
    {"id": 3, "label": "return 'Low'", "type": "statement"},
    {"id": 4, "label": "x < 100?", "type": "decision"},
    {"id": 5, "label": "return 'Medium'", "type": "statement"},
    {"id": 6, "label": "return 'High'", "type": "statement"},
    {"id": 7, "label": "End", "type": "end"}
  ],
  "edges": [
    {"from": 1, "to": 2, "label": ""},
    {"from": 2, "to": 3, "label": "true"},
    {"from": 2, "to": 4, "label": "false"},
    {"from": 3, "to": 7, "label": ""},
    {"from": 4, "to": 5, "label": "true"},
    {"from": 4, "to": 6, "label": "false"},
    {"from": 5, "to": 7, "label": ""},
    {"from": 6, "to": 7, "label": ""}
  ]
}
```

## 3. Complete Examples

### Example 1: K3 Calculation Question (Chapter 5)

```json
{
  "id": 101,
  "questionText": "A team has completed three sprints with the following story points: Sprint 1 = 30 points, Sprint 2 = 45 points, Sprint 3 = 60 points. If 180 story points remain in the backlog, how many additional sprints are needed?",
  "options": [
    {"key": "a", "text": "3 sprints"},
    {"key": "b", "text": "4 sprints"},
    {"key": "c", "text": "5 sprints"},
    {"key": "d", "text": "6 sprints"}
  ],
  "correctAnswer": ["b"],
  "selectType": "single",
  "explanation": {
    "a": "✗ Incorrect. You need to calculate the average velocity first.",
    "b": "✓ Correct. Velocity = (30+45+60)/3 = 45 points/sprint. Sprints needed = 180/45 = 4.",
    "c": "✗ Incorrect. This would be correct if velocity was 36 points/sprint.",
    "d": "✗ Incorrect. This assumes velocity of 30 points/sprint."
  },
  "calculation": {
    "formula": "Velocity = Total Points / Sprints, Sprints Needed = Remaining / Velocity",
    "given": {
      "Sprint 1": 30,
      "Sprint 2": 45,
      "Sprint 3": 60,
      "Remaining": 180
    },
    "workShown": "Velocity = (30+45+60) / 3 = 135 / 3 = 45 points/sprint\nSprints Needed = 180 / 45 = 4 sprints",
    "result": "4 sprints"
  },
  "learningObjective": "FL-5.1.4",
  "kLevel": "K3",
  "points": 1
}
```

### Example 2: K3 Decision Table Question (Chapter 4)

```json
{
  "id": 102,
  "questionText": "A system provides discounts based on customer status and purchase amount. Referring to the decision table below, how many test cases are needed for 100% decision table coverage?",
  "visualAid": {
    "type": "decisionTable",
    "title": "Discount Rules",
    "conditions": [
      {"name": "Premium Customer?", "rules": ["T", "T", "F", "F"]},
      {"name": "Purchase > $100?", "rules": ["T", "F", "T", "F"]}
    ],
    "actions": [
      {"name": "Apply 20% discount", "rules": ["X", "", "", ""]},
      {"name": "Apply 10% discount", "rules": ["", "X", "X", ""]},
      {"name": "No discount", "rules": ["", "", "", "X"]}
    ],
    "legend": {
      "T": "True",
      "F": "False",
      "X": "Apply action",
      "": "No action"
    }
  },
  "options": [
    {"key": "a", "text": "2 test cases"},
    {"key": "b", "text": "3 test cases"},
    {"key": "c", "text": "4 test cases"},
    {"key": "d", "text": "8 test cases"}
  ],
  "correctAnswer": ["c"],
  "selectType": "single",
  "explanation": {
    "a": "✗ Incorrect. This would not cover all condition combinations.",
    "b": "✗ Incorrect. This only covers the number of distinct actions.",
    "c": "✓ Correct. Decision table coverage requires testing all 4 feasible columns (rules).",
    "d": "✗ Incorrect. This is 2^3 = 8 (full combination), but we only have 4 rules."
  },
  "learningObjective": "FL-4.2.3",
  "kLevel": "K3",
  "points": 1
}
```

### Example 3: K3 State Transition Question (Chapter 4)

```json
{
  "id": 103,
  "questionText": "Given the state transition table below, what is the minimum number of test cases required to achieve 100% valid transitions coverage?",
  "visualAid": {
    "type": "stateTransitionTable",
    "title": "Login System States",
    "headers": ["Current State", "Event", "Next State"],
    "rows": [
      ["Logged Out", "Enter Credentials", "Verifying"],
      ["Verifying", "Valid Credentials", "Logged In"],
      ["Verifying", "Invalid Credentials", "Logged Out"],
      ["Logged In", "Logout", "Logged Out"]
    ]
  },
  "options": [
    {"key": "a", "text": "2 test cases"},
    {"key": "b", "text": "3 test cases"},
    {"key": "c", "text": "4 test cases"},
    {"key": "d", "text": "5 test cases"}
  ],
  "correctAnswer": ["a"],
  "selectType": "single",
  "explanation": {
    "a": "✓ Correct. Two test cases can cover all 4 transitions: TC1: Logged Out → Verifying → Logged In → Logged Out. TC2: Logged Out → Verifying → Logged Out (invalid).",
    "b": "✗ Incorrect. Only 2 test cases are needed to cover all valid transitions.",
    "c": "✗ Incorrect. This equals the number of transitions, but we can cover them with fewer test cases.",
    "d": "✗ Incorrect. More test cases than necessary."
  },
  "learningObjective": "FL-4.2.4",
  "kLevel": "K3",
  "points": 1
}
```

### Example 4: K2 Statement Coverage with Code (Chapter 4)

```json
{
  "id": 104,
  "questionText": "Given the following code snippet, how many test cases are needed for 100% statement coverage?",
  "visualAid": {
    "type": "code",
    "language": "javascript",
    "code": "function checkValue(x) {\n  let result = 'default';\n  if (x > 10) {\n    result = 'high';\n  }\n  if (x < 0) {\n    result = 'negative';\n  }\n  return result;\n}",
    "lineNumbers": true
  },
  "options": [
    {"key": "a", "text": "1 test case"},
    {"key": "b", "text": "2 test cases"},
    {"key": "c", "text": "3 test cases"},
    {"key": "d", "text": "4 test cases"}
  ],
  "correctAnswer": ["c"],
  "selectType": "single",
  "explanation": {
    "a": "✗ Incorrect. One test case cannot execute all statements.",
    "b": "✗ Incorrect. Two test cases would miss some statements.",
    "c": "✓ Correct. Need 3 test cases: TC1: x=15 (covers line 3-4), TC2: x=-5 (covers line 6-7), TC3: x=5 (covers default path line 2,9).",
    "d": "✗ Incorrect. More test cases than necessary."
  },
  "calculation": {
    "formula": "Statement Coverage = (Executed Statements / Total Statements) × 100",
    "workShown": "Total executable statements: 7 (lines 2,3,4,6,7,9)\nWith 3 test cases (x=15, x=-5, x=5), all 7 statements are executed.\nCoverage = 7/7 × 100 = 100%"
  },
  "learningObjective": "FL-4.3.1",
  "kLevel": "K2",
  "points": 1
}
```

## Migration Guide

### For Existing Questions:
- Questions without visualAid, calculation, or codeSnippet fields work as before
- Backward compatible with current structure

### For New Questions:
1. Start with base structure
2. Add `visualAid` if question needs tables/diagrams
3. Add `calculation` if question involves formulas
4. Add both if needed (e.g., decision table + coverage calculation)

## Validation Rules

1. **Required Fields**: id, questionText, options, correctAnswer, selectType, learningObjective, kLevel, points
2. **Optional Fields**: explanation, calculation, visualAid, codeSnippet, hint
3. **Visual Aid Types**: decisionTable, stateTransitionTable, stateTransitionDiagram, equivalencePartitionTable, boundaryValueTable, table, code, controlFlowGraph
4. **K-Level Values**: K1, K2, K3
5. **SelectType Values**: single, multiple
