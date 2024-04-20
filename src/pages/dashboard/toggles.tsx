import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Tag,
  Show,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import Switch from "@mui/material/Switch";
import { useState } from "react";

interface Toggle {
  id: string;
  status: boolean;
}
const Toggles = () => {
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
          <Stack direction={"row"} gap={5}>
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
          {toggleData && <DataTable colDefs={colDefs} data={toggleData} />}
        </Box>
      </Stack>
    </>
  );
};

export default Toggles;
