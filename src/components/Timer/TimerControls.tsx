import Button from "@components/Timer/Button";
import { TimerStatus, TimerStatusType } from "src/types/timer";

interface Props {
  status: TimerStatusType;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({ status, onStart, onPause, onReset }: Props) {
  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;
  const isIdle = status === TimerStatus.IDLE;
  const isCompleted = status === TimerStatus.COMPLETED;

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        mode="start"
        aria-label={isPaused ? "Resume" : "Start"}
        disabled={isRunning || isCompleted}
        onClick={onStart}
      >
        {isPaused ? "Resume" : "Start"}
      </Button>
      <Button
        aria-label="Pause"
        mode="pause"
        disabled={!isRunning}
        onClick={onPause}
      >
        Pause
      </Button>
      <Button
        aria-label="Reset"
        mode="reset"
        disabled={isIdle}
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
}
