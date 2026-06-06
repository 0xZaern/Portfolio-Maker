#!/usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import { runInit } from "./commands/init";
import { runBuild } from "./commands/build";
import { runDeploy } from "./commands/deploy";
import { runCreate } from "./commands/create";
import { logger } from "./lib/logger";

const program = new Command();

program
  .name("portfolio-maker")
  .description("Build and deploy a portfolio site from your config and assets.")
  .version("0.1.1");

program
  .command("init")
  .description(
    "Run the prompt wizard, collect assets, and write site.config.json."
  )
  .option(
    "-o, --out <dir>",
    "Output directory for site.config.json and staged assets.",
    process.cwd()
  )
  .action(async (opts: { out?: string }) => {
    try {
      await runInit({ out: opts.out });
    } catch (err) {
      logger.error(String(err));
      process.exit(1);
    }
  });

program
  .command("build")
  .description(
    "Copy the template, inject your config and assets, and produce a dist/."
  )
  .option("-c, --config <path>", "Path to site.config.json.", "site.config.json")
  .option("-a, --assets <dir>", "Path to staged assets directory.", "assets")
  .option("-w, --workdir <dir>", "Build working directory.", ".build")
  .action(
    async (opts: { config?: string; assets?: string; workdir?: string }) => {
      try {
        await runBuild(opts);
      } catch (err) {
        logger.error(String(err));
        process.exit(1);
      }
    }
  );

program
  .command("deploy")
  .description(
    "Deploy the built dist/ to Vercel. Set PM_DEMO_MODE=false for a real deploy."
  )
  .option("-d, --dist <path>", "Path to built dist directory.", ".build/dist")
  .action(async (opts: { dist?: string }) => {
    try {
      await runDeploy(opts);
    } catch (err) {
      logger.error(String(err));
      process.exit(1);
    }
  });

program
  .command("create")
  .description("Convenience: runs init, then build, then deploy in sequence.")
  .option(
    "-o, --out <dir>",
    "Output directory (used for all three steps).",
    process.cwd()
  )
  .action(async (opts: { out?: string }) => {
    try {
      await runCreate(opts);
    } catch (err) {
      logger.error(String(err));
      process.exit(1);
    }
  });

program.parseAsync(process.argv).catch((err) => {
  logger.error(String(err));
  process.exit(1);
});
