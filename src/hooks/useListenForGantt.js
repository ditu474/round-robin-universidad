import { useEffect } from "react";

import useRRData from "./useRRData";
import { INTERVAL_TIME } from "../utils";

const useListenForGantt = () => {
  const readyQueue = useRRData((state) => state.readyQueue);
  const ganttList = useRRData((state) => state.ganttList);
  const currentSecond = useRRData((state) => state.currentSecond);
  const actions = useRRData((state) => state.actions);
  const end = useRRData((state) => state.end);

  useEffect(() => {
    if (end) return;

    const interval = setInterval(() => {
      const lastProcessInCpu = ganttList.findLast((e) => e);
      if (
        lastProcessInCpu &&
        !lastProcessInCpu.isSleepTime &&
        !lastProcessInCpu.isExchangeTime
      ) {
        actions.addExchangeProcess();

        const nextQuantumLeft = lastProcessInCpu.quantumLeft - 1;
        if (nextQuantumLeft > 0) {
          actions.addProcessReady({
            name: lastProcessInCpu.name,
            quantumLeft: nextQuantumLeft,
          });
        } else {
          actions.addIOProcess(lastProcessInCpu.name);
        }

        return;
      }

      const nextProcessInCpu = readyQueue.find((process) => !process.unqueue);
      if (nextProcessInCpu) {
        actions.addProcessGantt(nextProcessInCpu);
        actions.unqueueProcess(nextProcessInCpu.key);
      } else {
        actions.addSleepProcess();
      }
    }, INTERVAL_TIME);

    return () => {
      clearInterval(interval);
    };
  }, [currentSecond, readyQueue, ganttList, actions, end]);
};

export default useListenForGantt;
