import { supabase, isSupabaseConfigured } from "../lib/supabase";

export async function ensureChatSession(sessionId) {
  if (!isSupabaseConfigured()) return;
  try {
    const { error } = await supabase.from("chat_sessions").upsert(
      { id: sessionId, user_id: null },
      { onConflict: "id" },
    );
    if (error) logChatStorageError("chat_sessions upsert", error);
  } catch (err) {
    logChatStorageError("chat_sessions upsert", err);
  }
}

export async function persistChatMessage(sessionId, sender, content) {
  if (!isSupabaseConfigured()) return;
  try {
    const { error } = await supabase.from("chat_messages").insert({
      session_id: sessionId,
      sender,
      content,
    });
    if (error) logChatStorageError("chat_messages insert", error);
  } catch (err) {
    logChatStorageError("chat_messages insert", err);
  }
}

function logChatStorageError(operation, error) {
  const status = error?.status ?? error?.code ?? "unknown";
  const hint =
    status === 404
      ? " (table missing — run supabase/schema.sql in the Supabase SQL editor)"
      : status === 403
        ? " (RLS policy blocking — check supabase/schema.sql policies)"
        : "";
  console.warn(`[CHAT STORAGE] ${operation} failed (${status})${hint}:`, error?.message ?? error);
}