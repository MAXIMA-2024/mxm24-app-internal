import { useFetcher } from "@/hooks/useApi";
import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SWRConfig } from "swr";

const GlobalLayout = () => {
  const fetcher = useFetcher();

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
