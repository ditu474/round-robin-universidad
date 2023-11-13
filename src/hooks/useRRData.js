import { create } from "zustand";

const initialData = {
  processes: null,
  quantumTime: 0,
  exchangeTime: 0,
};

const useRRData = create((set) => ({
  ...initialData,
  actions: {
    addProcesses: (newProcesses) => set({ processes: newProcesses }),
    setQuantumTime: (newQuantumTime) => set({ quantumTime: newQuantumTime }),
    setExchangeTime: (newExchangeTime) =>
      set({ exchangeTime: newExchangeTime }),
    updateProcess: (processName, newData) =>
      set((state) => {
        state.processes[processName] = newData;
      }),
  },
}));

export default useRRData;
