import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";

const Verification = () => {
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
  ];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  return (
    <>
      <Stack gap={7}>
        {/* Breadcrumb */}
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

        {/* Content */}
        <Box
          bgColor={"white"}
          w={"full"}
          // h={"70vh"}
          shadow={"lg"}
          // p={25}
          rounded={"xl"}
          overflow={"auto"}
        >
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Box>
      </Stack>
    </>
  );
};

export default Verification;
