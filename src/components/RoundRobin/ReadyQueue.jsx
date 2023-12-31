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

const ReadyQueue = () => {
  const readyQueue = useRRData((state) => state.readyQueue);

  return (
    <Box>
      <Typography variant="h6">Cola de listos</Typography>
      <RootStyle>
        {readyQueue.map((process) => (
          <BoxParentStyle key={process.key}>
            <BoxStyle unqueue={process.unqueue}>{process.name}</BoxStyle>
            {process.quantumLeft}
          </BoxParentStyle>
        ))}
      </RootStyle>
    </Box>
  );
};

export default ReadyQueue;
