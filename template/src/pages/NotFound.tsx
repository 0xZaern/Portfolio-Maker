import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main
      className="px-6 md:px-10 pt-24 md:pt-28 pb-16 md:pb-24 max-w-4xl mx-auto"
      role="main"
      aria-label="Page not found"
    >
      {/* Index mark */}
      <p
        className="text-[color:var(--pm-muted)] text-[9px] tracking-[0.3em] uppercase mb-8"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <span style={{ color: "var(--pm-accent)" }}>—</span>&nbsp;&nbsp;404 / NOT FOUND
      </p>

      <h1
        className="text-[color:var(--pm-ink)] font-medium leading-none mb-6"
        style={{
          fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
          fontSize: "clamp(4rem, 10vw, 9rem)",
        }}
      >
        404
      </h1>

      <p
        className="text-[color:var(--pm-ink)]/60 max-w-sm leading-relaxed mb-10"
        style={{
          fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
          fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
        }}
      >
        Page not found. It may have moved or the link is broken.
      </p>

      <div className="w-8 h-px mb-10" style={{ backgroundColor: "var(--pm-accent)", opacity: 0.4 }} aria-hidden="true" />

      <Link
        to="/"
        className="text-[color:var(--pm-muted)] text-[9px] tracking-[0.25em] uppercase no-underline hover:text-[color:var(--pm-accent)] transition-colors duration-200"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        aria-label="Back to home"
      >
        ← HOME
      </Link>
    </main>
  );
}
