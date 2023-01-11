function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function diceHandValue() {
  const die1 = diceRoll();
  const die2 = diceRoll();
  console.log(die1, die2)
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}

// randomness not possible to test

// property-base testing could be used

// if testing functionality of the methods, mocking Math.random() is possible with sinon.js library

// else {} not needed
