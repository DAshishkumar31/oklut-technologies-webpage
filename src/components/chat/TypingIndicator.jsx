export default function TypingIndicator() {
  return (
    <div className="flex items-start" role="status" aria-label="Assistant is typing">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/8 px-4 py-3.5">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="size-1.5 animate-typing rounded-full bg-accent"
            style={{ animationDelay: `${dot * 0.15}s` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}