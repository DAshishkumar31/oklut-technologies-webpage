import { motion } from "framer-motion";
import { CalendarClock, Layers, Handshake } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import FeatureCard from "../components/FeatureCard";
import Reveal from "../components/Reveal";
import CTA from "../components/CTA";
import { SERVICES } from "../data/content";
import { stagger, VIEWPORT, fadeUp } from "../animations/variants";

const MODELS = [
  {
    icon: CalendarClock,
    title: "Fixed scope",
    description: "Defined deliverables, timelines and pricing — perfect for clear-cut builds.",
  },
  {
    icon: Layers,
    title: "Dedicated team",
    description: "Skilled resources embedded with your team, scaled up or down as needed.",
  },
  {
    icon: Handshake,
    title: "Managed services",
    description: "Ongoing support, cloud operations and maintenance with 24/7 coverage.",
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Custom IT solutions for your successful business"
        description="Eight disciplines, one accountable partner — from the first website to cloud-scale platforms, apps and marketing that compound."
      />

      <section className="container-x py-24 sm:py-28">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything your product needs, under one roof"
          description="Each capability is delivered by a dedicated practice with production experience."
        />
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="perspective-3d mt-14 grid grid-cols-1 gap-5 md:grid-cols-6"
        >
          {SERVICES.map((service, i) => (
            <FeatureCard key={service.id} feature={service} dark={service.dark} index={i} />
          ))}
        </motion.div>
      </section>

      <section className="border-t border-line bg-paper-soft py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engagement models"
            title="Work with us the way that fits"
            description="Flexible billing models that match how you plan, budget and scale."
          />
          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {MODELS.map((model) => (
              <motion.li
                key={model.title}
                variants={fadeUp}
                className="group rounded-3xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <model.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink">{model.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{model.description}</p>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal className="mt-10 rounded-3xl border border-line bg-paper p-8 text-center sm:p-10">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Not sure which model fits? <span className="font-semibold text-ink">Call us for a free quote</span> —{" "}
              <a href="tel:+919014217124" className="font-semibold text-accent underline-offset-4 hover:underline">
                +91-9014217124
              </a>{" "}
              and we'll map the right engagement within a day.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}