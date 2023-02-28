import { expect } from "chai";
import {
  encodeRle,
  decodeRle,
  generateRleStringFromGrid,
} from "../src/rle/crypters.mjs";

describe("Crypters should work", () => {
  describe("Encoding/Decoding should work", () => {
    const BLOCK_ENCODED_RLE = "2o$2o!";
    const BLOCK_DECODED_RLE = "oo$oo!";

    const GLIDER_ENCODED_RLE = "bob$2bo$3o!";
    const GLIDER_DECODED_RLE = "bob$bbo$ooo!";

    it("Encoding should make block rle longer", async () => {
      const encoded = encodeRle(BLOCK_DECODED_RLE);
      expect(encoded).to.equal(BLOCK_ENCODED_RLE);
    });

    it("Encoding should make glider rle longer", async () => {
      const encoded = encodeRle(GLIDER_DECODED_RLE);
      expect(encoded).to.equal(GLIDER_ENCODED_RLE);
    });

    it("Decoding should make block rle shorter", async () => {
      const decoded = decodeRle(BLOCK_ENCODED_RLE);
      expect(decoded).to.equal(BLOCK_DECODED_RLE);
    });

    it("Decoding should make glider rle shorter", async () => {
      const decoded = decodeRle(GLIDER_ENCODED_RLE);
      expect(decoded).to.equal(GLIDER_DECODED_RLE);
    });
  });

  describe("Generating rle string from 2d array should work", () => {
    it("Generating string should work", async () => {
      const arr = [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ];
      const rleToEqual = "oob$boo$bbo!";
      const generatedString = generateRleStringFromGrid(arr);
      expect(generatedString).to.equal(rleToEqual);
    });

    it("Generating string should work with bigger 2D array", async () => {
      const arr = [
        [1, 1, 0, 0],
        [0, 1, 1, 1],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ];
      const rleToEqual = "oobb$booo$bbob$bbob!";
      const generatedString = generateRleStringFromGrid(arr);
      expect(generatedString).to.equal(rleToEqual);
    });
  });
});
