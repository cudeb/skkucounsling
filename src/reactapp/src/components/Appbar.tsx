import { HStack, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import IconSkkuSg from "../resources/ic_skku_sg.png";
import { loginStore } from "../dataflow/store";
import { cookieManager } from "../dataflow/remote/CookieManager";
import { ACCOUNT_TYPE } from "../const/RemoteConst";
import { AlertDialog, useDisclosure, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'
import { useRef } from "react";

const Appbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const navigation = useNavigate();
  const navigateToHome = () => {
    if(!loginStore.loginSuccess){
      navigation("/");
    } else if (cookieManager.readCookie(ACCOUNT_TYPE) === "s") {
      navigation("/student/home");
    } else if (cookieManager.readCookie(ACCOUNT_TYPE) === "t") {
      navigation("/admin/home");
    }
  };

  const checkLogout = () => {
    if(!loginStore.loginSuccess){
      navigation("/");
    } else if (cookieManager.readCookie(ACCOUNT_TYPE) === "s") {
      navigation("/student/home");
    } else if (cookieManager.readCookie(ACCOUNT_TYPE) === "t") {
      navigation("/admin/home");
    }
  };
  
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
        {/* <div style={{ flex: 1 }} />
        {children}
         */}
        
        <Text fontSize="5xl" textColor="white" style={{cursor: "pointer"}} onClick={()=>navigation("/")}>
          SCGM
        </Text>

        <div style={{ flex: 1 }} />
          <Button color="white" variant="link" size="lg" style={{marginRight:"2rem"}} onClick={navigateToHome}>
            Home
          </Button>

          {loginStore.loginSuccess ? (
            <>
            {cookieManager.readCookie(ACCOUNT_TYPE) === "s" ? (
              <Button color="white" variant="link" size="lg"
                style={{ marginRight: "2rem" }}
                onClick={() => { navigation("/student/application");}}>
                상담 신청
              </Button>
            ):(
              <>
              <Button color="white" variant="link" size="lg"
                style={{ marginRight: "2rem" }}
                onClick={() => { navigation("/admin/manageCounseling");}}>
                상담 관리
              </Button>
              <Button color="white" variant="link" size="lg"
                style={{ marginRight: "2rem" }}
                onClick={() => { navigation("/admin/applicationCheck");}}>
                상담 신청서 관리
              </Button>
              </>
            )}
            <Button color="white" variant="link" size="lg" 
              style={{marginRight:"2rem"}}
              onClick={onOpen}>
              Log out
            </Button>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    로그아웃 하시겠습니까?
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      취소
                    </Button>
                    <Button colorScheme='red' onClick={()=>{onClose();loginStore.logout();navigation("/")}} ml={3}>
                      로그아웃
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            </>
          ) : (
            <>
              <Button color="white" variant="link" size="lg"
                style={{marginRight:"2rem"}}
                onClick={() => { navigation("/signuppage"); }}>
                Sign up
              </Button>
              <Button color="white" variant="link" size="lg"
                style={{marginRight:"2rem"}}
                onClick={() => { navigation("/login");}}>
                Log in
              </Button>
          </>
        )}
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
