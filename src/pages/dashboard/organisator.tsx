import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Tag,
  Show,
  // Modal,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
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
  const mockUser = { role: "superadmin" };
  // const mockUser = { role: "panitia" };
  // const mockUser = { role: "organisator" };
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
    mode: "create" | "delete"; // enum
  };

  const [modalState, setModalState] = useState<ModalState | undefined>();

  let actionColumn: MUIDataTableColumn = {
    name: "",
  }; // init empty object

  if (role === "superadmin" || role === "panitia") {
    actionColumn = {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value: number) => {
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
              {(role === "superadmin" || role === "panitia") && (
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
              )}
            </Stack>
          );
        },
      },
    };
  }

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "nama",
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
    },
    actionColumn,
  ];

  const data = [
    ["Joe James", "12345", "Yonkers@student.ac.id", "NY"],
    ["John Walsh", "12346", "Hartford@student.ac.id", "CT"],
    ["Bob Herm", "12347", "Tampa@student.ac.id", "FL"],
    ["James Houston", "12348", "Dallas@student.ac.id", "TX"],
    ["Joe James", "12349", "Yonkers@student.ac.id", "NY"],
    ["John Walsh", "12350", "Hartford@student.ac.id", "CT"],
    ["Bob Herm", "12351", "Tampa@student.ac.id", "FL"],
    ["James Houston", "12352", "Dallas@student.ac.id", "TX"],
    ["Joe James", "12353", "Yonkers@student.ac.id", "NY"],
    ["John Walsh", "12354", "Hartford@student.ac.id", "CT"],
    ["Bob Herm", "12355", "Tampa@student.ac.id", "FL"],
    ["James Houston", "12356", "Dallas@student.ac.id", "TX"],
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
          w={"full"}
          // h={"full"}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
        >
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Box>
      </Stack>
    </>
  );
};

export default Organisator;
