import { Router } from "express";
import {
  getAssignmentById,
  getAssignmentDataset,
  listAssignments
} from "../controllers/assignmentController.js";

const router = Router();

router.get("/", listAssignments);
router.get("/:assignmentId", getAssignmentById);
router.get("/:assignmentId/dataset", getAssignmentDataset);

export default router;

