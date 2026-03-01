import mongoose from "mongoose";
import { Attempt } from "../models/Attempt.js";

export const listMyAttempts = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ attempts: [] });
    }

    const assignmentId = Number(req.query.assignmentId);
    const filter = { userId: req.user._id };
    if (Number.isFinite(assignmentId)) {
      filter.assignmentId = assignmentId;
    }

    const attempts = await Attempt.find(filter)
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.json({
      attempts: attempts.map((item) => ({
        id: item._id.toString(),
        assignmentId: item.assignmentId,
        query: item.query,
        status: item.status,
        errorMessage: item.errorMessage,
        rowCount: item.rowCount,
        createdAt: item.createdAt
      }))
    });
  } catch (error) {
    return next(error);
  }
};

