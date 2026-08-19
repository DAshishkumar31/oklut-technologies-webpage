import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Tech3DBackground from "../components/animations/Tech3DBackground";
import SecurityVisual from "../components/auth/SecurityVisual";
import LoginCard from "../components/auth/LoginCard";
import LoginForm from "../components/auth/LoginForm";
import AnimatedLogo from "../components/AnimatedLogo";
import usePageTitle from "../hooks/usePageTitle";
import { COMPANY } from "../data/content";
import { EASE } from "../animations/variants";

const headerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function EmployeeLogin() {
  usePageTitle(`Employee Portal — ${COMPANY.name}`);

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-paper">
      {/* animated tech background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-0"
      >
        <Tech3DBackground hud={false} />
      </motion.div>

      {/* dim the area behind the card so the form stays readable */}
      <div
        className="absolute inset-0 bg-[radial-gradient(34rem_28rem_at_50%_46%,rgb(2_4_14/0.78),transparent_72%)]"
        aria-hidden="true"
      />
      <SecurityVisual />

      <main className="container-x relative flex min-h-screen items-center justify-center py-24">
        <LoginCard>
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={headerItem}>
              <AnimatedLogo dark variant="login" />
            </motion.div>
            <motion.h1
              variants={headerItem}
              className="mt-7 font-display text-3xl font-bold tracking-tight text-paper"
            >
              Employee <span className="text-gradient">Portal</span>
            </motion.h1>
            <motion.p
              variants={headerItem}
              className="mt-2 text-sm leading-relaxed text-paper/55"
            >
              Sign in to access your employee workspace.
            </motion.p>
            <motion.div
              variants={headerItem}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[0.65rem] font-bold tracking-[0.18em] text-accent"
            >
              <span className="relative flex size-1.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              SECURE EMPLOYEE ACCESS
            </motion.div>
          </motion.div>

          <LoginForm />
        </LoginCard>
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-paper/50 transition-colors hover:text-paper"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}