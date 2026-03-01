import { env } from "../config/env.js";
import { pgPool } from "../config/postgres.js";
import { buildFallbackHint } from "../services/fallbackHint.js";
import { generateGeminiHint } from "../services/geminiHint.js";

export const getHint = async (req, res, next) => {
  try {
    const { assignmentId, query, errorMessage } = req.body;

    const { rows } = await pgPool.query(
      `
      SELECT id, title, difficulty, question_text
      FROM assignments
      WHERE id = $1
      `,
      [Number(assignmentId)]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (!env.geminiApiKey) {
      return res.json({
        hint: buildFallbackHint({ assignment: rows[0], query, errorMessage }),
        fallback: true
      });
    }

    try {
      const hint = await generateGeminiHint({ assignment: rows[0], query, errorMessage });
      return res.json({ hint });
    } catch (llmError) {
      return res.json({
        hint: buildFallbackHint({ assignment: rows[0], query, errorMessage }),
        fallback: true,
        llmError: llmError.message
      });
    }
  } catch (error) {
    return next(error);
  }
};
