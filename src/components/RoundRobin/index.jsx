import { Box, Typography } from "@mui/material";

import ReadyQueue from "./ReadyQueue";
import GanttList from "./GanttList";
import useRRData from "../../hooks/useRRData";
import useListenForNewProccess from "../../hooks/useListenForNewProccess";
import useListenForGantt from "../../hooks/useListenForGantt";
import useListenForIO from "../../hooks/useListenForIO";
import IOQueue from "./IOQueue";

const RoundRobin = () => {
  useListenForNewProccess();
  useListenForGantt();
  useListenForIO();
  const currentSecond = useRRData((state) => state.currentSecond);

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
