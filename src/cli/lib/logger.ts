import chalk from "chalk";

export const logger = {
  info: (msg: string) => console.log(chalk.cyan("  " + msg)),
  success: (msg: string) => console.log(chalk.green("  " + msg)),
  warn: (msg: string) => console.log(chalk.yellow("  " + msg)),
  error: (msg: string) => console.error(chalk.red("  " + msg)),
  step: (n: number, total: number, msg: string) =>
    console.log(chalk.bold(`\n[${n}/${total}] `) + msg),
  heading: (msg: string) => console.log("\n" + chalk.bold.white(msg)),
  blank: () => console.log(),
};
