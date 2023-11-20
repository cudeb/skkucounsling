import { Button, Input, HStack, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { signupStore } from "../../dataflow/store";
import { SIGNUP_FIELD } from "../../dataflow/store/signup/SignupStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import IconSkku from "../../resources/ic_skku_sg.png";
import { sign } from "crypto";
import { issueCSRF } from "../../dataflow/remote/RemoteInstruct";

const SignupPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (signupStore.isSignUpSuccess) {
      navigate("/signupdone");
    }

    if (signupStore.signUpErrorMsg) {
      alert(signupStore.signUpErrorMsg);
      signupStore.signUpErrorMsg = "";
    }
  }, [signupStore.isSignUpSuccess, signupStore.signUpErrorMsg]);

  useEffect(() => {
    issueCSRF();
  }, []);
  return (
    <VStack
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HStack
          style={{
            width: "50%",
          }}
        >
          <img
            src={IconSkku}
            alt=""
            style={{
              width: "7rem",
              height: "2rem",
              marginRight:"1rem"
            }}
          />
          <Text fontSize="2xl" textColor="black" as="b">
          SKKUCounselingManager 회원가입
          </Text>
        </HStack>
        <div
          style={{
            width: "50%",
            backgroundColor: "#a1a1a1",
            height: "1px",
            margin: "2rem",
          }}
        />
      <VStack
        style={{
          width: "24rem",
        }}
      >
        <Input
          fontSize="sm"
          placeholder="이메일"
          onChange={(e) =>
            signupStore.updateFormField(SIGNUP_FIELD.EMAIL, e.target.value)
          }
        />
        <Input
          fontSize="sm"
          type="password"
          placeholder="비밀번호"
          onChange={(e) =>
            signupStore.updateFormField(SIGNUP_FIELD.PASSWORD, e.target.value)
          }
        />
        <Input
          fontSize="sm"
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) =>
            signupStore.updateFormField(
              SIGNUP_FIELD.CONFIRM_PASSWORD,
              e.target.value
            )
          }
        />

        <div style={{ height: "1rem" }}></div>
        <Input
          fontSize="sm"
          placeholder="이름"
          onChange={(e) =>
            signupStore.updateFormField(SIGNUP_FIELD.NAME, e.target.value)
          }
        />
        <Input
          fontSize="sm"
          placeholder="학번"
          onChange={(e) =>
            signupStore.updateFormField(SIGNUP_FIELD.SCHOOLID, e.target.value)
          }
        />

        <div style={{ height: "1rem" }}></div>
        <Input
          fontSize="sm"
          placeholder="생년월일"
          onChange={(e) =>
            signupStore.updateFormField(SIGNUP_FIELD.BIRTHDAY, e.target.value)
          }
        />
        <Input
          fontSize="sm"
          placeholder="연락처"
          onChange={(e) =>
            signupStore.updateFormField(SIGNUP_FIELD.PHONE, e.target.value)
          }
        />
        <div style={{ height: "1rem" }}></div>
        <Button
          colorScheme="green"
          bgColor="#156308"
          size="lg"
          style={{
            width: "100%",
          }}
          onClick={() => {
            signupStore.signUp();
          }}
        >
          완료
        </Button>
      </VStack>
    </VStack>
  );
});

export default SignupPage;
