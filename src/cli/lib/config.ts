import fs from "fs";
import path from "path";
import { SiteConfig } from "../../shared/config.schema";
import { logger } from "./logger";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateConfig(config: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof config !== "object" || config === null) {
    return { valid: false, errors: ["Config is not an object."] };
  }

  const c = config as Record<string, unknown>;

  if (!c.name || typeof c.name !== "string") errors.push("name is required.");
  if (!c.role || typeof c.role !== "string") errors.push("role is required.");
  if (!c.tagline || typeof c.tagline !== "string")
    errors.push("tagline is required.");
  if (!Array.isArray(c.about) || c.about.length === 0)
    errors.push("about must be a non-empty array of strings.");

  // theme
  if (!c.theme || typeof c.theme !== "object") {
    errors.push("theme is required.");
  } else {
    const t = c.theme as Record<string, unknown>;
    if (!t.accent || typeof t.accent !== "string") {
      errors.push("theme.accent is required.");
    } else if (!HEX_RE.test(t.accent)) {
      errors.push(`theme.accent "${t.accent}" is not a valid 6-digit hex color.`);
    }
    if (t.background && !HEX_RE.test(t.background as string)) {
      errors.push(
        `theme.background "${t.background}" is not a valid 6-digit hex color.`
      );
    }
    if (t.ink && !HEX_RE.test(t.ink as string)) {
      errors.push(`theme.ink "${t.ink}" is not a valid 6-digit hex color.`);
    }
  }

  // fonts
  if (!c.fonts || typeof c.fonts !== "object") {
    errors.push("fonts is required.");
  } else {
    const f = c.fonts as Record<string, unknown>;
    if (f.source !== "google" && f.source !== "byo") {
      errors.push('fonts.source must be "google" or "byo".');
    }
    if (!f.heading || typeof f.heading !== "string")
      errors.push("fonts.heading is required.");
    if (!f.body || typeof f.body !== "string")
      errors.push("fonts.body is required.");
    if (f.source === "byo") {
      if (!Array.isArray(f.files) || f.files.length === 0) {
        errors.push('fonts.files must be non-empty when source is "byo".');
      }
    }
  }

  // assets — all optional, just ensure object exists
  if (c.assets !== undefined && typeof c.assets !== "object") {
    errors.push("assets must be an object.");
  }

  // arrays
  if (!Array.isArray(c.socials))
    errors.push("socials must be an array.");
  if (!Array.isArray(c.contact))
    errors.push("contact must be an array.");
  if (!Array.isArray(c.projects))
    errors.push("projects must be an array.");
  if (!Array.isArray(c.writing))
    errors.push("writing must be an array.");

  // projects
  if (Array.isArray(c.projects)) {
    (c.projects as unknown[]).forEach((p, i) => {
      const proj = p as Record<string, unknown>;
      if (!proj.slug) errors.push(`projects[${i}].slug is required.`);
      if (!proj.name) errors.push(`projects[${i}].name is required.`);
      if (!proj.tagline) errors.push(`projects[${i}].tagline is required.`);
      if (!Array.isArray(proj.body) || proj.body.length === 0) {
        errors.push(`projects[${i}].body must be a non-empty array.`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

export function loadConfig(configPath: string): SiteConfig {
  const resolved = path.resolve(configPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Config not found: ${resolved}`);
  }
  const raw = JSON.parse(fs.readFileSync(resolved, "utf-8")) as unknown;
  const result = validateConfig(raw);
  if (!result.valid) {
    throw new Error(
      `Invalid config at ${resolved}:\n  ${result.errors.join("\n  ")}`
    );
  }
  return raw as SiteConfig;
}

export function saveConfig(config: SiteConfig, outPath: string): void {
  const resolved = path.resolve(outPath);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, JSON.stringify(config, null, 2) + "\n", "utf-8");
  logger.success(`Config written: ${resolved}`);
}
