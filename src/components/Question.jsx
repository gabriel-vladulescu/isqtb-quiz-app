import { useState } from 'react'
import CalculationDisplay from './CalculationDisplay'
import DecisionTableDisplay from './DecisionTableDisplay'
import StateTransitionDisplay from './StateTransitionDisplay'
import TableDisplay from './TableDisplay'
import CodeDisplay from './CodeDisplay'

function Question({ question, selectedAnswer, onAnswerSelect, disabled = false, isConfirmed = false, isCorrect = false }) {
  const isMultipleChoice = question.selectType === 'multiple'

  const handleOptionClick = (optionKey) => {
    // Note: We don't prevent changes even if confirmed, as clicking will unconfirm

    if (isMultipleChoice) {
      // Handle multiple selection
      let newSelection = []

      if (Array.isArray(selectedAnswer)) {
        if (selectedAnswer.includes(optionKey)) {
          // Remove if already selected
          newSelection = selectedAnswer.filter(key => key !== optionKey)
        } else {
          // Add if not selected
          newSelection = [...selectedAnswer, optionKey]
        }
      } else if (selectedAnswer) {
        // Convert single string to array
        if (selectedAnswer === optionKey) {
          newSelection = []
        } else {
          newSelection = [selectedAnswer, optionKey]
        }
      } else {
        // First selection
        newSelection = [optionKey]
      }

      // Sort and join for consistency
      onAnswerSelect(newSelection.sort().join(','))
    } else {
      // Single selection - allow unchecking
      if (selectedAnswer === optionKey) {
        onAnswerSelect(null)
      } else {
        onAnswerSelect(optionKey)
      }
    }
  }

  const isSelected = (optionKey) => {
    if (!selectedAnswer) return false

    if (isMultipleChoice) {
      if (Array.isArray(selectedAnswer)) {
        return selectedAnswer.includes(optionKey)
      }
      return selectedAnswer.split(',').includes(optionKey)
    }

    return selectedAnswer === optionKey
  }

  // Helper to render visual aids
  const renderVisualAid = () => {
    if (!question.visualAid) return null

    const { type } = question.visualAid

    switch (type) {
      case 'decisionTable':
        return <DecisionTableDisplay visualAid={question.visualAid} />
      case 'stateTransitionTable':
      case 'stateTransitionDiagram':
        return <StateTransitionDisplay visualAid={question.visualAid} />
      case 'equivalencePartitionTable':
      case 'boundaryValueTable':
      case 'table':
        return <TableDisplay visualAid={question.visualAid} />
      case 'code':
        return <CodeDisplay visualAid={question.visualAid} />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Question #{question.id}
          </h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {question.points} {question.points === 1 ? 'Point' : 'Points'}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
              {question.kLevel}
            </span>
          </div>
        </div>

        <p className="text-gray-800 text-lg leading-relaxed mb-3 whitespace-pre-line">
          {question.questionText}
        </p>

        {/* Hint (if present) */}
        {question.hint && (
          <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-yellow-800 flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span><span className="font-semibold">Hint:</span> {question.hint}</span>
            </p>
          </div>
        )}

        {/* Visual Aid (before question text if needed for context) */}
        {question.visualAid && renderVisualAid()}

        {/* Calculation Display (if present) */}
        {question.calculation && <CalculationDisplay calculation={question.calculation} />}

        <p className="text-sm font-medium text-gray-600">
          {isMultipleChoice
            ? 'Select TWO or more options.'
            : 'Select ONE option.'}
        </p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const selected = isSelected(option.key)
          const isCorrectOption = isConfirmed && question.correctAnswer.split(',').includes(option.key)
          const isWrongSelection = isConfirmed && selected && !isCorrectOption

          // Determine styling based on confirmation state
          let optionStyle = 'border-gray-200 bg-white'
          let checkmarkColor = 'border-gray-300 bg-white'

          if (isConfirmed) {
            // When confirmed, show correct/incorrect styling but keep hover for editability
            if (isCorrectOption) {
              optionStyle = 'border-green-500 bg-green-50 hover:bg-green-100'
              checkmarkColor = 'border-green-500 bg-green-500'
            } else if (isWrongSelection) {
              optionStyle = 'border-red-500 bg-red-50 hover:bg-red-100'
              checkmarkColor = 'border-red-500 bg-red-500'
            } else if (selected) {
              optionStyle = 'border-blue-300 bg-blue-50 hover:bg-blue-100'
              checkmarkColor = 'border-blue-300 bg-blue-300'
            } else {
              optionStyle = 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              checkmarkColor = 'border-gray-300 bg-white'
            }
          } else {
            // Normal interactive state
            if (selected) {
              optionStyle = 'border-blue-500 bg-blue-50'
              checkmarkColor = 'border-blue-500 bg-blue-500'
            } else {
              optionStyle = 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              checkmarkColor = 'border-gray-300 bg-white'
            }
          }

          return (
            <button
              key={option.key}
              onClick={() => handleOptionClick(option.key)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionStyle} cursor-pointer`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-3 mt-0.5 flex items-center justify-center ${checkmarkColor}`}>
                  {selected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900 mr-2">
                    {option.key})
                  </span>
                  <span className="text-gray-800">
                    {option.text}
                  </span>
                  {isConfirmed && isCorrectOption && (
                    <span className="ml-2 text-green-700 font-medium text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Correct answer
                    </span>
                  )}
                  {isConfirmed && isWrongSelection && (
                    <span className="ml-2 text-red-700 font-medium text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Wrong
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Learning Objective */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          <span className="font-medium">Learning Objective:</span> {question.learningObjective}
        </p>
      </div>
    </div>
  )
}

export default Question
