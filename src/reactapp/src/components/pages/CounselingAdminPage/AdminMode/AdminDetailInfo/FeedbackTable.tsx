import { FC } from "react";
import { studentData } from "../../StudentData";
import { Box, Text, HStack, VStack } from "@chakra-ui/react";

type FeedbackTableProps = {
  selectedId: string;
}

const FeedbackTable: FC<FeedbackTableProps> = ({ selectedId }) => {

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
        <Box style={{
          width: "3rem",
          backgroundColor: "#F5F5F5",
          padding: "4px 0"
        }}>
          <Text fontSize="sm" fontWeight="bold">번호</Text>
        </Box>
        <Box style={{
          width: "20rem",
          backgroundColor: "#F5F5F5",
          padding: "4px 0"
        }}>
          <Text fontSize="sm" fontWeight="bold">피드백 내용</Text>
        </Box>
        <Box style={{
          width: "7rem",
          backgroundColor: "#F5F5F5",
          padding: "4px 0"
        }}>
          <Text fontSize="sm" fontWeight="bold">이행 여부</Text>
        </Box>
      </HStack>
      {studentData.find(
        (student) =>
          student.id === selectedId)?.feedbackData?.map((data, index) => (
            <HStack spacing="1px">
              <Box
                style={{
                  width: "3rem",
                  backgroundColor: "#FFFFFF",
                  padding: "4px 0"
                }}
              >
                <Text fontSize="sm">{index + 1}</Text>
              </Box>
              <Box
                style={{
                  width: "20rem",
                  backgroundColor: "#FFFFFF",
                  padding: "4px 0"
                }}
              >
                <Text fontSize="sm">{data.feedback}</Text>
              </Box>
              <Box
                style={{
                  width: "7rem",
                  backgroundColor: "#FFFFFF",
                  padding: "4px 0"
                }}
              >
                <Text fontSize="sm">{data.isCompleted ? "O" : "X"}</Text>
              </Box>
            </HStack>
      ))}
    </VStack>
  );
};

export default FeedbackTable;