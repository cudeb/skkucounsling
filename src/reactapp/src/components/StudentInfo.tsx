import { FC } from "react";
import { UserInfoType } from "./pages/CounselingAdminPage/interface";
import { Text, VStack } from "@chakra-ui/react";

type StudentInfoProps = {
  studentInfo: UserInfoType;
}

const StudentInfo: FC<StudentInfoProps> = ({
  studentInfo,
}) => {
  return (
    <VStack
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        alignItems: "flex-start",
        padding: "1rem"
      }}
    >
      <Text fontSize="sm" fontWeight="bold">상담 학생 정보</Text>
      <Text fontSize="sm">학번 : {studentInfo.user.student_number}</Text>
      <Text fontSize="sm">학년 : {studentInfo.user.id % 4 + 1}</Text>
      <Text fontSize="sm">생년월일 : {studentInfo.user.birth}</Text>
      <Text fontSize="sm">연락처 : {studentInfo.user.phone_number}</Text>
      <Text fontSize="sm">이메일 : {studentInfo.user.email}</Text>
    </VStack>
  );
};

export default StudentInfo;