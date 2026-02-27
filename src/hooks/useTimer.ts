import { useTimerStore } from "@store/timerStore";
import { useEffect, useRef } from "react";
import { TimerStatus } from "src/types/timer";

function useTimer() {
  const {
    status,
    elapsedMs,
    startedAt,
    start,
    pause,
    reset,
    tick,
    setGoal,
    complete,
    goalMs,
  } = useTimerStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const baseElapsedRef = useRef<number>(0);
  const startedAtRef = useRef<number | null>(null);

  const clearTick = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (status === TimerStatus.RUNNING) {
      baseElapsedRef.current = elapsedMs;
      startedAtRef.current = startedAt;

      intervalRef.current = setInterval(() => {
        const now = performance.now();
        const elapsed =
          baseElapsedRef.current + (now - (startedAtRef.current ?? now));

        if (goalMs !== null && elapsed >= goalMs) {
          tick(goalMs);
          complete();
          return;
        }

        tick(elapsed);
      }, 100);
    }

    if (status === TimerStatus.PAUSED) {
      clearTick();
      tick(elapsedMs);
    }

    if (status === TimerStatus.IDLE) {
      clearTick();
      baseElapsedRef.current = 0;
      startedAtRef.current = null;
    }

    return () => clearTick();
  }, [status]);

  return { status, elapsedMs, start, pause, reset, setGoal, goalMs };
}

export default useTimer;
