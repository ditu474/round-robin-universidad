import ReadyQueue from "./ReadyQueue";
import useUpdateRR from "../../hooks/useUpdateRR";

const RoundRobin = () => {
  const { readyQueue } = useUpdateRR();

  return (
    <>
      <ReadyQueue readyQueue={readyQueue} />
    </>
  );
};

export default RoundRobin;
