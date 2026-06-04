import path from "path";
import { execa } from "execa";
import { logger } from "./logger";

function isDemoMode(): boolean {
  const val =
    process.env["PM_DEMO_MODE"] ?? process.env["GA_DEMO_MODE"] ?? "true";
  return val.toLowerCase() !== "false";
}

export interface DeployResult {
  demo: boolean;
  url?: string;
}

/**
 * Deploys the built dist directory to Vercel.
 * In demo mode, prints a realistic dry-run output and returns early.
 */
export async function deployToVercel(distDir: string): Promise<DeployResult> {
  if (isDemoMode()) {
    logger.blank();
    logger.heading("DEMO MODE: Vercel deploy dry-run");
    logger.info("Inspecting dist output...");
    logger.info(`Output dir: ${distDir}`);
    logger.blank();
    logger.info("Vercel CLI output (simulated):");
    console.log("  Vercel CLI 37.x.x");
    console.log("  Deploying ~/portfolio-maker/.build/dist");
    console.log("  Linked to your-org/portfolio-site");
    console.log("  Inspect: https://vercel.com/your-org/portfolio-site/abc123");
    console.log("  Production: https://your-portfolio.vercel.app [3s]");
    logger.blank();
    logger.warn(
      "Demo mode is ON. Set PM_DEMO_MODE=false in .env to deploy for real."
    );
    return { demo: true, url: "https://your-portfolio.vercel.app" };
  }

  logger.info(`Deploying ${distDir} to Vercel...`);

  // vercel CLI must be installed globally or available in PATH
  const result = await execa(
    "vercel",
    ["--prod", "--yes", "--local-config", path.join(distDir, "vercel.json")],
    {
      cwd: distDir,
      stdio: "inherit",
    }
  );

  // vercel prints the URL to stdout; best effort parse
  const url = (result.stdout ?? "").trim().split("\n").pop();

  logger.success(`Deployed. URL: ${url ?? "(see output above)"}`);
  return { demo: false, url: url ?? undefined };
}
