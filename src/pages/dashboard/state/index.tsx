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
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Tag,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useState } from "react";
import DataTable from "../../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { MdDeleteForever } from "react-icons/md";
import { Button as MuiButton } from "@mui/material";
import { MdInfo } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const StatePanitia = () => {
  const allowedEditIds = [1, 2, 3, 4];
  const mockUserIds = [1, 2, 3, 4]; //untuk bph, charta, actus, scriptum dan kalau masukin id lainnya seperti [5, 6, dst] tidak akan muncul delete dan add button
  const user = { ids: mockUserIds };

  type ModalState = {
    id?: number;
    mode: "create" | "delete";
  };

  const [modalState, setModalState] = useState<ModalState | undefined>();

  let actionColumn: MUIDataTableColumn = {
    name: "",
  };

  if (user.ids.some((id) => allowedEditIds.includes(id))) {
    actionColumn = {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value: number) => {
          return (
            <Stack direction={"row"} gap={"1rem"}>
              {" "}
              <Link to={`${value}`}>
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
      name: "stateName",
      label: "Nama State",
    },
    {
      name: "kuota",
      label: "Kuota",
    },
    actionColumn,
  ];

  const data = [
    ["Joe James", "12/345"],
    ["John Walsh", "12/346"],
    ["Bob Herm", "12/347"],
    ["James Houston", "12/348"],
    ["Joe James", "12/349"],
    ["John Walsh", "12/350"],
    ["Bob Herm", "12/351"],
    ["James Houston", "12/352"],
    ["Joe James", "12/353"],
    ["John Walsh", "12/354"],
    ["Bob Herm", "12/355"],
    ["James Houston", "12/356"],
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
              {user.ids.some((id) => allowedEditIds.includes(id)) && (
                <Tag
                  bgColor={"brand.maroon"}
                  h={25}
                  color={"white"}
                  rounded={"full"}
                  fontSize={"0.75rem"}
                >
                  Superadmin
                </Tag>
              )}
            </Stack>

            {/* add button */}
            {user.ids.some((id) => allowedEditIds.includes(id)) && (
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
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Stack>
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
          <ModalHeader fontWeight={"bold"}>
            {modalState?.mode === "delete" ? "Delete" : "Create"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {modalState?.mode === "delete" && (
              <Text>Are you sure to delete? </Text>
            )}

            {modalState?.mode === "create" && (
              <form>
                <Stack spacing={4}>
                  {/* NAMA ORGANISASI START */}
                  <FormControl>
                    <FormLabel>Nama</FormLabel>

                    <Input
                      placeholder="Nama Organisasi"
                      // {...register("")}
                      type="text"
                    />

                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  {/* NAMA ORGANISASI END */}

                  {/* HARI START */}
                  <FormControl>
                    <FormLabel>Hari</FormLabel>

                    <Input
                      placeholder="Hari"
                      // {...register("")}
                      type="date"
                    />

                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  {/* HARI END */}

                  {/* KUOTA START */}
                  <FormControl>
                    <FormLabel>Kuota</FormLabel>

                    <Input
                      placeholder="Kuota"
                      // {...register("")}
                      type="number"
                    />

                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  {/* KUOTA END */}

                  {/* LOKASI START */}
                  <FormControl>
                    <FormLabel>Lokasi</FormLabel>

                    <Input
                      placeholder="Lokasi"
                      // {...register("")}
                      type="text"
                    />

                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  {/* LOKASI END */}

                  {/* DESKRIPSI START */}
                  <FormControl>
                    <FormLabel>Deskripsi</FormLabel>

                    <Input
                      placeholder="Deskripsi"
                      // {...register("")}
                      type="text"
                    />

                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  {/* DESKRIPSI END */}

                  {/* LOGO ORGANISASI START */}
                  <FormControl>
                    <FormLabel>Logo</FormLabel>

                    <Input
                      placeholder="Logo Organisasi"
                      // {...register("")}
                      type="file"
                    />

                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  {/* LOGO ORGANISASI END */}

                  {/* FOTO KEGIATAN START */}
                  <FormControl>
                    <FormLabel>Logo</FormLabel>

                    <Input
                      placeholder="Logo Organisasi"
                      // {...register("")}
                      type="file"
                    />

                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  {/* FOTO KEGIATAN END */}
                </Stack>
              </form>
            )}
          </ModalBody>

          <ModalFooter>
            {modalState?.mode === "delete" && (
              <Button
                colorScheme="red"
                onClick={() => {
                  console.log("Data deleted"); //nanti implementasi dari backend
                  setModalState(undefined);
                }}
              >
                Delete
              </Button>
            )}

            {modalState?.mode === "create" && (
              <Button
                colorScheme="blue"
                onClick={() => {
                  console.log("Data added");
                  setModalState(undefined);
                }}
              >
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
