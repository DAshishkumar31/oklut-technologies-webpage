-- ============================================================================
-- OKLUT Technologies — Supabase schema (employees / jobs / applications)
-- ----------------------------------------------------------------------------
-- Run this file in the Supabase SQL editor (or via `supabase db push`).
--
-- What it creates:
--   1. employees          — employee profiles linked to Supabase Auth users
--   2. jobs               — public job listings (publicly readable when active)
--   3. job_applications   — applications submitted through the Careers page
--   4. resumes            — PRIVATE storage bucket for uploaded resumes
--   5. Row Level Security on every table + storage policies
--
-- Security model:
--   - Public (anon) can ONLY read active jobs and submit applications.
--   - Public cannot read/update/delete applications or resumes.
--   - Authenticated employees can only read/update their OWN profile.
--   - No passwords are stored here — passwords live in Supabase Auth only.
-- ============================================================================

-- ============================================================================
-- 1. EMPLOYEES
-- ============================================================================
create table if not exists public.employees (
  id           uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete cascade,
  employee_id  text unique,                       -- e.g. "OKL-1042"
  full_name    text not null,
  email        text not null,
  department   text,
  designation  text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.employees is
  'Employee profiles. auth_user_id links to Supabase Auth (email + password).';

-- ============================================================================
-- 2. JOBS
-- ============================================================================
create table if not exists public.jobs (
  id              text primary key,               -- stable slug, e.g. "frontend-developer"
  title           text not null,
  department      text not null,
  location        text not null,                  -- e.g. "Hyderabad / Remote"
  employment_type text not null default 'Full Time',
  description     text not null,
  requirements    text[] not null default '{}',
  skills          text[] not null default '{}',
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.jobs is
  'Public job listings shown on the Careers page (only is_active = true).';

-- ============================================================================
-- 3. JOB APPLICATIONS
-- ============================================================================
create table if not exists public.job_applications (
  id         uuid primary key default gen_random_uuid(),
  job_id     text not null references public.jobs (id) on delete cascade,
  full_name  text not null,
  email      text not null,
  phone      text,
  message    text,
  resume_url text not null,                       -- path inside the private 'resumes' bucket
  status     text not null default 'new'
             check (status in ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  created_at timestamptz not null default now()
);

comment on table public.job_applications is
  'Applications from the Careers page. Read access is admin-only (add later).';

-- ============================================================================
-- 4. INDEXES
-- ============================================================================
create index if not exists jobs_active_idx
  on public.jobs (is_active, created_at desc);
create index if not exists employees_auth_user_idx
  on public.employees (auth_user_id);
create index if not exists employees_employee_id_idx
  on public.employees (employee_id);
create index if not exists job_applications_job_idx
  on public.job_applications (job_id);
create index if not exists job_applications_status_idx
  on public.job_applications (status);

-- ============================================================================
-- 5. UPDATED_AT TRIGGER
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists employees_set_updated_at on public.employees;
create trigger employees_set_updated_at
  before update on public.employees
  for each row execute function public.set_updated_at();

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
  before update on public.jobs
  for each row execute function public.set_updated_at();

-- ============================================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================================
alter table public.employees enable row level security;
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;

-- ---- employees ------------------------------------------------------------
-- Authenticated employees: read / insert / update ONLY their own profile.
create policy "employees select own profile"
  on public.employees for select
  using (auth.uid() = auth_user_id);

create policy "employees insert own profile"
  on public.employees for insert
  with check (auth.uid() = auth_user_id);

create policy "employees update own profile"
  on public.employees for update
  using (auth.uid() = auth_user_id);

-- ---- jobs -----------------------------------------------------------------
-- Public (and authenticated) users: read only active jobs.
create policy "jobs readable when active"
  on public.jobs for select
  using (is_active = true);

-- ---- job_applications ------------------------------------------------------
-- Public users may submit applications (only to existing, active jobs).
-- There are NO select / update / delete policies: applications stay
-- invisible to visitors. Grant admin access here later if needed.
create policy "applications insertable for active jobs"
  on public.job_applications for insert
  with check (
    exists (
      select 1 from public.jobs j
      where j.id = job_id and j.is_active
    )
  );

-- ============================================================================
-- 7. EMPLOYEE ID → EMAIL LOOKUP (optional login convenience)
-- ============================================================================
-- Lets the login form resolve "Email or employee ID" when the visitor types
-- an employee ID. Returns ONLY the email column for an exact ID match —
-- a narrow, security-definer helper (no broad USING (true) policies).
create or replace function public.employee_email_for_id(emp_id text)
returns text
language sql
security definer
set search_path = public
stable
as $$
  select email from public.employees where employee_id = emp_id limit 1;
$$;

revoke all on function public.employee_email_for_id(text) from public;
grant execute on function public.employee_email_for_id(text) to anon, authenticated;

-- ============================================================================
-- 8. STORAGE — PRIVATE RESUMES BUCKET
-- ============================================================================
-- Bucket is private (public = false): files are NOT exposed via public URLs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,
  5242880, -- 5 MB, matches frontend validation
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do nothing;

-- Anyone (including anon applicants) may UPLOAD into the resumes bucket.
create policy "resumes insertable by anyone"
  on storage.objects for insert
  with check (bucket_id = 'resumes');

-- Only authenticated users may READ resumes (admin access later).
create policy "resumes readable by authenticated"
  on storage.objects for select
  using (bucket_id = 'resumes' and auth.role() = 'authenticated');

-- ============================================================================
-- 9. SEED DATA — initial job listings (matches the site's original content)
-- ============================================================================
insert into public.jobs (id, title, department, location, employment_type, description, requirements, skills, is_active)
values
  (
    'frontend-developer',
    'Frontend Developer',
    'Engineering',
    'Hyderabad / Remote',
    'Full Time',
    'Build modern, scalable web experiences using React and modern technologies.',
    array['3+ years building production web apps', 'Strong JavaScript / TypeScript fundamentals', 'Experience with component-driven architecture', 'Eye for detail on performance and accessibility'],
    array['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    true
  ),
  (
    'backend-developer',
    'Backend Developer',
    'Engineering',
    'Hyderabad / Remote',
    'Full Time',
    'Design robust APIs, services and databases that power fast, reliable products.',
    array['3+ years building backend services', 'Solid database design and query tuning', 'Experience designing REST APIs', 'Understanding of cloud infrastructure'],
    array['Node.js', 'PostgreSQL', 'REST APIs', 'Cloud (AWS / Azure)'],
    true
  ),
  (
    'full-stack-developer',
    'Full Stack Developer',
    'Engineering',
    'Hyderabad / Remote',
    'Full Time',
    'Own features end to end — from interface to database — in a fast-moving product team.',
    array['Comfortable across the full stack', 'Experience shipping customer-facing features', 'Familiarity with CI/CD and containerised deploys', 'Strong problem-solving mindset'],
    array['React', 'Node.js', 'Databases', 'Docker', 'CI/CD'],
    true
  ),
  (
    'ui-ux-designer',
    'UI/UX Designer',
    'Design',
    'Hyderabad / Remote',
    'Full Time',
    'Craft clean, intuitive interfaces and design systems users love to work with.',
    array['Strong portfolio of product design work', 'Experience building and maintaining design systems', 'Proficiency in prototyping and user testing', 'Clear communication of design decisions'],
    array['Figma', 'Design Systems', 'Prototyping', 'Usability Testing'],
    true
  ),
  (
    'devops-engineer',
    'DevOps Engineer',
    'Cloud & DevOps',
    'Hyderabad / Remote',
    'Full Time',
    'Keep our cloud infrastructure fast, secure and automated across environments.',
    array['Experience managing cloud infrastructure', 'Hands-on with containers and orchestration', 'Infrastructure-as-code experience', 'Solid grasp of monitoring and observability'],
    array['AWS / Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    true
  ),
  (
    'business-development',
    'Business Development Executive',
    'Marketing',
    'Hyderabad / On-site',
    'Full Time',
    'Grow client relationships and open new doors for OKLUT''s technology services.',
    array['2+ years in IT services sales or BD', 'Proven ability to build client relationships', 'Strong written and verbal communication', 'Self-driven, target-oriented approach'],
    array['Lead Generation', 'Client Relations', 'IT Services Sales'],
    true
  )
on conflict (id) do nothing;

-- ============================================================================
-- 10. OPTIONAL — seed an employee profile (do this AFTER creating the auth user)
-- ============================================================================
-- 1. Create the user in Authentication → Users (email + password).
-- 2. Replace the auth_user_id below and run:
--
-- insert into public.employees (auth_user_id, employee_id, full_name, email, department, designation)
-- values (
--   'REPLACE-WITH-AUTH-USER-UUID',
--   'OKL-1001',
--   'Demo Employee',
--   'demo@oklut.com',
--   'Engineering',
--   'Software Engineer'
-- );