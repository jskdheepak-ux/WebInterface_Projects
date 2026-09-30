export default function HobbyCard({
  hobby,
  onOpenDetail,
  onQuickLogMinutes,
  onToggleDrill,
}) {
  const percent = Math.min(
    Math.round((hobby.loggedMinutes / hobby.weeklyGoalMinutes) * 100),
    100
  );

  return (
    <article className={`hobby-card-box card-${hobby.id}`}>
      <div className="card-top-row">
        <div className="card-icon-badge">
          <span className="card-emoji">{hobby.icon}</span>
          <div className="card-title-group">
            <span className="category-tag">{hobby.category}</span>
            <h3>{hobby.name}</h3>
          </div>
        </div>
        <span className="hobby-badge-pill">{hobby.badge}</span>
      </div>

      <p className="card-description">{hobby.description}</p>

      {/* Progress towards weekly goal */}
      <div className="card-progress-section">
        <div className="progress-label-row">
          <span>Weekly Time Logged</span>
          <strong>{hobby.loggedMinutes} / {hobby.weeklyGoalMinutes} min ({percent}%)</strong>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${percent}%`, backgroundColor: hobby.color }}
          />
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="card-stats-grid">
        {hobby.stats.map((stat, i) => (
          <div key={i} className="stat-box">
            <small>{stat.label}</small>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      {/* Quick Drills / Action items */}
      <div className="card-drills-box">
        <div className="drills-header">
          <span>Active Practice Drills</span>
          <small>
            {hobby.drills.filter((d) => d.completed).length}/{hobby.drills.length} Done
          </small>
        </div>
        <div className="drills-mini-list">
          {hobby.drills.slice(0, 3).map((drill) => (
            <label key={drill.id} className="drill-checkbox-item">
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

      {/* Action Footer */}
      <div className="card-footer-actions">
        <button
          type="button"
          className="btn-open-interactive"
          onClick={() => onOpenDetail(hobby)}
          style={{ borderColor: hobby.color }}
        >
          <span>Open {hobby.name} Studio & Games</span>
          <span className="arrow">→</span>
        </button>
        <button
          type="button"
          className="btn-quick-log"
          title="Quick log +30 minutes"
          onClick={() => onQuickLogMinutes(hobby.id, 30)}
        >
          +30m
        </button>
      </div>
    </article>
  );
}
