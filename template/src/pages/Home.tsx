import { Hero } from "../components/Hero";
import { CodingBand } from "../components/CodingBand";
import { SectionLabel } from "../components/SectionLabel";
import { ProjectsSection } from "../components/ProjectsSection";
import { writing } from "../content/site.ts";

export function Home() {
  return (
    <>
      {/* Hero is full viewport */}
      <Hero />

      {/* ── Coding band — dark-to-code transition beneath hero ──────── */}
      <CodingBand />

      {/* ── Latest writing ──────────────────────────────────────────── */}
      <section
        className="relative px-6 md:px-10 pt-16 md:pt-20 pb-8 md:pb-10"
        style={{ zIndex: 10, overflowX: "clip", overflowY: "visible" }}
        aria-label="Latest writing"
      >
        <div className="flex items-baseline justify-between mb-8 max-w-4xl flex-wrap gap-3">
          <SectionLabel index="003" label="LATEST WRITING" />
          {/* Link to first social with 'medium' platform if available */}
          {(() => {
            const medium = writing.find(
              (w) => !w.comingSoon && w.href?.includes("medium.com")
            );
            const mediumHref = medium?.href;
            if (!mediumHref) return null;
            const base = new URL(mediumHref).origin + "/@" + (mediumHref.split("/@")[1]?.split("/")[0] ?? "");
            return (
              <a
                href={base}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--pm-muted)] text-[9px] tracking-[0.2em] uppercase no-underline hover:text-[color:var(--pm-accent)] transition-colors duration-200"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ALL ON MEDIUM →
              </a>
            );
          })()}
        </div>

        <div className="relative z-[1] max-w-4xl border-t border-[color:var(--pm-muted)]/25">
          {writing.map((post, i) => {
            const Card = post.comingSoon ? "div" : "a";
            const cardProps = post.comingSoon
              ? { "aria-disabled": true as const }
              : {
                  href: post.href,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                };
            return (
              <Card
                key={post.href ?? post.title}
                {...cardProps}
                className={`group relative flex items-stretch border-b border-[color:var(--pm-muted)]/25 no-underline overflow-hidden transition-colors duration-200 ${
                  post.comingSoon
                    ? "cursor-default opacity-60"
                    : "hover:bg-[color:var(--pm-accent)]/[0.07]"
                }`}
                aria-label={post.title}
              >
                {/* Angled image strip */}
                <div
                  className="relative shrink-0 w-24 sm:w-36 md:w-52 self-stretch overflow-hidden"
                  style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 30px) 100%, 0 100%)" }}
                >
                  {post.img && (
                    <img
                      src={`/${post.img}`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-65 transition-opacity duration-200 group-hover:opacity-90"
                    />
                  )}
                </div>

                {/* Number */}
                <span
                  className="shrink-0 self-center pl-4 md:pl-6 text-[color:var(--pm-accent)]/55 transition-colors duration-200 group-hover:text-[color:var(--pm-accent)]/90"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Text */}
                <div className="flex-1 min-w-0 self-center py-5 pl-4 md:pl-6 pr-4">
                  <div
                    className="flex items-center gap-3 mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span className="text-[color:var(--pm-muted)] text-[9px] tracking-[0.2em] uppercase">
                      {post.date}
                    </span>
                    <span className="text-[color:var(--pm-accent)]/70 text-[9px] tracking-[0.2em] uppercase">
                      {post.comingSoon ? "COMING SOON" : "WRITING"}
                    </span>
                  </div>
                  <h3
                    className="text-[color:var(--pm-ink)] font-medium leading-tight transition-colors duration-200 group-hover:text-[color:var(--pm-accent)]"
                    style={{
                      fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
                      fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)",
                    }}
                  >
                    {post.title}
                  </h3>
                </div>
              </Card>
            );
          })}
        </div>

        {/* ── Projects ──────────────────────────────────────────────── */}
        <ProjectsSection />
      </section>
    </>
  );
}
