import { expect } from "chai";
import sinon from "sinon";

import { diceHandValue } from "../src/untestable2_solution.mjs";

describe("Untestable 2: a dice game", () => {
  afterEach(() => {
    sinon.restore()
  });

  it("Should return one pair (1) when math.random mocked equally", () => {
    sinon.stub(Math, 'random')
            .onFirstCall().returns(0) // returns 1
            .onSecondCall().returns(0)

    expect(diceHandValue()).to.equal(101);
  });

  it("Should return one pair (4) when math.random mocked equally", () => {
    sinon.stub(Math, 'random')
            .onFirstCall().returns(0.5) // returns 4
            .onSecondCall().returns(0.5)

    expect(diceHandValue()).to.equal(104);
  });

  it("Should return first dice value when math.random mocked higherly to the first throw", () => {
    sinon.stub(Math, 'random')
            .onFirstCall().returns(0.8) // returns 5
            .onSecondCall().returns(0.5)

    expect(diceHandValue()).to.equal(5);
  });

  it("Should return second dice value when math.random mocked higherly to the second throw", () => {
    sinon.stub(Math, 'random')
            .onFirstCall().returns(0.1)
            .onSecondCall().returns(0.9) // retuns 6

    expect(diceHandValue()).to.equal(6);
  });

  // property-based testing
  it("Should create only allowed values", () => {
    const allowedValues = new Set([1, 2, 3, 4, 5, 6, 101, 102, 103, 104, 105, 106])
    for (let i = 0; i < 100_000; i++) {
      const randomValue = diceHandValue();
      expect(allowedValues.has(randomValue)).to.be.true
    }
  });

  it("Should create values in random order", () => {
    for (let i = 0; i < 40; i++) {
      const firstList = []
      const secondList = []
      for (let j = 0; j < 40; j++) {
        const randomValue = diceHandValue();
        firstList.push(randomValue);

        const randomValue2 = diceHandValue();
        secondList.push(randomValue2);
      }
      expect(firstList).to.not.equal(secondList);
    }
  });
});
