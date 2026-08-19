import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";

export default function MessageList({ messages, isTyping, showSuggestions, onSuggest, onRetry }) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReduced ? "auto" : "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      ref={listRef}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      className="chat-scroll flex-1 space-y-4 overflow-y-auto px-5 py-5"
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          error={message.error}
          onRetry={() => onRetry(message)}
        />
      ))}
      {isTyping && <TypingIndicator />}
      {showSuggestions && <SuggestedQuestions onSelect={onSuggest} />}
    </div>
  );
}