import { useEffect, useState } from "react";
import { toJS } from "mobx";
import Appbar from "../Appbar";
import Calendar from "../Calendar";
import CounselingScheduleModal from "../modals/CounselingScheduleModal";
import { counselorStore } from "../../dataflow/store/counselor/CounselorStore";
import { BasicInfoType, DetailInfoType } from "./CounselingAdminPage/interface";
import { VStack, HStack, Flex, Text, useDisclosure } from "@chakra-ui/react";

const CounselorMainPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [basicInfo, setBasicInfo] = useState<BasicInfoType[]>([]);
  const [detailInfo, setDetailInfo] = useState<DetailInfoType[]>([]);

  useEffect(() => {
    const fetchInfoData = async () => {
      await counselorStore.fetchInfo(() => {
        setBasicInfo(toJS(counselorStore.basicInfo) || []);
      });
    };
    const fetchDetailData = async () => {
      await counselorStore.fetchDetail(() => {
        setDetailInfo(toJS(counselorStore.detailInfo) || []);
      });
    };

    fetchInfoData().then();
    fetchDetailData().then();
  }, []);

  const renderFilteredStudents = (typeNum: number): Array<string> => {
    let newSet: Set<string> = new Set();
    detailInfo
      .filter(
        (info) =>
          info.counseling_type === `personal_${typeNum}` &&
          basicInfo.find((basic) => basic.counseling_application.id === info.id)
      )
      .forEach((e) => {
        newSet.add(e.student.user.username);
      });
    return Array.from(newSet);
  };

  return (
    <VStack style={{ width: "100%" }}>
      <Appbar />
      <VStack
        style={{
          width: "100%",
          alignItems: "flex-start",
          gap: "2rem",
          padding: "2rem 10rem",
        }}
      >
        <Flex align="flex-end" gap={8}>
          <Text fontSize="2xl" fontWeight="bold">
            상담 현황
          </Text>
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
              borderRadius: "24px",
            }}
          >
            <Text fontSize="2xl" fontWeight="bold">
              진행 중인 상담
            </Text>
            <VStack
              style={{
                width: "100%",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <VStack style={{ alignItems: "flex-start" }}>
                <Text fontWeight="bold">
                  검사 해석 상담(검사 후 1회기 해석)
                </Text>
                {renderFilteredStudents(1).map((line, index) => (
                  <Text key={index} fontSize="sm">
                    • {line} 학생
                  </Text>
                ))}
              </VStack>
              <VStack style={{ alignItems: "flex-start" }}>
                <Text fontWeight="bold">5회기 개인 상담</Text>
                {renderFilteredStudents(5).map((line, index) => (
                  <Text key={index} fontSize="sm">
                    • {line} 학생
                  </Text>
                ))}
              </VStack>
              <VStack style={{ alignItems: "flex-start" }}>
                <Text fontWeight="bold">10회기 개인 상담</Text>
                {renderFilteredStudents(10).map((line, index) => (
                  <Text key={index} fontSize="sm">
                    • {line} 학생
                  </Text>
                ))}
              </VStack>
              <Text fontSize="xl" fontWeight="bold" color="#00953D">
                다음 상담일: 11월 25일 (수) 11:00
              </Text>
            </VStack>
          </VStack>
          <VStack
            style={{
              padding: "2rem",
              border: "1px solid #292929",
            }}
            onClick={onOpen}
          >
            <Calendar />
          </VStack>
        </HStack>
      </VStack>
      <CounselingScheduleModal isOpen={isOpen} onClose={onClose} date={-1} />
    </VStack>
  );
};

export default CounselorMainPage;
