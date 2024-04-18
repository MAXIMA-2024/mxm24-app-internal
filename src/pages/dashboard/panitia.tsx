import {
  Stack,
  Heading,
  Show,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useState } from "react";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { MdDeleteForever } from "react-icons/md";
import { Button as MuiButton } from "@mui/material";
import { Text } from "@chakra-ui/react";

const Panitia = () => {
  const allowedDeleteIds = [1, 2];
  const mockUserIds = [1, 2]; //user id novator dan charta
  const user = { ids: mockUserIds };

  type ModalState = {
    id?: number;
    mode: "delete";
  };

  const [modalState, setModalState] = useState<ModalState | undefined>();

  let actionColumn: MUIDataTableColumn = {
    name: "",
  };

  if (user.ids.some((id) => allowedDeleteIds.includes(id))) {
    actionColumn = {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value: number) => {
          return (
            <Stack direction={"row"} gap={"1rem"}>
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
                onClick={() => setModalState({ id: value, mode: "delete" })}
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
      label: "Divisi/Kategori",
    },
    actionColumn,
  ];

  const data = [
    ["Alice Johnson", "12345", "alice@example.com", "Marketing"],
    ["Bob Smith", "23456", "bob@example.com", "Sales"],
    ["Charlie Brown", "34567", "charlie@example.com", "Engineering"],
    ["David Lee", "45678", "david@example.com", "Human Resources"],
    ["Eve Wilson", "56789", "eve@example.com", "Finance"],
    ["Fiona Miller", "67890", "fiona@example.com", "Marketing"],
    ["George Clark", "78901", "george@example.com", "Sales"],
    ["Hannah Davis", "89012", "hannah@example.com", "Engineering"],
    ["Ian Taylor", "90123", "ian@example.com", "Human Resources"],
    ["Jessica White", "01234", "jessica@example.com", "Finance"],
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

      <Stack gap={7}>
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
        <Box
          bgColor={"white"}
          w={"full"}
          // h={"full"}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
        >
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Box>
        {/* CONTENT END */}
      </Stack>

      {/* MODAL START */}
      <Modal
        isCentered
        isOpen={!!modalState}
        onClose={() => setModalState(undefined)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Are you sure to delete? </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                console.log("Data deleted"); //nanti implementasi dari backend
                setModalState(undefined);
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

export default Panitia;
