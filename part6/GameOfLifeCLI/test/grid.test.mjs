import { expect } from "chai";
import {
  createGameOfLifeGridWithPattern,
  iterateGeneration,
  iterateGenerationByTimes,
} from "../src/shape/grid.mjs";

describe("Grid tests", () => {
  describe("Creating grid should work", () => {
    const BLOCK_PATTERN = "oo$oo!";
    const GLIDER_DECODED_RLE = "bob$bbo$ooo!";

    const glider_start_2darray = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    const block_2darray = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    it("Creating grid with block.rle and size of 6", async () => {
      expect(createGameOfLifeGridWithPattern(BLOCK_PATTERN, 6)).to.deep.equal(
        block_2darray
      );
    });

    it("Creating grid with glider.rle and size of 6", async () => {
      const generatedGlider = createGameOfLifeGridWithPattern(GLIDER_DECODED_RLE, 6);
      expect(generatedGlider).to.deep.equal(glider_start_2darray);
    });
  });

  describe("Iteration should work", () => {
    const glider_start_2darray = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    const block_2darray = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    it("Block tterations should be correct after one iteration", async () => {
      const expectedArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      const iteratedGrid = iterateGeneration(block_2darray);
      expect(expectedArray).to.deep.equal(iteratedGrid);
    });

    it("Glider Iterations should be correct after one iteration", async () => {
      const expectedArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 0],
      ];
      const iteratedGrid = iterateGeneration(glider_start_2darray);
      expect(expectedArray).to.deep.equal(iteratedGrid);
    });

    it("Glider Iterations should be correct after 2 iteration", async () => {
      const expectedArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
      ];
      const iteratedGrid = iterateGeneration(glider_start_2darray);
      const secondIterationGrid = iterateGeneration(iteratedGrid);

      expect(expectedArray).to.deep.equal(secondIterationGrid);
    });

    it("Block Iterations should work when calling generate by times", async () => {
      const expectedArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      const iteratedGrid = iterateGenerationByTimes(block_2darray, 10);
      expect(expectedArray).to.deep.equal(iteratedGrid);
    });

    it("Glider Iterations should work when calling generate by times", async () => {
      const expectedArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
      ];
      const iteratedGrid = iterateGenerationByTimes(glider_start_2darray, 2);

      expect(expectedArray).to.deep.equal(iteratedGrid);
    });
  });
});
