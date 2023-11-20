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
  const [date, setDate] = useState<string>("");

  const onClose = () => {
    if (date === "") {
      alert("날짜를 선택해주세요.");
      return;
    }
    onCloseModal(date, "11");
  };
  useEffect(() => {
    if (isOpen) {
      counselorApprovalStore.fetchSchedule(id);
      console.log(counselorApprovalStore.auto_recommend);
      console.log(counselorApprovalStore.counseling_schedule);
    }
  }, [isOpen, id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"flex-start"}>
            <Text fontSize="xl" fontWeight="600">
              {name} 학생의 개인상담이 다음과 같이 진행됩니다.
            </Text>
            <Text fontSize="smaller" fontWeight="600">
              {" "}
              첫 상담일: {counselorApprovalStore.auto_recommend.date}
            </Text>
            <HStack alignItems={"flex-start"} mt={7}>
              <VStack mr={10}>
                <Text fontSize="xl" fontWeight="600" mb={3}>
                  10/19(목)
                </Text>
                <RadioGroup
                  defaultValue="10"
                  style={{ marginTop: "1rem" }}
                  value={(
                    Number(counselorApprovalStore.auto_recommend.time) + 9
                  ).toString()}
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
              <Calendar
                dateSelectable
                dayDetails={counselorApprovalStore.scheduleMap}
                onClickDate={(year, month, date) => {
                  setDate(numToDateString(year, month, date));
                }}
              />
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AcceptModal;
