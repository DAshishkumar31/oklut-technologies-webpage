import { Sparkles, RotateCcw, Minus, X } from "lucide-react";

export default function ChatHeader({ onMinimize, onClose, onClear }) {
  return (
    <header className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
      <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-violet shadow-glow">
        <Sparkles className="size-5 text-paper" aria-hidden="true" />
        <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-ink bg-mint" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-bold text-paper">OKLUT AI Assistant</p>
        <p className="flex items-center gap-1.5 text-[0.7rem] text-paper/50">
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-mint" />
          </span>
          Online · replies instantly
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onClear}
          title="Clear conversation"
          aria-label="Clear conversation"
          className="grid size-9 cursor-pointer place-items-center rounded-lg text-paper/50 transition-colors duration-200 hover:bg-white/10 hover:text-paper"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onMinimize}
          title="Minimize"
          aria-label="Minimize chat"
          className="grid size-9 cursor-pointer place-items-center rounded-lg text-paper/50 transition-colors duration-200 hover:bg-white/10 hover:text-paper"
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onClose}
          title="Close"
          aria-label="Close chat"
          className="grid size-9 cursor-pointer place-items-center rounded-lg text-paper/50 transition-colors duration-200 hover:bg-white/10 hover:text-paper"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}