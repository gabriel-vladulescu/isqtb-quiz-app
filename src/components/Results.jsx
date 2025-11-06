import { useState } from 'react'

function Results({
  score,
  totalPoints,
  passingScore,
  correctCount,
  totalQuestions,
  questions,
  userAnswers,
  onRestart,
  onBackToExams,
  elapsedTime,
  formatTime
}) {
  const [showReview, setShowReview] = useState(false)
  const passed = score >= passingScore
  const percentage = Math.round((score / totalPoints) * 100)

  if (showReview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Answer Review
              </h1>
              <button
                onClick={() => setShowReview(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Results
              </button>
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-6">
            {questions.map((question) => {
              const userAnswer = userAnswers[question.id]
              const isCorrect = question.selectType === 'multiple'
                ? question.correctAnswer === (Array.isArray(userAnswer) ? userAnswer.sort().join(',') : userAnswer)
                : question.correctAnswer === userAnswer

              const userAnswerKeys = userAnswer
                ? (typeof userAnswer === 'string' ? userAnswer.split(',') : userAnswer)
                : []

              return (
                <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Question #{question.id}
                    </h3>
                    <div className="flex gap-2">
                      {isCorrect ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Correct
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                          Incorrect
                        </span>
                      )}
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                        {question.points} {question.points === 1 ? 'pt' : 'pts'}
                      </span>
                    </div>
                  </div>

                  {/* Question Text */}
                  <p className="text-gray-800 mb-4 whitespace-pre-line">{question.questionText}</p>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {question.options.map((option) => {
                      const isCorrectOption = question.correctAnswer.split(',').includes(option.key)
                      const isUserSelection = userAnswerKeys.includes(option.key)

                      let optionStyle = 'bg-gray-50 border-gray-200'
                      if (isCorrectOption) {
                        optionStyle = 'bg-green-50 border-green-500'
                      } else if (isUserSelection && !isCorrectOption) {
                        optionStyle = 'bg-red-50 border-red-500'
                      }

                      return (
                        <div
                          key={option.key}
                          className={`p-3 rounded-lg border-2 ${optionStyle}`}
                        >
                          <div className="flex items-start">
                            <span className="font-semibold mr-2">{option.key})</span>
                            <div className="flex-1">
                              <span>{option.text}</span>
                              {isCorrectOption && (
                                <span className="ml-2 text-green-700 font-medium">✓ Correct</span>
                              )}
                              {isUserSelection && !isCorrectOption && (
                                <span className="ml-2 text-red-700 font-medium">✗ Your answer</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                    <div className="text-sm text-blue-800 space-y-2">
                      {Object.entries(question.explanation).map(([key, text]) => (
                        <p key={key}>
                          <span className="font-semibold">{key})</span> {text}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-blue-700 mt-3">
                      <span className="font-medium">Learning Objective:</span> {question.learningObjective} |
                      <span className="font-medium"> K-Level:</span> {question.kLevel}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h1>

          <p className="text-lg text-gray-600">
            {passed
              ? 'You passed the exam!'
              : 'You did not pass this time, but keep studying!'}
          </p>
        </div>

        {/* Score Details */}
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-900 mb-2">
                {score} / {totalPoints}
              </p>
              <p className="text-xl text-gray-600">
                {percentage}% ({correctCount} of {totalQuestions} questions correct)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 font-medium mb-1">Your Score</p>
              <p className="text-2xl font-bold text-blue-900">{score}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-green-600 font-medium mb-1">Passing Score</p>
              <p className="text-2xl font-bold text-green-900">{passingScore}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-sm text-purple-600 font-medium mb-1">Time Taken</p>
              <p className="text-2xl font-bold text-purple-900">{formatTime(elapsedTime)}</p>
            </div>
          </div>
        </div>

        {/* Performance Feedback */}
        <div className={`border-l-4 p-4 mb-8 ${
          passed ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
        }`}>
          <p className={`text-sm ${passed ? 'text-green-800' : 'text-yellow-800'}`}>
            {passed
              ? 'Great job! You have demonstrated a solid understanding of the ISTQB CTFL concepts. Review the answers to reinforce your knowledge.'
              : `You need ${passingScore - score} more ${passingScore - score === 1 ? 'point' : 'points'} to pass. Review the explanations and try again!`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setShowReview(true)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Review Answers
          </button>
          <button
            onClick={onRestart}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Restart Exam
          </button>
          <button
            onClick={onBackToExams}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Exam Selection
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
