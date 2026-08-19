import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, Upload, Check, Send, AlertTriangle } from "lucide-react";
import { JOBS } from "../../data/careers";
import { EASE } from "../../animations/variants";
import { validateResume, uploadResume, submitApplication } from "../../services/applicationService";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper placeholder:text-paper/35 transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function ApplicationModal({ job, onClose, jobs }) {
  const reduced = useReducedMotion();
  const fileRef = useRef(null);
  const options = jobs?.length ? jobs : JOBS;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: job?.title ?? "",
    resume: null,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | success
  const [stage, setStage] = useState("resume"); // resume | submit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) next.email = "Email address is required.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.position) next.position = "Please select a position.";
    const resumeError = validateResume(form.resume);
    if (resumeError) next.resume = resumeError;
    if (form.phone.trim() && !/^[+\d][\d\s\-()]{6,17}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid phone number.";
    }
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setFormError("");
    setStatus("uploading");
    setStage("resume");
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => Math.min(92, p + Math.max(4, Math.round((92 - p) * 0.25))));
    }, 130);

    try {
      const selectedJob = options.find((j) => j.title === form.position);
      const resume = await uploadResume(form.resume, selectedJob?.id);
      setStage("submit");
      await submitApplication({
        jobId: selectedJob?.id,
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        resumeUrl: resume.path,
      });
      clearInterval(timer);
      setProgress(100);
      setTimeout(() => setStatus("success"), reduced ? 0 : 350);
    } catch (error) {
      clearInterval(timer);
      setStatus("idle");
      setFormError(
        error?.message === "Please select a position."
          ? error.message
          : "We could not submit your application. Please check your connection and try again.",
      );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label="Job application"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 28, scale: reduced ? 1 : 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: reduced ? 1 : 0.97 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-accent/30 bg-[#0D1220]/90 shadow-[0_32px_80px_-20px_rgba(91,91,239,0.4)] backdrop-blur-2xl"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-h-[85dvh] overflow-y-auto p-6 sm:p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center py-10 text-center">
              <motion.span
                initial={{ scale: reduced ? 1 : 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className="relative grid size-20 place-items-center rounded-full border border-mint/40 bg-mint/10"
              >
                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-mint/40" aria-hidden="true" />
                <Check className="size-9 text-mint" aria-hidden="true" />
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
                className="mt-6 font-display text-2xl font-bold tracking-tight text-paper"
              >
                Application Submitted
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
                className="mt-3 max-w-sm text-sm leading-relaxed text-paper/60"
              >
                Thank you for your interest in joining OKLUT. Our team will review your application.
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-paper transition-all duration-300 hover:bg-accent-deep hover:shadow-glow"
              >
                Done
              </motion.button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Apply now</p>
                  <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-paper">
                    {job?.title ?? "OKLUT Careers"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close application form"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-paper/60 transition-colors hover:border-white/35 hover:text-paper"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs leading-relaxed text-red-200"
                  >
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-300" aria-hidden="true" />
                    {formError}
                  </motion.div>
                )}
                <div>
                  <label htmlFor="app-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                    Full name
                  </label>
                  <input
                    id="app-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="app-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                      Email
                    </label>
                    <input
                      id="app-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="app-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                      Phone
                    </label>
                    <input
                      id="app-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+91 ..."
                      className={inputClass}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="app-position" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                    Position
                  </label>
                  <select
                    id="app-position"
                    value={form.position}
                    onChange={(e) => set("position", e.target.value)}
                    className={`${inputClass} appearance-none bg-[#0D1220]`}
                  >
                    <option value="" disabled>
                      Select position
                    </option>
                    {options.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title} — {j.department}
                      </option>
                    ))}
                  </select>
                  {errors.position && <p className="mt-1.5 text-xs text-red-400">{errors.position}</p>}
                </div>

                <div>
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                    Resume upload
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => set("resume", e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3.5 text-sm text-paper/60 transition-colors hover:border-accent/50 hover:text-paper"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2">
                      <Upload className="size-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="truncate">{form.resume ? form.resume.name : "Choose file (PDF, DOC, DOCX)"}</span>
                    </span>
                    {form.resume && (
                      <span className="shrink-0 text-xs font-semibold text-mint">
                        {(form.resume.size / 1024).toFixed(0)} KB
                      </span>
                    )}
                  </button>
                  {errors.resume && <p className="mt-1.5 text-xs text-red-400">{errors.resume}</p>}
                </div>

                <div>
                  <label htmlFor="app-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                    Message
                  </label>
                  <textarea
                    id="app-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Tell us briefly about yourself…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "uploading" && (
                  <div aria-live="polite">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-violet"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-paper/50">
                      {stage === "resume" ? "Uploading resume…" : "Submitting application…"}{" "}
                      {Math.round(progress)}%
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "uploading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-paper transition-all duration-300 hover:bg-accent-deep hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="size-4" aria-hidden="true" />
                  {status === "uploading"
                    ? stage === "resume"
                      ? "Uploading resume…"
                      : "Submitting application…"
                    : "Submit Application"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}