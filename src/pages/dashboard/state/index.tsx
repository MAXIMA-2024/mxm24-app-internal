import {
  Stack,
  Heading,
  Show,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Spinner,
  Textarea,
  Select,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DataTable from "../../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { MdDeleteForever } from "react-icons/md";
import { Button as MuiButton } from "@mui/material";
import { MdInfo } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useNavigate } from "@/router";
import useAuth from "@/hooks/useAuth";
import useSWR from "swr";

type State = {
  day: {
    id: number;
    code: string;
    date: Date;
  };
  id: number;
  _count: {
    StateRegistration: number;
  };
  name: string;
  logo: string;
  quota: number;
};

type DayManagement = {
  id: number;
  code: string;
  date: string;
};

type ModalState = {
  state?: State;
  mode: "create" | "delete";
};

const stateSchema = z.object({
  name: z.string({ required_error: "Name cannot be empty" }),
  dayId: z.preprocess(
    (val) => Number(val),
    z.number().int("Id must be integer").positive("Id must be positive"),
    { required_error: "Id is required" }
  ),
  description: z
    .string({ required_error: "Description cannot be empty" })
    .max(500, "Description must be under 500 characters"),
  location: z.string({ required_error: "Location cannot be empty" }),
  quota: z
    .number({
      required_error: "Quota cannot be empty",
      invalid_type_error: "Quota must be a number",
    })
    .min(1, "Quota must be at least 1"),
});

type StateDataFillable = z.infer<typeof stateSchema>;

