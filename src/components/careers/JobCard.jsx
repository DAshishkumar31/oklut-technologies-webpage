import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight, Send } from "lucide-react";
import { fadeUp } from "../../animations/variants";

export default function JobCard({ job, onView, onApply }) {
  return (
    <motion.li
      variants={fadeUp}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:bg-white/[0.08] hover:shadow-[0_20px_48px_-16px_rgba(91,91,239,0.45)] sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-paper">{job.title}</h3>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            {job.department}
          </span>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5 text-xs text-paper/55">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-mint" aria-hidden="true" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="size-3.5 text-mint" aria-hidden="true" />
            {job.type}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-paper/60">{job.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-paper/70"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onView?.(job) ?? onApply(job)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-paper transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
          View Position
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
    </motion.li>
  );
}