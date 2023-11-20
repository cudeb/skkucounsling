import { FC, useEffect, useState } from "react";
import { toJS } from "mobx";
import { counselorStore } from "../../../../../../dataflow/store/counselor/CounselorStore";
import { ScheduleType } from "../../../interface";
import { tableHeadStyle, tableBodyStyle } from "../../../../../../styles/styles";
import { Text, VStack, TableContainer, Thead, Tr, Th, Center, Tbody, Td, Table } from "@chakra-ui/react";

type ModalCaptionProps = {
  selectedSchedules: Array<ScheduleType>;
  appliedAt: string;
  field: string;
  counselingType: string;
  selectedIndex: number;
  publicCaption: string;
  setPublicCaption(e: string): void;
};

const ModalCaption: FC<ModalCaptionProps> = ({
  selectedSchedules,
  appliedAt,
  field,
  counselingType,
  selectedIndex,
  publicCaption,
  setPublicCaption,
}) => {
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    const fetchJournalData = async (schedule_id: number) => {
      await counselorStore.fetchJournal(schedule_id, () => {
        setFeedback(toJS(counselorStore.journal));
      });
    };

    fetchJournalData(selectedSchedules[selectedIndex]?.id ?? -1).then();
  }, [selectedSchedules]);

  return (
    <VStack spacing="1rem">
      <TableContainer overflowX="hidden">
        <Table colorScheme="gray">
          <Thead>
            <Tr>
              <Th style={tableHeadStyle}>
                <Center w="5rem" fontSize="sm">상담일</Center>
              </Th>
              <Th
                style={{
                  width: "3rem",
                  backgroundColor: "#F5F5F5",
                  padding: "4px 0",
                  border: "1px solid rgba(41, 41, 41, 0.3)"
                }}
              >
                <Center w="3rem" fontSize="sm">시간</Center>
              </Th>
              <Th style={tableHeadStyle}>
                <Center w="5rem" fontSize="sm">신청 일자</Center>
              </Th>
              <Th style={tableHeadStyle}>
                <Center w="5rem" fontSize="sm">확정 일자</Center>
              </Th>
              <Th style={tableHeadStyle}>
                <Center w="5rem" fontSize="sm">상담 분야</Center>
              </Th>
              <Th
                style={{
                  width: "7rem",
                  backgroundColor: "#F5F5F5",
                  padding: "4px 0",
                  border: "1px solid rgba(41, 41, 41, 0.3)"
                }}
              >
                <Center w="7rem" fontSize="sm">상담 종류</Center>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {selectedSchedules[selectedIndex].session_date}
                </Center>
              </Td>
              <Td
                style={{
                  width: "3rem",
                  backgroundColor: "#FFFFFF",
                  padding: "4px 0",
                  border: "1px solid rgba(41, 41, 41, 0.3)"
                }}
              >
                <Center w="3rem" fontSize="sm">
                  {parseInt(selectedSchedules[selectedIndex].session_timeslot.slice(3)) + 9}시
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {appliedAt}
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {appliedAt}
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {field}
                </Center>
              </Td>
              <Td
                style={{
                  width: "7rem",
                  backgroundColor: "#FFFFFF",
                  padding: "4px 0",
                  border: "1px solid rgba(41, 41, 41, 0.3)"
                }}
              >
                <Center w="7rem" fontSize="sm">
                  {counselingType.split("_")[1] + "회기 개인 상담"}
                </Center>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <VStack style={{ alignItems: "flex-start" }}>
        <Text>상담 학생용 상담 내용</Text>
        {feedback === "" ? (
          <textarea
            style={{
              width: "calc(30rem + 7px)",
              height: "10rem",
              border: "1px solid #292929",
              borderRadius: "16px",
              padding: "8px"
            }}
            value={publicCaption}
            onChange={(e) => setPublicCaption(e.target.value)}
          />
        ) : (
          <div
            style={{
              width: "calc(30rem + 7px)",
              height: "10rem",
              border: "1px solid rgba(41, 41, 41, 0.5)",
              borderRadius: "16px",
              backgroundColor: "rgba(41, 41, 41, 0.1)",
              opacity: "0.5",
              padding: "8px"
            }}
          >
          {feedback}
        </div>)}
      </VStack>
    </VStack>
  );
};

export default ModalCaption;