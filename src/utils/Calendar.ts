const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthsShort = months.map((month) => month.slice(0, 3));

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const daysShort = days.map((day) => day.slice(0, 3));

const GetYears = (
  length: number | { back: number; front: number },
  offset: number = 0
) => {
  let temp = {
    back: 0,
    front: 0,
  };
  if (typeof length === "number") {
    const range = (length - (length % 2)) / 2;
    temp.back += range + offset;
    temp.front += range - offset;
  } else {
    temp.back += length.back + offset;
    temp.front += length.front + offset;
  }
  return Array.from(
    { length: temp.back + temp.front + 1 },
    (_, i) => i + new Date().getFullYear() - temp.back
  );
};

export default { months, monthsShort, days, daysShort, GetYears };
