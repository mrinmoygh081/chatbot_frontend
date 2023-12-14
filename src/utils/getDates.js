export const getNextDays = (today) => {
  let nextDays = [today];

  for (let i = 1; i <= 3; i++) {
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    nextDays.push(nextDay);
  }

  let formattedDates = nextDays.map((date) => {
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  });

  return formattedDates;
};
