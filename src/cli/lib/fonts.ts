import path from "path";
import { FontConfig } from "../../shared/config.schema";
import { copyAsset } from "./assets";

export const GOOGLE_FONT_PRESETS = [
  "Fraunces",
  "Inter",
  "Space Grotesk",
  "DM Sans",
  "Playfair Display",
  "Syne",
  "Cabinet Grotesk",
  "Manrope",
] as const;

export type GoogleFontPreset = (typeof GOOGLE_FONT_PRESETS)[number];

/**
 * Resolves a Google Font config — no files to copy.
 */
export function buildGoogleFontConfig(
  heading: string,
  body: string
): FontConfig {
  return {
    source: "google",
    heading,
    body,
  };
}

/**
 * Copies BYO font files into destDir/fonts and builds the FontConfig.
 */
export function buildByoFontConfig(
  files: Array<{ family: string; filePath: string; weight?: string }>,
  heading: string,
  body: string,
  destDir: string
): FontConfig {
  const fontsDir = path.join(destDir, "fonts");
  const fileEntries: FontConfig["files"] = [];

  for (const f of files) {
    const { filename } = copyAsset(f.filePath, fontsDir, "font");
    fileEntries.push({
      family: f.family,
      file: `fonts/${filename}`,
      weight: f.weight,
    });
  }

  return {
    source: "byo",
    heading,
    body,
    files: fileEntries,
  };
}
