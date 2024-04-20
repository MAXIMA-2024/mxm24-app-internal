import { Heading, Text, Stack, Show} from "@chakra-ui/react";
import Image from "../../../public/icons/iconPanitia.png";
const Dashboard = () => {
  return (
    <>
      <Stack flex={1}>
        <Show above={"md"}>
          <Heading fontFamily={"Poppins"} color={"text.primary"}>
            Dashboard
          </Heading>
        </Show>
        <Stack bgColor={"white"} flex={1} shadow={"lg"} p={25} rounded={"xl"}>
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8}>
            Selamat datang, <strong>John Ryan R.</strong> 🤩
          </Text>
          ```{/* TAB CARDS START */}
          <Stack direction={"column"} spacing={2}>
            <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8}>
              Tab
            </Text>
            {/* CARD 1 START */}
            <Stack direction={"row"} spacing={6}>
              <Stack
                bgColor="orange"
                w={"250px"}
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

                  <Image src="/icons/iconPanitia.png" alt="Icon Panitia" />
                </Stack>

                <Text fontWeight={"bold"} fontSize={"3xl"}>
                  249
                </Text>
              </Stack>
            </Stack>{" "}
            {/* CARD 1 END */}
          </Stack>
          {/* TAB CARDS END */}```
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
