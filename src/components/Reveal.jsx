import { motion } from "framer-motion";
import { VIEWPORT, EASE } from "../animations/variants";

export default function Reveal({ children, className, delay = 0, y = 24, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}