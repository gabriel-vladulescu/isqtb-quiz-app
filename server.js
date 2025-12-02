/**
 * Express API Server
 * Provides REST API endpoints for the quiz app
 */

import express from 'express';
import cors from 'cors';
import { getAllQuizzes, getCompleteQuiz } from './src/database/db-service.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * GET /api/quizzes
 * Returns all available quizzes
 */
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await getAllQuizzes();

    // Format quizzes for frontend
    const formattedQuizzes = quizzes.map(quiz => ({
      examId: quiz.exam_id,
      examName: quiz.exam_name,
      version: quiz.version,
      releaseDate: quiz.release_date,
      syllabusVersion: quiz.syllabus_version,
      isOfficial: Boolean(quiz.is_official),
      totalQuestions: quiz.total_questions,
      totalPoints: quiz.total_points,
      passingScore: quiz.passing_score,
      resourceDocument: quiz.resource_document
    }));

    res.json({
      success: true,
      data: formattedQuizzes
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quizzes'
    });
  }
});

/**
 * GET /api/quiz/:examId
 * Returns complete quiz data including all questions
 */
app.get('/api/quiz/:examId', async (req, res) => {
  try {
    const { examId } = req.params;
    const quiz = await getCompleteQuiz(examId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quiz'
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ API Server running on http://localhost:${PORT}`);
  console.log(`✓ Available endpoints:`);
  console.log(`  - GET /api/health`);
  console.log(`  - GET /api/quizzes`);
  console.log(`  - GET /api/quiz/:examId`);
});
