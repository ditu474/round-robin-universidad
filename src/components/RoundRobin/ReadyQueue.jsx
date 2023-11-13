import { Typography, Box, styled } from "@mui/material";

const RootStyle = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BoxParentStyle = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const BoxStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "unqueue",
})(({ theme, unqueue }) => ({
  border: "1px solid",
  borderColor: unqueue ? "red" : "black",
  padding: theme.spacing(1),
}));

const ReadyQueue = ({ readyQueue }) => (
  <Box>
    <Typography variant="h6">Cola de listos</Typography>
    <RootStyle>
      {readyQueue.map((process) => (
        <BoxParentStyle key={process.name}>
          <BoxStyle unqueue={process.unqueue}>{process.name}</BoxStyle>
          {process.quantumLeft}
        </BoxParentStyle>
      ))}
    </RootStyle>
  </Box>
);

export default ReadyQueue;
