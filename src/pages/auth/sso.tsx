import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Stack, Spinner } from "@chakra-ui/react";

const SSOCallback = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const auth = useAuth();
  const toast = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(loc.search);
    const ticket = searchParams.get("ticket");

    if (!ticket) {
      toast({
        title: "Error",
        description: "Invalid SSO callback",
        status: "error",
        isClosable: true,
      });
      return nav("/auth/login");
    }

    auth
      .callBack(ticket)
      .then(() => {
        toast({
          title: "Success",
          description: "Successfully logged in!",
          status: "success",
          isClosable: true,
        });
        nav("/dashboard");
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to login with SSO",
          status: "error",
          isClosable: true,
        });
        nav("/auth/login");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      align={"center"}
      justify={"center"}
      bgColor={"white"}
      rounded={"2rem"}
      p={"4rem"}
    >
      {/* styling disini */}
      <Spinner size={"xl"} />
      <Text>Logging in...</Text>
    </Stack>
  );
};

export default SSOCallback;
