import RoleRadio from "@/components/roleRadio";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import {
  Text,
  Button,
  Stack,
  Image,
  Show,
  useToast,
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Input,
  FormLabel,
  Select,
  useRadioGroup,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
// import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const panitiaSchema = z.object({
  name: z
    .string({ required_error: "Name cannot be empty" })
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),
  nim: z
    .string({ required_error: "NIM cannot be empty" })
    .length(11, "NIM must be 11 characters")
    .startsWith("00000", { message: "NIM must start with 00000/0" }),
  email: z
    .string({
      required_error: "Email cannot be empty",
    })
    .email("Email must be a valid email address")
    .endsWith(
      "@student.umn.ac.id",
      "Email must be a valid UMN student email address"
    ),
  divisiId: z.preprocess(
    (value) => Number(value),
    z
      .number({ required_error: "Divisi cannot be empty" })
      .positive("Divisi must be a positive number")
  ),
  isVerified: z.boolean({ required_error: "isVerified cannot be empty" }),
});

const organisatorSchema = z.object({
  name: z
    .string({ required_error: "Name cannot be empty" })
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),
  nim: z
    .string({ required_error: "NIM cannot be empty" })
    .length(11, "NIM must be 11 characters")
    .startsWith("00000", { message: "NIM must start with 00000/0" }),
  email: z
    .string({
      required_error: "Email cannot be empty",
    })
    .email("Email must be a valid email address")
    .endsWith(
      "@student.umn.ac.id",
      "Email must be a valid UMN student email address"
    ),
  stateId: z.preprocess(
    (value) => Number(value),
    z
      .number({ required_error: "State cannot be empty" })
      .positive("State must be a positive number")
  ),
  isVerified: z.boolean({ required_error: "isVerified cannot be empty" }),
});

const onboardingFormSchema = z.union([
  z.object({
    role: z.enum(["panitia", "organisator"], {
      required_error: "Role cannot be empty",
      invalid_type_error: "Role must be either panitia or organisator",
    }),
    data: panitiaSchema,
  }),
  z.object({
    role: z.enum(["organisator", "panitia"], {
      required_error: "Role cannot be empty",
      invalid_type_error: "Role must be either panitia or organisator",
    }),
    data: organisatorSchema,
  }),
]);

type OnboardingForm = z.infer<typeof onboardingFormSchema>;

const dummyDivisiPanitia = [
  {
    id: 1,
    name: "BPH",
  },
  {
    id: 2,
    name: "Dekorasi",
  },
  {
    id: 3,
    name: "Dokumentasi",
  },
  {
    id: 4,
    name: "Konsumsi",
  },
  {
    id: 5,
    name: "Konten Kreatif",
  },
];

const dummySTATE = [
  {
    id: 1,
    name: "QORIE",
  },
  {
    id: 2,
    name: "Robotic UMN",
  },
  {
    id: 3,
    name: "UMN Programming Club",
  },
  {
    id: 4,
    name: "SPECTRE",
  },
  {
    id: 5,
    name: "POPSICLE",
  },
];

const role = ["panitia", "organisator"];

