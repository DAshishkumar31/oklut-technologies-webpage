import { Suspense, useEffect, useRef, useState } from "react";

export default function LazySection({ children, className = "", minHeight = "min-h-[24rem]" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${ready ? "" : minHeight}`}>
      {ready && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
}