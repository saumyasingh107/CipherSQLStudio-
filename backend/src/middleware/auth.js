import { User } from "../models/User.js";
import { verifyAuthToken } from "../services/authToken.js";

const getBearerToken = (req) => {
  const raw = req.headers.authorization || "";
  if (!raw.startsWith("Bearer ")) {
    return null;
  }
  return raw.slice(7).trim();
};

export const attachUserIfAny = async (req, res, next) => {
  try {
    const token = getBearerToken(req);
    if (!token) {
      return next();
    }

    const payload = verifyAuthToken(token);
    const user = await User.findById(payload.sub).select("_id name email");
    if (user) {
      req.user = user;
    }
    return next();
  } catch {
    return next();
  }
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }
  return next();
};

