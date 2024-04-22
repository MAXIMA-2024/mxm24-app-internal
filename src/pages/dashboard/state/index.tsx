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
} from "@chakra-ui/react";

import { Form, Link } from "react-router-dom";
import { useState } from "react";
import DataTable from "../../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { MdDeleteForever } from "react-icons/md";
import { Button as MuiButton } from "@mui/material";
import { MdInfo } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type StateData = {
  nama_kegiatan: string;
  hari: Date;
  kuota: number;
  lokasi: string;
  deskripsi: string;
  // logo: File;
  // foto_kegiatan: File;
};

type StateDataFillable = Pick<
  StateData,
  "nama_kegiatan" | "hari" | "kuota" | "lokasi" | "deskripsi"
  // | "logo"
  // | "foto_kegiatan"
>;

type ModalState = {
  id?: number;
  mode: "create" | "delete";
};

const addButtonSchema = z.object({
  nama_kegiatan: z
    .string({ required_error: "Nama kegiatan harus diisi" })
    .min(1, "Nama kegiatan harus diisi")
    .max(255, "Nama kegiatan maksimal 255 karakter"),
  hari: z.date({ required_error: "Hari harus diisi" }),
  kuota: z.number({ required_error: "Kuota harus diisi" }),
  lokasi: z
    .string({ required_error: "Lokasi harus diisi" })
    .min(1, "Lokasi harus diisi")
    .max(255, "Lokasi maksimal 255 karakter"),
  deskripsi: z
    .string({ required_error: "Deskripsi harus diisi" })
    .min(1, "Deskripsi harus diisi")
    .max(255, "Deskripsi maksimal 255 karakter"),
  // logo: z.string({ required_error: "Logo harus diisi" }),
  // foto_kegiatan: z.string({ required_error: "Foto kegiatan harus diisi" }),
});

const StatePanitia = () => {
  const allowedEditIds = [1, 2, 3, 4];
  const mockUserIds = [1, 2, 3, 4]; //untuk bph, charta, actus, scriptum dan kalau masukin id lainnya seperti [5, 6, dst] tidak akan muncul delete dan add button
  const user = { ids: mockUserIds };

  const [modalState, setModalState] = useState<ModalState | undefined>();

  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StateDataFillable>({
    resolver: zodResolver(addButtonSchema),
  });

  // const OverlayOne = () => (
  //   <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  // );

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [overlay, setOverlay] = React.useState(<OverlayOne />);

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
              <form
                id="add-data"
                onSubmit={handleSubmit((data) => {
                  if (Object.keys(errors).length === 0) {
                    console.log(data);
                    toast({
                      title: "Created",
                      description: `Kegiatan ${data.nama_kegiatan} has been created`,
                      status: "success",
                    });
                    setModalState(undefined);
                  } else {
                    console.error("Form errors:", errors);
                  }
                })}
              >
                <Stack spacing={4}>
                  {/* NAMA ORGANISASI START */}
                  <FormControl isInvalid={!!errors.nama_kegiatan}>
                    <FormLabel>Nama</FormLabel>

                    <Input
                      placeholder="Nama Organisasi"
                      {...register("nama_kegiatan")}
                      type="text"
                    />

                    <FormErrorMessage>
                      {errors.nama_kegiatan && errors.nama_kegiatan.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* NAMA ORGANISASI END */}

                  {/* HARI START */}
                  <FormControl isInvalid={!!errors.hari}>
                    <FormLabel>Hari</FormLabel>

                    <Input
                      placeholder="Hari"
                      {...register("hari", {
                        valueAsDate: true,
                      })}
                      type="date"
                    />

                    <FormErrorMessage>
                      {errors.hari && errors.hari.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* HARI END */}

                  {/* KUOTA START */}
                  <FormControl isInvalid={!!errors.kuota}>
                    <FormLabel>Kuota</FormLabel>

                    <Input
                      placeholder="Kuota"
                      {...register("kuota", {
                        valueAsNumber: true,
                      })}
                      type="number"
                    />

                    <FormErrorMessage>
                      {errors.kuota && errors.kuota.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* KUOTA END */}

                  {/* LOKASI START */}
                  <FormControl isInvalid={!!errors.lokasi}>
                    <FormLabel>Lokasi</FormLabel>

                    <Input
                      placeholder="Lokasi"
                      {...register("lokasi")}
                      type="text"
                    />

                    <FormErrorMessage>
                      {errors.lokasi && errors.lokasi.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* LOKASI END */}

                  {/* DESKRIPSI START */}
                  <FormControl isInvalid={!!errors.deskripsi}>
                    <FormLabel>Deskripsi</FormLabel>

                    <Input
                      placeholder="Deskripsi"
                      {...register("deskripsi")}
                      type="text"
                    />

                    <FormErrorMessage>
                      {errors.deskripsi && errors.deskripsi.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* DESKRIPSI END */}

                  {/* LOGO ORGANISASI START */}
                  {/* <FormControl isInvalid={!!errors.logo}>
                    <FormLabel>Logo</FormLabel>

                    <Input
                      placeholder="Logo Organisasi"
                      {...register("logo")}
                      type="file"
                    />

                    <FormErrorMessage>
                      {errors.logo && errors.logo.message}
                    </FormErrorMessage>
                  </FormControl> */}
                  {/* LOGO ORGANISASI END */}

                  {/* FOTO KEGIATAN START */}
                  {/* <FormControl isInvalid={!!errors.foto_kegiatan}>
                    <FormLabel>Foto Kegiatan</FormLabel>

                    <Input
                      placeholder="Foto Kegiatan"
                      {...register("foto_kegiatan")}
                      type="file"
                    />

                    <FormErrorMessage>
                      {errors.foto_kegiatan && errors.foto_kegiatan.message}
                    </FormErrorMessage>
                  </FormControl> */}
                  {/* FOTO KEGIATAN END */}
                </Stack>
              </form>
            )}
          </ModalBody>

          <ModalFooter>
            {modalState?.mode === "delete" && (
              <Button
                colorScheme="red"
                type="submit"
                form="delete-data"
                onClick={() => {
                  console.log("Data deleted");
                  //nanti implementasi dari backend
                  toast({
                    title: "Deleted",
                    description: `Data has been deleted`,
                    status: "error",
                  });
                  setModalState(undefined);
                }}
              >
                Delete
              </Button>
            )}

            {modalState?.mode === "create" && (
              <Button
                colorScheme="blue"
                type="submit"
                form="add-data"
                // onClick={() => {
                //   // console.log("Data added");
                //   setModalState(undefined);
                // }}
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
