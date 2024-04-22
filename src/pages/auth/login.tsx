import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { Button, Stack, Image, Text, Show } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  const auth = useAuth();
  const nav = useNavigate();

  // NOTE: comment useEffect ini buat disable handling auth
  // biar slicing nya gampang
  useEffect(() => {
    if (auth.status === "authenticated") {
      if (auth.user?.role === "unknown") {
        return nav("/auth/onboarding");
      }

      return nav("/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Stack
        direction={"column"}
        w={"100%"}
        h={"100%"}
        align={"center"}
        justify={"center"}
      >
        <Stack
          direction={"row"}
          position={"absolute"}
          align={"center"}
          justify={"center"}
          w={"full"}
          h={"full"}
          px={[0, 0, 0, "6rem", "6rem"]}
        >
          <Stack
            as={motion.div}
            direction={"column"}
            align={"center"}
            justify={"center"}
            w={["85%", "24rem", "36rem", "36rem", "48rem"]}
            pt={"2rem"}
            pb={"6rem"}
            rounded={"2rem"}
            bgPos={"center"}
            objectFit={"cover"}
            bgRepeat={"no-repeat"}
            position={"relative"}
            zIndex={10}
            bgColor={"white"}
            variants={{
              initial: {
                opacity: 0,
                y: 150,
              },
              enter: {
                opacity: 1,
                y: [100, 0, 10],
                transition: {
                  duration: 1,
                  delay: 1.5,
                  easings: "backOut",
                },
              },
            }}
            initial={"initial"}
            animate={"enter"}
          >
            <Show breakpoint="(min-width: 1024px)">
              <Image
                src="/bg/maxiDesktop.png"
                position={"absolute"}
                top={"4rem"}
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
                top={"8.25rem"}
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
                left={["1.25rem", "2rem", "7rem", "5rem", "1.25rem"]}
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
                right={["2rem", "4rem", "9rem", "6rem", "2rem"]}
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

            <Image
              src="/bg/logo.png"
              w={["60px", "90px", "90px", "90px", "90px"]}
              h={["72px", "110px", "110px", "110px", "110px"]}
              mb={"2rem"}
            />
            <Text
              fontSize={["xl", "3xl", "3xl", "3xl", "3xl"]}
              fontWeight={"bold"}
              mb={"2rem"}
            >
              Log In to Dashboard
            </Text>
            {/* logic button leave it as is, just edit the styling please */}
            <Button
              bgColor={"#185C99"}
              w={["75%", "16rem", "24rem", "24rem", "32rem"]}
              py={"1.75rem"}
              as={Link}
              to={`https://sso.umn.ac.id/cas/login?service=${
                import.meta.env.VITE_FRONTEND_URL + "/auth/sso"
              }`}
            >
              <Text textColor={"white"}>Log in with SSO</Text>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default LoginPage;
