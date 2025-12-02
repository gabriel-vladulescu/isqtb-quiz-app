function TableDisplay({ visualAid }) {
  if (!visualAid) return null

  const { type, title, headers, rows } = visualAid

  // Determine color scheme based on table type
  const getColorScheme = () => {
    switch (type) {
      case 'equivalencePartitionTable':
        return {
          border: 'border-amber-200',
          header: 'bg-amber-600 text-white border-amber-700',
          row: 'hover:bg-amber-50',
          bg: 'bg-amber-50',
          title: 'text-amber-900'
        }
      case 'boundaryValueTable':
        return {
          border: 'border-orange-200',
          header: 'bg-orange-600 text-white border-orange-700',
          row: 'hover:bg-orange-50',
          bg: 'bg-orange-50',
          title: 'text-orange-900'
        }
      default:
        return {
          border: 'border-gray-200',
          header: 'bg-gray-600 text-white border-gray-700',
          row: 'hover:bg-gray-50',
          bg: 'bg-gray-50',
          title: 'text-gray-900'
        }
    }
  }

  const colors = getColorScheme()

  const getIcon = () => {
    if (type === 'equivalencePartitionTable') {
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    } else if (type === 'boundaryValueTable') {
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  }

  // Special handling for boundary value tables
  const isBoundaryTable = type === 'boundaryValueTable'
  const isEquivalenceTable = type === 'equivalencePartitionTable'

  return (
    <div className={`${colors.bg} border-2 ${colors.border} rounded-lg p-5 my-4`}>
      <h4 className={`font-bold ${colors.title} mb-4 text-lg flex items-center`}>
        {getIcon()}
        {title || 'Data Table'}
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className={colors.header}>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className={`border-2 ${colors.header} px-4 py-2 text-left font-semibold`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className={colors.row}>
                {row.map((cell, cellIdx) => {
                  // Highlight Valid/Invalid in equivalence partition tables
                  let cellClass = `border-2 ${colors.border} px-4 py-2`

                  if (isEquivalenceTable && cellIdx === 2) {
                    // Valid/Invalid column
                    if (cell.toLowerCase() === 'valid') {
                      cellClass += ' bg-green-100 text-green-900 font-semibold'
                    } else if (cell.toLowerCase() === 'invalid') {
                      cellClass += ' bg-red-100 text-red-900 font-semibold'
                    }
                  } else if (isBoundaryTable && cellIdx === 0) {
                    // Boundary column - highlight min/max
                    if (cell.toLowerCase().includes('min') || cell.toLowerCase().includes('max')) {
                      cellClass += ' bg-orange-100 font-semibold text-orange-900'
                    }
                  }

                  return (
                    <td key={cellIdx} className={cellClass}>
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional info for specific table types */}
      {isBoundaryTable && visualAid.boundaryType && (
        <div className="mt-3 p-2 bg-white rounded border border-orange-200">
          <p className="text-sm text-orange-800">
            <span className="font-semibold">Type:</span> {visualAid.boundaryType} BVA
          </p>
        </div>
      )}
    </div>
  )
}

export default TableDisplay
