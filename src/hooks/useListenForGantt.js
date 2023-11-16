import { useEffect } from "react";

import useRRData from "./useRRData";
import { INTERVAL_TIME } from "../utils";

const useListenForGantt = () => {
  const readyQueue = useRRData((state) => state.readyQueue);
  const ganttList = useRRData((state) => state.ganttList);
  const currentSecond = useRRData((state) => state.currentSecond);
  const actions = useRRData((state) => state.actions);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastProcessInCpu = ganttList.pop();
      const nextProcessInCpu = readyQueue.find((process) => !process.unqueue);

      if (
        lastProcessInCpu &&
        !lastProcessInCpu.isSleepTime &&
        !lastProcessInCpu.isExchangeTime
      ) {
        actions.unqueueProcess(lastProcessInCpu);
        actions.addExchangeProcess();

        const nextQuantumLeft = lastProcessInCpu.quantumLeft - 1;
        if (nextQuantumLeft > 0) {
          actions.addProcessReady(lastProcessInCpu.name, nextQuantumLeft);
        } else {
          // TODO: Agregar a la cola de IO si tiene procesos de IO
        }
      }

      if (nextProcessInCpu) {
        actions.addProcessGantt(nextProcessInCpu);
      } else {
        actions.addSleepProcess();
      }
    }, INTERVAL_TIME);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSecond]);
};

export default useListenForGantt;
