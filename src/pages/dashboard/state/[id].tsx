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
  // Modal,
} from "@chakra-ui/react";
import {
  MdCalendarToday,
  MdDeleteForever,
  MdInfo,
  MdLocationOn,
  MdPeople,
} from "react-icons/md";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import DataTable from "../../../components/datatables";
import DataTable2 from "../../../components/datatables2";
//import datatables tamnbahan untuk page yang index.tsx
import { MUIDataTableColumn } from "mui-datatables";
import { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
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
  // const mockUser = { role: "superadmin" };
  const mockUser = { role: "organisator" };
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

  let actionColumn: MUIDataTableColumn = {
    name: "",
  }; // init empty object

  //ini nanti ga ada, karena page yang daftar state ada di index.tsx
  if (role === "superadmin" || role === "panitia") {
    actionColumn = {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value: number) => {
          return (
            <Stack direction={"row"} gap={"1rem"}>
              {(role === "superadmin" || role === "panitia") && (
                <>
                  <Link to={`/details/${value}`}>
                    <MuiButton
                      variant={"contained"}
                      color={"primary"}
                      sx={{ borderRadius: "4rem" }}
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
                    }}
                    onClick={() => setModalState({ id: value, mode: "delete" })}
                  >
                    <MdDeleteForever />
                  </MuiButton>
                </>
              )}
            </Stack>
          );
        },
      },
    };
  }

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
    actionColumn,
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
            <BreadcrumbItem>
              <Link to={"/dashboard"}>
                <BreadcrumbLink>Dashboard</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={"/dashboard/state"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Daftar State
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Link to={"/dashboard/state/:id"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Detail dan Peserta
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Header */}
          <Stack direction={"row"} gap={5}>
            <Heading fontFamily={"Poppins"} color={"text.primary"}>
              Detail dan Peserta
            </Heading>
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
            direction="row"
            spacing={2}
            gap={10}
            justifyContent="center"
          >
            <Stack maxW="379px">
              <img src="/icons/imgplaceholder.png" alt="placeholderimage" />
            </Stack>
            <Stack divider={<Divider orientation="vertical" />} direction="row">
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
    </>
  );
};

export default Organisator;
