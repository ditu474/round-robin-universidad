import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import useRRData from "../../hooks/useRRData";

const TimesDisplay = () => {
  const [times, setTimes] = useState({});
  const end = useRRData((state) => state.end);
  const processes = useRRData((state) => state.processes);
  const ganttList = useRRData((state) => state.ganttList);
  const ioQueue = useRRData((state) => state.ioQueue);
  const quantumTime = useRRData((state) => state.quantumTime);

  useEffect(() => {
    if (!end) return;

    Object.keys(processes).forEach((processName) => {
      const newTime = {
        processName,
        arrivalTime: processes[processName].startTime,
        startTime: ganttList.find((p) => p.name === processName).startTime,
        finalTime: ganttList.findLast((p) => p.name === processName).endTime,
        ioTotal:
          ioQueue.reduce((acc, curr) => {
            if (curr.name !== processName) return acc;
            return acc + curr.ioTime;
          }, 0) * quantumTime,
      };

      newTime.lapTime =
        newTime.finalTime - newTime.ioTotal - newTime.arrivalTime;
      newTime.waitTime = newTime.startTime - newTime.arrivalTime;

      setTimes((prev) => ({ ...prev, [processName]: newTime }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  if (!end || !Object.keys(times).length) return <></>;

  return (
    <Box>
      <Typography variant="h4">Tiempos</Typography>
      <Typography variant="h5">Tiempos de vuelta</Typography>
      {Object.keys(times).map((processName) => (
        <Typography key={processName} variant="body1">
          {processName}: {times[processName].lapTime}
        </Typography>
      ))}
      <Typography variant="h6">
        Promedio:{" "}
        {Object.keys(times).reduce((acc, curr) => {
          return acc + times[curr].lapTime;
        }, 0) / Object.keys(times).length}
      </Typography>
      <Typography variant="h5">Tiempos de espera</Typography>
      {Object.keys(times).map((processName) => (
        <Typography key={processName} variant="body1">
          {processName}: {times[processName].waitTime}
        </Typography>
      ))}
      <Typography variant="h6">
        Promedio:{" "}
        {Object.keys(times).reduce((acc, curr) => {
          return acc + times[curr].waitTime;
        }, 0) / Object.keys(times).length}
      </Typography>
    </Box>
  );
};

export default TimesDisplay;
