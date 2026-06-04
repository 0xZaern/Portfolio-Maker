import fs from "fs";
import path from "path";
import { execa } from "execa";
import { SiteConfig } from "../../shared/config.schema";
import { logger } from "./logger";

/**
 * Resolves the template directory. Looks next to the dist output first,
 * then falls back to a path relative to this source file for dev (tsx).
 */
function resolveTemplateDir(): string {
  // __dirname is dist/cli/lib (compiled) or src/cli/lib (tsx).
  // Either way, three levels up lands at portfolio-maker root.
  const candidate = path.resolve(__dirname, "../../../template");
  if (fs.existsSync(candidate)) return candidate;

  throw new Error(
    "Cannot locate template/ directory. Expected at portfolio-maker root."
  );
}

/**
 * Recursively copies a directory, skipping node_modules and .git.
 */
function copyDir(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export interface BuildResult {
  workDir: string;
  distDir: string;
}

/**
 * Copies the template into workDir, injects site.config.json + assets,
 * installs deps, and runs the template build.
 */
export async function buildTemplate(
  config: SiteConfig,
  assetsDir: string,
  workDir: string
): Promise<BuildResult> {
  const templateDir = resolveTemplateDir();

  logger.info(`Template source: ${templateDir}`);
  logger.info(`Build workdir:   ${workDir}`);

  // 1. Copy template into workDir
  if (fs.existsSync(workDir)) {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
  copyDir(templateDir, workDir);
  logger.success("Template copied.");

  // 2. Write site.config.json into the workDir root (template reads it from there)
  const configDest = path.join(workDir, "site.config.json");
  fs.writeFileSync(configDest, JSON.stringify(config, null, 2) + "\n", "utf-8");
  logger.success("site.config.json injected.");

  // 3. Copy assets into workDir/public
  const publicDir = path.join(workDir, "public");
  fs.mkdirSync(publicDir, { recursive: true });

  if (fs.existsSync(assetsDir)) {
    for (const entry of fs.readdirSync(assetsDir, { withFileTypes: true })) {
      if (entry.isFile()) {
        fs.copyFileSync(
          path.join(assetsDir, entry.name),
          path.join(publicDir, entry.name)
        );
      } else if (entry.isDirectory()) {
        // e.g. fonts/
        copyDir(
          path.join(assetsDir, entry.name),
          path.join(publicDir, entry.name)
        );
      }
    }
    logger.success("Assets injected into public/.");
  }

  // 4. npm install
  logger.info("Running npm install in workdir...");
  await execa("npm", ["install", "--prefer-offline"], {
    cwd: workDir,
    stdio: "inherit",
  });

  // 5. npm run build
  logger.info("Running npm run build in workdir...");
  await execa("npm", ["run", "build"], {
    cwd: workDir,
    stdio: "inherit",
  });

  const distDir = path.join(workDir, "dist");
  logger.success(`Build complete. Output: ${distDir}`);

  return { workDir, distDir };
}
