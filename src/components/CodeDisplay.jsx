function CodeDisplay({ visualAid }) {
  if (!visualAid || visualAid.type !== 'code') return null

  const { title, code, language, lineNumbers = true } = visualAid

  // Split code into lines
  const codeLines = code.split('\n')

  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg overflow-hidden my-4">
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h4 className="font-bold text-white text-base">{title}</h4>
          {language && (
            <span className="ml-auto text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
              {language}
            </span>
          )}
        </div>
      )}

      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono">
          {codeLines.map((line, idx) => (
            <div key={idx} className="flex">
              {lineNumbers && (
                <span className="select-none text-gray-500 pr-4 text-right" style={{ minWidth: '3em' }}>
                  {idx + 1}
                </span>
              )}
              <code className="text-gray-100">
                {line || ' '}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export default CodeDisplay
