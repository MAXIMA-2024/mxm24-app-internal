import {
  useRadio,
  chakra,
  Stack,
  Image,
  UseRadioProps,
  Text,
} from "@chakra-ui/react";

type RoleRadio = {
  role: "panitia" | "organisator";
} & UseRadioProps;

const RoleRadio = (props: RoleRadio) => {
  const { role, ...radioProps } = props;
  const { state, getInputProps, getRadioProps, htmlProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps()} />
      <Stack
        direction={"column"}
        {...getRadioProps()}
        bg={state.isChecked ? "text.secondary" : "transparent"}
        justify={"center"}
        align={"center"}
        // w={["8.5rem", "16rem", "12rem", "16rem", "16rem"]}
        // h={["8.5rem", "16rem", "12rem", "16rem", "16rem"]}
        w={["8rem", "12rem", "12rem", "14rem", "14rem"]}
        h={["10rem", "14rem", "14rem", "14rem", "14rem"]}
        p={"1rem"}
        mb={"1rem"}
        rounded="xl"
        shadow={"xl"}
        border={"2px"}
        borderColor={"gray.200"}
      >
        {role === "panitia" && (
          <>
            <Image
              src="/radio/maxi.png"
              objectFit={"fill"}
              w={["3rem", "5rem", "5rem", "5rem", "5rem"]}
            />
            <Text
              w={"100%"}
              fontWeight={"semibold"}
              textColor={state.isChecked ? "white" : "black"}
              fontSize={["sm", "lg", "lg", "2xl", "2xl"]}
              align={"center"}
            >
              Panitia
            </Text>
          </>
        )}
        {role === "organisator" && (
          <>
            <Image
              src="/radio/xima.png"
              w={["3rem", "5rem", "5rem", "5rem", "5rem"]}
            />
            <Text
              w={"100%"}
              fontWeight={"semibold"}
              textColor={state.isChecked ? "white" : "black"}
              fontSize={["sm", "lg", "lg", "2xl", "2xl"]}
              align={"center"}
            >
              Organisator
            </Text>
          </>
        )}
      </Stack>
    </chakra.label>
  );
};

export default RoleRadio;
