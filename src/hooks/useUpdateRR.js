import { useState, useEffect } from "react";

import useRRData from "./useRRData";

const useUpdateRR = () => {
  const processes = useRRData((state) => state.processes);
  const quantumTime = useRRData((state) => state.quantumTime);
  const exchangeTime = useRRData((state) => state.exchangeTime);

  const [currentSecond, setCurrentSecond] = useState(0);
  const [readyQueue, setReadyQueue] = useState([]);
  const [ioQueue, setIoQueue] = useState([]);
  const [ganttList, setGanttList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {}, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    readyQueue,
    ioQueue,
    ganttList,
  };
};

export default useUpdateRR;
