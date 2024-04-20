import { Heading, Text, Stack, Show, Image} from "@chakra-ui/react";
import iconPanitia from "../../../public/icons/iconPanitia.png";
import iconMahasiswa from "../../../public/icons/iconMahasiswa.png";
import iconSTATE from "../../../public/icons/iconSTATE.png";
import iconMalPun from "../../../public/icons/iconMalPun.png";
const Dashboard = () => {
  return (
    <>
      <Stack flex={1}>
        <Show above={"mt"}>
          <Heading fontFamily={"Poppins"} color={"text.primary"} >
            Dashboard
          </Heading>
        </Show>
        <Stack bgColor={"white"} flex={1} shadow={"lg"} p={25} rounded={"xl"}>
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8} >
            Selamat datang, <strong>John Ryan R.</strong> 🤩
          </Text>
          {/* TAB CARDS START */}
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8} m={1} marginTop={5}>
            Tab
          </Text>
          <Stack direction={"row"} spacing={2}>
            {/* CARD 1 START */}
            <Stack direction={"column"} spacing={6}>
              <Stack
                bgColor="orange"
                w={"200px"}
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
                    Panitia
                  </Text>
                  
                  <Image src={iconPanitia}></Image>
                  {/* Fixed the alt prop */}
                  
                </Stack>

                <Text fontWeight={"bold"} fontSize={"3xl"}>
                  249
                </Text>
              </Stack>
            </Stack>{" "}
            {/* CARD 1 END */}
            {/* CARD 2 START */}
            <Stack direction={"row"} spacing={6}>
              <Stack
                bgColor="yellow.200"
                w={"200px"}
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
                    Mahasiswa
                  </Text>

                  <Image src={iconMahasiswa}></Image>
                </Stack>

                <Text fontWeight={"bold"} fontSize={"3xl"}>
                  49
                </Text>
              </Stack>
            </Stack>{" "}
            {/* CARD 2 END */}
            {/* CARD 3 START */}
            <Stack direction={"row"} spacing={6}>
              <Stack
                bgColor="orange.300"
                w={"200px"}
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
                    STATE
                  </Text>

                  <Image src={iconSTATE}></Image>
                </Stack>

                <Text fontWeight={"bold"} fontSize={"3xl"}>
                  3409
                </Text>
              </Stack>
            </Stack>{" "}
            {/* CARD 3 END */}
            {/* CARD 4 START */}
            <Stack direction={"row"} spacing={6}>
              <Stack
                bgColor="orange.100"
                w={"200px"}
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
                    MalPun
                  </Text>

                  <Image src={iconMalPun}></Image>
                </Stack>

                <Text fontWeight={"bold"} fontSize={"3xl"}>
                  245
                </Text>
              </Stack>
            </Stack>{" "}
            {/* CARD 4 END */}
          </Stack>
          {/* TAB CARDS END */}
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8} m={1} marginTop={5}>
            Grafik
          </Text>
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8} m={6}>
            <strong>Mahasiswa / Peserta STATE</strong>
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
