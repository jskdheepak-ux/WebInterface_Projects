import { useState } from 'react';
import CricketWidget from './CricketWidget';
import FootballWidget from './FootballWidget';
import MovieWidget from './MovieWidget';
import SongWidget from './SongWidget';

export default function HobbyDetailModal({
  hobby,
  onClose,
  onLogActivity,
  onToggleDrill,
}) {
  const [activeModalTab, setActiveModalTab] = useState('interactive'); // 'interactive', 'skills', 'highlights'

  if (!hobby) return null;

  const renderWidget = () => {
    switch (hobby.id) {
      case 'cricket':
        return <CricketWidget hobby={hobby} onLogActivity={onLogActivity} />;
      case 'football':
        return <FootballWidget hobby={hobby} onLogActivity={onLogActivity} />;
      case 'movie':
        return <MovieWidget hobby={hobby} onLogActivity={onLogActivity} />;
      case 'song':
        return <SongWidget hobby={hobby} onLogActivity={onLogActivity} />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content hobby-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: `4px solid ${hobby.color}` }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">{hobby.icon}</span>
            <div>
              <span className="modal-category">{hobby.category}</span>
              <h2>{hobby.name} Hub</h2>
            </div>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab ${activeModalTab === 'interactive' ? 'active' : ''}`}
            onClick={() => setActiveModalTab('interactive')}
          >
            🎮 Interactive Simulator & Tools
          </button>
          <button
            type="button"
            className={`modal-tab ${activeModalTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveModalTab('skills')}
          >
            ⚡ Skills & Practice Drills
          </button>
          <button
            type="button"
            className={`modal-tab ${activeModalTab === 'highlights' ? 'active' : ''}`}
            onClick={() => setActiveModalTab('highlights')}
          >
            🏆 Highlights & Milestones
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          {activeModalTab === 'interactive' && (
            <div className="tab-pane-interactive animate-fade">
              {renderWidget()}
            </div>
          )}

          {activeModalTab === 'skills' && (
            <div className="tab-pane-skills animate-fade">
              <div className="skills-card">
                <h4>🎯 Core Skill Mastery</h4>
                <div className="skills-list">
                  {hobby.skills?.map((skill, idx) => (
                    <div key={idx} className="skill-meter-row">
                      <div className="skill-meta">
                        <span>{skill.name}</span>
                        <strong>{skill.level}%</strong>
                      </div>
                      <div className="skill-track">
                        <div
                          className="skill-bar"
                          style={{ width: `${skill.level}%`, backgroundColor: hobby.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drills-card mt-4">
                <h4>📋 Full Checklist & Training Schedule</h4>
                <div className="drills-list-full">
                  {hobby.drills?.map((drill) => (
                    <label key={drill.id} className="drill-checkbox-item-full">
                      <input
                        type="checkbox"
                        checked={drill.completed}
                        onChange={() => onToggleDrill(hobby.id, drill.id)}
                      />
                      <span className={drill.completed ? 'completed-text' : ''}>
                        {drill.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeModalTab === 'highlights' && (
            <div className="tab-pane-highlights animate-fade">
              <div className="highlights-box">
                <h4>🌟 Key Moments & Proud Milestones</h4>
                <ul className="highlights-timeline">
                  {hobby.highlights?.map((h, i) => (
                    <li key={i} className="timeline-item">
                      <span className="timeline-marker" style={{ backgroundColor: hobby.color }}>
                        ✓
                      </span>
                      <p>{h}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="quote-box mt-4" style={{ borderColor: hobby.color }}>
                <blockquote>"{hobby.description}"</blockquote>
                <cite>— Your {hobby.name} Journey</cite>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
