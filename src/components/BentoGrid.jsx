import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import FeatureCard from "./FeatureCard";
import { SERVICES } from "../data/content";
import { stagger, VIEWPORT } from "../animations/variants";

export default function BentoGrid() {
  return (
    <section className="container-x py-24 sm:py-28">
      <SectionHeading
        eyebrow="What we do"
        title="One partner for the full technology stack"
        description="From your first website to a cloud-scale platform — eight disciplines, one accountable team."
      />

      <motion.div
        variants={stagger(0.07)}
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
  );
}