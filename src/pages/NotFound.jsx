import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { COMPANY } from "../data/content";

export default function NotFound() {
  usePageTitle(`Page not found — ${COMPANY.name}`);
  return (
    <section className="container-x flex flex-col items-center py-32 text-center">
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-md text-muted">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent"
      >
        Back to home
      </Link>
    </section>
  );
}