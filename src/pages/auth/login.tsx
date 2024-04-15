import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { Button, Stack, Image, Text, Hide, Show } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
    // styling nya nanti disni ya
    <Stack
      gap={0}
      direction={"row"}
      w={"100vw"}
      h={"100vh"}
      align={"center"}
      justify={"center"}
      bgImage={"url('/bg/bg.png')"}
      bgRepeat={"no-repeat"}
      objectFit={"fill"}
      objectPosition={"center"}
      position={"relative"}
    >
      <Hide below="md">
        <Image
          src="/bg/curtains1.png"
          h={"100%"}
          w={"16rem"}
          left={0}
          position={"absolute"}
        />
      </Hide>
      <Stack
        direction={"column"}
        w={"100%"}
        h={"100%"}
        align={"center"}
        justify={"center"}
      >
        <Show below="md">
          <Image
            src="/bg/curtainsMobile.png"
            w={"100%"}
            position={"absolute"}
            top={0}
            objectFit={"cover"}
          />
        </Show>
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
            zIndex={999}
            bgColor={"white"}
          >
            {/* <Hide below="md">
            <Image src="/bg/broDesk.png" left={-160} position={"absolute"} />
          </Hide> */}
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
            {/* <Hide below="md">
            <Image
              src="/bg/galDesk.png"
              right={-160}
              position={"absolute"}
              zIndex={-2}
            />
          </Hide> */}
          </Stack>
        </Stack>
      </Stack>
      <Hide below="md">
        <Image
          src="/bg/curtains2.png"
          h={"100%"}
          w={"16rem"}
          right={0}
          position={"absolute"}
        />
      </Hide>
    </Stack>
  );
};

export default LoginPage;
