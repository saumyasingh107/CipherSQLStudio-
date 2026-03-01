const SampleDataViewer = ({ dataset }) => {
  return (
    <div className="panel">
      <div className="panel__header">
        <h2>Sample Data</h2>
      </div>
      <div className="panel__body">
        {!dataset.length && <p>No sample data configured.</p>}
        {dataset.map((table) => (
          <section className="table-block" key={table.tableName}>
            <h3>{table.tableName}</h3>
            <div className="table-block__schema">
              {table.schema.map((column) => (
                <span key={column.column_name}>
                  {column.column_name} <strong>({column.data_type})</strong>
                </span>
              ))}
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    {table.schema.map((column) => (
                      <th key={column.column_name}>{column.column_name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={`${table.tableName}-${rowIndex}`}>
                      {table.schema.map((column) => (
                        <td key={`${table.tableName}-${rowIndex}-${column.column_name}`}>
                          {String(row[column.column_name] ?? "NULL")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SampleDataViewer;

