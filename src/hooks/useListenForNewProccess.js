import { useEffect } from "react";

import useRRData from "./useRRData";

const useListenForNewProccess = () => {
  const currentSecond = useRRData((state) => state.currentSecond);
  const actions = useRRData((state) => state.actions);

  useEffect(() => {
    actions.checkInitialProcesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSecond]);
};

export default useListenForNewProccess;
