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
} from "@chakra-ui/react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";

const DesktopLayout = () => {
  const loc = useLocation();
  const currentPath = loc.pathname;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const specialButtons = [
    {
      label: "Verifikasi",
      path: "/dashboard/verification",
      icon: "/icons/verification.png",
    },
    {
      label: "Toggles",
      path: "/dashboard/toggles",
      icon: "/icons/toggle.png",
    },
  ];

  const regularButtons = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "/icons/dashboard.png",
    },
    {
      label: "Panitia",
      path: "/dashboard/panitia",
      icon: "/icons/panitia.png",
    },
    {
      label: "Organisator",
      path: "/dashboard/organisator",
      icon: "/icons/organisator.png",
    },
    {
      label: "Mahasiswa",
      path: "/dashboard/mahasiswa",
      icon: "/icons/mahasiswa.png",
    },
    {
      label: "State",
      path: "/dashboard/state",
      icon: "/icons/state.png",
    },
    {
      label: "Malpun",
      path: "/dashboard/malpun",
      icon: "/icons/malpun.png",
    },
  ];

  const stateImageSize = {
    w: ["1rem", "1rem", "1.25rem", "1.75rem"],
  };

  const buttonResponsiveProps = {
    p: [3, 3, 3, 5],
    fontSize: ["0.75rem", "0.75rem", "0.85rem", "1rem"],
    imageSize: ["0.75rem", "0.75rem", "0.85rem", "1rem"],
  };

  return (
    <Stack
      bgGradient={"linear(to-b, white, #f7e8cb)"}
      minH={"100vh"}
      direction={"row"}
    >
      <Stack
        w={["20rem", "20rem", "15rem", "25rem"]}
        minH={"100vh"}
        bg={"white"}
        p={[5, 5, 8, 10]}
        alignItems={"center"}
        justifyContent={"space-between"}
        shadow={"lg"}
        pb={[6, 6, 6, 8]}
      >
        <Stack w={"full"}>
          {/* Heading */}
          <Link to="/dashboard">
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src="/logo.png"
                w={["1rem", "1rem", "1.25rem", "1.5rem"]}
                mr={["0.5rem", "0.5rem", "0.5rem", "1rem"]}
              ></Image>
              <Heading
                fontFamily={"Poppins"}
                fontSize={["1rem", "1rem", "0.8rem", "1.5rem"]}
                fontWeight={"semibold"}
                color={"text.primary"}
              >
                MAXIMA 2024
              </Heading>
            </Stack>
          </Link>
          {/* Heading */}

          <Stack
            w={"full"}
            mt={["1rem", "1rem", "1rem", "2rem"]}
            gap={["0.5rem", "0.5rem", "0.5rem", "0.75rem"]}
          >
            {/* Special Buttons */}
            {specialButtons.map((button, index) => (
              <Link key={index} to={button.path}>
                <Button
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"start"}
                  p={buttonResponsiveProps.p}
                  _hover={{
                    transform: "scale(1.05)",
                    color: "brand.maroon",
                    "> img": {
                      opacity: 1,
                      transition: "opacity 0.2s ease-in-out",
                    },
                  }}
                  transition={"transform 0.2s ease-in-out"}
                >
                  <Image
                    src={button.icon}
                    w={buttonResponsiveProps.imageSize}
                    mr={"1rem"}
                    opacity={currentPath === button.path ? 1 : 0.25}
                  ></Image>
                  <Text
                    fontSize={buttonResponsiveProps.fontSize}
                    fontWeight={"medium"}
                    color={
                      currentPath === button.path
                        ? "brand.maroon"
                        : "text.primary"
                    }
                  >
                    {button.label}
                  </Text>
                </Button>
              </Link>
            ))}
            {/* Special Buttons */}

            {/* Divider Special & Regular Buttons */}
            <Stack gap={0} direction={"row"}>
              <Divider
                bgColor={"#EFEFEF"}
                height={"0.1rem"}
                ml={["-5", "-5", "-8", "-10"]}
                w={"full"}
                my={1}
              />
              <Divider
                bgColor={"#EFEFEF"}
                height={"0.1rem"}
                mr={["-5", "-5", "-8", "-10"]}
                w={"full"}
                my={1}
              />
            </Stack>
            {/* Divider Special & Regular Buttons */}
            {regularButtons.map((button, index) => (
              <Link key={index} to={button.path}>
                <Button
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"start"}
                  p={buttonResponsiveProps.p}
                  _hover={{
                    transform: "scale(1.05)",
                    color: "brand.maroon",
                    "> img": {
                      opacity: 1,
                      transition: "opacity 0.2s ease-in-out",
                    },
                  }}
                  transition={"transform 0.2s ease-in-out"}
                >
                  <Image
                    src={button.icon}
                    w={
                      button.label === "State"
                        ? stateImageSize.w
                        : buttonResponsiveProps.imageSize
                    }
                    mr={button.label === "State" ? "0.75rem" : "1rem"}
                    opacity={currentPath === button.path ? 1 : 0.25}
                  ></Image>
                  <Text
                    fontSize={buttonResponsiveProps.fontSize}
                    fontWeight={"medium"}
                    color={
                      currentPath === button.path
                        ? "brand.maroon"
                        : "text.primary"
                    }
                  >
                    {button.label}
                  </Text>
                </Button>
              </Link>
            ))}

            {/* Dropdown QR */}
            <Menu>
              <MenuButton
                as={Button}
                variant={"ghost"}
                p={0}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                _hover={{
                  transform: "scale(1.05)",
                }}
                _active={{
                  transform: "scale(1.05)",
                }}
              >
                <Button
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"space-between"}
                  p={buttonResponsiveProps.p}
                >
                  <Stack direction={"row"}>
                    <Image
                      src="/icons/qr.png"
                      w={["1rem", "1rem", "1rem", "1.3rem"]}
                      mr={[0, 0, 0, "0.5rem"]}
                      opacity={
                        currentPath === "/dashboard/qrscanner/state" ||
                        currentPath === "/dashboard/qrscanner/malpun" ||
                        isHovered
                          ? 1
                          : 0.25
                      }
                      transition="opacity 0.2s ease-in-out"
                    />
                    <Text
                      fontSize={buttonResponsiveProps.fontSize}
                      fontWeight={"medium"}
                      color={
                        currentPath === "/dashboard/qrscanner/state" ||
                        currentPath === "/dashboard/qrscanner/malpun" ||
                        isHovered
                          ? "brand.maroon"
                          : "text.primary"
                      }
                      transition="opacity 0.2s ease-in-out"
                    >
                      QR Scan
                    </Text>
                  </Stack>
                  <HiChevronDown
                    color={
                      currentPath === "/dashboard/qrscanner/state" ||
                      currentPath === "/dashboard/qrscanner/malpun" ||
                      isHovered
                        ? "#720045"
                        : "#1E1D22"
                    }
                  />
                </Button>
              </MenuButton>

              <MenuList
                ml={[5, 5, 5, 10]}
                mr={[0, 0, 0, "-15rem"]}
                minWidth={"auto"}
              >
                <Link to="/dashboard/qrscanner/state">
                  <MenuItem
                    _hover={{
                      color: "brand.maroon",
                      "> img": {
                        opacity: 1,
                        transition: "opacity 0.2s ease-in-out",
                      },
                    }}
                    w={"full"}
                  >
                    <Image
                      src="/icons/qr.png"
                      w={"1rem"}
                      mr={"0.75rem"}
                      opacity={
                        currentPath === "/dashboard/qrscanner/state" ? 1 : 0.25
                      }
                    />
                    <Text
                      fontSize={"0.75rem"}
                      fontWeight={"medium"}
                      color={
                        currentPath === "/dashboard/qrscanner/state"
                          ? "brand.maroon"
                          : "text.primary"
                      }
                    >
                      STATE
                    </Text>
                  </MenuItem>
                </Link>
                <Link to="/dashboard/qrscanner/malpun">
                  <MenuItem
                    _hover={{
                      color: "brand.maroon",
                      "> img": {
                        opacity: 1,
                        transition: "opacity 0.2s ease-in-out",
                      },
                    }}
                    w={"full"}
                  >
                    <Image
                      src="/icons/qr.png"
                      w={"1rem"}
                      mr={"0.75rem"}
                      opacity={
                        currentPath === "/dashboard/qrscanner/malpun" ? 1 : 0.25
                      }
                    />
                    <Text
                      fontSize={"0.75rem"}
                      fontWeight={"medium"}
                      color={
                        currentPath === "/dashboard/qrscanner/malpun"
                          ? "brand.maroon"
                          : "text.primary"
                      }
                    >
                      Malpun
                    </Text>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
            {/* Dropdown QR */}
          </Stack>
        </Stack>
        <Stack w={"full"}>
          <Stack gap={0} direction={"row"}>
            <Divider
              bgColor={"#EFEFEF"}
              height={"0.1rem"}
              ml={["-5", "-5", "-8", "-10"]}
              w={"full"}
              my={1}
            />
            <Divider
              bgColor={"#EFEFEF"}
              height={"0.1rem"}
              mr={["-5", "-5", "-8", "-10"]}
              w={"full"}
              my={1}
            />
          </Stack>
          <Button
            variant={"ghost"}
            w={"full"}
            justifyContent={"start"}
            p={[0, 0, 0, 2]}
            mt={[0, 0, "0.75rem", "1rem"]}
            cursor={"default"}
            disabled={true}
            _hover={{
              pointerEvents: "none",
              draggable: "none",
            }}
          >
            {/* <MdAccountCircle size={"3rem"} opacity={"0.75"} /> */}
            <Avatar
              w={["2rem", "2rem", "2rem", "3rem"]}
              mr={"0.5rem"}
              h={"auto"}
            >
              <AvatarBadge boxSize="1.25rem" bg="green.500" />
            </Avatar>
            <Stack
              justifyContent={"center"}
              alignItems={"start"}
              ml={"0.5rem"}
              gap={0}
            >
              <Text
                fontSize={buttonResponsiveProps.fontSize}
                fontWeight={"medium"}
                color={"text.primary"}
              >
                John Ryan R.
              </Text>
              <Text
                fontSize={["0.5rem", "0.5rem", "0.5rem", "0.75rem"]}
                fontWeight={"medium"}
                opacity={"0.75"}
                color={"text.primary"}
              >
                CHARTA - Website
              </Text>
            </Stack>
          </Button>
        </Stack>
      </Stack>

      <Stack p={50} gap={"1rem"} w={"full"}>
        <Stack>
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};

const MobileLayout = () => {
  return (
    <Stack>
      <Text>Mobile Layout</Text>
    </Stack>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Show above="md">
        <DesktopLayout />
      </Show>
      <Hide above="md">
        <MobileLayout />
      </Hide>
    </>
  );
};

export default DashboardLayout;
