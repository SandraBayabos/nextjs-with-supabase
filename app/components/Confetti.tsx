import ReactConfetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Confetti() {
  const { width, height } = useWindowSize();
  return (
    <ReactConfetti
      width={width || window.innerHeight}
      height={height || window.innerHeight}
    />
  );
}
