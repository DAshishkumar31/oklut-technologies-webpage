import { motion, useReducedMotion } from "framer-motion";
import { X, MapPin, Briefcase, Send, Check } from "lucide-react";
import { EASE } from "../../animations/variants";

export default function JobDetailsModal({ job, onClose, onApply }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${job.title} — position details`}
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Open position
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-paper">
                {job.title}
              </h3>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                {job.department}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close position details"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-paper/60 transition-colors hover:border-white/35 hover:text-paper"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/60">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-mint" aria-hidden="true" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="size-4 text-mint" aria-hidden="true" />
              {job.type}
            </span>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                About the role
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-paper/80">{job.description}</p>
            </div>

            {job.requirements?.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                  Requirements
                </h4>
                <ul className="mt-2 space-y-2">
                  {job.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2.5 text-sm leading-relaxed text-paper/70">
                      <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-mint/10">
                        <Check className="size-2.5 text-mint" aria-hidden="true" />
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.skills?.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                  Skills
                </h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-paper/70"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-paper transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Back to positions
            </button>
            <button
              type="button"
              onClick={() => onApply(job)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-all duration-300 hover:bg-accent-deep hover:shadow-glow"
            >
              <Send className="size-4" aria-hidden="true" />
              Apply Now
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}