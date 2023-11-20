import {
  Button,
  HStack,
  Text,
  VStack,
  Stack,
  ChakraProvider,
  Select,
} from "@chakra-ui/react";
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
import { counselorApplicationStore } from "../../dataflow/store/counselor/CounselorApplicationStore"
import { ICounselingApplicationDetail } from "../../dataflow/interface/counselingApplication";
import { observable } from 'mobx';
import { Link } from "react-router-dom";


const counselingTypeMappings: { [key: string]: string } = {
  'personal_1': '검사 해석 상담(검사 후 1회기 해석)',
  'personal_5': '5회기 개인 상담',
  'personal_10': '10회기 개인 상담',
};

const getCounselingType = (type: string) => {
  return counselingTypeMappings[type] || type;
};

function getAppliedAt(inputDateString: string): string {
  const inputDate = new Date(inputDateString);

  if (isNaN(inputDate.getTime())) {
    return 'Invalid Date';
  }

  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedDate;
}


const AdminApplicationCheckPage = observer(() => {

  const [counselType, setCounselType] = useState('');
  const [counselField, setCounselField] = useState('');
  const [desiredDay, setDesiredDay] = useState('');
  const [desiredTime, setDesiredTime] = useState('');


  useEffect(() => {
    counselorApplicationStore.fetchUnprocessedCouselingApplications();
  }, []);

  // "Apply" 버튼 클릭을 처리하는 함수
  const handleApplyFilter = () => {

    // 희망상담 요일, 시간 둘중 하나만 골랐을 때 때 alert 표시
    if ( (!desiredDay && desiredTime) || (desiredDay && !desiredTime)) {
      alert('상담 요일과 날짜로 필터링을 진행할 경우, 두 가지 모두 선택해주세요.');
      return; // 필터링을 진행하지 않음
    }

    // 선택한 값을 사용하여 데이터를 필터링
    console.log('상담 종류:', counselType);
    console.log('상담 분야:', counselField);
    console.log('희망 상담 요일:', desiredDay);
    console.log('희망 상담 시간:', desiredTime);


    counselorApplicationStore.fetchFilteredCouselingApplications(counselType, counselField, desiredDay, desiredTime);
  };

  const PageDescription = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", width: "100%" }}>
        <HStack style={{ alignItems: "flex-end", margin: "1rem" }}>
          <Text fontSize="2xl" fontWeight="700">
            상담 신청서 관리
          </Text>
          <Text fontSize="md">개인 상담 신청서를 조건별로 쉽게 관리하세요</Text>
        </HStack>
      </VStack>
    );
  });

  const FilteringField = observer(() => {
    return (
      <ChakraProvider>
        <VStack
          style={{
            alignItems: "flex-start",
            padding: "2rem",
            width: "25%",
            backgroundColor: "lightgray",
            marginRight: "2%",
          }}
        >
          <Text fontSize="xl" fontWeight="600">
            Filter
          </Text>
          <HStack style={{ alignItems: "flex-start", width: "100%" }}>
            <Button onClick={handleApplyFilter} size="sm" colorScheme="green">
              Apply
            </Button>
            <Button
              onClick={() => console.log("임시")}
              size="sm"
              colorScheme="green"
            >
              Clear
            </Button>
          </HStack>

          <Text marginTop={5} fontSize="l" fontWeight="600">상담 종류</Text>
          <Select value={counselType} onChange={(e) => setCounselType(e.target.value)} placeholder="상담 종류를 선택하세요">
            <option value="personal_1">검사 해석 상담</option>
            <option value="personal_5">5회기 개인상담</option>
            <option value="personal_10">10회기 개인상담</option>
          </Select>

          <Text marginTop={5} fontSize="l" fontWeight="600">상담 분야</Text>
          <Select value={counselField} onChange={(e) => setCounselField(e.target.value)} placeholder="상담 분야를 선택하세요">
            <option value="대인관계">대인관계</option>
            <option value="성격 및 적응">성격 및 적응</option>
            <option value="학업 및 진로">학업 및 진로</option>
            <option value="심리 및 정서">심리 및 정서</option>
            <option value="가족 관계">가족 관계</option>
            <option value="결혼 및 연애">결혼 및 연애</option>
            <option value="종교 및 가치관">종교 및 가치관</option>
          </Select>

          <Text marginTop={5} fontSize="l" fontWeight="600">희망 상담 요일</Text>
          <Select value={desiredDay} onChange={(e) => setDesiredDay(e.target.value)} placeholder="희망 상담 요일을 선택하세요">
            <option value="MON">월</option>
            <option value="TUE">화</option>
            <option value="WED">수</option>
            <option value="THU">목</option>
            <option value="FRI">금</option>
          </Select>

          <Text marginTop={5} fontSize="l" fontWeight="600">희망 상담 시간</Text>
          <Select value={desiredTime} onChange={(e) => setDesiredTime(e.target.value)} placeholder="희망 상담 시간을 선택하세요">
            <option value="1">10:00 - 11:00</option>
            <option value="2">11:00 - 12:00</option>
            <option value="3">13:00 - 14:00</option>
            <option value="4">14:00 - 15:00</option>
            <option value="5">15:00 - 16:00</option>
            <option value="6">16:00 - 17:00</option>
          </Select>
        </VStack>
      </ChakraProvider>
    );
  });

  const CounselingTable = observer(() => {
    return (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {[
                "고유 번호",
                "학생 이름",
                "학생 학번",
                "신청 일시",
                "상담 종류",
                "관리하기",
              ].map((item, index) => {
                return (
                  <Th key={index} bgColor="gray.800" color="white">
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {/* 이 부분에 데이터가 유동적으로 바꾸어야 합니다. */}
            {counselorApplicationStore.counselingApplications.length===0?(
              <Text>신청서가 존재하지 않습니다.</Text>
            ):(
              counselorApplicationStore.counselingApplications.map(application => (
                <Tr bgColor="gray.100" >
                  <Td>{application.id}</Td>
                  <Td>{application.student.user.username}</Td>
                  <Td>{application.student.user.student_number}</Td>
                  <Td>{getAppliedAt(application.applied_at)}</Td>
                  <Td>{getCounselingType(application.counseling_type)}</Td>
                  <Td>
                    <Link to={`/admin/personalApplicationCheck/${application.id}`}>
                      < Button
                        color="white"
                        padding="10%"
                        fontSize="0.7rem"
                        backgroundColor="#041126"
                        variant="link"
                        size="lg"
                      >
                        관리하기
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              )))
            }
          </Tbody >
        </Table >
      </TableContainer >
    );
  });

  return (
    <VStack style={{ width: "100%", paddingBottom: "10rem" }}>
      <Appbar />

      <VStack style={{ width: "90%" }}>
        <PageDescription />
        <HStack align="flex-start" style={{ width: "100%" }}>
          <FilteringField />
          <CounselingTable />
        </HStack>
      </VStack>
    </VStack>
  );
});

export default AdminApplicationCheckPage;
