import { Router } from "express";
import { listMyAttempts } from "../controllers/attemptController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, listMyAttempts);

export default router;

