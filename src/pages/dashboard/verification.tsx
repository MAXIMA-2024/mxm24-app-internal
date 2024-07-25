import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Text,
  Tag,
  Show,
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "@/router";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import Switch from "@mui/material/Switch";
import { Button as MuiButton } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useApi, { useToastErrorHandler } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";

type ModalState = {
  nim: string;
  mode: "delete";
};

type Data = {
  position: string;
  role: string;
  id: number;
  name: string;
  email: string;
  nim: string;
  isVerified: boolean;
};

const Verification = () => {
  const auth = useAuth();
  const verificationData = useSWR<Data[]>("/verifikasi");
  const toast = useToast();
  const api = useApi();
  const errorHandler = useToastErrorHandler();
  const nav = useNavigate();

  const [modalState, setModalState] = useState<ModalState | undefined>();

  const allowedList = [1, 2]; // BPH & Charta

  useEffect(() => {
    if (auth.status === "loading") {
      return;
    }
    if (auth.user?.role !== "panitia") {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki akses untuk halaman ini",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      nav("/dashboard");
      return;
    }
    if (!allowedList.includes(auth.user.data.divisiId)) {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki akses untuk halaman ini",
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
      label: "Id",
      options: {
        display: "excluded",
      },
    },
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
      name: "role",
      label: "Panitia/Organisator",
      options: {
        customBodyRender: (value: string) => {
          return value === "panitia" ? "Panitia" : "Organisator";
        },
      },
    },
    {
      name: "position",
      label: "Divisi/Kategori",
    },
    {
      name: "isVerified",
      label: "Verifikasi",
      options: {
        customBodyRender: (value: boolean, tableMeta) => {
          return (
            <Switch
              checked={value}
              onChange={() => {
                api
                  .put("/verifikasi", {
                    id: tableMeta.rowData[0],
                    role: tableMeta.rowData[3],
                    isVerified: !value,
                  })
                  .then(() => {
                    toast({
                      title: "Berhasil",
                      description: `Data ${tableMeta.rowData[1]} berhasil diubah`,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  })
                  .catch(errorHandler)
                  .finally(() => {
                    verificationData.mutate();
                  });
              }}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          );
        },
      },
    },
    {
      name: "nim",
      label: "Action",
      options: {
        customBodyRender: (nim: string) => {
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
              onClick={() => setModalState({ nim, mode: "delete" })}
            >
              <MdDeleteForever />
            </MuiButton>
          );
        },
      },
    },
  ];

  const userRole =
    auth.user?.role === "panitia"
      ? allowedList.includes(auth.user.data.divisiId)
        ? "Superadmin"
        : auth.user.data.divisi.name
      : "Organisator";

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
              <Link to={"/dashboard/verification"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Verifikasi
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Header */}
          <Stack direction={"row"} gap={5}>
            <Heading fontFamily={"Poppins"} color={"text.primary"}>
              Verifikasi
            </Heading>
            <Stack justifyContent={"end"} mb={2}>
              <Tag
                bgColor={"brand.maroon"}
                h={25}
                color={"white"}
                rounded={"full"}
                fontSize={"0.75rem"}
              >
                {userRole}
              </Tag>
            </Stack>
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
          {verificationData.data ? (
            <DataTable data={verificationData.data} colDefs={colDefs} />
          ) : (
            <Stack flex={1} justify={"center"} align={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
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
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>
              Are you sure to delete{" "}
              <b>
                {
                  verificationData.data?.find(
                    (data) => data.nim === modalState?.nim
                  )?.name
                }
              </b>{" "}
              ?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                const data = verificationData.data?.find(
                  (data) => data.nim === modalState?.nim
                );

                if (data?.role === "panitia") {
                  api
                    .delete(`/panitia/${data.id}`)
                    .then(() => {
                      toast({
                        title: "Berhasil",
                        description: `Data ${data.name} berhasil dihapus`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(errorHandler)
                    .finally(() => {
                      setModalState(undefined);
                      verificationData.mutate();
                    });
                } else {
                  api
                    .delete(`/organisator/${data?.id}`)
                    .then(() => {
                      toast({
                        title: "Berhasil Dihapus!",
                        description: `Data ${data?.name} berhasil dihapus`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(errorHandler)
                    .finally(() => {
                      setModalState(undefined);
                      verificationData.mutate();
                    });
                }
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL END */}
    </>
  );
};

export default Verification;
