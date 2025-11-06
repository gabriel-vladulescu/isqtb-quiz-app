import { useState } from 'react'
import Questionnaire from './components/Questionnaire'
import ExamSelector from './components/ExamSelector'

function App() {
  const [selectedExam, setSelectedExam] = useState(null)

  const handleSelectExam = (examData) => {
    setSelectedExam(examData)
  }

  const handleBackToExams = () => {
    setSelectedExam(null)
  }

  if (!selectedExam) {
    return <ExamSelector onSelectExam={handleSelectExam} />
  }

  return <Questionnaire examData={selectedExam} onBackToExams={handleBackToExams} />
}

export default App
