import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Checkbox,
  Heading,
  Stack,
  Text,
  Show,
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";
import Switch from "@mui/material/Switch";
import { Button as MuiButton } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { useState } from "react";

type ModalState = {
  id?: number;
  mode: "delete";
};

const BsCheckCircleFilled = () => <BsCheckCircleFill color="green" size={20} />;
const BsXCircleFilled = () => <BsXCircleFill color="red" size={20} />;

interface CheckingProps {
  isChecked: boolean;
}

const Checking: React.FC<CheckingProps> = (props) => {
  const { isChecked } = props;
  return <>{isChecked ? <BsCheckCircleFilled /> : <BsXCircleFilled />}</>;
};

const Malpun = () => {
  const [modalState, setModalState] = useState<ModalState | undefined>();
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
      name: "email",
      label: "Email",
    },
    {
      name: "kehadiran",
      label: "Kehadiran",
      options: {
        customBodyRender: (value) => {
          return (
            <Checkbox checked={value} icon={<Checking isChecked={value} />} />
          );
        },
      },
    },
  ];

  const data = [
    ["Joe James", "12345", "Yonkers@student.umn.ac.id", "NY"],
    ["John Walsh", "12346", "Hartford@student.umn.ac.id", "CT"],
    ["Bob Herm", "12347", "Tampa@student.umn.ac.id", "FL"],
    ["James Houston", "12348", "Dallas@student.umn.ac.id", "TX"],
    ["Joe James", "12349", "Yonkers@student.umn.ac.id", "NY"],
    ["John Walsh", "12350", "Hartford@student.umn.ac.id", "CT"],
    ["Bob Herm", "12351", "Tampa@student.umn.ac.id", "FL"],
    ["James Houston", "12352", "Dallas@student.umn.ac.id", "TX"],
    ["Joe James", "12353", "Yonkers@student.umn.ac.id", "NY"],
    ["John Walsh", "12354", "Hartford@student.umn.ac.id", "CT"],
    ["Bob Herm", "12355", "Tampa@student.umn.ac.id", "FL"],
    ["James Houston", "12356", "Dallas@student.umn.ac.id", "TX"],
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
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Box>
      </Stack>
    </>
  );
};

export default Malpun;
