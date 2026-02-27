import { formatMs, formatTime } from "@utils/formatTime";
import { TimerStatus, TimerStatusType } from "src/types/timer";

interface Props {
  status: TimerStatusType;
  elapsedMs: number;
}

export function TimerDisplay({ status, elapsedMs }: Props) {
  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;
  const isActive = isRunning || isPaused;

  const clockColor = isRunning
    ? "text-white"
    : isPaused
      ? "text-[#888]"
      : "text-[#f0f0f0]";

  const msColor = isRunning ? "text-[#e8ff00]" : "text-[#333]";

  return (
    <div>
      <p className="font-['Oswald'] text-[10px] font-normal tracking-[0.3em] text-[#444] uppercase mb-4">
        Plang Timer
      </p>

      <p className={`font-['IBM_Plex_Mono'] text-[80px] font-light tracking-[-0.02em] leading-none mb-2 min-h-[80px] ${clockColor}`}>
        {formatTime(elapsedMs)}
      </p>

      <p className={`font-['IBM_Plex_Mono'] text-[13px] tracking-[0.1em] mb-12 h-[18px] ${msColor}`}>
        {isActive ? `.${formatMs(elapsedMs)}` : ".000"}
      </p>
    </div>
  );
}
