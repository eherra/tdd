import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1_solution.mjs";

describe("Untestable 1: days until Christmas", () => {
  it("Should return 358 when 1st of January", () => {
    expect(daysUntilChristmas(new Date("2023-01-01"))).to.equal(358);
  });

  it("Should return zero when Christmas Day", () => {
    expect(daysUntilChristmas(new Date("2023-12-25"))).to.equal(0);
  });

  it("Should return 365 when one day after Christmas", () => {
    expect(daysUntilChristmas(new Date("2023-12-26"))).to.equal(365);;
  });

  it("Should throw error when parameter Date is missing!", () => {
    expect(daysUntilChristmas).to.throw(Error, "Parameter Date is missing!");
  });
});