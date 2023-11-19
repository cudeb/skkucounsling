import React, { useEffect } from "react";
import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import IconSkku from "../../resources/ic_skku_sg.png";
import { useNavigate } from "react-router";
import { loginStore } from "../../dataflow/store";
import { cookieManager } from "../../dataflow/remote/CookieManager";
import { ACCOUNT_TYPE } from "../../const/RemoteConst";
const LoginPage = observer(() => {
  const navigation = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    if (loginStore.loginSuccess) {
      if (cookieManager.readCookie(ACCOUNT_TYPE) === "s")
        navigation("/student/home");
      else navigation("/admin/home");
    }

    if (loginStore.errorMsg) {
      alert(loginStore.errorMsg);
      loginStore.errorMsg = "";
    }
  }, [loginStore.loginSuccess, loginStore.errorMsg]);

  const onClickLogin = () => {
    if (email === "" || password === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    loginStore.loginWithAccount(email, password);
  };

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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
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
            onClick={() => {
              onClickLogin();
            }}
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
          onClick={() => navigation("/signuppage")}
        >
          회원가입
        </Button>
      </VStack>
    </VStack>
  );
});

export default LoginPage;