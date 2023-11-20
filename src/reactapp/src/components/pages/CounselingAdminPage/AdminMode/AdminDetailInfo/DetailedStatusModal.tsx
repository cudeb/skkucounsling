import { FC, useEffect, useState } from "react";
import { toJS } from "mobx";
import ModalCaption from "./ModalMode/ModalCaption";
import ModalInfo from "./ModalMode/ModalInfo";
import { counselorStore } from "../../../../../dataflow/store/counselor/CounselorStore";
import { DetailInfoType, ScheduleType, UserInfoType } from "../../interface";
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
  studentInfo: UserInfoType;
  selectedSchedules: Array<ScheduleType>;
  selectedIndex: number;
}

const DetailedStatusModal: FC<DetailedStatusProps> = ({
  isOpen,
  onClose,
  studentInfo,
  selectedSchedules,
  selectedIndex
}) => {
  const [isCaptionMode, setIsCaptionMode] = useState<boolean>(true);
  const [publicCaption, setPublicCaption] = useState<string>("");
  const [detailInfo, setDetailInfo] = useState<Array<DetailInfoType>>([]);
  const selectedDetail: DetailInfoType | null = detailInfo.find((info) => info.id === selectedSchedules[selectedIndex]?.id) ?? null;

  useEffect(() => {
    const fetchDetailData = async () => {
      await counselorStore.fetchDetail(() => {
        setDetailInfo(toJS(counselorStore.detailInfo));
      })
    };

    fetchDetailData().then();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          {selectedDetail?.student.user.username} 학생
          {" "}
          {isCaptionMode ? selectedIndex + 1 + "회차 상담내역" : "신청 정보"}
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          {isCaptionMode ? (
            <ModalCaption
              selectedSchedules={selectedSchedules}
              appliedAt={selectedDetail?.applied_at.split("T")[0] ?? ""}
              field={selectedDetail?.counseling_preferfields[0].field ?? ""}
              counselingType={selectedDetail?.counseling_type ?? ""}
              selectedIndex={selectedIndex}
              publicCaption={publicCaption}
              setPublicCaption={setPublicCaption}
            />
          ) : (
            <ModalInfo studentInfo={studentInfo} />
          )}
        </ModalBody>
        {isCaptionMode ? (
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={() => setIsCaptionMode(false)}>
              신청서 조회
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