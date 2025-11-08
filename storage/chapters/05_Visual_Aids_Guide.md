# 05 - Visual Aids Guide

## When to Use This Guide

Read this when generating questions that require:
- Tables (state transition, decision tables, partition tables)
- Diagrams (flowcharts, flow graphs)
- Charts or visual representations

---

## Visual Aid Requirements by Technique

| Technique | Visual Aid | Required? | Type |
|-----------|------------|-----------|------|
| **State Transition Testing** | State table/diagram | **REQUIRED** | Table or diagram |
| **Decision Table Testing** | Decision table | **REQUIRED** | Table |
| **Cyclomatic Complexity** | Flow graph | **REQUIRED** | Diagram |
| **Branch/Path Coverage** | Flowchart | Often | Diagram |
| **Equivalence Partitioning** | Partition table | Recommended | Table |
| **Boundary Value Analysis** | Range table | Recommended | Table |
| **Statement Coverage** | Code snippet | Sometimes | Code |

---

## 1. State Transition Testing

### When Needed: **ALWAYS**

State transition questions require either a:
- State transition table, OR
- State diagram

### State Transition Table Format

**Example:**

| Current State | Event | Next State |
|---------------|-------|------------|
| Locked | Insert Card | Card Inserted |
| Card Inserted | Enter PIN | Unlocked |
| Card Inserted | Cancel | Locked |
| Unlocked | Withdraw | Locked |
| Unlocked | Check Balance | Unlocked |

### Sample Question

```json
{
    "questionText": "Given the state transition table below, how many test cases are needed for 100% transition coverage?\n\n| Current State | Event | Next State |\n|---------------|-------|------------|\n| Locked | Insert Card | Card Inserted |\n| Card Inserted | Enter PIN | Unlocked |\n| Card Inserted | Cancel | Locked |\n| Unlocked | Withdraw | Locked |\n| Unlocked | Check Balance | Unlocked |",
    "options": [
        {"key": "a", "text": "3 test cases"},
        {"key": "b", "text": "4 test cases"},
        {"key": "c", "text": "5 test cases"},
        {"key": "d", "text": "6 test cases"}
    ],
    "correctAnswer": ["c"],
    "explanation": {
        "a": "✗ Incorrect. This only counts the states, not the transitions.",
        "b": "✗ Incorrect. This undercounts the unique transitions.",
        "c": "✓ Correct. There are 5 unique transitions in the table, requiring 5 test cases for 100% transition coverage.",
        "d": "✗ Incorrect. This overcounts; we need one test per transition."
    },
    "visualAid": {
        "type": "state-transition-table",
        "required": true,
        "description": "State transition table for ATM system showing states and events"
    },
    "learningObjective": "FL-4.2.4",
    "kLevel": "K3",
    "points": 2
}
```

---

## 2. Decision Table Testing

### When Needed: **ALWAYS**

Decision table questions must include a decision table showing:
- Conditions (inputs)
- Actions (outputs/results)
- Rules (combinations)

### Decision Table Format

**Example:**

| Condition | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|-----------|--------|--------|--------|--------|
| Premium Customer? | Y | Y | N | N |
| Order > $100? | Y | N | Y | N |
| **Action** | | | | |
| Free Shipping | X | - | X | - |
| 10% Discount | X | X | - | - |

**Legend:**
- Y = Yes, N = No
- X = Action applies
- \- = Action does not apply

### Sample Question

```json
{
    "questionText": "Analyze the decision table below. How many test cases are needed to achieve full coverage?\n\n| Condition | Rule 1 | Rule 2 | Rule 3 | Rule 4 |\n|-----------|--------|--------|--------|--------|\n| Premium Customer? | Y | Y | N | N |\n| Order > $100? | Y | N | Y | N |\n| Free Shipping | X | - | X | - |\n| 10% Discount | X | X | - | - |",
    "options": [
        {"key": "a", "text": "2 test cases"},
        {"key": "b", "text": "3 test cases"},
        {"key": "c", "text": "4 test cases"},
        {"key": "d", "text": "8 test cases"}
    ],
    "correctAnswer": ["c"],
    "explanation": {
        "a": "✗ Incorrect. This only covers the conditions, not all rule combinations.",
        "b": "✗ Incorrect. This undercounts the unique rules.",
        "c": "✓ Correct. There are 4 rules (columns), requiring 4 test cases for full coverage.",
        "d": "✗ Incorrect. This represents all possible combinations (2^3), but the table shows collapsed/optimized rules."
    },
    "visualAid": {
        "type": "decision-table",
        "required": true,
        "description": "Decision table for e-commerce discounts and shipping"
    },
    "learningObjective": "FL-4.2.3",
    "kLevel": "K3",
    "points": 2
}
```

