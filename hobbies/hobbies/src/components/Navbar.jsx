export default function Navbar({ activeFilter, onFilterChange, totalLogged, totalGoal }) {
  const progress = Math.min(Math.round((totalLogged / totalGoal) * 100), 100);

  return (
    <header className="navbar-container">
      <div className="nav-brand">
        <span className="brand-logo-icon">🌟</span>
        <div className="brand-text">
          <h1>Hobby<span className="accent-text">Pulse</span></h1>
          <p className="brand-subtitle">4 Passion Hub • Cricket • Football • Movie • Song</p>
        </div>
      </div>

      <nav className="nav-filters" aria-label="Hobby category filters">
        <button
          type="button"
          className={`nav-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All 4 Hobbies
        </button>
        <button
          type="button"
          className={`nav-tab tab-cricket ${activeFilter === 'cricket' ? 'active' : ''}`}
          onClick={() => onFilterChange('cricket')}
        >
          🏏 Cricket
        </button>
        <button
          type="button"
          className={`nav-tab tab-football ${activeFilter === 'football' ? 'active' : ''}`}
          onClick={() => onFilterChange('football')}
        >
          ⚽ Football
        </button>
        <button
          type="button"
          className={`nav-tab tab-movie ${activeFilter === 'movie' ? 'active' : ''}`}
          onClick={() => onFilterChange('movie')}
        >
          🎬 Movies
        </button>
        <button
          type="button"
          className={`nav-tab tab-song ${activeFilter === 'song' ? 'active' : ''}`}
          onClick={() => onFilterChange('song')}
        >
          🎵 Songs
        </button>
      </nav>

      <div className="nav-stats-pill">
        <div className="stat-text">
          <small>Weekly Goal</small>
          <strong>{totalLogged} / {totalGoal} min ({progress}%)</strong>
        </div>
        <div className="stat-circular-bar" style={{ '--pct': `${progress}%` }}>
          <span>{progress}%</span>
        </div>
      </div>
    </header>
  );
}
