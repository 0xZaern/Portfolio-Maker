import {
  input,
  select,
  confirm,
  checkbox,
} from "@inquirer/prompts";
import {
  SiteConfig,
  SocialLink,
  SocialPlatform,
  ContactEntry,
  ProjectEntry,
  WritingEntry,
} from "../../shared/config.schema";
import { GOOGLE_FONT_PRESETS } from "./fonts";
import { validateAssetPath } from "./assets";
import { logger } from "./logger";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function validateHex(val: string): true | string {
  return HEX_RE.test(val) ? true : 'Enter a valid 6-digit hex color, e.g. "#e8531f".';
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  "x",
  "twitter",
  "medium",
  "github",
  "telegram",
  "email",
  "website",
  "linkedin",
  "youtube",
  "discord",
];

// ── identity ──────────────────────────────────────────────────────────────────

async function promptIdentity(): Promise<
  Pick<SiteConfig, "name" | "headline" | "role" | "tagline" | "about" | "domain">
> {
  logger.heading("Identity");

  const name = await input({ message: "Your name / handle:" });
  const headline = await input({
    message: "Wordmark / headline text (leave blank to use name uppercased):",
    default: name.toUpperCase(),
  });
  const role = await input({ message: "Role (e.g. Builder / Engineer):" });
  const tagline = await input({ message: "Hero tagline (one or two lines):" });

  logger.info('Enter about paragraphs one at a time. Leave blank to finish.');
  const about: string[] = [];
  while (true) {
    const para = await input({
      message: `About paragraph ${about.length + 1} (blank to finish):`,
    });
    if (!para.trim()) break;
    about.push(para.trim());
  }
  if (about.length === 0) about.push("About me.");

  const domain = await input({
    message: "Production domain (e.g. yourname.xyz — leave blank to skip):",
    default: "",
  });

  return {
    name: name.trim(),
    headline: headline.trim() || name.toUpperCase(),
    role: role.trim(),
    tagline: tagline.trim(),
    about,
    domain: domain.trim() || undefined,
  };
}

// ── theme ─────────────────────────────────────────────────────────────────────

async function promptTheme(): Promise<SiteConfig["theme"]> {
  logger.heading("Theme");

  const accent = await input({
    message: "Accent color (hex, e.g. #e8531f):",
    validate: validateHex,
  });
  const background = await input({
    message: "Background color (hex, default #0a0807 — leave blank to use default):",
    default: "#0a0807",
    validate: validateHex,
  });
  const ink = await input({
    message: "Ink / text color (hex, default #ece6dd — leave blank to use default):",
    default: "#ece6dd",
    validate: validateHex,
  });

  return { accent, background, ink };
}

// ── fonts ─────────────────────────────────────────────────────────────────────

export interface FontAnswers {
  source: "google" | "byo";
  heading: string;
  body: string;
  byoFiles: Array<{ family: string; filePath: string; weight?: string }>;
}

async function promptFonts(): Promise<FontAnswers> {
  logger.heading("Fonts");

  const source = await select<"google" | "byo">({
    message: "Font source:",
    choices: [
      { name: "Google Fonts (fetched at build time)", value: "google" },
      { name: "Bring your own .woff2 files", value: "byo" },
    ],
  });

  if (source === "google") {
    const heading = await select<string>({
      message: "Heading font:",
      choices: GOOGLE_FONT_PRESETS.map((f) => ({ name: f, value: f })),
    });
    const body = await select<string>({
      message: "Body font:",
      choices: GOOGLE_FONT_PRESETS.map((f) => ({ name: f, value: f })),
    });
    return { source: "google", heading, body, byoFiles: [] };
  }

  // BYO
  logger.info("Enter each .woff2 file. Leave family name blank to finish.");
  const byoFiles: Array<{ family: string; filePath: string; weight?: string }> = [];

  while (true) {
    const family = await input({
      message: `Font family name (blank to finish):`,
    });
    if (!family.trim()) break;

    const filePath = await input({
      message: `Path to .woff2 file for "${family}":`,
      validate: (v) => {
        const err = validateAssetPath(v, "font");
        return err ?? true;
      },
    });

    const weight = await input({
      message: `Font weight (e.g. 400, leave blank for default):`,
      default: "",
    });

    byoFiles.push({ family: family.trim(), filePath, weight: weight || undefined });
  }

  if (byoFiles.length === 0) {
    logger.warn("No BYO fonts entered. Falling back to Google Fonts defaults.");
    return { source: "google", heading: "Inter", body: "Inter", byoFiles: [] };
  }

  const heading = await input({ message: "Heading font family name (must match one above):" });
  const body = await input({ message: "Body font family name (must match one above):" });

  return { source: "byo", heading, body, byoFiles };
}

