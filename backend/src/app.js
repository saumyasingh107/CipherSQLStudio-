import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";
import hintRoutes from "./routes/hintRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { attachUserIfAny } from "./middleware/auth.js";

const app = express();

app.use(
  cors({
    origin: env.frontendOrigins
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(attachUserIfAny);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/assignments", assignmentRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/hints", hintRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attempts", attemptRoutes);

app.use(errorHandler);

export default app;
