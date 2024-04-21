import { Outlet, useLocation } from "react-router-dom";
import { Hide, Stack, Image, Show } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AuthLayout = () => {
  // styling layout disini
  const loc = useLocation();

  return (
    <Stack
      gap={0}
      minW={"100vw"}
      minH={"100vh"}
      align={"center"}
      justify={
        loc.pathname === "/auth/login" || loc.pathname === "/auth/sso"
          ? "center"
          : ["end", "end", "center", "center", "center"]
      }
      bgImage={"url('/bg/bg.png')"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      position={"relative"}
      overflow={"hidden"}
    >
      <Hide below="md">
        <Image
          as={motion.img}
          src="/bg/curtains1.png"
          h={"100%"}
          w={"16rem"}
          left={0}
          position={"absolute"}
          variants={{
            initial: {
              opacity: 0,
              x: -150,
            },
            enter: {
              opacity: 1,
              x: [-100, 0, -10],
              transition: {
                duration: 1,
                delay: 1.5,
                easings: "backOut",
              },
            },
          }}
          initial={"initial"}
          animate={"enter"}
        />
      </Hide>
      <Show below="md">
        <Image
          as={motion.img}
          src="/bg/curtainsMobile.png"
          w={"100%"}
          position={"absolute"}
          top={0}
          objectFit={"cover"}
          variants={{
            initial: {
              opacity: 0,
              y: -150,
            },
            enter: {
              opacity: 1,
              y: [-150, 0, -5],
              transition: {
                duration: 1,
                delay: 1.5,
                easings: "backOut",
              },
            },
          }}
          initial={"initial"}
          animate={"enter"}
        />
      </Show>
      <Hide below="md">
        <Image
          as={motion.img}
          src="/bg/curtains2.png"
          h={"100%"}
          w={"16rem"}
          right={0}
          position={"absolute"}
          variants={{
            initial: {
              opacity: 0,
              x: 150,
            },
            enter: {
              opacity: 1,
              x: [100, 0, 10],
              transition: {
                duration: 1,
                delay: 1.5,
                easings: "backOut",
              },
            },
          }}
          initial={"initial"}
          animate={"enter"}
        />
      </Hide>
      <Outlet />
    </Stack>
  );
};

export default AuthLayout;
