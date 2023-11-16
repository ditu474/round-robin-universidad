import { create } from "zustand";
import { v4 } from "uuid";

const initialData = {
  processes: null,
  quantumTime: 0,
  exchangeTime: 0,
  currentSecond: 0,
  readyQueue: [],
  ioQueue: [],
  ganttList: [],
};

const useRRData = create((set) => ({
  ...initialData,
  actions: {
    addProcesses: (newProcesses) => set({ processes: newProcesses }),
    setQuantumTime: (newQuantumTime) => set({ quantumTime: newQuantumTime }),
    setExchangeTime: (newExchangeTime) =>
      set({ exchangeTime: newExchangeTime }),
    updateProcess: (processName, newData) =>
      set((state) => ({
        processes: {
          ...state.processes,
          [processName]: { ...newData },
        },
      })),
    addProcessReady: (processName, processTime) =>
      set((state) => ({
        readyQueue: [
          ...state.readyQueue,
          {
            key: v4(),
            name: processName,
            unqueue: false,
            quantumLeft: processTime,
          },
        ],
      })),
    addProcessGantt: (process) =>
      set((state) => ({
        ganttList: [
          ...state.ganttList,
          {
            key: process.key,
            startTime: state.currentSecond,
            endTime: state.currentSecond + state.quantumTime,
            name: process.name,
            quantums: 1,
          },
        ],
        currentSecond: state.currentSecond + state.quantumTime,
      })),
    unqueueProcess: (processKey) => {
      set((state) => ({
        readyQueue: state.readyQueue.map((process) =>
          process.key === processKey ? { ...process, unqueue: true } : process
        ),
      }));
    },
    addExchangeProcess: () =>
      set((state) => ({
        ganttList: [
          ...state.ganttList,
          {
            key: `exchangeTime-${state.currentSecond}`,
            startTime: state.currentSecond,
            endTime: state.currentSecond + state.exchangeTime,
            name: "I",
            quantums: Math.floor(state.exchangeTime / state.quantumTime),
            isExchangeTime: true,
          },
        ],
        currentSecond: state.currentSecond + state.exchangeTime,
      })),
    addSleepProcess: () =>
      set((state) => ({
        ganttList: [
          ...state.ganttList,
          {
            key: `sleepTime-${state.currentSecond}`,
            startTime: state.currentSecond,
            endTime: state.currentSecond + state.quantumTime,
            name: "S",
            quantums: 1,
            isSleepTime: true,
          },
        ],
        currentSecond: state.currentSecond + state.quantumTime,
      })),
  },
}));

export default useRRData;
