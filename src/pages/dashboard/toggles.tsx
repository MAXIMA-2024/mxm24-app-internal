import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Tag,
  Show,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Hide,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import Switch from "@mui/material/Switch";
import { MdDeleteForever } from "react-icons/md";
import MuiButton from "@mui/material/Button";
import { useEffect, useState } from "react";
import { z } from "zod";
//import { useToastErrorHandler } from "@/hooks/useApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import useSWR from "swr";

type Toggles = {
  id: number;
  name: string;
  toggle: boolean;
};

type ModalToggles = {
  id?: number;
  mode: "create" | "delete";
};

type TogglesFillable = Pick<Toggles, "name">;

const togglesSchema = z.object({
  name: z
    .string({ required_error: "Nama kegiatan harus diisi" })
    .min(1, "Nama kegiatan harus diisi")
    .max(255, "Nama barang maksimal 255 karakter"),
  // .min(5, "Nama barang minimal 5 karakter"),
});

const Toggles = () => {
  // const errorHandler = useToastErrorHandler();
  const auth = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TogglesFillable>({
    resolver: zodResolver(togglesSchema),
  });

  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const toggleData = useSWR<Toggles[]>("/toggle");

  const [modalToggles, setModalToggles] = useState<ModalToggles | undefined>();

  useEffect(() => {
    if (auth.user?.role !== "panitia") {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak diizinkan mengakses page ini",
        status: "error",
      });

      nav("/dashboard");
      return;
    }

    const allowList = [
      1, // BPH
      2, // CHARTA
    ];

    if (
      auth.user.role === "panitia" &&
      !allowList.includes(auth.user.data.divisiId)
    ) {
      toast({
        title: "Akses ditolak",
        description: "Divisi anda tidak diizinkan mengakses page ini",
        status: "error",
      });

      nav("/dashboard");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "name",
      label: "Toggle",
    },
    {
      name: "toggle",
      label: "Status",
      options: {
        customBodyRender: (value: boolean, tableMeta) => {
          const { rowIndex } = tableMeta;
          const data = toggleData.data?.[rowIndex];

          return (
            <Switch
              checked={value}
              onChange={() =>
                api
                  .put(`/toggle/${data?.id}`)
                  .then(() => {
                    toast({
                      title: "Berhasil",
                      description: `Toggle ${data?.name} berhasil di update`,
                      status: "success",
                      isClosable: true,
                    });
                  })
                  .catch(errorHandler)
                  .finally(() => toggleData.mutate())
              }
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          );
        },
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value: number) => {
          return (
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
              onClick={() => setModalToggles({ id: value, mode: "delete" })}
              // onClick={() => {
              //   console.log(value);
              // }}
            >
              <MdDeleteForever />
            </MuiButton>
          );
        },
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
              <Link to={"/dashboard/toggles"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Toggles
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Header */}
          <Stack direction={"row"} justifyContent={"space-between"} gap={5}>
            <Stack gap={5} direction={"row"}>
              <Heading fontFamily={"Poppins"} color={"text.primary"}>
                Toggles
              </Heading>
              <Stack justifyContent={"end"} mb={2}>
                <Tag
                  bgColor={"brand.maroon"}
                  h={25}
                  color={"white"}
                  rounded={"full"}
                  fontSize={"0.75rem"}
                >
                  Superadmin
                </Tag>
              </Stack>
            </Stack>
            <Button
              onClick={() => {
                setModalToggles({ mode: "create" });
              }}
              colorScheme="blue"
              borderRadius={"full"}
            >
              + Add Toggles
            </Button>
          </Stack>
        </Show>
        {/* Content */}
        <Stack
          bgColor={"white"}
          // w={"full"}
          // h={"full"}
          flex={1}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
        >
          <Hide above="md">
            <Button
              m={4}
              borderRadius={"full"}
              onClick={() => {
                setModalToggles({ mode: "create" });
              }}
              colorScheme="blue"
            >
              + Add Toggles
            </Button>
          </Hide>
          {toggleData.data ? (
            <DataTable colDefs={colDefs} data={toggleData.data} />
          ) : (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Modal
        isCentered
        isOpen={!!modalToggles}
        onClose={() => setModalToggles(undefined)}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>
            {modalToggles?.mode === "create" ? "Add" : "Delete"} Toggles
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalToggles?.mode === "delete" && (
              <Text>Are you sure you want to delete this toggle?</Text>
            )}

            {modalToggles?.mode === "create" && (
              <form
                id="add-toggles"
                onSubmit={handleSubmit((data) => {
                  api
                    .post<ResponseModel>("/toggle", data)
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
                      toggleData.mutate();
                      setModalToggles(undefined);
                    });
                })}
              >
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Nama Toggle</FormLabel>
                  <Input
                    placeholder="Nama Toggle"
                    {...register("name")}
                    type="text"
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
            {modalToggles?.mode === "create" && (
              <Button colorScheme="blue" type="submit" form="add-toggles">
                Add
              </Button>
            )}
            {modalToggles?.mode === "delete" && (
              <Button
                colorScheme="red"
                onClick={() => {
                  api
                    .delete<ResponseModel>(`/toggle/${modalToggles.id}`)
                    .then((res) => {
                      toast({
                        title: "Berhasil",
                        description: res.data.message,
                        status: "success",
                        isClosable: true,
                      });
                    })
                    .finally(() => {
                      toggleData.mutate();
                      setModalToggles(undefined);
                    });
                }}
              >
                Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Toggles;
