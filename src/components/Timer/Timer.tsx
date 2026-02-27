import Button from "@components/Timer/Button";
import { formatMs, formatTime } from "@utils/formatTime";
import { useState } from "react";
import useTimer from "src/hooks/useTimer";
import { TimerStatus, TimerStatusType } from "src/types/timer";
import { TimerSettingModal } from "./TimerSettingModal";

const STATUS_LABEL: Record<TimerStatusType, string> = {
  [TimerStatus.IDLE]: "Idle",
  [TimerStatus.RUNNING]: "Running",
  [TimerStatus.PAUSED]: "Paused",
  [TimerStatus.COMPLETED]: "Completed",
};

function Timer() {
  const { status, elapsedMs, start, pause, reset, setGoal, goalMs } = useTimer();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;
  const isIdle = status === TimerStatus.IDLE;
  const isCompleted = status === TimerStatus.COMPLETED;
  const isActive = isRunning || isPaused;

  const clockColor = isRunning
    ? "text-white"
    : isPaused
      ? "text-[#888]"
      : "text-[#f0f0f0]";

  const msColor = isRunning ? "text-[#e8ff00]" : "text-[#333]";

  const dotColor = isRunning
    ? "bg-[#e8ff00]"
    : isPaused
      ? "bg-[#555]"
      : "bg-[#333]";

  const textColor = isRunning
    ? "text-[#e8ff00]"
    : isPaused
      ? "text-[#555]"
      : "text-[#333]";
  return (
    <div className="relative w-[420px] bg-[#111] border border-[#222] px-10 pt-14 pb-12 shadow-[0_0_0_1px_#1a1a1a,0_40px_80px_rgba(0,0,0,0.6)]">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1a1a1a] overflow-hidden">
        <div
          className="h-full bg-[#e8ff00]"
        />
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        aria-label="Open settings"
        className="absolute top-7 right-3 text-[#333] hover:text-[#e8ff00] transition-colors duration-150 cursor-pointer"
      >
        <svg width="32" height="32" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 10a2 2 0 100-4 2 2 0 000 4z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M13.3 6.6l-.8-.5a5.1 5.1 0 000-1.2l.8-.5a.5.5 0 00.2-.6l-.8-1.4a.5.5 0 00-.6-.2l-.9.4a5 5 0 00-1-.6L10 1.5a.5.5 0 00-.5-.5H8a.5.5 0 00-.5.4l-.2 1a5 5 0 00-1 .6l-.9-.4a.5.5 0 00-.6.2L4 4.2a.5.5 0 00.2.6l.8.5a5.1 5.1 0 000 1.2l-.8.5a.5.5 0 00-.2.6l.8 1.4a.5.5 0 00.6.2l.9-.4a5 5 0 001 .6l.2 1a.5.5 0 00.5.4h1.5a.5.5 0 00.5-.4l.2-1a5 5 0 001-.6l.9.4a.5.5 0 00.6-.2l.8-1.4a.5.5 0 00-.2-.6z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </button>
      <div>
        <p className="font-['Oswald'] text-[10px] font-normal tracking-[0.3em] text-[#444] uppercase mb-4">
          Plang Timer
        </p>

        <p
          className={`font-['IBM_Plex_Mono'] text-[80px] font-light tracking-[-0.02em] leading-none mb-2 min-h-[80px] text-[#f0f0f0] ${clockColor}`}
        >
          {formatTime(elapsedMs)}
        </p>

        <p
          className={`font-['IBM_Plex_Mono'] text-[13px] tracking-[0.1em] mb-12 h-[18px] text-[#333] ${msColor}`}
        >
          {isActive ? `.${formatMs(elapsedMs)}` : ".000"}
        </p>
      </div>

      <div className="w-full h-px bg-[#1e1e1e] mb-8" />

      <div className="grid grid-cols-3 gap-2">
        <Button
          mode="start"
          aria-label={isPaused ? "Resume" : "Start"}
          disabled={isRunning || isCompleted}
          onClick={start}
        >
          {isPaused ? "Resume" : "Start"}
        </Button>
        <Button
          aria-label="Pause"
          mode="pause"
          disabled={!isRunning}
          onClick={pause}
        >
          Pause
        </Button>
        <Button
          aria-label="Reset"
          mode="reset"
          disabled={isIdle}
          onClick={reset}
        >
          Reset
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <div className={`w-[5px] h-[5px] rounded-full transition-colors duration-300 ${dotColor}`} />
        <span className={`font-['IBM_Plex_Mono'] text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${textColor}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>

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
