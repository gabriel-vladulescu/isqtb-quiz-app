import { useState, useEffect } from 'react'
import Question from './Question'
import ProgressBar from './ProgressBar'
import Results from './Results'

function Questionnaire({ examData, onBackToExams }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [examStarted, setExamStarted] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [confirmedQuestions, setConfirmedQuestions] = useState({}) // {questionId: boolean}
  const [showExplanations, setShowExplanations] = useState({}) // {questionId: boolean}

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Load progress from localStorage on mount
  useEffect(() => {
    const storageKey = `istqb-exam-progress-${examData.examId}`
    const savedProgress = localStorage.getItem(storageKey)
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setUserAnswers(progress.userAnswers || {})
      setCurrentQuestionIndex(progress.currentQuestionIndex || 0)
      setConfirmedQuestions(progress.confirmedQuestions || {})
      setShowExplanations(progress.showExplanations || {})
      if (progress.shuffledQuestionIds) {
        // Restore shuffled question order
        const restored = progress.shuffledQuestionIds.map(id =>
          examData.questions.find(q => q.id === id)
        )
        setShuffledQuestions(restored)
      }
      if (progress.startTime) {
        setStartTime(new Date(progress.startTime))
        setExamStarted(true)
      }
    }
  }, [examData.examId])

  // Timer effect
  useEffect(() => {
    if (!examStarted || showResults || !startTime) return

    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = Math.floor((now - startTime) / 1000)
      setElapsedTime(elapsed)
    }, 1000)

    return () => clearInterval(interval)
  }, [examStarted, showResults, startTime])

  // Save progress to localStorage whenever answers or current question changes
  useEffect(() => {
    if (examStarted && startTime && shuffledQuestions.length > 0) {
      const storageKey = `istqb-exam-progress-${examData.examId}`
      localStorage.setItem(storageKey, JSON.stringify({
        userAnswers,
        currentQuestionIndex,
        confirmedQuestions,
        showExplanations,
        startTime: startTime.toISOString(),
        shuffledQuestionIds: shuffledQuestions.map(q => q.id),
        timestamp: new Date().toISOString()
      }))
    }
  }, [userAnswers, currentQuestionIndex, examStarted, startTime, shuffledQuestions, confirmedQuestions, showExplanations, examData.examId])

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
    // If user changes answer, unconfirm the question
    if (confirmedQuestions[questionId]) {
      setConfirmedQuestions(prev => ({
        ...prev,
        [questionId]: false
      }))
      setShowExplanations(prev => ({
        ...prev,
        [questionId]: false
      }))
    }
  }

  const handleConfirmAnswer = (questionId) => {
    setConfirmedQuestions(prev => ({
      ...prev,
      [questionId]: true
    }))
  }

  const handleToggleExplanation = (questionId) => {
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const handleNext = () => {
    const questions = shuffledQuestions.length > 0 ? shuffledQuestions : examData.questions
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      // Reset explanation visibility for next question
      setShowExplanations(prev => ({
        ...prev,
        [questions[currentQuestionIndex + 1].id]: false
      }))
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleFinish = () => {
    if (startTime) {
      const finalTime = Math.floor((new Date() - startTime) / 1000)
      setElapsedTime(finalTime)
    }
    setShowResults(true)
  }

  const handleRestart = () => {
    setUserAnswers({})
    setCurrentQuestionIndex(0)
    setShowResults(false)
    setExamStarted(false)
    setStartTime(null)
    setElapsedTime(0)
    setShuffledQuestions([])
    setConfirmedQuestions({})
    setShowExplanations({})
    const storageKey = `istqb-exam-progress-${examData.examId}`
    localStorage.removeItem(storageKey)
  }

  const handleExitQuiz = () => {
    if (confirm('Are you sure you want to exit to exam selection? Your progress will be saved.')) {
      onBackToExams()
    }
  }

  const handleStartExam = () => {
    const now = new Date()
    setStartTime(now)
    setShuffledQuestions(shuffleArray(examData.questions))
    setExamStarted(true)
  }

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const calculateScore = () => {
    let correctCount = 0
    let totalPoints = 0

    examData.questions.forEach(question => {
      const userAnswer = userAnswers[question.id]
      if (!userAnswer) return

      if (question.selectType === 'multiple') {
        // For multiple choice, both must match exactly
        const correctAnswers = question.correctAnswer.split(',').sort().join(',')
        const userAnswersSorted = Array.isArray(userAnswer)
          ? userAnswer.sort().join(',')
          : userAnswer

        if (correctAnswers === userAnswersSorted) {
          correctCount++
          totalPoints += question.points
        }
      } else {
        // Single choice
        if (userAnswer === question.correctAnswer) {
          correctCount++
          totalPoints += question.points
        }
      }
    })

    return { correctCount, totalPoints }
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {examData.examName}
          </h1>
          <div className="space-y-4 text-gray-700 mb-6">
            <p className="text-lg">
              <span className="font-semibold">Total Questions:</span> {examData.totalQuestions}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Total Points:</span> {examData.totalPoints}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Passing Score:</span> {examData.passingScore} points
            </p>
            <p className="text-lg">
              <span className="font-semibold">Duration:</span> 60 minutes (recommended)
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-sm text-blue-700">
                {examData.isOfficial ? 'This is an official' : 'This is a'} ISTQB CTFL v{examData.syllabusVersion} practice exam.
                Your progress will be automatically saved as you work through the questions.
              </p>
            </div>
          </div>
          <button
            onClick={handleStartExam}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Exam
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    const { correctCount, totalPoints } = calculateScore()
    return (
      <Results
        score={totalPoints}
        totalPoints={examData.totalPoints}
        passingScore={examData.passingScore}
        correctCount={correctCount}
        totalQuestions={examData.totalQuestions}
        questions={examData.questions}
        userAnswers={userAnswers}
        onRestart={handleRestart}
        onBackToExams={onBackToExams}
        elapsedTime={elapsedTime}
        formatTime={formatTime}
      />
    )
  }

  const questions = shuffledQuestions.length > 0 ? shuffledQuestions : examData.questions
  const currentQuestion = questions[currentQuestionIndex]
  const answeredCount = Object.keys(userAnswers).length
  const progressPercentage = (answeredCount / examData.totalQuestions) * 100

  // Calculate right/wrong counts - only for confirmed questions
  const calculateRightWrong = () => {
    let rightCount = 0
    let wrongCount = 0

    examData.questions.forEach(question => {
      // Only count if question has been confirmed
      if (!confirmedQuestions[question.id]) return

      const userAnswer = userAnswers[question.id]
      if (!userAnswer) return

      let isCorrect = false
      if (question.selectType === 'multiple') {
        const correctAnswers = question.correctAnswer.split(',').sort().join(',')
        const userAnswersSorted = Array.isArray(userAnswer)
          ? userAnswer.sort().join(',')
          : userAnswer
        isCorrect = correctAnswers === userAnswersSorted
      } else {
        isCorrect = userAnswer === question.correctAnswer
      }

      if (isCorrect) {
        rightCount++
      } else {
        wrongCount++
      }
    })

    return { rightCount, wrongCount }
  }

  const { rightCount, wrongCount } = calculateRightWrong()

  // Check if current question is confirmed and if it's correct
  const isCurrentQuestionConfirmed = confirmedQuestions[currentQuestion.id] || false
  const isCurrentQuestionCorrect = () => {
    const userAnswer = userAnswers[currentQuestion.id]
    if (!userAnswer) return false

    if (currentQuestion.selectType === 'multiple') {
      const correctAnswers = currentQuestion.correctAnswer.split(',').sort().join(',')
      const userAnswersSorted = Array.isArray(userAnswer)
        ? userAnswer.sort().join(',')
        : userAnswer
      return correctAnswers === userAnswersSorted
    } else {
      return userAnswer === currentQuestion.correctAnswer
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {examData.examName}
            </h1>
            <button
              onClick={handleExitQuiz}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
            >
              Exit Quiz
            </button>
          </div>
          <ProgressBar
            current={answeredCount}
            total={examData.totalQuestions}
            percentage={progressPercentage}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {examData.totalQuestions}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-blue-600 font-medium">
                ⏱ {formatTime(elapsedTime)}
              </span>
              <span className="text-green-600 font-medium">
                ✓ {rightCount} right
              </span>
              <span className="text-red-600 font-medium">
                ✗ {wrongCount} wrong
              </span>
              <span className="text-gray-600">
                {answeredCount} answered
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <Question
          question={currentQuestion}
          selectedAnswer={userAnswers[currentQuestion.id]}
          onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion.id, answer)}
          disabled={isCurrentQuestionConfirmed}
          isConfirmed={isCurrentQuestionConfirmed}
          isCorrect={isCurrentQuestionCorrect()}
          showExplanation={showExplanations[currentQuestion.id] || false}
        />

        {/* Explanation Section (if confirmed) */}
        {isCurrentQuestionConfirmed && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {isCurrentQuestionCorrect() ? (
                  <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-lg">
                    ✓ Correct
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-semibold rounded-lg">
                    ✗ Incorrect
                  </span>
                )}
                <span className="text-xs text-gray-500 italic">
                  Click any option above to change your answer
                </span>
              </div>
              <button
                onClick={() => handleToggleExplanation(currentQuestion.id)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
              >
                {showExplanations[currentQuestion.id] ? 'Hide Explanation' : 'See Explanation'}
              </button>
            </div>

            {showExplanations[currentQuestion.id] && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                <div className="text-sm text-blue-800 space-y-2">
                  {Object.entries(currentQuestion.explanation).map(([key, text]) => (
                    <p key={key}>
                      <span className="font-semibold">{key})</span> {text}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-3">
              {!isCurrentQuestionConfirmed && (
                <button
                  onClick={() => handleConfirmAnswer(currentQuestion.id)}
                  disabled={!userAnswers[currentQuestion.id]}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm
                </button>
              )}

              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleFinish}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Finish Exam
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
