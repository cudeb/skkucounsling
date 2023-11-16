import { Button, Grid, HStack, Text, VStack } from "@chakra-ui/react";

import { useState, useEffect } from "react";

import IconCheck from "../resources/calendar/icon_check.png";
import IconClick from "../resources/calendar/icon_click.png";
import IconDocument from "../resources/calendar/icon_document.png";

interface DateInfo {
  task: string;
}

interface DateItem {
  year: number;
  month: number;
  day: number;
  weekday: number;
  passed?: boolean;
  info?: DateInfo;
}

const IconItem = ({ image, color }: { image: string; color: string }) => {
  return (
    <VStack
      style={{
        width: "4rem",
        height: "4rem",
        border: `3px solid ${color}`,
      }}
    >
      <div style={{ flex: 1 }} />
      <img
        src={image}
        alt=""
        style={{
          width: "1.5rem",
          height: "1.5rem",
        }}
      />
    </VStack>
  );
};

const ItemCheck = () => {
  return <IconItem image={IconCheck} color="#2788DD" />;
};

const ItemClick = () => {
  return <IconItem image={IconClick} color="#00953D" />;
};

const ItemDocument = () => {
  return <IconItem image={IconDocument} color="#DB8219" />;
};

const CalendarDate = ({
  dateItem,
  clicked,
  onClick,
}: {
  dateItem: DateItem;
  clicked: boolean;
  onClick: (dateItem: DateItem) => void;
}) => {
  const { day, weekday, passed, info } = dateItem;

  return (
    <VStack
      onClick={() => onClick(dateItem)}
      style={{
        width: "4rem",
        height: "4rem",
        overflow: "hidden",
        gap: "0",
        cursor:"pointer"
      }}
    >
      <div>
        <VStack
          style={{
            width: "4rem",
            height: "4rem",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: clicked ? "#00953D" : "white",
          }}
        >
          <Text
            fontSize="xl"
            color={
              clicked
                ? "white"
                : passed
                ? "gray"
                : weekday === 0
                ? "red"
                : weekday === 6
                ? "blue"
                : "black"
            }
            style={{
              marginBottom: "1rem",
            }}
          >
            {day}
          </Text>
        </VStack>
      </div>

      <div
        style={{
          position: "relative",
          top: "-4rem",
        }}
      >
        {info?.task === "예정" ? (
          <ItemCheck />
        ) : info?.task === "진행" ? (
          <ItemClick />
        ) : info?.task === "심리" ? (
          <ItemDocument />
        ) : (
          <div />
        )}
      </div>
    </VStack>
  );
};

const Calendar = ({
  dayDetails,
  initMonth,
  initYear,
  initDate,
  onClickDate,
  dateSelectable,
}: {
  dayDetails?: Record<string, DateInfo>;
  initMonth?: number;
  initYear?: number;
  initDate?: number;
  onClickDate?: (year: number, month: number, date: number) => void;
  dateSelectable?: boolean;
}) => {
  let [year, setYear] = useState(initYear || new Date().getFullYear());
  let [month, setMonth] = useState(initMonth || new Date().getMonth() + 1);
  let [date, setDate] = useState(initDate || -1);
  let [daysInMonth, setDaysInMonth] = useState([[0, 0, 0]]);

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const isClickable = (year: number, month: number, date: number) => {
    if (dateSelectable !== true) return false;
    if (getDayDetail(year, month, date)) return false;
    return true;
  };

  const onClickDateItem = (dateItem: DateItem) => {
    if (isClickable(dateItem.year, dateItem.month, dateItem.day)) {
      setYear(dateItem.year);
      setMonth(dateItem.month);
      setDate(dateItem.day);
    }
    onClickDate?.(dateItem.year, dateItem.month, dateItem.day);
  };

  const getDayDetail = (year: number, month: number, date: number) => {
    const key = `${year}-${String(month).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
    if (!dayDetails) return undefined;
    if (dayDetails[key]) {
      return dayDetails[key];
    }
    return undefined;
  };

  useEffect(() => {
    /**
     * Make list of days in month, including previous sunday and next month saturday
     */
    let daysInMonth = [];
    let firstDay = new Date(year, month - 1, 1);
    let lastDay = new Date(year, month, 0);

    while (firstDay.getDay() !== 0) {
      // minus 1 day as milisecond to firstDay
      firstDay.setTime(firstDay.getTime() - 1 * 24 * 60 * 60 * 1000);
    }

    while (lastDay.getDay() !== 6) {
      lastDay.setTime(lastDay.getTime() + 1 * 24 * 60 * 60 * 1000);
    }

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    /**
     * for from firstday to lastday
     */
    let currentDate = firstDay;
    while (currentDate <= lastDay) {
      daysInMonth.push([
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
        currentDate.getDay(),
        currentDate < today ? 1 : 0,
      ]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDaysInMonth(daysInMonth);
  }, [year, month]);

  const weekdays = "일 월 화 수 목 금 토".split(" ");

  return (
    <VStack
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HStack
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={() => prevMonth()} variant="ghost">{`<`}</Button>
        <Text fontSize="3xl" as="b">
          {year}.{month}
        </Text>
        <Button onClick={() => nextMonth()} variant="ghost">{`>`}</Button>
      </HStack>
      <Grid
        templateColumns="repeat(7, 1fr)"
        style={{
          width: "30rem",
        }}
      >
        {weekdays.map((weekday) => {
          return <Text>{weekday}</Text>;
        })}

        {daysInMonth.map((day) => {
          return (
            <CalendarDate
              dateItem={{
                year: day[0],
                month: day[1],
                day: day[2],
                weekday: day[3],
                passed: day[4] === 1 ? true : day[1] !== month,
                info: getDayDetail(day[0], day[1], day[2]),
              }}
              clicked={day[0] === year && day[1] === month && day[2] === date}
              onClick={onClickDateItem}
            />
          );
        })}
      </Grid>
    </VStack>
  );
};

export default Calendar;
export type { DateInfo };