const StatePanitia = () => {
  //untuk bph, charta, actus, scriptum dan kalau masukin id lainnya seperti [5, 6, dst] tidak akan muncul delete dan add button
  const allowedEditIds = [1, 2, 3, 4];

  const auth = useAuth();
  const toast = useToast();
  const api = useApi();
  const errorHandler = useToastErrorHandler();
  const nav = useNavigate();

  // fetcher
  const stateData = useSWR<State[]>("/state");
  const dayManagementData = useSWR<DayManagement[]>(
    "/state/enum/dayManagement"
  );

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<StateDataFillable>({
    resolver: zodResolver(stateSchema),
  });

  const [modalState, setModalState] = useState<ModalState | undefined>();

  useEffect(() => {
    if (auth.status === "loading") {
      return;
    }

    if (auth.user?.role !== "panitia") {
      toast({
        title: "Unauthorized",
        description: "You are not authorized to access this page",
        status: "error",
        isClosable: true,
      });
      nav("/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  let actionColumn: MUIDataTableColumn = {
    name: "",
  };

  if (
    auth.user?.role === "panitia" &&
    allowedEditIds.includes(auth.user?.data.divisiId)
  ) {
    actionColumn = {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value: number, tableMeta) => {
          const data = stateData.data?.[tableMeta.rowIndex];

          return (
            <Stack direction={"row"} gap={"1rem"}>
              <Link to={`/dashboard/state/${value}`}>
                <MuiButton
                  variant={"contained"}
                  color={"primary"}
                  sx={{
                    borderRadius: "4rem",
                    minWidth: "0",
                    paddingX: "0.8rem",
                    boxShadow: "none",
                    backgroundColor: "button.success",
                    gap: "0.5rem",
                  }}
                >
                  <MdInfo />
                  Detail
                </MuiButton>
              </Link>
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
                onClick={() => setModalState({ state: data!, mode: "delete" })}
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
      label: "Nama STATE",
    },
    {
      name: "quota",
      label: "Kuota",
      options: {
        customBodyRender: (value: number, tableMeta) => {
          const data = stateData.data?.[tableMeta.rowIndex];
          return `${data?._count.StateRegistration}/${value}`;
        },
      },
    },
    {
      name: "day",
      label: "Hari",
      options: {
        customBodyRender: (value: { id: number; code: string; date: Date }) => {
          const date = new Date(value.date);
          const formattedDate = date
            .toLocaleDateString("id-ID", {
              // format tanggal: Senin, 1 Januari 2021 - 08:00
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace("pukul", "-");
          return `${value.code} - ${formattedDate}`;
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
              <Link to={"/dashboard/state"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Daftar State
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* BREADCRUMB END */}

          {/* HEADER START */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            align={"center"}
            borderRadius={"2rem"}
          >
            <Stack direction={"row"} align={"center"} spacing={5}>
              <Heading fontFamily={"Poppins"} color={"text.primary"}>
                Daftar State
              </Heading>
            </Stack>

            {/* add button */}
            {auth.user?.role === "panitia" &&
              allowedEditIds.includes(auth.user.data.divisiId) && (
                <Button
                  leftIcon={<MdEdit />}
                  colorScheme="blue"
                  bgColor={"button.primary"}
                  borderRadius={"full"}
                  color={"white"}
                  onClick={() => setModalState({ mode: "create" })}
                >
                  <Text color={"white"}> Add</Text>
                </Button>
              )}
          </Stack>
        </Show>
        {/* HEADER END */}

        {/* CONTENT START */}
        <Stack
          bgColor={"white"}
          flex={1}
          // w={"full"}
          // h={"full"}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
        >
          {!stateData.data || stateData.isLoading ? (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
          ) : (
            <DataTable colDefs={colDefs} data={stateData.data} />
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
          <ModalHeader fontWeight={"bold"}>
            {modalState?.mode === "delete" ? "Delete STATE" : "Create STATE"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {modalState?.mode === "delete" && (
              <Text>
                Are you sure to delete <b>{modalState.state?.name}</b> ?{" "}
              </Text>
            )}

            {modalState?.mode === "create" && (
              <form
                id="add-data"
                onSubmit={handleSubmit((data) => {
                  api
                    .post<ResponseModel>("/state", data)
                    .then((res) => {
                      toast({
                        title: "Success",
                        description: res.data.message,
                        status: "success",
                      });
                    })
                    .catch(errorHandler)
                    .finally(() => {
                      stateData.mutate();
                      setModalState(undefined);
                    });
                })}
              >
                <Stack spacing={4}>
                  {/* NAMA ORGANISASI START */}
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Nama STATE</FormLabel>

                    <Input
                      placeholder="Nama STATE"
                      {...register("name")}
                      type="text"
                    />

                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* NAMA ORGANISASI END */}

                  {/* HARI START */}
                  <FormControl isInvalid={!!errors.dayId}>
                    <FormLabel>Hari</FormLabel>

                    <Controller
                      control={control}
                      name="dayId"
                      render={({ field }) => (
                        <Select {...field}>
                          {dayManagementData.data?.map((day) => {
                            const date = new Date(day.date);
                            const formattedDate = date
                              .toLocaleDateString("id-ID", {
                                // format tanggal: Senin, 1 Januari 2021 - 08:00
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                              .replace("pukul", "-");
                            return (
                              <option key={day.id} value={day.id}>
                                {day.code} - {formattedDate}
                              </option>
                            );
                          })}
                        </Select>
                      )}
                    />

                    <FormErrorMessage>
                      {errors.dayId && errors.dayId.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* HARI END */}

                  {/* KUOTA START */}
                  <FormControl isInvalid={!!errors.quota}>
                    <FormLabel>Kuota</FormLabel>

                    <Input
                      placeholder="Kuota"
                      {...register("quota", {
                        valueAsNumber: true,
                      })}
                      type="number"
                    />

                    <FormErrorMessage>
                      {errors.quota && errors.quota.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* KUOTA END */}

                  {/* LOKASI START */}
                  <FormControl isInvalid={!!errors.location}>
                    <FormLabel>Lokasi</FormLabel>

                    <Input
                      placeholder="Lokasi"
                      {...register("location")}
                      type="text"
                    />

                    <FormErrorMessage>
                      {errors.location && errors.location.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* LOKASI END */}

                  {/* DESKRIPSI START */}
                  <FormControl isInvalid={!!errors.description}>
                    <FormLabel>Deskripsi</FormLabel>

                    <Textarea
                      placeholder="Deskripsi"
                      {...register("description")}
                    />

                    <FormErrorMessage>
                      {errors.description && errors.description.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* DESKRIPSI END */}
                </Stack>
              </form>
            )}
          </ModalBody>

          <ModalFooter>
            {modalState?.mode === "delete" && (
              <Button
                colorScheme="red"
                onClick={() => {
                  api
                    .delete<ResponseModel>(`/state/${modalState.state?.id}`)
                    .then((res) => {
                      toast({
                        title: "Deleted",
                        description: res.data.message,
                        status: "error",
                      });
                    })
                    .catch(errorHandler)
                    .finally(() => {
                      stateData.mutate();
                      setModalState(undefined);
                    });
                }}
              >
                Delete
              </Button>
            )}

            {modalState?.mode === "create" && (
              <Button colorScheme="blue" type="submit" form="add-data">
                Add
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL END */}
    </>
  );
};

export default StatePanitia;
