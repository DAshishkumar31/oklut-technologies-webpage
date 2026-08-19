import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabaseUrl && !supabaseAnonKey) {
  console.info("[SUPABASE] Not configured (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY missing) — demo mode.");
} else if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    `[SUPABASE] Client NOT initialized — ${!supabaseUrl ? "VITE_SUPABASE_URL" : "VITE_SUPABASE_ANON_KEY"} is empty in .env.local`,
  );
} else {
  console.info("[SUPABASE] Client initialized:", supabaseUrl);
}

export const isSupabaseConfigured = () => Boolean(supabase);