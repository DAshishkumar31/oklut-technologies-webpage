import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { findAnswer } from "../data/chatKnowledge";

const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const AI_REQUEST_TIMEOUT_MS = 30000;
const MAX_MESSAGE_LENGTH = 1500;
const EDGE_FUNCTION_NAME = "ai-chat";

export const AI_ERRORS = {
  NETWORK: "network",
  MALFORMED: "malformed",
  RATE_LIMIT: "rate-limit",
  UNKNOWN: "unknown",
};

export const MESSAGE_LIMIT = 60;

export function validateMessage(text) {
  if (typeof text !== "string") return { ok: false, reason: "Invalid message." };
  const trimmed = text.trim();
  if (!trimmed) return { ok: false, reason: "Message cannot be empty." };
  if (trimmed.length > MAX_MESSAGE_LENGTH)
    return { ok: false, reason: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` };
  return { ok: true, text: trimmed };
}

function normalizeReply(payload) {
  if (!payload || typeof payload !== "object") return null;
  const candidates = [
    payload.reply,
    payload.answer,
    payload.message?.content,
    payload.choices?.[0]?.message?.content,
    payload.candidates?.[0]?.content?.parts?.[0]?.text,
    payload.content,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
  }
  return null;
}

function lastUserText(messages) {
  return [...messages].reverse().find((m) => m.sender === "user")?.text ?? "";
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(Object.assign(new Error("AI service timed out"), { code: AI_ERRORS.NETWORK })), ms);
    }),
  ]);
}

async function requestFromEdgeFunction(messages) {
  if (!isSupabaseConfigured()) {
    console.info("[AI CHAT] Supabase not configured (env vars missing) — skipping Edge Function");
    return null;
  }
  const message = lastUserText(messages);
  if (!message) return null;

  console.info("[AI CHAT] Calling Supabase Edge Function 'ai-chat'...", {
    message,
    historyCount: messages.slice(-12).length,
  });
  let result;
  try {
    result = await withTimeout(
      supabase.functions.invoke(EDGE_FUNCTION_NAME, {
        body: { message, history: messages.slice(-12) },
      }),
      AI_REQUEST_TIMEOUT_MS,
    );
  } catch (err) {
    console.warn("[AI CHAT] Edge Function call failed (network/timeout):", err?.message ?? err);
    throw Object.assign(new Error("AI service unreachable"), { code: AI_ERRORS.NETWORK });
  }

  if (result.error) {
    const status = result.error.context?.status ?? 0;
    console.warn(
      `[AI CHAT] Edge Function failed (HTTP ${status}):`,
      result.error.message ?? result.error,
    );
    if (status === 429) {
      throw Object.assign(new Error("Rate limited"), { code: AI_ERRORS.RATE_LIMIT });
    }
    throw Object.assign(new Error(`AI service responded ${status}`), { code: AI_ERRORS.UNKNOWN });
  }

  const reply = normalizeReply(result.data);
  if (!reply) {
    console.warn("[AI CHAT] Malformed function response:", result.data);
    throw Object.assign(new Error("Malformed AI response"), { code: AI_ERRORS.MALFORMED });
  }
  console.info("[AI CHAT] Function response received — REAL AI RESPONSE:", reply);
  return reply;
}

async function requestFromApi(messages, sessionId) {
  if (!AI_API_URL) return null;
  let response;
  try {
    response = await fetch(AI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.slice(-12),
        sessionId,
        context: { source: "oklut-website", knowledge: "chatKnowledge-v1" },
      }),
      signal: AbortSignal.timeout(AI_REQUEST_TIMEOUT_MS),
    });
  } catch {
    throw Object.assign(new Error("AI service unreachable"), { code: AI_ERRORS.NETWORK });
  }
  if (!response.ok) {
    if (response.status === 429) {
      throw Object.assign(new Error("Rate limited"), { code: AI_ERRORS.RATE_LIMIT });
    }
    throw Object.assign(new Error(`AI service responded ${response.status}`), { code: AI_ERRORS.UNKNOWN });
  }
  let payload;
  try {
    payload = await response.json();
  } catch {
    throw Object.assign(new Error("Malformed AI response"), { code: AI_ERRORS.MALFORMED });
  }
  const reply = normalizeReply(payload);
  if (!reply) {
    throw Object.assign(new Error("Malformed AI response"), { code: AI_ERRORS.MALFORMED });
  }
  return reply;
}

export async function sendChatMessage({ messages, sessionId }) {
  const edgeReply = await requestFromEdgeFunction(messages);
  if (edgeReply) return edgeReply;

  console.info("[AI CHAT] Edge Function skipped/unavailable — trying VITE_AI_API_URL backend");
  const apiReply = await requestFromApi(messages, sessionId);
  if (apiReply) return apiReply;

  console.warn("[AI CHAT] No backend available — falling back to offline knowledge base");
  return findAnswer(lastUserText(messages));
}