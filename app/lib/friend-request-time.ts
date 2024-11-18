import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInYears,
  parseISO,
} from "date-fns";

export function calculateTimeDifference(timestamp) {
  const givenTime = parseISO(timestamp);
  const currentTime = new Date();

  const hoursDifference = differenceInHours(currentTime, givenTime);
  if (hoursDifference < 24) {
    return `${hoursDifference} hours ago`;
  }

  const daysDifference = differenceInDays(currentTime, givenTime);
  if (daysDifference < 31) {
    return `${daysDifference} days ago`;
  }

  const monthsDifference = differenceInMonths(currentTime, givenTime);
  if (monthsDifference < 12) {
    return `${monthsDifference} months ago`;
  }

  const yearsDifference = differenceInYears(currentTime, givenTime);
  return `${yearsDifference} years ago`;
}
