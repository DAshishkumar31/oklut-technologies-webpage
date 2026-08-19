import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { JOBS } from "../data/careers";

const JOB_SELECT =
  "id, title, department, location, employment_type, description, requirements, skills, created_at";

function mapJob(row) {
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    type: row.employment_type,
    description: row.description,
    requirements: Array.isArray(row.requirements) ? row.requirements : [],
    skills: Array.isArray(row.skills) ? row.skills : [],
  };
}

export async function fetchActiveJobs() {
  if (!isSupabaseConfigured()) {
    return JOBS;
  }
  const { data, error } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapJob);
}