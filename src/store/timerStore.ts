import { TimerState, TimerStatus } from "src/types/timer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TimerStore extends TimerState {
  tick: (elapsedMs: number) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setGoal: (ms: number | null) => void;
  complete: () => void;
  goalMs: number | null;
}

export const useTimerStore = create<TimerStore>()(
  devtools(
    (set, get) => ({
      status: TimerStatus.IDLE,
      elapsedMs: 0,
      startedAt: null,
      goalMs: null,

      start: () => {
        const { status } = get();

        if (status === TimerStatus.RUNNING) return;

        set(
          { status: TimerStatus.RUNNING, startedAt: performance.now() },
          false,
          "timer/start"
        );
      },

      pause: () => {
        const { status } = get();

        if (status !== TimerStatus.RUNNING) return;

        set(
          {
            status: TimerStatus.PAUSED,
            startedAt: null,
          },
          false,
          "timer/pause"
        );
      },

      reset: () => {
        set(
          { status: TimerStatus.IDLE, elapsedMs: 0, startedAt: null },
          false,
          "timer/reset"
        );
      },

      tick: (elapsedMs: number) => {
        set({ elapsedMs }, false, "timer/tick");
      },

      setGoal: (ms: number | null) => {
        set({ goalMs: ms }, false, "timer/setGoal");
      },

      complete: () => {
        set(
          { status: TimerStatus.COMPLETED, startedAt: null },
          false,
          "timer/complete"
        );
      },
    }),
    { name: "TimerStore" }
  )
);
