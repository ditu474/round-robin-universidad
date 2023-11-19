import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

import ReadyQueue from "./ReadyQueue";
import GanttList from "./GanttList";
import useRRData from "../../hooks/useRRData";
import useListenForGantt from "../../hooks/useListenForGantt";
import IOQueue from "./IOQueue";

const RoundRobin = () => {
  useListenForGantt();
  const currentSecond = useRRData((state) => state.currentSecond);
  const actions = useRRData((state) => state.actions);

  useEffect(() => {
    actions.checkInitialProcesses();
    actions.checkIOProcess();
    actions.checkEndProgram();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSecond]);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "red",
        }}
      >
        Round Robin
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "blue",
        }}
      >
        Segundos transcurridos: {currentSecond}
      </Typography>
      <ReadyQueue />
      <IOQueue />
      <GanttList />
    </Box>
  );
};

export default RoundRobin;
