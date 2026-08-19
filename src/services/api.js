import { supabase } from "../lib/supabase";

export async function submitContactMessage(payload) {
  if (!supabase) {
    return { ok: true, mock: true };
  }
  const { error } = await supabase.from("contact_messages").insert([payload]);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function signInClient(email, password) {
  if (!supabase) {
    return { ok: true, mock: true };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return { ok: true, user: data.user };
}