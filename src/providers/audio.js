// Synthesized original ambience. Only immutable Audio descriptors enter this provider.
export function createAudioProvider() {
  let context = null,
    gain = null,
    oscillators = [],
    lastCue = -1,
    lastRoom = null;
  function unlock() {
    if (!context) {
      context = new AudioContext();
      gain = context.createGain();
      gain.gain.value = 0;
      gain.connect(context.destination);
      for (const ratio of [1, 1.007, 1.5]) {
        const oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = 50 * ratio;
        const level = context.createGain();
        level.gain.value = 0.045;
        oscillator.connect(level);
        level.connect(gain);
        oscillator.start();
        oscillators.push({ oscillator, ratio });
      }
    }
    if (context.state === "suspended") context.resume();
  }
  function bell() {
    const now = context.currentTime;
    for (const ratio of [1, 2.41, 3.72]) {
      const o = context.createOscillator(),
        g = context.createGain();
      o.frequency.value = 110 * ratio;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.05, now + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      o.connect(g);
      g.connect(gain);
      o.start();
      o.stop(now + 2.6);
      o.onended = () => {
        o.disconnect();
        g.disconnect();
      };
    }
  }
  return {
    unlock,
    present(d) {
      if (!context) return;
      const now = context.currentTime;
      gain.gain.setTargetAtTime(d.enabled ? d.volume : 0, now, 0.15);
      for (const { oscillator, ratio } of oscillators)
        oscillator.frequency.setTargetAtTime(d.frequency * ratio, now, 0.4);
      if (d.enabled && (d.id !== lastRoom || d.cue > lastCue)) bell();
      lastRoom = d.id;
      lastCue = d.cue;
    },
    dispose() {
      for (const { oscillator } of oscillators) oscillator.stop();
      oscillators = [];
      context?.close();
      context = null;
    },
    stats: () => ({
      context: context?.state ?? "locked",
      oscillators: oscillators.length,
    }),
  };
}
