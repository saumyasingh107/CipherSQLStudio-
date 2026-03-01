import { env } from "../config/env.js";
import { buildHintPrompt } from "./hintPrompt.js";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

const sanitizeHintText = (text) => {
  return String(text || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export const generateGeminiHint = async ({ assignment, query, errorMessage }) => {
  if (!env.geminiApiKey) {
    throw new Error("Gemini API key missing.");
  }

  const response = await fetch(`${GEMINI_BASE_URL}/${env.geminiModel}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": env.geminiApiKey
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: buildHintPrompt({ assignment, query, errorMessage })
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.5
      }
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${body}`);
  }

  const data = await response.json();
  const rawHint =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("\n")
      .trim() || "Try simplifying your query into smaller checks.";

  return sanitizeHintText(rawHint);
};

