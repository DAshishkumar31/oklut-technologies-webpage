import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { getEmployeeSession } from "./services/authService";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Login = lazy(() => import("./pages/Login"));
const EmployeeLogin = lazy(() => import("./pages/EmployeeLogin"));
const EmployeeDashboard = lazy(() => import("./pages/EmployeeDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div className="container-x py-32 text-center text-sm font-medium text-muted" role="status">
      Loading…
    </div>
  );
}

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); // loading | authed | anon

  useEffect(() => {
    let mounted = true;
    getEmployeeSession().then((session) => {
      if (!mounted) return;
      setStatus(session ? "authed" : "anon");
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div
        className="grid min-h-screen place-items-center bg-ink text-paper"
        role="status"
        aria-label="Verifying access"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="relative flex size-12">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex size-12 rounded-full border-2 border-accent/40" />
          </span>
          <p className="text-xs font-semibold tracking-[0.2em] text-paper/50">
            VERIFYING ACCESS…
          </p>
        </div>
      </div>
    );
  }

  if (status === "anon") return <Navigate to="/employee-login" replace />;
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="careers" element={<Careers />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="employee-login" element={<EmployeeLogin />} />
        <Route
          path="employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}