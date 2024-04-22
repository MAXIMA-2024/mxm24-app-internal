import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const OnboardingPage = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const toast = useToast();

  // Note: comment useEffect ini buat disable handling auth
  // (biar slicing gampang)
  useEffect(() => {
    if (auth.status === "unauthenticated") {
      toast({
        title: "Error",
        description: "You need to login first",
        status: "error",
        isClosable: true,
      });
      nav("/auth/login");
      return;
    }

    if (auth.status === "authenticated" && auth.user?.role !== "unknown") {
      toast({
        title: "Error",
        description: "You already have an account",
        status: "error",
        isClosable: true,
      });
      nav("/dashboard");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return <Text>Bikinin onboarding page yah</Text>;
};

export default OnboardingPage;
