import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const CYAN = "56,189,248";

const PARTICLES = [
  { x: "4%", y: "30%", s: 2, o: 0.5, d: 0 },
  { x: "12%", y: "14%", s: 3, o: 0.65, d: 1.2 },
  { x: "22%", y: "72%", s: 2, o: 0.4, d: 2.1 },
  { x: "32%", y: "38%", s: 1, o: 0.55, d: 0.6 },
  { x: "44%", y: "18%", s: 2, o: 0.35, d: 2.8 },
  { x: "56%", y: "82%", s: 2, o: 0.5, d: 1.7 },
  { x: "66%", y: "26%", s: 1, o: 0.45, d: 3.4 },
  { x: "74%", y: "62%", s: 3, o: 0.6, d: 0.9 },
  { x: "84%", y: "36%", s: 2, o: 0.5, d: 2.5 },
  { x: "92%", y: "70%", s: 1, o: 0.4, d: 1.4 },
  { x: "16%", y: "88%", s: 2, o: 0.45, d: 3.9 },
  { x: "48%", y: "52%", s: 3, o: 0.7, d: 0.3 },
  { x: "70%", y: "88%", s: 1, o: 0.5, d: 2.2 },
  { x: "88%", y: "12%", s: 2, o: 0.6, d: 3.1 },
];

const STREAMS = [
  { x: "8%", d: 0 },
  { x: "16%", d: 1.8 },
  { x: "27%", d: 0.9 },
  { x: "61%", d: 2.6 },
  { x: "72%", d: 0.4 },
  { x: "82%", d: 1.3 },
  { x: "91%", d: 2.1 },
  { x: "96%", d: 0.7 },
];

const CIRCUITS = [
  { d: "M -20 340 H 160 V 240 H 300 V 130 H 430", dur: 9, begin: 0 },
  { d: "M 70 820 V 620 H 190 V 500 H 330", dur: 12, begin: 3 },
  { d: "M 1080 780 V 560 H 940 V 430 H 800 V 320", dur: 10, begin: 5 },
  { d: "M 1150 140 H 980 V 260 H 860", dur: 14, begin: 1 },
  { d: "M -20 520 H 90 V 400 H 200", dur: 11, begin: 7 },
];

const MARKERS = [
  { deg: 28, s: 5, o: 0.9 },
  { deg: 118, s: 3, o: 0.6 },
  { deg: 212, s: 4, o: 0.8 },
  { deg: 302, s: 3, o: 0.65 },
];

