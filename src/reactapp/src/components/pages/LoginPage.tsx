import React from "react";
import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import IconSkku from "../../resources/ic_skku_sg.png";
import { useNavigate } from "react-router";
const LoginPage = observer(() => {
  const navigation = useNavigate();
  return (
    <VStack
      style={{
        width: "100%",
      }}
    >
      <VStack
        style={{
          width: "50rem",
          gap: "3rem",
        }}
      >
        <HStack
          style={{
            marginTop: "3rem",
            width: "100%",
          }}
        >
          <img
            src={IconSkku}
            alt=""
            style={{
              width: "7rem",
              height: "2rem",
            }}
          />
          <Text fontSize="2xl" textColor="black" as="b">
            SCGM 로그인
          </Text>
        </HStack>
        <div
          style={{
            width: "100%",
            backgroundColor: "#a1a1a1",
            height: "1px",
          }}
        />
        <VStack
          style={{
            width: "50%",
          }}
        >
          <VStack
            style={{
              width: "100%",
              border: "1.3px solid #c1c1c1",
              borderRadius: "0.5rem",
              padding: "1rem",
            }}
          >
            <Input
              fontSize="md"
              size="lg"
              variant="unstyled"
              placeholder="ID"
              style={{
                height: "2rem",
                paddingLeft: "1rem",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#c1c1c1",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            />
            <Input
              fontSize="md"
              size="lg"
              variant="unstyled"
              placeholder="Password"
              style={{
                height: "2rem",
                paddingLeft: "1rem",
              }}
            />
          </VStack>

          <Button
            bgColor="#156308"
            colorScheme="green"
            size="lg"
            style={{ width: "100%" }}
          >
            로그인
          </Button>
        </VStack>

        <div
          style={{
            width: "100%",
            backgroundColor: "#a1a1a1",
            height: "1.3px",
          }}
        />
        <Button
          bgColor="#156308"
          colorScheme="green"
          style={{ width: "50%" }}
          size="lg"
          onClick={() => navigation("/signup")}
        >
          회원가입
        </Button>
      </VStack>
    </VStack>
  );
});

export default LoginPage;
