import { Text, VStack } from "@chakra-ui/react";
import Calendar from "./Calendar";
import { useState } from "react";

const CalendarTest = () => {
  let [date, setDate] = useState("-1");
  return (
    <VStack>
      <Calendar
        dateSelectable
        dayDetails={{
          "2023-11-01": {
            task: "예정",
          },
          "2023-11-02": {
            task: "진행",
          },
          "2023-11-03": {
            task: "심리",
          },
        }}
        onClickDate={(year, month, date) => {
          setDate(`${year}-${month}-${date}`);
        }}
      />
      <Text>
        {date === "-1" ? "날짜를 선택해주세요" : `선택한 날짜: ${date}`}
      </Text>
    </VStack>
  );
};

export default CalendarTest;
