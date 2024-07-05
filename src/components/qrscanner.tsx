import { QrScanner } from "@yudiel/react-qr-scanner";

import { useForm, Controller } from "react-hook-form";
import {
  Button,
  IconButton,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  HStack,
  Box,
  Icon,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { useEffect, useState } from "react";

type CameraSettings = {
  fps: number;
  cameraFacing: "environment" | "user";
};

const ViewFinderSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 150"
      enable-background="new 0 0 100 100"
    >
      <g xmlns="http://www.w3.org/2000/svg">
        <g>
          <polygon
            points="13.2,30 12.2,30 12.2,12.2 30,12.2 30,13.2 13.2,13.2   "
            fill="#FFFFFF"
          />
        </g>
        <g>
          <polygon
            points="70,13.2 70,12.2 87.8,12.2 87.8,30 86.8,30 86.8,13.2   "
            fill="#FFFFFF"
          />
        </g>
        <g>
          <polygon
            points="86.8,70 87.8,70 87.8,87.8 70,87.8 70,86.8 86.8,86.8   "
            fill="#FFFFFF"
          />
        </g>
        <g>
          <polygon
            points="30,86.8 30,87.8 12.2,87.8 12.2,70 13.2,70 13.2,86.8   "
            fill="#FFFFFF"
          />
        </g>
      </g>
    </svg>
  );
};

const ViewFinder = () => {
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        position="relative"
        width={["16em", "20em", "24em", "32em", "32em"]}
        height={["16em", "20em", "24em", "32em", "32em"]}
        bg="transparent"
        boxShadow={"0 0 0 1000px rgba(0, 0, 0, 0.5)"}
        borderRadius="md"
      >
        <Icon
          as={ViewFinderSvg}
          boxSize={["16em", "20em", "24em", "32em", "32em"]}
          color="white"
        />
      </Box>
    </Box>
  );
};
const QRScanner = ({
  validation,
  onSuccess,
  onError,
}: {
  validation: (id: string) => string | undefined;
  onSuccess: (result: string) => void;
  onError: (reason: string) => void;
}) => {
  // *state for camera
  const [cameraState, setCameraState] = useState<CameraSettings>({
    fps: 0,
    cameraFacing: "environment",
  });
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  // *modal disclosure
  const { isOpen, onClose, onOpen } = useDisclosure();

  // *form handling
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CameraSettings>({ mode: "onSubmit" });

  useEffect(() => {
    setAspectRatio(window.innerWidth / window.innerHeight);
  }, []);

  return (
    <>
      <QrScanner
        // ? TESTING: apakah harus di kasih > 500ms (default) per scan?
        scanDelay={2000}
        // remove default viewfinder
        viewFinderBorder={0}
        viewFinder={ViewFinder}
        containerStyle={{
          height: "100%",
          padding: 0,
          aspectRatio: aspectRatio,
        }}
        videoStyle={{
          objectFit: "cover",
        }}
        constraints={{
          frameRate: cameraState.fps > 0 ? cameraState.fps : undefined,
          facingMode: { exact: cameraState.cameraFacing },
        }}
        onDecode={(result) => {
          const validate = validation(result);
          if (validate) {
            onError(validate);
            return;
          }

          onSuccess(result);
        }}
        onError={(reason) => {
          if (reason.name === "OverconstrainedError") {
            onError(
              "Tidak dapat membuka Camera, coba ganti Arah Kamera di settings dan pastikan anda telah memberi akses Kamera di browser."
            );
            return;
          }

          if (reason.name === "TypeError") {
            onError(
              "Tidak dapat membuka Camera, pastikan anda telah memberi akses Kamera di browser."
            );
            return;
          }

          onError("Tidak dapat membaca QR.");
        }}
      />

      {/* floating setting */}

      <IconButton
        aria-label="scanner-settings"
        icon={<MdSettings color="#FFFFFF" />}
        position="absolute"
        bottom={["4rem", "4rem", "2rem", "2rem", "2rem"]}
        right={"2rem"}
        borderRadius="md"
        size="lg"
        bgColor="#185C99"
        zIndex={2}
        onClick={onOpen}
      />

      {/* modal for menu */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Camera Settings</ModalHeader>
          <ModalCloseButton />

          <form
            onSubmit={handleSubmit((data) => {
              setCameraState(data);
              onClose();
            })}
          >
            <ModalBody textColor="#1e1d22">
              <FormControl isInvalid={!!errors.fps}>
                <FormLabel>FPS</FormLabel>
                <Input
                  placeholder="0 (default)"
                  id="fps"
                  type="number"
                  {...register("fps", {
                    required: "FPS harus diisi dengan angka",
                    value: cameraState.fps,
                    max: {
                      value: 60,
                      message:
                        "Hanya support maksimum 60 FPS, set ke 0 untuk default",
                    },
                    min: {
                      value: 0,
                      message: "FPS tidak valid, set ke 0 untuk default",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.fps && errors.fps.message}
                </FormErrorMessage>
              </FormControl>

              <HStack>
                <FormControl isInvalid={!!errors.cameraFacing}>
                  <FormLabel>Arah Kamera</FormLabel>
                  <Controller
                    name="cameraFacing"
                    control={control}
                    defaultValue="environment"
                    rules={{
                      required: "Arah kamera harus dipilih",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        // placeholder="Pilih arah kamera"
                        onChange={onChange}
                        value={value}
                      >
                        <option value="environment" key="environment">
                          Kamera Belakang
                        </option>
                        <option value="user" key="user">
                          Kamera Depan
                        </option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.cameraFacing && errors.cameraFacing.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <Text py={8} textAlign="justify">
                <Text fontWeight="medium">Note :</Text> FPS yang lebih rendah
                akan membuat baterai mu lebih irit. Namun, FPS yang terlalu
                rendah akan membuat scanner menjadi delay. Set ke default (0)
                apabila kamu tidak mau ribet.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" color="#185C99" mr={3}>
                Change
              </Button>
              <Button
                color="#185C99"
                // outlineColor="#185C99"
                variant="outline"
                // mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QRScanner;
