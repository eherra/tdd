import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function addAllTetronomies(shuffleBag) {
  shuffleBag.add(Tetromino.I_SHAPE);
  shuffleBag.add(Tetromino.T_SHAPE);
  shuffleBag.add(Tetromino.L_SHAPE);
  shuffleBag.add(Tetromino.J_SHAPE);

  shuffleBag.add(Tetromino.S_SHAPE);
  shuffleBag.add(Tetromino.Z_SHAPE);
  shuffleBag.add(Tetromino.O_SHAPE);
}

describe("Shufflebag tests", () => {
  let shuffleBag;
  const tetronomiTypes = ["I", "T", "L", "J", "S", "Z", "O"];

  beforeEach(() => {
    shuffleBag = new ShuffleBag();
    addAllTetronomies(shuffleBag);
  });

  describe("Should find all tetronomies from the shuffleBag", () => {
    it("after 21 calls, all tetronomies should appear 3 times", () => {
      const testList = [];
      for (let i = 0; i < 21; i++) {
        testList.push(shuffleBag.draw());
      }
      tetronomiTypes.forEach((type) => {
        // amountOfTypes length should be always three
        const amountOfTypes = testList.filter(
          (tetromino) => tetromino.type === type
        ).length;
        expect(amountOfTypes).to.equal(3);
      });
    });
  });

  describe("Should be in different orders", () => {
    it("after 14 calls, three tetronomies lists should be in different order", () => {
      const testList = [];
      const testList2 = [];
      const testList3 = [];

      for (let i = 0; i < 14; i++) {
        testList.push(shuffleBag.draw());
      }

      for (let i = 0; i < 14; i++) {
        testList2.push(shuffleBag.draw());
      }

      for (let i = 0; i < 14; i++) {
        testList3.push(shuffleBag.draw());
      }

      // map the lists to type strings for comparison with equals
      const asType = testList.map((tetromino) => tetromino.type);
      const asType2 = testList2.map((tetromino) => tetromino.type);
      const asType3 = testList3.map((tetromino) => tetromino.type);

      expect(asType).to.not.equal(asType2);
      expect(asType).to.not.equal(asType3);
      expect(asType2).to.not.equal(asType3);
    });
  });
});
