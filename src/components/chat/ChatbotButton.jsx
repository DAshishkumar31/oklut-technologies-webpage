import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ChatbotButton({ isOpen, onClick }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed right-4 bottom-4 z-[70] flex items-center gap-3 sm:right-6 sm:bottom-6"
      animate={!reducedMotion && !isOpen ? { y: [0, -6, 0] } : { y: 0 }}
      transition={
        reducedMotion
          ? undefined
          : { duration: 5.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }
      }
    >
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 8 : 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
        className="pointer-events-none hidden rounded-full border border-white/10 bg-ink/90 px-3.5 py-2 text-xs font-medium text-paper/80 shadow-lg backdrop-blur-md sm:block"
      >
        Ask AI
      </motion.span>
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        whileHover={reducedMotion ? undefined : { scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="grid size-14 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-accent to-violet text-paper shadow-glow transition-shadow duration-200 hover:shadow-[0_8px_40px_-4px_rgba(91,91,239,0.55)]"
      >
        <Sparkles className="size-6" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}