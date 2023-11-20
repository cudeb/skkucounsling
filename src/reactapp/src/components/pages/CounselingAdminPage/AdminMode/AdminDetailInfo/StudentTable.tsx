import { FC } from "react";
import DetailedStatusModal from "./DetailedStatusModal";
import { formattedTimeslot } from "../../../../../dataflow/DateFunc";
import { ScheduleType, UserInfoType } from "../../interface";
import { tableHeadStyle, tableBodyStyle } from "../../../../../styles/styles";
import { Center, Table, Thead, Tbody, Tr, Th, Td, TableContainer, useDisclosure } from '@chakra-ui/react'

type StudentTableProps = {
  studentInfo: UserInfoType;
  selectedSchedules: Array<ScheduleType>;
  selectedIndex: number;
  setSelectedIndex(e: number): void;
}

const StudentTable: FC<StudentTableProps> = ({
  studentInfo,
  selectedSchedules,
  selectedIndex,
  setSelectedIndex
}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const tableHeadArray: Array<string> = [
    "상담 회차", "이름", "상담 일자", "상담 시간", "완료 여부", "비고"
  ];

  return (
    <TableContainer overflowX="hidden">
      <Table colorScheme="gray">
        <Thead>
          <Tr>
            {tableHeadArray.map((head, index) => (
              <Th key={index} style={tableHeadStyle}>
                <Center w="5rem" fontSize="sm">{head}</Center>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {selectedSchedules.map((schedule, index) => (
            <Tr key={index}>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {schedule.session_number}
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {studentInfo.user.username ?? ""}
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {schedule.session_date}
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {formattedTimeslot(schedule.session_timeslot)}
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                <Center w="5rem" fontSize="sm">
                  {schedule.session_status === "Yet" ? "상담 전" : "상담 완료"}
                </Center>
              </Td>
              <Td style={tableBodyStyle}>
                {schedule.session_status === "Done" && (
                  <Center
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    w="5rem"
                    fontSize="sm"
                    onClick={() => {
                      setSelectedIndex(index);
                      onOpen();
                    }}
                  >
                    상세보기
                  </Center>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <DetailedStatusModal
        isOpen={isOpen}
        onClose={onClose}
        studentInfo={studentInfo}
        selectedSchedules={selectedSchedules}
        selectedIndex={selectedIndex}
      />
    </TableContainer>
  );
};

export default StudentTable;