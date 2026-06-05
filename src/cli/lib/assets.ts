import fs from "fs";
import os from "os";
import path from "path";
import { logger } from "./logger";

const IMAGE_EXTS = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp"]);
const FONT_EXTS = new Set([".woff2"]);
const SIZE_WARN_BYTES = 2 * 1024 * 1024; // 2 MB

export type AssetKind = "image" | "font";

export interface CopiedAsset {
  /** original absolute path */
  src: string;
  /** filename only — what goes into the config */
  filename: string;
}

function allowedExtensions(kind: AssetKind): Set<string> {
  return kind === "font" ? FONT_EXTS : IMAGE_EXTS;
}

/**
 * Expands a leading ~ to the user's home directory so that paths like
 * ~/Desktop/logo.svg work correctly on all platforms.
 */
function expandTilde(filePath: string): string {
  if (filePath.startsWith("~/") || filePath === "~") {
    return path.join(os.homedir(), filePath.slice(1));
  }
  return filePath;
}

/**
 * Validates that a path exists and has an acceptable extension.
 * Returns a validation error string or null when valid.
 */
export function validateAssetPath(
  filePath: string,
  kind: AssetKind
): string | null {
  const resolved = path.resolve(expandTilde(filePath));
  if (!fs.existsSync(resolved)) {
    return `File not found: ${resolved}`;
  }
  const ext = path.extname(resolved).toLowerCase();
  const allowed = allowedExtensions(kind);
  if (!allowed.has(ext)) {
    return `Extension "${ext}" not allowed for ${kind}. Allowed: ${[...allowed].join(", ")}`;
  }
  return null;
}

/**
 * Copies a single asset file into destDir.
 * Warns if >2 MB. Returns the filename (basename) used in the config.
 */
export function copyAsset(
  srcPath: string,
  destDir: string,
  kind: AssetKind
): CopiedAsset {
  const resolved = path.resolve(expandTilde(srcPath));
  const filename = path.basename(resolved);
  const dest = path.join(destDir, filename);

  const stat = fs.statSync(resolved);
  if (stat.size > SIZE_WARN_BYTES) {
    logger.warn(
      `${filename} is ${(stat.size / 1024 / 1024).toFixed(1)} MB — consider compressing before deploying.`
    );
  }

  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(resolved, dest);
  logger.success(`Copied ${kind}: ${filename}`);

  return { src: resolved, filename };
}

/**
 * Copies all assets in an array and returns the filenames.
 * Skips entries where srcPath is empty/undefined.
 */
export function copyAssets(
  entries: Array<{ srcPath?: string; kind: AssetKind }>,
  destDir: string
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const entry of entries) {
    if (!entry.srcPath) continue;
    const { filename } = copyAsset(entry.srcPath, destDir, entry.kind);
    result[entry.srcPath] = filename;
  }
  return result;
}
