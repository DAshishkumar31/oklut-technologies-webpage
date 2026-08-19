const faceStyle = (half, tint = "91,91,239") => ({
  position: "absolute",
  inset: 0,
  transform: `translateZ(${half}px)`,
  background: `linear-gradient(135deg, rgba(${tint},0.10), rgba(139,92,246,0.04))`,
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 6,
  boxShadow: `inset 0 0 24px rgba(${tint},0.12)`,
});

const CUBE_FACES = [
  (h, tint) => faceStyle(h, tint),
  (h, tint) => ({ ...faceStyle(h, tint), transform: `rotateY(180deg) translateZ(${h}px)` }),
  (h, tint) => ({ ...faceStyle(h, tint), transform: `rotateY(90deg) translateZ(${h}px)` }),
  (h, tint) => ({ ...faceStyle(h, tint), transform: `rotateY(-90deg) translateZ(${h}px)` }),
  (h, tint) => ({ ...faceStyle(h, tint), transform: `rotateX(90deg) translateZ(${h}px)` }),
  (h, tint) => ({ ...faceStyle(h, tint), transform: `rotateX(-90deg) translateZ(${h}px)` }),
];

function Cube({ size, tint = "91,91,239", className = "" }) {
  const half = size / 2;
  return (
    <div className={`animate-float ${className}`}>
      <div
        className="animate-spin-3d-slow [transform-style:preserve-3d]"
        style={{ width: size, height: size }}
      >
        {CUBE_FACES.map((face, i) => (
          <div key={i} style={face(half, tint)} />
        ))}
      </div>
    </div>
  );
}

function OrbitRing({ size, className = "" }) {
  const half = size / 2;
  return (
    <div className={`animate-float-slow ${className}`}>
      <div
        className="animate-spin-y-slow [transform-style:preserve-3d]"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute inset-0 rounded-full border border-accent/35"
          style={{ transform: "rotateX(72deg)" }}
        />
        <div
          className="absolute rounded-full border border-violet/25"
          style={{ inset: half / 3.5, transform: "rotateX(72deg)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 size-2.5 rounded-full bg-accent shadow-glow"
          style={{ transform: `translateX(-50%) rotateX(72deg) translateY(-${half - 16}px)` }}
        />
      </div>
    </div>
  );
}

export default function TechShapes3D({ className = "", beam = false, sparse = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <Cube size={88} className="absolute top-[12%] right-[8%] hidden sm:block" />
      <Cube size={44} tint="139,92,246" className="absolute right-[20%] bottom-[16%]" />
      <OrbitRing size={176} className="absolute bottom-[4%] left-[4%] hidden sm:block" />

      <div className={`absolute top-[24%] left-[10%] animate-float-slow ${sparse ? "hidden md:block" : ""}`}>
        <div className="animate-spin-3d-slow [transform-style:preserve-3d]">
          <div className="size-14 rotate-45 border border-accent/40 bg-accent/5 shadow-[0_0_32px_rgba(91,91,239,0.25)]" />
        </div>
      </div>

      {!sparse && (
        <div className="absolute top-[45%] left-[30%] hidden animate-spin-y-slow [transform-style:preserve-3d] lg:block">
          <div
            className="absolute inset-0 rounded-full border border-white/10"
            style={{ transform: "rotateX(72deg)" }}
          />
          <div style={{ width: 80, height: 80 }} />
        </div>
      )}

      {beam && (
        <div className="absolute inset-y-0 left-0 w-1/3 animate-beam bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
      )}
    </div>
  );
}