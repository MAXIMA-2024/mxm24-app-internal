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
import { MdDeleteForever, MdInfo } from "react-icons/md";
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
    mode: "edit"; ///hanya bisa edit aja dengan ketentuan [superadmin: hari, kuota, lokasi] dan [organisator: nama, deskripsi, logo, foto kegiatan]
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
      label: "Nama STATE",
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

      {/* page superadmin */}
      {(role === "superadmin" || role === "panitia") && (
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
                <Link to={"/dashboard/state/daftarstate"}>
                  <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                    Daftar STATE
                  </BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Header */}
            <Stack direction={"row"} gap={5}>
              <Heading fontFamily={"Poppins"} color={"text.primary"}>
                Daftar STATE
              </Heading>
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
            {data && <DataTable colDefs={colDefs} data={data} />}
          </Stack>
        </Stack>
      )}

      {/* page organisator biasa */}
      {role === "organisator" && (
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
              divider={<Divider orientation="vertical" />}
              spacing={2}
              gap={10}
              justifyContent="center"
            >
              <Stack maxW="379px">
                <img src="" alt="placeholderimage" />
              </Stack>
              <Stack maxW="379px">
                <Heading size="lg">UKM 1</Heading>
                <Text>Hari ke-1 (Kamis, 20 Agustus 2023)</Text>
                <Text>40/100</Text>
                <Text>Lecture Hall</Text>
              </Stack>
              <Stack maxW="379px">
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

            {data && <DataTable2 colDefs={colDefs} data={data} />}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Organisator;
