import { FC } from "react";
import DetailedStatusModal from "./DetailedStatusModal";
import { studentData } from "../../StudentData";
import { tableHeadStyle, tableBodyStyle } from "../../../../../styles";
import { Box, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";

type StudentTableProps = {
  selectedId: string;
  selectedIndex: number;
  setSelectedIndex(e: number): void;
}

const StudentTable: FC<StudentTableProps> = ({
  selectedId,
  selectedIndex,
  setSelectedIndex
}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const tableHeadArray: Array<string> = [
    "상담 회차", "이름", "상담 일자", "상담 시간", "완료 여부", "비고"
  ];

  return (
    <VStack
      style={{
        backgroundColor: "rgba(41, 41, 41, 0.3)",
        justifyContent: "center",
        padding: "1px"
      }}
      spacing="1px"
    >
      <HStack spacing="1px">
        {tableHeadArray.map((head, index) => (
          <Box key={index} style={tableHeadStyle}>
            <Text fontSize="sm" fontWeight="bold">{head}</Text>
          </Box>
        ))}
      </HStack>
      {studentData.find(
        (student) =>
          student.id === selectedId)?.counselingInfo?.map((info, index) => (
            <HStack spacing="1px">
              <Box style={tableBodyStyle}>
                <Text fontSize="sm">{index + 1}</Text>
              </Box>
              <Box style={tableBodyStyle}>
                <Text fontSize="sm">
                  {studentData.find((student) => student.id === selectedId)?.name}
                </Text>
              </Box>
              <Box style={tableBodyStyle}>
                <Text fontSize="sm">{info.date}</Text>
              </Box>
              <Box style={tableBodyStyle}>
                <Text fontSize="sm">{info.time}시</Text>
              </Box>
              <Box style={tableBodyStyle}>
                <Text fontSize="sm">
                  {info.isCompleted ? "상담 완료" : "상담 전"}
                </Text>
              </Box>
              <Box
                style={{
                  width: "5rem",
                  height: "100%",
                  backgroundColor: "#FFFFFF",
                  padding: "4px 0",
                }}
              >
                {info.isCompleted ? (
                  <Text
                    style={{
                      cursor: "pointer"
                    }}
                    fontSize="sm"
                    fontWeight="bold"
                    onClick={() => {
                      setSelectedIndex(index);
                      onOpen();
                    }}
                  >
                    상세보기
                  </Text>
                ) : (
                  <Text fontSize="sm">3시간 남음</Text>
                )}
              </Box>
            </HStack>
      ))}
      <DetailedStatusModal
        isOpen={isOpen}
        onClose={onClose}
        selectedId={selectedId}
        selectedIndex={selectedIndex}
      />
    </VStack>
  );
};

export default StudentTable;