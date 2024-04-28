import {
  Stack,
  Heading,
  Show,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Spinner,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { Button as MuiButton } from "@mui/material";
import { Text } from "@chakra-ui/react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import useSWR from "swr";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

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
    (val) => Number(val),
    z.number().int("Id must be integer").positive("Id must be positive"),
    { required_error: "Id is required" }
  ),
});

type PanitiaFillable = z.infer<typeof panitiaSchema>;

const Panitia = () => {
  const allowedDeleteIds = [1, 2];

  const auth = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PanitiaFillable>();

  type ModalState = {
    panitia: Panitia;
    mode: "delete" | "edit";
  };

  type Panitia = {
    id: number;
    name: string;
    nim: string;
    email: string;
    divisiId: number;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    divisi: {
      id: number;
      name: string;
    };
  };

  type DivisiPanitia = {
    id: number;
    name: string;
  };

  const panitiaData = useSWR<Panitia[]>("/panitia");

  const panitiaDivisiData = useSWR<DivisiPanitia[]>(
    "/panitia/enum/divisiPanitia"
  );

  const [modalState, setModalState] = useState<ModalState | undefined>();

  useEffect(() => {
    if (modalState && modalState.mode === "edit") {
      reset({
        divisiId: modalState.panitia.divisiId,
        name: modalState.panitia.name,
        nim: modalState.panitia.nim,
        email: modalState.panitia.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  useEffect(() => {
    if (auth.status === "loading") {
      return;
    }

    if (auth.user?.role !== "panitia") {
      toast({
        title: "Unathorized",
        description: "Anda tidak diizinkan untuk mengakses page ini",
        status: "error",
      });

      nav("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  let actionColumn: MUIDataTableColumn = {
    name: "",
  };

  if (
    auth.user?.role === "panitia" &&
    allowedDeleteIds.includes(auth.user.data.divisiId)
  ) {
    actionColumn = {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (_value: number, tableMeta) => {
          const data = panitiaData.data?.[tableMeta.rowIndex];
          return (
            <Stack direction={"row"} gap={"1rem"}>
              {/* EDIT BUTTON START */}
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
                onClick={() => setModalState({ panitia: data!, mode: "edit" })}
              >
                Sunting
              </MuiButton>
              {/* EDIT BUTTON END */}

              {/* DELETE BUTTON START */}
              <MuiButton
                variant={"contained"}
                color={"error"}
                sx={{
                  borderRadius: "md",
                  minWidth: "0",
                  paddingX: "0.5rem",
                  boxShadow: "none",
                  backgroundColor: "button.success",
                }}
                onClick={() =>
                  setModalState({ panitia: data!, mode: "delete" })
                }
              >
                <MdDeleteForever />
              </MuiButton>
              {/* DELETE BUTTON END */}
            </Stack>
          );
        },
      },
    };
  }

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "name",
      label: "Name",
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
      name: "divisi",
      label: "Divisi",
      options: {
        customBodyRender: (value: { id: number; name: string }) => {
          return value.name;
        },
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
        {/* BREADCRUMB START */}
        <Show above="md">
          <Breadcrumb fontWeight="medium" fontSize="sm">
            <BreadcrumbItem>
              <Link to={"/dashboard"}>
                <BreadcrumbLink>Dashboard</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Link to={"/dashboard/panitia"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Panitia
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* BREADCRUMB END */}

          {/* HEADER START */}
          <Heading fontFamily={"Poppins"} color={"text.primary"}>
            Panitia
          </Heading>
        </Show>
        {/* HEADER END */}

        {/* CONTENT START */}
        <Stack
          bgColor={"white"}
          // w={"full"}
          // h={"full"}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
          flex={1}
        >
          {!panitiaData.data || panitiaData.isLoading ? (
            <Stack flex={1} justify={"center"} alignItems={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
          ) : (
            <DataTable colDefs={colDefs} data={panitiaData.data} />
          )}
        </Stack>
        {/* CONTENT END */}
      </Stack>

      {/* MODAL START */}
      <Modal
        isCentered
        isOpen={!!modalState}
        onClose={() => setModalState(undefined)}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

        <ModalContent>
          <ModalHeader>
            {modalState?.mode === "delete" && "Delete"}

            {modalState?.mode === "edit" && "Edit"}
          </ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmit((data) => {
              api
                .put<ResponseModel>(`/panitia/${modalState?.panitia.id}`, data)
                .then((res) => {
                  toast({
                    title: "Edited",
                    description: res.data.message,
                    status: "success",
                  });
                })

                .catch(errorHandler)
                .finally(() => {
                  panitiaData.mutate();
                  setModalState(undefined);
                });
            })}
          >
            <ModalBody>
              {modalState?.mode === "delete" && (
                <Text>
                  Are you sure to delete {""}
                  <b>{modalState?.panitia.name}</b>?
                </Text>
              )}

              {modalState?.mode === "edit" && (
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
                      {...register("email", {
                        value: modalState.panitia.email,
                      })}
                      type="email"
                    />

                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* EMAIL END */}

                  {/* DIVISI ID START */}
                  <FormControl isInvalid={!!errors.divisiId}>
                    <FormLabel>Divisi</FormLabel>

                    <Controller
                      control={control}
                      name="divisiId"
                      render={({ field }) => {
                        return (
                          <Select {...field}>
                            {panitiaDivisiData.data?.map((divisi) => {
                              return (
                                <option value={divisi.id}>{divisi.name}</option>
                              );
                            })}
                          </Select>
                        );
                      }}
                    ></Controller>

                    <FormErrorMessage>
                      {errors.divisiId && errors.divisiId.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* DIVISI ID END */}
                </Stack>
              )}
            </ModalBody>

            <ModalFooter>
              {modalState?.mode === "delete" && (
                <Button
                  colorScheme="red"
                  onClick={() => {
                    api
                      .delete<ResponseModel>(
                        `/panitia/${modalState?.panitia.id}`
                      )
                      .then((res) => {
                        toast({
                          title: "Deleted",
                          description: res.data.message,
                          status: "error",
                        });
                      })

                      .catch(errorHandler)
                      .finally(() => {
                        panitiaData.mutate();
                        setModalState(undefined);
                      });
                  }}
                >
                  Delete
                </Button>
              )}

              {modalState?.mode === "edit" && (
                <Button colorScheme="blue" type="submit">
                  Save
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {/* MODAL END */}
    </>
  );
};

export default Panitia;
