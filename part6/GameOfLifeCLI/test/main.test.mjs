import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import { getRleAfterIterations } from "../src/rle/main.mjs";

describe("Generating RLE should work", () => {
  const HERSCHEL_EXPECTED_4 = "2b2o2b$b4ob$3obob$b3obo$2b3ob$3b2ob!";
  const GLIDER_EXPECTED_20 = "bob$2bo$3o!";
  const EATER_EXPECTED_30 = "2o2b$obob$2bob$2b2o!";

  it("Herschel with 4 iterations should work", async () => {
    expect(
      getRleAfterIterations("/herschel.rle", true, 30, 4)
    ).to.eventually.equal(HERSCHEL_EXPECTED_4);
  });

  it("Glider with 20 iterations should work", async () => {
    expect(
      getRleAfterIterations("/glider.rle", true, 30, 20)
    ).to.eventually.equal(GLIDER_EXPECTED_20);
  });

  it("Eater with 30 iterations should work", async () => {
    expect(
      getRleAfterIterations("/eater.rle", true, 30, 30)
    ).to.eventually.equal(EATER_EXPECTED_30);
  });
});
