import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { HIRING_STEPS } from "../../data/careers";
import { stagger, fadeUp, VIEWPORT } from "../../animations/variants";

export default function HiringProcess() {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we hire"
          title="How We Hire"
          description="A clear, respectful process designed to move fast — without burning your time."
        />

        <div className="relative mt-16 hidden md:block">
          <svg
            className="absolute top-7 left-[6%] h-px w-[88%]"
            viewBox="0 0 1000 1"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="0.5"
              x2="1000"
              y2="0.5"
              stroke="url(#hire-gradient)"
              strokeWidth="1"
              strokeDasharray="6 8"
              className="animate-dash-flow"
            />
            <defs>
              <linearGradient id="hire-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5B5BEF" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#2DD4BF" />
              </linearGradient>
            </defs>
          </svg>
          <motion.ol
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative grid grid-cols-5 gap-4"
          >
            {HIRING_STEPS.map((s) => (
              <motion.li key={s.step} variants={fadeUp} className="flex flex-col items-center text-center">
                <span className="grid size-14 place-items-center rounded-full border border-accent/30 bg-gradient-to-br from-accent/15 to-violet/10 font-display text-sm font-bold text-accent shadow-[0_0_20px_rgba(91,91,239,0.2)]">
                  {s.step}
                </span>
                <h3 className="mt-4 font-display text-sm font-bold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-1.5 max-w-[12rem] text-xs leading-relaxed text-muted">{s.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <div className="relative mt-14 md:hidden">
          <span
            className="absolute top-2 bottom-2 left-7 w-px border-l border-dashed border-accent/40"
            aria-hidden="true"
          />
          <motion.ol
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative space-y-8"
          >
            {HIRING_STEPS.map((s) => (
              <motion.li key={s.step} variants={fadeUp} className="relative flex items-start gap-4 pl-1">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-accent/30 bg-gradient-to-br from-accent/15 to-violet/10 font-display text-sm font-bold text-accent shadow-[0_0_20px_rgba(91,91,239,0.2)]">
                  {s.step}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-sm font-bold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{s.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}