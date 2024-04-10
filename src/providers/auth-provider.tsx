import { ReactNode, createContext, useEffect, useState } from "react";
import useApi, {
  type ResponseModel,
  useToastErrorHandler,
  baseUrl,
} from "@/hooks/useApi";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

type Panitia = {
  name: string;
  nim: string;
  divisiId: number;
};

type Organisator = {
  name: string;
  nim: string;
  stateId: number;
};

type Mahasiswa = {
  email: string;
  name: string;
  nim: string;
  angkatan: number;
  prodi: string;
  whatsapp: string;
  lineId: string;
};

type User =
  | {
      role: "mahasiswa";
      data: Mahasiswa;
    }
  | {
      role: "panitia";
      data: Panitia;
    }
  | {
      role: "organisator";
      data: Organisator;
    }
  | {
      role: "unknown";
    };

type AuthContext = {
  status: "loading" | "unauthenticated" | "authenticated";
  user: User | null;
  callBack: (ticket: string) => void;
  refresh: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  status: "loading",
  user: null,
  callBack: () => {},
  refresh: async () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<
    "loading" | "unauthenticated" | "authenticated"
  >("loading");

  const api = useApi();
  const toast = useToast();
  const errorHandler = useToastErrorHandler();

  useEffect(() => {
    api
      .get<ResponseModel<User>>("/auth/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.data);
        setStatus("authenticated");
      })
      .catch(() => {
        setStatus("unauthenticated");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callBack = (ticket: string) => {
    axios
      .post<
        ResponseModel<{
          role: "mahasiswa" | "panitia" | "organisator" | "unknown";
          email: string;
        }>
      >(
        baseUrl + "/auth/sso",
        {
          ticket,
          issuer:
            (import.meta.env.VITE_FRONTEND_URL ?? "http://localhost:5173") +
            "/auth/sso",
        },
        { withCredentials: true }
      )
      .then(() => {
        axios
          .get<ResponseModel<User>>(baseUrl + "/auth/profile", {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data.data);
            setUser(res.data.data);
            setStatus("authenticated");
            toast({
              title: "Success",
              description: "Successfully logged in!",
              status: "success",
              isClosable: true,
            });
          })
          .catch(() => {
            console.log("error, cookie ga kebaca");
            // errorHandler(err);
            setStatus("unauthenticated");
          });
      })
      .catch((err) => {
        errorHandler(err);
        setStatus("unauthenticated");
      });
  };

  const refresh = async () => {
    await axios.get<
      ResponseModel<{
        role: "mahasiswa" | "panitia" | "organisator" | "unknown";
        email: string;
      }>
    >(baseUrl + "/auth/refresh", {
      withCredentials: true,
    });

    const user = await axios.get<ResponseModel<User>>(
      baseUrl + "/auth/profile",
      {
        withCredentials: true,
      }
    );

    setUser(user.data.data);
    setStatus("authenticated");
  };

  const logout = () => {
    axios
      .delete<ResponseModel>(baseUrl + "/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
        setStatus("unauthenticated");
        toast({
          title: "Success",
          description: "Successfully logged out!",
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => errorHandler(err));
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        callBack,
        refresh,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
