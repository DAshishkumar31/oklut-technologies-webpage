import { supabase, isSupabaseConfigured } from "../lib/supabase";

export const RESUME_ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const RESUME_MAX_SIZE = 5 * 1024 * 1024;

export function validateResume(file) {
  if (!file) return "Please upload your resume (PDF, DOC or DOCX).";
  if (!RESUME_ALLOWED_TYPES.includes(file.type))
    return "Only PDF, DOC and DOCX files are allowed.";
  if (file.size > RESUME_MAX_SIZE) return "File must be under 5 MB.";
  return null;
}

function safeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
}

export async function uploadResume(file, jobId) {
  if (!isSupabaseConfigured()) {
    return { path: `mock/${jobId ?? "general"}/${safeFileName(file.name)}`, mock: true };
  }
  const ext = file.name.split(".").pop() ?? "";
  const path = `${jobId ?? "general"}/${Date.now()}-${safeFileName(file.name)}${ext ? `.${ext}` : ""}`;
  const { error } = await supabase.storage
    .from("resumes")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  return { path };
}

export async function submitApplication({
  jobId,
  fullName,
  email,
  phone,
  message,
  resumeUrl,
}) {
  if (!isSupabaseConfigured()) {
    return { ok: true, mock: true };
  }
  if (!jobId) throw new Error("Please select a position.");
  const { error } = await supabase.from("job_applications").insert({
    job_id: jobId,
    full_name: fullName,
    email,
    phone: phone || null,
    message: message || null,
    resume_url: resumeUrl,
    status: "new",
  });
  if (error) throw new Error(error.message);
  return { ok: true };
}