import { Link } from "react-router-dom";

export default function Logo({ dark = false, className = "" }) {
  return (
    <Link
      to="/"
      aria-label="Oklut Technologies — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-violet shadow-glow transition-transform duration-300 group-hover:rotate-6"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 9.5L8 2v6l-5 1.5z" fill="white" opacity="0.95" />
          <path d="M15 8.5L10 16v-6l5-1.5z" fill="white" opacity="0.6" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-bold tracking-[0.08em] ${dark ? "text-paper" : "text-ink"}`}>
          OKLUT
        </span>
        <span className={`text-[0.6rem] font-medium uppercase tracking-[0.32em] ${dark ? "text-paper/50" : "text-muted"}`}>
          Technologies
        </span>
      </span>
    </Link>
  );
}