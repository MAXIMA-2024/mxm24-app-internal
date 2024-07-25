import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  HStack,
  PinInput,
  PinInputField,
  FormControl,
  FormErrorMessage,
  Stack,
  useToast,
  ModalCloseButton,
} from "@chakra-ui/react";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Turnstile } from "@marsidev/react-turnstile";

const loginWithCodeSchema = z.object({
  uniqueCode: z
    .string({ required_error: "Unique code is required" })
    .length(6, { message: "Unique code must be 6 characters long" }),
  turnstileToken: z.string({ required_error: "Turnstile token is required" }),
});

export type LoginWithCodeDto = z.infer<typeof loginWithCodeSchema>;

interface ModalCheckProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCheck = ({ isOpen, onClose }: ModalCheckProps) => {
  const api = useApi();
  const errorHandler = useToastErrorHandler();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginWithCodeDto>({
    resolver: zodResolver(loginWithCodeSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#e9e9c0"} m={"1rem"}>
          <ModalHeader>Please enter your special code</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form
              id="loginWithCode"
              onSubmit={handleSubmit((data) => {
                setIsLoading(true);
                api
                  .post<ResponseModel>("/auth/login-code", data)
                  .then((res) => {
                    toast({
                      title: "Success",
                      description: res.data.message,
                      status: "success",
                    });
                  })
                  .catch(errorHandler)
                  .finally(() => {
                    setIsLoading(false);

                    // force reload so token applies
                    window.location.reload();
                  });
              })}
            >
              <Stack justify={"center"} align={"center"} gap={"1rem"}>
                <Stack>
                  <FormControl isInvalid={!!errors.uniqueCode}>
                    <Controller
                      control={control}
                      name="uniqueCode"
                      render={({ field }) => (
                        <>
                          <HStack
                            border={"black"}
                            borderBlock={"black"}
                            justifyContent={"center"}
                          >
                            <PinInput
                              size="md"
                              focusBorderColor="black"
                              errorBorderColor="red.300"
                              {...field}
                            >
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                            </PinInput>
                          </HStack>
                        </>
                      )}
                    />
                    <FormErrorMessage>
                      {errors.uniqueCode && errors.uniqueCode.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>

                <Stack>
                  <FormControl isInvalid={!!errors.turnstileToken}>
                    <Controller
                      control={control}
                      name="turnstileToken"
                      render={({ field }) => (
                        <>
                          <Turnstile
                            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                            onSuccess={field.onChange}
                          />
                        </>
                      )}
                    />
                    <FormErrorMessage>
                      {errors.turnstileToken && errors.turnstileToken.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              // colorScheme="teal"
              bgColor={"#F59D00"}
              color={"white"}
              _hover={{
                bgColor: "#E79200",
              }}
              type="submit"
              form="loginWithCode"
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
