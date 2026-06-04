interface SectionLabelProps {
  index?: string;
  label: string;
}

export function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <p
      className="text-[--pm-muted] text-[9px] tracking-[0.3em] uppercase mb-6"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {index && (
        <>
          <span style={{ color: "var(--pm-accent)" }}>—</span>&nbsp;&nbsp;{index} /{" "}
        </>
      )}
      {label}
    </p>
  );
}
