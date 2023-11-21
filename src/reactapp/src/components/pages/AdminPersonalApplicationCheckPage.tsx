import { Button, HStack, Text, VStack, ChakraProvider } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Appbar from "../Appbar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import AcceptModal from "./AcceptModal";
import RefuseModal from "./RefuseModal";
import { counselorApplicationStore } from "../../dataflow/store/counselor/CounselorApplicationStore";
import { DownloadIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";

const AdminPersonalApplicationCheckPage = observer(() => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  const counselingTypeMappings: { [key: string]: string } = {
    personal_1: "검사 해석 상담(검사 후 1회기 해석)",
    personal_5: "5회기 개인 상담",
    personal_10: "10회기 개인 상담",
  };

  const getCounselingType = (type: string) => {
    return counselingTypeMappings[type] || type;
  };

  function getAppliedAt(inputDateString: string): string {
    const inputDate = new Date(inputDateString);

    if (isNaN(inputDate.getTime())) {
      return "Invalid Date";
    }

    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const formattedDate = `${year}년 ${month}월 ${day}일  ${hours}시 ${
      minutes < 10 ? "0" : ""
    }${minutes}분`;

    return formattedDate;
  }

  const openAcceptModal = () => {
    setIsAcceptModalOpen(true);
  };

  const navigation = useNavigate();

  const closeAcceptModal = (date: string, timeSlot: string) => {
    counselorApplicationStore.applicationApproval.session_date = date;
    counselorApplicationStore.applicationApproval.session_timeslot = timeSlot;
    setIsAcceptModalOpen(false);
    counselorApplicationStore.postApplicationApproval();
    navigation("/admin/applicationCheck");
  };

  const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);

  const openRefuseModal = () => {
    setIsRefuseModalOpen(true);
  };

  const closeRefuseModal = () => {
    counselorApplicationStore.applicationRefuse.application_id = extractIdFromUrl();
    setIsRefuseModalOpen(false);
    counselorApplicationStore.postApplicationRefuse();
    navigation("/admin/applicationCheck");
    alert("신청서가 거절되었습니다.");
  };

  // 신청서 양식 다운로드
  const handleDownload = (path: string, saveName: string) => {
    // 파일을 읽어오는 동기 함수
    const loadFile = (url: string) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.send();
      return xhr.response;
    };

    // docx 파일 읽기
    const docxContent = loadFile(path);

    // Blob으로 변환
    const blob = new Blob([docxContent], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // 다운로드
    saveAs(blob, saveName);
  };

  // 해당 웹페이지의 주소값에서 id를 추출하는 함수
  function extractIdFromUrl(): number {
    const currentUrl: string = window.location.href;
    const match: RegExpMatchArray | null = currentUrl.match(
      /\/admin\/personalApplicationCheck\/(\d+)/
    );

    if (match && match[1]) {
      const id: number = parseInt(match[1], 10);
      return id;
    } else {
      throw new Error("ID not found in the URL");
    }
  }

  useEffect(() => {
    const currentId = extractIdFromUrl();
    counselorApplicationStore.fetchhCurrentApplication(currentId);
  }, []);

  const PageDescription = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", width: "100%" }}>
        <HStack style={{ alignItems: "flex-end", margin: "1rem" }}>
          <Text fontSize="2xl" fontWeight="700">
            상담 신청서 관리
          </Text>
          <Text fontSize="md">개인 상담 신청서를 수락 또는 거절하세요</Text>
        </HStack>
      </VStack>
    );
  });

  const StudentImageWrapper = observer(() => {
    return (
      <VStack
        style={{
          alignItems: "center",
          padding: "2rem",
          width: "20%",
          backgroundColor: "white",
          marginRight: "5%",
        }}
      >
        <img src="https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png"></img>
        <Text marginTop={5} fontSize="l" fontWeight="600">
          {counselorApplicationStore.currentApplication.student.user.realname}
        </Text>
        <Button
          onClick={() =>
            handleDownload(
              "../../../../djangoapp/" +
                counselorApplicationStore.currentApplication.application_file,
              counselorApplicationStore.currentApplication.application_file
            )
          }
          size="sm"
          leftIcon={<DownloadIcon />}
          style={{ backgroundColor: "#D9D9D9" }}
        >
          신청서 다운로드
        </Button>
      </VStack>
    );
  });

  const StudentInfoWrapper = observer(() => {
    return (
      <VStack
        style={{
          alignItems: "flex-start",
          padding: "2rem",
          width: "45%",
          backgroundColor: "lightgray",
          marginRight: "2%",
        }}
      >
        <HStack>
          <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
            상담 종류
          </Text>
          <Text marginTop={3} fontSize="smaller" fontWeight="600">
            {getCounselingType(
              counselorApplicationStore.currentApplication.counseling_type
            )}
          </Text>
        </HStack>
        <HStack>
          <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
            상담 분야
          </Text>
          <Text marginTop={3} fontSize="smaller" fontWeight="600">
            {counselorApplicationStore.currentApplication.counseling_preferfields
              .map((field) => field.field)
              .join(", ")}
          </Text>
        </HStack>
        <HStack>
          <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
            상담 신청 일시
          </Text>
          <Text marginTop={3} fontSize="smaller" fontWeight="600">
            {getAppliedAt(
              counselorApplicationStore.currentApplication.applied_at
            )}
          </Text>
        </HStack>
        <VStack style={{ alignItems: "flex-start" }}>
          <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
            상담 학생 정보
          </Text>
          <Text marginTop={1} fontSize="smaller" fontWeight="600">
            이름 :{" "}
            {counselorApplicationStore.currentApplication.student.user.realname}
          </Text>
          <Text marginTop={1} fontSize="smaller" fontWeight="600">
            학번 :{" "}
            {
              counselorApplicationStore.currentApplication.student.user
                .student_number
            }
          </Text>
          {/* 학년과 이메일 정보가 API에 없어서 구현 불가. */}
          <Text marginTop={1} fontSize="smaller" fontWeight="600">
            이메일 :{" "}
            {counselorApplicationStore.currentApplication.student.user.email}
          </Text>
          <Text marginTop={1} fontSize="smaller" fontWeight="600">
            생년월일 :{" "}
            {counselorApplicationStore.currentApplication.student.user.birth}
          </Text>
          <Text marginTop={1} fontSize="smaller" fontWeight="600">
            연락처 :{" "}
            {
              counselorApplicationStore.currentApplication.student.user
                .phone_number
            }
          </Text>
        </VStack>
      </VStack>
    );
  });

  const CounselingTimeAdmin = observer(() => {
    const isGreen = (key: string): boolean => {
      return counselorApplicationStore.currentApplication.counseling_prefertimeslots.some(
        (slot) => slot.timeslot === key
      );
    };

    return (
      <VStack
        style={{ alignItems: "flex-start", padding: "2rem", width: "50%" }}
      >
        <Text fontSize="xl" fontWeight="600">
          희망 상담 시간
        </Text>
        <Text style={{ textAlign: "start" }} fontSize="md">
          학생이 지정한 희망 상담 시간을 확인하세요
        </Text>
        <TableContainer style={{ width: "100%" }}>
          <Table
            colorScheme="gray"
            style={{ width: "60%", margin: "1rem" }}
            size="sm"
          >
            <Thead>
              <Tr style={{ backgroundColor: "#D9D9D9" }}>
                <Th style={{ width: "15%", textAlign: "center" }}>시간\요일</Th>
                <Th style={{ textAlign: "center" }}>월</Th>
                <Th style={{ textAlign: "center" }}>화</Th>
                <Th style={{ textAlign: "center" }}>수</Th>
                <Th style={{ textAlign: "center" }}>목</Th>
                <Th style={{ textAlign: "center" }}>금</Th>
              </Tr>
            </Thead>
            <Tbody>
              {["1", "2", "3", "4", "5", "6"].map((time, timeIndex) => {
                const realTime = [10, 11, 13, 14, 15, 16];
                return (
                  <Tr>
                    <Td style={{ backgroundColor: "#D9D9D9" }}>
                      {realTime[timeIndex]}:00~{realTime[timeIndex] + 1}:00
                    </Td>
                    {["MON", "TUE", "WED", "THU", "FRI"].map(
                      (day, dayIndex) => {
                        const key = `${day}${time}`;
                        return (
                          <Td bg={isGreen(key) ? "#579f6e" : "white"}></Td>
                        );
                      }
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    );
  });

  const StudentApplicationWrapper = observer(() => {
    return (
      <ChakraProvider>
        <VStack
          style={{
            alignItems: "center",
            padding: "2rem",
            width: "100%",
            backgroundColor: "lightgray",
            marginRight: "3%",
          }}
        >
          <HStack>
            <StudentImageWrapper />
            <StudentInfoWrapper />
            <CounselingTimeAdmin />
          </HStack>
          <HStack>
            <Button
              onClick={openAcceptModal}
              size="md"
              colorScheme="green"
              marginRight={10}
            >
              승인하기
            </Button>
            <Button onClick={openRefuseModal} size="md" colorScheme="green">
              거절하기
            </Button>
          </HStack>
        </VStack>
      </ChakraProvider>
    );
  });

  return (
    <VStack style={{ width: "100%", paddingBottom: "10rem" }}>
      <Appbar />

      <VStack style={{ width: "85%" }}>
        <PageDescription />
        <StudentApplicationWrapper />
      </VStack>
      <AcceptModal
        isOpen={isAcceptModalOpen}
        onCloseModal={closeAcceptModal}
        id={extractIdFromUrl()}
        name={
          counselorApplicationStore.currentApplication.student.user.realname
        }
      />
      <RefuseModal
        isOpen={isRefuseModalOpen}
        onClose={closeRefuseModal}
        title="거절하기"
      />
    </VStack>
  );
});

export default AdminPersonalApplicationCheckPage;