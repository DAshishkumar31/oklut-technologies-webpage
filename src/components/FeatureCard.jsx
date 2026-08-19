import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { scaleIn, EASE } from "../animations/variants";
import useTilt from "../hooks/useTilt";

const SPAN_MAP = { 4: "md:col-span-4", 3: "md:col-span-3", 2: "md:col-span-2" };

export default function FeatureCard({ feature, dark = false, index = 0 }) {
  const Icon = feature.icon;
  const span = SPAN_MAP[feature.size] ?? "md:col-span-2";
  const tilt = useTilt(6);

  return (
    <motion.article
      variants={scaleIn}
      transition={{ delay: 0, ease: EASE }}
      ref={tilt.ref}
      style={tilt.style}
      className={`group relative flex flex-col rounded-3xl border p-7 transition-shadow duration-300 hover:shadow-card-hover sm:p-8 ${span} ${
        dark
          ? "border-line-dark bg-ink text-paper shadow-card"
          : "border-line bg-paper-soft text-ink shadow-card"
      }`}
    >
      {/* hover glow (clipped so 3D depth is preserved on the card) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
      >
        <div
          className={`absolute -top-24 right-0 size-56 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
            dark ? "bg-accent/20" : "bg-accent/10"
          }`}
        />
      </div>

      <div className="flex items-start justify-between" style={{ transform: "translateZ(28px)" }}>
        <span
          className={`grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
            dark ? "bg-accent/20 text-accent" : "bg-accent-soft text-accent"
          }`}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className={`font-display text-xs font-semibold tracking-widest ${dark ? "text-paper/30" : "text-ink/25"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        style={{ transform: "translateZ(20px)" }}
        className={`mt-6 font-display text-xl font-bold tracking-tight ${dark ? "text-paper" : "text-ink"}`}
      >
        {feature.title}
      </h3>
      <p className={`mt-2.5 text-sm leading-relaxed ${dark ? "text-paper/60" : "text-muted"}`}>
        {feature.summary}
      </p>

      <ul className={`mt-5 flex flex-col gap-2 ${dark ? "text-paper/75" : "text-ink/75"}`}>
        {feature.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm">
            <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-mint" : "text-accent"}`} aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>

      <span
        className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${
          dark ? "text-accent opacity-70 group-hover:opacity-100" : "text-accent opacity-0 group-hover:opacity-100"
        }`}
      >
        Explore service
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </motion.article>
  );
}