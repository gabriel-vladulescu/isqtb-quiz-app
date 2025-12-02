function DecisionTableDisplay({ visualAid }) {
  if (!visualAid || visualAid.type !== 'decisionTable') return null

  const { title, conditions, actions, legend } = visualAid
  const numRules = conditions[0]?.rules.length || 0

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5 my-4">
      <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        {title || 'Decision Table'}
      </h4>

      {/* Decision Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border-2 border-blue-700 px-4 py-2 text-left font-semibold">
                Conditions / Actions
              </th>
              {Array.from({ length: numRules }, (_, i) => (
                <th key={i} className="border-2 border-blue-700 px-4 py-2 text-center font-semibold">
                  Rule {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Conditions Section */}
            {conditions.map((condition, idx) => (
              <tr key={`cond-${idx}`} className="bg-blue-50">
                <td className="border-2 border-blue-200 px-4 py-2 font-medium text-gray-900">
                  {condition.name}
                </td>
                {condition.rules.map((rule, ruleIdx) => (
                  <td
                    key={`cond-${idx}-rule-${ruleIdx}`}
                    className="border-2 border-blue-200 px-4 py-2 text-center font-bold text-gray-900"
                  >
                    {rule}
                  </td>
                ))}
              </tr>
            ))}

            {/* Separator Row */}
            <tr className="bg-blue-300 h-1">
              <td colSpan={numRules + 1} className="border-2 border-blue-400"></td>
            </tr>

            {/* Actions Section */}
            {actions.map((action, idx) => (
              <tr key={`act-${idx}`} className="bg-white hover:bg-blue-50">
                <td className="border-2 border-blue-200 px-4 py-2 font-medium text-gray-900">
                  {action.name}
                </td>
                {action.rules.map((rule, ruleIdx) => (
                  <td
                    key={`act-${idx}-rule-${ruleIdx}`}
                    className="border-2 border-blue-200 px-4 py-2 text-center font-bold"
                  >
                    {rule === 'X' ? (
                      <svg className="w-5 h-5 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-gray-400">{rule || '—'}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      {legend && Object.keys(legend).length > 0 && (
        <div className="mt-4 p-3 bg-white rounded border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">Legend:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {Object.entries(legend).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <span className="font-bold text-blue-900 mr-2 font-mono bg-blue-100 px-2 py-0.5 rounded">
                  {key || '(empty)'}
                </span>
                <span className="text-gray-700">= {value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DecisionTableDisplay
