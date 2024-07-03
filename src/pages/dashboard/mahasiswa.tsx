import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Show,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataTable from "../../components/datatables";
// import { MUIDataTableColumn } from "mui-datatables";
// import { useEffect, useState } from "react";
// import { Button as MuiButton } from "@mui/material";
// import useAuth from "@/hooks/useAuth";
// import { useNavigate } from "@/router";
// import useSWR from "swr";
// import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
// import { z } from "zod";
// import { Controller, useForm } from "react-hook-form";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const getStatusState = (text: string, status: boolean) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {text}{" "}
      {status ? (
        <BsCheckCircleFill color="#36AD2C" style={{ marginLeft: "5px" }} />
      ) : (
        <BsXCircleFill color="#F43535" style={{ marginLeft: "5px" }} />
      )}
    </div>
  );
};

const getStatusMalpun = (status: boolean) => {
  return (
    <>
      {status ? (
        <BsCheckCircleFill color="#36AD2C" />
      ) : (
        <BsXCircleFill color="#F43535" />
      )}
    </>
  );
};

const mahasiswa = () => {
  const colDefs = [
    {
      name: "name",
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
      name: "state1",
      label: "STATE 1",
    },
    {
      name: "state2",
      label: "STATE 2",
    },
    {
      name: "malpun",
      label: "MalPun",
    },
  ];

  const data = [
    [
      "Alice Johnson",
      "12345",
      "alice@example.com",
      getStatusState("Marketing", true),
      getStatusState("Marketing", false),
      getStatusMalpun(false),
    ],
    [
      "Bob Smith",
      "23456",
      "bob@example.com",
      getStatusState("Sales", true),
      getStatusState("Sales", true),
      getStatusMalpun(false),
    ],
    [
      "Charlie Brown",
      "34567",
      "charlie@example.com",
      getStatusState("Engineering", false),
      getStatusState("Engineering", false),
      getStatusMalpun(false),
    ],
    [
      "David Lee",
      "45678",
      "david@example.com",
      getStatusState("Human Resources", true),
      getStatusState("Human Resources", true),
      getStatusMalpun(false),
    ],
    [
      "Eve Wilson",
      "56789",
      "eve@example.com",
      getStatusState("Finance", false),
      getStatusState("Finance", false),
      getStatusMalpun(false),
    ],
    [
      "Fiona Miller",
      "67890",
      "fiona@example.com",
      getStatusState("Marketing", true),
      getStatusState("Marketing", false),
      getStatusMalpun(false),
    ],
    [
      "George Clark",
      "78901",
      "george@example.com",
      getStatusState("Sales", true),
      getStatusState("Sales", true),
      getStatusMalpun(false),
    ],
    [
      "Hannah Davis",
      "89012",
      "hannah@example.com",
      getStatusState("Engineering", false),
      getStatusState("Engineering", false),
      getStatusMalpun(false),
    ],
    [
      "Ian Taylor",
      "90123",
      "ian@example.com",
      getStatusState("Human Resources", true),
      getStatusState("Human Resources", true),
      getStatusMalpun(false),
    ],
    [
      "Jessica White",
      "01234",
      "jessica@example.com",
      getStatusState("Finance", false),
      getStatusState("Finance", false),
      getStatusMalpun(false),
    ],
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
              <Link to={"/dashboard/mahasiswa"}>
                <BreadcrumbLink color={"brand.maroon"} fontWeight={"medium"}>
                  Mahasiswa
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </Show>
        {/* BREADCRUMB END */}

        {/* HEADER START */}
        <Heading fontFamily={"Poppins"} color={"text.primary"}>
          Mahasiswa
        </Heading>
        {/* HEADER END */}

        {/* CONTENT START */}
        <Stack bgColor={"white"} flex={1} shadow={"lg"} rounded={"xl"}>
          {data && <DataTable colDefs={colDefs} data={data} />}
        </Stack>
      </Stack>
    </>
  );
};

export default mahasiswa;
