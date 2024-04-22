import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { Button, Stack } from "@chakra-ui/react";
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
    <Stack flex={1}>
      {/* logic button leave it as is, just edit the styling please */}
      <Button
        as={Link}
        to={`https://sso.umn.ac.id/cas/login?service=${
          import.meta.env.VITE_FRONTEND_URL + "/auth/sso"
        }`}
      >
        Login with SSO
      </Button>
    </Stack>
  );
};

export default LoginPage;
