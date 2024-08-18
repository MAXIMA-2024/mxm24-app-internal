import AbsenMalpun from "@/components/absen/malpun";
import QRScanner from "@/components/qrscanner";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const MalpunScanner = () => {
  const toast = useToast();
  const [codeAbsen, setCodeAbsen] = useState<string | undefined>();

  return (
    <>
      <QRScanner
        validation={(id) => {
          if (id.length !== 22) {
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
            isClosable: true,
          });
        }}
        onSuccess={(id) => {
          // debounce
          if (codeAbsen) {
            return;
          }

          setCodeAbsen(id);
        }}
      />

      {codeAbsen && (
        <AbsenMalpun
          code={codeAbsen}
          setCode={setCodeAbsen}
          mutate={() => {}}
        />
      )}
    </>
  );
};
export default MalpunScanner;
