import Button from "@components/Timer/Button";

function Timer() {
  return (
    <div className="relative w-[420px] bg-[#111] border border-[#222] px-10 pt-14 pb-12 shadow-[0_0_0_1px_#1a1a1a,0_40px_80px_rgba(0,0,0,0.6)]">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1a1a1a] overflow-hidden">
        <div
          className="h-full bg-[#e8ff00]"
        />
      </div>
      <div>
        <p className="font-['Oswald'] text-[10px] font-normal tracking-[0.3em] text-[#444] uppercase mb-4">
          Plang Timer
        </p>

        <p
          className="font-['IBM_Plex_Mono'] text-[80px] font-light tracking-[-0.02em] leading-none mb-2 min-h-[80px] text-[#f0f0f0]"
        >
          00:00
        </p>

        <p
          className="font-['IBM_Plex_Mono'] text-[13px] tracking-[0.1em] mb-12 h-[18px] text-[#333]"
        >
          .000
        </p>
      </div>

      <div className="w-full h-px bg-[#1e1e1e] mb-8" />

      <div className="grid grid-cols-3 gap-2">
        <Button mode="start" aria-label="Start">
          Start
        </Button>
        <Button
          aria-label="Pause" mode="pause"
        >
          Pause
        </Button>
        <Button
          aria-label="Reset" mode="reset">
          Reset
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <div
          className="w-[5px] h-[5px] rounded-full bg-[#333]"
        />
        <span
          className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.25em] uppercase text-[#333]"
        >
          Idle
        </span>
      </div>
    </div>
  );
}

export default Timer;
