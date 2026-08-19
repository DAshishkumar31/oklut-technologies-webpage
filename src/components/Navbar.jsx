import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Lock, Menu, X } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled && !open;

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 32);
  });

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-paper/85 shadow-card backdrop-blur-xl"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-[4.5rem]"
        }`}
      >
        <AnimatedLogo dark={transparent} />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-accent"
                    : transparent
                      ? "text-paper/75 hover:text-paper"
                      : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-smooth ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/employee-login"
            className={`group hidden items-center gap-2 rounded-full border border-accent/50 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-[1px] hover:border-accent hover:shadow-[0_6px_24px_-4px_rgba(91,91,239,0.45)] lg:inline-flex ${
              transparent
                ? "bg-paper/5 text-paper/90 hover:bg-accent/10 hover:text-paper"
                : "bg-transparent text-ink/80 hover:bg-accent/5 hover:text-ink"
            }`}
          >
            <Lock
              className="size-3.5 text-accent transition-transform duration-300 group-hover:-translate-y-px"
              aria-hidden="true"
            />
            Employee Login
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors lg:hidden ${
              transparent ? "text-paper hover:bg-paper/10" : "text-ink hover:bg-ink/5"
            }`}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}