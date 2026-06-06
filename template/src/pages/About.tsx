import { SectionLabel } from "../components/SectionLabel";
import { config } from "../content/site.ts";

interface BioBeatProps {
  index: string;
  label: string;
  children: React.ReactNode;
}

function BioBeat({ index, label, children }: BioBeatProps) {
  return (
    <div className="border-t border-[color:var(--pm-muted)]/25 py-8 md:py-10">
      <SectionLabel index={index} label={label} />
      {children}
    </div>
  );
}

const paraClass = "text-[color:var(--pm-ink)]/80 leading-[1.8]";
const paraStyle = {
  fontFamily: "var(--pm-font-sans, 'Space Grotesk', system-ui, sans-serif)",
  fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
} as const;

export function About() {
  return (
    <div className="px-6 md:px-10 pt-24 md:pt-28 pb-16 md:pb-24 max-w-3xl mx-auto">

      {/* Page header */}
      <div className="mb-10 md:mb-14">
        <SectionLabel index="001" label="THE STORY" />
        <h1
          className="text-[color:var(--pm-ink)] font-medium leading-tight"
          style={{
            fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
            fontSize: "clamp(2.2rem, 6vw, 5rem)",
          }}
        >
          About
        </h1>
      </div>

      {/* ── About paragraphs from config ────────────────────────────────── */}
      <BioBeat index="002" label="BACKGROUND">
        {config.about.map((para, i) => (
          <p key={i} className={`${paraClass} mb-5`} style={paraStyle}>
            {para}
          </p>
        ))}
      </BioBeat>

      {/* ── Role/focus block ─────────────────────────────────────────────── */}
      <BioBeat index="003" label="FOCUS">
        <p className={`${paraClass} mb-5`} style={paraStyle}>
          {config.role}
        </p>
      </BioBeat>

      {/* ── Closing line ────────────────────────────────────────────────── */}
      <p
        className="mt-12 md:mt-16 italic"
        style={{
          fontFamily: "var(--pm-font-display, 'Fraunces', Georgia, serif)",
          fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
          color: `var(--pm-accent)cc`,
        }}
      >
        &ldquo;{config.tagline}&rdquo;
      </p>

    </div>
  );
}
