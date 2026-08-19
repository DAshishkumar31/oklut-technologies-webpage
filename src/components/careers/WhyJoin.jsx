import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { WHY_JOIN } from "../../data/careers";
import { stagger, fadeUp, VIEWPORT } from "../../animations/variants";

export default function WhyJoin() {
  return (
    <section id="why-join" className="bg-paper py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why join OKLUT"
          title="Why Join OKLUT?"
          description="A place where great work, real ownership and modern technology come together."
        />
        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_JOIN.map((item, i) => (
            <motion.li
              key={item.title}
              variants={fadeUp}
              className="group rounded-3xl border border-line bg-paper-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
            >
              <span className="font-display text-xs font-semibold tracking-widest text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}