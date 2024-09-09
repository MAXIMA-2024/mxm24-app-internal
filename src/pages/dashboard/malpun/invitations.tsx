import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Show,
  Spinner,
  Text,
  useToast,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "@/components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { Button as MuiButton } from "@mui/material";
import useSWR from "swr";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "@/router";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { MdDeleteForever } from "react-icons/md";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type InvitationMalpun = {
  id: number;
  code: string;
  fullName: string;
  email: string;
  isInvited: boolean;
};

type ModalState =
  | {
      mode: "add";
    }
  | {
      mode: "delete";
      invited: InvitationMalpun;
    };

const idSchema = z.preprocess(
  (val) => Number(val),
  z.number().int("Id must be integer").positive("Id must be positive"),
  { required_error: "Id is required" }
);

const externalSchema = z.object({
  id: idSchema,
  code: z.string(),
  fullName: z
    .string({ required_error: "Fullname can't be empty" })
    .min(3, "Minimal 3 huruf"),
  email: z
    .string({ required_error: "Email can't be empty" })
    .email("Please enter a valid email address"),
  transactionId: z.string(),

  isChatimeBundle: z
    .boolean({ required_error: "Chatime eligibility can't be empty" })
    .default(false),

  isInvited: z
    .boolean({
      required_error: "Invitation status can't be empty",
    })
    .default(false),

  validatedAt: z.date(),
  attendance: z.boolean(),
  attendanceTime: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  turnstileToken: z.string(),
});

const invitationUpdatableSchema = externalSchema.pick({
  fullName: true,
  email: true,
});

type InvitationForm = z.infer<typeof invitationUpdatableSchema>;

const InvitationMalpun = () => {
  const allowedIds = [1, 2, 4];

  const { data, isLoading, mutate } = useSWR<InvitationMalpun[]>(
    `/malpun/external/invitation`
  );
  const auth = useAuth();
  const toast = useToast();
  const nav = useNavigate();

  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvitationForm>({
    resolver: zodResolver(invitationUpdatableSchema),
  });

  const [modalState, setModalState] = useState<ModalState | null>(null);

  useEffect(() => {
    if (
      auth.status === "authenticated" &&
      (auth.user?.role !== "panitia" ||
        !allowedIds.includes(auth.user?.data.divisiId))
    ) {
      toast({
        title: "Unauthorized",
        description: "You are not allowed to access this page",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      nav("/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "fullName",
      label: "Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (id: InvitationMalpun["id"]) => (
          <>
            <MuiButton
              variant={"contained"}
              color={"error"}
              sx={{
                borderRadius: "md",
                minWidth: "0",
                paddingX: "0.5rem",
                boxShadow: "none",
              }}
              onClick={() => {
                const invited = data?.find((inv) => inv.id === id);

                if (invited) {
                  setModalState({
                    mode: "delete",
                    invited,
                  });
                }
              }}
            >
              <MdDeleteForever />
            </MuiButton>
          </>
        ),
      },
    },
  ];

  return (
    <>
      <style>
        {`
            .tss-hwdp7s-MUIDataTable-liveAnnounce {
                border: 0 !important;
                clip: rect(0 0 0 0) !important;
                height: 1px !important;
                margin: -1px !important;
                overflow: hidden !important;
                padding: 0 !important;
                position: relative !important;
                width: 1px !important;
            }
          `}
      </style>

      <Stack gap={7} flex={1}>
        {/* Breadcrumb */}
        <Show above="md">
          <Breadcrumb fontWeight="medium" fontSize="sm">
            <BreadcrumbItem>
              <Link to={"/dashboard"}>
                <BreadcrumbLink>Dashboard</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Link to={"/dashboard/malpun"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Invitations MalPun
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Header */}
          <Stack direction={"row"} justify={"space-between"} gap={5}>
            <Heading fontFamily={"Poppins"} color={"text.primary"}>
              Invitations MalPun
            </Heading>
            {/* add button */}
            <Button
              colorScheme="blue"
              borderRadius={"full"}
              onClick={() => setModalState({ mode: "add" })}
            >
              + Add
            </Button>
          </Stack>
        </Show>
        {/* Content */}
        <Box
          bgColor={"white"}
          // w={"full"}
          // h={"full"}
          flex={1}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
        >
          {isLoading && (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
          )}
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Box>
      </Stack>

      {/* MODAL START */}
      <Modal
        isCentered
        isOpen={!!modalState}
        onClose={() => setModalState(null)}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          {/* add button */}
          <ModalHeader fontWeight={"bold"}>
            {modalState?.mode === "delete"
              ? "Delete invitation"
              : "Buat invitation"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {/* modal add */}

            {modalState?.mode === "add" && (
              <>
                <form
                  id="add-invitation"
                  onSubmit={handleSubmit((data) => {
                    api
                      .post<ResponseModel>("/malpun/external/invitation", data)
                      .then((res) => {
                        toast({
                          title: "Invitation created",
                          description: res.data.message,
                          status: "success",
                          isClosable: true,
                        });
                      })

                      .catch(errorHandler)
                      .finally(() => {
                        mutate();
                        setModalState(null);
                      });
                  })}
                >
                  <FormControl isInvalid={!!errors.fullName}>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <Input {...register("fullName")} />
                    <FormErrorMessage>
                      {errors.fullName && errors.fullName.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input {...register("email")} type="email" />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </form>

                <Text>
                  <Text as={"span"} fontWeight={"bold"}>
                    Note:
                  </Text>{" "}
                  Pastikan data sudah benar sebelum submit karena email akan
                  langsung dikirim.
                </Text>
              </>
            )}

            {modalState?.mode === "delete" && (
              <Text>
                Are you sure to delete{" "}
                <b>
                  {modalState.invited.fullName} - {modalState.invited.email}
                </b>
                ?
              </Text>
            )}
          </ModalBody>

          <ModalFooter gap={"1rem"}>
            {modalState?.mode === "add" && (
              <Button colorScheme="blue" form="add-invitation" type="submit">
                Submit
              </Button>
            )}

            {modalState?.mode === "delete" && (
              <Button
                colorScheme="red"
                onClick={() => {
                  console.log("Data deleted");
                  api
                    .delete<ResponseModel>(
                      `/malpun/external/invitation/${modalState.invited.id}`
                    )
                    .then((value) => {
                      toast({
                        title: "Deleted",
                        description: `${value.data.message}`,
                        status: "error",
                        isClosable: true,
                      });
                    })
                    .catch(errorHandler)
                    .finally(() => {
                      mutate();
                      setModalState(null);
                    });
                }}
              >
                Delete
              </Button>
            )}

            <Button onClick={() => setModalState(null)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL END */}
    </>
  );
};

export default InvitationMalpun;
