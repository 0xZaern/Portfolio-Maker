/**
 * Portfolio Maker — shared config contract.
 *
 * This is the SINGLE SOURCE OF TRUTH for the shape of `site.config.json`.
 * The CLI (src/cli) writes this object after the prompt wizard.
 * The template (src/template) reads this object at build time to render the site.
 *
 * Both sides MUST import types from this file. Do not redefine them.
 */

export type SocialPlatform =
  | "x"
  | "twitter"
  | "medium"
  | "github"
  | "telegram"
  | "email"
  | "website"
  | "linkedin"
  | "youtube"
  | "discord"
  | "instagram";

export interface SocialLink {
  /** Which platform — drives the icon shown. */
  platform: SocialPlatform;
  /** Display label, e.g. "X / TWITTER". */
  label: string;
  /** Handle or short value, e.g. "@zaern". */
  sublabel: string;
  /** Full URL or mailto:. */
  href: string;
}

export interface ProjectEntry {
  /** url-safe slug, e.g. "github-automated". */
  slug: string;
  name: string;
  /** one-line hook under the title. */
  tagline: string;
  /** filename in /public (copied by the CLI). Omit -> renders fallback mark. */
  img?: string;
  /** GitHub repo URL — shows the GITHUB button when present. */
  github?: string;
  /** optional REQUEST API target (link or mailto). */
  requestApi?: string;
  /** paragraphs / feature bullets on the detail page. */
  body: string[];
}

export interface WritingEntry {
  /** short date label, e.g. "May 31". */
  date: string;
  title: string;
  /** filename in /public for the card image. */
  img?: string;
  /**
   * External post URL (Medium, Substack, personal blog, etc.).
   * Omit together with `comingSoon: true` to render a placeholder card.
   */
  href?: string;
  comingSoon?: boolean;
}

export interface ContactEntry {
  label: string;
  value: string;
  href: string;
  platform: SocialPlatform;
}

export interface ThemeConfig {
  /** accent / ember color, hex. */
  accent: string;
  /** page background, hex. Defaults to near-black warm. */
  background?: string;
  /** primary text / ink color, hex. */
  ink?: string;
}

export interface FontConfig {
  /**
   * "google" -> heading/body are Google Font family names, fetched at build.
   * "byo"    -> heading/body map to local .woff2 files in fonts[].
   */
  source: "google" | "byo";
  heading: string;
  body: string;
  /** for source:"byo" — filenames the CLI copied into the template. */
  files?: { family: string; file: string; weight?: string }[];
}

export interface AssetConfig {
  /** logo / wordmark — also used to derive the favicon. filename in /public. */
  logo?: string;
  /** hero / first-page background or feature image. filename in /public. */
  hero?: string;
  /** social-share preview image (Open Graph / Twitter). filename in /public. */
  og?: string;
}

export interface SiteConfig {
  /** short identity used across the site. */
  name: string;
  /** wordmark / hero headline text. Defaults to `name` uppercased. */
  headline?: string;
  role: string;
  /** one or two line tagline shown in the hero. */
  tagline: string;
  /** longer about-page prose, one entry per paragraph. */
  about: string[];
  /** production domain, e.g. "zaern.xyz" — used for OG meta + footer. */
  domain?: string;

  theme: ThemeConfig;
  fonts: FontConfig;
  assets: AssetConfig;

  socials: SocialLink[];
  contact: ContactEntry[];
  projects: ProjectEntry[];
  writing: WritingEntry[];
}
