import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

const Verification = () => {
  return (
    <>
      <Stack gap={7}>
        <Breadcrumb fontWeight="medium" fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="/verification">Verification</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack direction={"row"} gap={5}>
          <Heading fontFamily={"Poppins"} color={"text.primary"}>
            Verifikasi
          </Heading>
          <Stack justifyContent={"end"} mb={2}>
            <Tag
              bgColor={"brand.maroon"}
              h={25}
              color={"white"}
              rounded={"full"}
              fontSize={"0.75rem"}
            >
              Superadmin
            </Tag>
          </Stack>
        </Stack>
        <Box
          bgColor={"white"}
          w={"full"}
          h={"full"}
          shadow={"lg"}
          p={25}
          rounded={"xl"}
        >
          <Text fontWeight={"medium"} color={"text.primary"} opacity={0.8}>
            Ini adalah halaman verifikasi. 🤩
          </Text>
        </Box>
      </Stack>
    </>
  );
};

export default Verification;
