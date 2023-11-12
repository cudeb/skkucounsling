
import React from 'react';
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Calendar from '../Calendar';

interface AcceptModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const AcceptModal: React.FC<AcceptModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack alignItems={'flex-start'}>
                        <Text fontSize="xl" fontWeight="600">김성균 학생의 개인상담이 다음과 같이 진행됩니다.</Text>
                        <Text fontSize="smaller" fontWeight="600"> 첫 상담일: 10/19(목) 12:00</Text>
                        <HStack alignItems={'flex-start'} mt={7}>
                            <VStack mr={10} >
                                <Text fontSize="xl" fontWeight="600" mb={3}>10/19(목)</Text>
                                <CheckboxGroup colorScheme='green'>
                                    <VStack alignItems={'flex-start'} spacing={[1, 5]} direction={['column', 'row']}>
                                        <Checkbox value='10'>10시</Checkbox>
                                        <Checkbox value='11'>11시 - 김철수 학생</Checkbox>
                                        <Checkbox value='12'>12시</Checkbox>
                                        <Checkbox value='13'>13시</Checkbox>
                                        <Checkbox value='14'>14시</Checkbox>
                                        <Checkbox value='15'>15시</Checkbox>
                                        <Checkbox value='16'>16시</Checkbox>
                                    </VStack>
                                </CheckboxGroup>
                                <Button colorScheme="green" mt={5} onClick={onClose}>
                                    확인
                                </Button>
                            </VStack>
                            <Calendar></Calendar>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent >
        </Modal >
    );
};

export default AcceptModal;