export default function Tech3DBackground({ className = "", hud = true }) {
  const reducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 42, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 42, damping: 20, mass: 0.6 });

  const ringX = useTransform(sx, (v) => v * 34);
  const ringY = useTransform(sy, (v) => v * 22);
  const circuitX = useTransform(sx, (v) => v * 16);
  const circuitY = useTransform(sy, (v) => v * 10);
  const particleX = useTransform(sx, (v) => v * 10);
  const particleY = useTransform(sy, (v) => v * 7);
  const glowX = useTransform(sx, (v) => v * 6);
  const glowY = useTransform(sy, (v) => v * 4);

  useEffect(() => {
    if (reducedMotion) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const handleMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion, mx, my]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Layer 1 — deep navy gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90rem 50rem at 80% -10%, rgb(30 41 59 / 0.9), transparent 60%)," +
            "radial-gradient(70rem 40rem at 120% 110%, rgb(14 116 144 / 0.25), transparent 55%)," +
            "linear-gradient(180deg, rgb(2 6 23), rgb(4 12 32) 55%, rgb(2 6 23))",
        }}
      />

      {/* Layer 2 — subtle circuit grid, faded at edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(56 189 248 / 0.045) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgb(56 189 248 / 0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(130% 120% at 50% 35%, #000 35%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(130% 120% at 50% 35%, #000 35%, transparent 78%)",
        }}
      />

      {/* Layer 3 — circuit paths + travelling data particles (desktop/tablet) */}
      <motion.div
        className="absolute inset-0 hidden md:block"
        style={{ x: circuitX, y: circuitY }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {CIRCUITS.map((circuit, i) => (
            <g key={i}>
              <path
                d={circuit.d}
                stroke={`rgba(${CYAN},0.16)`}
                strokeWidth={1}
                strokeDasharray="5 7"
                className="animate-dash-flow"
                style={{ animationDelay: `${i * 0.8}s` }}
              />
              <circle
                r="2.5"
                fill={`rgba(${CYAN},0.95)`}
                style={{ filter: `drop-shadow(0 0 4px rgba(${CYAN},0.9))` }}
              >
                <animateMotion
                  dur={`${circuit.dur}s`}
                  begin={`${circuit.begin}s`}
                  repeatCount="indefinite"
                  path={circuit.d}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.95;0"
                  dur={`${circuit.dur}s`}
                  begin={`${circuit.begin}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Layer 4 — digital data streams */}
      <div className="absolute inset-0 hidden sm:block">
        {STREAMS.map((stream, i) => (
          <span
            key={i}
            className="absolute top-0 h-28 w-px animate-stream bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent"
            style={{ left: stream.x, animationDelay: `${stream.d}s` }}
          />
        ))}
      </div>

      {/* Layer 5 — 3D HUD ring structure (right side) */}
      {hud && (
        <motion.div
          className="absolute top-1/2 -right-40 -translate-y-1/2 sm:-right-24 lg:right-0"
          style={{ x: ringX, y: ringY }}
        >
          <div className="relative size-[340px] sm:size-[460px] lg:size-[560px]">
          {/* outer segmented panels — clockwise, slow */}
          <div
            className="absolute inset-0 animate-spin-cw-slow rounded-full"
            style={{
              background:
                "repeating-conic-gradient(rgba(56,189,248,0.45) 0deg 5deg, transparent 5deg 26deg)",
              maskImage: "radial-gradient(closest-side, transparent 95%, #000 96%)",
              WebkitMaskImage: "radial-gradient(closest-side, transparent 95%, #000 96%)",
            }}
          />
          {/* outer thin ring */}
          <div
            className="absolute inset-0 animate-spin-ccw-slow rounded-full border border-cyan-400/25"
            style={{ boxShadow: "0 0 34px rgba(56,189,248,0.12), inset 0 0 34px rgba(56,189,248,0.06)" }}
          />
          {/* tick ring — counter-clockwise */}
          <div
            className="absolute inset-[10%] animate-spin-ccw rounded-full"
            style={{
              background:
                "repeating-conic-gradient(transparent 0deg 1.5deg, rgba(148,163,184,0.5) 1.5deg 2.5deg)",
              maskImage: "radial-gradient(closest-side, transparent 92%, #000 93%)",
              WebkitMaskImage: "radial-gradient(closest-side, transparent 92%, #000 93%)",
            }}
          />
          {/* radial spokes — faint, clockwise */}
          <div
            className="absolute inset-[6%] animate-spin-cw rounded-full"
            style={{
              background:
                "repeating-conic-gradient(transparent 0deg 6deg, rgba(56,189,248,0.09) 6deg 7deg)",
              maskImage: "radial-gradient(closest-side, transparent 88%, #000 89%)",
              WebkitMaskImage: "radial-gradient(closest-side, transparent 88%, #000 89%)",
            }}
          />
          {/* inner dashed ring */}
          <div className="absolute inset-[30%] animate-spin-ccw-slow rounded-full border border-dashed border-cyan-300/30" />
          {/* inner solid ring */}
          <div className="absolute inset-[38%] animate-spin-cw rounded-full border border-cyan-400/40" />
          {/* core glow */}
          <div className="absolute inset-[46%] animate-hud-pulse rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.55),rgba(56,189,248,0.12)_55%,transparent_75%)]" />
          <div className="absolute inset-[48%] rounded-full bg-cyan-400/90 shadow-[0_0_28px_rgba(56,189,248,0.9)]" />

          {/* glowing markers on outer ring */}
          {MARKERS.map((m, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%,-50%) rotate(${m.deg}deg) translateY(-170px)`,
              }}
            >
              <span
                className="block animate-hud-pulse rounded-full bg-cyan-300"
                style={{
                  width: m.s,
                  height: m.s,
                  opacity: m.o,
                  boxShadow: `0 0 10px rgba(${CYAN},0.9)`,
                  animationDelay: `${i * 1.1}s`,
                }}
              />
            </span>
          ))}

          {/* horizontal scan lines */}
          <span
            className="absolute top-1/4 left-0 h-px w-44 animate-scan bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            style={{ animationDelay: "0.8s" }}
          />
          <span
            className="absolute top-2/3 right-0 h-px w-36 animate-scan bg-gradient-to-l from-transparent via-violet-400/40 to-transparent"
            style={{ animationDelay: "3.4s" }}
          />

          {/* floating HUD chips */}
          <div className="absolute -top-4 -left-6 hidden animate-float-slow rounded-lg border border-cyan-400/25 bg-cyan-400/5 px-3 py-2 text-[0.6rem] font-medium tracking-[0.2em] text-cyan-200/70 backdrop-blur-sm sm:block">
            SYS.CORE // ONLINE
          </div>
          <div
            className="absolute -right-8 bottom-6 hidden animate-float rounded-lg border border-violet-400/25 bg-violet-400/5 px-3 py-2 text-[0.6rem] font-medium tracking-[0.2em] text-violet-200/70 backdrop-blur-sm sm:block"
            style={{ animationDelay: "1.6s" }}
          >
            LINK 24/7
          </div>
        </div>
        </motion.div>
      )}

      {/* Layer 6 — floating particles */}
      <motion.div className="absolute inset-0" style={{ x: particleX, y: particleY }}>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute animate-float rounded-full bg-cyan-300"
            style={{
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s,
              opacity: p.o,
              boxShadow: `0 0 6px rgba(${CYAN},0.7)`,
              animationDelay: `${p.d}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 7 — ambient glow */}
      <motion.div className="absolute inset-0" style={{ x: glowX, y: glowY }}>
        <div className="absolute -top-32 right-1/4 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-accent/10 blur-3xl" />
      </motion.div>
    </div>
  );
}