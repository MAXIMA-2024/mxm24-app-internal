import { Stack, Text, Heading, Image, Button, Divider } from "@chakra-ui/react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";

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
        pb={8}
      >
        {/* Sidebar */}
        <Stack w={"full"}>
          <Link to="/dashboard">
            <Stack direction={"row"}>
              <Image src="logo.png" w={"2rem"} mr={"1rem"}></Image>
              <Heading
                fontFamily={"Poppins"}
                fontSize={"1.5rem"}
                fontWeight={"semibold"}
              >
                MAXIMA 2024
              </Heading>
            </Stack>
          </Link>
          <Stack w={"full"} mt={"2rem"} gap={"0.75rem"}>
            <Link to="/dashboard/verification">
              <Button
                variant={"ghost"}
                w={"full"}
                justifyContent={"start"}
                p={5}
              >
                <Image
                  src="icons/verification.png"
                  w={"1rem"}
                  mr={"1rem"}
                ></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  Verifikasi
                </Text>
              </Button>
            </Link>
            <Link to="/dashboard/toggles">
              <Button
                variant={"ghost"}
                w={"full"}
                justifyContent={"start"}
                p={5}
              >
                <Image src="icons/toggle.png" w={"1rem"} mr={"1rem"}></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  Toggles
                </Text>
              </Button>
            </Link>
            <Divider
              bgColor={"#EFEFEF"}
              height={"0.1rem"}
              mx={"-10"}
              w={"325px"}
            />
            <Link to="/dashboard">
              <Button
                variant={"ghost"}
                w={"full"}
                justifyContent={"start"}
                p={5}
              >
                <Image src="icons/dashboard.png" w={"1rem"} mr={"1rem"}></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  Dashboard
                </Text>
              </Button>
            </Link>
            <Link to="/dashboard/panitia">
              <Button
                variant={"ghost"}
                w={"full"}
                justifyContent={"start"}
                p={5}
              >
                <Image src="icons/panitia.png" w={"1rem"} mr={"1rem"}></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  Panitia
                </Text>
              </Button>
            </Link>
            <Link to="/dashboard/organisator">
              <Button
                variant={"ghost"}
                w={"full"}
                justifyContent={"start"}
                p={5}
              >
                <Image
                  src="icons/organisator.png"
                  w={"1rem"}
                  mr={"1rem"}
                ></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  Organisator
                </Text>
              </Button>
            </Link>
            <Link to="/dashboard/mahasiswa">
              <Button
                variant={"ghost"}
                w={"full"}
                justifyContent={"start"}
                p={5}
              >
                <Image src="icons/mahasiswa.png" w={"1rem"} mr={"1rem"}></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  Mahasiswa
                </Text>
              </Button>
            </Link>
            <Button
              variant={"ghost"}
              w={"full"}
              justifyContent={"space-between"}
              p={5}
            >
              <Stack direction={"row"}>
                <Image
                  src="icons/state.png"
                  w={"1.5rem"}
                  mr={"0.75rem"}
                ></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  State
                </Text>
              </Stack>
              <HiChevronDown />
            </Button>
            <Link to="/dashboard/malpun">
              <Button
                variant={"ghost"}
                w={"full"}
                justifyContent={"start"}
                p={5}
              >
                <Image src="icons/malpun.png" w={"1rem"} mr={"1rem"}></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  Malpun
                </Text>
              </Button>
            </Link>
            <Button
              variant={"ghost"}
              w={"full"}
              justifyContent={"space-between"}
              p={5}
            >
              <Stack direction={"row"}>
                <Image src="icons/qr.png" w={"1.5rem"} mr={"0.75rem"}></Image>
                <Text fontSize={"1rem"} fontWeight={"medium"}>
                  QR Scan
                </Text>
              </Stack>
              <HiChevronDown />
            </Button>
          </Stack>
        </Stack>
        <Stack w={"full"}>
          <Divider
            bgColor={"#EFEFEF"}
            height={"0.1rem"}
            mx={"-10"}
            w={"325px"}
          />
          <Button
            variant={"ghost"}
            w={"full"}
            justifyContent={"start"}
            p={0}
            mt={"1rem"}
          >
            <MdAccountCircle size={"3rem"} opacity={"0.75"} />
            <Stack
              justifyContent={"center"}
              alignItems={"start"}
              ml={"0.5rem"}
              gap={0}
            >
              <Text fontSize={"1rem"} fontWeight={"medium"}>
                John Ryan
              </Text>
              <Text fontSize={"0.75rem"} fontWeight={"medium"} opacity={"0.75"}>
                Charta
              </Text>
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
