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
  Divider,
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
  // Modal,
  useBreakpointValue,
  StackDirection,
} from "@chakra-ui/react";
import {
  MdCalendarToday,
  MdEdit,
  MdLocationOn,
  MdPeople,
} from "react-icons/md";
import {
  BsArrowLeftShort,
  BsCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
// import DataTable from "../../../components/datatables";
import DataTable2 from "../../../components/datatables2";
//import datatables tamnbahan untuk page yang index.tsx
import { MUIDataTableColumn } from "mui-datatables";
import { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import base from "node_modules/@emotion/styled/dist/declarations/types/base";
// import useAuth from "@/hooks/useAuth";

const isSuperadmin = (user: { role: string }) => {
  return user.role === "superadmin";
};

const isPanitia = (user: { role: string }) => {
  return user.role === "panitia";
};

const isOrganisator = (user: { role: string }) => {
  return user.role === "organisator";
};

const Organisator = () => {
  // const { user } = useAuth();

  // mock data dummy
  const mockUser = { role: "superadmin" };
  // const mockUser = { role: "organisator" };
  // const mockUser = { role: "panitia" };

  const user = mockUser;

  const [role, setRole] = useState<
    "superadmin" | "panitia" | "organisator" | null
  >(null);

  useEffect(() => {
    if (user) {
      if (isSuperadmin(user)) {
        setRole("superadmin");
      } else if (isOrganisator(user)) {
        setRole("organisator");
      } else if (isPanitia(user)) {
        setRole("panitia");
      }
    }
  }, [user]);

  type ModalState = {
    id?: number;
    mode: "edit" | "delete"; ///hanya bisa edit aja dengan ketentuan [superadmin: hari, kuota, lokasi] dan [organisator: nama, deskripsi, logo, foto kegiatan]
  };

  const [modalState, setModalState] = useState<ModalState | undefined>();

  // BREAKPOINT
  const headerDirection = useBreakpointValue({
    base: "column",
    md: "row",
  }) as StackDirection;

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "namastate",
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
      name: "kehadiran",
      label: "kehadiran",
    },
  ];

  const data = [
    ["Joe James", "12345", "joe@student.umn.ac.id", <BsCheckCircleFill />],
    [
      "John Walsh",
      "12346",
      "johnnydepp@student.umn.ac.id",
      <BsCheckCircleFill />,
    ],
    ["Bob Herm", "12347", "bob@student.umn.ac.id", <BsXCircleFill />],
    [
      "James Houston",
      "12348",
      "jamesHouston@student.umn.ac.id",
      <BsXCircleFill />,
    ],
    ["Joe James", "12349", "joejoe@student.umn.ac.id", <BsXCircleFill />],
    ["John Walsh", "12350", "john@student.umn.ac.id", <BsXCircleFill />],
    ["Bob Herm", "12351", "bobby@student.umn.ac.id", <BsXCircleFill />],
    ["James Houston", "12352", "jemes@student.umn.ac.id", <BsXCircleFill />],
    ["Joe James", "12353", "joeee@student.umn.ac.id", <BsXCircleFill />],
    ["John Walsh", "12354", "james@student.umn.ac.id", <BsXCircleFill />],
    ["Bob Herm", "12355", "bobby@student.umn.ac.id", <BsXCircleFill />],
    ["James Houston", "12356", "jhh@student.umn.ac.id", <BsXCircleFill />],
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
            {role === "organisator" && (
              <>
                <BreadcrumbItem>
                  <Link to={"/dashboard"}>
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      alignContent={"center"}
                    >
                      <BsArrowLeftShort />
                      <BreadcrumbLink>Back To Dashboard</BreadcrumbLink>
                    </Stack>
                  </Link>
                </BreadcrumbItem>
              </>
            )}
            {(role === "superadmin" || role === "panitia") && (
              <>
                <Breadcrumb fontWeight="medium" fontSize="sm">
                  <BreadcrumbItem>
                    <Link to={"/dashboard"}>
                      <BreadcrumbLink>Dashboard</BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link to={"/dashboard/state"}>
                      <BreadcrumbLink>Daftar State</BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <Link to={"/dashboard/state/[id]"}>
                      <BreadcrumbLink
                        color={"brand.maroon"}
                        fontWeight={"medium"}
                      >
                        Detail dan Peserta
                      </BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                </Breadcrumb>
              </>
            )}
          </Breadcrumb>

          {/* Header */}
          <Stack
            direction={"row"}
            gap={5}
            justifyContent={"space-between"}
            align={"center"}
            borderRadius={"2rem"}
          >
            <Stack direction={"row"} align={"center"} spacing={5}>
              <Heading fontFamily={"Poppins"} color={"text.primary"}>
                Detail dan Peserta
              </Heading>
              {role === "superadmin" && (
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

            {/* sunting button */}
            {(role === "superadmin" || role === "organisator") && (
              <Button
                leftIcon={<MdEdit />}
                colorScheme="blue"
                bgColor={"button.primary"}
                borderRadius={"full"}
                color={"white"}
                onClick={() => setModalState({ mode: "edit" })}
              >
                <Text color={"white"}> Sunting</Text>
              </Button>
            )}
          </Stack>
        </Show>
        {/* Content */}
        <Stack
          bgColor={"white"}
          w={"full"}
          // h={"full"}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
          flex={1}
        >
          <Stack
            mt={7}
            mx={7}
            direction={headerDirection}
            spacing={2}
            gap={10}
            justifyContent="center"
          >
            <Stack maxW="379px">
              <img src="/icons/imgplaceholder.png" alt="placeholderimage" />
            </Stack>
            <Stack
              divider={<Divider orientation="vertical" />}
              direction={headerDirection}
              my={7}
            >
              <Stack maxW="379px" mr={7}>
                <Heading size="lg">UKM 1</Heading>
                <Stack direction="row">
                  <MdCalendarToday />
                  <Text>Hari ke-1 (Kamis, 20 Agustus 2023)</Text>
                </Stack>
                <Stack direction="row">
                  <MdPeople />
                  <Text>40/100</Text>
                </Stack>
                <Stack direction="row">
                  <MdLocationOn />
                  <Text>Lecture Hall</Text>
                </Stack>
              </Stack>
              <Stack maxW="379px" ml={7}>
                <Heading size="md">Deskripsi</Heading>
                <Text fontSize="sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  rutrum mauris viverra ligula pulvinar blandit. Curabitur
                  molestie ante pretium lorem lacinia, a lacinia risus volutpat.
                  Fusce cursus pharetra quam ac rutrum. Nullam a velit non dui
                  ullamcorper ultricies ac id velit. Suspendisse ex donec.
                </Text>
              </Stack>
            </Stack>
          </Stack>

          {data && <DataTable2 colDefs={colDefs} data={data} />}
        </Stack>
      </Stack>
      {/* HEADER END */}

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
              <Text>Are you sure to delete? </Text>
            )}

            {modalState?.mode === "edit" && (
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
                    <FormLabel>Foto Kegiatan</FormLabel>

                    <Input
                      placeholder="Logo Organisasi"
                      // {...register("")}
                      type="file"
                    />

                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  {/* FOTO KEGIATAN END */}

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

                  {role === "superadmin" && (
                    <>
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
                    </>
                  )}
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

            {modalState?.mode === "edit" && (
              <Button
                colorScheme="blue"
                onClick={() => {
                  console.log("Data added");
                  setModalState(undefined);
                }}
              >
                Done
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
