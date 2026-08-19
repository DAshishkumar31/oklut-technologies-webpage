import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export default function useTilt(maxDeg = 7) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 260, damping: 22, mass: 0.6 });
  const springRy = useSpring(ry, { stiffness: 260, damping: 22, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry.set(px * maxDeg);
      rx.set(-py * maxDeg);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [maxDeg, rx, ry]);

  return {
    ref,
    style: {
      rotateX: springRx,
      rotateY: springRy,
      transformStyle: "preserve-3d",
    },
  };
}