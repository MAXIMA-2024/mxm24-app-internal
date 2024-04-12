import { Heading, Text, Box, Stack, Show } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <>
      <Stack w={"full"} h={"full"}>
        <Show above={"md"}>
          <Heading fontFamily={"Poppins"} color={"text.primary"}>
            Dashboard
          </Heading>
        </Show>
        <Box
          bgColor={"white"}
          w={"full"}
          h={"full"}
          shadow={"lg"}
          p={25}
          rounded={"xl"}
        >
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8}>
            Selamat datang, <strong>John Ryan R.</strong> 🤩
          </Text>
        </Box>
      </Stack>
    </>
  );
};

export default Dashboard;
