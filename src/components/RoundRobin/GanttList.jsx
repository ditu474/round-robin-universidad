import { Typography, Box, styled } from "@mui/material";

import useRRData from "../../hooks/useRRData";

const RootStyle = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const BoxParentStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(1),
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  border: "1px solid black",
  padding: theme.spacing(1),
}));

const ReadyQueue = () => {
  const ganttList = useRRData((state) => state.ganttList);

  return (
    <Box>
      <Typography variant="h6">Diagrama de Gantt</Typography>
      <RootStyle>
        {ganttList.map((process) => (
          <BoxParentStyle key={process.key}>
            <Typography variant="caption">
              {process.startTime} - {process.endTime}
            </Typography>
            <BoxStyle>{process.name}</BoxStyle>
            {process.quantums}
          </BoxParentStyle>
        ))}
      </RootStyle>
    </Box>
  );
};

export default ReadyQueue;
