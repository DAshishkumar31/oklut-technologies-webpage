import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { CAREER_DEPARTMENTS } from "../../data/careers";

const CARD_POSITIONS = [
  "left-0 top-[8%]",
  "right-0 top-[18%]",
  "left-[4%] bottom-[14%]",
  "right-[6%] bottom-[6%]",
  "left-1/2 -translate-x-1/2 -top-2",
];

const FLOAT_CLASSES = ["animate-float", "animate-float-slow", "animate-float-slow", "animate-float", "animate-float"];

export default function CareersVisual() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18 });
  const springY = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reduced) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(px * 22);
      my.set(py * 22);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my, reduced]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md">
      <motion.div style={{ x: springX, y: springY }}>
        <div className="relative aspect-square">
          <div className="absolute inset-0 animate-spin-cw-slow rounded-full border border-dashed border-accent/35" />
          <div className="absolute inset-[12%] animate-spin-ccw-slow rounded-full border border-violet/25" />
          <div className="absolute inset-[24%] animate-hud-pulse rounded-full border border-cyan-300/20" />
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgb(91_91_239/0.18),transparent_70%)]" />

          <div className="absolute inset-[30%] grid place-items-center rounded-full border border-accent/40 glass-strong shadow-glow">
            <div className="text-center">
              <span className="mx-auto mb-3 flex size-2.5 items-center justify-center">
                <span className="absolute size-2.5 animate-ping rounded-full bg-mint opacity-60" />
                <span className="size-2.5 rounded-full bg-mint" />
              </span>
              <p className="font-display text-sm font-bold tracking-[0.14em] text-paper">WE'RE</p>
              <p className="font-display text-sm font-bold tracking-[0.14em] text-gradient">HIRING</p>
            </div>
          </div>

          {!reduced && (
            <>
              {CAREER_DEPARTMENTS.slice(0, 5).map((dept, i) => (
                <div
                  key={dept}
                  className={`absolute ${CARD_POSITIONS[i]} ${FLOAT_CLASSES[i]} hidden md:block`}
                  aria-hidden="true"
                >
                  <div
                    className={`glass rounded-xl border border-accent/30 px-4 py-2 text-xs font-semibold tracking-wide text-paper/85 shadow-[0_8px_24px_-8px_rgba(91,91,239,0.4)] ${
                      i === 4 ? "border-cyan-300/40" : ""
                    }`}
                  >
                    {dept}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:hidden" aria-hidden="true">
        {CAREER_DEPARTMENTS.slice(0, 5).map((dept) => (
          <span
            key={dept}
            className="glass rounded-lg border border-accent/30 px-3 py-1.5 text-center text-[0.65rem] font-semibold tracking-wide text-paper/80"
          >
            {dept}
          </span>
        ))}
      </div>
    </div>
  );
}