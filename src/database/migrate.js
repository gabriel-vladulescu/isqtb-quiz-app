/**
 * Database Migration Script
 * Creates SQLite database and migrates data from JSON files
 *
 * Usage: node src/database/migrate.js
 */

import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const DB_PATH = path.join(__dirname, 'database.sqlite');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const DATA_DIR = path.join(__dirname, '../data');
const BACKUP_DIR = path.join(DATA_DIR, 'backup');

// Database connection
let db;

/**
 * Initialize database and create tables
 */
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    console.log('📦 Initializing database...');

    // Create new database
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('✓ Connected to SQLite database');

      // Read and execute schema
      const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');

      db.exec(schema, (err) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('✓ Database schema created');
        resolve();
      });
    });
  });
}

/**
 * Insert resources from resources.json
 */
function migrateResources() {
  return new Promise((resolve, reject) => {
    console.log('\n📚 Migrating resources...');

    const resourcesPath = path.join(BACKUP_DIR, 'resources.json');
    const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));

    const stmt = db.prepare(`
      INSERT INTO resources (id, document, version, date, syllabus_version)
      VALUES (?, ?, ?, ?, ?)
    `);

    let count = 0;
    resources.forEach(resource => {
      stmt.run(
        resource.id,
        resource.document,
        resource.version,
        resource.date,
        resource.syllabusVersion,
        (err) => {
          if (err) console.error('Error inserting resource:', err);
          else count++;
        }
      );
    });

    stmt.finalize((err) => {
      if (err) reject(err);
      else {
        console.log(`✓ Migrated ${count} resources`);
        resolve();
      }
    });
  });
}

/**
 * Insert quizzes from backup quizzes.json
 */
function migrateBackupQuizzes() {
  return new Promise((resolve, reject) => {
    console.log('\n📝 Migrating backup quizzes...');

    const quizzesPath = path.join(BACKUP_DIR, 'quizzes.json');
    const quizzes = JSON.parse(fs.readFileSync(quizzesPath, 'utf8'));

    const stmt = db.prepare(`
      INSERT INTO quizzes (
        id, exam_id, exam_name, version, release_date, syllabus_version,
        is_official, total_questions, total_points, passing_score, resource_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let count = 0;
    quizzes.forEach(quiz => {
      // Generate exam_id from id (A, B, C, D...)
      const examId = `sample-exam-${String.fromCharCode(64 + quiz.id).toLowerCase()}`;
      const examLetter = String.fromCharCode(64 + quiz.id);

      stmt.run(
        quiz.id,
        examId,
        `ISTQB CTFL Sample Exam ${examLetter}`,
        '1.7',
        '2025-04-01',
        '4.0.1',
        quiz.is_official ? 1 : 0,
        quiz.questions_count,
        quiz.questions_count, // Assuming 1 point per question
        quiz.questions_pass_count,
        quiz.resource_id,
        (err) => {
          if (err) console.error('Error inserting quiz:', err);
          else count++;
        }
      );
    });

    stmt.finalize((err) => {
      if (err) reject(err);
      else {
        console.log(`✓ Migrated ${count} backup quizzes`);
        resolve();
      }
    });
  });
}

/**
 * Insert enhanced exam and its questions
 */
function migrateEnhancedExam() {
  return new Promise((resolve, reject) => {
    console.log('\n✨ Migrating enhanced exam...');

    const examPath = path.join(DATA_DIR, 'sample-exam-enhanced.json');
    const exam = JSON.parse(fs.readFileSync(examPath, 'utf8'));

    // Insert quiz
    db.run(`
      INSERT INTO quizzes (
        exam_id, exam_name, version, release_date, syllabus_version,
        is_official, total_questions, total_points, passing_score
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      exam.examId,
      exam.examName,
      exam.version,
      exam.releaseDate,
      exam.syllabusVersion,
      exam.isOfficial ? 1 : 0,
      exam.totalQuestions,
      exam.totalPoints,
      exam.passingScore
    ], function(err) {
      if (err) {
        reject(err);
        return;
      }

      const quizId = this.lastID;
      console.log(`✓ Created quiz: ${exam.examName} (ID: ${quizId})`);

      // Insert questions
      migrateQuestions(quizId, exam.questions)
        .then(() => resolve())
        .catch(reject);
    });
  });
}

/**
 * Insert questions for a quiz
 */
function migrateQuestions(quizId, questions) {
  return new Promise((resolve, reject) => {
    console.log(`  📋 Migrating ${questions.length} questions...`);

    let completed = 0;

    questions.forEach((question, index) => {
      // Insert question
      db.run(`
        INSERT INTO questions (
          quiz_id, question_number, question_text, select_type, correct_answer,
          learning_objective, k_level, points, hint, visual_aid, calculation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        quizId,
        question.id,
        question.questionText,
        question.selectType,
        JSON.stringify(question.correctAnswer),
        question.learningObjective,
        question.kLevel,
        question.points,
        question.hint || null,
        question.visualAid ? JSON.stringify(question.visualAid) : null,
        question.calculation ? JSON.stringify(question.calculation) : null
      ], function(err) {
        if (err) {
          console.error(`  Error inserting question ${question.id}:`, err);
          completed++;
          if (completed === questions.length) resolve();
          return;
        }

        const questionId = this.lastID;

        // Insert options
        const optionPromises = question.options.map((option, idx) => {
          return new Promise((res, rej) => {
            db.run(`
              INSERT INTO question_options (question_id, option_key, option_text, sort_order)
              VALUES (?, ?, ?, ?)
            `, [questionId, option.key, option.text, idx], (err) => {
              if (err) rej(err);
              else res();
            });
          });
        });

        // Insert explanations
        const explanationPromises = Object.entries(question.explanation).map(([key, text]) => {
          return new Promise((res, rej) => {
            db.run(`
              INSERT INTO question_explanations (question_id, option_key, explanation)
              VALUES (?, ?, ?)
            `, [questionId, key, text], (err) => {
              if (err) rej(err);
              else res();
            });
          });
        });

        Promise.all([...optionPromises, ...explanationPromises])
          .then(() => {
            completed++;
            if (completed === questions.length) {
              console.log(`  ✓ Migrated all questions and their data`);
              resolve();
            }
          })
          .catch(reject);
      });
    });
  });
}

/**
 * Main migration function
 */
async function migrate() {
  try {
    console.log('🚀 Starting database migration...\n');

    // Remove old database if exists
    if (fs.existsSync(DB_PATH)) {
      fs.unlinkSync(DB_PATH);
      console.log('✓ Removed old database\n');
    }

    // Initialize database
    await initializeDatabase();

    // Migrate data
    await migrateResources();
    await migrateBackupQuizzes();
    await migrateEnhancedExam();

    console.log('\n✅ Migration completed successfully!');
    console.log(`📍 Database location: ${DB_PATH}`);

    // Close database
    db.close((err) => {
      if (err) console.error('Error closing database:', err);
      else console.log('✓ Database connection closed');
    });

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    if (db) db.close();
    process.exit(1);
  }
}

// Run migration
migrate();
