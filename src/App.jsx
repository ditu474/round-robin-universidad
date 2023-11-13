import { Box, styled } from "@mui/material";
import InitialForm from "./components/InitialForm";

const RootStyle = styled(Box)({
  height: "100%",
  width: "100%",
});

const App = () => {
  return (
    <RootStyle>
      <InitialForm />
    </RootStyle>
  );
};

export default App;
