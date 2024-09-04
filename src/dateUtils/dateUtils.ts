// dateUtils.ts
import { format, addDays, subDays } from "date-fns";

// Helper function to get day suffix
const getDaySuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th"; // Covers 11th to 20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Helper function to format date with suffix
export const formatDateWithSuffix = (date: Date): string => {
  const day = date.getDate();
  const month = format(date, "MMM").toUpperCase(); // Format month as uppercase
  const year = format(date, "yyyy");
  const time = format(date, "hh:mm a");
  const suffix = getDaySuffix(day);

  return `${day}${suffix} ${month}'${year} ${time}`;
};

// Helper function to calculate start and end dates based on category
export const calculateDates = (category: string): { startDate: Date; endDate: Date } => {
  const today = new Date();
  let calculatedStartDate: Date;
  let calculatedEndDate: Date;

  if (category === "Upcoming") {
    calculatedStartDate = addDays(today, 4);
    calculatedEndDate = addDays(calculatedStartDate, 5);
  } else if (category === "Active") {
    calculatedStartDate = subDays(today, 2);
    calculatedEndDate = addDays(calculatedStartDate, 5);
  } else if (category === "Past") {
    calculatedStartDate = subDays(today, 7);
    calculatedEndDate = addDays(calculatedStartDate, 5);
  } else {
    // Handle cases where category is not recognized
    throw new Error("Invalid category");
  }

  return { startDate: calculatedStartDate, endDate: calculatedEndDate };
};
