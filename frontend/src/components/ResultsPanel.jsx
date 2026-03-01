const ResultsPanel = ({ result, error }) => {
  return (
    <div className="panel">
      <div className="panel__header">
        <h2>Results</h2>
      </div>
      <div className="panel__body">
        {error && <p className="status status--error">{error}</p>}
        {!error && !result && <p>Run a query to see output.</p>}
        {!error && result && (
          <>
            <p className="status status--success">{result.rowCount} row(s) returned</p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    {result.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {result.columns.map((column) => (
                        <td key={`${rowIndex}-${column}`}>{String(row[column] ?? "NULL")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;

