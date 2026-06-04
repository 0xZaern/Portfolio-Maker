import { config } from "../content/site.ts";

/**
 * FallbackMark — renders the first letter of config.name as the
 * project fallback mark when no project image is provided.
 */
export function ZMark({ className = "w-10 h-10 md:w-12 md:h-12" }: { className?: string }) {
  const letter = config.name.charAt(0).toUpperCase();
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <text
        x="16"
        y="17"
        fill={config.theme.accent}
        fontFamily="Georgia, serif"
        fontSize="24"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {letter}
      </text>
    </svg>
  );
}
