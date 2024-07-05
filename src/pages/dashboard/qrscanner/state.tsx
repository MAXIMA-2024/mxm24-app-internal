import { Scanner } from "@yudiel/react-qr-scanner";

const State = () => {
  return <Scanner onScan={(result) => console.log(result)} />;
};
export default State;
