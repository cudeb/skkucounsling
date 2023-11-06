import { Button, Flex, HStack, Text } from "@chakra-ui/react";

const Appbar = ({ children }: { children: React.ReactNode }) => {
  return (
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
  );
};

export default Appbar;
