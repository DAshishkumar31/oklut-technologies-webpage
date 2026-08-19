import { motion } from "framer-motion";
import { heroContainer, EASE } from "../../animations/variants";
import Tech3DBackground from "../animations/Tech3DBackground";
import CareersVisual from "./CareersVisual";

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <Tech3DBackground hud={false} />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/60 to-transparent"
        aria-hidden="true"
      />
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="container-x relative grid items-center gap-16 py-28 sm:py-32 lg:grid-cols-2 lg:gap-10 lg:py-36"
      >
        <div>
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70"
          >
            <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
            Careers // Join our team
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
          >
            Build Your <span className="text-gradient">Future</span> With OKLUT
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed text-paper/60 sm:text-lg">
            Join a team of builders, thinkers, and innovators creating technology that moves businesses
            forward.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#positions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-paper transition-all duration-300 hover:bg-accent-deep hover:shadow-glow"
            >
              View Open Positions
            </a>
            <a
              href="#why-join"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-paper transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Why join OKLUT
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="relative">
          <CareersVisual />
        </motion.div>
      </motion.div>
    </section>
  );
}