import { FC } from "react";
import DetailedStatusModal from "./DetailedStatusModal";
import { formattedTimeslot } from "../../../../../dataflow/DateFunc";
import { ScheduleType, UserInfoType } from "../../interface";
import { tableHeadStyle, tableBodyStyle } from "../../../../../styles/styles";
import {
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";

type StudentTableProps = {
  studentInfo: UserInfoType;
  selectedSchedules: Array<ScheduleType>;
  selectedIndex: number;
  setSelectedIndex(e: number): void;
};

const StudentTable: FC<StudentTableProps> = ({
  studentInfo,
  selectedSchedules,
  selectedIndex,
  setSelectedIndex,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tableHeadArray: Array<string> = [
    "상담 회차",
    "이름",
    "상담 일자",
    "상담 시간",
    "완료 여부",
    "비고",
  ];

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
            {tableHeadArray.map((head, index) => (
              <Th key={index} fontSize="xs" style={{ color: "white" }}>
                {head}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {selectedSchedules.map((schedule, index) => (
            <>
              <Tr key={index}>
                <Td fontSize="xs" style={{ whiteSpace: "pre-wrap" }}>
                  {schedule.session_number}
                </Td>
                <Td fontSize="xs" style={{ whiteSpace: "pre-wrap" }}>
                  {studentInfo.user.username ?? ""}
                </Td>
                <Td fontSize="xs" style={{ whiteSpace: "pre-wrap" }}>
                  {schedule.session_date}
                </Td>
                <Td fontSize="xs" style={{ whiteSpace: "pre-wrap" }}>
                  {formattedTimeslot(schedule.session_timeslot)}
                </Td>
                <Td fontSize="xs" style={{ whiteSpace: "pre-wrap" }}>
                  {schedule.session_status === "Yet" ? (
                    "상담 전"
                  ) : (
                    <>
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
                    </>
                  )}
                </Td>
                <Td fontSize="xs" style={{ whiteSpace: "pre-wrap" }}></Td>
              </Tr>
            </>
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
