import { Box, styled } from "@mui/material";
import { useState } from "react";

import useRRData from "./hooks/useRRData";
import InitialForm from "./components/InitialForm";
import ProcessesForm from "./components/ProcessesForm";
import RoundRobin from "./components/RoundRobin";

const RootStyle = styled(Box)({
  height: "100%",
  width: "100%",
});

const App = () => {
  const [processes, setProcesses] = useState([]);
  const [appStarted, setAppStarted] = useState(false);
  const actions = useRRData((state) => state.actions);

  const handleSubmitInitialForm = (data) => {
    setProcesses(() => {
      const newProcesses = [];
      for (let i = 0; i < data.processesNumber; i++) {
        newProcesses.push(`P${i}`);
      }
      return newProcesses;
    });
    actions.setQuantumTime(data.quantumTime);
    actions.setExchangeTime(data.exchangeTime);
  };

  const handleProcessesFormSubmit = (data) => {
    actions.addProcesses(data.processes);
    setAppStarted(true);
  };

  return (
    <RootStyle>
      {!appStarted && !processes.length && (
        <InitialForm onSubmit={handleSubmitInitialForm} />
      )}
      {!appStarted && !!processes.length && (
        <ProcessesForm
          processes={processes}
          onSubmit={handleProcessesFormSubmit}
        />
      )}
      {appStarted && <RoundRobin />}
    </RootStyle>
  );
};

export default App;
