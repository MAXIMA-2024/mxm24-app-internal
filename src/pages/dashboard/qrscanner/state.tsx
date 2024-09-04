import AbsenState from "@/components/absen/state";
import QRScanner from "@/components/qrscanner";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const STATEScanner = () => {
  const [tokenAbsen, setTokenAbsen] = useState<string | undefined>();
  const toast = useToast();

  return (
    <>
      <QRScanner
        validation={(id) => {
          if (id.length !== 16) {
            return "Invalid Token Length";
          }

          if (!id.startsWith("MXM24-")) {
            return "Invalid Token, not from MAXIMA 2024";
          }
        }}
        onError={(reason) => {
          toast({
            title: "Error!",
            description: reason,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }}
        onSuccess={(id) => {
          // debounce
          if (tokenAbsen) {
            return;
          }

          setTokenAbsen(id);
        }}
      />

      {tokenAbsen && <AbsenState token={tokenAbsen} setToken={setTokenAbsen} />}
    </>
  );
};
export default STATEScanner;
