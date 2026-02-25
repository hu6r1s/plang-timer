import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode: "start" | "pause" | "reset";
}

const modeColor: Record<Props["mode"], string> = {
  start: `
    bg-[#e8ff00] text-[#0a0a0a] border-[#e8ff00]
    hover:bg-[#f5ff4d] hover:border-[#f5ff4d]
  `,
  pause: `
    bg-transparent text-[#e8ff00] border-[#e8ff00]
    hover:enabled:bg-[rgba(232,255,0,0.06)]
    disabled:text-[#333] disabled:border-[#222]
  `,
  reset: `
    bg-transparent text-[#555] border-[#222]
    hover:enabled:text-[#aaa] hover:enabled:border-[#444]
  `,
};

function Button({ mode, className = "", children, ...props }: Props) {
  return (
    <button
      {...props}
      className={`
          py-[14px] text-center
          font-['Oswald'] text-[12px] font-normal tracking-[0.25em] uppercase
          border transition-all duration-150 cursor-pointer
          active:opacity-90
          disabled:opacity-30 disabled:cursor-not-allowed
          ${modeColor[mode]}
          ${className}
        `}
    >
      {children}
    </button>
  );
}

export default Button;
