import { useEffect, useState } from "react";

import useRRData from "./useRRData";

const useListenForNewProccess = () => {
  const [lastSecond, setLastSecond] = useState(0);
  const processes = useRRData((state) => state.processes);
  const currentSecond = useRRData((state) => state.currentSecond);
  const actions = useRRData((state) => state.actions);

  useEffect(() => {
    Object.keys(processes).forEach((name) => {
      const startTime = processes[name].startTime;
      if (startTime >= lastSecond && startTime < currentSecond) {
        actions.addProcessReady(name, processes[name].processTime);
      }
    });

    return () => {
      setLastSecond(currentSecond);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSecond]);
};

export default useListenForNewProccess;
