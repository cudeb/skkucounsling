import { FC, useEffect, useState } from "react";
import { toJS } from "mobx";
import { counselorStore } from "../../../../../dataflow/store/counselor/CounselorStore";
import { ScheduleType } from "../../interface";
import { tableBodyStyle, tableHeadStyle } from "../../../../../styles/styles";
import { Table, Thead, Tr, Th, Center, Tbody, Td, TableContainer } from "@chakra-ui/react";

type FeedbackTableProps = {
  selectedSchedules: Array<ScheduleType>;
}

const FeedbackTable: FC<FeedbackTableProps> = ({
  selectedSchedules,
}) => {
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
    <TableContainer overflowX="hidden">
      <Table colorScheme="gray">
        <Thead>
          <Tr>
            <Th style={tableHeadStyle}>
              <Center w="3rem" fontSize="sm">번호</Center>
            </Th>
            <Th style={tableHeadStyle}>
              <Center w="20rem" fontSize="sm">피드백 내용</Center>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {feedbacks[0] && feedbacks.map((feedback, index) => (
            <Tr>
              <Td style={tableBodyStyle}>
                <Center w="3rem" fontSize="sm">
                  {index + 1}
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                <Center w="20rem" fontSize="sm">
                  {feedback.length > 25 ? `${feedback.slice(0, 25)}...` : feedback}
                </Center>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FeedbackTable;