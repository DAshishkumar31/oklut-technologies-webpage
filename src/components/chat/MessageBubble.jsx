import { motion } from "framer-motion";
import { EASE } from "../../animations/variants";

export default function MessageBubble({ message, error = false, onRetry }) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={`flex w-full flex-col ${isUser ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "rounded-br-md bg-gradient-to-br from-accent to-violet text-paper"
            : error
              ? "rounded-bl-md border border-red-400/30 bg-red-400/10 text-paper/80"
              : "rounded-bl-md border border-white/10 bg-white/8 text-paper/90"
        }`}
      >
        {message.text}
      </div>
      <div className="mt-1.5 flex items-center gap-2 px-1">
        <time className="text-[0.65rem] text-paper/35">{message.time}</time>
        {error && (
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer text-[0.7rem] font-semibold text-accent transition-colors hover:text-violet"
          >
            Try again
          </button>
        )}
      </div>
    </motion.div>
  );
}