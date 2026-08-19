import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Stats from "../components/Stats";
import CTA from "../components/CTA";
import { BADGES } from "../data/content";
import { stagger, VIEWPORT, fadeUp } from "../animations/variants";

const STORY_PARAGRAPHS = [
  "Oklut Technologies is an Indian IT company — one of the leading web design and web application development houses in Hyderabad, with deep mastery in content management systems and mobile application development for iPhone, iPad and Android.",
  "Our story starts with a founder who led a high-performing team of 120+ specialists working for Fortune 500 clients. When the call came to serve people and nations directly, he made the assertive leap — trusting that you'll reap what you sow.",
  "Today we bridge the gap for businesses that need technology to grow with operational ease — across Healthcare, Education, Retail & E-Commerce, CRM, Travel & Logistics and Manufacturing.",
];

const VALUES = [
  {
    title: "Innovation first",
    description: "Unique ideas to solve complex business needs, not off-the-shelf answers.",
  },
  {
    title: "Accountability",
    description: "We take ownership of outcomes — your growth is our metric.",
  },
  {
    title: "Speed with craft",
    description: "Agile delivery that never compromises quality or security.",
  },
  {
    title: "Partnership",
    description: "Long-term relationships built on trust, transparency and 24/7 support.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="The best IT solution partner for your business"
        description="A young, fast-growing team with Fortune 500 experience — building technology that makes growing a business easier."
      />

      {/* Story */}
      <section className="container-x grid gap-14 py-24 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Our story
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              From Fortune 500 teams to <span className="text-gradient">your business</span>
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {STORY_PARAGRAPHS.map((paragraph, i) => (
              <Reveal key={i} delay={0.08 + i * 0.06}>
                <p className="leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-paper-soft px-5 py-4">
            <Rocket className="size-5 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-sm font-medium text-ink">
              5+ years of experience · 120+ specialists · {new Date().getFullYear() - 2016}+ years since {2016}
            </p>
          </Reveal>
        </div>

        {/* Values */}
        <motion.ul
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-5"
        >
          {VALUES.map((value, i) => (
            <motion.li
              key={value.title}
              variants={fadeUp}
              className="group rounded-3xl border border-line bg-paper-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="font-display text-xs font-semibold tracking-widest text-ink/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-ink">{value.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{value.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* Badges */}
      <section className="border-y border-line bg-paper-soft py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we stand for"
            title="Recognised for the way we work"
            description="Awards and client trust are earned the same way — by delivering."
          />
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {BADGES.map((badge) => (
              <motion.li
                key={badge.title}
                variants={fadeUp}
                className="rounded-3xl border border-line bg-paper p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
              >
                <p className="font-display text-xl font-bold tracking-tight text-ink">{badge.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{badge.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  );
}