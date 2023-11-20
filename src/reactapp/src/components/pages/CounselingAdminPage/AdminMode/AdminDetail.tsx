import { FC } from "react";
import StudentProfile from "../../../StudentProfile";
import StudentInfo from "../../../StudentInfo";
import StudentTable from "./AdminDetailInfo/StudentTable";
import FeedbackTable from "./AdminDetailInfo/FeedbackTable";
import { ScheduleType, UserInfoType, UserInfoDefault } from "../interface";
import { HStack, VStack } from "@chakra-ui/react";

type AdminDetailProps = {
  studentInfo: UserInfoType;
  selectedSchedules: Array<ScheduleType>;
  selectedIndex: number;
  setSelectedIndex(e: number): void;
};

const AdminDetail: FC<AdminDetailProps> = ({
  studentInfo,
  selectedSchedules,
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <HStack width="100%" gap="2rem" justify="center">
      <VStack
        style={{
          height: "30rem",
          backgroundColor: "rgba(41, 41, 41, 0.1)",
          padding: "2rem",
        }}
        spacing="2rem"
      >
        <StudentProfile studentName={studentInfo.user.username ?? ""} />
        <StudentInfo studentInfo={studentInfo ?? UserInfoDefault} />
      </VStack>
      <VStack
        style={{
          height: "30rem",
          backgroundColor: "rgba(41, 41, 41, 0.1)",
          padding: "1rem",
        }}
        spacing="10rem"
      >
        <StudentTable
          studentInfo={studentInfo ?? UserInfoDefault}
          selectedSchedules={selectedSchedules}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </VStack>
      <VStack
        style={{
          height: "30rem",
          backgroundColor: "rgba(41, 41, 41, 0.1)",
          padding: "1rem",
          flex: 1,
        }}
        spacing="10rem"
      >
        <FeedbackTable selectedSchedules={selectedSchedules} />
      </VStack>
    </HStack>
  );
};

export default AdminDetail;
