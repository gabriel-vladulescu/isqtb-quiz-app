-- ISTQB Quiz App Database Schema
-- SQLite version (MySQL-compatible design)
-- Created: 2025-11-17

-- =============================================================================
-- RESOURCES TABLE
-- Stores information about exam source documents (ISTQB Sample Exams)
-- =============================================================================
CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    syllabus_version VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- QUIZZES TABLE
-- Stores quiz/exam metadata
-- =============================================================================
CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id VARCHAR(100) UNIQUE NOT NULL,
    exam_name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    syllabus_version VARCHAR(50) NOT NULL,
    is_official BOOLEAN DEFAULT 0,
    total_questions INTEGER NOT NULL,
    total_points INTEGER NOT NULL,
    passing_score INTEGER NOT NULL,
    resource_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE SET NULL
);

-- =============================================================================
-- QUESTIONS TABLE
-- Stores individual questions with all their data
-- =============================================================================
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    question_number INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    select_type VARCHAR(20) NOT NULL DEFAULT 'single', -- 'single' or 'multiple'
    correct_answer TEXT NOT NULL, -- JSON array: ["a"] or ["b","c"]
    learning_objective VARCHAR(50),
    k_level VARCHAR(10),
    points INTEGER DEFAULT 1,
    hint TEXT,
    -- Complex data stored as JSON (both SQLite and MySQL support this)
    visual_aid TEXT, -- JSON object for visual aids (decision tables, state transitions, etc.)
    calculation TEXT, -- JSON object for calculations (formula, given, workShown, result)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- =============================================================================
-- QUESTION_OPTIONS TABLE
-- Stores answer options for each question
-- =============================================================================
CREATE TABLE IF NOT EXISTS question_options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    option_key VARCHAR(10) NOT NULL, -- 'a', 'b', 'c', 'd', etc.
    option_text TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- =============================================================================
-- QUESTION_EXPLANATIONS TABLE
-- Stores explanations for each question option
-- =============================================================================
CREATE TABLE IF NOT EXISTS question_explanations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    option_key VARCHAR(10) NOT NULL, -- 'a', 'b', 'c', 'd', etc.
    explanation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- =============================================================================
-- INDEXES for better query performance
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_quizzes_exam_id ON quizzes(exam_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_resource_id ON quizzes(resource_id);
CREATE INDEX IF NOT EXISTS idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_questions_question_number ON questions(quiz_id, question_number);
CREATE INDEX IF NOT EXISTS idx_question_options_question_id ON question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_question_explanations_question_id ON question_explanations(question_id);

-- =============================================================================
-- MySQL-specific considerations (for future migration):
-- =============================================================================
-- 1. Change AUTOINCREMENT to AUTO_INCREMENT
-- 2. Change BOOLEAN to TINYINT(1)
-- 3. Change TEXT to LONGTEXT for large content
-- 4. Add ENGINE=InnoDB at the end of each CREATE TABLE
-- 5. Consider using JSON data type for visual_aid and calculation columns
-- 6. Update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- =============================================================================
