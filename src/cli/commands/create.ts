import { runInit, InitOptions } from "./init";
import { runBuild, BuildOptions } from "./build";
import { runDeploy } from "./deploy";
import { logger } from "../lib/logger";
import path from "path";

export interface CreateOptions {
  out?: string;
}

export async function runCreate(options: CreateOptions): Promise<void> {
  const outDir = path.resolve(options.out ?? process.cwd());

  logger.heading("Portfolio Maker: Create (init + build + deploy)");

  // init
  const initOpts: InitOptions = { out: outDir };
  await runInit(initOpts);

  // build — config and assets land in outDir after init
  const buildOpts: BuildOptions = {
    config: path.join(outDir, "site.config.json"),
    assets: path.join(outDir, "assets"),
    workdir: path.join(outDir, ".build"),
  };
  const distDir = await runBuild(buildOpts);

  // deploy
  await runDeploy({ dist: distDir });

  logger.blank();
  logger.success("All done.");
}
