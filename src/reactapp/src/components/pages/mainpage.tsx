import { observer } from "mobx-react-lite";
import { loginStore, mainStore } from "../../dataflow/store";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import IconSkkuSg from "../../resources/ic_skku_sg.png";
import Appbar from "../Appbar";
import IcCheveron from "../../resources/mainpage/ic_chevron_right.png";
import IcAssign from "../../resources/mainpage/ic_assign.png";
import IcCalendar from "../../resources/mainpage/ic_calendar.png";
import IcTasks from "../../resources/mainpage/ic_tasks.png";
import IcCounseling from "../../resources/mainpage/ic_counseling.png";
import IcDocument from "../../resources/mainpage/ic_document.png";
import { useNavigate } from "react-router";
import { cookieManager } from "../../dataflow/remote/CookieManager";
import { ACCOUNT_TYPE } from "../../const/RemoteConst";

const SlideItem = ({
  image,
  title,
  isEnd,
}: {
  image: string;
  title: string;
  isEnd?: Boolean;
}) => {
  return (
    <HStack>
      <VStack>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#a9a9a9",
            borderRadius: "1rem",
          }}
        >
          <img
            src={image}
            alt=""
            style={{
              width: "10rem",
              height: "6rem",
              //centerInside
              objectFit: "contain",
            }}
          />
        </div>
        <Text size="3xl" as="b">
          {title}
        </Text>
      </VStack>
      {isEnd ? (
        <></>
      ) : (
        <img
          src={IcCheveron}
          alt=""
          style={{
            width: "2rem",
            height: "3rem",
            position: "relative",
            top: "-1rem",
          }}
        />
      )}
    </HStack>
  );
};

const MainPage = observer(() => {
  const store = mainStore;
  const navigation = useNavigate();

  const navigateToHome = () => {
    if (cookieManager.readCookie(ACCOUNT_TYPE) === "s") {
      navigation("/student/home");
    } else if (cookieManager.readCookie(ACCOUNT_TYPE) === "t") {
      navigation("/manager");
    }
  };
  return (
    <VStack
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Appbar>
        <Button color="white" variant="link" size="lg" onClick={navigateToHome}>
          HOME
        </Button>
        {loginStore.loginSuccess ? (
          <Button
            color="white"
            variant="link"
            size="lg"
            onClick={() => loginStore.logout()}
          >
            로그아웃
          </Button>
        ) : (
          <>
            <Button
              color="white"
              variant="link"
              size="lg"
              onClick={() => {
                navigation("/signuppage");
              }}
            >
              SIGNUP
            </Button>
            <Button
              color="white"
              variant="link"
              size="lg"
              onClick={() => {
                navigation("/login");
              }}
            >
              LOGIN
            </Button>
          </>
        )}
      </Appbar>

      <HStack
        style={{
          marginTop: "2rem",
        }}
      >
        <SlideItem image={IcDocument} title="상담신청서 작성 및 제출" />
        <SlideItem image={IcCalendar} title="심리 검사 예약" />
        <SlideItem image={IcTasks} title="심리 검사 진행행" />
        <SlideItem image={IcAssign} title="상담사 배정" />
        <SlideItem image={IcCounseling} title="상담 시작" isEnd />
      </HStack>

      <HStack
        style={{
          width: "100%",
          backgroundColor: "#f2f2f2",
          justifyContent: "center",
          padding: "4rem",
          marginTop: "2rem",
        }}
        gap="6rem"
      >
        <VStack
          style={{
            alignItems: "flex-start",
          }}
        >
          <Text as="b" fontSize="xl">
            학생용 서비스
          </Text>
          {`기약 없는 상담 예약 대기는 그만! 예상 상담일 고지
              심리 검사일 지정 예약 
              상담 일정 및 출석을 한눈에 확인
              상담 별 기록 기능 제공`
            .split("\n")
            .map((line) => {
              return <Text>•{line}</Text>;
            })}
        </VStack>
        <VStack
          style={{
            alignItems: "flex-start",
          }}
        >
          <Text as="b" fontSize="xl">
            관리자용 서비스
          </Text>
          {`학생의 상담 신청서 필터링 및 열람
학생 별 출석, 상담 기록, 피드백을 체계적으로 관리
상담사의 상담 일정 캘린더로 한눈에 확인
편리한 상담 일정 추가와 조정`
            .split("\n")
            .map((line) => {
              return <Text>•{line}</Text>;
            })}
        </VStack>
      </HStack>
      <HStack style={{ width: "100%", padding: "1rem" }}>
        <div style={{ flex: 1 }} />
        <Button variant="link">{`카운슬링센터 홈페이지 바로가기 >>`}</Button>
      </HStack>
    </VStack>
  );
});

export default MainPage;
