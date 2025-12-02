/**
 * Database Query Examples
 * Demonstrates how to query the SQLite database
 *
 * Usage: node src/database/query-examples.js
 */

import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'database.sqlite');

// Create database connection
const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
  console.log('✓ Connected to database (read-only)\n');
});

/**
 * Helper function to run queries and print results
 */
function runQuery(title, sql, params = []) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(title);
    console.log(`${'='.repeat(60)}\n`);

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Query error:', err);
        reject(err);
        return;
      }

      if (rows.length === 0) {
        console.log('No results found.\n');
      } else {
        console.table(rows);
      }

      resolve(rows);
    });
  });
}

/**
 * Run all example queries
 */
async function runExamples() {
  try {
    // 1. List all resources
    await runQuery(
      '1. All Resources',
      'SELECT * FROM resources'
    );

    // 2. List all quizzes with resource information
    await runQuery(
      '2. All Quizzes with Resources',
      `SELECT
        q.id, q.exam_id, q.exam_name, q.version, q.total_questions,
        q.passing_score, q.is_official,
        r.document as resource_document
      FROM quizzes q
      LEFT JOIN resources r ON q.resource_id = r.id
      ORDER BY q.id`
    );

    // 3. Get enhanced exam questions
    await runQuery(
      '3. Enhanced Exam Questions',
      `SELECT
        q.id, q.question_number, q.question_text, q.k_level,
        q.learning_objective, q.points,
        CASE WHEN q.visual_aid IS NOT NULL THEN 'Yes' ELSE 'No' END as has_visual_aid,
        CASE WHEN q.calculation IS NOT NULL THEN 'Yes' ELSE 'No' END as has_calculation
      FROM questions q
      WHERE q.quiz_id = 6
      ORDER BY q.question_number`
    );

    // 4. Get a specific question with options and explanations
    await runQuery(
      '4. Question #1 Details',
      `SELECT
        q.id, q.question_text, q.k_level, q.correct_answer,
        qo.option_key, qo.option_text,
        qe.explanation
      FROM questions q
      JOIN question_options qo ON q.id = qo.question_id
      JOIN question_explanations qe ON q.id = qe.question_id AND qo.option_key = qe.option_key
      WHERE q.id = 1
      ORDER BY qo.sort_order`
    );

    // 5. Count questions by K-level
    await runQuery(
      '5. Questions by K-Level',
      `SELECT
        k_level,
        COUNT(*) as count
      FROM questions
      GROUP BY k_level
      ORDER BY k_level`
    );

    // 6. Questions with visual aids
    await runQuery(
      '6. Questions with Visual Aids',
      `SELECT
        q.id, q.question_number, q.question_text, q.k_level,
        JSON_EXTRACT(q.visual_aid, '$.type') as visual_aid_type
      FROM questions q
      WHERE q.visual_aid IS NOT NULL
      ORDER BY q.question_number`
    );

    // 7. Questions with calculations
    await runQuery(
      '7. Questions with Calculations',
      `SELECT
        q.id, q.question_number, q.question_text, q.k_level,
        JSON_EXTRACT(q.calculation, '$.formula') as formula
      FROM questions q
      WHERE q.calculation IS NOT NULL
      ORDER BY q.question_number`
    );

    // 8. Statistics summary
    await runQuery(
      '8. Database Statistics',
      `SELECT
        (SELECT COUNT(*) FROM resources) as total_resources,
        (SELECT COUNT(*) FROM quizzes) as total_quizzes,
        (SELECT COUNT(*) FROM questions) as total_questions,
        (SELECT COUNT(*) FROM question_options) as total_options,
        (SELECT COUNT(*) FROM question_explanations) as total_explanations`
    );

    console.log('\n✅ All queries completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Error running queries:', error);
  } finally {
    // Close database connection
    db.close((err) => {
      if (err) console.error('Error closing database:', err);
      else console.log('✓ Database connection closed\n');
    });
  }
}

// Run examples
runExamples();
