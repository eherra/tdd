import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("Scoring System tests", () => {
  let scoringSystem;

  describe("Init values", () => {
    it("Init values should be zero", () => {
      scoringSystem = new ScoringSystem();
      expect(scoringSystem.getPoints()).to.equal(0);
      expect(scoringSystem.getLevel()).to.equal(0);
    });

    it("Init level should be as filled", () => {
      scoringSystem = new ScoringSystem(4);
      expect(scoringSystem.getLevel()).to.equal(4);
    });
  });

  describe("Rows deleting", () => {
    it("On level 0, rows deleting should give correct points", () => {
      scoringSystem = new ScoringSystem(0);
      scoringSystem.addRowPoints(1);
      expect(scoringSystem.getPoints()).to.equal(40);

      scoringSystem.addRowPoints(2);
      expect(scoringSystem.getPoints()).to.equal(140);

      scoringSystem.addRowPoints(3);
      expect(scoringSystem.getPoints()).to.equal(440);

      scoringSystem.addRowPoints(4);
      expect(scoringSystem.getPoints()).to.equal(1640);
    });

    it("On level 3, rows deleting should give correct points", () => {
      scoringSystem = new ScoringSystem(3);
      scoringSystem.addRowPoints(1);
      expect(scoringSystem.getPoints()).to.equal(160);

      scoringSystem.addRowPoints(2);
      expect(scoringSystem.getPoints()).to.equal(560);

      scoringSystem.addRowPoints(3);
      expect(scoringSystem.getPoints()).to.equal(1760);

      scoringSystem.addRowPoints(4);
      expect(scoringSystem.getPoints()).to.equal(6560);
    });
  });
});
