import { readFileAndReturnRle } from "../fileReader/fileReader.mjs";
import {
  decodeRle,
  encodeRle,
  generateRleStringFromGrid,
} from "./crypters.mjs";
import { cleanGridFromZeroes } from "../shape/gridRemover.mjs";
import { createGameOfLifeGridWithPattern, iterateGenerationByTimes } from "../shape/grid.mjs";

export const getRleAfterIterations = async (
  filePath,
  useTestPatternData,
  gridSize,
  iterations
) => {
  const rleString = await readFileAndReturnRle(filePath, useTestPatternData);
  const decodedRle = decodeRle(rleString);
  const initGridWithLife = createGameOfLifeGridWithPattern(
    decodedRle,
    parseInt(gridSize)
  );

  const iteratedGrid = iterateGenerationByTimes(initGridWithLife, iterations);
  const cleanedGridFromSideZeroes = cleanGridFromZeroes(iteratedGrid);
  const rawRle = generateRleStringFromGrid(cleanedGridFromSideZeroes);
  const encodedRLE = encodeRle(rawRle);
  return encodedRLE;
};
