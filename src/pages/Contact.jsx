import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import PageHero from "../components/PageHero";
import CTA from "../components/CTA";
import { COMPANY, FORM_FIELDS } from "../data/content";
import { submitContactMessage } from "../services/api";
import { stagger, VIEWPORT, fadeUp } from "../animations/variants";

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call to ask any question",
    value: COMPANY.phone,
    href: COMPANY.phoneHref,
  },
  {
    icon: Mail,
    title: "Email to get a free quote",
    value: COMPANY.email,
    href: COMPANY.emailHref,
  },
  {
    icon: MapPin,
    title: "Visit our office",
    value: COMPANY.address,
    href: null,
  },
];

const initialValues = Object.fromEntries(FORM_FIELDS.map((f) => [f.name, ""]));
const initialErrors = Object.fromEntries(FORM_FIELDS.map((f) => [f.name, ""]));

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const validate = () => {
    const next = { ...initialErrors };
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email address.";
    if (!values.message.trim()) next.message = "Please tell us a little about your project.";
    setErrors(next);
    return Object.values(next).every((e) => !e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await submitContactMessage(values);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const inputClasses = (field) =>
    `w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 ${
      errors[field.name] ? "border-red-400" : "border-line hover:border-ink/20"
    }`;

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="If you have any query, feel free to reach out"
        description="Questions, quotes or a project in mind — talk to a senior team member directly, not a call centre."
      />

      <section className="container-x py-24 sm:py-28">
        {/* Contact cards */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-5 md:grid-cols-3"
        >
          {CONTACT_CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="group rounded-3xl border border-line bg-paper-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <card.icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{card.title}</h2>
              {card.href ? (
                <a href={card.href} className="mt-2 block text-sm font-medium text-accent hover:underline">
                  {card.value}
                </a>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.value}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mx-auto mt-16 max-w-3xl rounded-3xl border border-line bg-paper-soft p-8 shadow-card sm:p-12"
        >
          {status === "sent" ? (
            <div className="flex flex-col items-center py-10 text-center" role="status">
              <span className="grid size-16 place-items-center rounded-full bg-mint/15">
                <CheckCircle2 className="size-8 text-mint" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">Message sent</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                Thank you — your request is with our team. We usually respond within one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setValues(initialValues);
                  setStatus("idle");
                }}
                className="mt-8 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-muted">We'll get back to you within one business day.</p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                {FORM_FIELDS.map((field) => (
                  <div key={field.name} className={field.type === "textarea" || field.type === "select" ? "sm:col-span-2" : ""}>
                    <label htmlFor={`contact-${field.name}`} className="mb-2 block text-sm font-medium text-ink">
                      {field.label}
                      {field.required && (
                        <span className="ml-1 text-accent" aria-hidden="true">
                          *
                        </span>
                      )}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={`contact-${field.name}`}
                        name={field.name}
                        rows={4}
                        value={values[field.name]}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
                        placeholder={field.placeholder}
                        className={inputClasses(field)}
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={`contact-${field.name}`}
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        className={inputClasses(field)}
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`contact-${field.name}`}
                        name={field.name}
                        type={field.type}
                        value={values[field.name]}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
                        placeholder={field.placeholder}
                        className={inputClasses(field)}
                      />
                    )}
                    {errors[field.name] && (
                      <p id={`contact-${field.name}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                {status === "error" && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 sm:col-span-2">
                    Something went wrong sending your message. Please try again or email us directly at{" "}
                    <a href={COMPANY.emailHref} className="underline">
                      {COMPANY.email}
                    </a>
                    .
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-paper transition-all duration-300 hover:bg-accent hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </section>

      <CTA />
    </>
  );
}