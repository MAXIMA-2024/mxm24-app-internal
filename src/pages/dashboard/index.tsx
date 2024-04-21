import { Heading, Text, Stack, Show, Image, Hide } from "@chakra-ui/react";
import iconPanitia from "/icons/iconPanitia.png";
import iconMahasiswa from "/icons/iconMahasiswa.png";
import iconSTATE from "/icons/iconSTATE.png";
import iconMalPun from "/icons/iconMalPun.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Dashboard = () => {
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

  return (
    <>
      <style>
        {`.slider{
          // margin: 10px;

        }
        `}
      </style>
      <Stack flex={1} spacing={6}>
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
          w={["full", "full", "29rem", "40rem", "full"]}
        >
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8}>
            Selamat datang, <strong>John Ryan R.</strong> 🤩
          </Text>

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
            <Stack direction={"row"} spacing={6} overflow={"auto"}>
              {cardsData.map((data, index) => (
                <Stack key={index} direction={"column"} spacing={6}>
                  <Stack
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
                </Stack>
              ))}
            </Stack>
          </Show>
          {/* TAB CARDS END */}

          <Text
            fontWeight={"medium"}
            color={"text.primary"}
            opacity={0.8}
            m={1}
            marginTop={5}
          >
            Grafik
          </Text>
          <Text
            fontWeight={"medium"}
            color={"text.primary"}
            opacity={0.8}
            m={6}
          >
            <strong>Mahasiswa / Peserta STATE</strong>
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
