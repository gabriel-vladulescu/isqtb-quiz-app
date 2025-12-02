function StateTransitionDisplay({ visualAid }) {
  if (!visualAid || !['stateTransitionTable', 'stateTransitionDiagram'].includes(visualAid.type)) {
    return null
  }

  if (visualAid.type === 'stateTransitionTable') {
    return <StateTransitionTable visualAid={visualAid} />
  } else {
    return <StateTransitionDiagram visualAid={visualAid} />
  }
}

function StateTransitionTable({ visualAid }) {
  const { title, headers, rows, invalidTransitions } = visualAid

  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 my-4">
      <h4 className="font-bold text-green-900 mb-4 text-lg flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {title || 'State Transition Table'}
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-green-600 text-white">
              {headers.map((header, idx) => (
                <th key={idx} className="border-2 border-green-700 px-4 py-2 text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-green-50">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`border-2 border-green-200 px-4 py-2 ${
                      cellIdx === 0 || cellIdx === 2
                        ? 'font-semibold text-green-900 bg-green-50'
                        : 'text-gray-900'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invalidTransitions && invalidTransitions.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-sm font-semibold text-red-900 mb-2">Invalid Transitions:</p>
          <ul className="space-y-1 text-sm text-red-800">
            {invalidTransitions.map((trans, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>
                  <strong>{trans.from}</strong> → <strong>{trans.event}</strong>
                  {trans.description && `: ${trans.description}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function StateTransitionDiagram({ visualAid }) {
  const { title, states, transitions } = visualAid

  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 my-4">
      <h4 className="font-bold text-green-900 mb-4 text-lg flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {title || 'State Transition Diagram'}
      </h4>

      <div className="bg-white rounded-lg p-6 border border-green-200">
        {/* States */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-green-900 mb-3">States:</p>
          <div className="flex flex-wrap gap-3">
            {states.map((state) => (
              <div
                key={state.id}
                className={`px-4 py-2 rounded-lg border-2 font-medium ${
                  state.isInitial
                    ? 'bg-blue-100 border-blue-500 text-blue-900'
                    : state.isFinal
                    ? 'bg-gray-100 border-gray-500 text-gray-900 border-double'
                    : 'bg-green-100 border-green-500 text-green-900'
                }`}
              >
                {state.label}
                {state.isInitial && <span className="ml-2 text-xs">(Initial)</span>}
                {state.isFinal && <span className="ml-2 text-xs">(Final)</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Transitions */}
        <div>
          <p className="text-sm font-semibold text-green-900 mb-3">Transitions:</p>
          <div className="space-y-2">
            {transitions.map((trans, idx) => {
              const fromState = states.find(s => s.id === trans.from)
              const toState = states.find(s => s.id === trans.to)

              return (
                <div
                  key={idx}
                  className="flex items-center p-3 bg-white rounded border border-green-200 hover:bg-green-50"
                >
                  <span className="font-semibold text-green-900 px-3 py-1 bg-green-100 rounded">
                    {fromState?.label || trans.from}
                  </span>
                  <div className="mx-3 flex-1">
                    <svg className="w-full h-6" viewBox="0 0 100 24">
                      <defs>
                        <marker
                          id={`arrowhead-${idx}`}
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
                        </marker>
                      </defs>
                      <line
                        x1="0"
                        y1="12"
                        x2="100"
                        y2="12"
                        stroke="#059669"
                        strokeWidth="2"
                        markerEnd={`url(#arrowhead-${idx})`}
                      />
                      <text x="50" y="8" textAnchor="middle" fontSize="10" fill="#047857">
                        {trans.event}
                      </text>
                    </svg>
                    {trans.action && (
                      <p className="text-xs text-gray-600 text-center mt-1">
                        Action: {trans.action}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold text-green-900 px-3 py-1 bg-green-100 rounded">
                    {toState?.label || trans.to}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StateTransitionDisplay
