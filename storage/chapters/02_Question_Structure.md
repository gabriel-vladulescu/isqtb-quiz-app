# 02 - Question Structure

## JSON Format for ISTQB Questions

All questions must follow this exact JSON structure.

---

## Complete Example

```json
{
    "id": "1",
    "questionText": "What is the main purpose of software testing?",
    "options": [
        {"key": "a", "text": "To find defects and verify quality"},
        {"key": "b", "text": "To develop new software features"},
        {"key": "c", "text": "To increase development team size"},
        {"key": "d", "text": "To replace manual work with automation"}
    ],
    "correctAnswer": ["a"],
    "selectType": "single",
    "explanation": {
        "a": "✓ Correct. Testing aims to identify defects and ensure software quality.",
        "b": "✗ Incorrect. Developing features is the role of development, not testing.",
        "c": "✗ Incorrect. Team size does not relate to testing purpose.",
        "d": "✗ Incorrect. While automation is useful, it's not the main purpose of testing."
    },
    "learningObjective": "FL-1.1.1",
    "kLevel": "K1",
    "points": 1
}
```

---

## Required Fields (All Questions Must Have)

### 1. `id` (String)
**Purpose:** Unique identifier for the question

**Format:** Sequential number as string

**Rules:**
- Must be unique within the question set
- Use sequential numbering: "1", "2", "3", etc.

**Example:**
```json
"id": "1"
```

---

### 2. `questionText` (String)
**Purpose:** The actual question being asked

**Rules:**
- Clear and unambiguous
- Complete sentence with question mark
- One concept per question
- Grammatically correct
- Avoid negative phrasing unless necessary (if used, CAPITALIZE "NOT" or "EXCEPT")

**Good examples:**
```json
"questionText": "What is a defect?"
"questionText": "Why is early testing important?"
"questionText": "Which technique would be MOST effective in this scenario?"
```

**Bad examples:**
```json
"questionText": "Defect?"  // Incomplete
"questionText": "What is a defect and why is testing important?"  // Two questions
"questionText": "Which is not a test type?"  // Should be "NOT" capitalized
```

---

### 3. `options` (Array)
**Purpose:** The answer choices

**Format:** Array of objects with `key` and `text`

**Rules:**
- **Exactly 4 options** (a, b, c, d)
- Keys must be lowercase letters: "a", "b", "c", "d"
- All options must be grammatically parallel
- Similar length (avoid making correct answer obviously longer)
- All plausible (no joke answers)

**Example:**
```json
"options": [
    {"key": "a", "text": "Statement coverage"},
    {"key": "b", "text": "Branch coverage"},
    {"key": "c", "text": "Path coverage"},
    {"key": "d", "text": "Condition coverage"}
]
```

**Bad example:**
```json
"options": [
    {"key": "a", "text": "Coverage"},  // Too short
    {"key": "b", "text": "A comprehensive testing approach that includes statement coverage, branch coverage, and path coverage analysis"}  // Too long
    {"key": "c", "text": "Purple elephant"}  // Not plausible
]
```

---

### 4. `correctAnswer` (Array)
**Purpose:** Which option(s) are correct

**Format:** Array of key strings

**Rules:**
- **Always an array**, even for single answer
- Single answer: `["a"]`
- Multiple answers: `["a", "c"]`
- Must match one or more keys from options

**Examples:**
```json
"correctAnswer": ["a"]           // Single correct answer
"correctAnswer": ["b", "d"]      // Multiple correct answers
```

**Bad examples:**
```json
"correctAnswer": "a"             // ❌ Not an array
"correctAnswer": ["e"]           // ❌ No such key in options
```

---

### 5. `selectType` (String)
**Purpose:** Whether question has single or multiple correct answers

**Values:** `"single"` or `"multiple"`

**Rules:**
- Use `"single"` for one correct answer (most questions)
- Use `"multiple"` for 2+ correct answers (rare)
- If `"multiple"`, indicate in questionText: "Select ALL that apply"

**Examples:**
```json
"selectType": "single"     // Most common

"selectType": "multiple"   // For questions like "Which TWO are test principles?"
```

---

### 6. `explanation` (Object)
**Purpose:** Explain why each option is correct or incorrect

**Format:** Object with keys matching option keys

**Rules:**
- **Must explain ALL options** (a, b, c, d)
- Start correct answer with "✓ Correct."
- Start incorrect answers with "✗ Incorrect."
- Explain WHY, don't just say "wrong"
- Use these explanations to teach

**Example:**
```json
"explanation": {
    "a": "✓ Correct. Statement coverage measures executed statements.",
    "b": "✗ Incorrect. Branch coverage measures decision points, not statements.",
    "c": "✗ Incorrect. Path coverage measures unique paths through code.",
    "d": "✗ Incorrect. Condition coverage measures individual conditions in decisions."
}
```

