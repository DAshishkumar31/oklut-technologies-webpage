import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "center", dark = false }) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-paper-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed sm:text-lg ${dark ? "text-paper/60" : "text-muted"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}