import QRScanner from "@/components/qrscanner";

const MalpunScanner = () => {
  return (
    <QRScanner
      validation={(id) => id}
      onError={(id) => console.error(id)}
      onSuccess={(id) => console.log(id)}
    />
  );
};
export default MalpunScanner;
