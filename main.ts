import "reflect-metadata";
import { container } from "tsyringe";
import { RunnerApp } from "./src/runner/app";
import { loadDI } from "./src/di/loader";

const main = async (): Promise<void> => {
  loadDI();

  const runner: RunnerApp = container.resolve("RunnerApp");

  await runner.run();
};

main();
