import path from "path";
import fs from "fs";
import { runWizard } from "../lib/prompts";
import { buildGoogleFontConfig, buildByoFontConfig } from "../lib/fonts";
import { copyAsset } from "../lib/assets";
import { saveConfig, validateConfig } from "../lib/config";
import { logger } from "../lib/logger";
import { SiteConfig, AssetConfig } from "../../shared/config.schema";

export interface InitOptions {
  out?: string;
}

export async function runInit(options: InitOptions): Promise<void> {
  const outDir = path.resolve(options.out ?? process.cwd());
  const assetsDir = path.join(outDir, "assets");
  const fontsDir = path.join(assetsDir, "fonts");

  logger.heading("Portfolio Maker: Init");
  logger.info(`Output directory: ${outDir}`);
  logger.blank();

  const wizard = await runWizard();
  const { config: partial, fontAnswers, projectImagePaths, writingImagePaths } = wizard;

  // ── fonts ──────────────────────────────────────────────────────────────────
  let fonts: SiteConfig["fonts"];
  if (fontAnswers.source === "google") {
    fonts = buildGoogleFontConfig(fontAnswers.heading, fontAnswers.body);
  } else {
    fonts = buildByoFontConfig(
      fontAnswers.byoFiles,
      fontAnswers.heading,
      fontAnswers.body,
      assetsDir
    );
  }

  // ── core assets (logo/hero/og) ─────────────────────────────────────────────
  const assets: AssetConfig = {};
  if (partial.assets.logoPath) {
    const { filename } = copyAsset(partial.assets.logoPath, assetsDir, "image");
    assets.logo = filename;
  }
  if (partial.assets.heroPath) {
    const { filename } = copyAsset(partial.assets.heroPath, assetsDir, "image");
    assets.hero = filename;
  }
  if (partial.assets.ogPath) {
    const { filename } = copyAsset(partial.assets.ogPath, assetsDir, "image");
    assets.og = filename;
  }

  // ── project thumbnails ────────────────────────────────────────────────────
  const projects = partial.projects.map((p) => {
    const imgPath = projectImagePaths[p.slug];
    if (!imgPath) return p;
    const { filename } = copyAsset(imgPath, assetsDir, "image");
    return { ...p, img: filename };
  });

  // ── writing images ────────────────────────────────────────────────────────
  const writing = partial.writing.map((w) => {
    const key = w.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const imgPath = writingImagePaths[key];
    if (!imgPath) return w;
    const { filename } = copyAsset(imgPath, assetsDir, "image");
    return { ...w, img: filename };
  });

  // ── assemble final config ──────────────────────────────────────────────────
  const config: SiteConfig = {
    name: partial.name,
    headline: partial.headline,
    role: partial.role,
    tagline: partial.tagline,
    about: partial.about,
    domain: partial.domain,
    theme: partial.theme,
    fonts,
    assets,
    socials: partial.socials,
    contact: partial.contact,
    projects,
    writing,
  };

  // ── validate ───────────────────────────────────────────────────────────────
  const validation = validateConfig(config);
  if (!validation.valid) {
    logger.error("Config validation failed:");
    validation.errors.forEach((e) => logger.error("  " + e));
    process.exit(1);
  }

  // ── write site.config.json ─────────────────────────────────────────────────
  const configPath = path.join(outDir, "site.config.json");
  saveConfig(config, configPath);

  logger.blank();
  logger.success("Init complete.");
  logger.info(`Config: ${configPath}`);
  logger.info(`Assets: ${assetsDir}`);
  logger.blank();
  logger.info('Run "portfolio-maker build" next.');
}
