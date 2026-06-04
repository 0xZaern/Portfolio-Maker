import { Link, useParams } from "react-router-dom";
import { projects } from "../content/site.ts";
import { ZMark } from "../components/ZMark";
import { SectionLabel } from "../components/SectionLabel";

const mono = "'JetBrains Mono', monospace";

function Button({
  href,
  label,
  primary,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-2 px-5 py-3 no-underline text-[10px] tracking-[0.25em] uppercase transition-all duration-200 ${
        primary
          ? "bg-[color:var(--pm-accent)] text-[color:var(--pm-background)] hover:opacity-90"
          : "border border-[color:var(--pm-muted)]/40 text-[color:var(--pm-ink)] hover:border-[color:var(--pm-accent)]/60 hover:text-[color:var(--pm-accent)]"
      }`}
      style={{ fontFamily: mono }}
    >
      {label}
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
    </a>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="px-6 md:px-10 pt-28 pb-24 max-w-4xl mx-auto">
        <p className="text-[color:var(--pm-muted)]" style={{ fontFamily: mono }}>
          Project not found.
        </p>
        <Link
          to="/"
          className="text-[color:var(--pm-accent)] text-[11px] tracking-[0.2em] uppercase no-underline"
          style={{ fontFamily: mono }}
        >
          ← Back home
        </Link>
      </div>
    );
  }

  const [lead, ...rest] = project.body;

  return (
    <div className="px-6 md:px-10 pt-24 md:pt-28 pb-16 md:pb-24 max-w-5xl mx-auto">
      {/* Back link */}
      <Link
        to="/"
        className="inline-block mb-10 text-[color:var(--pm-muted)] text-[10px] tracking-[0.25em] uppercase no-underline hover:text-[color:var(--pm-accent)] transition-colors duration-200"
        style={{ fontFamily: mono }}
      >
        ← Projects
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* ── Left: photo ─────────────────────────────────────────── */}
        <div className="md:sticky md:top-24">
          <div className="relative w-full aspect-[4/3] border border-[color:var(--pm-muted)]/25 overflow-hidden bg-[color:var(--pm-background)] flex items-center justify-center">
            {project.img ? (
              <img
                src={`/${project.img}`}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <ZMark className="w-24 h-24 md:w-32 md:h-32" />
            )}
          </div>
        </div>

        {/* ── Right: text + actions ───────────────────────────────── */}
        <div>
          <SectionLabel index="001" label="PROJECT" />
          <h1
            className="text-[color:var(--pm-ink)] font-medium leading-tight mb-3"
            style={{
              fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            {project.name}
          </h1>
          <p
            className="text-[color:var(--pm-accent)]/80 mb-7 text-[13px] tracking-[0.05em]"
            style={{ fontFamily: mono }}
          >
            {project.tagline}
          </p>

          {/* Lead paragraph */}
          {lead && (
            <p
              className="text-[color:var(--pm-ink)]/80 leading-relaxed mb-6"
              style={{
                fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
                fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
              }}
            >
              {lead}
            </p>
          )}

          {/* Feature bullets */}
          {rest.length > 0 && (
            <ul className="space-y-3 mb-10">
              {rest.map((line) => (
                <li key={line} className="flex gap-3">
                  <span
                    className="text-[color:var(--pm-accent)]/70 shrink-0 mt-[2px] text-[11px]"
                    style={{ fontFamily: mono }}
                    aria-hidden="true"
                  >
                    ▹
                  </span>
                  <span
                    className="text-[color:var(--pm-muted)] leading-relaxed"
                    style={{
                      fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {project.requestApi && (
              <Button href={project.requestApi} label="Request API" primary />
            )}
            {project.github && <Button href={project.github} label="GitHub" />}
          </div>
        </div>
      </div>
    </div>
  );
}
