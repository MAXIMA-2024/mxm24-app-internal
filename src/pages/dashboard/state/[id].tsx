import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Stack,
  Show,
  Text,
  Divider,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Image,
  Icon,
  Spinner,
  useDisclosure,
  Select,
  Textarea,
} from "@chakra-ui/react";
import {
  MdCalendarToday,
  MdEdit,
  MdLocationOn,
  MdPeople,
} from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import DataTable2 from "@/components/datatables2";
//import datatables tamnbahan untuk page yang index.tsx
import { MUIDataTableColumn } from "mui-datatables";
import { useEffect } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { useNavigate, useParams } from "@/router";
import useSWR from "swr";

import { Checkbox as MuiCheckbox } from "@mui/material";
import FilePicker from "@/components/file-picker";
import ImageGallery from "@/components/image-gallery";

import imageCompression from "browser-image-compression";

type StateData = {
  id: number;
  name: string;
  dayId: number;
  logo: string;
  description: string;
  location: string;
  quota: number;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    StateRegistration: number;
  };
  day: {
    id: number;
    code: string;
    date: Date;
  };
  gallery: {
    id: number;
    url: string;
    stateId: number | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

type Mahasiswa = {
  id: number;
  name: string;
  nim: string;
  email: string;
};

type PesertaState = {
  id: number;
  stateId: number;
  mahasiswaId: number;
  mahasiswa: Mahasiswa;
  firstAttendance: boolean;
  lastAttendance: boolean;
  firstAttendanceTime: Date | null;
  lastAttendanceTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type DayManagement = {
  id: number;
  code: string;
  date: string;
};

const maxFileSize = 2 * 1024 * 1024;
const acceptedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const stateSchema = z.object({
  name: z.string({ required_error: "Name cannot be empty" }),
  dayId: z.preprocess(
    (val) => Number(val),
    z.number().int("Id must be integer").positive("Id must be positive"),
    { required_error: "Id is required" }
  ),
  logo: z
    .instanceof(Blob)
    .refine(
      (file) => {
        if (!file) return true;
        if (file.size > maxFileSize) {
          return false;
        }
        if (!acceptedMimes.includes(file.type)) {
          return false;
        }
        return true;
      },
      {
        message: `File size must be under ${
          maxFileSize / 1024 / 1024
        }MB and type must be one of ${acceptedMimes.join(", ")}`,
      }
    )
    .optional(),
  gallery: z
    .array(
      z.instanceof(Blob).refine(
        (file) => {
          if (file.size > maxFileSize) {
            return false;
          }
          if (!acceptedMimes.includes(file.type)) {
            return false;
          }
          return true;
        },
        {
          message: `File size must be under ${
            maxFileSize / 1024 / 1024
          }MB and type must be one of ${acceptedMimes.join(", ")}`,
        }
      ),
      {
        required_error: "Gallery cannot be empty",
        invalid_type_error: "Gallery must be an array of files",
        // message: "Gallery must be an array of images, max 5 files",
      }
    )
    .max(5, "Gallery must be under 5 files")
    .optional(),
  description: z
    .string({ required_error: "Description cannot be empty" })
    .max(500, "Description must be under 500 characters"),
  location: z.string({ required_error: "Location cannot be empty" }),
  quota: z
    .number({ required_error: "Quota cannot be empty" })
    .min(1, "Quota must be at least 1"),
});

type StateDataFillable = z.infer<typeof stateSchema>;

const Organisator = () => {
  const allowedEditIds = [1, 2, 3, 4];
  const allowedAbsenIds = [1, 2, 4];

  const auth = useAuth();
  const toast = useToast();
  const api = useApi();
  const errorHandler = useToastErrorHandler();
  const nav = useNavigate();

  const params = useParams("/dashboard/state/:id");

  const {
    handleSubmit,
    register,
    setError,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<StateDataFillable>({
    resolver: zodResolver(stateSchema),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: stateData.data?.name,
      dayId: stateData.data?.dayId,
      description: stateData.data?.description,
      location: stateData.data?.location,
      quota: stateData.data?.quota,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const id = Number(params.id);
    if (isNaN(id)) {
      toast({
        title: "Error",
        description: "Invalid state id",
        status: "error",
      });
      nav("/dashboard");
    }

    if (auth.user?.role === "organisator" && auth.user.data.stateId !== id) {
      toast({
        title: "Error",
        description: "You are not allowed to access this page",
        status: "error",
      });
      nav("/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // fetcher
  const stateData = useSWR<StateData>(`/state/${params.id}`);
  const pesertaStateData = useSWR<PesertaState[]>(
    `/state/${params.id}/peserta`
  );
  const dayManagementData = useSWR<DayManagement[]>(
    "/state/enum/dayManagement"
  );

  const colDefs: MUIDataTableColumn[] = [
    {
      name: "mahasiswa",
      label: "Nama",
      options: {
        customBodyRender: (value: Mahasiswa) => value.name,
      },
    },
    {
      name: "mahasiswa",
      label: "NIM",
      options: {
        customBodyRender: (value: Mahasiswa) => value.nim,
      },
    },
    {
      name: "mahasiswa",
      label: "Email",
      options: {
        customBodyRender: (value: Mahasiswa) => value.email,
      },
    },
    {
      name: "id",
      label: "Absen Masuk",
      options: {
        customBodyRender: (_value: number, tableMeta) => {
          const data = pesertaStateData.data?.[tableMeta.rowIndex];
          return (
            <Stack flex={1} align={"center"} justify={"center"}>
              <MuiCheckbox
                checked={data?.firstAttendance}
                disabled={
                  data?.firstAttendance ||
                  !(
                    auth.user?.role === "panitia" &&
                    allowedAbsenIds.includes(auth.user.data.divisiId)
                  )
                }
                onChange={() => {
                  console.log("unimplemented absen masuk");
                }}
              />
            </Stack>
          );
        },
      },
    },
    {
      name: "id",
      label: "Absen Keluar",
      options: {
        customBodyRender: (_value: number, tableMeta) => {
          const data = pesertaStateData.data?.[tableMeta.rowIndex];
          return (
            <Stack flex={1} align={"center"} justify={"center"}>
              <MuiCheckbox
                checked={data?.lastAttendance}
                disabled={
                  data?.lastAttendance ||
                  !(
                    auth.user?.role === "panitia" &&
                    allowedAbsenIds.includes(auth.user.data.divisiId)
                  )
                }
                onChange={() => {
                  console.log("unimplemented absen keluar");
                }}
              />
            </Stack>
          );
        },
      },
    },
  ];

  return (
    <>
      <style>
        {`
            .tss-hwdp7s-MUIDataTable-liveAnnounce {
                border: 0 !important;
                clip: rect(0 0 0 0) !important;
                height: 1px !important;
                margin: -1px !important;
                overflow: hidden !important;
                padding: 0 !important;
                position: relative !important;
                width: 1px !important;
            }
          `}
      </style>

      <Stack gap={7} flex={1}>
        {/* Breadcrumb */}
        <Show above="md">
          <Breadcrumb fontWeight="medium" fontSize="sm">
            {auth.user?.role === "organisator" && (
              <>
                <BreadcrumbItem>
                  <Link to={"/dashboard"}>
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      alignContent={"center"}
                      alignItems={"center"}
                    >
                      <BsArrowLeftShort size={"2rem"} />
                      <BreadcrumbLink>Back To Dashboard</BreadcrumbLink>
                    </Stack>
                  </Link>
                </BreadcrumbItem>
              </>
            )}

            {auth.user?.role === "panitia" && (
              <>
                <Breadcrumb fontWeight="medium" fontSize="sm">
                  <BreadcrumbItem>
                    <Link to={"/dashboard"}>
                      <BreadcrumbLink>Dashboard</BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link to={"/dashboard/state"}>
                      <BreadcrumbLink>Daftar State</BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <Link to={`/dashboard/state/${params.id}`}>
                      <BreadcrumbLink
                        color={"brand.maroon"}
                        fontWeight={"medium"}
                      >
                        Detail dan Peserta
                      </BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                </Breadcrumb>
              </>
            )}
          </Breadcrumb>

          {/* Header */}
          <Stack
            direction={"row"}
            gap={5}
            justifyContent={"space-between"}
            align={"center"}
            borderRadius={"2rem"}
          >
            <Stack direction={"row"} align={"center"} spacing={5}>
              <Heading fontFamily={"Poppins"} color={"text.primary"}>
                Detail dan Peserta
              </Heading>
            </Stack>

            {/* sunting button */}
            {(auth.user?.role === "organisator" ||
              (auth.user?.role === "panitia" &&
                allowedEditIds.includes(auth.user.data.divisiId))) && (
              <Button
                leftIcon={<MdEdit />}
                colorScheme="blue"
                bgColor={"button.primary"}
                borderRadius={"full"}
                color={"white"}
                onClick={onOpen}
              >
                <Text color={"white"}> Sunting</Text>
              </Button>
            )}
          </Stack>
        </Show>
        {/* Content */}
        <Stack
          bgColor={"white"}
          // w={"full"}
          // h={"full"}
          shadow={"lg"}
          rounded={"xl"}
          overflow={"auto"}
          flex={1}
        >
          {stateData.isLoading && (
            <Stack flex={1} align={"center"} justify={"center"}>
              <Spinner size={"xl"} />
              <Text>Loading...</Text>
            </Stack>
          )}

          {stateData.data && (
            <>
              <Stack
                // w={"full"}
                flex={1}
                direction={["column", "column", "column", "row", "row"]}
                spacing={2}
                justify="center"
                px={"2rem"}
                pt={"2rem"}
                gap={"4rem"}
              >
                <Stack
                  align={"center"}
                  justify={"start"}
                  // sm        md      lg       xl       2xl
                  w={["full", "full", "full", "10rem", "10rem"]}
                >
                  <Image
                    w={"10rem"}
                    h={"10rem"}
                    src={
                      stateData.data.logo === "-"
                        ? "/icons/imgplaceholder.png"
                        : `${import.meta.env.VITE_API_BASE_URL}${
                            stateData.data?.logo
                          }`
                    }
                    rounded={"md"}
                    fit={"contain"}
                    alt={`logo-${stateData.data.name}`}
                  />
                </Stack>
                <Stack
                  divider={<Divider orientation="vertical" />}
                  direction={["column", "column", "column", "row", "row"]}
                  flex={1}
                >
                  <Stack flex={1}>
                    <Heading size="lg">{stateData.data.name}</Heading>
                    <Stack direction="row">
                      <Icon as={MdCalendarToday} my={"0.25rem"} />
                      <Text>
                        {stateData.data.day.code} -{" "}
                        {new Date(stateData.data.day.date)
                          .toLocaleDateString("id-ID", {
                            // format tanggal: Senin, 1 Januari 2021 - 08:00
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          .replace("pukul", "-")}
                      </Text>
                    </Stack>
                    <Stack direction="row">
                      <Icon as={MdPeople} my={"0.25rem"} />
                      <Text>
                        {stateData.data._count.StateRegistration}/
                        {stateData.data.quota}
                      </Text>
                    </Stack>
                    <Stack direction="row">
                      <Icon as={MdLocationOn} my={"0.25rem"} />
                      <Text>{stateData.data.location}</Text>
                    </Stack>
                  </Stack>
                  <Stack flex={1}>
                    <Heading size="md">Deskripsi</Heading>
                    <Text fontSize="sm" textAlign={"justify"}>
                      {stateData.data.description}
                    </Text>
                    <Show below="md">
                      {/* sunting button */}
                      {(auth.user?.role === "organisator" ||
                        (auth.user?.role === "panitia" &&
                          allowedEditIds.includes(
                            auth.user.data.divisiId
                          ))) && (
                        <Button
                          leftIcon={<MdEdit />}
                          colorScheme="blue"
                          bgColor={"button.primary"}
                          borderRadius={"full"}
                          color={"white"}
                          onClick={onOpen}
                          my={"0.25rem"}
                        >
                          <Text color={"white"}> Sunting</Text>
                        </Button>
                      )}
                    </Show>
                  </Stack>
                </Stack>
              </Stack>

              {!pesertaStateData.data || pesertaStateData.isLoading ? (
                <Stack flex={1} align={"center"} justify={"center"}>
                  <Spinner size={"xl"} />
                  <Text>Loading...</Text>
                </Stack>
              ) : (
                <DataTable2 colDefs={colDefs} data={pesertaStateData.data} />
              )}
            </>
          )}
        </Stack>
      </Stack>
      {/* HEADER END */}

      {/* MODAL START */}
      <Modal
        isCentered
        isOpen={isOpen}
        size={"full"}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

        <ModalContent>
          <ModalHeader fontWeight={"bold"}>Edit STATE</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form
              id="edit-data"
              onSubmit={handleSubmit((data) => {
                const { gallery, logo, ...rest } = data;

                if (logo) {
                  const logoData = new FormData();
                  logoData.append("logo", logo);

                  api
                    .post<ResponseModel>(`/state/${params.id}/logo`, logoData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((res) => {
                      toast({
                        title: "Berhasil",
                        description: res.data.message,
                        status: "success",
                        isClosable: true,
                      });
                    })
                    .catch(errorHandler);
                }

                if (gallery) {
                  const galleryData = new FormData();
                  gallery.forEach((file) => {
                    galleryData.append("gallery", file);
                  });

                  api
                    .post<ResponseModel>(
                      `/state/${params.id}/gallery`,
                      galleryData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    )
                    .then((res) =>
                      toast({
                        title: "Berhasil",
                        description: res.data.message,
                        status: "success",
                        isClosable: true,
                      })
                    )
                    .catch(errorHandler);
                }

                api
                  .put<ResponseModel>(`/state/${params.id}`, rest)
                  .then((res) =>
                    toast({
                      title: "Berhasil",
                      description: res.data.message,
                      status: "success",
                      isClosable: true,
                    })
                  )
                  .catch(errorHandler)
                  .finally(() => {
                    stateData.mutate();
                    onClose();
                  });
              })}
            >
              <Stack spacing={4}>
                {auth.user?.role === "panitia" &&
                  allowedEditIds.includes(auth.user.data.divisiId) && (
                    <>
                      {/* NAMA ORGANISASI START */}
                      <FormControl isInvalid={!!errors.name}>
                        <FormLabel>Nama</FormLabel>

                        <Input
                          placeholder="Nama STATE"
                          {...register("name")}
                          type="text"
                        />

                        <FormErrorMessage>
                          {errors.name && errors.name.message}
                        </FormErrorMessage>
                      </FormControl>
                      {/* NAMA ORGANISASI END */}
                    </>
                  )}

                {/* LOGO ORGANISASI START */}
                <FormControl isInvalid={!!errors.logo}>
                  <FormLabel>Logo</FormLabel>

                  <Stack my={"1rem"} align={"center"} justify={"center"}>
                    <Image
                      w={"10rem"}
                      h={"10rem"}
                      src={
                        stateData.data?.logo === "-"
                          ? "/icons/imgplaceholder.png"
                          : `${import.meta.env.VITE_API_BASE_URL}${
                              stateData.data?.logo
                            }`
                      }
                      rounded={"md"}
                      fit={"contain"}
                      alt={`logo-${stateData.data?.name}`}
                    />
                  </Stack>

                  <Controller
                    control={control}
                    name="logo"
                    render={({ field: { onChange } }) => (
                      <FilePicker
                        onFileChange={(files) => {
                          console.log(files);
                          const file = files[0];
                          if (!file) return;

                          const options = {
                            maxSizeMB: 0.5,
                            maxWidthOrHeight: 768,
                            useWebWorker: true,
                          };

                          imageCompression(file, options)
                            .then((compressedFile) => {
                              onChange(compressedFile);
                            })
                            .catch((err) => {
                              setError("logo", {
                                type: "validate",
                                message: err.message,
                              });
                            });
                        }}
                        placeholder="Klik disini untuk mengganti logo"
                        accept="image/*"
                      />
                    )}
                  />

                  <FormErrorMessage>
                    {errors.logo && errors.logo.message}
                  </FormErrorMessage>
                </FormControl>
                {/* LOGO ORGANISASI END */}

                {/* FOTO KEGIATAN START */}
                <FormControl isInvalid={!!errors.gallery}>
                  <FormLabel>Gallery</FormLabel>

                  <Stack
                    direction={"row"}
                    wrap={"wrap"}
                    align={"center"}
                    justify={"center"}
                    gap={"1rem"}
                    my={"1rem"}
                  >
                    {stateData.data?.gallery.length === 0 ? (
                      <Text>Belum ada foto</Text>
                    ) : (
                      stateData.data?.gallery.map((gallery) => (
                        <ImageGallery
                          key={gallery.id}
                          src={`${import.meta.env.VITE_API_BASE_URL}${
                            gallery.url
                          }`}
                          onDelete={() => {
                            api
                              .delete<ResponseModel>(
                                `/state/${params.id}/gallery/${gallery.id}`
                              )
                              .then((res) => {
                                toast({
                                  title: "Berhasil",
                                  description: res.data.message,
                                  status: "success",
                                });
                              })
                              .catch(errorHandler)
                              .finally(() => {
                                stateData.mutate();
                              });
                          }}
                        />
                      ))
                    )}
                  </Stack>
                  <Controller
                    control={control}
                    name="gallery"
                    render={({ field: { onChange } }) => (
                      <FilePicker
                        placeholder={
                          (stateData.data?.gallery.length || 0) +
                            (watch("gallery") || []).length >=
                          5
                            ? "Gallery sudah penuh"
                            : "Klik disini untuk menambah foto"
                        }
                        accept="image/*"
                        multipleFiles
                        disabled={
                          (stateData.data?.gallery.length || 0) +
                            (watch("gallery") || []).length >=
                          5
                        }
                        onFileChange={(files) => {
                          const options = {
                            maxSizeMB: 1,
                            maxWidthOrHeight: 1920,
                            useWebWorker: true,
                          };

                          const compressedFiles = files.map((file) =>
                            imageCompression(file, options)
                          );

                          Promise.all(compressedFiles)
                            .then((compressedFiles) => {
                              onChange(compressedFiles);
                            })
                            .catch((err) => {
                              setError("gallery", {
                                type: "validate",
                                message: err.message,
                              });
                            });
                        }}
                      />
                    )}
                  />

                  <FormErrorMessage>
                    {errors.gallery && errors.gallery.message}
                  </FormErrorMessage>
                </FormControl>
                {/* FOTO KEGIATAN END */}

                {/* DESKRIPSI START */}
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>Deskripsi</FormLabel>

                  <Textarea
                    placeholder="Deskripsi"
                    {...register("description")}
                  />

                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                {/* DESKRIPSI END */}

                {auth.user?.role === "panitia" &&
                  allowedEditIds.includes(auth.user.data.divisiId) && (
                    <>
                      {/* HARI START */}
                      <FormControl isInvalid={!!errors.dayId}>
                        <FormLabel>Hari</FormLabel>

                        <Controller
                          control={control}
                          name="dayId"
                          render={({ field }) => (
                            <Select {...field}>
                              {dayManagementData.data?.map((day) => {
                                const date = new Date(day.date);
                                const formattedDate = date
                                  .toLocaleDateString("id-ID", {
                                    // format tanggal: Senin, 1 Januari 2021 - 08:00
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                  .replace("pukul", "-");
                                return (
                                  <option key={day.id} value={day.id}>
                                    {day.code} - {formattedDate}
                                  </option>
                                );
                              })}
                            </Select>
                          )}
                        />

                        <FormErrorMessage>
                          {errors.dayId && errors.dayId.message}
                        </FormErrorMessage>
                      </FormControl>
                      {/* HARI END */}

                      {/* KUOTA START */}
                      <FormControl isInvalid={!!errors.quota}>
                        <FormLabel>Kuota</FormLabel>

                        <Input
                          placeholder="Kuota"
                          {...register("quota", {
                            valueAsNumber: true,
                          })}
                          type="number"
                        />

                        <FormErrorMessage>
                          {errors.quota && errors.quota.message}
                        </FormErrorMessage>
                      </FormControl>
                      {/* KUOTA END */}

                      {/* LOKASI START */}
                      <FormControl isInvalid={!!errors.location}>
                        <FormLabel>Lokasi</FormLabel>

                        <Input
                          placeholder="Lokasi"
                          {...register("location")}
                          type="text"
                        />

                        <FormErrorMessage>
                          {errors.location && errors.location.message}
                        </FormErrorMessage>
                      </FormControl>
                      {/* LOKASI END */}
                    </>
                  )}
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" form="edit-data">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL END */}
    </>
  );
};

export default Organisator;
