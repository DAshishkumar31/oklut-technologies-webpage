import { motion } from "framer-motion";
import { ArrowUpRight, Award, Users, Headphones, BadgeDollarSign } from "lucide-react";
import Reveal from "./Reveal";
import { WHY_US, BADGES } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../animations/variants";

const BADGE_ICONS = [Award, Users, Headphones, BadgeDollarSign];

export default function WhyUs() {
  return (
    <section className="container-x grid gap-14 py-24 sm:py-28 lg:grid-cols-12 lg:gap-10">
      {/* Sticky intro */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Why Oklut
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Here to grow your business, <span className="text-gradient">exponentially</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-muted">
              Deep domain expertise across web, cloud and marketing — applied with a partner's
              accountability and a product team's craft.
            </p>
          </Reveal>

          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-10 grid grid-cols-2 gap-4"
          >
            {BADGES.map((badge, i) => {
              const Icon = BADGE_ICONS[i];
              return (
                <motion.li
                  key={badge.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-line bg-paper-soft p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
                >
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  <p className="mt-2.5 text-sm font-semibold text-ink">{badge.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{badge.description}</p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>

      {/* Pillars */}
      <motion.ol
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="flex flex-col gap-4 lg:col-span-7"
      >
        {WHY_US.map((pillar, i) => (
          <motion.li
            key={pillar.title}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border border-line bg-paper-soft p-7 transition-all duration-300 hover:border-accent/40 hover:shadow-card-hover sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/8 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <span className="font-display text-5xl font-bold tracking-tight text-ink/10 transition-colors duration-300 group-hover:text-accent/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink">{pillar.title}</h3>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{pillar.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-medium text-ink/70"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}