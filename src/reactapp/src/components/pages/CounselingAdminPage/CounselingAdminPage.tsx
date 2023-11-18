import { useState, useEffect } from "react";
import Appbar from "../../Appbar";
import AdminMain from "./AdminMode/AdminMain";
import AdminDetail from "./AdminMode/AdminDetail";
import { counselorStore } from "../../../dataflow/store/counselor/CounselorStore";
import { Text, VStack, Flex, Spacer } from "@chakra-ui/react";

const CounselingAdminPage = () => {
  const [isMainMode, setIsMainMode] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    counselorStore.fetchInfo();
    counselorStore.fetchSchedule();
  }, []);

  return (
    <VStack style={{ width: "100%" }}>
      <Appbar/>

      <VStack
        style={{
          width: "100%",
          alignItems: "flex-start",
          gap: "2rem",
          padding: "2rem 3rem"
        }}
      >
        <Flex style={{ width: "100%" }}>
          <Text fontSize="2xl">상담 관리 페이지</Text>
          <Spacer/>
          {isMainMode ? (
            <input
              style={{
                width: "15rem",
                padding: "0 1rem",
                border: "1px solid #000000"
              }}
              type="text"
              placeholder="학생 이름을 입력해주세요"
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
          ) : (
            <Text
              style={{ cursor: "pointer" }}
              fontSize="2xl"
              fontWeight="bold"
              onClick={() => setIsMainMode(true)}
            >
              {"<"} Back
            </Text>
          )}
        </Flex>
        {isMainMode ? (
          <AdminMain
            searchName={searchName}
            setIsMainMode={setIsMainMode}
            setSelectedId={setSelectedId}
          />
        ) : (
          <AdminDetail
            selectedId={selectedId}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
      </VStack>
    </VStack>
  );
};

export default CounselingAdminPage;