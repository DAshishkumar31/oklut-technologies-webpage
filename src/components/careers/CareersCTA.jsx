import { motion } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
import { COMPANY } from "../../data/content";
import { stagger, VIEWPORT, scaleIn } from "../../animations/variants";
import TechShapes3D from "../effects/TechShapes3D";

export default function CareersCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <TechShapes3D beam />
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="container-x relative flex flex-col items-center text-center"
      >
        <motion.span
          variants={scaleIn}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70"
        >
          <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
          Join the OKLUT team
        </motion.span>
        <motion.h2
          variants={scaleIn}
          className="mt-6 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl"
        >
          Ready to build <span className="text-gradient">what's next?</span>
        </motion.h2>
        <motion.p variants={scaleIn} className="mt-5 max-w-xl text-paper/60 sm:text-lg">
          Explore opportunities and become part of the OKLUT team.
        </motion.p>
        <motion.div variants={scaleIn} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#positions"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-paper transition-all duration-300 hover:bg-accent-deep hover:shadow-glow"
          >
            View Open Positions
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
          <a
            href={`${COMPANY.emailHref}?subject=Job%20Application%20%E2%80%94%20OKLUT%20Careers`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-paper transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
          >
            <Mail className="size-4" aria-hidden="true" />
            Send Your Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}