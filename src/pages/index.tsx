import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { useEffect } from "react";

const Root = () => {
  const auth = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      return nav("/auth/login");
    }

    if (auth.status === "authenticated") {
      if (auth.user?.role === "unknown") {
        return nav("/auth/onboarding");
      }

      return nav("/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
};

export default Root;
