import {
  Box,
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import Switch from "@mui/material/Switch";
import { Button as MuiButton } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

type ModalState = {
  id?: number;
  mode: "delete";
};

const Verification = () => {
  const [modalState, setModalState] = useState<ModalState | undefined>();
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
      name: "status",
      label: "Panitia/Organisator",
    },
    {
      name: "divisi",
      label: "Divisi/Kategori",
    },
    {
      name: "status",
      label: "Verifikasi",
      options: {
        customBodyRender: (value) => {
          return (
            <Switch
              checked={value}
              // onChange={(e) => updateValue(e.target.checked)}
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
              onClick={() => setModalState({ id: value, mode: "delete" })}
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

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
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
                Superadmin
              </Tag>
            </Stack>
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
          {data && <DataTable colDefs={colDefs} data={data} />}
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

export default Verification;
