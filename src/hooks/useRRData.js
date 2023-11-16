import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
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

const useRRData = create(
  immer((set) => ({
    ...initialData,
    actions: {
      addProcesses: (newProcesses) => set({ processes: newProcesses }),
      setQuantumTime: (newQuantumTime) => set({ quantumTime: newQuantumTime }),
      setExchangeTime: (newExchangeTime) =>
        set({ exchangeTime: newExchangeTime }),
      checkInitialProcesses: () =>
        set((state) => {
          Object.keys(state.processes).forEach((name) => {
            if (state.processes[name].started) return;

            const startTime = state.processes[name].startTime;
            if (startTime > state.currentSecond) return;

            state.readyQueue.push({
              key: v4(),
              name,
              unqueue: false,
              quantumLeft: state.processes[name].processTime,
            });
            state.processes[name].started = true;
          });
        }),
      addProcessReady: (process) =>
        set((state) => {
          state.readyQueue.push({
            key: v4(),
            name: process.name,
            unqueue: false,
            quantumLeft: process.quantumLeft,
          });
        }),
      addProcessGantt: (process) =>
        set((state) => {
          state.ganttList.push({
            key: process.key,
            startTime: state.currentSecond,
            endTime: state.currentSecond + state.quantumTime,
            name: process.name,
            quantums: 1,
            quantumLeft: process.quantumLeft,
          });

          state.currentSecond += state.quantumTime;
        }),
      unqueueProcess: (processKey) => {
        set((state) => {
          state.readyQueue = state.readyQueue.map((process) =>
            process.key === processKey ? { ...process, unqueue: true } : process
          );
        });
      },
      addExchangeProcess: () =>
        set((state) => {
          state.ganttList.push({
            key: `exchangeTime-${state.currentSecond}`,
            startTime: state.currentSecond,
            endTime: state.currentSecond + state.exchangeTime,
            name: "I",
            quantums: Math.floor(state.exchangeTime / state.quantumTime),
            isExchangeTime: true,
          });

          state.currentSecond += state.exchangeTime;
        }),
      addSleepProcess: () =>
        set((state) => {
          state.ganttList.push({
            key: `sleepTime-${state.currentSecond}`,
            startTime: state.currentSecond,
            endTime: state.currentSecond + state.quantumTime,
            name: "S",
            quantums: 1,
            isSleepTime: true,
          });

          state.currentSecond += state.quantumTime;
        }),
    },
  }))
);

export default useRRData;