const OnboardingPage = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingFormSchema),
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "role",
    onChange: (value) => setValue("role", value as "panitia" | "organisator"),
  });

  // Note: comment useEffect ini buat disable handling auth
  // (biar slicing gampang)
  // useEffect(() => {
  //   if (auth.status === "unauthenticated") {
  //     toast({
  //       title: "Error",
  //       description: "You need to login first",
  //       status: "error",
  //       isClosable: true,
  //     });
  //     nav("/auth/login");
  //     return;
  //   }

  //   if (auth.status === "authenticated" && auth.user?.role !== "unknown") {
  //     toast({
  //       title: "Error",
  //       description: "You already have an account",
  //       status: "error",
  //       isClosable: true,
  //     });
  //     nav("/dashboard");
  //     return;
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth]);

  const steps = [
    { title: "Role" },
    { title: "Data" },
    { title: "Verification" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <>
      <Stack
        direction={"row"}
        align={"end"}
        justify={"center"}
        w={"full"}
        h={"min-content"}
        px={[0, 0, 0, "6rem", "6rem"]}
        mb={[activeStep === 0 ? "8rem" : "1.25rem", "4rem", "0", "0", "0"]}
      >
        <Stack
          as={motion.div}
          direction={"column"}
          align={"center"}
          justify={"center"}
          w={["95%", "95%", "95%", "36rem", "48rem"]}
          pt={"2rem"}
          rounded={"2rem"}
          bgPos={"center"}
          objectFit={"cover"}
          bgRepeat={"no-repeat"}
          position={"relative"}
          zIndex={10}
          bgColor={"white"}
          variants={{
            initial: {
              opacity: 0,
              y: 150,
            },
            enter: {
              opacity: 1,
              y: [100, 0, 10],
              transition: {
                duration: 1,
                delay: 1.5,
                easings: "backOut",
              },
            },
          }}
          initial={"initial"}
          animate={"enter"}
        >
          <Image
            src="/bg/logo.png"
            w={["60px", "90px", "90px", "90px", "90px"]}
            h={["72px", "110px", "110px", "110px", "110px"]}
            mb={"2rem"}
          />
          <Show breakpoint="(min-width: 1024px)">
            <Image
              src="/bg/maxiDesktop.png"
              position={"absolute"}
              top={"10rem"}
              left={"-7.775rem"}
              w={"9rem"}
              as={motion.img}
              animate={{
                y: [0, 2, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  easings: "easeInOut",
                },
              }}
            />
            <Image
              src="/bg/ximaDesktop.png"
              position={"absolute"}
              top={"10rem"}
              bottom={0}
              right={"-7.5rem"}
              w={"10rem"}
              as={motion.img}
              animate={{
                y: [0, -2, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  easings: "easeInOut",
                },
              }}
            />
          </Show>

          <Show breakpoint="(max-width: 1023px)">
            <Image
              src="/bg/maxiMobile.png"
              position={"absolute"}
              top={["-6.4rem", "-8.835rem", "-8.835rem", "-6.3rem", "-6.3rem"]}
              bottom={0}
              left={["1.25rem", "3.5rem", "11rem", "1.25rem", "1.25rem"]}
              w={["8rem", "11rem", "11rem", "8rem", "8rem"]}
              as={motion.img}
              animate={{
                rotate: [0, -1.5, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  easings: "easeInOut",
                },
              }}
            />
            <Image
              src="/bg/ximaMobile.png"
              position={"absolute"}
              top={["-6.3rem", "-8rem", "-8rem", "-6.3rem", "-6.3rem"]}
              bottom={0}
              right={["2rem", "6rem", "12rem", "2rem", "2rem"]}
              w={["5.5rem", "7rem", "7rem", "5.5rem", "5.5rem"]}
              as={motion.img}
              animate={{
                rotate: [0, 1.5, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  easings: "easeInOut",
                },
              }}
            />
          </Show>

          <Stepper
            index={activeStep}
            px={"1rem"}
            py={"1rem"}
            w={"90%"}
            mx={"4rem"}
            size={["sm", "sm", "md", "md", "md"]}
            // transform={[
            //   "scale(0.5)",
            //   "scale(0.75)",
            //   "scale(1)",
            //   "scale(1)",
            //   "scale(1)",
            // ]}
            border={"2px"}
            borderColor={"gray.500"}
            borderRadius={"xl"}
            borderWidth={"thin"}
            colorScheme="brand.orange"
            flexDirection={"column"}
          >
            {steps.map((step, index) => (
              <Step key={index} style={{ padding: 0 }}>
                <Stack
                  direction={["column", "column", "row", "row", "row"]}
                  w={["3rem", "4rem", "8rem", "8rem", "8rem"]}
                  align={"center"}
                  justify={"center"}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={<StepNumber />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0" fontSize={"2xl"}>
                    <StepTitle>
                      <Text fontSize={["xs", "sm", "sm", "sm", "md"]}>
                        {step.title}
                      </Text>
                    </StepTitle>
                  </Box>
                </Stack>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          <Stack
            as={"form"}
            onSubmit={handleSubmit((data) => {
              console.log(data);
              setActiveStep(3);
            })}
            // flex={1}
            w={"full"}
            p={"2rem"}
            align={"center"}
            direction={"column"}
          >
            {activeStep === 0 && (
              <Stack direction={"column"} justify={"center"} align={"center"}>
                <FormControl isInvalid={!!errors.role}>
                  <Stack
                    {...getRootProps()}
                    direction={"row"}
                    align={"center"}
                    justify={"center"}
                  >
                    {role.map((value) => {
                      const radio = getRadioProps({ value });
                      return (
                        <RoleRadio
                          key={value}
                          {...radio}
                          role={value as "panitia" | "organisator"}
                        />
                      );
                    })}
                  </Stack>

                  <FormErrorMessage>
                    {errors.role && errors.role.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  bgColor={"#185C99"}
                  w={["75%", "16rem", "24rem", "24rem", "32rem"]}
                  py={"1.75rem"}
                  onClick={() => {
                    trigger("role").then((valid) => {
                      if (valid) {
                        setActiveStep(1);
                      }
                    });
                  }}
                >
                  <Text textColor={"white"}>Next</Text>
                </Button>
              </Stack>
            )}

            {activeStep === 1 && (
              <>
                <Input
                  {...register("data.isVerified", { value: false })}
                  type="hidden"
                ></Input>
                <FormControl isInvalid={!!errors.data?.email}>
                  <FormLabel fontWeight={"semibold"}>Email Student</FormLabel>
                  <Input
                    {...register("data.email", {
                      value: "student@student.umn.ac.id",
                    })}
                    disabled
                  />
                  <FormErrorMessage>
                    {errors.data?.email && errors.data?.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.data?.nim}>
                  <FormLabel fontWeight={"semibold"}>NIM</FormLabel>
                  <Input {...register("data.nim")} />
                  <FormErrorMessage>
                    {errors.data?.nim && errors.data?.nim.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.data?.name}>
                  <FormLabel fontWeight={"semibold"}>Nama Lengkap</FormLabel>
                  <Input {...register("data.name")} />
                  <FormErrorMessage>
                    {errors.data?.name && errors.data?.name.message}
                  </FormErrorMessage>
                </FormControl>

                {/* SELECTION buat  */}
                {getValues("role") === "panitia" && (
                  // @ts-expect-error divisiId nggak kedetek oleh typescript tapi udah pasti ada
                  <FormControl isInvalid={!!errors.data?.divisiId}>
                    <FormLabel fontWeight={"semibold"}>Divisi</FormLabel>
                    <Select {...register("data.divisiId")}>
                      {dummyDivisiPanitia.map((divisi) => (
                        <option key={divisi.id} value={divisi.id}>
                          {divisi.name}
                        </option>
                      ))}
                    </Select>

                    <FormErrorMessage>
                      {
                        // @ts-expect-error divisiId nggak kedetek oleh typescript tapi udah pasti ada
                        errors.data?.divisiId &&
                          // @ts-expect-error divisiId nggak kedetek oleh typescript tapi udah pasti ada
                          errors.data?.divisiId?.message
                      }
                    </FormErrorMessage>
                  </FormControl>
                )}

                {getValues("role") === "organisator" && (
                  // @ts-expect-error stateId nggak kedetek oleh typescript tapi udah pasti ada
                  <FormControl isInvalid={!!errors.data?.stateId}>
                    <FormLabel fontWeight={"semibold"}>Organisator</FormLabel>
                    <Select {...register("data.stateId")}>
                      {dummySTATE.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </Select>

                    <FormErrorMessage>
                      {
                        // @ts-expect-error stateId nggak kedetek oleh typescript tapi udah pasti ada
                        errors.data?.stateId && errors.data?.stateId?.message
                      }
                    </FormErrorMessage>
                  </FormControl>
                )}
                <Button
                  bgColor={"#185C99"}
                  w={["75%", "16rem", "24rem", "24rem", "32rem"]}
                  mt={"2rem"}
                  py={"1.75rem"}
                  type="submit"
                >
                  <Text textColor={"white"}>Save</Text>
                </Button>
              </>
            )}

            {activeStep === 3 && (
              <Stack direction={"column"} justify={"center"} align={"center"}>
                <Text
                  fontSize={["3xl", "3xl", "4xl", "4xl", "4xl"]}
                  fontWeight={"medium"}
                >
                  SELAMAT
                </Text>
                <Text my={"-0.25rem"}>Akunmu berhasil dibuat</Text>
                <Text fontSize={["xs", "sm", "md", "md", "md"]}>
                  Tunggu verifikasi dari BPH dan Charta ya
                </Text>

                <Image src="/dashboard/congrats.png" my={"1rem"} />

                <Button
                  as={RouterLink}
                  to={"/dashboard"}
                  bgColor={"#185C99"}
                  w={["75%", "16rem", "24rem", "24rem", "32rem"]}
                  py={"1.75rem"}
                >
                  <Text textColor={"white"}>Go to Dashboard</Text>
                </Button>
              </Stack>
            )}
            <Text>
              Wrong account? <Link textColor={"#185C99"}>Logout</Link>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default OnboardingPage;
