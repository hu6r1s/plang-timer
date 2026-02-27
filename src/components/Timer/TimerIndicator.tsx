import { TimerStatus, TimerStatusType } from "src/types/timer";

interface Props {
  status: TimerStatusType;
}

const STATUS_LABEL: Record<TimerStatusType, string> = {
  [TimerStatus.IDLE]: "Idle",
  [TimerStatus.RUNNING]: "Running",
  [TimerStatus.PAUSED]: "Paused",
  [TimerStatus.COMPLETED]: "Completed",
};

export function TimerIndicator({ status }: Props) {
  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;

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
    <div className="flex items-center gap-2 mt-6">
      <div className={`w-[5px] h-[5px] rounded-full transition-colors duration-300 ${dotColor}`} />
      <span className={`font-['IBM_Plex_Mono'] text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${textColor}`}>
        {STATUS_LABEL[status]}
      </span>
    </div>
  );
}
