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
  useToast,
} from "@chakra-ui/react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
// import { MdAccountCircle } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";

const superadmin = [1, 2]; // BPH, Charta

const DesktopLayout = () => {
  const loc = useLocation();
  const currentPath = loc.pathname;
  const auth = useAuth();

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
    // {
    //   label: "Dashboard",
    //   path: "/dashboard",
    //   icon: "/icons/dashboard.png",
    // },
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
      label: "STATE",
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

  const bgImage = currentPath.includes("qrscanner")
    ? "/bg/bg-desktop-all.png"
    : currentPath === "/dashboard/malpun"
    ? "/bg/bg-desktop-malpun.png"
    : currentPath.includes("state")
    ? "/bg/bg-desktop-state.png"
    : "/bg/bg-desktop-brick.png";

  return (
    <Stack
      bgImage={`url('${bgImage}')`}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      bgPos={"right"}
      minH={"100vh"}
      minW={"100vw"}
      gap={0}
      direction={"row"}
      overflow={"scroll"}
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
            // overflowY={"auto"}
          >
            {auth.user?.role === "panitia" &&
              superadmin.includes(auth.user.data.divisiId) && (
                <>
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
                          bgColor: "button.gray",
                        }}
                        transition={"transform 0.2s ease-in-out"}
                        bgColor={
                          loc.pathname === button.path
                            ? "button.gray"
                            : "transparent"
                        }
                      >
                        <Image
                          src={button.icon}
                          w={buttonResponsiveProps.imageSize}
                          mr={"1rem"}
                          opacity={currentPath === button.path ? 1 : 0.25}
                        ></Image>
                        <Text
                          fontSize={buttonResponsiveProps.fontSize}
                          fontWeight={
                            currentPath === button.path ? "semibold" : "medium"
                          }
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
                </>
              )}

            {/* Divider Special & Regular Buttons */}

            <Link to={`/dashboard`}>
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
                  bgColor: "button.gray",
                }}
                transition={"transform 0.2s ease-in-out"}
                bgColor={
                  loc.pathname === "/dashboard" ? "button.gray" : "transparent"
                }
              >
                <Image
                  src={"/icons/dashboard.png"}
                  w={buttonResponsiveProps.imageSize}
                  mr={"0.75rem"}
                  opacity={currentPath === "/dashboard" ? 1 : 0.25}
                ></Image>
                <Text
                  fontSize={buttonResponsiveProps.fontSize}
                  fontWeight={
                    currentPath === "/dashboard" ? "semibold" : "medium"
                  }
                  color={
                    currentPath === "/dashboard"
                      ? "brand.maroon"
                      : "text.primary"
                  }
                >
                  Dashboard
                </Text>
              </Button>
            </Link>

            {auth.user?.role === "organisator" && (
              <Link to={`/dashboard/state/${auth.user.data.stateId}`}>
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
                    bgColor: "button.gray",
                  }}
                  transition={"transform 0.2s ease-in-out"}
                  bgColor={
                    loc.pathname.includes("/dashboard/state")
                      ? "button.gray"
                      : "transparent"
                  }
                >
                  <Image
                    src={"/icons/state.png"}
                    w={stateImageSize.w}
                    mr={"0.75rem"}
                    opacity={
                      currentPath.includes("/dashboard/state") ? 1 : 0.25
                    }
                  ></Image>
                  <Text
                    fontSize={buttonResponsiveProps.fontSize}
                    fontWeight={
                      currentPath.includes("/dashboard/state")
                        ? "semibold"
                        : "medium"
                    }
                    color={
                      currentPath.includes("/dashboard/state")
                        ? "brand.maroon"
                        : "text.primary"
                    }
                  >
                    STATE
                  </Text>
                </Button>
              </Link>
            )}

            {auth.user?.role !== "organisator" &&
              regularButtons.map((button, index) => (
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
                      bgColor: "button.gray",
                    }}
                    transition={"transform 0.2s ease-in-out"}
                    bgColor={
                      loc.pathname.includes(button.path)
                        ? "button.gray"
                        : "transparent"
                    }
                  >
                    <Image
                      src={button.icon}
                      w={
                        button.label === "State"
                          ? stateImageSize.w
                          : buttonResponsiveProps.imageSize
                      }
                      mr={button.label === "State" ? "0.75rem" : "1rem"}
                      opacity={currentPath.includes(button.path) ? 1 : 0.25}
                    ></Image>
                    <Text
                      fontSize={buttonResponsiveProps.fontSize}
                      fontWeight={
                        currentPath.includes(button.path)
                          ? "semibold"
                          : "medium"
                      }
                      color={
                        currentPath.includes(button.path)
                          ? "brand.maroon"
                          : "text.primary"
                      }
                    >
                      {button.label}
                    </Text>
                  </Button>
                </Link>
              ))}

            {/* QR Button */}
            {auth.user?.role === "panitia" &&
              [1, 2, 4].includes(auth.user.data.divisiId) && (
                <Box
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                  transition={"transform 0.2s ease-in-out"}
                >
                  <Accordion
                    allowToggle
                    gap={0}
                    index={loc.pathname.includes("/qrscanner/") ? 0 : undefined}
                  >
                    <AccordionItem border={"none"}>
                      {({ isExpanded }) => (
                        <>
                          <AccordionButton
                            _hover={{
                              "> div > img": {
                                opacity: 1,
                                transition: "opacity 0.2s ease-in-out",
                              },
                              bgColor: "button.gray",
                            }}
                            w={"full"}
                            bgColor={
                              loc.pathname.includes("qrscanner") || isExpanded
                                ? "button.gray"
                                : "transparent"
                            }
                            roundedTop={"md"}
                            roundedBottom={!isExpanded ? "md" : "none"}
                          >
                            <Stack
                              direction={"row"}
                              flex={1}
                              align={"center"}
                              justify={"start"}
                              px={"0.5"}
                            >
                              <Image
                                src="/icons/qr.png"
                                w={["1rem", "1rem", "1rem", "1.3rem"]}
                                mr={[0, 0, 0, "0.5rem"]}
                                opacity={
                                  currentPath ===
                                    "/dashboard/qrscanner/state" ||
                                  currentPath ===
                                    "/dashboard/qrscanner/malpun" ||
                                  isExpanded
                                    ? 1
                                    : 0.25
                                }
                                transition="opacity 0.2s ease-in-out"
                              />
                              <Text
                                fontSize={buttonResponsiveProps.fontSize}
                                fontWeight={
                                  currentPath ===
                                    "/dashboard/qrscanner/state" ||
                                  currentPath ===
                                    "/dashboard/qrscanner/malpun" ||
                                  isExpanded
                                    ? "semibold"
                                    : "medium"
                                }
                                color={
                                  currentPath ===
                                    "/dashboard/qrscanner/state" ||
                                  currentPath ===
                                    "/dashboard/qrscanner/malpun" ||
                                  isExpanded
                                    ? "brand.maroon"
                                    : "text.primary"
                                }
                                transition="opacity 0.2s ease-in-out"
                              >
                                QR Scan
                              </Text>
                              <Icon
                                as={HiChevronDown}
                                w={6}
                                h={6}
                                color={"brand.maroon"}
                                ml={"auto"}
                                transform={isExpanded ? "rotate(180deg)" : ""}
                                transition={"transform 0.2s ease-in-out"}
                              />
                            </Stack>
                          </AccordionButton>
                          <AccordionPanel
                            w={"full"}
                            bgColor={"button.gray"}
                            _hover={{
                              color: "brand.maroon",
                              "> img": {
                                opacity: 1,
                                transition: "opacity 0.2s ease-in-out",
                              },
                            }}
                            roundedBottom={"md"}
                            transition={"transform 0.2s ease-in-out"}
                          >
                            <Link to="/dashboard/qrscanner/state">
                              <Button
                                justifyContent={"start"}
                                variant={"ghost"}
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
                                    currentPath === "/dashboard/qrscanner/state"
                                      ? 1
                                      : 0.25
                                  }
                                />
                                <Text
                                  fontSize={"0.75rem"}
                                  fontWeight={
                                    currentPath === "/dashboard/qrscanner/state"
                                      ? "semibold"
                                      : "medium"
                                  }
                                  color={
                                    currentPath === "/dashboard/qrscanner/state"
                                      ? "brand.maroon"
                                      : "text.primary"
                                  }
                                >
                                  STATE
                                </Text>
                              </Button>
                            </Link>
                            <Link to="/dashboard/qrscanner/malpun">
                              <Button
                                justifyContent={"start"}
                                variant={"ghost"}
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
                                    currentPath ===
                                    "/dashboard/qrscanner/malpun"
                                      ? 1
                                      : 0.25
                                  }
                                />
                                <Text
                                  fontSize={"0.75rem"}
                                  fontWeight={
                                    currentPath ===
                                    "/dashboard/qrscanner/malpun"
                                      ? "semibold"
                                      : "medium"
                                  }
                                  color={
                                    currentPath ===
                                    "/dashboard/qrscanner/malpun"
                                      ? "brand.maroon"
                                      : "text.primary"
                                  }
                                >
                                  Malpun
                                </Text>
                              </Button>
                            </Link>
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                </Box>
              )}
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
          <Menu>
            <MenuButton>
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
                  overflow={"hidden"}
                >
                  <Text
                    fontSize={buttonResponsiveProps.fontSize}
                    fontWeight={"semibold"}
                    color={"text.primary"}
                    noOfLines={1}
                    isTruncated={true}
                    textOverflow={"ellipsis"}
                  >
                    {auth.user?.role !== "unknown" && auth.user?.data.name}
                  </Text>
                  <Text
                    fontSize={["0.5rem", "0.5rem", "0.5rem", "0.75rem"]}
                    fontWeight={"medium"}
                    opacity={"0.75"}
                    color={"text.primary"}
                  >
                    {auth.user?.role === "panitia" &&
                      auth.user.data.divisi.name}
                    {auth.user?.role === "organisator" &&
                      auth.user.data.state.name}
                  </Text>
                </Stack>
              </Button>
            </MenuButton>
            <MenuList px={2} shadow={"lg"} borderRadius={"xl"}>
              <Button
                bg={"status.error"}
                p={2}
                py={0}
                fontSize={["0.8rem", "0.8rem", "0.85rem", "1rem"]}
                borderRadius={"xl"}
                color={"white"}
                fontWeight={"medium"}
                gap={2}
                w={"full"}
                justifyContent={"center"}
                onClick={auth.logout}
              >
                <IoLogOutOutline
                  color="white"
                  fontSize={"1.25rem"}
                  fontWeight={"bold"}
                />
                Log Out
              </Button>
            </MenuList>
          </Menu>
        </Stack>
      </Stack>

      <Stack p={50} gap={"1rem"} flex={1}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