---

## 3. Cyclomatic Complexity

### When Needed: **ALWAYS**

Cyclomatic complexity questions require a flow graph showing:
- Nodes (circles/shapes representing code blocks)
- Edges (arrows showing flow between nodes)

### Flow Graph Format

**Description in question:**
```
"The control flow graph has 10 edges and 8 nodes."
```

**Or provide visual description:**
```
    ┌─────┐
    │  1  │ Start
    └──┬──┘
       │
    ┌──▼──┐
    │  2  │ Decision
    └─┬─┬─┘
      │ │
   ...etc...
```

### Sample Question

```json
{
    "questionText": "A control flow graph has 15 edges and 12 nodes. What is the cyclomatic complexity?",
    "options": [
        {"key": "a", "text": "3"},
        {"key": "b", "text": "4"},
        {"key": "c", "text": "5"},
        {"key": "d", "text": "6"}
    ],
    "correctAnswer": ["c"],
    "calculation": {
        "formula": "CC = E - N + 2P",
        "workShown": "CC = 15 - 12 + 2(1) = 5",
        "result": "5"
    },
    "visualAid": {
        "type": "flowgraph",
        "required": true,
        "description": "Control flow graph with 15 edges and 12 nodes"
    },
    "learningObjective": "FL-4.3.3",
    "kLevel": "K3",
    "points": 2
}
```

---

## 4. Branch/Path Coverage

### When Needed: Often

Branch coverage questions often include:
- Flowchart showing decision points
- Code snippet with if/else statements

### Flowchart Format

**Description:**
```
"The flowchart shows code with 4 decision points creating 8 possible branches."
```

### Sample Question

```json
{
    "questionText": "The following code has 3 if statements, creating 6 possible branches. Your test suite executes 4 branches. What is the branch coverage?\n\n[Flowchart or code would be displayed]",
    "options": [
        {"key": "a", "text": "50%"},
        {"key": "b", "text": "66.7%"},
        {"key": "c", "text": "75%"},
        {"key": "d", "text": "80%"}
    ],
    "correctAnswer": ["b"],
    "calculation": {
        "formula": "Branch Coverage = (Executed / Total) × 100",
        "workShown": "(4 / 6) × 100 = 66.7%",
        "result": "66.7%"
    },
    "visualAid": {
        "type": "flowchart",
        "required": false,
        "description": "Code flowchart showing decision branches"
    },
    "kLevel": "K3"
}
```

---

## 5. Equivalence Partitioning

### When Needed: Recommended

Partition tables help clarify valid/invalid ranges.

### Partition Table Format

**Example:**

| Partition | Range | Valid/Invalid |
|-----------|-------|---------------|
| P1 | < 1 | Invalid |
| P2 | 1-10 | Valid |
| P3 | 11-100 | Valid |
| P4 | > 100 | Invalid |

### Sample Question

```json
{
    "questionText": "Based on the equivalence partitioning table, how many test cases are minimally needed?\n\n| Partition | Range | Valid/Invalid |\n|-----------|-------|---------------|\n| P1 | < 1 | Invalid |\n| P2 | 1-10 | Valid |\n| P3 | 11-100 | Valid |\n| P4 | > 100 | Invalid |",
    "options": [
        {"key": "a", "text": "2 test cases"},
        {"key": "b", "text": "3 test cases"},
        {"key": "c", "text": "4 test cases"},
        {"key": "d", "text": "6 test cases"}
    ],
    "correctAnswer": ["c"],
    "explanation": {
        "c": "✓ Correct. There are 4 partitions, requiring minimum 4 test cases (one per partition)."
    },
    "visualAid": {
        "type": "table",
        "required": false,
        "description": "Equivalence partitioning table showing input ranges"
    },
    "kLevel": "K2"
}
```

