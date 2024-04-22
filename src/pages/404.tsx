import useAuth from "@/hooks/useAuth";
import { Stack, Image, Hide, Show, Text, Button } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PageNotFound = () => {
  const auth = useAuth();

  const goBack = () => {
    window.history.back();
  };

  return (
    <Stack
      minW={"100vw"}
      minH={"100vh"}
      fontFamily={"Poppins"}
      overflow={"hidden"}
    >
      <AnimatePresence mode="wait">
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
          overflowX={"hidden"}
          overflowY={"hidden"}
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
              overflow={"hidden"}
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
              overflow={"hidden"}
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
              overflow={"hidden"}
            />
          </Hide>

          <Stack
            direction={"column"}
            bgColor={"white"}
            rounded={"2rem"}
            minW={["17.5rem", "20rem", "25rem", "30rem"]}
            p={"3rem"}
            m={"2rem"}
            justify={"center"}
            align={"center"}
            gap={"2rem"}
            pos={"relative"}
          >
            <Show breakpoint="(min-width: 1024px)">
              <Image
                src="/bg/maxiDesktop.png"
                position={"absolute"}
                top={"5rem"}
                left={"-7.775rem"}
                w={"9rem"}
                as={motion.img}
                animate={{
                  y: [0, 2, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    easings: "easeInOut",
                  },
                }}
              />
              <Image
                src="/bg/ximaDesktop.png"
                position={"absolute"}
                top={"5rem"}
                bottom={0}
                right={"-7.5rem"}
                w={"10rem"}
                as={motion.img}
                animate={{
                  y: [0, -2, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    easings: "easeInOut",
                  },
                }}
              />
            </Show>

            <Show breakpoint="(max-width: 1023px)">
              <Image
                src="/bg/maxiMobile.png"
                position={"absolute"}
                top={[
                  "-6.4rem",
                  "-8.835rem",
                  "-8.835rem",
                  "-6.3rem",
                  "-6.3rem",
                ]}
                bottom={0}
                left={["1.25rem", "3.5rem", "1.5rem", "1.25rem", "1.25rem"]}
                w={["8rem", "11rem", "11rem", "8rem", "8rem"]}
                as={motion.img}
                animate={{
                  rotate: [0, -1.5, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    easings: "easeInOut",
                  },
                }}
              />
              <Image
                src="/bg/ximaMobile.png"
                position={"absolute"}
                top={["-6.3rem", "-8rem", "-8rem", "-6.3rem", "-6.3rem"]}
                bottom={0}
                right={["2rem", "6rem", "2rem", "2rem", "2rem"]}
                w={["5.5rem", "7rem", "7rem", "5.5rem", "5.5rem"]}
                as={motion.img}
                animate={{
                  rotate: [0, 1.5, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    easings: "easeInOut",
                  },
                }}
              />
            </Show>
            <Image src="/logo.png" w={"6rem"} />
            <Stack
              // direction={"row"}
              gap={"1rem"}
              color={"text.secondary"}
              align={"center"}
            >
              <Text
                fontWeight={"bold"}
                fontSize={["2rem", "2rem", "2.5rem", "2.5rem"]}
                textAlign={"center"}
              >
                404
              </Text>
              <Text
                fontWeight={"semibold"}
                fontSize={["1rem", "1rem", "1.5rem", "1.75rem"]}
                textAlign={"center"}
              >
                Page Not Found
              </Text>
              <Button colorScheme="blue" marginTop={5} onClick={goBack}>
                Go Back
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </AnimatePresence>
      {auth.status !== "loading" && <Outlet />}
    </Stack>
  );
};

export default PageNotFound;
