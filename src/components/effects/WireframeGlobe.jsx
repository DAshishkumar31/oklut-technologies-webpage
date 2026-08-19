export default function WireframeGlobe({ className = "" }) {
  return (
    <div aria-hidden="true" className={`perspective-3d ${className}`}>
      <div className="preserve-3d size-full animate-spin-3d">
        <svg viewBox="0 0 200 200" className="size-full overflow-visible">
          <defs>
            <linearGradient id="wg-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5b5bef" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#wg-line)" strokeWidth="0.7" opacity="0.85">
            <circle cx="100" cy="100" r="80" />
            <ellipse cx="100" cy="100" rx="80" ry="26" />
            <ellipse cx="100" cy="100" rx="80" ry="52" />
            <ellipse cx="100" cy="100" rx="80" ry="72" />
            <path d="M20 100h160" />
            <path d="M20 74h160" />
            <path d="M20 126h160" />
            <path d="M100 20v160" opacity="0.4" />
          </g>
          <g fill="#8b5cf6" opacity="0.9">
            <circle cx="100" cy="20" r="2.4" />
            <circle cx="20" cy="100" r="2.4" />
            <circle cx="180" cy="100" r="2.4" />
            <circle cx="100" cy="180" r="2.4" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 -z-10 rounded-full bg-accent/15 blur-3xl" />
    </div>
  );
}