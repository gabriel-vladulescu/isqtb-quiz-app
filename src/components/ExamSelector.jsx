import { useState, useEffect } from 'react'

const API_BASE_URL = 'http://localhost:3001/api'

function ExamSelector({ onSelectExam }) {
  const [availableExams, setAvailableExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch quizzes from API
    fetch(`${API_BASE_URL}/quizzes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes')
        }
        return response.json()
      })
      .then(result => {
        if (result.success) {
          console.log(`✓ Loaded ${result.data.length} quiz(zes) from database`)
          setAvailableExams(result.data)
        } else {
          throw new Error(result.error || 'Failed to load quizzes')
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading quizzes:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleSelectExam = async (examId) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/${examId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch quiz details')
      }
      const result = await response.json()
      if (result.success) {
        onSelectExam(result.data)
      } else {
        throw new Error(result.error || 'Failed to load quiz')
      }
    } catch (err) {
      console.error('Error loading quiz:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exams...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500 mb-4">Make sure the API server is running:</p>
            <code className="block bg-gray-100 text-gray-800 p-2 rounded text-sm mb-4">
              npm run server
            </code>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ISTQB CTFL Practice Exams
          </h1>
          <p className="text-gray-600 mb-2">
            Select an exam to begin practicing for your ISTQB Certified Tester Foundation Level certification
          </p>
          <p className="text-sm text-blue-600 font-medium">
            ✓ {availableExams.length} exam{availableExams.length !== 1 ? 's' : ''} automatically loaded
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {availableExams.map((exam) => (
            <div
              key={exam.examId}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
              onClick={() => handleSelectExam(exam.examId)}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {exam.examName}
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Version:</span> {exam.version}
                </p>
                <p>
                  <span className="font-semibold">Questions:</span> {exam.totalQuestions}
                </p>
                <p>
                  <span className="font-semibold">Passing Score:</span> {exam.passingScore}/{exam.totalPoints}
                </p>
                <p>
                  <span className="font-semibold">Syllabus:</span> v{exam.syllabusVersion}
                </p>
                {exam.isOfficial && (
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Official ISTQB Sample Exam
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExamSelector
