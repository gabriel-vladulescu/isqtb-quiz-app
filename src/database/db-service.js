/**
 * Database Service
 * Provides methods to query the SQLite database
 */

import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'database.sqlite');

/**
 * Get database connection
 */
function getDatabase() {
  return new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      throw err;
    }
  });
}

/**
 * Get all quizzes with their resource information
 */
export function getAllQuizzes() {
  return new Promise((resolve, reject) => {
    const db = getDatabase();

    const sql = `
      SELECT
        q.id, q.exam_id, q.exam_name, q.version, q.release_date,
        q.syllabus_version, q.is_official, q.total_questions,
        q.total_points, q.passing_score,
        r.document as resource_document
      FROM quizzes q
      LEFT JOIN resources r ON q.resource_id = r.id
      ORDER BY q.id
    `;

    db.all(sql, [], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

/**
 * Get a specific quiz by exam_id
 */
export function getQuizByExamId(examId) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();

    const sql = `
      SELECT
        q.id, q.exam_id, q.exam_name, q.version, q.release_date,
        q.syllabus_version, q.is_official, q.total_questions,
        q.total_points, q.passing_score,
        r.document as resource_document
      FROM quizzes q
      LEFT JOIN resources r ON q.resource_id = r.id
      WHERE q.exam_id = ?
    `;

    db.get(sql, [examId], (err, row) => {
      db.close();
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

/**
 * Get all questions for a quiz with their options and explanations
 */
export function getQuizQuestions(quizId) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();

    // First get all questions
    const questionsSql = `
      SELECT
        id, quiz_id, question_number, question_text, select_type,
        correct_answer, learning_objective, k_level, points, hint,
        visual_aid, calculation
      FROM questions
      WHERE quiz_id = ?
      ORDER BY question_number
    `;

    db.all(questionsSql, [quizId], (err, questions) => {
      if (err) {
        db.close();
        reject(err);
        return;
      }

      if (questions.length === 0) {
        db.close();
        resolve([]);
        return;
      }

      // Get options and explanations for all questions
      const questionIds = questions.map(q => q.id);
      const placeholders = questionIds.map(() => '?').join(',');

      const optionsSql = `
        SELECT question_id, option_key, option_text, sort_order
        FROM question_options
        WHERE question_id IN (${placeholders})
        ORDER BY question_id, sort_order
      `;

      const explanationsSql = `
        SELECT question_id, option_key, explanation
        FROM question_explanations
        WHERE question_id IN (${placeholders})
        ORDER BY question_id, option_key
      `;

      db.all(optionsSql, questionIds, (err, options) => {
        if (err) {
          db.close();
          reject(err);
          return;
        }

        db.all(explanationsSql, questionIds, (err, explanations) => {
          db.close();

          if (err) {
            reject(err);
            return;
          }

          // Combine questions with their options and explanations
          const result = questions.map(question => {
            // Parse JSON fields
            const correctAnswer = JSON.parse(question.correct_answer);
            const visualAid = question.visual_aid ? JSON.parse(question.visual_aid) : null;
            const calculation = question.calculation ? JSON.parse(question.calculation) : null;

            // Get options for this question
            const questionOptions = options
              .filter(o => o.question_id === question.id)
              .map(o => ({
                key: o.option_key,
                text: o.option_text
              }));

            // Get explanations for this question
            const questionExplanations = explanations
              .filter(e => e.question_id === question.id)
              .reduce((acc, e) => {
                acc[e.option_key] = e.explanation;
                return acc;
              }, {});

            return {
              id: question.question_number,
              questionText: question.question_text,
              selectType: question.select_type,
              correctAnswer: correctAnswer,
              learningObjective: question.learning_objective,
              kLevel: question.k_level,
              points: question.points,
              hint: question.hint,
              visualAid: visualAid,
              calculation: calculation,
              options: questionOptions,
              explanation: questionExplanations
            };
          });

          resolve(result);
        });
      });
    });
  });
}

/**
 * Get complete quiz data (quiz info + questions) by exam_id
 */
export async function getCompleteQuiz(examId) {
  try {
    const quiz = await getQuizByExamId(examId);

    if (!quiz) {
      return null;
    }

    const questions = await getQuizQuestions(quiz.id);

    return {
      examId: quiz.exam_id,
      examName: quiz.exam_name,
      version: quiz.version,
      releaseDate: quiz.release_date,
      syllabusVersion: quiz.syllabus_version,
      isOfficial: Boolean(quiz.is_official),
      totalQuestions: quiz.total_questions,
      totalPoints: quiz.total_points,
      passingScore: quiz.passing_score,
      resourceDocument: quiz.resource_document,
      questions: questions
    };
  } catch (error) {
    throw error;
  }
}
