import Appbar from "../Appbar";
import Calendar from "../Calendar";
import CounselingScheduleModal from "../modals/CounselingScheduleModal";
import { VStack, HStack, Flex, Text, useDisclosure } from "@chakra-ui/react";

const CounselorMainPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack style={{ width: "100%" }}>
      <Appbar/>

      <VStack
        style={{
          width: "100%",
          alignItems: "flex-start",
          gap: "2rem",
          padding: "2rem 10rem"
        }}
      >
        <Flex align="flex-end" gap={8}>
          <Text fontSize="2xl" fontWeight="bold">상담 현황</Text>
          <Text fontSize="lg">개인 상담 현황을 한 눈에 확인하세요</Text>
        </Flex>
        <HStack
          style={{
            width: "100%",
            gap: "4rem",
          }}
          justify="center"
        >
          <VStack
            style={{
              backgroundColor: "rgba(41, 41, 41, 0.3)",
              gap: "2rem",
              padding: "2rem",
              borderRadius: "24px"
            }}
          >
            <Text fontSize="2xl" fontWeight="bold">진행 중인 상담</Text>
            <VStack
              style={{
                width: "100%",
                gap: "1rem",
                alignItems: "flex-start"
              }}
            >
              <VStack style={{ alignItems: "flex-start" }}>
                <Text fontWeight="bold">검사 해석 상담(검사 후 1회기 해석)</Text>
                {["진행 중인 학생이 없습니다"].map((line) => (
                  <Text>• {line}</Text>
                ))}
              </VStack>
              <VStack style={{ alignItems: "flex-start" }}>
                <Text fontWeight="bold">5회기 개인 상담</Text>
                {["김성균", "이율전"].map((line) => (
                  <Text>• {line} 학생</Text>
                ))}
              </VStack>
              <VStack style={{ alignItems: "flex-start" }}>
                <Text fontWeight="bold">10회기 개인 상담</Text>
                {["김율전", "박율전", "최율전"].map((line) => (
                  <Text>• {line} 학생</Text>
                ))}
              </VStack>
              <Text fontSize="xl" fontWeight="bold" color="#00953D">다음 상담일: 10월 25일 (수) 11:00</Text>
            </VStack>
          </VStack>
          <VStack
            style={{
              padding: "2rem",
              border: "1px solid #292929"
            }}
            onClick={onOpen}
          >
            <Calendar />
          </VStack>
        </HStack>
      </VStack>
      <CounselingScheduleModal isOpen={isOpen} onClose={onClose} date={-1}/>
    </VStack>
  );
};

export default CounselorMainPage;