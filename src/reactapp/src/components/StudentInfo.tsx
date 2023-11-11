import { FC } from "react";
import { StudentInfoType } from "../interface";
import { Text, VStack } from "@chakra-ui/react";

type StudentInfoProps = {
  selectedStudent: StudentInfoType
}

const StudentInfo: FC<StudentInfoProps> = ({
  selectedStudent
}) => {

  return (
    <VStack
      style={{
        width: "15rem",
        backgroundColor: "#FFFFFF",
        alignItems: "flex-start",
        padding: "1rem"
      }}
    >
      <Text fontWeight="bold">상담 학생 정보</Text>
      <Text>학번 : {selectedStudent.studentId}</Text>
      <Text>학년 : {selectedStudent.schoolYear}</Text>
      <Text>이메일 : {selectedStudent.email}</Text>
      <Text>생년월일 : {selectedStudent.dateOfBirth}</Text>
      <Text>연락처 : {selectedStudent.phoneNumber}</Text>
    </VStack>
  );
};

export default StudentInfo;