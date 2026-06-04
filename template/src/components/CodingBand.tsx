/**
 * CodingBand — decorative code panel beneath the Hero.
 * The code block itself is fixed/decorative (not config-driven).
 * The intro text and social icon links are driven by site.config.json.
 *
 * See personalweb/src/components/CodingBand.tsx for full design notes.
 */

import { SectionLabel } from "./SectionLabel";
import { config } from "../content/site.ts";
import type { SocialPlatform } from "../config.schema.ts";

// ── Syntax-tinted code line fragments ───────────────────────────────────────
const C = "#6b5d52"; // comment  — muted
const K = "#e8531f"; // keyword  — ember
const S = "#d9a441"; // string   — gold
const T = "#ece6dd"; // plain    — ink (at 75% opacity via wrapper)
const P = T;         // punctuation / operators

type Span = { text: string; color: string };
type Line = Span[];

const CODE_LINES: Line[] = [
  [{ text: "// agent.ts — autonomous tool-calling loop", color: C }],
  [{ text: "", color: P }],
  [{ text: "import ", color: K }, { text: "type ", color: K }, { text: "{ ModelClient } ", color: P }, { text: "from ", color: K }, { text: '"./model";', color: S }],
  [{ text: "import ", color: K }, { text: "type ", color: K }, { text: "{ ToolRegistry } ", color: P }, { text: "from ", color: K }, { text: '"./registry";', color: S }],
  [{ text: "import ", color: K }, { text: "type ", color: K }, { text: "{ MemoryStore } ", color: P }, { text: "from ", color: K }, { text: '"./memory";', color: S }],
  [{ text: "", color: P }],
  [{ text: "const ", color: K }, { text: "MAX_STEPS = ", color: P }, { text: "32", color: S }, { text: ";", color: P }],
  [{ text: "", color: P }],
  [{ text: "interface ", color: K }, { text: "Result { ", color: P }, { text: "solved", color: K }, { text: ": ", color: P }, { text: "boolean", color: K }, { text: "; value: ", color: P }, { text: "unknown", color: K }, { text: " }", color: P }],
  [{ text: "", color: P }],
  [{ text: "async ", color: K }, { text: "function ", color: K }, { text: "runAgent(", color: P }, { text: "goal", color: K }, { text: ": ", color: P }, { text: "string", color: K }, { text: "): ", color: P }, { text: "Promise", color: K }, { text: "<Result> {", color: P }],
  [{ text: "  ", color: P }, { text: "const ", color: K }, { text: "ctx = ", color: P }, { text: "await ", color: K }, { text: "memory.recall(goal);", color: P }],
  [{ text: "  ", color: P }, { text: "let ", color: K }, { text: "steps = ", color: P }, { text: "0", color: S }, { text: ";", color: P }],
  [{ text: "", color: P }],
  [{ text: "  ", color: P }, { text: "while ", color: K }, { text: "(!ctx.solved && steps++ < MAX_STEPS) {", color: P }],
];

