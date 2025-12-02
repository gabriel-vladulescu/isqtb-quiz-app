function CalculationDisplay({ calculation }) {
  if (!calculation) return null

  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5 my-4">
      <h4 className="font-bold text-purple-900 mb-3 text-lg flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Calculation
      </h4>

      {/* Formula */}
      {calculation.formula && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-purple-800 mb-1">Formula:</p>
          <div className="bg-white rounded px-4 py-2 border border-purple-200">
            <code className="text-purple-900 font-mono text-sm">{calculation.formula}</code>
          </div>
        </div>
      )}

      {/* Given Values */}
      {calculation.given && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-purple-800 mb-2">Given:</p>
          <div className="bg-white rounded px-4 py-3 border border-purple-200 space-y-1">
            {Object.entries(calculation.given).map(([key, value]) => (
              <div key={key} className="flex items-center text-sm">
                <span className="font-medium text-gray-700 mr-2">{key}:</span>
                <span className="text-gray-900 font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Shown */}
      {calculation.workShown && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-purple-800 mb-2">Calculation Steps:</p>
          <div className="bg-white rounded px-4 py-3 border border-purple-200">
            <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
              {calculation.workShown}
            </pre>
          </div>
        </div>
      )}

      {/* Result */}
      {calculation.result && (
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded px-4 py-3 border-2 border-purple-300">
          <p className="text-sm font-semibold text-purple-800 mb-1">Result:</p>
          <p className="text-lg font-bold text-purple-900 font-mono">{calculation.result}</p>
        </div>
      )}
    </div>
  )
}

export default CalculationDisplay
