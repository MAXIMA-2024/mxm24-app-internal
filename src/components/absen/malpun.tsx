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
  code: string;
  setCode: (token: string | undefined) => void;
  mutate: () => void;
};

type AbsenInternal = {
  mahasiswa: {
    name: string;
    nim: string;
    email: string;
  };
} & {
  id: number;
  code: string;
  mahasiswaId: number;
  attendance: boolean;
  attendanceTime: Date | null;
  alfagiftId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type AbsenExternal = {
  id: number;
  code: string;
  fullName: string;
  email: string;
  transactionId: string | null;
  validatedAt: Date | null;
  attendance: boolean;
  attendanceTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type AbsenMalpunDto =
  | {
      code: "string";
      status: "internal";
      detail: AbsenInternal;
    }
  | {
      code: "string";
      status: "external";
      detail: AbsenExternal;
    };

const AbsenMalpun = ({ code, setCode, mutate }: AbsenStateProps) => {
  const { data, isLoading } = useSWR<AbsenMalpunDto>(`/malpun/ticket/${code}`);

  const api = useApi();
  const toast = useToast();
  const errorHandler = useToastErrorHandler();

  useEffect(() => {
    if (!isLoading && !data) {
      setCode(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  const callback = () => {
    api
      .put<ResponseModel>(`/malpun/absen`, {
        code,
      })
      .then((res) => {
        toast({
          title: "Berhasil!",
          description: res.data.message,
          status: "success",
        });
      })
      .catch(errorHandler)
      .finally(() => {
        setCode(undefined);
        mutate();
      });
  };

  return (
    <Modal isOpen={!!code} onClose={() => setCode(undefined)} isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader fontWeight={"bold"}>Presensi Malam Puncak</ModalHeader>
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
              {data.status === "internal" && (
                <TableContainer>
                  <Table variant={"simple"} colorScheme="gray">
                    <Tbody>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Status
                        </Td>
                        <Td px={0}>INTERNAL</Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Nama
                        </Td>
                        <Td px={0}>{data.detail.mahasiswa.name}</Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          NIM
                        </Td>
                        <Td px={0}>{data.detail.mahasiswa.nim}</Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Jam Masuk
                        </Td>
                        <Td px={0}>
                          {data.detail.attendanceTime
                            ? new Date(
                                data.detail.attendanceTime
                              ).toLocaleDateString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Code
                        </Td>
                        <Td px={0}>{data.detail.code}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              )}

              {data.status === "external" && (
                <TableContainer>
                  <Table variant={"simple"} colorScheme="gray">
                    <Tbody>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Status
                        </Td>
                        <Td px={0}>EXTERNAL</Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Nama
                        </Td>
                        <Td px={0}>{data.detail.fullName}</Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Email
                        </Td>
                        <Td px={0}>{data.detail.email}</Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Jam Masuk
                        </Td>
                        <Td px={0}>
                          {data.detail.attendanceTime
                            ? new Date(
                                data.detail.attendanceTime
                              ).toLocaleDateString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          Code
                        </Td>
                        <Td px={0}>{data.detail.code}</Td>
                      </Tr>
                      <Tr>
                        <Td px={0} fontWeight={"bold"}>
                          ID Transaksi
                        </Td>
                        <Td px={0}>{data.detail.transactionId}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              )}

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
            isLoading={isLoading || !data}
            isDisabled={data?.detail.attendance}
            onClick={callback}
          >
            Masuk
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AbsenMalpun;
