import { FC } from "react";
import StudentProfile from "../../../StudentProfile";
import StudentInfo from "../../../StudentInfo";
import StudentTable from "./AdminDetailInfo/StudentTable";
import FeedbackTable from "./AdminDetailInfo/FeedbackTable";
import { studentData } from "../StudentData";
import { StudentInfoDefault } from "../../../../interface";
import { HStack, VStack } from "@chakra-ui/react";

type AdminDetailProps = {
  selectedId: string;
  selectedIndex: number;
  setSelectedIndex(e: number): void;
}

const AdminDetail: FC<AdminDetailProps> = ({
  selectedId,
  selectedIndex,
  setSelectedIndex
}) => {

  return (
    <HStack
      width="100%"
      gap="2rem"
      justify="center"
    >
      <VStack
        style={{
          height: "30rem",
          backgroundColor: "rgba(41, 41, 41, 0.1)",
          padding: "2rem"
        }}
        spacing="2rem"
      >
        <StudentProfile
          selectedStudent={studentData.find((student) => student.id === selectedId) ?? StudentInfoDefault}
        />
        <StudentInfo
          selectedStudent={studentData.find((student) => student.id === selectedId) ?? StudentInfoDefault}
        />
      </VStack>
      <VStack
        style={{
          height: "30rem",
          backgroundColor: "rgba(41, 41, 41, 0.1)",
          padding: "1rem"
        }}
        spacing="10rem"
      >
        <StudentTable
          selectedId={selectedId}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </VStack>
      <VStack
        style={{
          height: "30rem",
          backgroundColor: "rgba(41, 41, 41, 0.1)",
          padding: "1rem"
        }}
        spacing="10rem"
      >
        <FeedbackTable selectedId={selectedId} />
      </VStack>
    </HStack>
  );
};

export default AdminDetail;