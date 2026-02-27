import { useTimerStore } from "@store/timerStore";
import { useEffect, useState } from "react";
import { TimerStatus } from "src/types/timer";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  currentGoalMs: number | null;
  onSave: (ms: number | null) => void;
  onClose: () => void;
}

export function TimerSettingModal({ isOpen, currentGoalMs, onSave, onClose }: Props) {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const { status, reset } = useTimerStore();

  useEffect(() => {
    if (isOpen && currentGoalMs !== null) {
      const total = Math.floor(currentGoalMs / 1000);
      setHours(Math.floor(total / 3600));
      setMinutes(Math.floor((total % 3600) / 60));
      setSeconds(total % 60);
    } else if (isOpen) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  const handleSave = () => {
    if (status === TimerStatus.PAUSED || status === TimerStatus.RUNNING || status === TimerStatus.COMPLETED) {
      reset()
    }
    onSave(totalSeconds > 0 ? totalSeconds * 1000 : null);
    onClose();
  };

  const handleRemove = () => {
    onSave(null);
    onClose();
  };

  const showWarning = status === TimerStatus.RUNNING || status === TimerStatus.PAUSED || status === TimerStatus.COMPLETED;

  const inputClass = `
    w-full bg-[#0a0a0a] border border-[#2a2a2a] text-[#f0f0f0]
    font-['IBM_Plex_Mono'] text-[24px] font-light text-center
    py-3 outline-none
    focus:border-[#e8ff00] transition-colors duration-150
    [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
  `;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[360px] bg-[#111] border border-[#222] px-8 pt-10 pb-8 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <p className="font-['Oswald'] text-[10px] tracking-[0.3em] text-[#444] uppercase">
            목표 시간 설정
          </p>
          <button
            onClick={onClose}
            className="text-[#444] hover:text-[#888] transition-colors duration-150 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <div className="h-4">
          {showWarning && (
            <p className="font-['IBM_Plex_Mono'] text-[10px] text-[#e8ff00] tracking-[0.1em]">
              ※ 저장 시 타이머가 초기화됩니다
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-2 mb-3">
          {[
            { label: "HH", value: hours, max: 23, onChange: setHours },
            { label: "MM", value: minutes, max: 59, onChange: setMinutes },
            { label: "SS", value: seconds, max: 59, onChange: setSeconds },
          ].map(({ label, value, max, onChange }) => (
            <div key={label} className="flex flex-col gap-2">
              <input
                type="number"
                min={0}
                max={max}
                value={value === 0 ? "" : value}
                placeholder="00"
                onChange={(e) => {
                  const v = Math.min(max, Math.max(0, Number(e.target.value) || 0));
                  onChange(v);
                }}
                className={inputClass}
              />
              <p className="font-['Oswald'] text-[9px] tracking-[0.25em] text-[#333] uppercase text-center">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#333] tracking-[0.1em] text-center mb-8 h-4">
          {totalSeconds > 0 ? `${totalSeconds.toLocaleString()} seconds` : ""}
        </p>

        <div className="w-full h-px bg-[#1e1e1e] mb-6" />

        <div className="flex flex-col gap-2">
          <Button
            mode="start"
            disabled={totalSeconds === 0}
            onClick={handleSave}
            className="w-full"
          >
            Save
          </Button>
          {currentGoalMs !== null && (
            <Button
              mode="reset"
              onClick={handleRemove}
              className="w-full"
            >
              Remove Goal
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
