import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderKanban, Clock3, FileText, FileStack, LogOut, Loader2 } from "lucide-react";
import Tech3DBackground from "../components/animations/Tech3DBackground";
import AnimatedLogo from "../components/AnimatedLogo";
import usePageTitle from "../hooks/usePageTitle";
import { signOutEmployee, getEmployeeSession, getEmployeeProfile } from "../services/authService";
import { COMPANY } from "../data/content";
import { EASE } from "../animations/variants";

const MODULES = [
  { icon: FolderKanban, title: "Projects", description: "Track active builds, sprints and milestones." },
  { icon: Clock3, title: "Timesheets", description: "Log hours and review weekly submissions." },
  { icon: FileText, title: "Invoices", description: "View invoices and payment history." },
  { icon: FileStack, title: "Documents", description: "Company policies and shared resources." },
];

export default function EmployeeDashboard() {
  usePageTitle(`Employee Dashboard — ${COMPANY.name}`);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    getEmployeeSession().then((session) => {
      if (session?.user?.email) setEmail(session.user.email);
    });
    getEmployeeProfile().then((profile) => {
      if (profile?.full_name) setFullName(profile.full_name);
    });
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOutEmployee();
    navigate("/employee-login", { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-paper">
      <Tech3DBackground />

      <div className="container-x relative">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <AnimatedLogo dark />
            <span className="hidden h-5 w-px bg-white/15 sm:block" />
            <span className="hidden text-sm font-semibold tracking-wide text-paper/60 sm:block">
              Employee Portal
            </span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-paper/80 transition-all duration-200 hover:-translate-y-px hover:border-red-400/50 hover:text-red-200 disabled:opacity-60"
          >
            {signingOut ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <LogOut className="size-4" aria-hidden="true" />
            )}
            Sign out
          </button>
        </header>

        <main className="pb-24">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(30rem_14rem_at_90%_0%,rgb(91_91_239/0.22),transparent_65%)]"
              aria-hidden="true"
            />
            <p className="relative text-xs font-semibold tracking-[0.2em] text-accent">
              EMPLOYEE WORKSPACE
            </p>
            <h1 className="relative mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back{fullName ? `, ${fullName.split(" ")[0]}` : email ? `, ${email.split("@")[0]}` : ""}
            </h1>
            <p className="relative mt-3 max-w-lg text-sm leading-relaxed text-paper/55">
              Your secure workspace is being prepared. Project tracking, timesheets and
              invoicing modules are coming online — check back soon.
            </p>
          </motion.section>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {MODULES.map((module, i) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-ink-soft/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_40px_-12px_rgba(91,91,239,0.35)]"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent transition-colors duration-300 group-hover:bg-accent/25">
                  <module.icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-paper">{module.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-paper/50">
                  {module.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1 text-[0.65rem] font-bold tracking-wider text-mint">
                  <span className="size-1 rounded-full bg-mint" aria-hidden="true" />
                  COMING SOON
                </span>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}