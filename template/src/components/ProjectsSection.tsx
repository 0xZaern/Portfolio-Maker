import { Link } from "react-router-dom";
import { SectionLabel } from "./SectionLabel";
import { ZMark } from "./ZMark";
import { projects } from "../content/site.ts";

export function ProjectsSection() {
  return (
    <section className="relative z-[1] mt-14 md:mt-20 max-w-4xl" aria-label="Projects">
      <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
        <SectionLabel index="004" label="PROJECTS" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="group flex flex-col border border-[color:var(--pm-muted)]/25 no-underline overflow-hidden transition-all duration-200 hover:border-[color:var(--pm-accent)]/50 hover:bg-[color:var(--pm-accent)]/[0.04]"
            aria-label={p.name}
          >
            {/* Thumbnail */}
            <div className="relative h-32 md:h-36 overflow-hidden bg-[color:var(--pm-background)] flex items-center justify-center border-b border-[color:var(--pm-muted)]/25">
              {p.img ? (
                <img
                  src={`/${p.img}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-200 group-hover:opacity-95"
                />
              ) : (
                <ZMark />
              )}
            </div>

            {/* Body */}
            <div className="p-4 md:p-5 flex-1 flex flex-col">
              <div
                className="flex items-center gap-2 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-[color:var(--pm-accent)]/55 text-[10px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[color:var(--pm-ink)] text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[color:var(--pm-accent)]">
                  {p.name}
                </span>
              </div>

              <p
                className="text-[color:var(--pm-muted)] text-[12px] leading-relaxed"
                style={{ fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)" }}
              >
                {p.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
