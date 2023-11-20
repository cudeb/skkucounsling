const compareDateOnly = (date1: string, date2: string) => {
  const _date1 = date1.split("T")[0];
  const _date2 = date2.split("T")[0];
  return _date1.localeCompare(_date2);
};

const numToDateString = (year: number, month: number, day: number) => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

const dateToKrLocaleWeekday = (date: Date) => {
  return date.toLocaleDateString(
    //KR
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }
  );
};

const dateToKrLocale = (date: Date) => {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formattedTimeslot = (timeslot: string) => {
  const day = timeslot.slice(0, 3);
  const hour = parseInt(timeslot.slice(3)) + 9;
  return `${day}, ${hour}시`
};

export {
  compareDateOnly,
  numToDateString,
  dateToKrLocaleWeekday,
  dateToKrLocale,
  formattedTimeslot
};