// ── assets ────────────────────────────────────────────────────────────────────

export interface AssetAnswers {
  logoPath?: string;
  heroPath?: string;
  ogPath?: string;
}

async function promptAssets(): Promise<AssetAnswers> {
  logger.heading("Assets");
  logger.info("Leave any field blank to skip that asset.");

  async function askImage(label: string): Promise<string | undefined> {
    const p = await input({
      message: `${label} path (svg/png/jpg/jpeg/webp — blank to skip):`,
      default: "",
    });
    if (!p.trim()) return undefined;
    const err = validateAssetPath(p.trim(), "image");
    if (err) {
      logger.warn(err + " — skipping this asset.");
      return undefined;
    }
    return p.trim();
  }

  const logoPath = await askImage("Logo / wordmark");
  const heroPath = await askImage("Hero image");
  const ogPath = await askImage("OG / social share image");

  return { logoPath, heroPath, ogPath };
}

// ── project thumbnails + writing images ───────────────────────────────────────

async function promptProjectImagePath(projectName: string): Promise<string | undefined> {
  const p = await input({
    message: `Thumbnail for "${projectName}" (blank to skip):`,
    default: "",
  });
  if (!p.trim()) return undefined;
  const err = validateAssetPath(p.trim(), "image");
  if (err) {
    logger.warn(err + " — skipping.");
    return undefined;
  }
  return p.trim();
}

async function promptWritingImagePath(title: string): Promise<string | undefined> {
  const p = await input({
    message: `Card image for "${title}" (blank to skip):`,
    default: "",
  });
  if (!p.trim()) return undefined;
  const err = validateAssetPath(p.trim(), "image");
  if (err) {
    logger.warn(err + " — skipping.");
    return undefined;
  }
  return p.trim();
}

// ── socials ───────────────────────────────────────────────────────────────────

async function promptSocials(): Promise<SocialLink[]> {
  logger.heading("Social Links");

  const socials: SocialLink[] = [];
  while (true) {
    const addMore = await confirm({
      message:
        socials.length === 0
          ? "Add a social link?"
          : "Add another social link?",
      default: socials.length === 0,
    });
    if (!addMore) break;

    const platform = await select<SocialPlatform>({
      message: "Platform:",
      choices: SOCIAL_PLATFORMS.map((p) => ({ name: p, value: p })),
    });
    const label = await input({ message: "Label (e.g. X / TWITTER):" });
    const sublabel = await input({ message: "Sublabel / handle (e.g. @you):" });
    const href = await input({ message: "URL (or mailto:):" });

    socials.push({ platform, label: label.trim(), sublabel: sublabel.trim(), href: href.trim() });
  }

  return socials;
}

// ── contact ───────────────────────────────────────────────────────────────────

async function promptContact(): Promise<ContactEntry[]> {
  logger.heading("Contact Entries");

  const contact: ContactEntry[] = [];
  while (true) {
    const addMore = await confirm({
      message:
        contact.length === 0 ? "Add a contact entry?" : "Add another contact entry?",
      default: contact.length === 0,
    });
    if (!addMore) break;

    const platform = await select<SocialPlatform>({
      message: "Platform:",
      choices: SOCIAL_PLATFORMS.map((p) => ({ name: p, value: p })),
    });
    const label = await input({ message: "Label (e.g. TELEGRAM):" });
    const value = await input({ message: "Value / handle (e.g. @you):" });
    const href = await input({ message: "URL or mailto::" });

    contact.push({
      platform,
      label: label.trim(),
      value: value.trim(),
      href: href.trim(),
    });
  }

  return contact;
}