**Bad example:**
```json
"explanation": {
    "a": "Correct",           // Not enough detail
    "b": "Wrong",             // Doesn't explain why
    "c": "Nope"               // Too casual and unhelpful
    // Missing "d"            // ❌ Must explain ALL options
}
```

---

### 7. `learningObjective` (String)
**Purpose:** Reference to ISTQB syllabus section

**Format:** `FL-X.Y.Z`
- FL = Foundation Level
- X = Chapter number (1-6)
- Y = Section number
- Z = Subsection number

**Examples:**
```json
"learningObjective": "FL-1.1.1"    // Chapter 1, Section 1, Subsection 1
"learningObjective": "FL-4.3.2"    // Chapter 4, Section 3, Subsection 2
"learningObjective": "FL-2.1.1"    // Chapter 2, Section 1, Subsection 1
```

**How to find it:**
- Check the chapter content file
- Each section has a learning objective reference
- Match question topic to the LO in the syllabus

---

### 8. `kLevel` (String)
**Purpose:** Cognitive level of the question

**Values:** `"K1"`, `"K2"`, or `"K3"`

**Rules:**
- Must match the learning objective's K-level
- See 01_K_Levels_Guide.md for details
- K1 = Remember, K2 = Understand, K3 = Apply

**Examples:**
```json
"kLevel": "K1"    // Recall/definition question
"kLevel": "K2"    // Comprehension/explanation question
"kLevel": "K3"    // Application/scenario question
```

---

### 9. `points` (Number)
**Purpose:** How many points the question is worth

**Values:** Usually 1, sometimes 2-3 for complex K3

**Guidelines:**
- K1: 1 point
- K2: 1 point (rarely 2)
- K3: 1-2 points (complex scenarios: 2-3)

**Examples:**
```json
"points": 1     // Standard question
"points": 2     // Complex K3 scenario
```

---

## Optional Fields (Use When Needed)

### `calculation` (Object)
**Use when:** Question involves formulas or math

**See:** 04_Calculations_Guide.md for details

**Example:**
```json
"calculation": {
    "formula": "Statement Coverage = (Executed / Total) × 100",
    "workShown": "(15 / 20) × 100 = 75%",
    "result": "75%"
}
```

---

### `visualAid` (Object)
**Use when:** Question requires tables, diagrams, flowcharts

**See:** 05_Visual_Aids_Guide.md for details

**Example:**
```json
"visualAid": {
    "type": "state-transition-table",
    "required": true,
    "description": "State transition table showing system states and events"
}
```

---

## Complete Template

Copy and use this template:

```json
{
    "id": "",
    "questionText": "",
    "options": [
        {"key": "a", "text": ""},
        {"key": "b", "text": ""},
        {"key": "c", "text": ""},
        {"key": "d", "text": ""}
    ],
    "correctAnswer": [""],
    "selectType": "single",
    "explanation": {
        "a": "",
        "b": "",
        "c": "",
        "d": ""
    },
    "learningObjective": "FL-",
    "kLevel": "",
    "points": 1
}
```

---

## Field Summary Table

| Field | Type | Required | Values/Format |
|-------|------|----------|---------------|
| `id` | String | ✓ | "1", "2", "3"... |
| `questionText` | String | ✓ | Clear question with ? |
| `options` | Array | ✓ | 4 objects with key & text |
| `correctAnswer` | Array | ✓ | ["a"] or ["a", "c"] |
| `selectType` | String | ✓ | "single" or "multiple" |
| `explanation` | Object | ✓ | Keys: a, b, c, d |
| `learningObjective` | String | ✓ | "FL-X.Y.Z" |
| `kLevel` | String | ✓ | "K1", "K2", "K3" |
| `points` | Number | ✓ | 1, 2, or 3 |
| `calculation` | Object | Optional | See 04_Calculations_Guide.md |
| `visualAid` | Object | Optional | See 05_Visual_Aids_Guide.md |

---

## Multiple Questions Format

When generating multiple questions, use an array:

```json
[
    {
        "id": "1",
        "questionText": "...",
        ...
    },
    {
        "id": "2",
        "questionText": "...",
        ...
    }
]
```

---

## Validation Checklist

Before outputting, verify:
- [ ] All 9 required fields present
- [ ] Exactly 4 options with keys a, b, c, d
- [ ] `correctAnswer` is an array
- [ ] All 4 options explained in `explanation`
- [ ] Learning objective format is FL-X.Y.Z
- [ ] K-level matches learning objective
- [ ] No spelling or grammar errors

---

**Next Step:** Read [03_Quality_Guidelines.md](03_Quality_Guidelines.md) for quality best practices.

---

**Version:** 3.0
**Last Updated:** 2025-11-07
