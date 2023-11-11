import { FC } from "react";
import StudentProfile from "../../../../../StudentProfile";
import StudentInfo from "../../../../../StudentInfo";
import { studentData } from "../../../StudentData";
import { StudentInfoDefault } from "../../../../../../interface";
import { HStack } from "@chakra-ui/react";

type ModalInfoProps = {
  selectedId: string;
};

const ModalInfo: FC<ModalInfoProps> = ({ selectedId }) => {

  return (
    <HStack style={{ justifyContent: "center" }} spacing="2rem">
      <StudentProfile
        selectedStudent={studentData.find((student) => student.id === selectedId) ?? StudentInfoDefault}
      />
      <StudentInfo
        selectedStudent={studentData.find((student) => student.id === selectedId) ?? StudentInfoDefault}
      />
    </HStack>
  );
};

export default ModalInfo;