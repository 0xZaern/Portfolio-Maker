/**
 * Config loader — single source of truth for all site content.
 *
 * Imports site.config.json (two levels up from src/) and re-exports
 * everything as typed data using the SiteConfig types from the shared schema.
 * Every page/component reads from these exports; nothing reads from
 * personalweb's old per-file content modules.
 */

import type { SiteConfig } from "../config.schema.ts";
import rawConfig from "../../site.config.json";

// Cast the JSON import to SiteConfig. Vite resolves JSON at build time so
// this is a zero-runtime operation — the object is already fully typed.
export const config: SiteConfig = rawConfig as SiteConfig;

// ── Convenience re-exports ──────────────────────────────────────────────────

export const { name, headline, role, tagline, about, domain, theme, fonts, assets, socials, contact, projects, writing } = config;

/** Resolved headline: if not set in config, uppercase the name. */
export const displayHeadline = headline ?? name.toUpperCase();

/** Resolved background color with fallback. */
export const bgColor = theme.background ?? "#0a0807";

/** Resolved ink color with fallback. */
export const inkColor = theme.ink ?? "#ece6dd";

/** Resolved accent color. */
export const accentColor = theme.accent;

/**
 * Muted color derived from bg/ink — kept fixed because it's a design constant
 * in the original palette (warm dark grey). Components use this for borders,
 * labels, and secondary text.
 */
export const mutedColor = "#6b5d52";

/**
 * Returns the muted color with an inline alpha suffix.
 * Useful for one-off opacity values where a CSS variable isn't available.
 * @param alpha - hex two-digit alpha, e.g. "40" for 25% opacity
 */
export function mutedAlpha(alpha: string): string {
  return `${mutedColor}${alpha}`;
}
