import { INDUSTRIES } from "../data/content";

export default function IndustryStrip() {
  const items = [...INDUSTRIES, ...INDUSTRIES];

  return (
    <section aria-label="Industries we serve" className="border-y border-line bg-paper-soft py-8">
      <div className="container-x">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          Trusted across industries
        </p>
        <div className="relative mt-6 overflow-hidden" aria-hidden="true">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper-soft to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper-soft to-transparent" />
          <div className="flex w-max animate-marquee gap-4 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
            {items.map((industry, i) => (
              <span
                key={`${industry}-${i}`}
                className="flex items-center gap-4 whitespace-nowrap rounded-full border border-line bg-paper px-5 py-2 text-sm font-medium text-ink/70"
              >
                {industry}
                <span className="size-1 rounded-full bg-accent/50" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}