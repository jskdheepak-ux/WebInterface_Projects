import { useState } from 'react';
import { playFootballKick } from '../utils/audio';

const GOAL_ZONES = [
  { id: 'top-left', label: 'Top Left 🎯' },
  { id: 'top-center', label: 'Top Bar 🚀' },
  { id: 'top-right', label: 'Top Right 🎯' },
  { id: 'bottom-left', label: 'Bottom Left ⚡' },
  { id: 'bottom-center', label: 'Low Panenka 🪄' },
  { id: 'bottom-right', label: 'Bottom Right ⚡' },
];

const FORMATIONS = [
  { name: '4-3-3 Attacking', desc: 'High pressing with explosive wingers & false nine' },
  { name: '4-2-3-1 Balanced', desc: 'Double pivot midfield control & central playmaker' },
  { name: '3-5-2 Wing-Backs', desc: 'Wide dominance with two dynamic center forwards' },
  { name: '4-4-2 Classic', desc: 'Compact defensive bank & direct counter attacks' },
];

export default function FootballWidget({ hobby, onLogActivity }) {
  const [goals, setGoals] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lastShotInfo, setLastShotInfo] = useState('');
  const [gkPosition, setGkPosition] = useState('center');
  const [isShooting, setIsShooting] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(FORMATIONS[0].name);

  // Match Log Inputs
  const [matchGoals, setMatchGoals] = useState('2');
  const [matchAssists, setMatchAssists] = useState('1');
  const [matchMinutes, setMatchMinutes] = useState('60');

  const takePenalty = (zoneId) => {
    if (isShooting) return;
    setIsShooting(true);

    const zones = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
    const randomGkChoice = zones[Math.floor(Math.random() * zones.length)];
    setGkPosition(randomGkChoice);

    const isGoal = zoneId !== randomGkChoice;
    playFootballKick(isGoal);

    setTimeout(() => {
      setAttempts((a) => a + 1);
      if (isGoal) {
        setGoals((g) => g + 1);
        setLastShotInfo('⚽ GOAAAAL! Smashed right past the keeper into the back of the net!');
      } else {
        setLastShotInfo('🧤 SAVED! Sensational acrobatic dive from the goalkeeper!');
      }
      setIsShooting(false);
    }, 450);
  };

  const handleSaveMatch = (e) => {
    e.preventDefault();
    if (onLogActivity) {
      onLogActivity({
        hobbyId: 'football',
        title: `Football Match (${selectedFormation}): ${matchGoals} Goals, ${matchAssists} Assists`,
        minutes: parseInt(matchMinutes, 10) || 60,
        type: 'Turf Match',
      });
    }
  };

  return (
    <div className="football-widget">
      <div className="widget-header">
        <div className="widget-title-wrap">
          <span className="widget-badge">⚽ Interactive Penalty Shootout</span>
          <h3>Spot-Kick & Match Tactics</h3>
        </div>
        <div className="stat-pill-row">
          <span className="stat-pill">Goals: <strong>{goals}</strong> / {attempts}</span>
          <span className="stat-pill">Accuracy: <strong>{attempts > 0 ? Math.round((goals / attempts) * 100) : 0}%</strong></span>
        </div>
      </div>

      {/* Goal Post Interactive Penalty Arena */}
      <div className="goal-arena">
        <div className="goal-frame">
          <div className="goal-net" />
          <div className={`goalkeeper pos-${gkPosition} ${isShooting ? 'gk-diving' : ''}`}>
            🧤
          </div>

          <div className="target-zones-grid">
            {GOAL_ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                className="zone-btn"
                disabled={isShooting}
                onClick={() => takePenalty(zone.id)}
              >
                {zone.label}
              </button>
            ))}
          </div>
        </div>

        <div className="penalty-spot">
          <div className="football-ball">⚽</div>
          <p className="penalty-hint">Choose your target corner above to strike!</p>
        </div>

        {lastShotInfo && (
          <div className={`shot-feedback ${lastShotInfo.includes('GOAAAAL') ? 'feedback-highlight' : ''}`}>
            {lastShotInfo}
          </div>
        )}
      </div>

      {/* Tactical Formations & Match logger */}
      <div className="mini-card mt-4">
        <h4>📋 Turf & 11v11 Matchday Logger</h4>
        <div className="formation-picker mb-3">
          <label>Favorite Tactical Setup:</label>
          <div className="formation-chips">
            {FORMATIONS.map((f) => (
              <button
                key={f.name}
                type="button"
                className={`chip-btn ${selectedFormation === f.name ? 'active' : ''}`}
                onClick={() => setSelectedFormation(f.name)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSaveMatch} className="score-form">
          <div className="form-group">
            <label>Goals Scored</label>
            <input
              type="number"
              min="0"
              value={matchGoals}
              onChange={(e) => setMatchGoals(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Key Assists</label>
            <input
              type="number"
              min="0"
              value={matchAssists}
              onChange={(e) => setMatchAssists(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Minutes Played</label>
            <input
              type="number"
              min="10"
              value={matchMinutes}
              onChange={(e) => setMatchMinutes(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit-score">
            Log Football Session
          </button>
        </form>
      </div>

      {/* Training Drills */}
      <div className="drills-section mt-4">
        <h4>⚡ Core Drills & Skills</h4>
        <div className="drills-grid">
          {hobby.drills?.map((drill) => (
            <div key={drill.id} className="drill-item">
              <span className="drill-icon">{drill.completed ? '✅' : '⏳'}</span>
              <span className={drill.completed ? 'drill-done' : ''}>{drill.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
