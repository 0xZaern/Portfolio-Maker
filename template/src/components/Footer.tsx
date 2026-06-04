import { config } from "../content/site.ts";

export function Footer() {
  const year = new Date().getFullYear();
  const domainLabel = config.domain?.toUpperCase() ?? config.name.toUpperCase();

  return (
    <footer
      className="border-t border-[color:var(--pm-muted)]/25 px-6 md:px-10 py-2"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="max-w-screen-2xl mx-auto w-full flex flex-row items-center justify-between gap-3 flex-wrap">
        {/* Socials from config */}
        <div className="flex items-center gap-4 flex-wrap">
          {config.socials.map(({ platform, label, href }) => (
            <a
              key={platform}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[color:var(--pm-muted)] text-[9px] tracking-[0.25em] uppercase no-underline hover:text-[color:var(--pm-accent)] transition-colors duration-200 min-h-[44px] flex items-center py-3"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Domain + year */}
        <p className="text-[color:var(--pm-muted)]/50 text-[8px] tracking-[0.18em] uppercase">
          {domainLabel}&nbsp;&nbsp;·&nbsp;&nbsp;{year}
        </p>
      </div>
    </footer>
  );
}
