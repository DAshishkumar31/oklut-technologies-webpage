import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { PROCESS } from "../data/content";
import { stagger, VIEWPORT, fadeUp } from "../animations/variants";

export default function Process() {
  return (
    <section className="border-y border-line bg-paper-soft py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title="From first call to long-term scale"
          description="A proven four-step engagement that keeps you in control at every stage."
        />

        <motion.ol
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {/* connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-6 hidden h-px w-full bg-gradient-to-r from-accent/10 via-accent/40 to-accent/10 lg:block"
          />
          {PROCESS.map((step) => (
            <motion.li key={step.step} variants={fadeUp} className="group relative">
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-paper font-display text-sm font-bold text-accent shadow-card transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-paper group-hover:shadow-glow">
                  {step.step}
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight text-ink lg:mt-5">{step.title}</h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted lg:mt-3">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}