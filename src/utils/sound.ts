export function playGoalReachedSound(): void {
  try {
    const ctx = new AudioContext();

    const beep = (startTime: number, frequency: number, duration: number) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(frequency, startTime);

      gainNode.gain.setValueAtTime(0.4, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    beep(now, 880, 0.15);
    beep(now + 0.18, 1100, 0.15);
    beep(now + 0.36, 1320, 0.3);

    setTimeout(() => ctx.close(), 1000);
  } catch (e) {
    console.warn("AudioContext를 사용할 수 없습니다.", e);
  }
}
