import { Button, HStack, Text, VStack, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Appbar from "../Appbar";
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { studentStore } from "../../dataflow/store/studentApply/StudentStore";
import { useNavigate } from "react-router";

const StudentApplyPage = observer(() => {
  const day = ['일', '월', '화', '수', '목', '금', '토']

  const [type, setType] = useState('personal_1');
  const [fields, setFields] = useState<(string | number)[]>([]);
  const [file, setFile] = useState("");
  const [times, setTimes] = useState<(string | number)[]>([]);
  const [testTime, setTestTime] = useState('10');
  const [testYear, setTestYear] = useState("");
  const [testMonth, setTestMonth] = useState("");
  const [testDate, setTestDate] = useState("");
  const [appliedAt, setAppliedAt] = useState<Date>(new Date());
  const [expectedDate, setExpectedDate] = useState<Date>(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    studentStore.fetchApplication();
  }, []);


  useEffect(() => {
    if (studentStore.applicationExist === 1) {
      setAppliedAt(new Date(studentStore.application.applied_at));
      setType(studentStore.application.counseling_type);

      let fields_arr: Array<string> = [];
      for (const f of studentStore.application.counseling_preferfields) {
        fields_arr.push(f.field);
      }
      setFields(fields_arr);

      let timeslots: Array<string> = [];
      for (const t of studentStore.application.counseling_prefertimeslots) {
        timeslots.push(t.timeslot);
      }
      setTimes(timeslots);
      setFile(studentStore.application.application_file);
      setTestTime(studentStore.application.test_timeslot);
      let testdate = studentStore.application.test_date.split('-');
      setTestYear(testdate[0]);
      setTestMonth(testdate[1]);
      setTestDate(testdate[2]);
    }
    else if (studentStore.applicationExist === 0) {
      alert("개인 상담 신청 내역이 없습니다.");
      navigate("/student/home");
    }
  }, [studentStore.applicationExist]);

  useEffect(() => {
    getExpectedDate();
  }, [times]);

  // 상담 예정일 구하기
  function isExpectedDay(date: Date) { // expected_date의 요일이 times에 있는지 확인하는 함수
    const dayIndex = date.getDay();
    const dayAbbreviation = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex];
    return times.some(time => typeof time === 'string' && time.includes(dayAbbreviation));
  }
  function getExpectedDate() {
    let expected_date = new Date(appliedAt);
    expected_date.setDate(expected_date.getDate() + 14);

    let safetyCounter = 0; // 안전을 위한 카운터 추가
    while (!isExpectedDay(expected_date) && safetyCounter < 50) {
      expected_date.setDate(expected_date.getDate() + 1);
      safetyCounter++;
    }

    if (safetyCounter === 50) {
      console.log("Safety counter reached. Breaking out of the loop.");
    }

    setExpectedDate(expected_date);
  }

  // 신청서 양식 다운로드
  const handleDownload = (path: string, saveName: string) => {
    // 파일을 읽어오는 동기 함수
    const loadFile = (url: string) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send();
      return xhr.response;
    };

    // docx 파일 읽기
    const docxContent = loadFile(path);

    // Blob으로 변환
    const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    // 다운로드
    saveAs(blob, saveName);
  };

  const PageDescription = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", width: "100%" }}>
        <HStack style={{ alignItems: "flex-end", margin: "1rem" }}>
          <Text fontSize="2xl" fontWeight="700">
            개인 상담 신청 내역 확인
          </Text>
          <Text fontSize="md">개인 상담 신청 내역을 확인합니다</Text>
        </HStack>
      </VStack>
    );
  });

  const ExpectedDate = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width: "100%" }}>
        <Text fontSize="xl" fontWeight="600">상담 분야</Text>
        <Text fontSize="md" fontWeight="400" textAlign={"left"}>
          신청일: {appliedAt?.getFullYear()}년 {appliedAt?.getMonth() + 1}월 {appliedAt?.getDate()}일 ({day[appliedAt.getDay()]})
        </Text>
        <Text fontSize="md" fontWeight="400" textAlign={"left"}>
          심리 검사일: {testYear}년 {testMonth}월 {testDate}일 ({day[new Date(Number(testYear), Number(testMonth) - 1, Number(testDate)).getDay()]}) {testTime}시
        </Text>
        <Text fontSize="md" fontWeight="400" textAlign={"left"}>
          상담 예정일: {expectedDate?.getFullYear()}년 {expectedDate?.getMonth() + 1}월 {expectedDate?.getDate()}일 ({day[expectedDate.getDay()]})
        </Text>
        <Text fontSize="sm" fontWeight="400" textAlign={"left"}>
          (*상담 예정일은 실제와 다를 수 있습니다. 심리 상담 후 상담일이 확정됩니다.)
        </Text>
      </VStack>
    );
  });


  const CounselingType = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width: "100%" }}>
        <Text fontSize="xl" fontWeight="600">상담 종류</Text>
        <RadioGroup id="counseling_type" style={{ margin: "1rem" }} onChange={setType} value={type}>
          <Stack>
            <Radio colorScheme='green' value='personal_1' isDisabled>검사 해석 상담(검사 후 1회기 해석)</Radio>
            <Radio colorScheme='green' value='personal_5' isDisabled>5회기 개인 상담</Radio>
            <Radio colorScheme='green' value='personal_10' isDisabled>10회기 개인 상담</Radio>
          </Stack>
        </RadioGroup>
      </VStack>
    );
  });

  const CounselingField = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width: "100%" }}>
        <Text fontSize="xl" fontWeight="600">상담 분야</Text>
        <CheckboxGroup colorScheme='green' value={fields}>
          <Stack spacing={[1, 5]} direction={['column', 'row']} style={{ margin: "1rem" }}>
            <Checkbox value='대인관계' disabled>대인관계</Checkbox>
            <Checkbox value='성격 및 적응' disabled>성격 및 적응</Checkbox>
            <Checkbox value='학업 및 진로' disabled>학업 및 진로</Checkbox>
            <Checkbox value='심리 및 정서' disabled>심리 및 정서</Checkbox>
            <Checkbox value='가족 관계' disabled>가족 관계</Checkbox>
            <Checkbox value='결혼 및 연애' disabled>결혼 및 연애</Checkbox>
            <Checkbox value='종교 및 가치관' disabled>종교 및 가치관</Checkbox>
          </Stack>
        </CheckboxGroup>
      </VStack>
    );
  });


  const CounselingTime = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width: "100%" }}>
        <Text fontSize="xl" fontWeight="600">희망 상담 시간</Text>
        <CheckboxGroup colorScheme='green' value={times}>
          <TableContainer style={{ width: "100%" }}>
            <Table colorScheme="gray" style={{ width: "60%", margin: "1rem" }} size='sm'>
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
                {[10, 11, 13, 14, 15, 16].map((value, idx1) => {
                  return <Tr>
                    <Td style={{ backgroundColor: "#D9D9D9" }}>{value}:00~{value + 1}:00</Td>
                    {['MON', 'TUE', 'WED', 'THU', "FRI"].map((day, idx2) => {
                      let val = day + (idx1 + 1).toString();
                      return <Td style={{ textAlign: "center" }}><Checkbox value={val} disabled /></Td>;
                    })}
                  </Tr>
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CheckboxGroup>
      </VStack>
    );
  });


  const FormDownloader = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width: "100%" }}>
        <Text fontSize="xl" fontWeight="600">제출한 신청서 다운로드</Text>
        <Button
          onClick={() => handleDownload('../../../../djangoapp/' + file, file)}
          size='sm' leftIcon={<DownloadIcon />} colorScheme="green" style={{ margin: "1rem" }}>신청서 다운로드
        </Button>
      </VStack>
    );
  });

  return (
    <VStack style={{ width: "100%", paddingBottom: "10rem" }}>
      <Appbar />

      <VStack style={{ width: "75%" }}>
        <PageDescription />
        <ExpectedDate />
        <CounselingType />
        <CounselingField />
        <CounselingTime />
        <FormDownloader />
      </VStack>
    </VStack>
  );
});

export default StudentApplyPage;