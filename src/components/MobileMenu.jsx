import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "../data/content";
import { EASE } from "../animations/variants";

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-paper lg:hidden"
        >
          <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: EASE }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive ? "bg-accent-soft text-accent" : "text-ink/80 hover:bg-ink/5"
                    }`
                  }
                >
                  {link.label}
                  <ArrowRight className="size-4 opacity-40" aria-hidden="true" />
                </NavLink>
              </motion.div>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4">
              <Link
                to="/employee-login"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/50 px-5 py-3 text-sm font-semibold text-accent"
              >
                <Lock className="size-4" aria-hidden="true" />
                Employee Login
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
              >
                Get a quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}