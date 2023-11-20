import { useEffect, useState } from "react";
import { toJS } from "mobx";
import Appbar from "../Appbar";
import Calendar, { DateInfo } from "../Calendar";
import CounselingScheduleModal from "../modals/CounselingScheduleModal";
import { counselorStore } from "../../dataflow/store/counselor/CounselorStore";
import { BasicInfoType, DetailInfoType } from "./CounselingAdminPage/interface";
import {
  VStack,
  HStack,
  Flex,
  Text,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import {
  dateToKrLocale,
  dateToKrLocaleWeekday,
  numToDateString,
} from "../../dataflow/DateFunc";
import { ICounselingSchedule } from "../../dataflow/interface/counseling";
import { useNavigate } from "react-router";

const CounselorMainPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [basicInfo, setBasicInfo] = useState<BasicInfoType[]>([]);
  const [detailInfo, setDetailInfo] = useState<DetailInfoType[]>([]);
  const [calendarInfo, setCalendarInfo] = useState<{ [key: string]: DateInfo }>(
    {}
  );

  const [counselings, setCounselings] = useState<ICounselingSchedule[]>([]);
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

    const fetchSchedule = async () => {
      await counselorStore.fetchSchedule(() => {
        let schedules: { [key: string]: DateInfo } = {};
        counselorStore.schedules.forEach((schedule) => {
          schedules[schedule.session_date] = {
            task: schedule.session_status === "Yet" ? "예정" : "진행",
          };
        });
        setCalendarInfo(schedules);
      });
    };

    fetchInfoData().then();
    fetchDetailData().then();
    fetchSchedule().then();
  }, []);
  const navigate = useNavigate();

  const navigateToStudentDetail = (id: number) => {
    navigate("/admin/manageCounseling?id=" + id);
  };

  const [modalDate, setModalDate] = useState<number>(-1);

  const renderFilteredStudents = (
    typeNum: number
  ): Array<{ username: string; id: number }> => {
    let newSet: Set<{ username: string; id: number }> = new Set();
    basicInfo
      .filter(
        (info) =>
          info.counseling_application.counseling_type ===
            `personal_${typeNum}` &&
          basicInfo.find(
            (basic) =>
              basic.counseling_application.id === info.counseling_application.id
          )
      )
      .forEach((e) => {
        newSet.add({
          username: e.student.user.username,
          id: e.id,
        });
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
                  <Text
                    key={index}
                    fontSize="sm"
                    onClick={() => navigateToStudentDetail(line.id)}
                  >
                    • {line.username} 학생
                  </Text>
                ))}
              </VStack>
              <VStack style={{ alignItems: "flex-start" }}>
                <Text fontWeight="bold">5회기 개인 상담</Text>
                {renderFilteredStudents(5).map((line, index) => (
                  <Text
                    key={index}
                    fontSize="sm"
                    onClick={() => navigateToStudentDetail(line.id)}
                  >
                    • {line.username} 학생
                  </Text>
                ))}
              </VStack>
              <VStack style={{ alignItems: "flex-start" }}>
                <Text fontWeight="bold">10회기 개인 상담</Text>
                {renderFilteredStudents(10).map((line, index) => (
                  <Text
                    key={index}
                    fontSize="sm"
                    onClick={() => navigateToStudentDetail(line.id)}
                  >
                    • {line.username} 학생
                  </Text>
                ))}
              </VStack>
              <Text fontSize="xl" fontWeight="bold" color="#00953D">
                다음 상담일:{" "}
                {dateToKrLocaleWeekday(
                  new Date(
                    counselorStore.schedules.find(
                      (schedule) => schedule.session_status === "Yet"
                    )?.session_date || ""
                  )
                )}
              </Text>
            </VStack>
          </VStack>
          <div
            style={{
              border: "1px solid #000000",
            }}
          >
            <Calendar
              dayDetails={calendarInfo}
              onClickDate={(year, month, date) => {
                const dateString = numToDateString(year, month, date);
                if (calendarInfo[dateString]) {
                  setModalDate(month * 100 + date);
                  setCounselings(
                    counselorStore.schedules.filter(
                      (schedule) => schedule.session_date === dateString
                    )
                  );
                  onOpen();
                }
              }}
            />
          </div>
        </HStack>
      </VStack>
      <CounselingScheduleModal
        isOpen={isOpen}
        onClose={onClose}
        date={modalDate}
        counselings={counselings}
      />
    </VStack>
  );
};

export default CounselorMainPage;
