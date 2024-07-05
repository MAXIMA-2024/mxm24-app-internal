import { Scanner } from "@yudiel/react-qr-scanner";

const Malpun = () => {
  return <Scanner onScan={(result) => console.log(result)} />;
};
export default Malpun;
