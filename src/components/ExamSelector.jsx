import { useState, useEffect } from 'react'

// Automatically load all JSON files from src/data directory
const examModules = import.meta.glob('../data/*.json', { eager: true })

function ExamSelector({ onSelectExam }) {
  const [availableExams, setAvailableExams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Process all loaded exam files
    const exams = Object.entries(examModules).map(([path, module]) => {
      // Extract filename from path (e.g., '../data/sample-exam-a.json' -> 'sample-exam-a')
      const filename = path.split('/').pop().replace('.json', '')
      return {
        id: filename,
        data: module.default || module
      }
    })

    // Sort exams by examId for consistent ordering
    exams.sort((a, b) => a.id.localeCompare(b.id))

    console.log(`✓ Auto-loaded ${exams.length} exam(s):`, exams.map(e => e.id))

    setAvailableExams(exams)
    setLoading(false)
  }, [])

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
              key={exam.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
              onClick={() => onSelectExam(exam.data)}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {exam.data.examName}
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Version:</span> {exam.data.version}
                </p>
                <p>
                  <span className="font-semibold">Questions:</span> {exam.data.totalQuestions}
                </p>
                <p>
                  <span className="font-semibold">Passing Score:</span> {exam.data.passingScore}/{exam.data.totalPoints}
                </p>
                <p>
                  <span className="font-semibold">Syllabus:</span> v{exam.data.syllabusVersion}
                </p>
                {exam.data.isOfficial && (
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
