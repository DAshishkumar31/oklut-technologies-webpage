import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import TechShapes3D from "./effects/TechShapes3D";
import { COMPANY, NAV_LINKS, SERVICES } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <TechShapes3D sparse className="opacity-60" />
      <div className="container-x relative pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-4">
            <AnimatedLogo dark />
            <p className="max-w-sm text-sm leading-relaxed text-paper/55">
              {COMPANY.name} is an Indian IT partner delivering software, cloud and digital
              marketing solutions — from first idea to long-term scale.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">
                <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
                Support 24/7
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Since {COMPANY.founded}
              </span>
            </div>
          </div>

          {/* Pages */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">Company</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-paper/70 transition-colors hover:text-paper"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-1 text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  Client portal
                  <ArrowUpRight
                    className="size-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">Services</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="text-sm text-paper/70 transition-colors hover:text-paper">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">Get in touch</p>
            <address className="mt-5 space-y-4 not-italic">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-paper/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {COMPANY.address}
              </p>
              <p>
                <a
                  href={COMPANY.emailHref}
                  className="flex items-center gap-3 text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </p>
              <p>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-3 text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  <Phone className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {COMPANY.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-xs text-paper/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p>Software · Cloud · Marketing — engineered in {COMPANY.city}</p>
        </div>
      </div>
    </footer>
  );
}