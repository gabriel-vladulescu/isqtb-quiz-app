# Database Documentation

## Overview

The ISTQB Quiz App uses a relational database to store quizzes, questions, and related data. Currently implemented with SQLite for development, designed to be easily migrated to MySQL for production.

## Database Location

**SQLite:** `src/database/database.sqlite`

## Database Schema

### Tables

#### 1. `resources`
Stores information about exam source documents (ISTQB official exams).

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique identifier |
| document | VARCHAR(255) | Document name (e.g., "ISTQB CTFL Sample Exam A v1.7") |
| version | VARCHAR(50) | Version number |
| date | DATE | Release date |
| syllabus_version | VARCHAR(50) | ISTQB syllabus version |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

#### 2. `quizzes`
Stores quiz/exam metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique identifier |
| exam_id | VARCHAR(100) UNIQUE | Exam identifier (e.g., "sample-exam-a") |
| exam_name | VARCHAR(255) | Full exam name |
| version | VARCHAR(50) | Exam version |
| release_date | DATE | Release date |
| syllabus_version | VARCHAR(50) | ISTQB syllabus version |
| is_official | BOOLEAN | Whether this is an official ISTQB exam |
| total_questions | INTEGER | Number of questions |
| total_points | INTEGER | Total points available |
| passing_score | INTEGER | Minimum points to pass |
| resource_id | INTEGER | Foreign key to resources table |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

**Relationships:**
- `resource_id` → `resources.id` (optional, can be NULL)

#### 3. `questions`
Stores individual questions with all their data.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique identifier |
| quiz_id | INTEGER | Foreign key to quizzes table |
| question_number | INTEGER | Question number in the quiz |
| question_text | TEXT | The question text |
| select_type | VARCHAR(20) | 'single' or 'multiple' choice |
| correct_answer | TEXT | JSON array of correct answer keys |
| learning_objective | VARCHAR(50) | ISTQB learning objective (e.g., "FL-4.3.1") |
| k_level | VARCHAR(10) | Knowledge level (K1, K2, K3) |
| points | INTEGER | Points for this question |
| hint | TEXT | Optional hint text |
| visual_aid | TEXT | JSON object for visual aids (tables, diagrams, code) |
| calculation | TEXT | JSON object for calculations (formula, steps, result) |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

**Relationships:**
- `quiz_id` → `quizzes.id` (CASCADE delete)

**JSON Fields:**
- `correct_answer`: `["a"]` or `["b","c"]`
- `visual_aid`: Complex object (see QUESTION_STRUCTURE.md)
- `calculation`: `{formula, given, workShown, result}`

#### 4. `question_options`
Stores answer options for each question.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique identifier |
| question_id | INTEGER | Foreign key to questions table |
| option_key | VARCHAR(10) | Option identifier (a, b, c, d) |
| option_text | TEXT | The option text |
| sort_order | INTEGER | Display order |
| created_at | TIMESTAMP | Record creation time |

**Relationships:**
- `question_id` → `questions.id` (CASCADE delete)

#### 5. `question_explanations`
Stores explanations for each question option.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PRIMARY KEY | Unique identifier |
| question_id | INTEGER | Foreign key to questions table |
| option_key | VARCHAR(10) | Option identifier (a, b, c, d) |
| explanation | TEXT | Explanation text |
| created_at | TIMESTAMP | Record creation time |

**Relationships:**
- `question_id` → `questions.id` (CASCADE delete)

## Entity Relationship Diagram

```
┌─────────────┐
│  resources  │
│  id (PK)    │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────────┐
│    quizzes      │
│  id (PK)        │
│  resource_id(FK)│
└──────┬──────────┘
       │
       │ 1:N
       │
┌──────▼──────────┐       ┌──────────────────────┐
│   questions     │──────>│  question_options    │
│  id (PK)        │ 1:N   │  question_id (FK)    │
│  quiz_id (FK)   │       └──────────────────────┘
└──────┬──────────┘
       │
       │ 1:N
       │
┌──────▼──────────────────┐
│ question_explanations   │
│ question_id (FK)        │
└─────────────────────────┘
```

