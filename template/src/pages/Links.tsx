import { Link } from "react-router-dom";
import { SectionLabel } from "../components/SectionLabel";
import { socials, contact, config } from "../content/site.ts";
import type { SocialPlatform } from "../config.schema.ts";

/* ── Inline brand / glyph icons (currentColor, no external deps) ──────── */
type IconProps = { className?: string };

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function MediumIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42ZM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z" />
    </svg>
  );
}

function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <ellipse cx="12" cy="12" rx="4.2" ry="9.5" />
      <path d="M2.8 9h18.4M2.8 15h18.4" />
    </svg>
  );
}

function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.07 3.36 19.6 20a1.3 1.3 0 0 1-1.86.74l-5.13-3.78-2.47 2.38c-.27.27-.5.5-1.03.5l.37-5.23 9.5-8.6c.42-.36-.09-.57-.64-.21L6.07 13.04l-5.06-1.58c-1.1-.34-1.12-1.1.23-1.62L21.65 1.9c.92-.34 1.72.22 1.42 1.46Z" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function DiscordIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
    </svg>
  );
}

function getIcon(platform: SocialPlatform): (p: IconProps) => React.ReactElement {
  switch (platform) {
    case "x":
    case "twitter":
      return XIcon;
    case "medium":
      return MediumIcon;
    case "github":
      return GithubIcon;
    case "telegram":
      return TelegramIcon;
    case "email":
      return MailIcon;
    case "linkedin":
      return LinkedinIcon;
    case "youtube":
      return YoutubeIcon;
    case "discord":
      return DiscordIcon;
    default:
      return GlobeIcon;
  }
}

/* ── Social tile inner ─────────────────────────────────────────────────── */
function TileInner({
  label,
  sublabel,
  Icon,
}: {
  label: string;
  sublabel: string;
  Icon: (p: IconProps) => React.ReactElement;
}) {
  return (
    <>
      <div className="flex items-start justify-between">
        <span
          className="text-[color:var(--pm-muted)]/30 text-[8px] transition-colors duration-200 group-hover:text-[color:var(--pm-accent)]/40"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          aria-hidden="true"
        >
          ┌
        </span>
        <Icon className="w-6 h-6 text-[color:var(--pm-muted)] transition-colors duration-200 group-hover:text-[color:var(--pm-accent)]" />
      </div>

      <div className="mt-8">
        <p
          className="text-[color:var(--pm-ink)] text-[10px] tracking-[0.25em] uppercase mb-2 transition-colors duration-200 group-hover:text-[color:var(--pm-accent)]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {label}
        </p>
        <p
          className="text-[color:var(--pm-muted)] text-[11px] leading-relaxed"
          style={{ fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)" }}
        >
          {sublabel}
        </p>
      </div>

      <div className="flex justify-end mt-6">
        <span
          className="text-[color:var(--pm-muted)]/30 text-[10px] transition-all duration-200 group-hover:text-[color:var(--pm-accent)]/60 group-hover:translate-x-0.5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </>
  );
}

const tileClass =
  "group flex flex-col justify-between h-full min-h-[148px] border border-[color:var(--pm-muted)]/25 p-5 md:p-6 no-underline transition-all duration-200 hover:border-[color:var(--pm-accent)]/50 hover:bg-[color:var(--pm-accent)]/[0.04]";

function SocialCard({
  label,
  sublabel,
  href,
  platform,
}: {
  label: string;
  sublabel: string;
  href: string;
  platform: SocialPlatform;
}) {
  const Icon = getIcon(platform);
  const internal = href === "/" || href.startsWith("#");

  if (internal) {
    return (
      <Link to={href} className={tileClass} aria-label={label}>
        <TileInner label={label} sublabel={sublabel} Icon={Icon} />
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={tileClass}
      aria-label={label}
    >
      <TileInner label={label} sublabel={sublabel} Icon={Icon} />
    </a>
  );
}

/* ── Contact button ────────────────────────────────────────────────────── */
function ContactButton({
  label,
  value,
  href,
  platform,
}: {
  label: string;
  value: string;
  href: string;
  platform: SocialPlatform;
}) {
  const Icon = getIcon(platform);
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 border border-[color:var(--pm-muted)]/25 px-5 py-4 no-underline transition-all duration-200 hover:border-[color:var(--pm-accent)]/50 hover:bg-[color:var(--pm-accent)]/[0.06]"
      aria-label={`${label} ${value}`}
    >
      <span className="flex items-center justify-center w-10 h-10 border border-[color:var(--pm-muted)]/25 shrink-0 transition-colors duration-200 group-hover:border-[color:var(--pm-accent)]/40">
        <Icon className="w-5 h-5 text-[color:var(--pm-muted)] transition-colors duration-200 group-hover:text-[color:var(--pm-accent)]" />
      </span>
      <span className="flex-1 min-w-0">
        <span
          className="block text-[color:var(--pm-ink)] text-[10px] tracking-[0.25em] uppercase mb-1 transition-colors duration-200 group-hover:text-[color:var(--pm-accent)]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {label}
        </span>
        <span
          className="block text-[color:var(--pm-muted)] text-[12px] truncate"
          style={{ fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)" }}
        >
          {value}
        </span>
      </span>
      <span
        className="text-[color:var(--pm-muted)]/30 text-[10px] transition-all duration-200 group-hover:text-[color:var(--pm-accent)]/60 group-hover:translate-x-0.5"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        aria-hidden="true"
      >
        →
      </span>
    </a>
  );
}

export function Links() {
  return (
    <div className="px-6 md:px-10 pt-24 md:pt-28 pb-16 md:pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <SectionLabel index="001" label="ELSEWHERE" />
        <h1
          className="text-[color:var(--pm-ink)] font-medium leading-tight mb-4"
          style={{
            fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
            fontSize: "clamp(2.2rem, 6vw, 5rem)",
          }}
        >
          Links
        </h1>
        <p
          className="text-[color:var(--pm-muted)] max-w-lg leading-relaxed"
          style={{
            fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
            fontSize: "clamp(0.85rem, 1.2vw, 0.9rem)",
          }}
        >
          Where to find {config.name}, what&rsquo;s being built in public, and how to reach out directly.
        </p>
      </div>

      {/* Social grid from config.socials */}
      {socials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {socials.map((tile) => (
            <SocialCard
              key={tile.platform}
              label={tile.label}
              sublabel={tile.sublabel}
              href={tile.href}
              platform={tile.platform}
            />
          ))}
        </div>
      )}

      {/* ── Contact ──────────────────────────────────────────────────── */}
      {contact.length > 0 && (
        <div className="mt-14 md:mt-20 border-t border-[color:var(--pm-muted)]/25 pt-10">
          <SectionLabel index="002" label="CONTACT" />
          <p
            className="text-[color:var(--pm-muted)] max-w-lg leading-relaxed mb-7"
            style={{
              fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
              fontSize: "clamp(0.85rem, 1.2vw, 0.9rem)",
            }}
          >
            Fastest on {contact[0]?.label}. For anything longer, {contact[1]?.label?.toLowerCase() ?? "email"} works just as well.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {contact.map((c) => (
              <ContactButton
                key={c.platform}
                label={c.label}
                value={c.value}
                href={c.href}
                platform={c.platform}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
