const BLOCKED_TOKENS = [
  "insert",
  "update",
  "delete",
  "drop",
  "alter",
  "create",
  "truncate",
  "grant",
  "revoke",
  "copy",
  "call",
  "do",
  "vacuum"
];

export const validateLearnerQuery = (rawQuery) => {
  if (!rawQuery || typeof rawQuery !== "string") {
    return { ok: false, message: "Query is required." };
  }

  const query = rawQuery.trim();
  if (!query) {
    return { ok: false, message: "Query cannot be empty." };
  }

  const normalized = query.replace(/\s+/g, " ").toLowerCase();

  const startsValid = normalized.startsWith("select") || normalized.startsWith("with");
  if (!startsValid) {
    return { ok: false, message: "Only SELECT/CTE queries are allowed." };
  }

  const semicolonCount = (query.match(/;/g) || []).length;
  const hasMidSemicolon = semicolonCount > 1 || (semicolonCount === 1 && !query.endsWith(";"));
  if (hasMidSemicolon) {
    return { ok: false, message: "Multiple SQL statements are not allowed." };
  }

  const hasBlocked = BLOCKED_TOKENS.some((token) => new RegExp(`\\b${token}\\b`, "i").test(normalized));
  if (hasBlocked) {
    return { ok: false, message: "Query contains restricted SQL commands." };
  }

  return { ok: true, query };
};

