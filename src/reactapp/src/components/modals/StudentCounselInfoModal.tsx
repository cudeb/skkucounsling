import {
  Button,
  HStack,
  IconButton,
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
import {
  ICounselingSchedule,
  ICounselingStudent,
} from "../../dataflow/interface/counseling";
import { useEffect, useState } from "react";
import { dateToKrLocaleWeekday } from "../../dataflow/DateFunc";
import { CloseIcon } from "@chakra-ui/icons";
import { studentStore } from "../../dataflow/store/student/StudentStore";

const StudentCounselInfoModal = ({
  counsel,
  time,
  isOpen,
  feedback,
  onClose,
  onSave,
}: {
  counsel?: ICounselingSchedule;
  feedback?: string;
  time?: Date;
  isOpen: boolean;
  onSave: (memo: string) => void;
  onClose: () => void;
}) => {
  let [contents, setContents] = useState<string>(feedback || "");

  const saveMemo = () => {
    onSave(contents);
    onClose();
  };

  let [closeBtnOn, setCloseBtnOn] = useState<boolean>(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack
            style={{
              width: "100%",
            }}
          >
            <Text fontSize="lg">상담 기록</Text>
            <Text fontSize="md">상담 내용을 잊지 않도록 기록해보세요.</Text>
            <div style={{ flex: 1 }} />
            <IconButton
              icon={<CloseIcon />}
              variant={"ghost"}
              aria-label="Close"
              onClick={() => {
                setCloseBtnOn(true);
              }}
            />
          </HStack>
        </ModalHeader>

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
              value={contents}
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

      <Modal
        isOpen={closeBtnOn}
        onClose={() => {
          setCloseBtnOn(false);
        }}
        size="sm"
      >
        <ModalContent>
          <ModalHeader />
          <VStack>
            <Text fontSize="xl" fontWeight="600">
              저장하지 않고 나가시겠습니까?
            </Text>
            <HStack>
              <Button
                onClick={() => {
                  setCloseBtnOn(false);
                  onClose();
                }}
              >
                예
              </Button>
              <Button
                onClick={() => {
                  setCloseBtnOn(false);
                }}
              >
                아니오
              </Button>
            </HStack>
          </VStack>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Modal>
  );
};

export default StudentCounselInfoModal;
