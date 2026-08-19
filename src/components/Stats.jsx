import { motion } from "framer-motion";
import Counter from "./Counter";
import { STATS } from "../data/content";
import { stagger, VIEWPORT, scaleIn } from "../animations/variants";

export default function Stats() {
  return (
    <section aria-label="Company statistics" className="border-y border-line bg-paper-soft">
      <div className="container-x py-16 sm:py-20">
        <motion.dl
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-2 gap-y-12 lg:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className={`flex flex-col items-center gap-2 text-center lg:border-l lg:border-line lg:first:border-l-0 ${
                i >= 2 ? "border-t border-line pt-10 lg:border-t-0 lg:pt-0" : ""
              }`}
            >
              <dd className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="text-sm font-medium text-muted">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}