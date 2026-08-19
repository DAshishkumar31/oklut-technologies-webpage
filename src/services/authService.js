import { supabase, isSupabaseConfigured } from "../lib/supabase";

const DEMO_EMAIL = "demo@oklut.com";
const DEMO_PASSWORD = "demo1234";
const DEMO_KEY = "oklut-employee-demo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  NETWORK: "NETWORK",
  UNKNOWN: "UNKNOWN",
};

function invalidCredentials() {
  const err = new Error("Invalid email or password.");
  err.code = AUTH_ERRORS.INVALID_CREDENTIALS;
  return err;
}

async function resolveEmail(emailOrId) {
  const input = emailOrId.trim();
  if (EMAIL_RE.test(input)) return input;
  const { data } = await supabase.rpc("employee_email_for_id", { emp_id: input });
  return data ?? null;
}

export async function signInEmployee(emailOrId, password) {
  const input = emailOrId.trim();

  if (input.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
    sessionStorage.setItem(DEMO_KEY, "1");
    return { user: { email: input }, isDemo: true };
  }

  if (!isSupabaseConfigured()) {
    throw invalidCredentials();
  }

  try {
    const email = await resolveEmail(input);
    if (!email) throw invalidCredentials();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw invalidCredentials();
    return data;
  } catch (error) {
    if (error?.code === AUTH_ERRORS.INVALID_CREDENTIALS) throw error;
    const err = new Error("Unable to reach the authentication service.");
    err.code = AUTH_ERRORS.NETWORK;
    throw err;
  }
}

export async function signOutEmployee() {
  sessionStorage.removeItem(DEMO_KEY);
  if (isSupabaseConfigured()) {
    try {
      await supabase.auth.signOut();
    } catch {
      // session cleanup is best-effort
    }
  }
}

export async function getEmployeeSession() {
  if (sessionStorage.getItem(DEMO_KEY) === "1") {
    return { demo: true, user: { email: DEMO_EMAIL } };
  }
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

export async function getEmployeeProfile() {
  if (!isSupabaseConfigured()) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("employees")
    .select("id, employee_id, full_name, email, department, designation, avatar_url")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  return data ?? null;
}