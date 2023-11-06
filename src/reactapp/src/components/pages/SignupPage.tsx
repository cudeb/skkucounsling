import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const SignupPage = observer(() => {
  return (
    <VStack
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VStack
        style={{
          width: "24rem",
        }}
      >
        <Text
          fontSize="3xl"
          style={{
            height: "3rem",
          }}
        >
          회원가입
        </Text>
        <Input fontSize="sm" placeholder="이름" />
        <Input fontSize="sm" placeholder="학번" />
        <Input fontSize="sm" placeholder="이메일" />
        <div style={{ height: "1rem" }}></div>
        <Input fontSize="sm" placeholder="생년월일" />
        <Input fontSize="sm" placeholder="연락처" />
        <div style={{ height: "1rem" }}></div>
        <Button
          colorScheme="green"
          style={{
            width: "100%",
          }}
        >
          완료
        </Button>
      </VStack>
    </VStack>
  );
});

export default SignupPage;
