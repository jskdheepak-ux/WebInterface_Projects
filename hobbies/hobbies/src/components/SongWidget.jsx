import { useState, useEffect, useRef } from 'react';
import { playNote, PIANO_KEYS } from '../utils/audio';
import { SAMPLE_PLAYLISTS } from '../data/hobbiesData';

export default function SongWidget({ hobby, onLogActivity }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(SAMPLE_PLAYLISTS[0]);
  const [activeKey, setActiveKey] = useState(null);
  const [bpm, setBpm] = useState(120);
  const [tapTimes, setTapTimes] = useState([]);
  const [instrument, setInstrument] = useState('sine'); // 'sine', 'triangle', 'square', 'sawtooth'

  // Visualizer animated bars
  const [visualizerHeights, setVisualizerHeights] = useState([30, 60, 45, 90, 75, 40, 85, 95, 50, 70, 35, 65]);
  const animIntervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      animIntervalRef.current = setInterval(() => {
        setVisualizerHeights(
          Array.from({ length: 14 }, () => Math.floor(Math.random() * 85) + 15)
        );
      }, 100);
    } else {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
      setVisualizerHeights(Array.from({ length: 14 }, () => 15));
    }
    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, [isPlaying]);

  const handleKeyPress = (keyObj) => {
    setActiveKey(keyObj.note);
    playNote(keyObj.freq, instrument, 0.35, 0.2);
    setTimeout(() => setActiveKey(null), 250);
  };

  const handleTapBpm = () => {
    const now = performance.now();
    const newTaps = [...tapTimes, now].slice(-5);
    setTapTimes(newTaps);

    if (newTaps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
    // play soft metronome click
    playNote(880, 'sine', 0.05, 0.15);
  };

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      // play intro chord
      playNote(261.63, 'sine', 0.4, 0.12);
      playNote(329.63, 'sine', 0.4, 0.12);
      playNote(392.00, 'sine', 0.4, 0.12);
    }
  };

  const handleLogPractice = () => {
    if (onLogActivity) {
      onLogActivity({
        hobbyId: 'song',
        title: `Music Practice: Piano Keys & ${activeTrack.title}`,
        minutes: 30,
        type: 'Music & Jam Session',
      });
    }
  };

  return (
    <div className="song-widget">
      <div className="widget-header">
        <div className="widget-title-wrap">
          <span className="widget-badge">🎵 Interactive Synth & Player</span>
          <h3>Melody, Chords & Audio Beats</h3>
        </div>
        <div className="stat-pill-row">
          <span className="stat-pill">BPM: <strong>{bpm}</strong></span>
          <span className="stat-pill">Playing: <strong>{isPlaying ? 'Live 🎶' : 'Paused'}</strong></span>
        </div>
      </div>

      {/* Simulated Audio Visualizer & Player */}
      <div className="player-deck">
        <div className="player-track-info">
          <div className="album-art-disc animate-spin-slow">
            <span className="vinyl-groove">{isPlaying ? '🎧' : '💿'}</span>
          </div>
          <div className="track-details">
            <span className="track-genre-chip">{activeTrack.genre}</span>
            <h4>{activeTrack.title}</h4>
            <p>{activeTrack.vibe} • {activeTrack.trackCount} Curated Songs</p>
          </div>
        </div>

        {/* Dynamic Equalizer Visualizer */}
        <div className="visualizer-container" aria-label="Equalizer visualizer">
          {visualizerHeights.map((h, idx) => (
            <div
              key={idx}
              className={`visualizer-bar ${isPlaying ? 'active' : ''}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <div className="player-controls">
          <button
            type="button"
            className={`btn-play-pause ${isPlaying ? 'is-playing' : ''}`}
            onClick={togglePlay}
          >
            {isPlaying ? '⏸ Pause Vibes' : '▶ Play Ambient Beat'}
          </button>
          <button type="button" className="btn-action btn-log-quick" onClick={handleLogPractice}>
            ⚡ Log 30m Jam Session
          </button>
        </div>
      </div>

      {/* Interactive Web Audio Synthesizer Piano */}
      <div className="mini-card mt-4">
        <div className="piano-header">
          <h4>🎹 Real Web Audio Synthesizer Keyboard</h4>
          <div className="synth-type-selector">
            <label>Waveform:</label>
            <select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
              <option value="sine">Pure Sine (Flute/Soft)</option>
              <option value="triangle">Triangle (Warm Piano)</option>
              <option value="square">Square (8-Bit Retro)</option>
              <option value="sawtooth">Sawtooth (Synth Lead)</option>
            </select>
          </div>
        </div>
        <p className="synth-instruction">Click any key to synthesize live frequencies using Web Audio API:</p>

        <div className="piano-keyboard">
          {PIANO_KEYS.map((k) => (
            <button
              key={k.note}
              type="button"
              className={`piano-key ${k.isBlack ? 'black-key' : 'white-key'} ${activeKey === k.note ? 'pressed' : ''}`}
              onClick={() => handleKeyPress(k)}
              title={`${k.note} (${k.freq.toFixed(1)} Hz)`}
            >
              <span>{k.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* BPM Tap Tempo & Playlists */}
      <div className="bpm-and-playlists-grid mt-4">
        <div className="bpm-tap-card">
          <h4>⏱️ Tap Tempo / BPM Detector</h4>
          <p>Tap repeatedly to the rhythm of any song:</p>
          <div className="bpm-display">
            <strong>{bpm}</strong> <span>BPM</span>
          </div>
          <button type="button" className="btn-tap-tempo" onClick={handleTapBpm}>
            👆 TAP BEAT
          </button>
        </div>

        <div className="playlists-card">
          <h4>📻 Curated Playlists</h4>
          <div className="playlist-list">
            {SAMPLE_PLAYLISTS.map((pl) => (
              <div
                key={pl.id}
                className={`playlist-item ${activeTrack.id === pl.id ? 'active-playlist' : ''}`}
                onClick={() => {
                  setActiveTrack(pl);
                  setBpm(pl.bpm);
                }}
              >
                <div className="pl-info">
                  <strong>{pl.title}</strong>
                  <small>{pl.genre} • {pl.bpm} BPM</small>
                </div>
                <span className="pl-badge">{pl.vibe}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
