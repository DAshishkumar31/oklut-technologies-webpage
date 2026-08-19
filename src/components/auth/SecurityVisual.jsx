import { ShieldCheck } from "lucide-react";

export default function SecurityVisual() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
      {/* single centered scanning HUD, slightly larger than the card and kept subtle */}
      <div className="relative size-[600px] max-w-[94vw] opacity-70">
        <div
          className="absolute inset-0 animate-spin-cw-slow rounded-full"
          style={{
            background:
              "repeating-conic-gradient(rgba(56,189,248,0.3) 0deg 4deg, transparent 4deg 24deg)",
            maskImage: "radial-gradient(closest-side, transparent 96%, #000 97%)",
            WebkitMaskImage: "radial-gradient(closest-side, transparent 96%, #000 97%)",
          }}
        />
        <div
          className="absolute inset-[6%] animate-spin-ccw rounded-full"
          style={{
            background:
              "repeating-conic-gradient(transparent 0deg 2deg, rgba(148,163,184,0.35) 2deg 3deg)",
            maskImage: "radial-gradient(closest-side, transparent 93%, #000 94%)",
            WebkitMaskImage: "radial-gradient(closest-side, transparent 93%, #000 94%)",
          }}
        />
        <div
          className="absolute inset-0 animate-spin-cw rounded-full border border-cyan-400/15"
          style={{ boxShadow: "0 0 40px rgba(56,189,248,0.12), inset 0 0 40px rgba(56,189,248,0.06)" }}
        />
      </div>

      {/* secure connection chip */}
      <div className="absolute right-5 bottom-5 hidden items-center gap-2 rounded-full border border-mint/25 bg-ink/70 px-4 py-2 backdrop-blur-md sm:flex">
        <ShieldCheck className="size-4 text-mint" />
        <span className="text-xs font-semibold tracking-wide text-mint">SECURE CONNECTION</span>
        <span className="relative flex size-1.5" >
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-mint" />
        </span>
      </div>
    </div>
  );
}