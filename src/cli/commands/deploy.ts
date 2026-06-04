import path from "path";
import { deployToVercel } from "../lib/deploy";
import { logger } from "../lib/logger";

export interface DeployOptions {
  dist?: string;
}

export async function runDeploy(options: DeployOptions): Promise<void> {
  const distDir = path.resolve(options.dist ?? path.join(".build", "dist"));

  logger.heading("Portfolio Maker: Deploy");
  logger.info(`Dist dir: ${distDir}`);
  logger.blank();

  const result = await deployToVercel(distDir);

  if (result.demo) {
    logger.info("Dry-run complete. No files were actually deployed.");
  } else {
    logger.success(`Live at: ${result.url ?? "(see above)"}`);
  }
}
