import { useEffect } from "react";

import useRRData from "./useRRData";

const useListenForIO = () => {
  const currentSecond = useRRData((state) => state.currentSecond);
  const actions = useRRData((state) => state.actions);

  useEffect(() => {
    actions.checkIOProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSecond]);
};

export default useListenForIO;
