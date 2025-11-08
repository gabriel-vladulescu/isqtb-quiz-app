# 03 - Quality Guidelines

## Creating High-Quality ISTQB Questions

This guide ensures your questions are clear, fair, and effective for testing knowledge.

---

## Writing Effective Questions

### ✅ DO:

**1. Use clear, direct language**
```
GOOD: "What is a defect?"
BAD: "In the context of software quality assurance methodologies, which terminology describes..."
```

**2. Focus on ONE concept per question**
```
GOOD: "What is statement coverage?"
BAD: "What is statement coverage and why is it different from branch coverage?"
```

**3. Make questions complete and specific**
```
GOOD: "Which testing technique uses equivalence classes?"
BAD: "Which technique?" (Too vague)
```

**4. Keep all options grammatically parallel**
```
GOOD:
a) Tests individual statements
b) Tests decision points
c) Tests all paths
d) Tests conditions

BAD:
a) Testing statements
b) It tests decisions
c) All paths
d) For conditions
```

**5. Use realistic scenarios for K3**
```
GOOD: "A banking app crashes when transfers exceed $50,000. Which technique would identify this?"
BAD: "Use boundary value analysis." (Not a question)
```

**6. Capitalize negative words**
```
GOOD: "Which is NOT a test principle?"
BAD: "Which is not a test principle?"
```

---

### ❌ DON'T:

**1. Use "all of the above" or "none of the above"**
```
BAD:
a) Alpha testing
b) Beta testing
c) Acceptance testing
d) All of the above  ← Never use this
```

**2. Make correct answer obviously longer**
```
BAD:
a) Brief answer
b) This is the correct answer with lots of detail and explanation that makes it obvious
c) Short
d) Brief
```

**3. Use trick questions or deliberately misleading language**
```
BAD: "What is not never not a test level?" (Confusing double negatives)
GOOD: "Which is NOT a test level?"
```

**4. Create implausible distractors**
```
BAD:
a) Black-box testing
b) White-box testing
c) Purple elephant testing  ← Not plausible
d) Gray-box testing
```

**5. Use absolute terms unless accurate**
```
BAD: "Testing always finds all defects" (False - never say "always" unless true)
GOOD: "Testing typically aims to find defects"
```

**6. Make questions interdependent**
```
BAD:
Q1: "What is statement coverage?"
Q2: "Based on your answer to Question 1, calculate..." ← Don't reference other questions
```

**7. Create opinion-based questions**
```
BAD: "Which testing tool is the best?"
GOOD: "According to ISTQB, which testing tool category supports test execution?"
```

---

## Creating Effective Distractors

**Distractors** = Wrong answers that should be plausible but clearly incorrect to knowledgeable candidates.

### Characteristics of Good Distractors:

**1. Plausible**
- Appear correct to someone who doesn't fully understand
- Use real terminology from the domain

**2. Related**
- Connected to the topic but wrong
- Not completely random

**3. Based on common misconceptions**
- Use typical errors students make
- Reflect partial understanding

**4. Homogeneous**
- Similar length to correct answer
- Same level of detail
- Same grammatical structure

---

### Distractor Strategies

**Strategy 1: Use common misconceptions**
```
Q: "What is a defect?"
Correct: A flaw in code or design
Distractor: A human mistake (common confusion with "error")
```

**Strategy 2: Partial truths**
```
Q: "Why is early testing important?"
Correct: Reduces cost of finding and fixing defects
Distractor: Reduces testing time (partially true, but not the main reason)
```

**Strategy 3: Related but different concepts**
```
Q: "What is statement coverage?"
Correct: Percentage of statements executed
Distractor: Percentage of branches executed (this is branch coverage)
```

**Strategy 4: Wrong context application**
```
Q: "Which technique is black-box?"
Correct: Equivalence partitioning
Distractor: Statement coverage (this is white-box, not black-box)
```

---

### Distractor Examples

**Good distractors:**
```json
{
    "questionText": "What is regression testing?",
    "options": [
        {"key": "a", "text": "Testing to confirm fixes work and haven't broken existing functionality"},
        {"key": "b", "text": "Testing to find defects in new features"},
        {"key": "c", "text": "Testing to verify system meets requirements"},
        {"key": "d", "text": "Testing to assess system performance"}
    ],
    "correctAnswer": ["a"]
}
```

**Analysis:**
- a = Correct definition
- b = Plausible but describes new feature testing
- c = Plausible but describes acceptance testing
- d = Plausible but describes performance testing

All options are real testing activities, making them believable distractors.

---

## Point Allocation

| K-Level | Typical Points | When to Use More |
|---------|---------------|------------------|
| **K1** | 1 point | Always 1 |
| **K2** | 1 point | 2 for very complex concepts |
| **K3** | 1-2 points | 2-3 for multi-step scenarios with calculations |

**Examples:**
- Simple K1 definition: 1 point
- K2 comparison question: 1 point
- K3 with scenario: 1-2 points
- K3 with scenario + calculation + table: 2-3 points

---

## Explanation Best Practices

### Structure of Good Explanations

**For correct answer:**
```
"✓ Correct. [Explain why this is correct and reference concepts if helpful]"
```

**For incorrect answers:**
```
"✗ Incorrect. [Explain why this is wrong and what it actually describes]"
```

### Examples

