
import React from 'react';
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

interface RefuseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const RefuseModal: React.FC<RefuseModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Text fontSize="xl" fontWeight="600">신청서를 거절하시겠습니까?</Text>
                        <HStack mt={3}>
                            <Button colorScheme="red" onClick={onClose}>
                                확인
                            </Button>
                            <Button colorScheme="green" ml={3} onClick={onClose}>
                                취소
                            </Button>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RefuseModal;
