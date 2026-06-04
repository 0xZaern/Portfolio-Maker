import { SectionLabel } from "../components/SectionLabel";
import { writing, config } from "../content/site.ts";

export function Articles() {
  return (
    <div className="px-6 md:px-10 pt-24 md:pt-28 pb-16 md:pb-24 max-w-4xl mx-auto">
      <div className="mb-10 md:mb-14">
        <SectionLabel index="001" label="WRITING" />
        <h1
          className="text-[color:var(--pm-ink)] font-medium leading-tight mb-4"
          style={{
            fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
            fontSize: "clamp(2.2rem, 6vw, 5rem)",
          }}
        >
          Articles
        </h1>
        <p
          className="text-[color:var(--pm-muted)] max-w-lg leading-relaxed"
          style={{
            fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
            fontSize: "clamp(0.85rem, 1.2vw, 0.9rem)",
          }}
        >
          Everything I&rsquo;ve published, in one place.
        </p>
        {config.domain && (
          <p
            className="text-[color:var(--pm-muted)]/60 mt-1 max-w-lg leading-relaxed"
            style={{
              fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
              fontSize: "clamp(0.85rem, 1.2vw, 0.9rem)",
            }}
          >
            {config.role} — writing in public.
          </p>
        )}
      </div>

      {/* ── Writing list from config ─────────────────────────────────── */}
      <div className="relative z-[1] border-t border-[color:var(--pm-muted)]/25">
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
                className="relative shrink-0 w-28 md:w-44 self-stretch overflow-hidden"
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
                  className="flex items-center gap-3 mb-1 flex-wrap"
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

        {writing.length === 0 && (
          <p
            className="text-[color:var(--pm-muted)] text-sm py-8"
            style={{ fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)" }}
          >
            No articles yet.
          </p>
        )}
      </div>
    </div>
  );
}
