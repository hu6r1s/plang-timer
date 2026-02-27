import Button from "@components/Timer/Button";
import { useState } from "react";
import useTimer from "src/hooks/useTimer";
import { TimerStatus, TimerStatusType } from "src/types/timer";
import { TimerStatusBar } from "./TimeStatusBar";
import { TimerDisplay } from "./TimerDisplay";
import { TimerSettingButton } from "./TimerSettingButton";
import { TimerSettingModal } from "./TimerSettingModal";
import { TimerControls } from "./TimerControls";
import { TimerIndicator } from "./TimerIndicator";

const STATUS_LABEL: Record<TimerStatusType, string> = {
  [TimerStatus.IDLE]: "Idle",
  [TimerStatus.RUNNING]: "Running",
  [TimerStatus.PAUSED]: "Paused",
  [TimerStatus.COMPLETED]: "Completed",
};

function Timer() {
  const { status, elapsedMs, start, pause, reset, setGoal, goalMs } = useTimer();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="relative w-[420px] bg-[#111] border border-[#222] px-10 pt-14 pb-12 shadow-[0_0_0_1px_#1a1a1a,0_40px_80px_rgba(0,0,0,0.6)]">
      <TimerStatusBar />
      <TimerSettingButton onClick={() => setIsModalOpen(true)} />
      <TimerDisplay status={status} elapsedMs={elapsedMs} goalMs={goalMs} />

      <div className="w-full h-px bg-[#1e1e1e] mb-8" />

      <TimerControls
        status={status}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />

      <TimerIndicator status={status} />

      <TimerSettingModal
        isOpen={isModalOpen}
        currentGoalMs={goalMs}
        onSave={setGoal}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Timer;
