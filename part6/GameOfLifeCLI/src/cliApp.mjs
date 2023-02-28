import { program } from "commander";
import { getRleAfterIterations } from "./rle/main.mjs";

program
  .description("A CLI app for Game of Life")
  .option("-f, --file <VALUE>", "Specify a VALUE")
  .option("-it, --iterations <VALUE>", "Specify a VALUE", 1)
  .option("-gs, --gridSize <VALUE>", "Specify a VALUE", 30)
  .option("-t, --test"); // if using test data -> using files from ./data folder, otherwise use exact file path

program.parse();
const options = program.opts();

const filePath = options?.file;
const useTestPatternData = options?.test;
const gridSize = options?.gridSize;
const iterations = options?.iterations;

const rleAfterIterations = await getRleAfterIterations(
  filePath,
  useTestPatternData,
  gridSize,
  iterations
);

console.log(rleAfterIterations);
