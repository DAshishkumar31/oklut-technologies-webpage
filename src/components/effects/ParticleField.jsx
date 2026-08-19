import { useEffect, useRef } from "react";

export default function ParticleField({ className = "", density = 45, speed = 0.16 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const particles = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 0.55 + 0.3,
      vy: (Math.random() * 0.25 + 0.07) * speed,
      vx: (Math.random() - 0.5) * 0.05 * speed,
      a: Math.random() * 0.45 + 0.12,
      tw: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible && !document.hidden) {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
          p.x += p.vx * dt;
          p.y -= p.vy * dt;
          p.tw += dt * 1.4;
          if (p.y < -0.05) {
            p.y = 1.05;
            p.x = Math.random();
          }
          if (p.x < -0.05) p.x = 1.05;
          if (p.x > 1.05) p.x = -0.05;
          const twinkle = 0.55 + 0.45 * Math.sin(p.tw);
          ctx.beginPath();
          ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${p.a * twinkle})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [density, speed]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}