import QRScanner from "@/components/qrscanner";

const STATEScanner = () => {
  return (
    <QRScanner
      validation={(id) => id}
      onError={(id) => console.error(id)}
      onSuccess={(id) => console.log(id)}
    />
  );
};
export default STATEScanner;
