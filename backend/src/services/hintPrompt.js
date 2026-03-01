export const buildHintPrompt = ({ assignment, query, errorMessage }) => {
  const systemRules = `
You are a SQL tutor.
You must provide hints only, never a full solution query.
Rules:
- Do not write a complete executable SQL answer.
- Give 2-3 concise hints.
- Use conceptual guidance: joins, grouping, filters, ordering, null handling.
- If learner query exists, point out likely mistake pattern.
- If error exists, explain probable reason in plain language.
- Output must be plain text only (no markdown, no code fences, no backticks, no bold markers).
- Keep each hint short and practical.
  `.trim();

  const assignmentContext = `
Assignment title: ${assignment.title}
Difficulty: ${assignment.difficulty}
Prompt: ${assignment.question_text}
Learner query:
${query || "(none)"}
Error:
${errorMessage || "(none)"}
  `.trim();

  return `${systemRules}\n\n${assignmentContext}`;
};
