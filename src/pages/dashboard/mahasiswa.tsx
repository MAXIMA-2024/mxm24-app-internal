import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Show,
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
  Select,
  useToast,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

import { Button as MuiButton } from "@mui/material";

import useSWR from "swr";
import { MUIDataTableColumn } from "mui-datatables";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const getStatusState = (text: string, status: boolean) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {text}{" "}
      {status ? (
        <BsCheckCircleFill color="#36AD2C" style={{ marginLeft: "5px" }} />
      ) : (
        <BsXCircleFill color="#F43535" style={{ marginLeft: "5px" }} />
      )}
    </div>
  );
};

const prodiList = [
  "Akuntansi",
  "Arsitektur",
  "DKV",
  "Film & Animasi",
  "Informatika",
  "Jurnalistik",
  "Komunikasi Strategis",
  "Manajemen",
  "Perhotelan",
  "Sistem Informasi",
  "Teknik Komputer",
  "Teknik Elektro",
  "Teknik Fisika",
];

const mahasiswaSchema = z.object({
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
  angkatan: z
    .number({ required_error: "Angkatan cannot be empty" })
    .min(2024, "Only students from 2024 are allowed")
    .max(2024, "Only students from 2024 are allowed"),
  prodi: z
    .string({
      required_error: "Prodi cannot be empty",
    })
    .min(3, "Prodi must be at least 3 characters")
    .max(100, "Prodi must be at most 100 characters"),

  // personal
  whatsapp: z
    .string({ required_error: "WhatsApp number cannot be empty" })
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, "Invalid WhatsApp number"),
  lineId: z.string({ required_error: "Line ID cannot be empty" }),
});

type MahasiswaUpdatable = z.infer<typeof mahasiswaSchema>;

type Mahasiswa = MahasiswaUpdatable & {
  id: number;
  token: string;
  createdAt: Date;
  updatedAt: Date;
};

type MahasiswaWithSTATE = {
  id: number;
  name: string;
  nim: string;
  token: string;
  StateRegistration: {
    firstAttendance: boolean;
    lastAttendance: boolean;
    state: {
      id: number;
      name: string;
    };
  }[];
};

type ModalState = {
  mahasiswa: Mahasiswa;
  mode: "edit" | "delete"; // enum
};

