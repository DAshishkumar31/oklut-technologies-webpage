import { motion } from "framer-motion";
import { SUGGESTED_QUESTIONS } from "../../data/chatKnowledge";
import { EASE } from "../../animations/variants";

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="flex flex-col gap-2" role="group" aria-label="Suggested questions">
      {SUGGESTED_QUESTIONS.map((question, i) => (
        <motion.button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE, delay: 0.3 + i * 0.06 }}
          className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-left text-xs font-medium text-paper/75 transition-colors duration-200 hover:border-accent/50 hover:bg-accent/15 hover:text-paper"
        >
          {question}
        </motion.button>
      ))}
    </div>
  );
}