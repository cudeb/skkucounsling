import { HStack, Text, VStack } from "@chakra-ui/react";
import IconSkkuSg from "../resources/ic_skku_sg.png";

const Appbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      style={{
        width: "100%",
      }}
    >
      <HStack
        style={{
          width: "100%",
          backgroundColor: "#1D482E",
          height: "5rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Text fontSize="5xl" textColor="white">
          SCGM
        </Text>
        <div style={{ flex: 1 }} />
        {children}
      </HStack>
      <HStack
        style={{
          width: "100%",
          paddingLeft: "2rem",
        }}
      >
        <img
          src={IconSkkuSg}
          style={{ width: "8rem", height: "2rem", margin: "1rem" }}
          alt=""
        />
        <div
          style={{ width: "2px", height: "4rem", backgroundColor: "#a2a2a2" }}
        />
        <Text fontSize="2xl" as="b" color="#a2a2a2" m={4}>
          성균관대학교 카운슬링센터 개인상담 홈페이지
        </Text>
        <div style={{ flex: 1 }} />
      </HStack>
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: "#a2a2a2",
        }}
      />
    </VStack>
  );
};

export default Appbar;
