import { FC } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text
} from "@chakra-ui/react";

type CounselingScheduleProps = {
  isOpen: boolean;
  onClose(): void;
  date: number;
}

const CounselingScheduleModal: FC<CounselingScheduleProps> = ({
  isOpen,
  onClose,
  date
}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          {date}/{date}(목) 진행 상담 목록입니다
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <VStack style={{ padding: "1rem" }}>
            {[
              {time: 11, student: "김율전", type: "10회기"},
              {time: 11, student: "김율전", type: "10회기"},
              {time: 11, student: "김율전", type: "10회기"},
            ].map((schedule) => (
              <Text>{schedule.time}:00 - {schedule.student} 학생 {schedule.type} 개인 상담</Text>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CounselingScheduleModal;