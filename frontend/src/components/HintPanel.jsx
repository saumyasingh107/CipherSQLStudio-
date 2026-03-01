const HintPanel = ({ hint, loading, onGetHint }) => {
  return (
    <div className="panel">
      <div className="panel__header panel__header--row">
        <h2>Hint Assistant</h2>
        <button className="btn" type="button" onClick={onGetHint} disabled={loading}>
          {loading ? "Generating..." : "Get Hint"}
        </button>
      </div>
      <div className="panel__body">
        {hint ? <p className="hint-text">{hint}</p> : <p>Use hints to unblock yourself without revealing the full answer.</p>}
      </div>
    </div>
  );
};

export default HintPanel;

