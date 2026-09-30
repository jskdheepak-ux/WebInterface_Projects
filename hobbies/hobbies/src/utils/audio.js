// Lightweight Web Audio API Synthesizer for SFX and Music notes
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playNote(frequency = 440, type = 'sine', duration = 0.3, gainLevel = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Graceful fallback if audio is blocked
  }
}

// Cricket Bat Hit sound effect
export function playCricketHit(isBoundary = false) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Wooden thud
    playNote(220, 'triangle', 0.1, 0.25);
    playNote(110, 'sine', 0.15, 0.3);

    if (isBoundary) {
      setTimeout(() => {
        // Cheering chords (major chord)
        playNote(523.25, 'sine', 0.4, 0.15); // C5
        playNote(659.25, 'sine', 0.4, 0.15); // E5
        playNote(783.99, 'sine', 0.4, 0.15); // G5
        playNote(1046.50, 'triangle', 0.5, 0.1); // C6
      }, 100);
    }
  } catch {
    // Ignore
  }
}

// Football Kick / Goal sound
export function playFootballKick(isGoal = false) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Deep punchy bass kick
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);

    if (isGoal) {
      setTimeout(() => {
        // Goal celebratory fanfare
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          setTimeout(() => playNote(freq, 'triangle', 0.3, 0.18), idx * 80);
        });
      }, 150);
    }
  } catch {
    // Ignore
  }
}

// Movie Projector / Ding sound
export function playMovieChime() {
  try {
    [587.33, 880, 1174.66].forEach((freq, idx) => {
      setTimeout(() => playNote(freq, 'sine', 0.35, 0.12), idx * 70);
    });
  } catch {
    // Ignore
  }
}

// Musical Piano Key notes mapping
export const PIANO_KEYS = [
  { note: 'C4', label: 'C', freq: 261.63, isBlack: false },
  { note: 'C#4', label: 'C#', freq: 277.18, isBlack: true },
  { note: 'D4', label: 'D', freq: 293.66, isBlack: false },
  { note: 'D#4', label: 'D#', freq: 311.13, isBlack: true },
  { note: 'E4', label: 'E', freq: 329.63, isBlack: false },
  { note: 'F4', label: 'F', freq: 349.23, isBlack: false },
  { note: 'F#4', label: 'F#', freq: 369.99, isBlack: true },
  { note: 'G4', label: 'G', freq: 392.00, isBlack: false },
  { note: 'G#4', label: 'G#', freq: 415.30, isBlack: true },
  { note: 'A4', label: 'A', freq: 440.00, isBlack: false },
  { note: 'A#4', label: 'A#', freq: 466.16, isBlack: true },
  { note: 'B4', label: 'B', freq: 493.88, isBlack: false },
  { note: 'C5', label: 'C5', freq: 523.25, isBlack: false },
];
