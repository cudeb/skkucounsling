import { Button, Text, VStack } from "@chakra-ui/react";
import EmailIcon from "../../resources/sign/icon_email.png";
import { useNavigate } from "react-router";
const SignupDonePage = () => {
  const email = "email.skku";
  const navigation = useNavigate();
  return (
    <VStack
      style={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text fontSize="3xl" as="b">
        회원가입 완료
      </Text>

      <img
        src={EmailIcon}
        alt=""
        style={{
          width: "10rem",
          height: "10rem",
        }}
      />

      <Text fontSize="xl" fontWeight="500">
        {email}로<br />
        이메일을 보냈어요!
      </Text>

      <Button
        bgColor="#156308"
        colorScheme="green"
        style={{ width: "20rem" }}
        onClick={() => {
          navigation("/");
        }}
        size="lg"
      >
        메인화면
      </Button>
    </VStack>
  );
};

export default SignupDonePage;
