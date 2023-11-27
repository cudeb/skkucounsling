import { FC, useEffect, useState } from "react";
import { toJS } from "mobx";
import { counselorStore } from "../../../../../dataflow/store/counselor/CounselorStore";
import { ScheduleType } from "../../interface";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
} from "@chakra-ui/react";

type FeedbackTableProps = {
  selectedSchedules: Array<ScheduleType>;
};

const FeedbackTable: FC<FeedbackTableProps> = ({ selectedSchedules }) => {
  const [feedbacks, setFeedbacks] = useState<
    Array<{ id: number; feedback: string }>
  >([]);

  useEffect(() => {
    const fetchJournalData = async (schedule_id: number) => {
      await counselorStore.fetchJournal(schedule_id, () => {
        let newFeedback = [...feedbacks];
        const feedback = {
          id: schedule_id,
          feedback: toJS(counselorStore.journal),
        };

        newFeedback = newFeedback.filter(
          (_feedback) => _feedback.id === schedule_id
        );

        newFeedback.push(feedback);
        setFeedbacks(newFeedback);
      });
    };

    selectedSchedules.forEach((schedule) => {
      fetchJournalData(schedule.id).then();
    });
  }, [selectedSchedules]);

  return (
    <TableContainer
      style={{ width: "100%", overflowY: "scroll", maxHeight: "500px" }}
    >
      <Table variant="simple" size="sm">
        <Thead
          style={{
            position: "sticky",
            top: "0",
            zIndex: "1",
            backgroundColor: "#454545",
          }}
        >
          <Tr>
            <Th fontSize="xs" style={{ color: "white" }}>
              번호
            </Th>
            <Th fontSize="xs" style={{ color: "white" }}>
              피드백 내용
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {feedbacks[0] &&
            feedbacks.map((feedback, index) => (
              <Tr>
                <Td fontSize="xs">{index + 1}</Td>
                <Td fontSize="xs" style={{ whiteSpace: "pre-wrap" }}>
                  {feedback.feedback}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
    // <VStack
    //   gap="0"
    //   style={{
    //     width: "100%",
    //   }}
    // >
    //   <HStack
    //     style={{
    //       width: "100%",
    //       backgroundColor: "#F2f2f2",
    //       border: "0.25px solid #000000",
    //     }}
    //   >
    //     <Text
    //       style={{
    //         width: "2rem",
    //       }}
    //     >
    //       번호
    //     </Text>
    //     <Text
    //       style={{
    //         flex: 1,
    //       }}
    //     >
    //       피드백 내용
    //     </Text>
    //   </HStack>
    //   <VStack
    //     gap="0"
    //     style={{
    //       overflowY: "scroll",
    //       height: "27rem",
    //       width: "100%",
    //     }}
    //   >
    //     {feedbacks[0] &&
    //       feedbacks.map((feedback, index) => (
    //         <HStack
    //           style={{
    //             width: "100%",
    //             backgroundColor: "#Ffffff",
    //             border: "0.25px solid #000000",
    //             gap: 0,
    //           }}
    //         >
    //           <Text
    //             style={{
    //               width: "2rem",
    //             }}
    //           >
    //             {index + 1}
    //           </Text>
    //           <div
    //             style={{
    //               width: "0.25px",
    //               height: "100%",
    //               backgroundColor: "#000000",
    //             }}
    //           />
    //           <Text
    //             style={{
    //               flex: 1,
    //               textAlign: "left",
    //               padding: "0.4rem",
    //             }}
    //           >
    //             {feedback}
    //           </Text>
    //         </HStack>
    //       ))}
    //   </VStack>
    // </VStack>
  );
};

export default FeedbackTable;
