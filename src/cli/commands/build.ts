import path from "path";
import { loadConfig } from "../lib/config";
import { buildTemplate } from "../lib/template";
import { logger } from "../lib/logger";

export interface BuildOptions {
  config?: string;
  assets?: string;
  workdir?: string;
}

export async function runBuild(options: BuildOptions): Promise<string> {
  const configPath = path.resolve(options.config ?? "site.config.json");
  const assetsDir = path.resolve(options.assets ?? "assets");
  const workDir = path.resolve(options.workdir ?? ".build");

  logger.heading("Portfolio Maker: Build");
  logger.info(`Config:  ${configPath}`);
  logger.info(`Assets:  ${assetsDir}`);
  logger.info(`Workdir: ${workDir}`);
  logger.blank();

  const config = loadConfig(configPath);

  const { distDir } = await buildTemplate(config, assetsDir, workDir);

  logger.blank();
  logger.success("Build finished.");
  logger.info(`Dist: ${distDir}`);
  logger.blank();
  logger.info('Run "portfolio-maker deploy" to publish.');

  return distDir;
}
