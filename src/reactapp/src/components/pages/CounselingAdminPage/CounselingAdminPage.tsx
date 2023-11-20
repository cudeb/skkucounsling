import { useState, useEffect } from "react";
import { toJS } from "mobx";
import Appbar from "../../Appbar";
import AdminMain from "./AdminMode/AdminMain";
import AdminDetail from "./AdminMode/AdminDetail";
import { counselorStore } from "../../../dataflow/store/counselor/CounselorStore";
import { BasicInfoType, ScheduleType, UserInfoDefault } from "./interface";
import { Text, VStack, HStack, Flex, Spacer, InputLeftElement, InputGroup, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const CounselingAdminPage = () => {
  const [isMainMode, setIsMainMode] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [searchName, setSearchName] = useState<string>("");

  const [basicInfo, setBasicInfo] = useState<Array<BasicInfoType>>([]);
  const [schedules, setSchedules] = useState<Array<ScheduleType>>([]);
  const [selectedSchedules, setSelectedSchedules] = useState<
    Array<ScheduleType>
  >([]);

  const readIdParameter = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryId = urlParams.get("id");
    if (queryId) {
      setSelectedId(parseInt(queryId));
      setIsMainMode(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      readIdParameter();
    }, 3000);
  }, []);

  useEffect(() => {
    const fetchInfoData = async () => {
      await counselorStore.fetchInfo(() => {
        setBasicInfo(toJS(counselorStore.basicInfo) || []);
      });
    };

    const fetchScheduleData = async () => {
      await counselorStore.fetchSchedule(() => {
        setSchedules(toJS(counselorStore.schedules) || []);
        let scheduledArray: Array<ScheduleType> = [];
        schedules.forEach((schedule) => {
          if (schedule.counseling?.id === selectedId) {
            scheduledArray.push(schedule);
          }
        });
        setSelectedSchedules(scheduledArray);
      });
    };

    fetchInfoData().then();
    fetchScheduleData().then();
  }, [selectedId]);

  return (
    <VStack style={{ width: "100%" }}>
      <Appbar />
      <VStack
        style={{
          width: "80%",
          alignItems: "flex-start",
          gap: "2rem",
          padding: "1rem 0rem",
        }}
      >
        <Flex style={{ width: "100%" }}>
          <VStack style={{ alignItems: "flex-start", width: "100%" }}>
            <HStack style={{ alignItems: "flex-end"}}>
              <Text fontSize="2xl" fontWeight="700">
                상담 관리
              </Text>
              <Text fontSize="md">학생 별 개인 상담을 간편하게 관리하세요</Text>
            </HStack>
          </VStack>
          <Spacer />
          {isMainMode ? (
            <InputGroup style={{ width: "20rem"}}>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon/>
              </InputLeftElement>
              <Input type='text' placeholder='학생 이름을 입력해주세요'
               onChange={(e) => {
                setSearchName(e.target.value);
              }}/>
            </InputGroup>
          ) : (
            <Text
              style={{ width:"15rem", cursor: "pointer" }}
              fontSize="2xl"
              fontWeight="bold"
              onClick={() => {
                setSelectedId(-1);
                setIsMainMode(true);
              }}
            >
              {"<"} Back
            </Text>
          )}
        </Flex>
        {isMainMode ? (
          <AdminMain
            basicInfo={basicInfo}
            searchName={searchName}
            setIsMainMode={setIsMainMode}
            setSelectedId={setSelectedId}
          />
        ) : (
          <AdminDetail
            studentInfo={
              basicInfo.find((app) => app.id === selectedId)?.student ??
              UserInfoDefault
            }
            selectedSchedules={selectedSchedules}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
      </VStack>
    </VStack>
  );
};

export default CounselingAdminPage;
