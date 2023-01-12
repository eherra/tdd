const MILLISECONDS_PER_DAY = 86400000;

export const daysUntilChristmas = (dateToCompare) => {
  if (!dateToCompare) {
    throw new Error('Parameter Date is missing!');
  }

  const christmasDay = getChristmasDayAsDate(dateToCompare.getFullYear())
  
  // year addition needed if today's date is between 26-31.12.
  if (dateToCompare.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(dateToCompare.getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - dateToCompare.getTime();
  return Math.floor(diffMillis / MILLISECONDS_PER_DAY);
}

const getChristmasDayAsDate = (year) => {
  return new Date(`${year}-12-25`);
}

// console.log(daysUntilChristmas(new Date()))
// console.log(daysUntilChristmas(new Date("2023-01-01")))
// console.log(daysUntilChristmas(new Date(2020, 11, 1)))