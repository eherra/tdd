import chai, { expect } from "chai";
import { readFileAndReturnRle } from "../src/fileReader/fileReader.mjs";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("Reading file should work", () => {
  const BLOCK_RLE = "2o$2o!";
  const GLIDER_RLE = "bob$2bo$3o!";

  it("Should return block RLE string from a file", async () => {
    const rle = await readFileAndReturnRle("/block.rle", true);
    expect(rle).to.equal(BLOCK_RLE);
  });

  it("Should return glider RLE string from a file", async () => {
    const rle = await readFileAndReturnRle("/glider.rle", true);
    expect(rle).to.equal(GLIDER_RLE);
  });

  it("Should throw error when file not found", () => {
    expect(readFileAndReturnRle("/notfound.rle", false)).to.be.rejectedWith(
      Error
    );
  });
});
