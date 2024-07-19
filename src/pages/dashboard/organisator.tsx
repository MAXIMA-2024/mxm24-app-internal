import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Show,
  Button,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Spinner,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  // Modal,
} from "@chakra-ui/react";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import DataTable from "@/components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import useSWR from "swr";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

type Organisator = {
  id: number;
  name: string;
  nim: string;
  email: string;
  stateId: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  state: {
    id: number;
    name: string;
  };
};

type OrganisatorEnum = {
  id: number;
  name: string;
};

type ModalState = {
  organisator: Organisator;
  mode: "edit" | "delete"; // enum
};

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
    (val) => Number(val),
    z.number().int("Id must be integer").positive("Id must be positive"),
    { required_error: "Id is required" }
  ),
});

type OrganisatorFillable = z.infer<typeof organisatorSchema>;

const Organisator = () => {
  const auth = useAuth();

  const toast = useToast();
  const nav = useNavigate();
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const organisatorData = useSWR<Organisator[]>("/organisator/");
  const organisatorEnum = useSWR<OrganisatorEnum[]>("/state/enum/organisator");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<OrganisatorFillable>();

  const [modalState, setModalState] = useState<ModalState | undefined>();

  useEffect(() => {
    if (auth.status === "loading") {
      return;
    }
    if (auth.user?.role !== "panitia") {
      toast({
        title: "Unauthorized",
        description: "You are not allowed to access this page",
        status: "error",
        isClosable: true,
      });
      nav("/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (modalState && modalState.mode === "edit") {
      reset({
        stateId: modalState.organisator.stateId,
        name: modalState.organisator.name,
        nim: modalState.organisator.nim,
        email: modalState.organisator.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  let actionColumn: MUIDataTableColumn = {
    name: "",
  }; // init empty object

  const superadminList = [1, 2];

  if (
    auth.user?.role === "panitia" &&
    superadminList.includes(auth.user?.data.divisiId)
  ) {
    actionColumn = {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (id: number) => {
          return (
            <Stack direction={"row"} gap={"1rem"}>
              <MuiButton
                startIcon={<MdOutlineEdit />}
                variant={"outlined"}
                color={"info"}
                sx={{
                  borderRadius: "1rem",
                  minWidth: "0",
                  paddingX: "0.8rem",
                  boxShadow: "none",
                  backgroundColor: "button.success",
                }}
                onClick={() => {
                  const data = organisatorData.data?.find((od) => od.id === id);
                  if (data) {
                    setModalState({ organisator: data, mode: "edit" });
                  }
                }}
              >
                Sunting
              </MuiButton>
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
                  const data = organisatorData.data?.find((od) => od.id === id);
                  if (data) {
                    setModalState({ organisator: data, mode: "delete" });
                  }
                }}
              >
                <MdDeleteForever />
              </MuiButton>
            </Stack>
          );
        },
      },
    };
  }

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "name",
      label: "Nama",
    },
    {
      name: "nim",
      label: "NIM",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "state",
      label: "STATE",
      options: {
        customBodyRender: (value: Organisator["state"]) => value.name,
      },
    },
    actionColumn,
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
              <Link to={"/dashboard/organisator"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Organisator
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Header */}
          <Stack direction={"row"} gap={5}>
            <Heading fontFamily={"Poppins"} color={"text.primary"}>
              Organisator
            </Heading>
          </Stack>
        </Show>
        {/* Content */}
        <Stack
          bgColor={"white"}
          // w={"full"}
          // h={"full"}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
          flex={1}
        >
          {/* {data && <DataTable colDefs={colDefs} data={data} />} */}
          {!organisatorData.data || organisatorData.isLoading ? (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
          ) : (
            <DataTable colDefs={colDefs} data={organisatorData.data} />
          )}
        </Stack>
      </Stack>

      {/* MODAL START */}
      <Modal
        isCentered
        isOpen={!!modalState}
        onClose={() => setModalState(undefined)}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader fontWeight={"bold"}>
            {modalState?.mode === "delete" ? "Delete" : "Sunting"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {modalState?.mode === "edit" && (
              <form
                id="editOrganisator"
                onSubmit={handleSubmit((data) => {
                  api
                    .put<ResponseModel>(
                      `/organisator/${modalState.organisator.id}`,
                      data
                    )
                    .then((res) => {
                      toast({
                        title: "Berhasil",
                        description: res.data.message,
                        status: "success",
                        isClosable: true,
                      });
                    })
                    .catch(errorHandler)
                    .finally(() => {
                      organisatorData.mutate();
                      setModalState(undefined);
                    });
                })}
              >
                <Stack spacing={4}>
                  {/* NAMA START */}
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Nama</FormLabel>

                    <Input
                      placeholder="Nama"
                      {...register("name")}
                      type="text"
                    />

                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* NAMA END */}

                  {/* NIM START */}
                  <FormControl isInvalid={!!errors.nim}>
                    <FormLabel>NIM</FormLabel>

                    <Input
                      placeholder="NIM"
                      {...register("nim")}
                      type="number"
                    />

                    <FormErrorMessage>
                      {errors.nim && errors.nim.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* NIM END */}

                  {/* EMAIL START */}
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>

                    <Input
                      placeholder="Email"
                      {...register("email")}
                      type="email"
                    />

                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* EMAIL END */}

                  {/* DIVISI ID START */}
                  <FormControl isInvalid={!!errors.stateId}>
                    <FormLabel>Divisi</FormLabel>

                    <Controller
                      control={control}
                      name="stateId"
                      render={({ field }) => (
                        <Select {...field}>
                          {organisatorEnum.data?.map((divisi) => (
                            <option key={divisi.id} value={divisi.id}>
                              {divisi.name}
                            </option>
                          ))}
                        </Select>
                      )}
                    />

                    <FormErrorMessage>
                      {errors.stateId && errors.stateId.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* DIVISI ID END */}
                </Stack>
              </form>
            )}

            {modalState?.mode === "delete" && (
              <Text>
                Are you sure to delete <b>{modalState.organisator.name}</b>?
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            {modalState?.mode === "edit" && (
              <Button colorScheme="blue" form="editOrganisator" type="submit">
                Save
              </Button>
            )}
            {modalState?.mode === "delete" && (
              <Button
                colorScheme="red"
                onClick={() => {
                  console.log("Data deleted");
                  api
                    .delete<ResponseModel>(
                      `/organisator/${modalState.organisator.id}`
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
                      organisatorData.mutate();
                      setModalState(undefined);
                    });
                }}
              >
                Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL END */}
    </>
  );
};

export default Organisator;
