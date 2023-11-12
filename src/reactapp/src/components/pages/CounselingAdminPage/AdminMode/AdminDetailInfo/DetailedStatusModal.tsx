import { FC, useState } from "react";
import ModalCaption from "./ModalMode/ModalCaption";
import ModalInfo from "./ModalMode/ModalInfo";
import { studentData } from "../../StudentData";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type DetailedStatusProps = {
  isOpen: boolean;
  onClose(): void;
  selectedId: string;
  selectedIndex: number;
}

const DetailedStatusModal: FC<DetailedStatusProps> = ({
  isOpen,
  onClose,
  selectedId,
  selectedIndex
}) => {
  const [isCaptionMode, setIsCaptionMode] = useState<boolean>(true);
  const [publicCaption, setPublicCaption] = useState<string>("");
  const [privateCaption, setPrivateCaption] = useState<string>("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          {studentData.find((student) => student.id === selectedId)?.name} 학생
          {" "}
          {isCaptionMode ? selectedIndex + 1 + "회차 상담내역" : "신청 정보"}
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          {isCaptionMode ? (
            <ModalCaption
              selectedId={selectedId}
              selectedIndex={selectedIndex}
              publicCaption={publicCaption}
              privateCaption={privateCaption}
              setPublicCaption={setPublicCaption}
              setPrivateCaption={setPrivateCaption}
            />
          ) : (
            <ModalInfo selectedId={selectedId}/>
          )}
        </ModalBody>
        {isCaptionMode ? (
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={() => setIsCaptionMode(false)}>
              신청서 조회
            </Button>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              수정
            </Button>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              확인
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={() => setIsCaptionMode(true)}>
              돌아가기
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DetailedStatusModal;