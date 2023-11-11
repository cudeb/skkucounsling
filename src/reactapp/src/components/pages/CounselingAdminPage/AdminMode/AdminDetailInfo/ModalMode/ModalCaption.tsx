import { FC } from "react";
import { studentData } from "../../../StudentData";
import { tableHeadStyle, tableBodyStyle } from "../../../../../../styles";
import { Box, Text, HStack, VStack } from "@chakra-ui/react";

type ModalCaptionProps = {
  selectedId: string;
  selectedIndex: number;
  publicCaption: string;
  privateCaption: string;
  setPublicCaption(e: string): void;
  setPrivateCaption(e: string): void;
};

const ModalCaption: FC<ModalCaptionProps> = ({
  selectedId,
  selectedIndex,
  publicCaption,
  privateCaption,
  setPublicCaption,
  setPrivateCaption
}) => {

  return (
    <VStack spacing="1rem">
      <VStack
        style={{
          width: "fit-content",
          backgroundColor: "rgba(41, 41, 41, 0.3)",
          padding: "1px",
          textAlign: "center"
        }}
        spacing="1px"
      >
        <HStack spacing="1px">
          <Box style={tableHeadStyle}>
            <Text fontSize="sm" fontWeight="bold">상담일</Text>
          </Box>
          <Box style={{
            width: "3rem",
            backgroundColor: "#F5F5F5",
            padding: "4px 0"
          }}>
            <Text fontSize="sm" fontWeight="bold">시간</Text>
          </Box>
          <Box style={tableHeadStyle}>
            <Text fontSize="sm" fontWeight="bold">신청 일자</Text>
          </Box>
          <Box style={tableHeadStyle}>
            <Text fontSize="sm" fontWeight="bold">확정 일자</Text>
          </Box>
          <Box style={tableHeadStyle}>
            <Text fontSize="sm" fontWeight="bold">상담 분야</Text>
          </Box>
          <Box style={{
            width: "7rem",
            backgroundColor: "#F5F5F5",
            padding: "4px 0"
          }}>
            <Text fontSize="sm" fontWeight="bold">상담 종류</Text>
          </Box>
        </HStack>
        <HStack spacing="1px">
          <Box style={tableBodyStyle}>
            <Text fontSize="sm">
              {studentData.find(
                (student) =>
                  student.id === selectedId
              )?.counselingInfo?.[selectedIndex]?.date}
            </Text>
          </Box>
          <Box
            style={{
              width: "3rem",
              backgroundColor: "#FFFFFF",
              padding: "4px 0"
            }}
          >
            <Text fontSize="sm">
              {studentData.find(
                (student) =>
                  student.id === selectedId
              )?.counselingInfo?.[selectedIndex]?.time}시
            </Text>
          </Box>
          <Box style={tableBodyStyle}>
            <Text fontSize="sm">
              {studentData.find(
                (student) =>
                  student.id === selectedId
              )?.counselingInfo?.[selectedIndex]?.appliedDate}
            </Text>
          </Box>
          <Box style={tableBodyStyle}>
            <Text fontSize="sm">
              {studentData.find(
                (student) =>
                  student.id === selectedId
              )?.counselingInfo?.[selectedIndex]?.confirmedDate}
            </Text>
          </Box>
          <Box style={tableBodyStyle}>
            <Text fontSize="sm">
              {studentData.find(
                (student) =>
                  student.id === selectedId
              )?.counselingInfo?.[selectedIndex]?.field}
            </Text>
          </Box>
          <Box
            style={{
              width: "7rem",
              height: "100%",
              backgroundColor: "#FFFFFF",
              padding: "4px 0"
            }}
          >
            <Text fontSize="sm">
              {studentData.find(
                (student) =>
                  student.id === selectedId
              )?.counselingInfo?.[selectedIndex]?.type}
            </Text>
          </Box>
        </HStack>
      </VStack>
      <VStack style={{ alignItems: "flex-start" }}>
        <Text>상담 학생용 상담 내용</Text>
        <textarea
          style={{
            width: "calc(30rem + 7px)",
            height: "5rem",
            border: "1px solid #292929",
            padding: "8px"
          }}
          value={publicCaption}
          onChange={(e) => setPublicCaption(e.target.value)}
        />
      </VStack>
      <VStack style={{ alignItems: "flex-start" }}>
        <Text>상담사용 상담 내용</Text>
        <textarea
          style={{
            width: "calc(30rem + 7px)",
            height: "5rem",
            border: "1px solid #292929",
            padding: "8px"
          }}
          value={privateCaption}
          onChange={(e) => setPrivateCaption(e.target.value)}
        />
      </VStack>
    </VStack>
  );
};

export default ModalCaption;