import { Heading, Text, Stack, Show } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <>
      <Stack flex={1}>
        <Show above={"md"}>
          <Heading fontFamily={"Poppins"} color={"text.primary"}>
            Dashboard
          </Heading>
        </Show>
        <Stack bgColor={"white"} flex={1} shadow={"lg"} p={25} rounded={"xl"}>
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8}>
            Selamat datang, <strong>John Ryan R.</strong> 🤩
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
