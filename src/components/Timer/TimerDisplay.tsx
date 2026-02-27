import { formatMs, formatTime } from "@utils/formatTime";
import { TimerStatus, TimerStatusType } from "src/types/timer";

interface Props {
  status: TimerStatusType;
  elapsedMs: number;
  goalMs: number | null;
}

export function TimerDisplay({ status, elapsedMs, goalMs }: Props) {
  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;
  const isActive = isRunning || isPaused;

  const clockColor = isRunning
    ? "text-white"
    : isPaused
      ? "text-[#888]"
      : "text-[#f0f0f0]";

  const msColor = isRunning ? "text-[#e8ff00]" : "text-[#333]";

  const progress = goalMs !== null ? Math.min(elapsedMs / goalMs, 1) : null;

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

      <div className="mb-8 h-[32px]">
        {progress !== null && (
          <div className="mb-8">
            <div className="w-full h-[2px] bg-[#1e1e1e]">
              <div
                className="h-full bg-[#e8ff00] transition-[width] duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-['IBM_Plex_Mono'] text-[9px] text-[#333] tracking-[0.1em]">
                0
              </span>
              <span className="font-['IBM_Plex_Mono'] text-[9px] text-[#444] tracking-[0.1em]">
                {Math.floor(progress * 100)}%
              </span>
              <span className="font-['IBM_Plex_Mono'] text-[9px] text-[#333] tracking-[0.1em]">
                {formatTime(goalMs!)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
