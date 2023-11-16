import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ICounselingStudent } from "../../dataflow/interface/counseling";
import { useState } from "react";
import { dateToKrLocaleWeekday } from "../../dataflow/DateFunc";

const StudentCounselInfoModal = ({
  counsel,
  time,
  isOpen,
  onClose,
  onSave,
}: {
  counsel?: ICounselingStudent;
  time?: Date;
  isOpen: boolean;
  onSave: (memo: string) => void;
  onClose: () => void;
}) => {
  let [contents, setContents] = useState<string>("");

  const saveMemo = () => {
    onSave(contents);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="lg">상담 기록</Text>
          <Text fontSize="md">상담 내용을 잊지 않도록 기록해보세요.</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            style={{
              alignItems: "flex-start",
            }}
          >
            <Text fontSize="md" fontWeight="600">
              상담 일시 : {time ? dateToKrLocaleWeekday(time) : "미정"}
            </Text>

            <Text fontSize="md" fontWeight="600">
              기록사항
            </Text>

            <Textarea
              style={{
                width: "100%",
                height: "12rem",
                backgroundColor: "#ebebeb",
                borderRadius: "1rem",
              }}
              onChange={(e) => setContents(e.target.value)}
            ></Textarea>

            <Text fontSize="md" fontWeight="600">
              상담사 분의 피드백
            </Text>

            <Text
              style={{
                width: "100%",
                height: "12rem",
                backgroundColor: "#ebebeb",
                borderRadius: "1rem",
              }}
            ></Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" size="lg" onClick={() => saveMemo()}>
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StudentCounselInfoModal;
