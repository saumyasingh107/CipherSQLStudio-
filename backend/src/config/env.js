import dotenv from "dotenv";

dotenv.config({ override: true });

export const env = {
  port: Number(process.env.PORT || 5000),
  frontendOrigins: (process.env.FRONTEND_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
  postgres: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT || 5432),
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "ciphersqlstudio",
    ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false
  },
  mongodbUri: process.env.MONGODB_URI || process.env.MONGO_URI || "",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-flash-latest",
  jwtSecret: process.env.JWT_SECRET || "change_me_super_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d"
};
