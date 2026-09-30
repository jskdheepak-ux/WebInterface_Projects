import { useState, useEffect, useRef } from 'react';
import { playCricketHit } from '../utils/audio';

export default function CricketWidget({ hobby, onLogActivity }) {
  // Shot timing game states
  const [pitchState, setPitchState] = useState('idle'); // 'idle', 'bowling', 'ready', 'hit', 'missed'
  const [score, setScore] = useState(0);
  const [ballsFaced, setBallsFaced] = useState(0);
  const [lastShotResult, setLastShotResult] = useState('');
  const [ballPosition, setBallPosition] = useState(0); // 0% to 100%
  const [matchOvers, setMatchOvers] = useState('4.2');
  const [matchRuns, setMatchRuns] = useState('58');
  const [matchWickets, setMatchWickets] = useState('1');
  const [bowlerType, setBowlerType] = useState('Fast Paced (145 km/h)');

  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  // Bowling animation loop
  useEffect(() => {
    if (pitchState === 'bowling') {
      const duration = bowlerType.includes('Fast') ? 1100 : 1600;
      startTimeRef.current = performance.now();

      const step = (time) => {
        const elapsed = time - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        setBallPosition(progress * 100);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          // Missed timing / bowled
          setPitchState('missed');
          setLastShotResult('Clean Bowled / Dot Ball! 🔴');
          setBallsFaced((b) => b + 1);
        }
      };

      animRef.current = requestAnimationFrame(step);

      return () => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
      };
    }
  }, [pitchState, bowlerType]);

  const startDelivery = () => {
    setBallPosition(0);
    setLastShotResult('');
    setPitchState('bowling');
  };

  const handleSwingBat = () => {
    if (pitchState !== 'bowling') return;

    if (animRef.current) cancelAnimationFrame(animRef.current);

    // Timing evaluation based on ball progress (70% - 90% is sweet spot)
    const pos = ballPosition;
    let runs = 0;
    let feedback = '';
    let boundary = false;

    if (pos >= 78 && pos <= 88) {
      runs = 6;
      feedback = '🚀 MAXIMUM SIX! Sublime Cover Drive lofted into the stands!';
      boundary = true;
    } else if (pos >= 70 && pos <= 94) {
      runs = 4;
      feedback = '⚡ FOUR! Pierced the gap through extra cover!';
      boundary = true;
    } else if (pos >= 58 && pos <= 98) {
      runs = Math.random() > 0.5 ? 2 : 1;
      feedback = `🏏 Solid Placement! Scored ${runs} run(s).`;
    } else if (pos < 58) {
      runs = 0;
      feedback = '⏳ Too Early! Edged onto the pads (Dot ball).';
    } else {
      runs = 0;
      feedback = '💨 Too Late! Beaten by pace outside off-stump.';
    }

    playCricketHit(boundary);
    setScore((s) => s + runs);
    setBallsFaced((b) => b + 1);
    setLastShotResult(feedback);
    setPitchState('hit');
  };

  const handleSaveScorecard = (e) => {
    e.preventDefault();
    if (onLogActivity) {
      onLogActivity({
        hobbyId: 'cricket',
        title: `T20 Match Inning: ${matchRuns}/${matchWickets} (${matchOvers} overs)`,
        minutes: 45,
        type: 'Match Session',
      });
    }
  };

  return (
    <div className="cricket-widget">
      <div className="widget-header">
        <div className="widget-title-wrap">
          <span className="widget-badge">🏏 Interactive Pitch & Batting Simulator</span>
          <h3>Crease & Timing Trainer</h3>
        </div>
        <div className="stat-pill-row">
          <span className="stat-pill">Score: <strong>{score}</strong> ({ballsFaced} b)</span>
          <span className="stat-pill">SR: <strong>{ballsFaced > 0 ? ((score / ballsFaced) * 100).toFixed(1) : '0.0'}</strong></span>
        </div>
      </div>

      {/* Interactive Cricket Pitch Pitch Simulator */}
      <div className="pitch-container">
        <div className="pitch-turf">
          <div className="pitch-crease bowling-crease">
            <span className="stump-label">Bowler</span>
          </div>
          <div className="pitch-middle">
            <div className="pitch-sweet-zone" title="Ideal Timing Sweet Spot">
              <span>SWEET SPOT</span>
            </div>
            {pitchState === 'bowling' && (
              <div
                className="cricket-ball"
                style={{ top: `${ballPosition}%` }}
              />
            )}
          </div>
          <div className="pitch-crease batting-crease">
            <span className="stump-label">Wickets & Batting Crease</span>
            <div className="bat-indicator" />
          </div>
        </div>

        <div className="pitch-controls">
          <div className="bowler-selector">
            <label>Bowler Style:</label>
            <select
              value={bowlerType}
              onChange={(e) => setBowlerType(e.target.value)}
              disabled={pitchState === 'bowling'}
            >
              <option value="Fast Paced (145 km/h)">Fast Paced (145 km/h)</option>
              <option value="Off-Spin Flight (88 km/h)">Off-Spin Flight (88 km/h)</option>
              <option value="Leg-Spin Googly (92 km/h)">Leg-Spin Googly (92 km/h)</option>
            </select>
          </div>

          <div className="action-buttons">
            {pitchState !== 'bowling' ? (
              <button className="btn-action btn-pitch" onClick={startDelivery}>
                🎯 Bowl Next Delivery
              </button>
            ) : (
              <button className="btn-action btn-swing" onClick={handleSwingBat}>
                💥 HIT SHOT NOW!
              </button>
            )}
          </div>
        </div>

        {lastShotResult && (
          <div className={`shot-feedback ${lastShotResult.includes('SIX') || lastShotResult.includes('FOUR') ? 'feedback-highlight' : ''}`}>
            {lastShotResult}
          </div>
        )}
      </div>

      {/* Match Scorecard Quick Logger */}
      <div className="mini-card mt-4">
        <h4>📋 Quick Match Log</h4>
        <form onSubmit={handleSaveScorecard} className="score-form">
          <div className="form-group">
            <label>Overs</label>
            <input
              type="text"
              value={matchOvers}
              onChange={(e) => setMatchOvers(e.target.value)}
              placeholder="e.g. 10.4"
            />
          </div>
          <div className="form-group">
            <label>Team Runs</label>
            <input
              type="number"
              value={matchRuns}
              onChange={(e) => setMatchRuns(e.target.value)}
              placeholder="e.g. 112"
            />
          </div>
          <div className="form-group">
            <label>Wickets</label>
            <input
              type="number"
              value={matchWickets}
              onChange={(e) => setMatchWickets(e.target.value)}
              placeholder="e.g. 2"
              max="10"
              min="0"
            />
          </div>
          <button type="submit" className="btn-submit-score">
            Save Match Inning
          </button>
        </form>
      </div>

      {/* Quick Tips & Drills */}
      <div className="drills-section mt-4">
        <h4>⚡ Recommended Batting & Bowling Drills</h4>
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
