import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { signInEmployee, AUTH_ERRORS } from "../../services/authService";
import { COMPANY } from "../../data/content";
import { EASE } from "../../animations/variants";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const inputBase =
  "w-full rounded-xl border border-white/15 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-paper placeholder:text-paper/35 transition-all duration-200 focus:border-accent/70 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(91,91,239,0.15)] focus:outline-none";

function errorMessage(code) {
  switch (code) {
    case AUTH_ERRORS.NETWORK:
      return "Unable to reach the authentication service. Check your connection and try again.";
    case AUTH_ERRORS.EMAIL_NOT_CONFIRMED:
      return "Your email is not confirmed yet. Check your inbox and click the confirmation link, then try again.";
    default:
      return "Invalid email or password. Please try again.";
  }
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const loading = status === "loading";
  const success = status === "success";

  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const value = email.trim();
    if (!value) errors.email = "Email or employee ID is required.";
    else if (value.includes("@") && !emailPattern.test(value))
      errors.email = "Enter a valid email address.";
    else if (!value.includes("@") && value.length < 2)
      errors.email = "Employee ID looks too short.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || success) return;
    const errors = validate();
    setFieldErrors(errors);
    setFormError("");
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");
    try {
      await signInEmployee(email, password);
      setStatus("success");
      setTimeout(() => navigate("/employee-dashboard", { replace: true }), 900);
    } catch (error) {
      setStatus("idle");
      setFormError(errorMessage(error?.code));
    }
  };

  return (
    <motion.form
      variants={container}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 space-y-5"
    >
      {formError && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs leading-relaxed text-red-200"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-300" aria-hidden="true" />
          {formError}
        </motion.div>
      )}

      <motion.div variants={item}>
        <label htmlFor="employee-email" className="sr-only">
          Email or employee ID
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-paper/40"
            aria-hidden="true"
          />
          <input
            id="employee-email"
            type="email"
            autoComplete="email"
            placeholder="Email or employee ID"
            value={email}
            disabled={loading || success}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((p) => ({ ...p, email: "" }));
            }}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "employee-email-error" : undefined}
            className={inputBase}
          />
        </div>
        {fieldErrors.email && (
          <p id="employee-email-error" className="mt-1.5 pl-1 text-xs text-red-300" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </motion.div>

      <motion.div variants={item}>
        <label htmlFor="employee-password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-paper/40"
            aria-hidden="true"
          />
          <input
            id="employee-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            disabled={loading || success}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((p) => ({ ...p, password: "" }));
            }}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "employee-password-error" : undefined}
            className={`${inputBase} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-paper/50 transition-colors hover:text-paper"
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <p id="employee-password-error" className="mt-1.5 pl-1 text-xs text-red-300" role="alert">
            {fieldErrors.password}
          </p>
        )}
      </motion.div>

      <motion.div variants={item} className="flex items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-paper/70">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 cursor-pointer appearance-none rounded border border-white/25 bg-white/5 transition-colors checked:border-accent checked:bg-accent checked:shadow-[0_0_8px_rgba(91,91,239,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          />
          Remember me
        </label>
        <a
          href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Employee Portal — Password Reset Request")}`}
          className="text-xs font-semibold text-accent transition-colors hover:text-violet"
        >
          Forgot password?
        </a>
      </motion.div>

      <motion.div variants={item}>
        <button
          type="submit"
          disabled={loading || success}
          className={`group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-violet px-6 py-4 text-sm font-bold text-paper shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_44px_-6px_rgba(91,91,239,0.65)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 ${
            success ? "from-mint to-mint" : ""
          }`}
        >
          {success ? (
            <>
              <CheckCircle2 className="size-4.5" aria-hidden="true" />
              Authentication successful
            </>
          ) : loading ? (
            <>
              <Loader2 className="size-4.5 animate-spin" aria-hidden="true" />
              Authenticating…
            </>
          ) : (
            <>
              Sign In
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </button>
        <p className="mt-3 text-center text-[0.7rem] text-paper/35">
          Demo mode — use <span className="font-semibold text-accent">demo@oklut.com</span> /
          <span className="font-semibold text-accent"> demo1234</span>
        </p>
      </motion.div>
    </motion.form>
  );
}