import { Suspense, lazy, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import usePageTitle from "../hooks/usePageTitle";
import { COMPANY } from "../data/content";

const Chatbot = lazy(() => import("../components/chat/Chatbot"));

const TITLES = {
  "/": `${COMPANY.name} — Software, Cloud & Digital Solutions`,
  "/services": `Services — ${COMPANY.name}`,
  "/about": `About — ${COMPANY.name}`,
  "/contact": `Contact — ${COMPANY.name}`,
};

export default function MainLayout() {
  const { pathname } = useLocation();

  usePageTitle(TITLES[pathname] ?? `Page not found — ${COMPANY.name}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </div>
    </MotionConfig>
  );
}