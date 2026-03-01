import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../api/client.js";
import SampleDataViewer from "../components/SampleDataViewer.jsx";
import SqlEditor from "../components/SqlEditor.jsx";
import ResultsPanel from "../components/ResultsPanel.jsx";
import HintPanel from "../components/HintPanel.jsx";
import AttemptsPanel from "../components/AttemptsPanel.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const DEFAULT_QUERY = "SELECT * FROM customers LIMIT 5;";

const AssignmentAttemptPage = () => {
  const { token } = useAuth();
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [dataset, setDataset] = useState([]);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState(null);
  const [runError, setRunError] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [requestingHint, setRequestingHint] = useState(false);
  const [attempts, setAttempts] = useState([]);

  const parsedAssignmentId = useMemo(() => Number(assignmentId), [assignmentId]);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [assignmentResponse, datasetResponse, attemptsResponse] = await Promise.all([
          apiClient.getAssignment(parsedAssignmentId),
          apiClient.getDataset(parsedAssignmentId),
          apiClient.getMyAttempts({ token, assignmentId: parsedAssignmentId })
        ]);
        setAssignment(assignmentResponse.assignment);
        setDataset(datasetResponse.dataset || []);
        setAttempts(attemptsResponse.attempts || []);
      } catch (error) {
        setRunError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [parsedAssignmentId, token]);

  const handleExecute = async () => {
    try {
      setRunning(true);
      setRunError("");
      const response = await apiClient.executeQuery({
        assignmentId: parsedAssignmentId,
        query,
        token
      });
      setResult(response);
      const attemptsResponse = await apiClient.getMyAttempts({ token, assignmentId: parsedAssignmentId });
      setAttempts(attemptsResponse.attempts || []);
    } catch (error) {
      setResult(null);
      setRunError(error.message);
    } finally {
      setRunning(false);
    }
  };

  const handleHint = async () => {
    try {
      setRequestingHint(true);
      const response = await apiClient.getHint({
        assignmentId: parsedAssignmentId,
        query,
        errorMessage: runError
      });
      setHint(response.hint);
    } catch (error) {
      setHint(error.message);
    } finally {
      setRequestingHint(false);
    }
  };

  if (loading) {
    return <main className="page">Loading assignment...</main>;
  }

  return (
    <main className="page page--attempt">
      <div className="attempt-head">
        <Link to="/" className="attempt-head__back">
          Back to assignments
        </Link>
        {assignment && (
          <>
            <h1>{assignment.title}</h1>
            <p>{assignment.question_text}</p>
          </>
        )}
      </div>

      <div className="attempt-grid">
        <div className="attempt-grid__left">
          <SampleDataViewer dataset={dataset} />
        </div>
        <div className="attempt-grid__right">
          <SqlEditor value={query} onChange={setQuery} />
          <div className="action-row">
            <button className="btn btn--primary" type="button" onClick={handleExecute} disabled={running}>
              {running ? "Running..." : "Execute Query"}
            </button>
          </div>
          <ResultsPanel result={result} error={runError} />
          <HintPanel hint={hint} loading={requestingHint} onGetHint={handleHint} />
          <AttemptsPanel attempts={attempts} />
        </div>
      </div>
    </main>
  );
};

export default AssignmentAttemptPage;
