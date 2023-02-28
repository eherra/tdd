import { expect } from "chai";
import { cleanGridFromZeroes } from "../src/shape/gridRemover.mjs";

describe("Grid remover tests", () => {
  describe("Should remove all zeroes from block.rle", () => {
    const expectedBlock = [
      [1, 1],
      [1, 1],
    ];

    it("Should clean block.rle", () => {
      const block2darray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      const cleaned = cleanGridFromZeroes(block2darray);

      expect(expectedBlock).to.deep.equal(cleaned);
    });

    it("Should clean block.rle from right down", () => {
      const blockDown2darray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1],
      ];
      const cleaned = cleanGridFromZeroes(blockDown2darray);

      expect(expectedBlock).to.deep.equal(cleaned);
    });
  });

  describe("Should remove all zeroes from glider.rle", () => {
    const expectedGlider = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
    ];

    it("Should clean glider.rle", () => {
      const glider2darray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      const cleaned = cleanGridFromZeroes(glider2darray);

      expect(expectedGlider).to.deep.equal(cleaned);
    });

    it("Should clean glider.rle from top left", () => {
      const glider2darray = [
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      const cleaned = cleanGridFromZeroes(glider2darray);

      expect(expectedGlider).to.deep.equal(cleaned);
    });
  });
});
