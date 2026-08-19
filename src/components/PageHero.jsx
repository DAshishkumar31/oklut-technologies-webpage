import { motion } from "framer-motion";
import { heroContainer, EASE } from "../animations/variants";
import ParticleField from "./effects/ParticleField";
import TechShapes3D from "./effects/TechShapes3D";

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <TechShapes3D sparse />
      <div
        className="absolute inset-0 bg-[radial-gradient(48rem_26rem_at_70%_-10%,rgb(91_91_239/0.25),transparent_60%)]"
        aria-hidden="true"
      />
      <ParticleField className="absolute inset-0 size-full" density={32} />
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="container-x relative py-28 sm:py-32"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70"
        >
          <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
          {eyebrow}
        </motion.span>
        <motion.h1
          variants={item}
          className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p variants={item} className="mt-5 max-w-2xl leading-relaxed text-paper/60 sm:text-lg">
            {description}
          </motion.p>
        )}
        {children}
      </motion.div>
    </section>
  );
}