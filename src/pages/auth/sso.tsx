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

    if (auth.status === "authenticated") {
      if (auth.user?.role === "unknown") {
        return nav("/auth/onboarding");
      }

      return nav("/dashboard");
    }

    if (auth.status === "unauthenticated" && ticket) {
      return auth.callBack(ticket);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.search, auth]);

  return (
    <Stack flex={1} align={"center"} justify={"center"}>
      {/* styling disini */}
      <Spinner size={"xl"} />
      <Text>Logging in...</Text>
    </Stack>
  );
};

export default SSOCallback;
