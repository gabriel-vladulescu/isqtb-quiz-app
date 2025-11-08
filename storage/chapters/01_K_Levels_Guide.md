# 01 - K-Levels Guide

## What Are K-Levels?

K-Levels are **cognitive levels** based on Bloom's Taxonomy that define how deeply a candidate must understand a topic. ISTQB Foundation Level uses **K1, K2, and K3**.

---

## The Three K-Levels

### K1 - Remember (Recall)

**What it means:**
- Candidate can **recognize** or **recall** facts, terms, and concepts
- Simple memory and recognition
- No interpretation or application needed

**Question characteristics:**
- Tests factual knowledge
- One correct answer is obvious if you know the definition
- Direct and straightforward

**Typical question words:**
- What is...?
- Which term...?
- Define...
- Identify...
- List...
- State...

**Example:**
```
"What is a defect?"
a) A flaw in a component or system
b) A human mistake
c) An event where system fails
d) A testing technique

Answer: a (simple recall of definition)
```

**When to use:**
- All keywords listed in chapters
- Definitions and terminology
- Facts and lists
- Basic concepts

**Points:** 1 point

---

### K2 - Understand (Comprehend)

**What it means:**
- Candidate must **explain**, **summarize**, or **interpret** concepts
- Understanding relationships between concepts
- Can explain in their own words

**Question characteristics:**
- Tests comprehension, not just memory
- Requires understanding "why" or "how"
- May compare or differentiate concepts

**Typical question words:**
- Why...?
- Explain...
- What is the purpose of...?
- How does X differ from Y...?
- Summarize...
- Describe...
- Compare...
- Classify...

**Example:**
```
"Why is early testing important in the software development lifecycle?"
a) It reduces the cost of finding and fixing defects
b) It eliminates the need for later testing
c) It guarantees defect-free software
d) It allows skipping code reviews

Answer: a (requires understanding the concept and its benefits)
```

**When to use:**
- Explaining purposes and benefits
- Comparing/contrasting concepts
- Understanding relationships
- Interpreting meanings

**Points:** 1 point (occasionally 2 for complex concepts)

---

### K3 - Apply (Use)

**What it means:**
- Candidate must **apply** knowledge to solve problems or scenarios
- Use techniques in practical situations
- Analyze realistic cases

**Question characteristics:**
- Scenario-based or situational
- Requires practical application
- Often includes context or "given situation"
- May require multi-step thinking

**Typical question words:**
- Given scenario X, which...?
- How would you apply...?
- Which technique should be used...?
- In this situation...?
- Apply...
- Solve...
- Demonstrate...
- Implement...

**Example:**
```
"A mobile app crashes when users enter values over $50,000. The code has a
variable limit set incorrectly. Which testing technique would have been
MOST effective at preventing this issue?"
a) Usability testing
b) Boundary value analysis
c) Performance testing
d) Regression testing

Answer: b (requires applying knowledge of BVA to a practical scenario)
```

**When to use:**
- Testing techniques application
- Problem-solving scenarios
- Practical situations
- "Which technique to use" questions

**Points:** 1-2 points (2-3 for very complex scenarios)

---

## Quick Comparison Table

| Aspect | K1 (Remember) | K2 (Understand) | K3 (Apply) |
|--------|---------------|-----------------|------------|
| **Cognitive Level** | Recall | Comprehend | Apply |
| **Difficulty** | Easy | Medium | Medium-Hard |
| **Question Type** | Definition, fact | Explanation, comparison | Scenario, problem |
| **Typical Verb** | What is, Define | Why, Explain | Given X, which |
| **Example** | "What is a test case?" | "Why use risk-based testing?" | "Given this code, which technique?" |
| **% of Exam** | ~40% | ~40% | ~20% |
| **Points** | 1 | 1 (sometimes 2) | 1-2 (sometimes 3) |

---

## How to Identify K-Level from Chapter Content

### In Chapter Files You'll See:

**Format:** `[Topic Name] (K1)` or `[Topic Name] (K2)` etc.

**Example from chapter:**
```
1.1 What is Testing? (K2)
Keywords: defect, error, failure, quality (all K1)

1.2 Why is Testing Necessary? (K2)
1.3 Testing Principles (K1)
```

**Rule:**
- Topic marked (K2) → Create K2 questions about that topic
- Keywords → Always create at least one K1 question per keyword
- If topic marked (K3) → Create scenario-based K3 questions

---

## K-Level Selection Flowchart

```
What am I creating a question about?

├─ Is it a keyword or definition?
│  └─ YES → K1 (Remember)
│
├─ Does it ask WHY something is done or HOW things differ?
│  └─ YES → K2 (Understand)
│
├─ Does it involve applying a technique to a scenario?
│  └─ YES → K3 (Apply)
│
└─ Check chapter: What K-level is listed for this topic?
   └─ Use that K-level
```

---

## Distribution Guidelines

### For a Set of Questions:

**Recommended distribution:**
- **40% K1** - Foundation knowledge, terms, facts
- **40% K2** - Understanding concepts, relationships
- **20% K3** - Practical application, scenarios

**Example for 10 questions:**
- 4 questions at K1
- 4 questions at K2
- 2 questions at K3

**Example for 20 questions:**
- 8 questions at K1
- 8 questions at K2
- 4 questions at K3

---

## Common Mistakes to Avoid

### ❌ Making K1 Too Hard
```
BAD K1: "When should you use equivalence partitioning versus boundary value analysis?"
(This requires understanding/comparison - should be K2)

GOOD K1: "What is equivalence partitioning?"
(Simple recall of definition)
```

### ❌ Making K3 Too Simple
```
BAD K3: "What is statement coverage?"
(This is just recall - should be K1)

GOOD K3: "Given the code below with 8 statements, if your tests execute 6
statements, what is the statement coverage?"
(Requires applying the formula to a scenario)
```

### ❌ Mixing K-Levels
- Each question should clearly be ONE K-level
- Don't create questions that blur between levels
- K-level should match the learning objective for that topic

---

## Examples by K-Level

### K1 Example (Remember)
```json
{
    "questionText": "Which term describes a human action that produces an incorrect result?",
    "kLevel": "K1",
    "explanation": "Tests recall of terminology definition"
}
```

### K2 Example (Understand)
```json
{
    "questionText": "Why is independence of testing important?",
    "kLevel": "K2",
    "explanation": "Requires understanding the concept and its purpose"
}
```

### K3 Example (Apply)
```json
{
    "questionText": "A login system accepts passwords 8-20 characters long. Using boundary value analysis, which test values should be included?",
    "kLevel": "K3",
    "explanation": "Requires applying BVA technique to a practical scenario"
}
```

---

## Summary

✅ **K1 = Remember** - Can you recall it?
✅ **K2 = Understand** - Can you explain it?
✅ **K3 = Apply** - Can you use it?

**Next Step:** Read [02_Question_Structure.md](02_Question_Structure.md) to learn the JSON format.

---

**Version:** 3.0
**Last Updated:** 2025-11-07
