import { useFetcher } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { Stack, Image, Hide, Show, Text, Spinner } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SWRConfig } from "swr";
import { motion, AnimatePresence } from "framer-motion";

const GlobalLayout = () => {
  const fetcher = useFetcher();
  const auth = useAuth();

  return (
    <Stack minW={"100vw"} minH={"100vh"} fontFamily={"Poppins"}>
      <SWRConfig
        value={{
          fetcher,
          refreshInterval: 15 * 1000,
        }}
      >
        <AnimatePresence mode="wait">
          {auth.status === "loading" && (
            <Stack
              as={motion.div}
              gap={0}
              minW={"100vw"}
              minH={"100vh"}
              align={"center"}
              justify={"center"}
              bgImage={"url('/bg/bg.png')"}
              bgRepeat={"no-repeat"}
              bgSize={"cover"}
              position={"relative"}
              overflow={"hidden"}
              variants={{
                initial: {
                  opacity: 0,
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 1,
                    delay: 0.5,
                    easings: "backOut",
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 1,
                    delay: 0.5,
                    easings: "backOut",
                  },
                },
              }}
              initial={"initial"}
              animate={"enter"}
              exit={"exit"}
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
                        delay: 0.5,
                        easings: "backOut",
                      },
                    },
                    exit: {
                      opacity: 0,
                      x: -150,
                      transition: {
                        duration: 1,
                        delay: 0.5,
                        easings: "backOut",
                      },
                    },
                  }}
                  initial={"initial"}
                  animate={"enter"}
                  exit={"exit"}
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
                        delay: 0.5,
                        easings: "backOut",
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -150,
                      transition: {
                        duration: 1,
                        delay: 0.5,
                        easings: "backOut",
                      },
                    },
                  }}
                  initial={"initial"}
                  animate={"enter"}
                  exit={"exit"}
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
                        delay: 0.5,
                        easings: "backOut",
                      },
                    },
                    exit: {
                      opacity: 0,
                      x: 150,
                      transition: {
                        duration: 1,
                        delay: 0.5,
                        easings: "backOut",
                      },
                    },
                  }}
                  initial={"initial"}
                  animate={"enter"}
                  exit={"exit"}
                />
              </Hide>

              <Stack
                direction={"column"}
                bgColor={"white"}
                rounded={"2rem"}
                p={"4rem"}
                justify={"center"}
                align={"center"}
                gap={"2rem"}
              >
                <Image src="/logo.png" w={"6rem"} />
                <Stack
                  direction={"row"}
                  gap={"0.5rem"}
                  color={"text.secondary"}
                >
                  <Spinner />
                  <Text>Loading...</Text>
                </Stack>
              </Stack>
            </Stack>
          )}
        </AnimatePresence>
        {auth.status !== "loading" && <Outlet />}
      </SWRConfig>
    </Stack>
  );
};

export default GlobalLayout;
