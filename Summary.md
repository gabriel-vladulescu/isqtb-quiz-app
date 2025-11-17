# ISTQB Foundation Level - Exam Summary

**Version:** 4.0.1
**Purpose:** Concise study guide covering essential concepts for the ISTQB Foundation Level exam

---

## Table of Contents

1. [Chapter 1: Fundamentals of Testing](#chapter-1-fundamentals-of-testing)
2. [Chapter 2: Testing Throughout the SDLC](#chapter-2-testing-throughout-the-sdlc)
3. [Chapter 3: Static Testing](#chapter-3-static-testing)
4. [Chapter 4: Test Analysis and Design](#chapter-4-test-analysis-and-design)
5. [Chapter 5: Managing Test Activities](#chapter-5-managing-test-activities)
6. [Chapter 6: Test Tools](#chapter-6-test-tools)
7. [Key Formulas Reference](#key-formulas-reference)

---

## Chapter 1: Fundamentals of Testing

### 1.1 What is Testing?

**Key Definition:**
- Testing = activities to discover defects and evaluate quality
- Includes BOTH verification (meets requirements) AND validation (meets user needs)
- Dynamic testing = execution; Static testing = no execution

**Test Objectives (9 main ones):**
1. Evaluating work products
2. Causing failures and finding defects
3. Ensuring required coverage
4. Reducing risk of inadequate quality
5. Verifying specified requirements fulfilled
6. Verifying contractual/legal/regulatory compliance
7. Providing information to stakeholders
8. Building confidence in quality
9. Validating completeness and expected functionality

**Testing vs Debugging:**
- **Testing** = finds defects, causes failures
- **Debugging** = finds causes, fixes defects (reproduction → diagnosis → fixing)

### 1.2 Why Testing is Necessary

**Error → Defect → Failure Chain:**
- **Error (mistake)** = human action producing defect
- **Defect (fault, bug)** = flaw in work product
- **Failure** = system doesn't do what it should (not all defects cause failures)
- **Root cause** = fundamental reason for the problem

**Testing vs QA:**
- **Testing** = product-oriented, corrective (quality control)
- **QA** = process-oriented, preventive (improve processes)

### 1.3 Seven Testing Principles

1. **Testing shows presence, not absence of defects** - Can't prove no defects exist
2. **Exhaustive testing is impossible** - Use techniques, prioritization, risk-based testing
3. **Early testing saves time and money** - Find defects early (shift left)
4. **Defects cluster together** - Pareto principle: small number of components contain most defects
5. **Tests wear out** - Repeated tests become ineffective; need to modify/add new tests
6. **Testing is context dependent** - No universal approach
7. **Absence-of-defects fallacy** - Verified software may still not meet user needs

### 1.4 Test Activities and Testware

**Seven Main Test Activities:**
1. **Test Planning** - Define objectives, select approach
2. **Test Monitoring & Control** - Check progress, take corrective actions
3. **Test Analysis** - Identify what to test (testable features, test conditions)
4. **Test Design** - Elaborate test conditions into test cases (how to test)
5. **Test Implementation** - Create/acquire testware, build environment
6. **Test Execution** - Run tests, compare actual vs expected results
7. **Test Completion** - Collect data, archive testware, lessons learned

**Traceability:**
- Links test basis ↔ testware ↔ test results ↔ defects
- Supports coverage evaluation, impact analysis, audits

**Two Main Roles:**
- **Test Management** = planning, monitoring, control, completion
- **Testing** = analysis, design, implementation, execution

### 1.5 Essential Skills

**Generic Skills for Testers:**
- Testing knowledge, thoroughness, curiosity, attention to detail
- Good communication, active listening, team player
- Analytical thinking, critical thinking, creativity
- Technical knowledge, domain knowledge

**Whole Team Approach:**
- Anyone can perform any task (with necessary skills)
- Everyone responsible for quality
- Enhances communication and collaboration

**Independence of Testing:**
- **Levels:** Author → same team → outside team → outside organization
- **Benefits:** Different perspectives, recognize different defects, challenge assumptions
- **Drawbacks:** Isolation, lack of collaboration, bottleneck, blame

---

## Chapter 2: Testing Throughout the SDLC

### 2.1 SDLC and Testing

**SDLC Impact on Testing:**
- Scope and timing of activities
- Level of detail in documentation
- Choice of techniques and approach
- Extent of automation
- Tester roles and responsibilities

**Good Testing Practices (all SDLCs):**
- Every development activity has corresponding test activity
- Different test levels have specific objectives
- Test analysis/design begins during corresponding development phase
- Testers review work products as early as possible

**Test-First Approaches:**
- **TDD (Test-Driven Development)** - Write tests first, then code to satisfy tests
- **ATDD (Acceptance TDD)** - Derive tests from acceptance criteria before development
- **BDD (Behavior-Driven Development)** - Test cases in natural language (Given/When/Then)

**DevOps Benefits:**
- Fast feedback on code quality
- CI promotes shift left
- Stable test environments (automated)
- Increased visibility on non-functional characteristics
- Reduced manual testing
- Minimized regression risk

**DevOps Challenges:**
- Define and establish delivery pipeline
- Introduce and maintain CI/CD tools
- Establish and maintain test automation

**Shift Left Practices:**
- Review specifications from tester perspective
- Write test cases before code
- Use CI/CD with automated component tests
- Static analysis before dynamic testing
- Non-functional testing at component level

**Retrospectives:**
- Held at milestones (iteration end, release, project end)
- Discuss: What was successful? What to improve? How to incorporate improvements?
- Benefits: increased effectiveness, quality testware, team bonding, better cooperation

### 2.2 Test Levels and Test Types

**Five Test Levels:**

1. **Component (Unit) Testing**
   - Focus: Individual components in isolation
   - Who: Developers
   - Tools: Test harnesses, unit test frameworks

2. **Component Integration Testing**
   - Focus: Interfaces/interactions between components
   - Depends on: Integration strategy (bottom-up, top-down, big-bang)

3. **System Testing**
   - Focus: Overall behavior, end-to-end tasks, non-functional testing
   - Who: Independent test team
   - Basis: System specifications

4. **System Integration Testing**
   - Focus: Interfaces to other systems and external services
   - Needs: Representative test environment

5. **Acceptance Testing**
   - Focus: Validation, readiness for deployment
   - Who: Intended users
   - Types: UAT, operational, contractual, regulatory, alpha, beta

**Four Test Types:**

1. **Functional Testing**
   - Tests: What the system should do
   - Objectives: Completeness, correctness, appropriateness

2. **Non-functional Testing**
   - Tests: How well the system behaves
   - ISO 25010 characteristics: Performance, compatibility, usability, reliability, security, maintainability, portability, safety

3. **Black-box Testing**
   - Based on: Specifications (not internal structure)
   - Tests: System behavior against specifications

4. **White-box Testing**
   - Based on: Internal structure (code, architecture)
   - Tests: Coverage of underlying structure

**Confirmation vs Regression:**
- **Confirmation Testing** = verify original defect fixed
- **Regression Testing** = verify no adverse consequences from change
- Regression = strong candidate for automation

### 2.3 Maintenance Testing

**Triggers:**
- Modifications (enhancements, fixes, hot fixes)
- Upgrades/migrations (platform changes, data conversion)
- Retirement (archiving, data retention)

**Scope depends on:**
- Degree of risk
- Size of existing system
- Size of change

---

## Chapter 3: Static Testing

### 3.1 Static Testing Basics

**Key Points:**
- No execution needed
- Can be manual (reviews) or tool-based (static analysis)
- Applies to verification AND validation
- Finds defects directly (not through failures)

**Value:**
- Finds defects early (early testing principle)
- Detects defects dynamic testing can't find (unreachable code, design patterns)
- Verifies requirements actually describe stakeholder needs
- Creates shared understanding
- Lower overall project costs

**Static vs Dynamic:**
- Static finds defects directly; dynamic causes failures first
- Static can find defects on rarely executed paths
- Static applies to non-executable work products
- Static measures maintainability; dynamic measures performance

**Defects Found Easily by Static Testing:**
- Requirements defects (inconsistencies, ambiguities, contradictions, omissions)
- Design defects (inefficient structures, poor modularization)
- Coding defects (undefined variables, unreachable code, complexity)
- Standards deviations
- Interface specification errors
- Security vulnerabilities
- Test basis gaps

### 3.2 Review Process

**Five Review Activities:**
1. **Planning** - Define scope, objectives, criteria
2. **Review Initiation** - Ensure everyone prepared
3. **Individual Review** - Each reviewer assesses independently
4. **Communication & Analysis** - Discuss anomalies, decide on actions
5. **Fixing & Reporting** - Create defect reports, report results

**Six Principal Roles:**
- **Manager** - Decides what to review, provides resources
- **Author** - Creates and fixes work product
- **Moderator (Facilitator)** - Ensures effective meetings, mediation, time management
- **Scribe (Recorder)** - Collates anomalies, records decisions
- **Reviewer** - Performs reviews
- **Review Leader** - Overall responsibility, organizes review

**Four Review Types:**

| Type | Formality | Led By | Objective |
|------|-----------|--------|-----------|
| **Informal** | Lowest | N/A | Detecting anomalies |
| **Walkthrough** | Low-Medium | Author | Educate, consensus, detect anomalies |
| **Technical Review** | Medium | Moderator | Consensus, decisions, detect anomalies |
| **Inspection** | Highest | Review Leader | Maximum anomalies, quality metrics |

**Note:** In inspection, author CANNOT be review leader or scribe.

**Success Factors:**
- Clear objectives and exit criteria
- Appropriate review type
- Small chunks
- Feedback to authors/stakeholders
- Adequate preparation time
- Management support
- Part of organization culture
- Training for participants
- Meeting facilitation

---

## Chapter 4: Test Analysis and Design

### 4.1 Test Techniques Overview

**Three Categories:**
- **Black-box** = based on specifications (independent of implementation)
- **White-box** = based on internal structure (dependent on implementation)
- **Experience-based** = based on tester knowledge and experience

### 4.2 Black-Box Techniques

#### 4.2.1 Equivalence Partitioning (EP)

**Concept:** Divide data into partitions processed the same way

**Coverage:**
```
EP Coverage (%) = (Partitions Exercised / Total Partitions) × 100
```

**Each Choice Coverage:** Exercise each partition from each set at least once

**Example:**
- Age field: < 0 (invalid), 0-17 (child), 18-64 (adult), 65+ (senior), > 120 (invalid)
- 5 partitions = minimum 5 test cases needed

#### 4.2.2 Boundary Value Analysis (BVA)

**Concept:** Test at boundaries (where defects cluster)

**2-value BVA:** Boundary + neighbor from adjacent partition
**3-value BVA:** Boundary + both neighbors (more rigorous)

**Example (Range 10-100):**
- 2-value BVA: 9, 10, 100, 101
- 3-value BVA: 9, 10, 11, 99, 100, 101

#### 4.2.3 Decision Table Testing

**Notation:**
- Conditions: **T** (true), **F** (false), **–** (irrelevant), **N/A** (infeasible)
- Actions: **X** (occurs), **Blank** (doesn't occur)

**Coverage:**
```
Decision Table Coverage (%) = (Exercised Columns / Total Feasible Columns) × 100
```

**Example:**
| | Rule 1 | Rule 2 | Rule 3 |
|---|---|---|---|
| Customer has card? | T | T | F |
| Purchase > $100? | T | F | – |
| Give 10% discount | X | | |
| Give 5% discount | | X | |
| No discount | | | X |

3 feasible rules = need 3 test cases for 100% coverage

#### 4.2.4 State Transition Testing

**Three Coverage Types:**

1. **All States Coverage** = (Exercised States / Total States) × 100
2. **Valid Transitions Coverage** = (Exercised Valid Transitions / Total Valid) × 100
3. **All Transitions Coverage** = includes invalid transitions

**Strength:** All Transitions > Valid Transitions > All States

### 4.3 White-Box Techniques

#### Statement Coverage
```
Statement Coverage (%) = (Executed Statements / Total Statements) × 100
```

**Limitation:** 100% statement coverage doesn't guarantee all branches tested

#### Branch Coverage
```
Branch Coverage (%) = (Executed Branches / Total Branches) × 100
```

**Key:** Branch coverage subsumes statement coverage (100% branch → 100% statement, but not vice versa)

**Value:**
- **Strength:** Considers entire implementation, finds omissions
- **Weakness:** May not detect missing requirements

### 4.4 Experience-Based Techniques

**Error Guessing:**
- Based on how application worked, developer errors, similar applications
- **Fault Attacks** = systematic list of errors/defects to test

**Exploratory Testing:**
- Tests designed, executed, evaluated simultaneously
- **Session-Based:** Time-boxed with test charter
- Useful: Few specifications, time pressure, complement formal techniques

**Checklist-Based Testing:**
- Test conditions from checklist
- Items should be checkable separately
- Must be regularly updated
- Provides consistency but less repeatability

### 4.5 Collaboration-Based Approaches

**User Stories - 3 C's:**
- **Card** = medium describing story
- **Conversation** = how software will be used
- **Confirmation** = acceptance criteria

**Format:** "As a [role], I want [goal], so that [business value]"

**INVEST Criteria:** Independent, Negotiable, Valuable, Estimable, Small, Testable

**Acceptance Criteria Formats:**
1. **Scenario-oriented:** Given/When/Then (BDD)
2. **Rule-oriented:** Bullet points, input-output tables

**ATDD Process:**
1. **Specification Workshop** - Analyze user story, write acceptance criteria
2. **Create Test Cases** - Based on acceptance criteria
3. **Implement** - Developers write code to pass tests
4. Tests become executable requirements

---

## Chapter 5: Managing Test Activities

### 5.1 Test Planning

**Test Plan Purpose:**
- Document means and schedule for objectives
- Ensure activities meet criteria
- Communication tool
- Shows adherence to policy/strategy

**Typical Content:**
- Context (scope, objectives, basis)
- Assumptions and constraints
- Stakeholders (roles, responsibilities)
- Communication (forms, frequency)
- Risk register
- Test approach (levels, types, techniques, deliverables, entry/exit criteria)
- Budget and schedule

**Entry vs Exit Criteria:**

**Entry Criteria** (preconditions):
- Availability of resources (people, tools, environments, data, budget, time)
- Availability of testware (basis, requirements, test cases)
- Initial quality level (smoke tests passed)

**Exit Criteria** (completion):
- Measures of thoroughness (coverage, unresolved defects, density)
- Binary criteria (planned tests executed, static testing done, defects reported)
- Can exit when time/budget runs out (with stakeholder acceptance)

**Agile Terms:**
- **Definition of Done** = exit criteria
- **Definition of Ready** = entry criteria for starting development/testing

### 5.1.4 Estimation Techniques

**1. Estimation Based on Ratios:**
```
Test Effort = Development Effort × (Test Ratio / Dev Ratio)
```
**Example:** Dev:Test = 3:2, Dev = 600 days → Test = 600 × (2/3) = 400 days

**2. Extrapolation:**
- Measure early, extrapolate for remaining work
- Good for iterative: average from last 3 iterations

**3. Wideband Delphi / Planning Poker:**
- Experts estimate independently
- Discuss deviations
- Re-estimate until consensus
- Planning Poker uses cards with numbers

**4. Three-Point Estimation:**
```
E = (a + 4m + b) / 6
SD = (b - a) / 6

Where:
a = most optimistic
m = most likely
b = most pessimistic
E = final estimate
SD = standard deviation
```

**Example:** a=6, m=9, b=18
- E = (6 + 4×9 + 18) / 6 = (6 + 36 + 18) / 6 = 60 / 6 = 10
- SD = (18 - 6) / 6 = 12 / 6 = 2
- **Result:** 10 ± 2 person-hours (range: 8-12 hours)

### 5.1.5 Test Case Prioritization

**Three Strategies:**
1. **Risk-based** - Execute highest risk tests first
2. **Coverage-based** - Execute highest coverage tests first
3. **Requirements-based** - Execute tests for most important requirements first

**Note:** Consider dependencies and resource availability

### 5.1.6 Test Pyramid

**Layers (bottom to top):**
- Bottom = Unit/Component tests (many, fast, isolated, small scope)
- Middle = Integration tests
- Top = End-to-end/UI tests (few, slow, integrated, large scope)

**Key:** Higher layer = lower granularity, lower isolation, higher execution time

### 5.1.7 Testing Quadrants

**Four Quadrants:**
- **Q1 (Technology facing, Support team)** - Component & integration tests (automated, CI)
- **Q2 (Business facing, Support team)** - Functional tests, user stories, API (manual/automated)
- **Q3 (Business facing, Critique product)** - Exploratory, usability, UAT (user-oriented, manual)
- **Q4 (Technology facing, Critique product)** - Smoke tests, non-functional (automated)

### 5.2 Risk Management

**Risk = Likelihood × Impact**

**Two Risk Types:**

**Project Risks** (affect schedule/budget/scope):
- Organizational issues (delays, inaccurate estimates, cost cutting)
- People issues (insufficient skills, conflicts, shortage)
- Technical issues (scope creep, poor tools)
- Supplier issues (third-party failures)

**Product Risks** (affect quality):
- Missing/wrong functionality
- Incorrect calculations, runtime errors
- Poor architecture, inefficient algorithms
- Poor response time, user experience
- Security vulnerabilities

**Product Risk Analysis:**
- **Risk Identification** = generate comprehensive list
- **Risk Assessment** = categorize, determine likelihood/impact/level, prioritize

**Uses:** Determine scope, test levels/types, techniques, effort, prioritization

**Product Risk Control (Mitigation):**
- Select experienced testers
- Apply appropriate independence
- Perform reviews and static analysis
- Apply appropriate techniques and coverage
- Apply appropriate test types
- Perform dynamic and regression testing

### 5.3 Test Monitoring, Control & Completion

**Seven Metric Categories:**
1. Project progress (task completion, resource usage)
2. Test progress (cases run/passed/failed, execution time)
3. Product quality (availability, response time, MTTF)
4. Defect metrics (found/fixed, density, detection %)
5. Risk metrics (residual risk level)
6. Coverage metrics (requirements, code)
7. Cost metrics (cost of testing, cost of quality)

**Test Reports:**

**Progress Report** (regular: daily/weekly):
- Testing period
- Progress vs schedule
- Impediments and workarounds
- Test metrics
- New/changed risks
- Next period plans

**Completion Report** (at milestones):
- Test summary
- Quality evaluation vs plan
- Deviations from plan
- Impediments and workarounds
- Metrics from progress reports
- Unmitigated risks, unfixed defects
- Lessons learned

### 5.4 Configuration Management

**Purpose:**
- Identify, control, track work products
- Version control and baselines
- Maintain traceability

**Ensures:**
- All items uniquely identified and version controlled
- Documentation/items unambiguously referenced
- Supports CI/CD/deployment in DevOps

### 5.5 Defect Management

**Defect Report Content:**
1. Unique identifier
2. Title/summary
3. Date, organization, author, role
4. Test object and environment ID
5. Context (test case, activity, SDLC phase, technique)
6. Description (steps, logs, screenshots)
7. Expected results
8. Actual results
9. Severity (impact on stakeholders)
10. Priority to fix
11. Status (open, deferred, duplicate, fixed, closed, rejected)
12. References (test case link)

---

## Chapter 6: Test Tools

### 6.1 Tool Types

**Eight Categories:**
1. **Test Management** - SDLC, requirements, tests, defects, configuration management
2. **Static Testing** - Reviews, static analysis
3. **Test Design/Implementation** - Generate cases, data, procedures
4. **Test Execution/Coverage** - Automated execution, coverage measurement
5. **Non-functional Testing** - Tests difficult/impossible manually
6. **DevOps** - Pipeline, workflow, CI/CD
7. **Collaboration** - Communication
8. **Scalability/Deployment** - VMs, containers

### 6.2 Test Automation

**Six Benefits:**
1. **Time saved** - Less repetitive manual work
2. **Consistency** - Greater repeatability, fewer human errors
3. **Objectivity** - Measures too complex for humans
4. **Information access** - Statistics, graphs, progress data
5. **Speed** - Faster execution, earlier defect detection, faster feedback
6. **Time for testers** - More time to design deeper tests

**Eight Risks:**
1. **Unrealistic expectations** - Functionality, ease of use
2. **Inaccurate estimates** - Time, cost, effort for introduction/maintenance
3. **Inappropriate use** - When manual testing better
4. **Over-reliance** - Ignoring human critical thinking
5. **Vendor dependency** - Vendor issues (out of business, poor support)
6. **Open-source abandonment** - No updates, frequent internal changes
7. **Incompatibility** - Not compatible with development platform
8. **Non-compliance** - Doesn't meet regulatory/safety standards

**Key Point:** Simply acquiring tool doesn't guarantee success - requires effort for introduction, maintenance, training

---

## Key Formulas Reference

### Coverage Metrics

**Statement Coverage:**
```
Statement Coverage (%) = (Executed Statements / Total Statements) × 100
```

**Branch Coverage:**
```
Branch Coverage (%) = (Executed Branches / Total Branches) × 100
```
*Note:* Branch coverage subsumes statement coverage

**Equivalence Partitioning:**
```
EP Coverage (%) = (Partitions Exercised / Total Partitions) × 100
```

**Decision Table:**
```
DT Coverage (%) = (Exercised Columns / Total Feasible Columns) × 100
```

**State Transition:**
- All States: (Exercised States / Total States) × 100
- Valid Transitions: (Exercised Valid / Total Valid) × 100
- All Transitions: (All Exercised / All Total) × 100

### Estimation

**Three-Point Estimation:**
```
E = (a + 4m + b) / 6
SD = (b - a) / 6
```

**Ratio-Based:**
```
Test Effort = Dev Effort × (Test Ratio / Dev Ratio)
```

### Test Management Metrics

**Defect Density:**
```
Defect Density = Defects / Size (KLOC)
```

**Defect Removal Efficiency:**
```
DRE (%) = (Defects Before Release / Total Defects) × 100
```

**Test Progress:**
```
Progress (%) = (Executed / Total) × 100
```

**Pass Rate:**
```
Pass Rate (%) = (Passed / Executed) × 100
```

**Risk Level:**
```
Risk Level = Likelihood × Impact
```

---

## Quick Reference: Key Distinctions

| Concept A | vs | Concept B |
|-----------|----|-----------|
| **Testing** | | **Debugging** |
| Finds defects | | Fixes defects |
| **Testing** | | **QA** |
| Product-oriented, corrective | | Process-oriented, preventive |
| **Verification** | | **Validation** |
| Meets requirements | | Meets user needs |
| **Static** | | **Dynamic** |
| No execution | | With execution |
| Finds defects directly | | Causes failures |
| **Black-box** | | **White-box** |
| Based on specifications | | Based on internal structure |
| **Confirmation** | | **Regression** |
| Defect fixed | | No adverse consequences |
| **Entry Criteria** | | **Exit Criteria** |
| Preconditions to start | | Conditions to complete |
| **Project Risk** | | **Product Risk** |
| Schedule/budget/scope | | Quality characteristics |
| **Statement Coverage** | | **Branch Coverage** |
| All statements executed | | All branches executed |
| Lower strength | | Subsumes statement coverage |

---

## Study Tips for Exam

**High-Priority Topics:**
1. Seven Testing Principles (know all by heart)
2. Error/Defect/Failure chain
3. Test activities (7 activities)
4. Test levels (5 levels) and types (4 types)
5. Confirmation vs Regression
6. Review types (4 types) and their formality
7. Black-box techniques (EP, BVA, Decision Table, State Transition)
8. Coverage formulas (statement, branch, EP, DT)
9. Three-point estimation formula
10. Entry vs Exit criteria
11. Project vs Product risks
12. Test automation benefits and risks

**Practice Calculations:**
- Statement and branch coverage
- EP coverage
- Three-point estimation (a, m, b → E and SD)
- Defect removal efficiency
- BVA test values

**Memorize:**
- 7 testing principles
- 7 test activities
- 5 test levels
- 4 test types
- 4 review types
- 3 C's (user stories)
- INVEST criteria

**Understand Distinctions:**
- Be able to distinguish concepts listed in Quick Reference table
- Know when to use each technique/approach

---

**Good luck with your ISTQB Foundation Level exam!**
