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
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
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
import { remote } from "../../dataflow/remote/RemoteSource";

const AdminApplicationCheckPage = observer(() => {
  const [applicationData, setApplicationData] = useState("");
  const [fields, setFields] = useState<(string | number)[]>([]);

  useEffect(() => {
    remote
      .get("counseling/schedule-counselor/")
      .onSuccess((json) => {
        setApplicationData(json);
      })
      .onFailed((data) => {})
      .send();
  });

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
            width: "30%",
            backgroundColor: "lightgray",
            marginRight: "2%",
          }}
        >
          <Text fontSize="xl" fontWeight="600">
            Filter
          </Text>
          <HStack style={{ alignItems: "flex-start", width: "100%" }}>
            <Button
              onClick={() => console.log("임시")}
              size="sm"
              colorScheme="green"
            >
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

          <Text marginTop={5} fontSize="l" fontWeight="600">
            상담 종류
          </Text>
          <Select placeholder="상담 종류를 선택하세요">
            <option value="option1">검사 해석 상담</option>
            <option value="option2">5회기 개인상담</option>
            <option value="option3">10회기 개인상담</option>
          </Select>

          <Text marginTop={5} fontSize="l" fontWeight="600">
            상담 분야
          </Text>
          <Select placeholder="상담 분야를 선택하세요">
            {[
              "대인 관계",
              "성격 및 적응",
              "학업 및 진로",
              "심리 및 정서",
              "가족 관계",
              "결혼 및 연애",
              "종교 및 가치관",
            ].map((item, index) => {
              return (
                <option key={index} value={`option${index + 1}`}>
                  {item}
                </option>
              );
            })}
          </Select>

          <Text marginTop={5} fontSize="l" fontWeight="600">
            희망 상담 요일
          </Text>
          <CheckboxGroup
            colorScheme="green"
            onChange={setFields}
            value={fields}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {["월", "화", "수", "목", "금"].map((item, index) => {
                return (
                  <Checkbox key={index} value={`${index + 1}`}>
                    {item}
                  </Checkbox>
                );
              })}
            </Stack>
          </CheckboxGroup>

          <Text marginTop={5} fontSize="l" fontWeight="600">
            희망 상담 시간
          </Text>
          <Select placeholder="희망 상담 시간을 선택하세요">
            {[10, 11, 13, 14, 15, 16].map((item, index) => {
              return (
                <option key={index} value={`option${index + 1}`}>
                  {item}:00 - {item + 1}:00
                </option>
              );
            })}
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
                "학생 이름",
                "신청 일시",
                "상담 종류",
                "상담 분야",
                "희망 상담 시간",
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
            {/* 예시 데이터 */}
            <Tr bgColor="gray.100">
              <Td>학생1</Td>
              <Td>2023-11-11 10:00 AM</Td>
              <Td>10회기 개인상담</Td>
              <Td>대인 관계</Td>
              <Td>월 14:00 - 15:00</Td>
              <Td>
                {" "}
                <Button
                  color="white"
                  padding="10%"
                  fontSize="0.7rem"
                  backgroundColor="#041126"
                  variant="link"
                  size="lg"
                >
                  관리하기
                </Button>
              </Td>
            </Tr>
            <Tr bgColor="white">
              <Td>학생2</Td>
              <Td>2023-11-12 02:30 PM</Td>
              <Td>10회기 개인상담</Td>
              <Td>대인 관계</Td>
              <Td>화 16:00 - 17:00</Td>
              <Td>
                {" "}
                <Button
                  color="white"
                  padding="10%"
                  fontSize="0.7rem"
                  backgroundColor="#041126"
                  variant="link"
                  size="lg"
                >
                  관리하기
                </Button>
              </Td>
            </Tr>
            {/* 추가 데이터들 */}
          </Tbody>
        </Table>
      </TableContainer>
    );
  });

  return (
    <VStack style={{ width: "100%", paddingBottom: "10rem" }}>
      <Appbar/>

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
