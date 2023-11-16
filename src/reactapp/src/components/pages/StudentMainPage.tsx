import { Button, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Appbar from "../Appbar";
import Calendar from "../Calendar";
import IconDocument from "../../resources/calendar/icon_document.png";
import IconCheck from "../../resources/calendar/icon_check.png";
import IconClick from "../../resources/calendar/icon_click.png";
import { useEffect, useState } from "react";
import { studentStore } from "../../dataflow/store/student/StudentStore";
import { useNavigate } from "react-router";
import StudentCounselInfoModal from "../modals/StudentCounselInfoModal";

const TaskAttendancyOerview = observer(() => {
  return (
    <VStack
      style={{
        width: "20rem",
        height: "12rem",
        backgroundColor: "#d9d9d9",
        borderRadius: "1rem",
        justifyContent: "center",
      }}
    >
      <Text fontSize="2xl" as="b">
        출결 현황
      </Text>

      <VStack
        style={{
          alignItems: "flex-start",
          width: "100%",
          padding: "1rem",
        }}
      >
        <Text as="b" color="#2788DD">
          진행한 상담 횟수: {1}회
        </Text>
        <Text as="b">잔여 상담 횟수 : {9}회</Text>
        <Text color="#f35359" as="b">
          불참 횟수: {0}회
        </Text>
        <Text fontSize="sm" color="#f35359" as="b">
          *2회 무단 불참시 상담이 종료됩니다
        </Text>
      </VStack>
    </VStack>
  );
});

const TaskPendingOerview = observer(() => {
  return (
    <VStack
      style={{
        width: "20rem",
        height: "12rem",
        backgroundColor: "#d9d9d9",
        borderRadius: "1rem",
        justifyContent: "center",
      }}
    >
      <Text fontSize="2xl" as="b">
        진행 중인 상담
      </Text>

      <VStack
        style={{
          alignItems: "flex-start",
          width: "100%",
          padding: "1rem",
        }}
      >
        <Text as="b">개인상담 10회기</Text>
        <Text as="b">상담 시작일: {`10월 19일 (목)`}</Text>
        <Text color="#00953d" as="b">
          다음 상담일: {`10월 26일 (목)`}
        </Text>
      </VStack>
    </VStack>
  );
});

const TaskPage = observer(() => {
  return (
    <VStack>
      <HStack style={{ alignItems: "flex-end", margin: "1rem" }}>
        <Text fontSize="2xl" fontWeight="700">
          상담 현황
        </Text>
        <Text fontSize="md">개인 상담 현황을 한 눈에 확인하세요</Text>
      </HStack>
      <TaskPendingOerview />
      <TaskAttendancyOerview />
    </VStack>
  );
});

const CalendarPage = observer(() => {
  return (
    <VStack>
      <Container
        style={{
          border: "1px solid #a2a2a2",
          marginTop: "4rem",
        }}
      >
        <Calendar
          dayDetails={studentStore.calendarSchedule}
          onClickDate={(year, month, date) => {
            studentStore.setMainModalSchedule([year, month, date]);
          }}
        />
      </Container>
      <HStack
        style={{
          width: "100%",
        }}
      >
        <div style={{ flex: 1 }} />
        <img
          src={IconDocument}
          alt=""
          style={{ width: "1rem", height: "1rem" }}
        />
        <Text fontSize="md" color="#db8219">
          심리 상담
        </Text>

        <img src={IconCheck} alt="" style={{ width: "1rem", height: "1rem" }} />
        <Text fontSize="md" color="#2788DD">
          진행한 상담
        </Text>

        <img src={IconClick} alt="" style={{ width: "1rem", height: "1rem" }} />
        <Text fontSize="md" color="#00953D">
          진행예정 상담
        </Text>
      </HStack>
    </VStack>
  );
});

const StudentMainPage = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    studentStore.fetchSchedule();
  }, []);

  const [isModalOpen, openModal] = useState(false);

  useEffect(() => {
    if (studentStore.mainModalSchedule) {
      openModal(true);
    }
  }, [studentStore.mainModalSchedule]);

  return (
    <VStack
      style={{
        width: "100%",
      }}
    >
      <Appbar/>
      <HStack
        style={{
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <TaskPage />
        <CalendarPage />
      </HStack>
      <StudentCounselInfoModal
        isOpen={isModalOpen}
        onClose={() => {
          studentStore.setMainModalSchedule(null);
          openModal(false);
        }}
        counsel={studentStore.mainModalSchedule}
        time={studentStore.mainModalScheduleDate}
        onSave={function (memo: string): void {
          //throw new Error("Function not implemented.");
        }}
      />
    </VStack>
  );
});

export default StudentMainPage;
