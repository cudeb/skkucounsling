import { FC } from "react";
import StudentProfile from "../../../StudentProfile";
import { BasicInfoType } from "../interface";
import { Flex } from "@chakra-ui/react";

type AdminMainProps = {
  basicInfo: Array<BasicInfoType>;
  searchName: string;
  setIsMainMode(e: boolean): void;
  setSelectedId(e: number): void;
};

const AdminMain: FC<AdminMainProps> = ({
  basicInfo,
  searchName,
  setIsMainMode,
  setSelectedId
}) => {
  const onClickProfile = (studentId: number) => {
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
      {basicInfo.filter((app) =>
        app.student.user.username.includes(searchName)).map((app, index) => (
          <StudentProfile
            key={index}
            studentName={app.student.user.username}
            onClick={() => onClickProfile(app.id)}
          />
      ))}
    </Flex>
  );
};

export default AdminMain;