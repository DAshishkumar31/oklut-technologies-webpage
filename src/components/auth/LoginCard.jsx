import { motion } from "framer-motion";
import useTilt from "../../hooks/useTilt";
import { EASE } from "../../animations/variants";

export default function LoginCard({ children }) {
  const tilt = useTilt(2);

  return (
    <motion.div
      ref={tilt.ref}
      style={tilt.style}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
      className="relative w-[calc(100vw-2.5rem)] max-w-[430px] rounded-3xl border border-accent/25 bg-ink-soft/85 p-7 shadow-[0_24px_80px_-16px_rgba(2,6,23,0.9),0_0_44px_-10px_rgba(56,189,248,0.2)] backdrop-blur-xl sm:p-9"
    >
      {/* light border sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-accent/20 via-transparent to-violet/15 opacity-70"
      />
      <div className="relative" style={{ transform: "translateZ(24px)" }}>
        {children}
      </div>
    </motion.div>
  );
}