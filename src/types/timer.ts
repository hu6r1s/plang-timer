export const TimerStatus = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
} as const;

export type TimerStatusType = (typeof TimerStatus)[keyof typeof TimerStatus];

export interface TimerState {
  status: TimerStatusType;
  elapsedMs: number;
  startedAt: number | null;
}
