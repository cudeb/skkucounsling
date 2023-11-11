import { FC, MouseEvent } from "react";
import { StudentInfoType } from "../interface";
import { Box, Text, VStack } from "@chakra-ui/react";

type StudentProfileProps = {
  selectedStudent: StudentInfoType;
  onClick?(e: MouseEvent<HTMLDivElement>): void;
}

const StudentProfile: FC<StudentProfileProps> = ({
  selectedStudent,
  onClick
}) => {

  return (
    <VStack
      style={{
        width: "10rem",
        height: "10rem",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default"
      }}
      onClick={onClick}
    >
      <Box>{selectedStudent.profileImg}</Box>
      <Text fontWeight="bold">{selectedStudent.name} 학생</Text>
    </VStack>
  );
};

export default StudentProfile;