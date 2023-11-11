import { FC } from "react";
import StudentProfile from "../../../StudentProfile";
import { studentData } from "../StudentData";
import { Flex } from "@chakra-ui/react";

type AdminMainProps = {
  searchName: string;
  setIsMainMode(e: boolean): void;
  setSelectedId(e: string): void;
};

const AdminMain: FC<AdminMainProps> = ({
  searchName,
  setIsMainMode,
  setSelectedId
}) => {
  const onClickProfile = (studentId: string) => {
    setIsMainMode(false);
    setSelectedId(studentId);
  };

  return (
    <Flex
      style={{
        width: "100%",
        minHeight: "30rem",
        backgroundColor: "rgba(41, 41, 41, 0.1)",
        padding: "2rem",
      }}
      flexWrap="wrap"
      gap="2rem"
    >
      {studentData.filter(
        (student) =>
          student.name.includes(searchName)).map((student) => (
            <StudentProfile
              selectedStudent={student}
              onClick={() => onClickProfile(student.id)}
            />
      ))}
    </Flex>
  );
};

export default AdminMain;