## Current Data

After migration:
- ✓ 4 resources (ISTQB Sample Exams A, B, C, D)
- ✓ 6 quizzes (5 from backup + 1 enhanced exam)
- ✓ 10 questions (from enhanced exam)
- ✓ 40 options (4 per question)
- ✓ 40 explanations

## Usage

### Running Migration

```bash
# Create database and migrate all data
node src/database/migrate.js
```

This will:
1. Delete old database if exists
2. Create new database with schema
3. Migrate resources from backup/resources.json
4. Migrate quizzes from backup/quizzes.json
5. Migrate enhanced exam and all questions

### Querying the Database

```bash
# Open SQLite CLI
sqlite3 src/database/database.sqlite

# View all quizzes
SELECT * FROM quizzes;

# View questions for a quiz
SELECT * FROM questions WHERE quiz_id = 6;

# View full question with options
SELECT
  q.id, q.question_text, q.k_level,
  qo.option_key, qo.option_text
FROM questions q
JOIN question_options qo ON q.id = qo.question_id
WHERE q.id = 1;
```

## MySQL Migration Guide

### Converting SQLite to MySQL

1. **Data Type Changes**
   ```sql
   -- SQLite              → MySQL
   INTEGER AUTOINCREMENT  → INT AUTO_INCREMENT
   BOOLEAN                → TINYINT(1)
   TEXT                   → LONGTEXT (for large content)
   VARCHAR(N)             → VARCHAR(N)
   TIMESTAMP              → TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   ```

2. **Schema Changes**
   ```sql
   -- Add ENGINE=InnoDB to each table
   CREATE TABLE resources (
     ...
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

   -- Use JSON data type for visual_aid and calculation
   visual_aid JSON,
   calculation JSON,
   ```

3. **SQL Syntax Differences**
   ```sql
   -- SQLite: AUTOINCREMENT
   CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT);

   -- MySQL: AUTO_INCREMENT
   CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT);
   ```

### MySQL Schema Template

```sql
-- MySQL Version of schema.sql

CREATE TABLE resources (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    syllabus_version VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id VARCHAR(100) UNIQUE NOT NULL,
    exam_name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    syllabus_version VARCHAR(50) NOT NULL,
    is_official TINYINT(1) DEFAULT 0,
    total_questions INT NOT NULL,
    total_points INT NOT NULL,
    passing_score INT NOT NULL,
    resource_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text LONGTEXT NOT NULL,
    select_type VARCHAR(20) NOT NULL DEFAULT 'single',
    correct_answer JSON NOT NULL,
    learning_objective VARCHAR(50),
    k_level VARCHAR(10),
    points INT DEFAULT 1,
    hint TEXT,
    visual_aid JSON,
    calculation JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Similar conversions for question_options and question_explanations...
```

### Migration Steps

1. **Export SQLite data**
   ```bash
   sqlite3 src/database/database.sqlite .dump > backup.sql
   ```

2. **Convert SQL syntax**
   - Replace `AUTOINCREMENT` with `AUTO_INCREMENT`
   - Replace `INTEGER` with `INT`
   - Replace `BOOLEAN` with `TINYINT(1)`
   - Add `ENGINE=InnoDB` to CREATE TABLE statements

3. **Import to MySQL**
   ```bash
   mysql -u username -p database_name < converted.sql
   ```

4. **Update connection code**
   - Replace `sqlite3` package with `mysql2`
   - Update connection parameters

## Files

- **schema.sql** - Database schema (SQLite)
- **migrate.js** - Migration script (ES6 modules)
- **database.sqlite** - SQLite database file
- **README.md** - This file

## Notes

- All JSON fields use TEXT in SQLite (MySQL will use JSON type)
- Timestamps are automatically set on insert/update
- Foreign keys are enabled and enforced
- Indexes are created for common queries
- CASCADE delete ensures referential integrity

## Future Enhancements

- [ ] Add user sessions table
- [ ] Add user progress tracking
- [ ] Add quiz attempts history
- [ ] Add user statistics
- [ ] Add question difficulty ratings
- [ ] Add question usage analytics
