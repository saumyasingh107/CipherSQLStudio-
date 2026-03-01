import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../api/client.js";
import AssignmentCard from "../components/AssignmentCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const AssignmentListPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const data = await apiClient.listAssignments();
        setAssignments(data.assignments || []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  return (
    <main className="page page--listing">
      <header className="hero">
        <p className="hero__eyebrow">CipherSQLStudio</p>
        <div className="top-nav">
          {isAuthenticated ? (
            <>
              <span>Hi, {user.name}</span>
              <button className="btn" type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">
                Login
              </Link>
              <Link className="btn btn--primary" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <h1>SQL Assignments</h1>
        <p>Choose an assignment, write SQL, execute instantly, and use guided hints.</p>
      </header>

      {loading && <p>Loading assignments...</p>}
      {error && <p className="status status--error">{error}</p>}

      {!loading && !error && (
        <section className="assignment-grid">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </section>
      )}
    </main>
  );
};

export default AssignmentListPage;
