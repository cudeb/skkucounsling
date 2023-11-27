import React from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Calendar from "../Calendar";
import { counselorApprovalStore } from "../../dataflow/store/counselor/CounselorApprovalStore";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button, HStack, Text, VStack, Stack } from "@chakra-ui/react";
import { numToDateString } from "../../dataflow/DateFunc";

interface AcceptModalProps {
  isOpen: boolean;
  onCloseModal: (date: string, timeSlot: string) => void;
  id: number;
  name: string;
}

const AcceptModal: React.FC<AcceptModalProps> = ({
  isOpen,
  onCloseModal,
  id,
  name,
}) => {
  const [cur_year, setCurYear] = useState(0);
  const [cur_month, setCurMonth] = useState(0);
  const [cur_date, setCurDate] = useState(0);
  const [cur_time, setCurTime] = useState<string>("");

  const onClose = () => {
    if (cur_date === 0) {
      alert("날짜를 선택해주세요.");
      return;
    }
    onCloseModal(
      cur_year + "-" + cur_month + "-" + cur_date,
      day_eng[new Date(cur_year, cur_month - 1, cur_date).getDay()] +
        (Number(cur_time) - 9).toString()
    );
  };

  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const day_eng = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  useEffect(() => {
    if (isOpen) {
      counselorApprovalStore.fetchSchedule(id);
    }
  }, [isOpen, id]);

  useEffect(() => {
    setCurYear(
      Number(counselorApprovalStore.auto_recommend.date.split("-")[0])
    );
    setCurMonth(
      Number(counselorApprovalStore.auto_recommend.date.split("-")[1])
    );
    setCurDate(
      Number(counselorApprovalStore.auto_recommend.date.split("-")[2])
    );
    setCurTime(
      (Number(counselorApprovalStore.auto_recommend.time) + 9).toString()
    );
  }, [counselorApprovalStore.auto_recommend]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"flex-start"} padding={"1rem"}>
            <Text fontSize="xl" fontWeight="600">
              {name} 학생의 개인상담이 다음과 같이 진행됩니다.
            </Text>
            <Text fontSize="smaller" fontWeight="600">
              {" "}
              첫 상담일: {cur_year}년 {cur_month}월 {cur_date}일 (
              {day[new Date(cur_year, cur_month - 1, cur_date).getDay()]}){" "}
              {cur_time}시
            </Text>
            <HStack
              width="100%"
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              mt={7}
            >
              <VStack mr={10}>
                <Text fontSize="xl" fontWeight="600" mb={3}>
                  {cur_month}/{cur_date} (
                  {day[new Date(cur_year, cur_month - 1, cur_date).getDay()]})
                </Text>
                <RadioGroup
                  defaultValue="10"
                  style={{ marginTop: "1rem" }}
                  value={cur_time}
                  onChange={setCurTime}
                >
                  <Stack>
                    <Radio colorScheme="green" value="10">
                      10시
                    </Radio>
                    <Radio colorScheme="green" value="11">
                      11시
                    </Radio>
                    <Radio colorScheme="green" value="12">
                      12시
                    </Radio>
                    <Radio colorScheme="green" value="13">
                      13시
                    </Radio>
                    <Radio colorScheme="green" value="14">
                      14시
                    </Radio>
                    <Radio colorScheme="green" value="15">
                      15시
                    </Radio>
                    <Radio colorScheme="green" value="16">
                      16시
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Button colorScheme="green" mt={5} onClick={onClose}>
                  확인
                </Button>
              </VStack>
              <Stack style={{ border: "1px solid #a2a2a2" }}>
                <Calendar
                  dateSelectable
                  clickOnlySelectable
                  // dayDetails={counselorApprovalStore.scheduleMap}
                  initYear={cur_year}
                  initMonth={cur_month}
                  initDate={cur_date}
                  onClickDate={(year, month, date) => {
                    setCurYear(year);
                    setCurMonth(month);
                    setCurDate(date);
                  }}
                />
              </Stack>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AcceptModal;
