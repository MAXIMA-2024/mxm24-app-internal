import { IconButton, Image, Stack, Tooltip } from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";

type ImageGalleryProps = {
  src: string;
  onDelete: () => void;
};

const ImageGallery = ({ src, onDelete }: ImageGalleryProps) => {
  return (
    <Stack pos={"relative"}>
      <Image
        w={["full", "full", "16rem", "16rem", "16rem"]}
        h={["10rem", "12rem", "12rem", "12rem", "12rem"]}
        src={src}
        fit={"contain"}
        rounded={"md"}
      />

      <Tooltip label={"Hapus gambar"} rounded={"full"}>
        <IconButton
          pos={"absolute"}
          colorScheme="red"
          size={"sm"}
          m={"0.5rem"}
          top={0}
          right={0}
          aria-label="delete entry gallery"
          icon={<MdDeleteForever />}
          onClick={onDelete}
        />
      </Tooltip>
    </Stack>
  );
};

export default ImageGallery;
