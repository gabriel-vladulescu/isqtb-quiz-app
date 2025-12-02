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
                {examData.isOfficial ? 'This is an official sample' : 'This is a'} ISTQB CTFL v{examData.syllabusVersion} practice exam.
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
              <span className="text-blue-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(elapsedTime)}
              </span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {rightCount} right
              </span>
              <span className="text-red-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {wrongCount} wrong
              </span>
              <span className="text-gray-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
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
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Correct Answer
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 text-sm font-semibold rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Incorrect Answer
                  </div>
                )}
                <span className="text-xs text-gray-500 italic flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Click any option above to change your answer
                </span>
              </div>
              <button
                onClick={() => handleToggleExplanation(currentQuestion.id)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                {showExplanations[currentQuestion.id] ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    Hide Explanation
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Show Explanation
                  </>
                )}
              </button>
            </div>

            {showExplanations[currentQuestion.id] && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Explanation
                </h4>
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
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex gap-3">
              {!isCurrentQuestionConfirmed ? (
                <button
                  onClick={() => handleConfirmAnswer(currentQuestion.id)}
                  disabled={!userAnswers[currentQuestion.id]}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Confirm Answer
                </button>
              ) : (
                <>
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      onClick={handleFinish}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Finish Exam
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
                    >
                      Next Question
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
