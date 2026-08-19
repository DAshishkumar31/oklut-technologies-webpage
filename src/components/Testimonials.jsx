import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { TESTIMONIALS } from "../data/content";
import { stagger, VIEWPORT, scaleIn } from "../animations/variants";

const AVATAR_TONES = [
  "from-accent to-violet",
  "from-violet to-accent",
  "from-ink to-ink-muted",
  "from-accent-deep to-accent",
];

export default function Testimonials() {
  return (
    <section className="container-x py-24 sm:py-28">
      <SectionHeading
        eyebrow="Client voices"
        title="What our clients say"
        description="Real feedback from the teams we've partnered with across industries."
      />

      <motion.ul
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mt-14 grid gap-5 sm:grid-cols-2"
      >
        {TESTIMONIALS.map((testimonial, i) => (
          <motion.li
            key={testimonial.name}
            variants={scaleIn}
            className="group relative flex flex-col justify-between rounded-3xl border border-line bg-paper-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8"
          >
            <Quote
              className="absolute right-7 top-7 size-8 text-accent/10 transition-colors duration-300 group-hover:text-accent/25"
              aria-hidden="true"
            />
            <div className="flex gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="size-4 fill-gold text-gold" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-5 leading-relaxed text-ink/80">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className={`grid size-11 place-items-center rounded-full bg-gradient-to-br ${AVATAR_TONES[i % AVATAR_TONES.length]} font-display text-sm font-bold text-paper`}
              >
                {testimonial.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                <p className="text-xs text-muted">{testimonial.role}</p>
              </div>
            </figcaption>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}