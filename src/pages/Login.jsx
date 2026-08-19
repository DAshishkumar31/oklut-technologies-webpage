import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, Phone } from "lucide-react";
import AnimatedLogo from "../components/AnimatedLogo";
import { COMPANY } from "../data/content";
import { signInClient } from "../services/api";
import { EASE } from "../animations/variants";
import usePageTitle from "../hooks/usePageTitle";
import TechShapes3D from "../components/effects/TechShapes3D";

export default function Login() {
  usePageTitle(`Client Portal — ${COMPANY.name}`);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      await signInClient(email, password);
      setStatus("success");
    } catch {
      setError("Invalid credentials. Please try again.");
      setStatus("idle");
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50";

  return (
    <div className="grid min-h-screen bg-paper lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-ink p-12 text-paper lg:flex lg:flex-col lg:justify-between">
        <TechShapes3D sparse className="opacity-70" />
        <div
          className="absolute inset-0 bg-[radial-gradient(36rem_24rem_at_20%_110%,rgb(91_91_239/0.3),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <AnimatedLogo dark />
        </div>
        <div className="relative">
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight">
            Your projects, <span className="text-gradient">one dashboard</span>
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-paper/60">
            Active Oklut clients get a dedicated portal for project tracking, reporting, invoices
            and direct line to your team.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-paper/70">
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-mint" aria-hidden="true" />
              Secure access for authorised clients only
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-mint" aria-hidden="true" />
              Support available 24/7 — {COMPANY.phone}
            </li>
          </ul>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-5 py-16 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-full max-w-md"
        >
          <div className="mb-10 flex items-center justify-between">
            <AnimatedLogo />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <ArrowRight className="size-4 rotate-180" aria-hidden="true" />
              Back to site
            </Link>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-ink">Welcome back</h2>
          <p className="mt-2 text-sm text-muted">Sign in to the Oklut client portal.</p>

          {status === "success" ? (
            <div className="mt-10 rounded-3xl border border-line bg-paper-soft p-8 text-center" role="status">
              <p className="font-display text-lg font-bold text-ink">You're signed in</p>
              <p className="mt-2 text-sm text-muted">
                This is a demo portal — project dashboards are provisioned for active clients.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                Back to home
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-ink">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/30" aria-hidden="true" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={`${inputClasses} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-ink">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/30" aria-hidden="true" />
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClasses} pl-11`}
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-paper transition-all duration-300 hover:bg-accent hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-relaxed text-muted">
                Not a client yet?{" "}
                <Link to="/contact" className="font-semibold text-accent hover:underline">
                  Start a project
                </Link>{" "}
                and get portal access with your engagement.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}