const MobileLayout = () => {
  const loc = useLocation();
  const currentPath = loc.pathname;
  const auth = useAuth();

  const currentPageName =
    auth.user?.role === "panitia" && currentPath.includes("/dashboard/state")
      ? "Detail & Peserta"
      : auth.user?.role === "organisator" &&
        currentPath.includes("/dashboard/state")
      ? auth.user.data.state.name
      : currentPath.charAt(currentPath.lastIndexOf("/") + 1).toUpperCase() +
        currentPath.slice(currentPath.lastIndexOf("/") + 2);

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isStatusMenuExpanded, setIsStatusMenuExpanded] = useState(false);
  const [isAcaraMenuExpanded, setIsAcaraMenuExpanded] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const acaraMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMenuOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuExpanded(false);
      }
    };

    const handleStatusMenuOutsideClick = (event: MouseEvent) => {
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target as Node)
      ) {
        setIsStatusMenuExpanded(false);
      }
    };

    const handleAcaraMenuOutsideClick = (event: MouseEvent) => {
      if (
        acaraMenuRef.current &&
        !acaraMenuRef.current.contains(event.target as Node)
      ) {
        setIsAcaraMenuExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleMenuOutsideClick);
    document.addEventListener("mousedown", handleStatusMenuOutsideClick);
    document.addEventListener("mousedown", handleAcaraMenuOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleMenuOutsideClick);
      document.removeEventListener("mousedown", handleStatusMenuOutsideClick);
      document.removeEventListener("mousedown", handleAcaraMenuOutsideClick);
    };
  }, []);

  const bgImageMobile =
    currentPath.includes("organisator") || currentPath.includes("mahasiswa")
      ? "/bg/bg-mobile-peserta-organisator.png"
      : currentPath === "/dashboard/malpun"
      ? "/bg/bg-desktop-malpun.png"
      : currentPath.includes("qrscanner")
      ? "/bg/bg-mobile-all.png"
      : currentPath.includes("state")
      ? "/bg/bg-mobile-state.png"
      : "/bg/bg-mobile-bricks.png";

  return (
    <Stack>
      {/* Top Bar */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        bg="white"
        boxShadow="md"
        zIndex={10}
        position="fixed"
        width={"100%"}
        p={3}
        px={5}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src="/logo.png"
            w={["1.25rem", "1.25rem", "1.25rem", "1.5rem"]}
            mr={["0.25rem", "0.25rem", "0.5rem", "1rem"]}
          ></Image>
          <Heading fontFamily={"Poppins"} fontSize={"0.8rem"}>
            {currentPath.includes("/qrscanner/")
              ? "QR Scan " + currentPageName
              : currentPageName}
          </Heading>
        </Stack>
        <Menu>
          <MenuButton>
            <Avatar
              w={["1.5rem", "1.5rem", "2rem", "3rem"]}
              mr={"0.5rem"}
              h={"auto"}
            >
              <AvatarBadge
                boxSize={["1rem", "1rem", "1rem", "1.25rem"]}
                bg="green.500"
              />
            </Avatar>
          </MenuButton>
          <MenuList borderRadius={"xl"} shadow={"lg"}>
            <Stack
              justifyContent={"center"}
              alignItems={"start"}
              ml={"0.5rem"}
              mr={"0.5rem"}
              gap={0}
            >
              <Text
                fontSize={["0.8rem", "0.8rem", "0.85rem", "1rem"]}
                fontWeight={"bold"}
                color={"text.primary"}
              >
                {auth.user?.role !== "unknown" && auth.user?.data.name}
              </Text>
              <Text
                fontSize={["0.6rem", "0.6rem", "0.6rem", "0.75rem"]}
                fontWeight={"medium"}
                opacity={"0.75"}
                color={"text.primary"}
              >
                {auth.user?.role === "panitia" && auth.user.data.divisi.name}
                {auth.user?.role === "organisator" && auth.user.data.state.name}
              </Text>
              <Button
                mt={2}
                bg={"status.error"}
                p={2}
                py={0}
                fontSize={["0.8rem", "0.8rem", "0.85rem", "1rem"]}
                borderRadius={"xl"}
                color={"white"}
                fontWeight={"medium"}
                gap={2}
                w={"full"}
                justifyContent={"center"}
                onClick={auth.logout}
              >
                <IoLogOutOutline
                  color="white"
                  fontSize={"1.25rem"}
                  fontWeight={"bold"}
                />
                Log Out
              </Button>
            </Stack>
          </MenuList>
        </Menu>
      </Stack>

      {/* Content */}
      <Stack
        // Ganti BG Image di Sini
        bgImage={`url('${bgImageMobile}')`}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPos={"center"}
        minH={"100vh"}
        minW={"100vw"}
        gap={0}
        pb={"4rem"}
      >
        <Stack p={25} pt={75} gap={"1rem"} flex={1}>
          <Outlet />
        </Stack>
      </Stack>

      {/* Bottom Bar */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
        p={2}
        px={4}
        bg="white"
        boxShadow="md"
        zIndex={10}
        position="fixed"
        bottom={0}
        width="100%"
        shadow={"bottomOutline"}
      >
        {/* Left */}
        {/* Super Admin */}
        <Menu>
          <MenuButton
            isDisabled={
              auth.user?.role !== "panitia" ||
              !superadmin.includes(auth.user?.data.divisiId)
            }
            ref={menuRef}
            as={Button}
            variant={"ghost"}
            p={0}
            _hover={{
              transform: "scale(1.05)",
            }}
            _active={{
              transform: "scale(1.05)",
              color: "brand.maroon",
              "> img": {
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
            _expanded={{
              transform: "scale(1.05)",
              color: "brand.maroon",
              "> img": {
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
            onClick={() => setIsMenuExpanded(!isMenuExpanded)}
          >
            <Button
              w={"full"}
              flexDirection={"column"}
              bg="white"
              p={0}
              gap={1}
              // onBlur={() => setIsMenuExpanded(false)}
            >
              <Image
                src="/icons/stateSunting.png"
                w={["1.6rem", "1.6rem", "1.25rem", "1.5rem"]}
                ml={["0.5rem", "0.5rem", "0.5rem", "1rem"]}
                opacity={
                  currentPath === "/dashboard/verification" ||
                  currentPath === "/dashboard/toggles" ||
                  isMenuExpanded
                    ? 1
                    : 0.25
                }
              />
              <Text
                fontSize={"0.4rem"}
                fontWeight={
                  currentPath === "/dashboard/verification" ||
                  currentPath === "/dashboard/toggles" ||
                  isMenuExpanded
                    ? "semibold"
                    : "medium"
                }
                color={
                  currentPath === "/dashboard/verification" ||
                  currentPath === "/dashboard/toggles" ||
                  isMenuExpanded
                    ? "brand.maroon"
                    : "text.primary"
                }
              >
                Super Admin
              </Text>
            </Button>
          </MenuButton>

          <MenuList minWidth={"auto"} rounded={"2xl"}>
            <Link to="/dashboard/verification">
              <MenuItem>
                <Image
                  src="/icons/verification.png"
                  w={"1rem"}
                  mr={"0.75rem"}
                  opacity={currentPath === "/dashboard/verification" ? 1 : 0.25}
                />
                <Text
                  fontSize={"0.75rem"}
                  fontWeight={
                    currentPath === "/dashboard/verification"
                      ? "semibold"
                      : "medium"
                  }
                  color={
                    currentPath === "/dashboard/verification"
                      ? "brand.maroon"
                      : "text.primary"
                  }
                >
                  Verifikasi
                </Text>
              </MenuItem>
            </Link>
            <Link to="/dashboard/toggles">
              <MenuItem>
                <Image
                  src="/icons/toggle.png"
                  w={"1rem"}
                  mr={"0.75rem"}
                  opacity={currentPath === "/dashboard/toggles" ? 1 : 0.25}
                />
                <Text
                  fontSize={"0.75rem"}
                  fontWeight={
                    currentPath === "/dashboard/toggles" ? "semibold" : "medium"
                  }
                  color={
                    currentPath === "/dashboard/toggles"
                      ? "brand.maroon"
                      : "text.primary"
                  }
                >
                  Toggle
                </Text>
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
        {/* Super Admin */}
        {/* Dashboard */}
        <Link to={"/dashboard"}>
          <Button
            bg="white"
            // mr={5}
            variant={"ghost"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            p={0}
            flexDirection={"column"}
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
              src="/icons/dashboard.png"
              w={["1.25rem", "1.25rem", "1.25rem", "1.5rem"]}
              opacity={currentPath === "/dashboard" ? 1 : 0.25}
            ></Image>
            <Text
              fontSize={"0.4rem"}
              fontWeight={currentPath === "/dashboard" ? "semibold" : "medium"}
              color={
                currentPath === "/dashboard" ? "brand.maroon" : "text.primary"
              }
            >
              Dashboard
            </Text>
          </Button>
        </Link>
        {/* Dashboard */}

        {/* Center */}
        {/* <Link to="/dashboard/qrscanner/state">
          <Stack gap={0} pos={"relative"} mt={-10} ml={-7} p={0}>
            <Button
              variant={"ghost"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
              p={4}
              py={"1.6rem"}
              flexDirection={"column"}
              _hover={{
                transform: "scale(1.05)",
                color: "brand.maroon",
                "> img": {
                  opacity: 1,
                  transition: "opacity 0.2s ease-in-out",
                },
              }}
              transition={"transform 0.2s ease-in-out"}
              borderWidth={"3px"}
              borderColor={"brand.maroon"}
              rounded={"full"}
              pos={"absolute"}
              bg="white"
            >
              <Image
                src="/icons/qr.png"
                w={["1.25rem", "1.25rem", "1.25rem", "1.5rem"]}
                opacity={
                  currentPath === "/dashboard/qrscanner/state" ? 1 : 0.25
                }
              ></Image>
              <Text
                fontSize={"0.5rem"}
                fontWeight={
                  currentPath === "/dashboard/qrscanner/state"
                    ? "semibold"
                    : "medium"
                }
                color={
                  currentPath === "/dashboard/qrscanner/state"
                    ? "brand.maroon"
                    : "text.primary"
                }
              >
                Scan
              </Text>
            </Button>
          </Stack>
        </Link> */}

        <Menu placement="top">
          <MenuButton
            isDisabled={
              auth.user?.role !== "panitia" ||
              ![1, 2, 4].includes(auth.user.data.divisiId)
            }
            ref={menuRef}
            as={Button}
            variant={"ghost"}
            p={0}
            _hover={{
              transform: "scale(1.05)",
            }}
            _active={{
              transform: "scale(1.05)",
              color: "brand.maroon",
              "> img": {
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
            _expanded={{
              transform: "scale(1.05)",
              color: "brand.maroon",
              "> img": {
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
          >
            <Stack
              gap={0}
              pos={"relative"}
              mt={-4}
              p={0}
              align={"center"}
              justify={"center"}
            >
              <Button
                variant={"ghost"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={1}
                p={4}
                py={"1.6rem"}
                flexDirection={"column"}
                _hover={{
                  transform: "scale(1.05)",
                  color: "brand.maroon",
                  "> img": {
                    opacity: 1,
                    transition: "opacity 0.2s ease-in-out",
                  },
                }}
                transition={"transform 0.2s ease-in-out"}
                borderWidth={"3px"}
                borderColor={"brand.maroon"}
                rounded={"full"}
                pos={"absolute"}
                bg="white"
              >
                <Image
                  src="/icons/qr.png"
                  w={["1.25rem", "1.25rem", "1.25rem", "1.5rem"]}
                  opacity={currentPath.includes("/qrscanner/") ? 1 : 0.25}
                ></Image>
                <Text
                  fontSize={"0.5rem"}
                  fontWeight={
                    currentPath.includes("/qrscanner/") ? "semibold" : "medium"
                  }
                  color={
                    currentPath.includes("/qrscanner/")
                      ? "brand.maroon"
                      : "text.primary"
                  }
                >
                  Scan
                </Text>
              </Button>
            </Stack>
          </MenuButton>

          <MenuList minWidth={"auto"} rounded={"2xl"} mb={"1.5rem"}>
            <Link to="/dashboard/qrscanner/state">
              <MenuItem>
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
                  fontWeight={
                    currentPath === "/dashboard/qrscanner/state"
                      ? "semibold"
                      : "medium"
                  }
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
              <MenuItem>
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
                  fontWeight={
                    currentPath === "/dashboard/qrscanner/malpun"
                      ? "semibold"
                      : "medium"
                  }
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

        {/* Right */}
        <Menu>
          <MenuButton
            isDisabled={auth.user?.role !== "panitia"}
            ref={statusMenuRef}
            as={Button}
            variant={"ghost"}
            p={0}
            // ml={5}
            _hover={{
              transform: "scale(1.05)",
            }}
            _active={{
              transform: "scale(1.05)",
              color: "brand.maroon",
              "> img": {
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
            _expanded={{
              transform: "scale(1.05)",
              color: "brand.maroon",
              "> img": {
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
            onClick={() => setIsStatusMenuExpanded(!isStatusMenuExpanded)}
          >
            <Button
              w={"full"}
              flexDirection={"column"}
              p={0}
              gap={1}
              bg="white"
            >
              <Image
                src="/icons/detailAndPeserta.png"
                w={["1.25rem", "1.25rem", "1.25rem", "1.5rem"]}
                opacity={
                  currentPath === "/dashboard/organisator" ||
                  currentPath === "/dashboard/panitia" ||
                  currentPath === "/dashboard/mahasiswa" ||
                  isStatusMenuExpanded
                    ? 1
                    : 0.25
                }
              />
              <Text
                fontSize={"0.4rem"}
                fontWeight={
                  currentPath === "/dashboard/organisator" ||
                  currentPath === "/dashboard/panitia" ||
                  currentPath === "/dashboard/mahasiswa" ||
                  isStatusMenuExpanded
                    ? "semibold"
                    : "medium"
                }
                color={
                  currentPath === "/dashboard/organisator" ||
                  currentPath === "/dashboard/panitia" ||
                  currentPath === "/dashboard/mahasiswa" ||
                  isStatusMenuExpanded
                    ? "brand.maroon"
                    : "text.primary"
                }
              >
                Status
              </Text>
            </Button>
          </MenuButton>

          <MenuList minW={"auto"} rounded={"2xl"}>
            <Link to="/dashboard/panitia">
              <MenuItem>
                <Image
                  src="/icons/panitia.png"
                  w={"1rem"}
                  mr={"0.5rem"}
                  opacity={currentPath === "/dashboard/panitia" ? 1 : 0.25}
                />
                <Text
                  fontSize={"0.55rem"}
                  fontWeight={
                    currentPath === "/dashboard/panitia" ? "semibold" : "medium"
                  }
                  color={
                    currentPath === "/dashboard/panitia"
                      ? "brand.maroon"
                      : "text.primary"
                  }
                >
                  Panitia
                </Text>
              </MenuItem>
            </Link>
            <Link to="/dashboard/organisator">
              <MenuItem>
                <Image
                  src="/icons/organisator.png"
                  w={"0.75rem"}
                  mr={"0.75rem"}
                  opacity={currentPath === "/dashboard/organisator" ? 1 : 0.25}
                />
                <Text
                  fontSize={"0.55rem"}
                  fontWeight={
                    currentPath === "/dashboard/organisator"
                      ? "semibold"
                      : "medium"
                  }
                  color={
                    currentPath === "/dashboard/organisator"
                      ? "brand.maroon"
                      : "text.primary"
                  }
                >
                  Organisator
                </Text>
              </MenuItem>
            </Link>
            <Link to="/dashboard/mahasiswa">
              <MenuItem>
                <Image
                  src="/icons/mahasiswa.png"
                  w={"0.75rem"}
                  mr={"0.75rem"}
                  opacity={currentPath === "/dashboard/mahasiswa" ? 1 : 0.25}
                />
                <Text
                  fontSize={"0.55rem"}
                  fontWeight={
                    currentPath === "/dashboard/mahasiswa"
                      ? "semibold"
                      : "medium"
                  }
                  color={
                    currentPath === "/dashboard/mahasiswa"
                      ? "brand.maroon"
                      : "text.primary"
                  }
                >
                  Mahasiswa
                </Text>
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            ref={acaraMenuRef}
            as={Button}
            variant={"ghost"}
            p={0}
            _hover={{
              transform: "scale(1.05)",
            }}
            _active={{
              transform: "scale(1.05)",
              color: "brand.maroon",
              "> img": {
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
            _expanded={{
              transform: "scale(1.05)",
              color: "brand.maroon",
              "> img": {
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
            onClick={() => setIsAcaraMenuExpanded(!isAcaraMenuExpanded)}
          >
            <Button
              w={"full"}
              flexDirection={"column"}
              p={0}
              gap={1}
              bg="white"
            >
              <Image
                src="/icons/menu.png"
                w={["1.25rem", "1.25rem", "1.25rem", "1.5rem"]}
                opacity={
                  currentPath.includes("/dashboard/state") ||
                  currentPath === "/dashboard/malpun" ||
                  isAcaraMenuExpanded
                    ? 1
                    : 0.25
                }
              />
              <Text
                fontSize={"0.4rem"}
                fontWeight={
                  currentPath.includes("/dashboard/state") ||
                  currentPath === "/dashboard/malpun" ||
                  isAcaraMenuExpanded
                    ? "semibold"
                    : "medium"
                }
                color={
                  currentPath.includes("/dashboard/state") ||
                  currentPath === "/dashboard/malpun" ||
                  isAcaraMenuExpanded
                    ? "brand.maroon"
                    : "text.primary"
                }
              >
                Event
              </Text>
            </Button>
          </MenuButton>

          <MenuList minW={"auto"} rounded={"2xl"}>
            <Link
              to={
                auth.user?.role === "organisator"
                  ? `/dashboard/state/${auth.user.data.stateId}`
                  : "/dashboard/state"
              }
            >
              <MenuItem>
                <Image
                  src="/icons/state.png"
                  w={"0.75rem"}
                  mr={"0.75rem"}
                  opacity={currentPath.includes("state") ? 1 : 0.25}
                />
                <Text
                  fontSize={"0.55rem"}
                  fontWeight={
                    currentPath.includes("state") ? "semibold" : "medium"
                  }
                  color={
                    currentPath.includes("state")
                      ? "brand.maroon"
                      : "text.primary"
                  }
                >
                  STATE
                </Text>
              </MenuItem>
            </Link>
            <MenuItem
              as={Link}
              to="/dashboard/malpun"
              isDisabled={auth.user?.role !== "panitia"}
            >
              <Image
                src="/icons/malpun.png"
                w={"0.75rem"}
                mr={"0.75rem"}
                opacity={currentPath === "/dashboard/malpun" ? 1 : 0.25}
              />
              <Text
                fontSize={"0.55rem"}
                fontWeight={
                  currentPath === "/dashboard/malpun" ? "semibold" : "medium"
                }
                color={
                  currentPath === "/dashboard/malpun"
                    ? "brand.maroon"
                    : "text.primary"
                }
              >
                MalPun
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
        {/* <Text>Bottom Bar</Text> */}
      </Stack>
    </Stack>
  );
};

const DashboardLayout = () => {
  const auth = useAuth();
  const toast = useToast();
  const nav = useNavigate();

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      // toast({
      //   title: "Unauthorized",
      //   description: "You need to login first",
      // });

      nav("/auth/login");
      return;
    }

    if (auth.status === "authenticated") {
      if (auth.user?.role === "mahasiswa") {
        toast({
          title: "Unauthorized",
          description: "You are not allowed to access this page",
        });
        auth.logout();
        return;
      }

      if (auth.user?.role === "unknown") {
        nav("/auth/onboarding");
        return;
      }

      if (
        (auth.user?.role === "panitia" || auth.user?.role === "organisator") &&
        !auth.user.data.isVerified
      ) {
        toast({
          title: "Akun belum diverifikasi",
          description:
            "Akunmu belum diverifikasi oleh SUPERADMIN, silahkan coba beberapa saat lagi",
          isClosable: true,
        });
        auth.logout();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
