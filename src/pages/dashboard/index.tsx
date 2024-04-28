import { Heading, Text, Stack, Show, Image, Hide } from "@chakra-ui/react";
import iconPanitia from "/icons/iconPanitia.png";
import iconMahasiswa from "/icons/iconMahasiswa.png";
import iconSTATE from "/icons/iconSTATE.png";
import iconMalPun from "/icons/iconMalPun.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chart from "react-apexcharts";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const auth = useAuth();

  const cardsData = [
    { nama: "Panitia", icon: iconPanitia, angka: 249, bgColor: "orange" },
    {
      nama: "Mahasiswa",
      icon: iconMahasiswa,
      angka: 49,
      bgColor: "yellow.200",
    },
    { nama: "STATE", icon: iconSTATE, angka: 3409, bgColor: "orange.300" },
    { nama: "MalPun", icon: iconMalPun, angka: 245, bgColor: "orange.100" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
  };

  const series = [
    {
      name: "Jumlah Peserta",
      data: [30, 40, 45, 50],
    },
  ];

  return (
    <>
      <style>
        {`
        `}
      </style>
      <Stack flex={1} spacing={6} overflow={"hidden"}>
        <Show above={"md"}>
          <Heading fontFamily={"Poppins"} color={"text.primary"}>
            Dashboard
          </Heading>
        </Show>

        <Stack
          bgColor={"white"}
          flex={1}
          shadow={"lg"}
          p={25}
          rounded={"xl"}
          flexDirection={"column"}
          // w={["full", "full", "29rem", "40rem", "full"]}
        >
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
          <Stack w={"full"}>
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
                {cardsData.map((data, index) => (
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
              <Stack
                direction={"row"}
                w={"full"}
                spacing={6}
                overflow={"scroll"}
                wrap={"wrap"}
              >
                {cardsData.map((data, index) => (
                  <Stack
                    key={index}
                    bgColor={data.bgColor}
                    w={["275px", "350px", "225px", "225px"]}
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
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    xaxis: {
                      categories: ["Panitia", "Mahasiswa", "State", "MalPun"],
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
                    colors: ["#f8a400", "#f8f082", "#f0ac4d", "#fcebc6"],
                  }}
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