const Mahasiswa = () => {
  const auth = useAuth();
  const toast = useToast();
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MahasiswaUpdatable>({
    resolver: zodResolver(mahasiswaSchema),
  });

  const { data, isLoading, mutate } =
    useSWR<MahasiswaWithSTATE[]>("/peserta/mahasiswa");

  const superadminList = [1, 2, 3, 4, 13];

  const [modalState, setModalState] = useState<ModalState | null>(null);

  useEffect(() => {
    if (modalState) {
      reset(modalState.mahasiswa);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

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
      name: "id",
      label: "STATE 1",
      options: {
        customBodyRender: (_value, tableMeta) => {
          const index = tableMeta.rowIndex;
          const rowData = data![index];

          const state = rowData.StateRegistration;
          if (state.length === 0) {
            return "-";
          }

          return getStatusState(
            rowData.StateRegistration[0].state.name,
            rowData.StateRegistration[0].firstAttendance &&
              rowData.StateRegistration[0].lastAttendance
          );
        },
      },
    },
    {
      name: "id",
      label: "STATE 2",
      options: {
        customBodyRender: (_value, tableMeta) => {
          const index = tableMeta.rowIndex;
          const rowData = data![index];

          const state = rowData.StateRegistration;
          if (state.length === 1) {
            return "-";
          }

          return getStatusState(
            rowData.StateRegistration[1].state.name,
            rowData.StateRegistration[1].firstAttendance &&
              rowData.StateRegistration[1].lastAttendance
          );
        },
      },
    },
    {
      name: "id",
      label: "STATE 3",
      options: {
        customBodyRender: (_value, tableMeta) => {
          const index = tableMeta.rowIndex;
          const rowData = data![index];

          const state = rowData.StateRegistration;
          if (state.length === 2) {
            return "-";
          }

          return getStatusState(
            rowData.StateRegistration[2].state.name,
            rowData.StateRegistration[2].firstAttendance &&
              rowData.StateRegistration[2].lastAttendance
          );
        },
      },
    },
  ];

  if (
    auth.user?.role === "panitia" &&
    superadminList.includes(auth.user.data.divisiId)
  ) {
    colDefs.push({
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (_value, tableMeta) => {
          const index = tableMeta.rowIndex;
          const rowData = data![index];

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
                onClick={() =>
                  api
                    .get<ResponseModel<Mahasiswa>>(
                      `/peserta/mahasiswa/${rowData.id}`
                    )
                    .then((res) => {
                      setModalState({ mahasiswa: res.data.data, mode: "edit" });
                    })
                    .catch(errorHandler)
                }
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
                onClick={() =>
                  api
                    .get<ResponseModel<Mahasiswa>>(
                      `/peserta/mahasiswa/${rowData.id}`
                    )
                    .then((res) => {
                      setModalState({
                        mahasiswa: res.data.data,
                        mode: "delete",
                      });
                    })
                    .catch(errorHandler)
                }
              >
                <MdDeleteForever />
              </MuiButton>
            </Stack>
          );
        },
      },
    });
  }

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
              <Link to={"/dashboard/mahasiswa"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Mahasiswa
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </Show>
        {/* BREADCRUMB END */}

        {/* HEADER START */}
        <Heading fontFamily={"Poppins"} color={"text.primary"}>
          Mahasiswa
        </Heading>
        {/* HEADER END */}

        {/* CONTENT START */}
        <Stack bgColor={"white"} flex={1} shadow={"lg"} rounded={"xl"}>
          {/* {loading bar} */}
          {isLoading && (
            <Stack>
              <Spinner />
              <Text>Loading...</Text>
            </Stack>
          )}
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Stack>
      </Stack>

      {/* MODAL START */}
      <Modal
        isCentered
        isOpen={!!modalState}
        onClose={() => setModalState(null)}
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
                id="editMahasiswa"
                onSubmit={handleSubmit((data) => {
                  api
                    .put<ResponseModel>(
                      `/peserta/mahasiswa/${modalState.mahasiswa.id}`,
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
                      mutate();
                      setModalState(null);
                    });
                })}
              >
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel color={"text.primary"} fontWeight={"bold"}>
                    Nama Lengkap
                  </FormLabel>
                  <Input
                    bgColor={"white"}
                    rounded={"xl"}
                    size={["sm", "sm", "md", "md", "md"]}
                    {...register("name")}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.nim}>
                  <FormLabel color={"text.primary"} fontWeight={"bold"}>
                    NIM
                  </FormLabel>
                  <Input
                    bgColor={"white"}
                    rounded={"xl"}
                    size={["sm", "sm", "md", "md", "md"]}
                    type="number"
                    {...register("nim")}
                  />
                  <FormErrorMessage>
                    {errors.nim && errors.nim.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.prodi}>
                  <FormLabel color={"text.primary"} fontWeight={"bold"}>
                    Program Studi
                  </FormLabel>
                  <Select
                    bgColor={"white"}
                    rounded={"xl"}
                    size={["sm", "sm", "md", "md", "md"]}
                    {...register("prodi")}
                  >
                    {prodiList.map((prodi) => (
                      <option key={prodi} value={prodi}>
                        {prodi}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.prodi && errors.prodi.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.whatsapp}>
                  <FormLabel color={"text.primary"} fontWeight={"bold"}>
                    WhatsApp
                  </FormLabel>
                  <Input
                    bgColor={"white"}
                    rounded={"xl"}
                    size={["sm", "sm", "md", "md", "md"]}
                    type="tel"
                    {...register("whatsapp")}
                  />
                  <FormErrorMessage>
                    {errors.whatsapp && errors.whatsapp.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel color={"text.primary"} fontWeight={"bold"}>
                    Email Student
                  </FormLabel>
                  <Input
                    bgColor={"white"}
                    rounded={"xl"}
                    size={["sm", "sm", "md", "md", "md"]}
                    {...register("email")}
                    isDisabled
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.angkatan}>
                  <FormLabel color={"text.primary"} fontWeight={"bold"}>
                    Angkatan
                  </FormLabel>
                  <Select
                    bgColor={"white"}
                    rounded={"xl"}
                    size={["sm", "sm", "md", "md", "md"]}
                    {...register("angkatan", {
                      valueAsNumber: true,
                    })}
                  >
                    <option value="2024">2024</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.angkatan && errors.angkatan.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.lineId}>
                  <FormLabel color={"text.primary"} fontWeight={"bold"}>
                    ID Line
                  </FormLabel>
                  <Input
                    bgColor={"white"}
                    rounded={"xl"}
                    size={["sm", "sm", "md", "md", "md"]}
                    {...register("lineId")}
                  />
                  <FormErrorMessage>
                    {errors.lineId && errors.lineId.message}
                  </FormErrorMessage>
                </FormControl>
              </form>
            )}

            {modalState?.mode === "delete" && (
              <Text>
                Are you sure to delete{" "}
                <b>
                  {modalState.mahasiswa.nim} - {modalState.mahasiswa.name}
                </b>
                ?
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            {modalState?.mode === "edit" && (
              <Button colorScheme="blue" form="editMahasiswa" type="submit">
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
                      `/peserta/mahasiswa/${modalState.mahasiswa.id}`
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
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL END */}
    </>
  );
};

export default Mahasiswa;
