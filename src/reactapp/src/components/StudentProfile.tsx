import { FC, MouseEvent } from "react";
import { Text, VStack } from "@chakra-ui/react";
import IcUserProfile from "../resources/mainpage/ic_user_profile.png";

type StudentProfileProps = {
  studentName: string;
  onClick?(e: MouseEvent<HTMLDivElement>): void;
}

const StudentProfile: FC<StudentProfileProps> = ({
  studentName,
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
      <img
        src={IcUserProfile}
        alt="profile image"
        style={{
          width: "5rem",
          height: "5rem",
        }}
      />
      <Text fontWeight="bold">{studentName} 학생</Text>
    </VStack>
  );
};

export default StudentProfile;