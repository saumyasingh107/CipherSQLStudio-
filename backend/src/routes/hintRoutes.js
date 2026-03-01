import { Router } from "express";
import { getHint } from "../controllers/hintController.js";

const router = Router();

router.post("/", getHint);

export default router;

