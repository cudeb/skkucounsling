import { FC, useEffect, useState } from "react";
import { toJS } from "mobx";
import { counselorStore } from "../../../../../dataflow/store/counselor/CounselorStore";
import { ScheduleType } from "../../interface";
import { tableBodyStyle, tableHeadStyle } from "../../../../../styles/styles";
import {
  Table,
  Thead,
  Tr,
  Th,
  Center,
  Tbody,
  Td,
  TableContainer,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";

type FeedbackTableProps = {
  selectedSchedules: Array<ScheduleType>;
};

const FeedbackTable: FC<FeedbackTableProps> = ({ selectedSchedules }) => {
  const [feedbacks, setFeedbacks] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchJournalData = async (schedule_id: number) => {
      await counselorStore.fetchJournal(schedule_id, () => {
        let newFeedback = [...feedbacks];
        newFeedback.push(toJS(counselorStore.journal));
        setFeedbacks(newFeedback);
      });
    };

    selectedSchedules.forEach((schedule) => {
      fetchJournalData(schedule.id).then();
    });
  }, [selectedSchedules]);

  return (
    <VStack
      gap="0"
      style={{
        width: "100%",
      }}
    >
      <HStack
        style={{
          width: "100%",
          backgroundColor: "#F2f2f2",
          border: "0.25px solid #000000",
        }}
      >
        <Text
          style={{
            width: "2rem",
          }}
        >
          번호
        </Text>
        <Text
          style={{
            flex: 1,
          }}
        >
          피드백 내용
        </Text>
      </HStack>
      <VStack
        gap="0"
        style={{
          overflowY: "scroll",
          height: "27rem",
          width: "100%",
        }}
      >
        {feedbacks[0] &&
          feedbacks.map((feedback, index) => (
            <HStack
              style={{
                width: "100%",
                backgroundColor: "#Ffffff",
                border: "0.25px solid #000000",
                gap: 0,
              }}
            >
              <Text
                style={{
                  width: "2rem",
                }}
              >
                {index + 1}
              </Text>
              <div
                style={{
                  width: "0.25px",
                  height: "100%",
                  backgroundColor: "#000000",
                }}
              />
              <Text
                style={{
                  flex: 1,
                  textAlign: "left",
                  padding: "0.4rem",
                }}
              >
                {feedback}
              </Text>
            </HStack>
          ))}
      </VStack>
    </VStack>
  );
};

export default FeedbackTable;