// ── projects ──────────────────────────────────────────────────────────────────

async function promptProjects(): Promise<
  Array<{ project: ProjectEntry; imagePath?: string }>
> {
  logger.heading("Projects");

  const results: Array<{ project: ProjectEntry; imagePath?: string }> = [];

  while (true) {
    const addMore = await confirm({
      message:
        results.length === 0 ? "Add a project?" : "Add another project?",
      default: results.length === 0,
    });
    if (!addMore) break;

    const name = await input({ message: "Project name:" });
    const slug = await input({
      message: "URL slug:",
      default: slugify(name),
    });
    const tagline = await input({ message: "One-line tagline:" });
    const github = await input({
      message: "GitHub URL (blank to skip):",
      default: "",
    });
    const requestApi = await input({
      message: "Request API / contact link (blank to skip):",
      default: "",
    });

    logger.info("Enter body paragraphs. Leave blank to finish.");
    const body: string[] = [];
    while (true) {
      const para = await input({
        message: `Paragraph ${body.length + 1} (blank to finish):`,
      });
      if (!para.trim()) break;
      body.push(para.trim());
    }
    if (body.length === 0) body.push("No description yet.");

    const imagePath = await promptProjectImagePath(name);

    results.push({
      project: {
        slug: slug.trim(),
        name: name.trim(),
        tagline: tagline.trim(),
        github: github.trim() || undefined,
        requestApi: requestApi.trim() || undefined,
        body,
      },
      imagePath,
    });
  }

  return results;
}

// ── writing ───────────────────────────────────────────────────────────────────

async function promptWriting(): Promise<
  Array<{ entry: WritingEntry; imagePath?: string }>
> {
  logger.heading("Writing");

  const results: Array<{ entry: WritingEntry; imagePath?: string }> = [];

  while (true) {
    const addMore = await confirm({
      message:
        results.length === 0
          ? "Add a writing entry?"
          : "Add another writing entry?",
      default: results.length === 0,
    });
    if (!addMore) break;

    const title = await input({ message: "Title:" });
    const date = await input({ message: 'Date label (e.g. "May 31" or "Soon"):' });
    const comingSoon = await confirm({
      message: "Mark as coming soon?",
      default: false,
    });

    let href: string | undefined;
    if (!comingSoon) {
      const h = await input({ message: "Post URL (blank to skip):", default: "" });
      href = h.trim() || undefined;
    }

    const imagePath = await promptWritingImagePath(title);

    results.push({
      entry: {
        title: title.trim(),
        date: date.trim(),
        href,
        comingSoon: comingSoon || undefined,
      },
      imagePath,
    });
  }

  return results;
}

// ── main wizard ───────────────────────────────────────────────────────────────

export interface WizardResult {
  config: Omit<SiteConfig, "assets" | "fonts"> & {
    assets: { logoPath?: string; heroPath?: string; ogPath?: string };
  };
  fontAnswers: FontAnswers;
  projectImagePaths: Record<string, string | undefined>;
  writingImagePaths: Record<string, string | undefined>;
}

export async function runWizard(): Promise<WizardResult> {
  const identity = await promptIdentity();
  const theme = await promptTheme();
  const fontAnswers = await promptFonts();
  const assetAnswers = await promptAssets();
  const socials = await promptSocials();
  const contact = await promptContact();
  const projectResults = await promptProjects();
  const writingResults = await promptWriting();

  const projectImagePaths: Record<string, string | undefined> = {};
  const projects: ProjectEntry[] = projectResults.map(({ project, imagePath }) => {
    if (imagePath) projectImagePaths[project.slug] = imagePath;
    return project;
  });

  const writingImagePaths: Record<string, string | undefined> = {};
  const writing: WritingEntry[] = writingResults.map(({ entry, imagePath }) => {
    const key = slugify(entry.title);
    if (imagePath) writingImagePaths[key] = imagePath;
    return entry;
  });

  return {
    config: {
      ...identity,
      theme,
      assets: assetAnswers,
      socials,
      contact,
      projects,
      writing,
    },
    fontAnswers,
    projectImagePaths,
    writingImagePaths,
  };
}
