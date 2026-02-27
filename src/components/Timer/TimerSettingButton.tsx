interface Props {
  onClick: () => void;
}

export function TimerSettingButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
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
  );
}
