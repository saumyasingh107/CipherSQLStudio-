import { Navigate, Route, Routes } from "react-router-dom";
import AssignmentListPage from "./pages/AssignmentListPage.jsx";
import AssignmentAttemptPage from "./pages/AssignmentAttemptPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AssignmentListPage />} />
      <Route
        path="/assignments/:assignmentId"
        element={
          <ProtectedRoute>
            <AssignmentAttemptPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
