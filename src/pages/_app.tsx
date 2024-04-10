import { useFetcher } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SWRConfig } from "swr";

const GlobalLayout = () => {
  const fetcher = useFetcher();
  const auth = useAuth();

  // global auth loading, ganti styling ini nanti ya
  if (auth.status === "loading") {
    return (
      <Stack minW={"100vw"} minH={"100vh"} justify={"center"} align={"center"}>
        <div>Loading...</div>
      </Stack>
    );
  }

  return (
    <Stack minW={"100vw"} minH={"100vh"} fontFamily={"Poppins"}>
      <SWRConfig
        value={{
          fetcher,
          refreshInterval: 15 * 1000,
        }}
      >
        <Outlet />
      </SWRConfig>
    </Stack>
  );
};

export default GlobalLayout;
