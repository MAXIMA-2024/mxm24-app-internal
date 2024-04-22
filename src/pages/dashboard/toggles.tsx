import {
  Box,
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
  useDisclosure,
  useToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import Switch from "@mui/material/Switch";
import { MdDeleteForever } from "react-icons/md";
import MuiButton from "@mui/material/Button";
import { useState } from "react";
import React from "react";
import { z } from "zod";
// import { useToastErrorHandler } from "@/hooks/useApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface Toggle {
  id: string;
  status: boolean;
}

type Toggles = {
  id: number;
  nama_kegiatan: string;
  status: boolean;
};

type ModalToggles = {
  id?: number;
  mode: "create" | "delete";
};

type TogglesFillable = Pick<Toggles, "nama_kegiatan">;

const togglesSchema = z.object({
  nama_kegiatan: z
    .string({ required_error: "Nama kegiatan harus diisi" })
    .min(1, "Nama kegiatan harus diisi")
    .max(255, "Nama barang maksimal 255 karakter"),
  // .min(5, "Nama barang minimal 5 karakter"),
});

const Toggles = () => {
  // const errorHandler = useToastErrorHandler();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TogglesFillable>({
    resolver: zodResolver(togglesSchema),
  });

  // toggles useState
  const [modalToggles, setModalToggles] = useState<ModalToggles | undefined>();

  // Modal Blur Overlay
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const [toggleData, setToggleData] = useState<Toggle[]>([
    { id: "Register", status: true },
    { id: "HoME", status: false },
    { id: "STATE", status: false },
    { id: "Malam Puncak", status: false },
  ]);

  const updateValue = (id: string, checked: boolean) => {
    const updatedToggleData = toggleData.map((item) =>
      item.id === id ? { ...item, status: checked } : item
    );
    setToggleData(updatedToggleData);
  };

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "Toggle",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value: boolean, tableMeta) => {
          const { rowIndex } = tableMeta;
          return (
            <Switch
              checked={value}
              onChange={(e) =>
                updateValue(toggleData[rowIndex].id, e.target.checked)
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

      <Stack gap={7}>
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
                setOverlay(<OverlayOne />);
                // onOpen();
                setModalToggles({ mode: "create" });
              }}
              colorScheme="blue"
            >
              + Add Toggles
            </Button>
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
          {toggleData && <DataTable colDefs={colDefs} data={toggleData} />}
        </Box>
      </Stack>
      <Modal
        isCentered
        isOpen={!!modalToggles}
        onClose={() => setModalToggles(undefined)}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>
            {modalToggles?.mode === "create" ? "Add" : "Delete"} Toggles
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalToggles?.mode === "delete" && (
              <Text>
                Are you sure you want to delete {`${Toggles.name}`} toggle?
              </Text>
            )}

            {modalToggles?.mode === "create" && (
              <form
                id="add-toggles"
                onSubmit={handleSubmit((data) => {
                  if (Object.keys(errors).length === 0) {
                    console.log(data);
                    toast({
                      title: "Created",
                      description: `Kegiatan ${data.nama_kegiatan} has been created`,
                      status: "success",
                    });
                    onClose();
                    // API call logic here
                  } else {
                    console.error("Form errors:", errors);
                  }
                  // api
                  //   .post("/barang", data)
                  //   .then(() => {
                  //     toast({
                  //       title: "Created",
                  //       description: `Barang ${data.kode_sku} has been created`,
                  //       status: "success",
                  //     });
                  //   })
                  //   .catch(errorHandler)
                  //   .finally(() => {
                  //     mutate();
                  //     setModalState(undefined);
                  //   });
                })}
              >
                {/* kode_sku */}
                {/* <FormControl isInvalid={!!errors.kode_sku}>
                <FormLabel>Kode SKU</FormLabel>
                <Input
                  placeholder="Kode SKU"
                  {...register("kode_sku")}
                  type="text"
                />
                <FormErrorMessage>
                  {errors.kode_sku && errors.kode_sku.message}
                </FormErrorMessage>
              </FormControl> */}

                {/* nama_kegiatan */}
                <FormControl isInvalid={!!errors.nama_kegiatan}>
                  <FormLabel>Nama Kegiatan</FormLabel>
                  <Input
                    placeholder="Nama Kegiatan"
                    {...register("nama_kegiatan")}
                    type="text"
                  />
                  <FormErrorMessage>
                    {errors.nama_kegiatan && errors.nama_kegiatan.message}
                  </FormErrorMessage>
                </FormControl>

                {/* qty */}
                {/* <FormControl isInvalid={!!errors.qty}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  placeholder="Quantity"
                  {...register("qty", {
                    valueAsNumber: true,
                  })}
                  type="number"
                />
                <FormErrorMessage>
                  {errors.qty && errors.qty.message}
                </FormErrorMessage>
              </FormControl> */}

                {/* harga */}
                {/* <FormControl isInvalid={!!errors.harga}>
                <FormLabel>Harga</FormLabel>
                <Input
                  placeholder="Harga (dalam Rupiah)"
                  {...register("harga", {
                    valueAsNumber: true,
                  })}
                  type="number"
                />
                <FormErrorMessage>
                  {errors.harga && errors.harga.message}
                </FormErrorMessage>
              </FormControl> */}
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
                  console.log(modalToggles?.id);
                  // onClose();
                  setModalToggles(undefined);
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