**Good explanations:**
```json
"explanation": {
    "a": "✓ Correct. Statement coverage measures the percentage of executable statements tested. It's calculated as (executed statements / total statements) × 100.",
    "b": "✗ Incorrect. This describes branch coverage, which measures decision points rather than individual statements.",
    "c": "✗ Incorrect. Path coverage measures unique paths through the code, which is more comprehensive than statement coverage.",
    "d": "✗ Incorrect. This describes condition coverage, which tests individual Boolean expressions within decisions."
}
```

**Bad explanations:**
```json
"explanation": {
    "a": "Correct",                    // Too brief, doesn't teach
    "b": "Wrong",                      // Doesn't explain why
    "c": "Nope, try again",            // Not helpful
    "d": "Incorrect"                   // Missing explanation
}
```

---

## Quality Checklist

### Before Finalizing Each Question

**Content:**
- [ ] Question is clear and unambiguous
- [ ] Tests one concept only
- [ ] Matches the K-level for the learning objective
- [ ] Includes realistic scenario (if K3)

**Structure:**
- [ ] Exactly 4 answer options (a, b, c, d)
- [ ] All options are grammatically parallel
- [ ] Options are similar length
- [ ] Only ONE correct answer (unless selectType: "multiple")

**Answers:**
- [ ] Correct answer is defensibly correct
- [ ] All distractors are plausible
- [ ] Distractors are based on common misconceptions
- [ ] No "all/none of the above" options

**Explanations:**
- [ ] Explanation provided for ALL options (a, b, c, d)
- [ ] Correct answer starts with "✓ Correct."
- [ ] Incorrect answers start with "✗ Incorrect."
- [ ] Explanations teach, not just correct

**Technical:**
- [ ] Correct `learningObjective` reference (FL-X.Y.Z)
- [ ] `kLevel` matches question complexity
- [ ] Points allocated appropriately
- [ ] No grammatical or spelling errors
- [ ] If calculation: formula and steps shown (see 04_Calculations_Guide.md)
- [ ] If visual aid: marked as required (see 05_Visual_Aids_Guide.md)

---

## Common Mistakes and Fixes

### Mistake 1: K-level doesn't match question

**BAD (labeled K1 but requires understanding):**
```json
{
    "questionText": "Why is independent testing beneficial?",
    "kLevel": "K1"  // ❌ This is K2, not K1
}
```

**GOOD:**
```json
{
    "questionText": "Why is independent testing beneficial?",
    "kLevel": "K2"  // ✓ Correct
}
```

---

### Mistake 2: Multiple concepts in one question

**BAD:**
```json
{
    "questionText": "What is white-box testing and when should it be used?"
    // ❌ Two questions: definition + timing
}
```

**GOOD:**
```json
{
    "questionText": "What is white-box testing?"
    // ✓ One concept
}
```

---

### Mistake 3: Implausible distractors

**BAD:**
```json
"options": [
    {"key": "a", "text": "Black-box testing"},
    {"key": "b", "text": "White-box testing"},
    {"key": "c", "text": "Testing with purple elephants"},  // ❌
    {"key": "d", "text": "Gray-box testing"}
]
```

**GOOD:**
```json
"options": [
    {"key": "a", "text": "Black-box testing"},
    {"key": "b", "text": "White-box testing"},
    {"key": "c", "text": "Experience-based testing"},  // ✓ Plausible
    {"key": "d", "text": "Gray-box testing"}
]
```

---

### Mistake 4: Obvious correct answer

**BAD:**
```json
"options": [
    {"key": "a", "text": "Testing"},
    {"key": "b", "text": "Testing is a comprehensive systematic process involving planning, design, execution, and evaluation of software quality through various techniques including functional and non-functional testing"},  // ❌ Obviously more detailed
    {"key": "c", "text": "Test"},
    {"key": "d", "text": "Tests"}
]
```

**GOOD:**
```json
"options": [
    {"key": "a", "text": "A systematic process to evaluate software quality"},
    {"key": "b", "text": "An activity to execute code and verify results"},
    {"key": "c", "text": "A technique to design test cases"},
    {"key": "d", "text": "A method to document requirements"}
]
```

---

### Mistake 5: Missing explanations

**BAD:**
```json
"explanation": {
    "a": "✓ Correct.",
    "b": "✗ Incorrect."
    // ❌ Missing c and d, and not explaining WHY
}
```

**GOOD:**
```json
"explanation": {
    "a": "✓ Correct. Statement coverage measures executed statements as a percentage of total statements.",
    "b": "✗ Incorrect. This describes branch coverage, not statement coverage.",
    "c": "✗ Incorrect. This describes path coverage, which is more comprehensive.",
    "d": "✗ Incorrect. This describes condition coverage, which tests Boolean expressions."
}
```

---

## Testing Your Questions

### Self-Review Questions:

1. **Would a knowledgeable candidate choose the correct answer?**
2. **Would someone with partial knowledge be tempted by distractors?**
3. **Are all options plausible without being trick questions?**
4. **Does the explanation teach the concept?**
5. **Is the K-level appropriate for the question type?**

If you answer "no" to any, revise the question.

---

## Final Quality Standards

### A perfect question:
✅ Tests exactly what it should (aligned with LO)
✅ Is clear and unambiguous
✅ Has one defensibly correct answer
✅ Has three plausible distractors
✅ Teaches through explanations
✅ Matches K-level appropriately
✅ Is fair and free of tricks

---

**Next Step:** If your question involves calculations, read [04_Calculations_Guide.md](04_Calculations_Guide.md)

**Otherwise:** You're ready to generate questions!

---

**Version:** 3.0
**Last Updated:** 2025-11-07