function CodePanel() {
  return (
    <pre
      aria-hidden="true"
      style={{
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: "clamp(0.9rem, 1.85vw, 1.5rem)",
        lineHeight: 1.7,
        margin: 0,
        padding: "2.5rem 2.5rem 3rem 2.75rem",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        color: "rgba(236,230,221,0.75)",
        whiteSpace: "pre",
        overflowX: "hidden",
        userSelect: "none",
        width: "max-content",
        minWidth: "100%",
      }}
    >
      {CODE_LINES.map((line, lineIdx) => (
        <div key={lineIdx} style={{ minHeight: "1.78em" }}>
          {line.map((span, spanIdx) => (
            <span key={spanIdx} style={{ color: span.color }}>
              {span.text}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
}

/** Map platform to a simple inline SVG icon. */
function PlatformIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  switch (platform) {
    case "x":
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
        </svg>
      );
    case "medium":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42ZM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M23.07 3.36 19.6 20a1.3 1.3 0 0 1-1.86.74l-5.13-3.78-2.47 2.38c-.27.27-.5.5-1.03.5l.37-5.23 9.5-8.6c.42-.36-.09-.57-.64-.21L6.07 13.04l-5.06-1.58c-1.1-.34-1.12-1.1.23-1.62L21.65 1.9c.92-.34 1.72.22 1.42 1.46Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" />
          <ellipse cx="12" cy="12" rx="4.2" ry="9.5" />
          <path d="M2.8 9h18.4M2.8 15h18.4" />
        </svg>
      );
  }
}

export function CodingBand() {
  // Show first 3 socials as the icon links in the intro panel
  const socialLinks = config.socials.slice(0, 3);

  return (
    <section
      className="coding-band-root relative w-full"
      style={{
        backgroundColor: "var(--pm-background)",
        overflowX: "clip",
        overflowY: "visible",
        marginBottom: "-8rem",
      }}
      aria-label="Introduction"
    >
      <div
        className="coding-band-inner relative flex flex-col md:flex-row md:items-start w-full max-w-[1800px] mx-auto"
        style={{ minHeight: "clamp(320px, 32vw, 440px)" }}
      >

        {/* ── Top-fade scrim ─────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "52%",
            background:
              "linear-gradient(to bottom, var(--pm-background) 0%, rgba(10,8,7,0.92) 9%, rgba(10,8,7,0.58) 24%, rgba(10,8,7,0.18) 42%, transparent 55%)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* ── Left gradient backing ───────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="coding-band-text-scrim"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* ── Editorial intro text ──────────────────────────────────────── */}
        <div
          className="relative flex flex-col justify-start px-6 md:px-14 lg:px-20 py-16 md:pt-28 lg:pt-32 md:pb-0 md:w-1/2 flex-shrink-0"
          style={{ zIndex: 5 }}
        >
          <div style={{ maxWidth: "min(54ch, 92vw)" }}>
            <SectionLabel index="002" label="WHO" />

            {/* First about paragraph */}
            <p
              style={{
                fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
                fontSize: "clamp(1.1rem, 1.75vw, 1.45rem)",
                lineHeight: 1.65,
                fontWeight: 300,
                color: "var(--pm-ink)",
                letterSpacing: "-0.01em",
                textShadow: "0 1px 14px rgba(10,8,7,0.9)",
                margin: 0,
              }}
            >
              {config.about[0]}
            </p>

            {/* Second about paragraph if present */}
            {config.about[1] && (
              <p
                style={{
                  fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
                  fontSize: "clamp(1.1rem, 1.75vw, 1.45rem)",
                  lineHeight: 1.65,
                  fontWeight: 300,
                  color: "var(--pm-ink)",
                  letterSpacing: "-0.01em",
                  textShadow: "0 1px 14px rgba(10,8,7,0.9)",
                  margin: "1.25rem 0 0",
                }}
              >
                {config.about[1]}
              </p>
            )}

            <div
              className="mt-8 w-8 h-px"
              style={{ backgroundColor: "rgba(232,83,31,0.55)" }}
              aria-hidden="true"
            />

            {/* Social icon links from config */}
            {socialLinks.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                {socialLinks.map(({ platform, label, href }) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link no-underline inline-flex items-center justify-center"
                    aria-label={label}
                    style={{ width: "clamp(2.75rem, 4.4vw, 3.9rem)", height: "clamp(2.75rem, 4.4vw, 3.9rem)" }}
                  >
                    <PlatformIcon
                      platform={platform}
                      className="w-full h-full text-[color:var(--pm-muted)] hover:text-[color:var(--pm-accent)] transition-colors duration-200"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Code panel (right side) with 3-D perspective lean ─────────── */}
        <div
          className="coding-band-code-wrap relative flex-1 flex items-center md:justify-end px-4 md:pl-0 md:pr-0 lg:pl-0 lg:pr-0 py-10 md:py-16"
          style={{ zIndex: 2, overflow: "visible" }}
          aria-hidden="true"
        >
          <div
            className="coding-band-perspective-host"
            style={{ position: "relative", zIndex: 2, width: "100%" }}
          >
            <CodePanel />
          </div>
        </div>

      </div>

      {/* ── Scoped responsive styles ──────────────────────────────────────── */}
      <style>{`
        .social-link {
          position: relative;
          padding: 0.7rem;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .social-link:hover {
          background: rgba(232,83,31,0.14);
          box-shadow: 0 0 22px rgba(232,83,31,0.28);
          transform: translateY(-2px);
        }

        @media (min-width: 768px) {
          .coding-band-perspective-host {
            perspective: 1400px;
            transform-style: preserve-3d;
          }
          .coding-band-perspective-host > pre {
            transform: perspective(1400px) rotateY(-18deg);
            transform-origin: right center;
            -webkit-mask-image:
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 5%, rgba(0,0,0,0.55) 14%, rgba(0,0,0,0.85) 26%, black 38%),
              linear-gradient(to bottom, black 0%, black 66%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.18) 92%, transparent 100%);
            -webkit-mask-composite: source-in;
            mask-image:
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 5%, rgba(0,0,0,0.55) 14%, rgba(0,0,0,0.85) 26%, black 38%),
              linear-gradient(to bottom, black 0%, black 66%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.18) 92%, transparent 100%);
            mask-composite: intersect;
          }
          .coding-band-code-wrap {
            transform: translate(-1rem, -3rem);
          }
          .coding-band-text-scrim {
            width: 55%;
            background: linear-gradient(to right, var(--pm-background) 0%, rgba(10,8,7,0.97) 30%, rgba(10,8,7,0.85) 55%, rgba(10,8,7,0.30) 78%, transparent 100%);
          }
        }

        @media (max-width: 767px) {
          .coding-band-root {
            margin-bottom: -3.5rem !important;
          }
          .coding-band-inner {
            min-height: auto !important;
          }
          .coding-band-perspective-host > pre {
            transform: none;
            -webkit-mask-image: linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.4) 75%, transparent 92%);
            mask-image: linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.4) 75%, transparent 92%);
            font-size: 0.75rem !important;
            overflow-x: auto;
            width: 100% !important;
            min-width: 0 !important;
          }
          .coding-band-code-wrap {
            padding-top: 0;
            padding-bottom: 2rem;
            transform: translateY(2rem);
            overflow-x: hidden;
          }
          .coding-band-text-scrim {
            width: 100%;
            background: linear-gradient(to bottom, rgba(10,8,7,0.92) 0%, rgba(10,8,7,0.80) 50%, rgba(10,8,7,0.65) 100%);
          }
        }
      `}</style>
    </section>
  );
}
