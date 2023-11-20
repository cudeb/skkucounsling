import { FC } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from "@chakra-ui/react";
import { ICounselingSchedule } from "../../dataflow/interface/counseling";

type CounselingScheduleProps = {
  isOpen: boolean;
  onClose(): void;
  date: number;
  counselings: ICounselingSchedule[];
};

const CounselingScheduleModal: FC<CounselingScheduleProps> = ({
  isOpen,
  onClose,
  date,
  counselings,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {Math.floor(date / 100)}/{date % 100}(목) 진행 상담 목록입니다
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack style={{ padding: "1rem" }}>
            {counselings.map((schedule) => (
              <Text>
                {schedule.session_timeslot[3]}:00 -{" "}
                {schedule.counseling?.student &&
                  typeof schedule.counseling?.student === "object" &&
                  schedule.counseling?.student?.user.username}
                학생 개인 상담
              </Text>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CounselingScheduleModal;
