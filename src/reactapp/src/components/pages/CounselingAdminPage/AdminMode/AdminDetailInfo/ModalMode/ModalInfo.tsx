import { FC } from "react";
import StudentProfile from "../../../../../StudentProfile";
import StudentInfo from "../../../../../StudentInfo";
import { UserInfoType } from "../../../interface";
import { HStack } from "@chakra-ui/react";

type ModalInfoProps = {
  studentInfo: UserInfoType;
};

const ModalInfo: FC<ModalInfoProps> = ({ studentInfo }) => {

  return (
    <HStack style={{ justifyContent: "center" }} spacing="2rem">
      <StudentProfile studentName={studentInfo.user.username ?? ""} />
      <StudentInfo studentInfo={studentInfo} />
    </HStack>
  );
};

export default ModalInfo;