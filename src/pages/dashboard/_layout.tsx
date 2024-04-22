import { Stack, Text, Heading, Image, Button, Divider } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";

const DesktopLayout = () => {};

const MobileLayout = () => {};

const DashboardLayout = () => {
  const loc = useLocation();

  return (
    <Stack
      bgGradient={"linear(to-b, white, #f7e8cb)"}
      minH={"100vh"}
      direction={"row"}
    >
      <Stack
        w={"400px"}
        minH={"100vh"}
        bg={"white"}
        p={10}
        alignItems={"center"}
        justifyContent={"space-between"}
        shadow={"lg"}
      >
        {/* Sidebar */}
        <Stack w={"full"}>
          <Stack direction={"row"}>
            <Image src="/logoMaxima.svg" w={"2rem"}></Image>
            <Heading
              fontFamily={"Poppins"}
              fontSize={"1.5rem"}
              fontWeight={"semibold"}
            >
              MAXIMA 2024
            </Heading>
          </Stack>
          <Stack w={"full"} mt={"2rem"}>
            <Button variant={"ghost"} w={"full"} justifyContent={"start"} p={0}>
              <Image src="/logoMaxima.svg" w={"1rem"} mr={"1rem"}></Image>
              <Text fontSize={"1rem"}>Verifikasi</Text>
            </Button>
            <Button variant={"ghost"} w={"full"} justifyContent={"start"} p={0}>
              <Image src="/logoMaxima.svg" w={"1rem"} mr={"1rem"}></Image>
              <Text fontSize={"1rem"}>Toggles</Text>
            </Button>
            <Divider />
            <Button variant={"ghost"} w={"full"} justifyContent={"start"} p={0}>
              <Image src="/logoMaxima.svg" w={"1rem"} mr={"1rem"}></Image>
              <Text fontSize={"1rem"}>Dashboard</Text>
            </Button>
            <Button variant={"ghost"} w={"full"} justifyContent={"start"} p={0}>
              <Image src="/logoMaxima.svg" w={"1rem"} mr={"1rem"}></Image>
              <Text fontSize={"1rem"}>Tables</Text>
            </Button>
          </Stack>
        </Stack>
        <Stack w={"full"}>
          <Divider />
          <Button
            variant={"ghost"}
            w={"full"}
            justifyContent={"start"}
            p={0}
            mt={"1rem"}
          >
            <Image src="/logoMaxima.svg" w={"2rem"} mr={"1.5rem"}></Image>
            <Stack
              justifyContent={"center"}
              alignItems={"start"}
              gap={0}
              mb={"0.25rem"}
            >
              <Text fontSize={"1.25rem"} fontWeight={"bold"}>
                John Doe
              </Text>
              <Text fontSize={"0.75rem"}>Admin</Text>
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <Stack p={50} gap={"1rem"} w={"full"}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default DashboardLayout;
