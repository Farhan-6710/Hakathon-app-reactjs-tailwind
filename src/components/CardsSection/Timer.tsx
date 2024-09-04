import React, { useEffect, useState } from "react";

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Append suffix to day
  const suffix = ["th", "st", "nd", "rd"][day % 10] || "th";
  const dayWithSuffix = day + suffix;

  return `${dayWithSuffix} ${month}'${year} ${time}`;
};

const calculateTimeLeft = (endTime: Date) => {
  const now = new Date();
  const difference = endTime.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const Timer: React.FC<{ category: string }> = ({ category }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {

    let endTime: Date;

    if (category === "Upcoming") {
      endTime = new Date();
      endTime.setDate(endTime.getDate() + 3); // 3 days from now
      endTime.setHours(24, 0, 0, 0); // Set to midnight of that day
    } else if (category === "Active") {
      endTime = new Date();
      endTime.setDate(endTime.getDate() + 2); // 2 days from now
      endTime.setHours(24, 0, 0, 0); // Set to midnight of that day
    } else if (category === "Past") {
      endTime = new Date("2024-08-16T21:00:00"); // Fixed past date
    } else {
      console.error("Invalid category provided:", category);
      return;
    }

    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(endTime));
    };

    updateTimer(); // Initial update

    const timer = setInterval(updateTimer, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clear the interval on unmount or category change
    };
  }, [category]);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  if (category === "Past") {
    const pastDate = new Date("2024-08-16T21:00:00");
    return (
      <div className="text-center text-gray-700 mt-2 mb-6">
        <p className="text-sm font-semibold mb-6">Ended on</p>
        <p className="text-md font-bold">{formatDate(pastDate)}</p>
      </div>
    );
  }

  return (
    <div className="text-center text-gray-700 mt-2 mb-5">
      <p className="font-semibold text-sm mb-2">
        {category === "Upcoming" ? "Starts in" : "Ends in"}
      </p>
      <p className="text-2xl font-bold ml-3">
        {formatTime(timeLeft.days)} : {formatTime(timeLeft.hours)} :{" "}
        {formatTime(timeLeft.minutes)} : {formatTime(timeLeft.seconds)}
      </p>
      <p className="text-xs">
        <span className="ml-2 mr-4">Days</span>{" "}
        <span className="mr-4">Hours</span> <span className="mr-4">Mins</span>{" "}
        <span>Secs</span>
      </p>
    </div>
  );
};

export default Timer;
