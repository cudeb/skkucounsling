import { Button, HStack, Text, VStack, ChakraProvider } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Appbar from "../Appbar";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { Children, useEffect, useState } from "react";
import AcceptModal from "./AcceptModal";
import RefuseModal from "./RefuseModal";


const AdminPersonalApplicationCheckPage = observer(() => {

    // const [accessToken, setAccessToken] = useState('');
    // const [Data, setData] = useState([])
    //
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const openAcceptModal = () => {
        setIsAcceptModalOpen(true);
    };

    const closeAcceptModal = () => {
        setIsAcceptModalOpen(false);
    };

    const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);

    const openRefuseModal = () => {
        setIsRefuseModalOpen(true);
    };

    const closeRefuseModal = () => {
        setIsRefuseModalOpen(false);
    };
    // // 토큰을 로컬 스토리지에서 가져오는 함수
    // const getAccessToken = () => {
    //     const storedToken = localStorage.getItem('access_token');
    //     if (storedToken) {
    //         setAccessToken(storedToken);
    //     }
    // };
    // 
    // // 컴포넌트가 마운트될 때 토큰을 가져오도록 설정
    // useEffect(() => {
    //     getAccessToken();
    // }, []);
    // 
    // useEffect(() => {
    //     fetch('http://localhost:8000/counseling/schedule-counselor/', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((Response) => Response.json())
    //         .then((data) => setApplicationData(data.data))
    // })

    const PageDescription = observer(() => {
        return (
            <VStack style={{ alignItems: "flex-start", width: "100%" }}>
                <HStack style={{ alignItems: "flex-end", margin: "1rem" }}>
                    <Text fontSize="2xl" fontWeight="700">
                        상담 신청서 관리
                    </Text>
                    <Text fontSize="md">개인 상담 신청서를 수락 또는 거절하세요</Text>
                </HStack>
            </VStack>
        );
    });

    const StudentImageWrapper = observer(() => {
        return (
            <VStack style={{ alignItems: "center", padding: "2rem", width: "20%", backgroundColor: "white", marginRight: "5%" }}>
                <img src="https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png" ></img>
                <Text marginTop={5} fontSize="l" fontWeight="600">김성균</Text>
                <Button onClick={() => console.log("임시")} size='sm' style={{ backgroundColor: "#D9D9D9" }}>
                    <img src="https://cdn.pixabay.com/photo/2016/06/15/14/54/download-1459070_1280.png" width="15%"></img>
                    신청서 다운로드
                </Button>
            </VStack>
        )
    })

    const StudentInfoWrapper = observer(() => {
        return (
            <VStack style={{ alignItems: "flex-start", padding: "2rem", width: "30%", backgroundColor: "lightgray", marginRight: "2%" }}>
                <HStack>
                    <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>상담 종류</Text>
                    <Text marginTop={3} fontSize="smaller" fontWeight="600">10회기 개인 상담</Text>
                </HStack>
                <HStack>
                    <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>상담 분야</Text>
                    <Text marginTop={3} fontSize="smaller" fontWeight="600">대인 관계, 학업 및 진로</Text>
                </HStack>
                <HStack>
                    <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>희망 상담 시간</Text>
                    <Text marginTop={3} fontSize="smaller" fontWeight="600">월요일 11:00-12:00</Text>
                </HStack>
                <VStack style={{ alignItems: "flex-start" }}>
                    <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>상담 학생 정보</Text>
                    <Text marginTop={1} fontSize="smaller" fontWeight="600">이름 : 김성균</Text>
                    <Text marginTop={1} fontSize="smaller" fontWeight="600">학번 : 2019123456</Text>
                    <Text marginTop={1} fontSize="smaller" fontWeight="600">학년 : 3학년 1학기</Text>
                    <Text marginTop={1} fontSize="smaller" fontWeight="600">이메일 : skkukim00@daum.net</Text>
                    <Text marginTop={1} fontSize="smaller" fontWeight="600">생년월일 : 1999/07/27</Text>
                    <Text marginTop={1} fontSize="smaller" fontWeight="600">연락처 : 010-1234-1398</Text>
                </VStack>
            </VStack>
        )
    })

    const CounselingTimeAdmin = observer(() => {
        return (
            <VStack style={{ alignItems: "flex-start", padding: "2rem", width: "50%" }}>
                <Text fontSize="xl" fontWeight="600">희망 상담 시간</Text>
                <Text style={{ textAlign: "start" }} fontSize="md">
                    학생이 지정한 희망 상담 시간을 확인하세요
                </Text>

                <TableContainer style={{ width: "100%" }}>
                    <Table colorScheme="gray" style={{ width: "60%", margin: "1rem" }} size='sm'>
                        <Thead>
                            <Tr style={{ backgroundColor: "#D9D9D9" }}>
                                <Th style={{ width: "15%", textAlign: "center" }}>시간\요일</Th>
                                <Th style={{ textAlign: "center" }}>월</Th>
                                <Th style={{ textAlign: "center" }}>화</Th>
                                <Th style={{ textAlign: "center" }}>수</Th>
                                <Th style={{ textAlign: "center" }}>목</Th>
                                <Th style={{ textAlign: "center" }}>금</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {[10, 11, 13, 14, 15, 16].map((value, index) => {
                                return <Tr>
                                    <Td style={{ backgroundColor: "#D9D9D9" }}>{value}:00~{value + 1}:00</Td>
                                    {/* 임시로 설정 */}
                                    {[1, 2, 3, 4, 5].map((number, index) => {
                                        if (number == 2 && value == 11 || number == 4 && value == 15)
                                            return <Td style={{ backgroundColor: "#579f6e" }}></Td>;
                                        else
                                            return <Td style={{ backgroundColor: "white" }}></Td>;
                                    })}
                                </Tr>
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack >
        );
    });

    const StudentApplicationWrapper = observer(() => {
        return (
            <ChakraProvider>
                <VStack style={{ alignItems: "center", padding: "2rem", width: "100%", backgroundColor: "lightgray", marginRight: "3%" }}>
                    <HStack>
                        <StudentImageWrapper />
                        <StudentInfoWrapper />
                        <CounselingTimeAdmin />
                    </HStack>
                    <HStack>
                        <Button onClick={openAcceptModal} size='md' colorScheme="green" marginRight={10}>승인하기</Button>
                        <Button onClick={openRefuseModal} size='md' colorScheme="green">거절하기</Button>
                    </HStack>
                </VStack>
            </ChakraProvider>
        );
    });

    return (
        <VStack style={{ width: "100%", paddingBottom: "10rem" }}>
            <Appbar>
                <Button color="white" variant="link" size="lg">
                    HOME
                </Button>
                <Button color="white" variant="link" size="lg">
                    상담 신청서 관리
                </Button>
            </Appbar>

            <VStack style={{ width: "85%" }}>
                <PageDescription />
                <StudentApplicationWrapper />
            </VStack>
            <AcceptModal isOpen={isAcceptModalOpen} onClose={closeAcceptModal} title="승인하기">
            </AcceptModal>
            <RefuseModal isOpen={isRefuseModalOpen} onClose={closeRefuseModal} title="거절하기">
            </RefuseModal>
        </VStack>
    );
});

export default AdminPersonalApplicationCheckPage;
