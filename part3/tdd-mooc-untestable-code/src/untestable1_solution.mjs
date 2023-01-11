export const daysUntilChristmas = (dateToCompareFrom) => {
  const today = new Date(dateToCompareFrom.getFullYear(), dateToCompareFrom.getMonth(), dateToCompareFrom.getDate());
  const christmasDay = new Date(dateToCompareFrom.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / getMillisPerDay());
}

const getMillisPerDay = () => {
  return 24 * 60 * 60 * 1000;
}

console.log(daysUntilChristmas(new Date()))