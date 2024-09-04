import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  Stack,
  Text,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useSWR from "swr";

type AbsenStateProps = {
  token: string;
  setToken: (token: string | undefined) => void;
};

type Absen = {
  state: {
    name: string;
  };
  mahasiswa: {
    name: string;
    nim: string;
  };
} & {
  id: number;
  stateId: number;
  mahasiswaId: number;
  firstAttendance: boolean;
  lastAttendance: boolean;
  firstAttendanceTime: Date | null;
  lastAttendanceTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const AbsenState = ({ token, setToken }: AbsenStateProps) => {
  const { data, isLoading, mutate } = useSWR<Absen>(`/state/absen/${token}`);
  const api = useApi();
  const toast = useToast();
  const errorHandler = useToastErrorHandler();

  useEffect(() => {
    if (!isLoading && !data) {
      setToken(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  const callback = () => {
    api
      .put<ResponseModel>(`/state/absen`, {
        token,
      })
      .then((res) => {
        toast({
          title: "Berhasil!",
          position: "top",
          description: res.data.message,
          status: "success",
          isClosable: true,
        });
      })
      .catch(errorHandler)
      .finally(() => {
        setToken(undefined);
        mutate();
      });
  };

  return (
    <Modal isOpen={!!token} onClose={() => setToken(undefined)} isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader fontWeight={"bold"}>
          {data?.state.name} -{" "}
          {data?.firstAttendance ? "Presensi Keluar" : "Presensi Masuk"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {(isLoading || !data) && (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
          )}

          {data && (
            <Stack direction={"column"} flex={1}>
              <TableContainer>
                <Table variant={"simple"} colorScheme="gray">
                  <Tbody>
                    <Tr>
                      <Td px={0} fontWeight={"bold"}>
                        Nama
                      </Td>
                      <Td px={0}>{data.mahasiswa.name}</Td>
                    </Tr>
                    <Tr>
                      <Td px={0} fontWeight={"bold"}>
                        NIM
                      </Td>
                      <Td px={0}>{data.mahasiswa.nim}</Td>
                    </Tr>
                    <Tr>
                      <Td px={0} fontWeight={"bold"}>
                        STATE
                      </Td>
                      <Td px={0}>{data.state.name}</Td>
                    </Tr>
                    <Tr>
                      <Td px={0} fontWeight={"bold"}>
                        Jam Masuk
                      </Td>
                      <Td px={0}>
                        {data.firstAttendanceTime
                          ? new Date(
                              data.firstAttendanceTime
                            ).toLocaleDateString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td px={0} fontWeight={"bold"}>
                        Jam Keluar
                      </Td>
                      <Td px={0}>
                        {data.lastAttendanceTime
                          ? new Date(
                              data.lastAttendanceTime
                            ).toLocaleDateString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-"}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Text>
                Pastikan cek kembali semua data sebelum melakukan presensi.
              </Text>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter gap={"0.5rem"}>
          <Button
            colorScheme="blue"
            bgColor={"button.primary"}
            isLoading={isLoading}
            isDisabled={data?.firstAttendance}
            onClick={callback}
          >
            Masuk
          </Button>
          <Button
            colorScheme="blue"
            bgColor={"button.primary"}
            isLoading={isLoading}
            isDisabled={!data?.firstAttendance || data?.lastAttendance}
            onClick={callback}
          >
            Keluar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AbsenState;