---

## 6. Boundary Value Analysis

### When Needed: Recommended

Range tables help visualize boundary values.

### BVA Table Format

**Example:**

| Test ID | Value | Category |
|---------|-------|----------|
| T1 | 9 | Just below min |
| T2 | 10 | Min boundary |
| T3 | 11 | Just above min |
| T4 | 99 | Just below max |
| T5 | 100 | Max boundary |
| T6 | 101 | Just above max |

### Sample Question

```json
{
    "questionText": "An input field accepts 1-50. Using two-value BVA, which test values are correct?",
    "options": [
        {"key": "a", "text": "0, 1, 50, 51"},
        {"key": "b", "text": "1, 2, 49, 50"},
        {"key": "c", "text": "0, 1, 2, 49, 50, 51"},
        {"key": "d", "text": "1, 25, 50"}
    ],
    "correctAnswer": ["c"],
    "explanation": {
        "c": "✓ Correct. Two-value BVA tests min-1 (0), min (1), min+1 (2), max-1 (49), max (50), max+1 (51)."
    },
    "visualAid": {
        "type": "table",
        "required": false,
        "description": "BVA test values for range 1-50"
    },
    "kLevel": "K3"
}
```

---

## Adding Visual Aids to JSON

### The `visualAid` Field

When a question requires visual aids, add this optional field:

```json
"visualAid": {
    "type": "table | flowchart | flowgraph | state-transition-table | decision-table | diagram | code",
    "required": true | false,
    "description": "Brief description of what the visual shows"
}
```

### Visual Aid Types

| Type | When to Use |
|------|-------------|
| `state-transition-table` | State transition testing |
| `state-transition-diagram` | State transition with visual diagram |
| `decision-table` | Decision table testing |
| `flowgraph` | Cyclomatic complexity |
| `flowchart` | Branch/path coverage |
| `table` | Equivalence partitioning, BVA, or data tables |
| `code` | Statement coverage with code snippet |
| `diagram` | General diagrams |

---

## Visual Aid Checklist

When adding visual aids:
- [ ] `type` matches the visual being used
- [ ] `required` is true for: state transition, decision table, cyclomatic complexity
- [ ] `description` explains what the visual shows
- [ ] Visual is referenced in `questionText` (e.g., "Given the table below...")
- [ ] Question cannot be answered without the visual (if required: true)

---

## Complete Example with Visual Aid

```json
{
    "id": "42",
    "questionText": "The state transition table below shows an ATM system. How many test cases are needed for 100% 0-switch coverage?\n\n[Table would be displayed here]",
    "options": [
        {"key": "a", "text": "3"},
        {"key": "b", "text": "4"},
        {"key": "c", "text": "5"},
        {"key": "d", "text": "6"}
    ],
    "correctAnswer": ["a"],
    "selectType": "single",
    "explanation": {
        "a": "✓ Correct. 0-switch coverage tests each state at least once. There are 3 unique states.",
        "b": "✗ Incorrect. This counts something other than unique states.",
        "c": "✗ Incorrect. This counts transitions, not states.",
        "d": "✗ Incorrect. This overcounts the states."
    },
    "visualAid": {
        "type": "state-transition-table",
        "required": true,
        "description": "State transition table for ATM system with 3 states and 5 transitions"
    },
    "learningObjective": "FL-4.2.4",
    "kLevel": "K3",
    "points": 2
}
```

---

## Summary

### Always Require Visual Aid:
- State Transition Testing → table/diagram
- Decision Table Testing → table
- Cyclomatic Complexity → flow graph

### Often Use Visual Aid:
- Branch/Path Coverage → flowchart
- Equivalence Partitioning → partition table
- Boundary Value Analysis → range table

### Sometimes Use Visual Aid:
- Statement Coverage → code snippet
- Complex scenarios → diagrams

---

**Done with guides?** Return to [00_README_AI_START_HERE.md](00_README_AI_START_HERE.md) or review [03_Quality_Guidelines.md](03_Quality_Guidelines.md) before generating.

---

**Version:** 3.0
**Last Updated:** 2025-11-07
