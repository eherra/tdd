const getRandomDiceValue = () => {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export const diceHandValue = () => {
  const firstDice = getRandomDiceValue();
  const secondDice = getRandomDiceValue();

  if (firstDice === secondDice) {
    // one pair
    return 100 + firstDice;
  } 
  // high die
  return Math.max(firstDice, secondDice);
}

//console.log(diceHandValue())


