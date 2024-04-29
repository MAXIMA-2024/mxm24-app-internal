import { Stack, Text, Image } from "@chakra-ui/react";

type StatisticCardsProps = {
  data: {
    nama: string;
    icon: string;
    angka: number | undefined;
    bgColor: string;
  };
};

const StatisticCards = ({ data }: StatisticCardsProps) => {
  return (
    <Stack direction={"column"} spacing={6}>
      <Stack
        bgColor={data.bgColor}
        w={["275px", "350px", "225px", "225px"]}
        h={"120px"}
        borderRadius={15}
        p={4}
        flexDirection={"column"}
        spacing={3}
      >
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
          <Text fontWeight={"medium"} fontSize={"xl"}>
            {data.nama}
          </Text>
          <Image src={data.icon} />
        </Stack>
        <Text fontWeight={"bold"} fontSize={"3xl"}>
          {data.angka}
        </Text>
      </Stack>
    </Stack>
  );
};

export default StatisticCards;
