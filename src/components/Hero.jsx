import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  TrendingUp,
  Rocket,
} from "lucide-react";
import { COMPANY, STATS } from "../data/content";
import { heroContainer, EASE } from "../animations/variants";
import WireframeGlobe from "./effects/WireframeGlobe";
import Tech3DBackground from "./animations/Tech3DBackground";

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const bars = [
  { label: "Web platforms", width: "92%", tone: "from-accent to-violet" },
  { label: "Mobile apps", width: "78%", tone: "from-violet to-accent" },
  { label: "Cloud & DevOps", width: "86%", tone: "from-accent to-accent" },
];

function DashboardPanel() {
  const reduce = useReducedMotion();
  const float = (delay = 0) =>
    reduce
      ? {}
      : { y: [0, -9, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay } };

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Wireframe globe behind the panel */}
      <WireframeGlobe className="absolute -right-16 -top-24 -z-10 size-80 opacity-45 sm:-right-10 sm:size-96" />

      {/* Glow */}
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-accent/25 via-violet/20 to-transparent blur-3xl" />

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        className="rounded-3xl border border-white/10 bg-ink-soft/90 p-6 shadow-float backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-paper/40">
              Delivery overview
            </p>
            <p className="mt-1 font-display text-lg font-bold text-paper">Q3 2026 · 4 active builds</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-mint" />
            </span>
            Live
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {bars.map((bar, i) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-paper/60">{bar.label}</span>
                <span className="font-semibold text-paper/80">{bar.width}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ width: bar.width, transformOrigin: "left" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.15 }}
                  className={`h-full rounded-full bg-gradient-to-r ${bar.tone}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
          <span className="text-xs font-medium text-paper/60">Next release</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-paper">
            <CheckCircle2 className="size-3.5 text-mint" />
            Sprint 12 · in review
          </span>
        </div>
      </motion.div>

      {/* Floating: support card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
        style={{ transform: "none" }}
        className="absolute -top-8 -right-4 sm:-right-8"
      >
        <motion.div
          animate={float(0)}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-soft/95 p-4 shadow-float"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-accent/20 text-accent">
            <Clock3 className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-paper">24/7 Support</p>
            <p className="text-[0.68rem] text-paper/50">Always on, always reachable</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating: clients card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
        className="absolute -bottom-10 -left-4 sm:-left-8"
      >
        <motion.div
          animate={float(1.2)}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-soft/95 p-4 shadow-float"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-mint/15 text-mint">
            <TrendingUp className="size-5" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-paper">1,056+</p>
            <p className="text-[0.68rem] text-paper/50">Happy clients served</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating: security chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.75 }}
        className="absolute -top-5 left-6 hidden sm:block"
      >
        <motion.div
          animate={float(2.2)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-soft/95 px-4 py-2 shadow-float"
        >
          <ShieldCheck className="size-4 text-mint" />
          <span className="text-xs font-semibold text-paper">Enterprise-grade security</span>
        </motion.div>
      </motion.div>

      {/* Floating: launch chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.9 }}
        className="absolute -bottom-6 right-10 hidden sm:block"
      >
        <motion.div
          animate={float(3)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-soft/95 px-4 py-2 shadow-float"
        >
          <Rocket className="size-4 text-violet" />
          <span className="text-xs font-semibold text-paper">Ship in 4–6 weeks</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* 3D tech background */}
      <Tech3DBackground />
      {/* readability overlay — darkens the copy side only */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-16 pb-24 pt-32 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-32 lg:pt-44">
        {/* Copy */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:col-span-7"
        >
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70 backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
            IT solutions partner · Since 2016
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Software that moves your <span className="text-gradient">business forward</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 max-w-xl text-base leading-relaxed text-paper/60 sm:text-lg"
          >
            Oklut Technologies designs, builds and scales web, mobile, cloud and marketing
            solutions for growing companies — one trusted partner, end to end.
          </motion.p>

          <motion.div variants={heroItem} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-white hover:shadow-glow"
            >
              Get a free quote
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-paper transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <Phone className="size-4 text-mint" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </motion.div>

          <motion.dl
            variants={heroItem}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {STATS.slice(0, 3).map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs font-medium text-paper/50">{stat.label}</dt>
                <dd className="order-1 font-display text-2xl font-bold text-paper sm:text-3xl">
                  {stat.value.toLocaleString("en-IN")}
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Visual */}
        <div className="lg:col-span-5">
          <DashboardPanel />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        aria-hidden="true"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-paper/70"
          />
        </div>
      </motion.div>
    </section>
  );
}