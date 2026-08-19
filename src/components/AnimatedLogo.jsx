import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";

const LOGO_SRC = `${import.meta.env.BASE_URL}oklut-logo.png`;

const PARTICLES = [
  { x: -46, y: -20 },
  { x: 46, y: -14 },
  { x: -34, y: 24 },
  { x: 38, y: 26 },
  { x: -12, y: -38 },
  { x: 16, y: 34 },
];

export default function AnimatedLogo({ variant = "navbar", dark = false, className = "" }) {
  const reduced = useReducedMotion();
  const [errored, setErrored] = useState(false);
  const login = variant === "login";

  if (errored) {
    return <Logo dark={dark} className={className} />;
  }

  const imgClasses = `block w-auto select-none ${login ? "h-11" : "h-8"} ${
    dark
      ? "brightness-0 invert drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]"
      : "drop-shadow-[0_2px_6px_rgba(11,15,26,0.15)]"
  }`;

  if (reduced) {
    return (
      <Link
        to="/"
        aria-label="Oklut Technologies — home"
        className={`group inline-flex items-center ${className}`}
      >
        <img src={LOGO_SRC} onError={() => setErrored(true)} alt="" aria-hidden="true" draggable={false} className={imgClasses} />
      </Link>
    );
  }

  return (
    <Link
      to="/"
      aria-label="Oklut Technologies — home"
      className={`group relative inline-flex items-center ${className}`}
    >
      {login && (
        <>
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(56,189,248,0.5), rgba(91,91,239,0.28) 55%, transparent 78%)",
              filter: "blur(10px)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.9, 0.55], scale: [0.5, 1.35, 1] }}
            transition={{ duration: 1.6, times: [0, 0.45, 1], ease: "easeOut" }}
          />
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute size-1.5 rounded-full bg-cyan-300"
              style={{ boxShadow: "0 0 8px rgba(103,232,249,0.9)" }}
              initial={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
              animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
              transition={{ delay: 0.55 + i * 0.05, duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </>
      )}
      <span
        aria-hidden="true"
        className="absolute -inset-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(103,232,249,0.55), rgba(91,91,239,0.3) 55%, transparent 78%)",
          filter: "blur(10px)",
        }}
      />
      <motion.span
        className="relative block overflow-hidden rounded-md"
        initial={login ? { opacity: 0, y: 10, filter: "blur(6px)" } : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: login ? 0.9 : 0.5, delay: login ? 0.9 : 0, ease: "easeOut" }}
        whileHover={{ scale: 1.02, rotate: 1.2 }}
      >
        <img
          src={LOGO_SRC}
          onError={() => setErrored(true)}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={imgClasses}
        />
      </motion.span>
    </Link>
  );
}