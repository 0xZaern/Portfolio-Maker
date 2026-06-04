import { config, displayHeadline, bgColor } from "../content/site.ts";

export function Hero() {
  const heroSrc = config.assets.hero ? `/${config.assets.hero}` : undefined;
  const domain = config.domain?.toUpperCase() ?? "";

  return (
    <section
      className="relative w-full min-h-svh flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background image (from config.assets.hero) ─────────────── */}
      {heroSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroSrc}')` }}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* ── Gradient overlay: dark at bottom so text is legible ─────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${bgColor}26 0%, ${bgColor}59 40%, ${bgColor}d1 72%, ${bgColor}f7 100%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Corner bracket — top-left editorial mark ─────────────────── */}
      <span
        className="absolute top-16 left-6 md:left-10 text-[9px] tracking-[0.2em] select-none pointer-events-none leading-none"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: `${bgColor}80` }}
        aria-hidden="true"
      >
        ┌
      </span>

      {/* ── Corner bracket — top-right ───────────────────────────────── */}
      <span
        className="absolute top-16 right-6 md:right-10 text-[9px] tracking-[0.2em] select-none pointer-events-none leading-none"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: `${bgColor}80` }}
        aria-hidden="true"
      >
        ┐
      </span>

      {/* ── Main content — lower-left anchor ─────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-10 pb-16 md:pb-24">

        {/* Index mark */}
        <p
          className="text-[color:var(--pm-muted)] text-[9px] tracking-[0.3em] uppercase mb-6 md:mb-8"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span style={{ color: "var(--pm-accent)" }}>—</span>&nbsp;&nbsp;001 / PORTFOLIO
        </p>

        {/* Display headline from config */}
        <h1
          className="text-[color:var(--pm-ink)] font-medium leading-none tracking-tight mb-4 md:mb-6 select-none"
          style={{
            fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
            fontSize: "clamp(5rem, 14vw, 13rem)",
            fontOpticalSizing: "auto",
          } as React.CSSProperties}
        >
          {displayHeadline}
        </h1>

        {/* Tagline from config */}
        <p
          className="text-[color:var(--pm-ink)]/70 max-w-md leading-relaxed"
          style={{
            fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
            fontSize: "clamp(0.875rem, 1.6vw, 1.05rem)",
            fontWeight: 300,
          }}
        >
          {config.tagline}
        </p>

        {/* Thin horizontal rule below tagline */}
        <div
          className="mt-8 md:mt-10 w-16 h-px"
          style={{ backgroundColor: `var(--pm-accent)` + "99" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Bottom bar: domain credit ──────────────────────────────── */}
      <div
        className="relative z-10 border-t border-[color:var(--pm-muted)]/25 flex items-center justify-end px-6 md:px-10 py-3"
      >
        {domain && (
          <>
            <p
              className="text-[8px] tracking-[0.18em] uppercase text-right hidden sm:block"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: `var(--pm-accent)cc` }}
              aria-label="Domain"
            >
              {config.role.toUpperCase()}&nbsp;&nbsp;·&nbsp;&nbsp;{domain}
            </p>
            <p
              className="text-[8px] tracking-[0.18em] uppercase sm:hidden"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: `var(--pm-accent)cc` }}
              aria-hidden="true"
            >
              {domain}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
