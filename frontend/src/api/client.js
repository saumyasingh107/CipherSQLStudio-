const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const withAuth = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

const toJson = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }
  return data;
};

export const apiClient = {
  listAssignments: async () => {
    const response = await fetch(`${API_BASE_URL}/assignments`);
    return toJson(response);
  },

  getAssignment: async (assignmentId) => {
    const response = await fetch(`${API_BASE_URL}/assignments/${assignmentId}`);
    return toJson(response);
  },

  getDataset: async (assignmentId) => {
    const response = await fetch(`${API_BASE_URL}/assignments/${assignmentId}/dataset`);
    return toJson(response);
  },

  executeQuery: async (payload) => {
    const token = payload.token || "";
    const body = { assignmentId: payload.assignmentId, query: payload.query };
    const response = await fetch(`${API_BASE_URL}/query/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...withAuth(token) },
      body: JSON.stringify(body)
    });
    return toJson(response);
  },

  getHint: async (payload) => {
    const response = await fetch(`${API_BASE_URL}/hints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return toJson(response);
  },

  signup: async (payload) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return toJson(response);
  },

  login: async (payload) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return toJson(response);
  },

  me: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: withAuth(token)
    });
    return toJson(response);
  },

  getMyAttempts: async ({ token, assignmentId }) => {
    const query = assignmentId ? `?assignmentId=${assignmentId}` : "";
    const response = await fetch(`${API_BASE_URL}/attempts/me${query}`, {
      headers: withAuth(token)
    });
    return toJson(response);
  }
};
