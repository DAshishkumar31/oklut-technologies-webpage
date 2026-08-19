import { useState } from "react";
import { SendHorizonal } from "lucide-react";

const MAX_LENGTH = 1500;

export default function ChatInput({ onSend, disabled, limitReached }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const trimmed = text.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || limitReached) return;
    if (!trimmed) {
      setError("Message cannot be empty.");
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Message is too long (max ${MAX_LENGTH} characters).`);
      return;
    }
    setError("");
    onSend(trimmed);
    setText("");
  };

  return (
    <div className="border-t border-white/10 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {error && (
        <p role="alert" className="mb-2 text-xs font-medium text-red-300">
          {error}
        </p>
      )}
      {limitReached && (
        <p className="mb-2 text-xs text-paper/50">
          Conversation limit reached. Clear the conversation to continue.
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Your message
        </label>
        <textarea
          id="chat-input"
          rows={1}
          value={text}
          maxLength={MAX_LENGTH}
          disabled={disabled || limitReached}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Ask about our services…"
          className="max-h-28 min-h-11 flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-paper placeholder:text-paper/35 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || limitReached || !trimmed}
          aria-label="Send message"
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-2xl bg-gradient-to-br from-accent to-violet text-paper shadow-glow transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <SendHorizonal className="size-4.5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}