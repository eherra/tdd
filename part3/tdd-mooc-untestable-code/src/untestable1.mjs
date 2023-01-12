const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

// Using current time in tests makes it hard to test. => give Date as parameter

// many instances of Date-class created for no purpose

// millisPerDay global variable, better to write straight the value as 86400000 

// "Date has been a long-standing pain point in ECMAScript" -> using temporal better

// method is doing lot things (also unnecessary things like creating variable "now" and with that "today") 
// => split it to multiple smaller methods