import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  // Tag,
  Show,
  Button,
  // FormControl,
  // FormErrorMessage,
  // FormLabel,
  // Input,
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
  // Modal,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import useSWR from "swr";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";

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

const Organisator = () => {
  const auth = useAuth();

  const toast = useToast();
  const nav = useNavigate();
  const api = useApi();
  const errorHandler = useToastErrorHandler();

  const organisatorData = useSWR<Organisator[]>("/organisator/");

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
  }, [auth]);

  type ModalState = {
    organisator: Organisator;
    mode: "create" | "delete"; // enum
  };

  const [modalState, setModalState] = useState<ModalState | undefined>();

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
        customBodyRender: (_value: number, tableMeta) => {
          const data = organisatorData.data?.[tableMeta.rowIndex];
          return (
            <Stack direction={"row"} gap={"1rem"}>
              {/* {role === "superadmin" && (
                <Link to={`/details/${value}`}>
                  <MuiButton
                    variant={"contained"}
                    color={"primary"}
                    sx={{ borderRadius: "4rem" }}
                  >
                    Details
                  </MuiButton>
                </Link>
              )} */}
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
                  setModalState({ organisator: data!, mode: "delete" })
                }
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
        customBodyRender: (value: { id: number; name: string }) => value.name,
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
        <Box
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
            </Stack>
          ) : (
            <DataTable colDefs={colDefs} data={organisatorData.data} />
          )}
        </Box>
      </Stack>

      {/* MODAL START */}
      <Modal
        isCentered
        isOpen={!!modalState}
        onClose={() => setModalState(undefined)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"bold"}>
            {modalState?.mode === "delete" ? "Delete" : "Sunting"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {modalState?.mode === "delete" && (
              <Text>
                Are you sure to delete <b>{modalState.organisator.name}</b>?
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            {modalState?.mode === "delete" && (
              <Button
                colorScheme="red"
                onClick={() => {
                  console.log("Data deleted");
                  //nanti implementasi dari backend
                  // toast({
                  //   title: "Deleted",
                  //   description: `Data ${modalState.organisator.name} has been deleted`,
                  //   status: "error",
                  //   isClosable: true,
                  // });
                  // setModalState(undefined);

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
