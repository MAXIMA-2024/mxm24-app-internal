import {
  Heading,
  Text,
  Stack,
  Show,
  Image,
  Hide,
  useToast,
} from "@chakra-ui/react";
import iconPanitia from "/icons/iconPanitia.svg";
import iconMahasiswa from "/icons/iconMahasiswa.svg";
import iconSTATE from "/icons/iconSTATE.svg";
import iconMalPun from "/icons/iconMalPun.svg";
import iconOrganisator from "/icons/iconOrganisator.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chart from "react-apexcharts";
import useAuth from "@/hooks/useAuth";
import useApi from "@/hooks/useApi";
import useSWR from "swr";
import { useEffect } from "react";
import StatisticCards from "@/components/statisticCards";

type DashboardPanitia = {
  panitia: number;
  mahasiswa: number;
  organisator: number;
  state: number;
  malpun: number;
};

type DashboardOrganisator = {
  stateOrganisator: number;
  mahasiswa: number;
};

// jadi kalau role nya panitia yang muncul itu ada stats jumlah panitia, mahasiswa, organisator, state, dan malpun

// jadi kalau role nya organisator yang muncul itu ada stats mahasiswa dan StateOrganisator

const Dashboard = () => {
  const auth = useAuth();

  const dashboardData = useSWR<DashboardPanitia & DashboardOrganisator>(
    auth.user?.role === "panitia"
      ? "/dashboard/panitia"
      : "/dashboard/organisator"
  );

  useEffect(() => {
    if (auth.status === "loading") {
      return;
    }
  }, [auth]);

  const cardsDataPanitia = [
    {
      nama: "Panitia",
      icon: iconPanitia,
      angka: dashboardData.data?.panitia,
      bgColor: "orange",
    },
    {
      nama: "Mahasiswa",
      icon: iconMahasiswa,
      angka: dashboardData.data?.mahasiswa,
      bgColor: "yellow.200",
    },
    {
      nama: "Organisator",
      icon: iconOrganisator,
      angka: dashboardData.data?.organisator,
      bgColor: "orange.200",
    },
    {
      nama: "STATE",
      icon: iconSTATE,
      angka: dashboardData.data?.state,
      bgColor: "orange.300",
    },
    { nama: "MalPun", icon: iconMalPun, angka: 0, bgColor: "orange.100" },
  ];

  const cardsDataOrganisator = [
    {
      nama: "State Organisator",
      icon: iconMahasiswa,
      angka: dashboardData.data?.stateOrganisator,
      bgColor: "yellow.200",
    },
    {
      nama: "Mahasiswa",
      icon: iconMahasiswa,
      angka: dashboardData.data?.mahasiswa,
      bgColor: "yellow.200",
    },
  ];

  //charts
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
  };

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories:
        auth.user?.role === "panitia"
          ? ["Panitia", "Mahasiswa", "Organisator", "State", "MalPun"]
          : ["State Organisator", "Mahasiswa"],
    },
    plotOptions: {
      bar: {
        distributed: true,
        dataLabels: {
          // position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: true,

      style: {
        fontSize: "1rem",
        colors: ["#1b2625"],
      },
    },
    colors: ["#f8a400", "#f8f082", "#fcebc6", "#f0ac4d", "#fcebc6"],
  };

  const series = [
    {
      name: "Jumlah Peserta",
      data:
        auth.user?.role === "panitia"
          ? [
              dashboardData.data?.panitia ?? 0,
              dashboardData.data?.mahasiswa ?? 0,
              dashboardData.data?.organisator ?? 0,
              dashboardData.data?.state ?? 0,
              0,
            ]
          : [
              dashboardData.data?.stateOrganisator ?? 0,
              dashboardData.data?.mahasiswa ?? 0,
            ],
    },
  ];

  return (
    <>
      <Stack flex={1} spacing={6} overflow={"hidden"}>
        <Show above={"md"}>
          <Heading fontFamily={"Poppins"} color={"text.primary"}>
            Dashboard
          </Heading>
        </Show>

        <Stack bgColor={"white"} flex={1} shadow={"lg"} p={25} rounded={"xl"}>
          <Stack>
            <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8}>
              Selamat datang,{" "}
              <strong>
                {(auth.user?.role === "panitia" ||
                  auth.user?.role === "organisator") &&
                  auth.user.data.name}
              </strong>{" "}
              🤩
            </Text>
          </Stack>

          <Stack>
            {/* TAB CARDS START */}
            <Text
              fontWeight={"medium"}
              color={"text.primary"}
              opacity={0.8}
              m={1}
              marginTop={5}
            >
              Tab
            </Text>

            <Hide above={"md"}>
              <Slider {...settings}>
                {cardsDataPanitia.map((data, index) => (
                  <Stack key={index} px={2}>
                    <Stack
                      bgColor={data.bgColor}
                      w={["full", "full", "225px"]}
                      h={"120px"}
                      borderRadius={15}
                      p={4}
                      flexDirection={"column"}
                      spacing={3}
                    >
                      <Stack
                        direction={"row"}
                        spacing={2}
                        justifyContent={"space-between"}
                      >
                        <Text fontWeight={"medium"} fontSize={"xl"}>
                          {data.nama}
                        </Text>
                        <Image src={data.icon} />
                      </Stack>
                      <Text fontWeight={"bold"} fontSize={"3xl"}>
                        {data.angka}
                      </Text>
                    </Stack>
                  </Stack>
                ))}
              </Slider>
            </Hide>

            <Show above="md">
              {/* sementara tunggu fix dari gian */}

              <Stack direction={"row"} spacing={6} overflow={"auto"}>
                {cardsDataPanitia.map((data) => (
                  <StatisticCards data={data} />
                ))}
              </Stack>
            </Show>
          </Stack>
          {/* TAB CARDS END */}

          {/* GRAFIK START */}
          <Stack w={"full"} h={["23rem", "23rem", "full", "full"]} mt={5}>
            <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8}>
              Grafik
            </Text>

            <Stack w={"full"} h={"full"} borderRadius={15} borderWidth={2}>
              <Text
                fontWeight={"medium"}
                color={"text.primary"}
                opacity={0.8}
                m={6}
              >
                <strong>Mahasiswa / Peserta STATE</strong>
              </Text>

              <Stack flex={1} overflow={"hidden"}>
                <Chart
                  options={options}
                  series={series}
                  type="bar"
                  width="100%"
                  height="80%"
                />
              </Stack>
            </Stack>
          </Stack>
          {/* GRAFIK END */}
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
