import { Button, HStack, Text, VStack, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Appbar from "../Appbar";
import Calendar from "../Calendar";
import { ListItem, UnorderedList, } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Input,InputLeftAddon, InputGroup } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { useEffect,useState,useRef } from "react";
import { saveAs } from 'file-saver';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useNavigate } from "react-router";
import { studentApplyStore } from "../../dataflow/store";
import { APPLY_FIELD } from "../../dataflow/store/studentApply/StudentApplyStore";

const StudentApplyPage = observer(() => {
  let today = new Date();
  const day=['일','월','화','수','목','금','토']

  const [concent, setConcent] = useState(false);
  const [type, setType] = useState('personal_1');
  const [fields, setFields] = useState<(string|number)[]>([]);
  const [file, setFile] = useState<File>(); 
  const [times, setTimes] = useState<(string|number)[]>([]);
  const [testYear, setTestYear] = useState(today.getFullYear());
  const [testMonth, setTestMonth] = useState(today.getMonth() + 1);
  const [testDate, setTestDate] = useState(today.getDate());
  const [testTime, setTestTime] = useState('10');
  const [appliedAt, setAppliedAt] = useState<Date>(today);
  const [expectedDate, setExpectedDate] = useState<Date>(today);

  // 모달 관련
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { isOpen:isModalOpen, onOpen:onModalOpen, onClose:onModalClose } = useDisclosure();
  const cancelModalRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (studentApplyStore.isApplySuccess) {
      // 성공 시 신청 완료 모달
      onModalOpen();
    }

    if (studentApplyStore.applyErrorMsg) {
      alert(studentApplyStore.applyErrorMsg);
      studentApplyStore.applyErrorMsg = "";
    }
  }, [studentApplyStore.isApplySuccess, studentApplyStore.applyErrorMsg]);

  const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if(files === undefined) {
      return ;
    }
    setFile(files);
  }

  // 신청하기 버튼 클릭 -> form 데이터 검증 후 재확인 모달 열기
  const ClickApply = () => {
    let f=document.querySelector("#application");
    if(!concent) alert("개인정보 수집·이용과 민감정보 처리에 동의가 필요합니다.");
    else if(!['personal_1','personal_5','personal_10'].includes(type)) alert("상담 종류를 선택해주세요.");
    else if(fields.length<1) alert("상담 분야를 하나 이상 선택해주세요.");
    else if(times.length<1) alert("희망 상담 시간을 하나 이상 선택해주세요.");
    else if(!['10','11','12','13','14','15','16'].includes(testTime)) alert("희망 심리 검사 시간을 선택해주세요.");
    else if(file==null) alert("신청서를 업로드해주세요.");
    else onOpen();
  };

  
  // 신청서 제출 api 호출
  const SendApplication = () => {
    let now = new Date();
    let applited_at=now.toString()+'-'+('0'+now).slice(-2)+'-'+('0'+now).slice(-2)
    setAppliedAt(now);
    
    let testdate=testYear.toString()+'-'+('0'+testMonth).slice(-2)+'-'+('0'+testDate).slice(-2)

    studentApplyStore.updateFormField(APPLY_FIELD.APPLIED_AT, applited_at);
    studentApplyStore.updateFormField(APPLY_FIELD.APPLICATION, file);
    studentApplyStore.updateFormField(APPLY_FIELD.COUNSELING_TYPE, type);
    studentApplyStore.updateFormField(APPLY_FIELD.TEST_DATE,testdate);
    studentApplyStore.updateFormField(APPLY_FIELD.TEST_TIMESLOT, testTime);
    studentApplyStore.updateFormField(APPLY_FIELD.PREFER_TIMESLOT, times);
    studentApplyStore.updateFormField(APPLY_FIELD.PREFER_FIELDS, fields);

    studentApplyStore.apply();
  };

  // 상담 예정일 구하기
  function isExpectedDay(date:Date) { // expected_date의 요일이 times에 있는지 확인하는 함수
    const dayIndex = date.getDay();
    const dayAbbreviation = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex];
    return times.some(time => typeof time === 'string' && time.includes(dayAbbreviation));
  }
  const getExpectedDate=()=>{
    let expected_date=new Date(today);
    expected_date.setDate(expected_date.getDate()+14);
    while (!isExpectedDay(expected_date)) {
      expected_date.setDate(expected_date.getDate() + 1);
    }
    setExpectedDate(expected_date);
  }

  function getFormattedCounselingType(personal: string) {
    switch (personal) {
      case 'personal_1':
        return '검사 해석 상담(검사 후 1회기 해석)';
      case 'personal_5':
        return '5회기 개인 상담';
      case 'personal_10':
        return '10회기 개인 상담';
      default:
        return '알 수 없는 상담 종류';
    }
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
    <VStack style={{ alignItems: "flex-start", width:"100%"}}>
      <HStack style={{ alignItems: "flex-end", margin: "1rem" }}>
        <Text fontSize="2xl" fontWeight="700">
          개인 상담 신청
        </Text>
        <Text fontSize="md">개인 상담 신청서를 작성하고 제출합니다</Text>
      </HStack>
    </VStack>
    );
  });

  const ConsentChecker = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
        <Text fontSize="xl" fontWeight="600">
        개인정보 수집･이용 동의
        </Text>
        <Text style={{ textAlign: "start"}} fontSize="md">
          카운슬링센터에서는 학생상담 서비스를 제공하는데 필요한 개인정보를 수집·이용함에 있어 아래의 내용으로 동의를 받고 있습니다.
        </Text>

        <Text style={{ textAlign: "start", marginLeft:"1rem", marginTop:"1rem" }} fontSize="md">
          개인정보 수집･이용 내역<br/>
        </Text>
        <UnorderedList style={{ textAlign: "start", marginLeft:"2rem"}} fontSize="md">
          <ListItem>수집·이용 목적 : 학생 심리상담 지원</ListItem>
          <ListItem>수집 항목 : 이름, 나이(생년월일), 성별, 소속, 학번, 연락처, 주소, 가족사항 등 
          상담신청서 기재사항</ListItem>
          <ListItem>보유기간 : 5년 (※ 향후 다시 카운슬링센터에 방문할 경우, 효과적인 상담진행 및 학생의 편의를 위함이며, 보유기간 이후 개인정보는 모두 파기)</ListItem>
          <ListItem>귀하는 위 개인정보 수집·이용 동의에 거부할 권리가 있습니다. 단, 동의를 거부할 경우, 원활한 상담에 제한을 받을 수 있습니다.</ListItem>
        </UnorderedList>

        <Text style={{ textAlign: "start", marginLeft:"1rem", marginTop:"1rem" }} fontSize="md">
          민감정보 처리 내역<br/>
        </Text>
        <UnorderedList style={{ textAlign: "start", marginLeft:"2rem"}} fontSize="md">
          <ListItem>처리 목적 : 학생 심리상담 지원</ListItem>
          <ListItem>개인정보 수집항목 : 건강여부, 상담경험, 종교 등</ListItem>
          <ListItem>보유기간 : 5년 (※ 향후 다시 카운슬링센터에 방문할 경우, 효과적인 상담진행 및 학생의 편의를 위함이며, 보유기간 이후 개인정보는 모두 파기)</ListItem>
          <ListItem>귀하는 위 개인정보 수집·이용 동의에 거부할 권리가 있습니다. 단, 동의를 거부할 경우, 원활한 상담에 제한을 받을 수 있습니다.</ListItem>
        </UnorderedList>

        <Checkbox id="concent_checker" style={{marginTop:"1rem" }} colorScheme='green' onChange={(e) => setConcent(e.target.checked)} isChecked={concent}>위 개인정보 수집·이용과 민감정보 처리에 동의합니다</Checkbox>
      </VStack>
    );
  });

  const CounselingType = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
        <Text fontSize="xl" fontWeight="600">상담 종류</Text>
        <Text style={{ textAlign: "start"}} fontSize="md">
          센터에서 받고 싶은 상담 종류에 체크해주세요.
        </Text>
        <RadioGroup id="counseling_type" style={{ margin: "1rem" }} onChange={setType} value={type}>
          <Stack>
            <Radio colorScheme='green' value='personal_1'>검사 해석 상담(검사 후 1회기 해석)</Radio>
            <Radio colorScheme='green' value='personal_5'>5회기 개인 상담</Radio>
            <Radio colorScheme='green' value='personal_10'>10회기 개인 상담</Radio>
          </Stack>
        </RadioGroup>
      </VStack>
    );
  });

  const CounselingField = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
        <Text fontSize="xl" fontWeight="600">상담 분야</Text>
        <Text style={{ textAlign: "start"}} fontSize="md">
          아래의 항목 중에서 상담하기 원하는 부분에만 표시해주세요.
        </Text>
        <CheckboxGroup colorScheme='green' onChange={setFields} value={fields}>
          <Stack spacing={[1, 5]} direction={['column', 'row']} style={{ margin: "1rem" }}>
            <Checkbox value='대인관계'>대인관계</Checkbox>
            <Checkbox value='성격 및 적응'>성격 및 적응</Checkbox>
            <Checkbox value='학업 및 진로'>학업 및 진로</Checkbox>
            <Checkbox value='심리 및 정서'>심리 및 정서</Checkbox>
            <Checkbox value='가족 관계'>가족 관계</Checkbox>
            <Checkbox value='결혼 및 연애'>결혼 및 연애</Checkbox>
            <Checkbox value='종교 및 가치관'>종교 및 가치관</Checkbox>
          </Stack>
        </CheckboxGroup>
      </VStack>
    );
  });


  const CounselingTime = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
        <Text fontSize="xl" fontWeight="600">희망 상담 시간</Text>
        <Text style={{ textAlign: "start"}} fontSize="md">
          상담 가능한 시간대에 표시해주세요.
        </Text>
        <CheckboxGroup colorScheme='green' onChange={setTimes} value={times}>
        <TableContainer style={{width:"100%"}}>
          <Table colorScheme="gray" style={{width:"60%",margin:"1rem"}} size='sm'>
            <Thead>
              <Tr style={{backgroundColor:"#D9D9D9"}}>
                <Th style={{width:"15%",textAlign: "center"}}>시간\요일</Th>
                <Th style={{textAlign: "center"}}>월</Th>
                <Th style={{textAlign: "center"}}>화</Th>
                <Th style={{textAlign: "center"}}>수</Th>
                <Th style={{textAlign: "center"}}>목</Th>
                <Th style={{textAlign: "center"}}>금</Th>
              </Tr>
            </Thead>
            <Tbody>
              {[10, 11, 13, 14, 15, 16].map((value, idx1) => {
              return <Tr>
                        <Td style={{backgroundColor:"#D9D9D9"}}>{value}:00~{value+1}:00</Td>
                        {['MON','TUE','WED','THU',"FRI"].map((day, idx2) =>{
                          let val=day+(idx1+1).toString();
                          return <Td style={{textAlign: "center"}}><Checkbox value={val}/></Td>;
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

  const FormUploader = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
        <Text fontSize="xl" fontWeight="600">신청서 업로드</Text>
        <Text style={{ textAlign: "start"}} fontSize="md">
          신청서 양식 다운로드 후 신청서를 작성하여 업로드해주세요.<br/>
          * 한컴오피스 한글(.hwp) 및 MW오피스 워드용(.docx) 선택하여 작성해주세요.
        </Text>
        <HStack style={{ alignItems: "center", backgroundColor:"white"}}>
          <Button 
          onClick={() => handleDownload('../../resources/application/Counseling_Sincheong_File.docx','Counseling_Sincheong_File.docx')} 
          size='sm' leftIcon={<DownloadIcon />} colorScheme="green">신청서 양식 다운로드(.hwp)</Button>
          <Button 
          onClick={() => handleDownload('../../resources/application/Counseling_Sincheong_File.hwp','Counseling_Sincheong_File.hwp')} 
          size='sm' leftIcon={<DownloadIcon />} colorScheme="green">신청서 양식 다운로드(.docx)</Button>
        </HStack>
        
        <label htmlFor="application" style={{width:"90%", border: "solid 1px gray", borderRadius: "7px"}}>
          <InputGroup>
            <InputLeftAddon children='파일 찾기' />
            <Input type='text' disabled value={file?.name} />
          </InputGroup>
        </label>
        <input style={{opacity:0}} type="file" id="application" accept=".docx, .hwp" onChange={fileUploadHandler}/>
      </VStack>
    );
  });

  const SelectSchedule = observer(() => {
    return (
      <VStack style={{ alignItems: "flex-start", padding: "2rem", width:"100%"}}>
        <Text fontSize="xl" fontWeight="600">희망 심리 검사 시간</Text>
        <Text style={{ textAlign: "start"}} fontSize="md">
          상담에 앞서 심리 검사를 진행합니다. 검사 소요 시간은 개인마다 상이하며 한 시간 이상 여유를 두는 것을 추천합니다.
        </Text>

        <HStack style={{ width:"100%", justifyContent:"space-between", alignItems:"flex-start", padding:"2rem"}}>
          <VStack>
            <Text fontSize="lg">
              {testYear}/{testMonth}/{testDate}({day[new Date(testYear,testMonth-1,testDate).getDay()]})
            </Text>
            <RadioGroup defaultValue='10' style={{marginTop: "1rem"}} onChange={setTestTime} value={testTime}>
              <Stack>
                <Radio colorScheme='green' value='10'>10시</Radio>
                <Radio colorScheme='green' value='11'>11시</Radio>
                <Radio colorScheme='green' value='12'>12시</Radio>
                <Radio colorScheme='green' value='13'>13시</Radio>
                <Radio colorScheme='green' value='14'>14시</Radio>
                <Radio colorScheme='green' value='15'>15시</Radio>
                <Radio colorScheme='green' value='16'>16시</Radio>
              </Stack>
            </RadioGroup>
          </VStack>
          <Stack style={{border: "1px solid #a2a2a2"}}>
          <Calendar
            dateSelectable
            initYear={testYear}
            initMonth={testMonth}
            initDate={testDate}
            onClickDate={(year, month, date) => { 
              setTestYear(year);
              setTestMonth(month);
              setTestDate(date);
            }}
          />
          </Stack>
        </HStack>
      </VStack>
    );
  });

  return (
    <VStack style={{width: "100%", paddingBottom:"10rem"}}>
      <Appbar>
        <Button color="white" variant="link" size="lg">
          HOME
        </Button>
        <Button color="white" variant="link" size="lg">
          상담 신청
        </Button>
      </Appbar>

      <VStack style={{ width: "75%"}}>
        <PageDescription/>
        <ConsentChecker/>
        <CounselingType/>
        <CounselingField/>
        <CounselingTime/>
        <FormUploader/>
        <SelectSchedule/>    

        <Stack style={{margin:"2rem", width:"25%"}} >
          <Button colorScheme="green" size="lg" onClick={()=>ClickApply()}>
            신청하기
          </Button>
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  개인 상담을 신청하시겠습니까?
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    취소
                  </Button>
                  <Button colorScheme='green' onClick={()=>{onClose();getExpectedDate();SendApplication();}} ml={3}>
                    신청
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Stack>    
      </VStack>

      <AlertDialog isOpen={isModalOpen} leastDestructiveRef={cancelModalRef} onClose={onModalClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              개인 상담 신청이 완료되었습니다
            </AlertDialogHeader>

            <AlertDialogBody>
              신청일: {appliedAt?.getFullYear()}년 {appliedAt?.getMonth()+1}월 {appliedAt?.getDate()}일 ({day[appliedAt.getDay()]})<br/>
              상담 종류: {getFormattedCounselingType(type)}<br/>
              심리 검사일: {testYear}년 {testMonth}월 {testDate}일 ({day[new Date(testYear,testMonth-1,testDate).getDay()]}) {testTime}시 <br/>
              상담 예정일: {expectedDate?.getFullYear()}년 {expectedDate?.getMonth()+1}월 {expectedDate?.getDate()}일 ({day[expectedDate.getDay()]})<br/>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={()=>{onModalClose();navigate("/student/home");}}>
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
});

export default StudentApplyPage;
