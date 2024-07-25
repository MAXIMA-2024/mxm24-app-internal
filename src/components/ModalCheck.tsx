import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  //   Input,
  Text,
  Button,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";

interface ModalCheckProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCheck = ({ isOpen, onClose }: ModalCheckProps) => {
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [specialCode, setSpecialCode] = useState<string>("");
  const isLengthValid = specialCode.trim().length === 6;

  const handleSpecialCodeChange = (value: string) => {
    const numericInput = value.replace(/[^0-9]/g, "");
    setSpecialCode(numericInput);
  };

  const handleCheckButtonClick = () => {
    setIsLoading(true);
    api
      .get<ResponseModel<InterviewStatus>>(`/data/${nim}`)
      .then(({ data }) => {
        // setInterviewStatus(data.data);
        // setResultModalOpen(true);
      })
      .catch(errorHandler)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#e9e9c0"} m={"1rem"}>
          <ModalHeader>Please enter your special code</ModalHeader>
          <ModalBody>
            {/* <Text mb={"10px"}>Code:</Text>
            <Input
              type="text"
              placeholder="Your special code ..."
              value={nim}
              onChange={handleNimChange}
              isRequired
              pattern="[0-9]*"
              border={"2px solid #00000095"}
            /> */}
            <HStack
              border={"black"}
              borderBlock={"black"}
              justifyContent={"center"}
            >
              <PinInput
                // value={specialCode}
                size="md"
                focusBorderColor="black"
                onChange={handleSpecialCodeChange}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Text textAlign={"center"} color={"red"}>
              ReCAPHTCA
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              // colorScheme="teal"
              bgColor={"#F59D00"}
              color={"white"}
              _hover={{
                bgColor: "#E79200",
              }}
              onClick={handleCheckButtonClick}
              isDisabled={!isLengthValid}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCheck;
