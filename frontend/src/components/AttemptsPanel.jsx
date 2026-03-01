const AttemptsPanel = ({ attempts }) => {
  return (
    <div className="panel">
      <div className="panel__header">
        <h2>My Recent Attempts</h2>
      </div>
      <div className="panel__body">
        {!attempts.length && <p>No attempts saved yet.</p>}
        {attempts.map((item) => (
          <div className="attempt-item" key={item.id}>
            <div className="attempt-item__meta">
              <span className={`status ${item.status === "success" ? "status--success" : "status--error"}`}>
                {item.status}
              </span>
              <small>{new Date(item.createdAt).toLocaleString()}</small>
            </div>
            <code>{item.query}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttemptsPanel;

