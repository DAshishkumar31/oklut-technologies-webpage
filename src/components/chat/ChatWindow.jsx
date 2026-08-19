import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { EASE } from "../../animations/variants";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatWindow({
  messages,
  isTyping,
  showSuggestions,
  onSend,
  onSuggest,
  onRetry,
  onMinimize,
  onClose,
  onClear,
  limitReached,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const input = panel.querySelector("#chat-input");
    input?.focus();
    return () => {};
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.section
      ref={panelRef}
      role="dialog"
      aria-label="OKLUT AI Assistant"
      aria-modal="false"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.28, ease: EASE }}
      style={{ transformOrigin: "bottom right" }}
      className="fixed right-4 bottom-24 z-[70] flex h-[min(620px,calc(100dvh-7.5rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink/95 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:right-6 sm:bottom-24"
    >
      <ChatHeader onMinimize={onMinimize} onClose={onClose} onClear={onClear} />
      <MessageList
        messages={messages}
        isTyping={isTyping}
        showSuggestions={showSuggestions}
        onSuggest={onSuggest}
        onRetry={onRetry}
      />
      <ChatInput onSend={onSend} disabled={isTyping} limitReached={limitReached} />
    </motion.section>
  );
}