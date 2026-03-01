const has = (text, token) => new RegExp(`\\b${token}\\b`, "i").test(text || "");

export const buildFallbackHint = ({ assignment, query, errorMessage }) => {
  const normalizedQuery = (query || "").toLowerCase();
  const tips = [];

  if (errorMessage) {
    tips.push(`Your last run failed with: ${errorMessage}. Check column/table names and aliases first.`);
  }

  if (!query || !query.trim()) {
    tips.push("Start with a small probe query like SELECT * FROM <table> LIMIT 5 to validate columns.");
  }

  if (assignment.title.toLowerCase().includes("spending") || has(assignment.question_text, "total")) {
    tips.push("Compute totals with SUM(...) and use GROUP BY for every non-aggregated selected column.");
  }

  if (has(assignment.question_text, "join") || has(normalizedQuery, "join")) {
    tips.push("Join on key relationships first, then apply filters. Validate row counts before aggregation.");
  } else {
    tips.push("Confirm FROM table and filtering logic before adding ORDER BY or aggregation.");
  }

  if (!has(normalizedQuery, "group by") && has(assignment.question_text, "count")) {
    tips.push("If you need counts per category, add GROUP BY on that category column.");
  }

  if (!has(normalizedQuery, "order by")) {
    tips.push("Add ORDER BY at the end to match requested ranking/sorting.");
  }

  return tips.slice(0, 4).join(" ");
};

