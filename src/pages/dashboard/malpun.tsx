import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Show,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "@/components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import { Checkbox as MuiCheckbox } from "@mui/material";
import useSWR from "swr";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import AbsenMalpun from "@/components/absen/malpun";

type PesertaMalpun = {
  id: number;
  code: string;
  name: string;
  email: string;
  attendance: boolean;
  attendanceTime: Date | null;
  status: "internal" | "external";
};

const Malpun = () => {
  const { data, isLoading, mutate } =
    useSWR<PesertaMalpun[]>(`/peserta/malpun`);
  const [codeAbsen, setCodeAbsen] = useState<string | undefined>();

  const auth = useAuth();

  const allowedAbsenIds = [1, 2, 4];

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value: string) =>
          value === "internal" ? "Internal" : "External",
      },
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "attendance",
      label: "Kehadiran",
      options: {
        customBodyRender: (attendance: boolean, tableMeta) => {
          return (
            // <Stack flex={1} align={"center"} justify={"center"}>
            <MuiCheckbox
              checked={attendance}
              disabled={
                attendance ||
                !(
                  auth.user?.role === "panitia" &&
                  allowedAbsenIds.includes(auth.user.data.divisiId)
                )
              }
              onChange={() => {
                const id = tableMeta.rowData[0] as number;

                const user = data?.find((u) => u.id === id);

                // implement disini
                setCodeAbsen(user?.code);
              }}
            />
            // </Stack>
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
              <Link to={"/dashboard/malpun"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Malpun
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Header */}
          <Stack direction={"row"} gap={5}>
            <Heading fontFamily={"Poppins"} color={"text.primary"}>
              Malpun
            </Heading>
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
          {isLoading && (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
          )}
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Box>
      </Stack>

      {codeAbsen && (
        <AbsenMalpun
          code={codeAbsen}
          setCode={setCodeAbsen}
          mutate={() => mutate()}
        />
      )}
    </>
  );
};

export default Malpun;
