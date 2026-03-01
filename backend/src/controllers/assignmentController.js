import { pgPool } from "../config/postgres.js";

export const listAssignments = async (req, res, next) => {
  try {
    const { rows } = await pgPool.query(
      `
      SELECT id, title, description, difficulty
      FROM assignments
      ORDER BY id ASC
      `
    );

    res.json({ assignments: rows });
  } catch (error) {
    next(error);
  }
};

export const getAssignmentById = async (req, res, next) => {
  try {
    const assignmentId = Number(req.params.assignmentId);
    const { rows } = await pgPool.query(
      `
      SELECT id, title, description, difficulty, question_text
      FROM assignments
      WHERE id = $1
      `,
      [assignmentId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    return res.json({ assignment: rows[0] });
  } catch (error) {
    return next(error);
  }
};

export const getAssignmentDataset = async (req, res, next) => {
  const client = await pgPool.connect();
  try {
    const assignmentId = Number(req.params.assignmentId);

    const { rows: tableRows } = await client.query(
      `
      SELECT table_name
      FROM assignment_tables
      WHERE assignment_id = $1
      ORDER BY table_name
      `,
      [assignmentId]
    );

    if (!tableRows.length) {
      return res.status(404).json({ message: "No sample tables mapped to this assignment." });
    }

    const dataset = [];
    for (const tableRow of tableRows) {
      const tableName = tableRow.table_name;
      const safeTable = tableName.replace(/"/g, "");

      const { rows: schemaRows } = await client.query(
        `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position
        `,
        [safeTable]
      );

      const { rows: sampleRows } = await client.query(
        `SELECT * FROM "${safeTable}" LIMIT 20`
      );

      dataset.push({
        tableName: safeTable,
        schema: schemaRows,
        rows: sampleRows
      });
    }

    return res.json({ dataset });
  } catch (error) {
    return next(error);
  } finally {
    client.release();
  }
};

