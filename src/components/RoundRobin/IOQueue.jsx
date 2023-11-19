import { Typography, Box, styled } from "@mui/material";

import useRRData from "../../hooks/useRRData";

const RootStyle = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
});

const BoxParentStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(1),
}));

const BoxStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "unqueue",
})(({ theme, unqueue }) => ({
  border: "1px solid",
  borderColor: unqueue ? "red" : "black",
  padding: theme.spacing(1),
}));

const IOQueue = () => {
  const ioQueue = useRRData((state) => state.ioQueue);

  return (
    <Box>
      <Typography variant="h6">Procesos en E/S</Typography>
      <RootStyle>
        {ioQueue.map((process) => (
          <BoxParentStyle key={process.key}>
            <BoxStyle unqueue={process.unqueue}>{process.name}</BoxStyle>
            <Typography variant="caption">
              Tiempo de E/S: {process.ioTime}
            </Typography>
            <Typography variant="caption">
              Vuelve a los: {process.backInReadyQueue}seg
            </Typography>
          </BoxParentStyle>
        ))}
      </RootStyle>
    </Box>
  );
};

export default IOQueue;
