import { motion } from "framer-motion";
import { TrendingUp, GraduationCap, Clock, Users, Cpu, Rocket } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { BENEFITS } from "../../data/careers";
import { stagger, scaleIn, VIEWPORT } from "../../animations/variants";

const ICONS = [TrendingUp, GraduationCap, Clock, Users, Cpu, Rocket];

export default function Benefits() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(40rem_24rem_at_50%_120%,rgb(91_91_239/0.2),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <SectionHeading
          dark
          eyebrow="Benefits"
          title="Built for the way you want to work"
          description="Everything you need to do the best work of your career."
        />
        <motion.ul
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFITS.map((benefit, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.li
                key={benefit.title}
                variants={scaleIn}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.08] hover:shadow-[0_16px_40px_-16px_rgba(139,92,246,0.4)]"
              >
                <span className="absolute -top-8 -right-8 size-24 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 md:opacity-0" aria-hidden="true" />
                <span className="relative inline-flex size-12 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/25 to-violet/20 text-accent shadow-[0_0_20px_rgba(91,91,239,0.25)]">
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-accent/30" aria-hidden="true" />
                </span>
                <h3 className="relative mt-5 font-display text-lg font-bold tracking-tight text-paper">
                  {benefit.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-paper/60">{benefit.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}