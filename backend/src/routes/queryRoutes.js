import { Router } from "express";
import { executeQuery } from "../controllers/queryController.js";

const router = Router();

router.post("/execute", executeQuery);

export default router;

