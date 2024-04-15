import {
  Stack,
  Text,
  Heading,
  Image,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Show,
  Hide,
  Avatar,
  AvatarBadge,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

import { Outlet, useLocation, Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import DataTable from "../../components/datatables";
import { MUIDataTableColumn } from "mui-datatables";

const Panitia = () => {
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
      name: "divisi",
      label: "Divisi/Kategori",
    },
    {
      name: "id",
      label: "Action",
      //logic button
      //kalau selain Superadmin (BPH + Charta), Actus, Scriptum kolong actionnya hilang, nanti dibuat dua colDefs aja
    },
  ];

  const data = [
    ["Alice Johnson", "12345", "alice@example.com", "Marketing"],
    ["Bob Smith", "23456", "bob@example.com", "Sales"],
    ["Charlie Brown", "34567", "charlie@example.com", "Engineering"],
    ["David Lee", "45678", "david@example.com", "Human Resources"],
    ["Eve Wilson", "56789", "eve@example.com", "Finance"],
    ["Fiona Miller", "67890", "fiona@example.com", "Marketing"],
    ["George Clark", "78901", "george@example.com", "Sales"],
    ["Hannah Davis", "89012", "hannah@example.com", "Engineering"],
    ["Ian Taylor", "90123", "ian@example.com", "Human Resources"],
    ["Jessica White", "01234", "jessica@example.com", "Finance"],
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
              <Link to={"/dashboard/panitia"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Panitia
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </Show>
        {/* BREADCRUMB END */}

        {/* HEADER START */}
        <Heading fontFamily={"Poppins"} color={"text.primary"}>
          Panitia
        </Heading>
        {/* HEADER END */}

        {/* CONTENT START */}
        <Stack bgColor={"white"} flex={1} shadow={"lg"} p={25} rounded={"xl"}>
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Stack>
      </Stack>
    </>
  );
};

export default Panitia;
