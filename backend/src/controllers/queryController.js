import mongoose from "mongoose";
import { pgPool } from "../config/postgres.js";
import { Attempt } from "../models/Attempt.js";
import { validateLearnerQuery } from "../services/sqlValidation.js";

export const executeQuery = async (req, res, next) => {
  const { assignmentId, query } = req.body;
  const assignmentIdNumber = Number(assignmentId);

  const validation = validateLearnerQuery(query);
  if (!validation.ok) {
    return res.status(400).json({ message: validation.message });
  }

  const client = await pgPool.connect();
  let status = "success";
  let errorMessage = null;
  let rowCount = 0;
  let safeQuery = validation.query;

  try {
    await client.query("BEGIN");
    await client.query("SET TRANSACTION READ ONLY");
    await client.query("SET LOCAL statement_timeout = 8000");

    const result = await client.query(validation.query);
    rowCount = result.rowCount || result.rows.length;

    await client.query("COMMIT");

    res.json({
      columns: result.fields.map((field) => field.name),
      rows: result.rows,
      rowCount
    });
  } catch (error) {
    status = "error";
    errorMessage = error.message;
    try {
      await client.query("ROLLBACK");
    } catch {
      // Ignore rollback errors and return original SQL execution error.
    }
    res.status(400).json({ message: error.message });
  } finally {
    client.release();

    if (mongoose.connection.readyState === 1 && Number.isFinite(assignmentIdNumber)) {
      await Attempt.create({
        userId: req.user?._id || null,
        assignmentId: assignmentIdNumber,
        query: safeQuery,
        status,
        errorMessage,
        rowCount
      }).catch(() => null);
    }
  }
};
