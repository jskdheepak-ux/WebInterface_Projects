import { useState } from 'react';
import { MOVIE_ROULETTE_DATABASE, INITIAL_WATCHLIST } from '../data/hobbiesData';
import { playMovieChime } from '../utils/audio';

const MOODS = ['All Moods', 'Mind-Bending', 'Visual Wonder', 'Whodunnit Mystery', 'Epic Sports Drama', 'Heartwarming Musical', 'Aesthetic & Quirky'];

export default function MovieWidget({ hobby, onLogActivity }) {
  const [watchlist, setWatchlist] = useState(INITIAL_WATCHLIST);
  const [selectedMood, setSelectedMood] = useState('All Moods');
  const [roulettePick, setRoulettePick] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // New movie input
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('Sci-Fi / Thriller');
  const [newRating, setNewRating] = useState(5);
  const [newNotes, setNewNotes] = useState('');

  const spinMovieRoulette = () => {
    setIsSpinning(true);
    playMovieChime();

    const pool = selectedMood === 'All Moods'
      ? MOVIE_ROULETTE_DATABASE
      : MOVIE_ROULETTE_DATABASE.filter((m) => m.mood === selectedMood);

    const actualPool = pool.length > 0 ? pool : MOVIE_ROULETTE_DATABASE;

    let iterations = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * actualPool.length);
      setRoulettePick(actualPool[randomIdx]);
      iterations++;
      if (iterations >= 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const movieEntry = {
      id: Date.now(),
      title: newTitle.trim(),
      genre: newGenre,
      year: new Date().getFullYear(),
      rating: Number(newRating),
      status: 'Watched',
      notes: newNotes.trim() || 'Exciting viewing experience.',
    };

    setWatchlist([movieEntry, ...watchlist]);
    setNewTitle('');
    setNewNotes('');

    if (onLogActivity) {
      onLogActivity({
        hobbyId: 'movie',
        title: `Watched "${movieEntry.title}" (${movieEntry.rating}★)`,
        minutes: 120,
        type: 'Cinema Diary',
      });
    }
  };

  const toggleWatchStatus = (id) => {
    setWatchlist((list) =>
      list.map((m) => (m.id === id ? { ...m, status: m.status === 'Watched' ? 'Watchlist' : 'Watched' } : m))
    );
  };

  return (
    <div className="movie-widget">
      <div className="widget-header">
        <div className="widget-title-wrap">
          <span className="widget-badge">🎬 Cinema Diary & Roulette</span>
          <h3>Film Vault & Movie Night Picker</h3>
        </div>
        <div className="stat-pill-row">
          <span className="stat-pill">Watched: <strong>{watchlist.filter((m) => m.status === 'Watched').length}</strong></span>
          <span className="stat-pill">Watchlist: <strong>{watchlist.filter((m) => m.status === 'Watchlist').length}</strong></span>
        </div>
      </div>

      {/* Movie Night Roulette */}
      <div className="roulette-box">
        <div className="roulette-top">
          <h4>🎲 Tonight's Movie Roulette</h4>
          <div className="mood-select-row">
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              disabled={isSpinning}
            >
              {MOODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <button
              type="button"
              className={`btn-action btn-spin ${isSpinning ? 'spinning' : ''}`}
              onClick={spinMovieRoulette}
            >
              {isSpinning ? '🎰 Spinning...' : '🍿 Roll Tonight\'s Movie'}
            </button>
          </div>
        </div>

        {roulettePick && (
          <div className="roulette-result-card animate-fade">
            <div className="movie-poster-placeholder">🍿</div>
            <div className="movie-result-details">
              <div className="movie-meta-badge">
                <span>{roulettePick.mood}</span> • <span>{roulettePick.year}</span> • <span>{roulettePick.genre}</span>
              </div>
              <h4>{roulettePick.title}</h4>
              <p className="director">Directed by <strong>{roulettePick.director}</strong></p>
              <p className="synopsis">{roulettePick.desc}</p>
            </div>
          </div>
        )}
      </div>

      {/* Add to Movie Diary Form */}
      <div className="mini-card mt-4">
        <h4>✍️ Log a Movie You Watched</h4>
        <form onSubmit={handleAddMovie} className="movie-form">
          <div className="form-row-2">
            <div className="form-group">
              <label>Movie Title</label>
              <input
                type="text"
                placeholder="e.g. Inception, Dune..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <select value={newGenre} onChange={(e) => setNewGenre(e.target.value)}>
                <option value="Sci-Fi / Adventure">Sci-Fi / Adventure</option>
                <option value="Action / Thriller">Action / Thriller</option>
                <option value="Drama / Inspirational">Drama / Inspirational</option>
                <option value="Mystery / Crime">Mystery / Crime</option>
                <option value="Animation / Fantasy">Animation / Fantasy</option>
                <option value="Comedy / Romance">Comedy / Romance</option>
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Rating (1 to 5 Stars)</label>
              <select value={newRating} onChange={(e) => setNewRating(e.target.value)}>
                <option value="5">⭐⭐⭐⭐⭐ (5/5 Masterpiece)</option>
                <option value="4">⭐⭐⭐⭐ (4/5 Great)</option>
                <option value="3">⭐⭐⭐ (3/5 Good)</option>
                <option value="2">⭐⭐ (2/5 Mediocre)</option>
                <option value="1">⭐ (1/5 Skip)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Short Review / Notes</label>
              <input
                type="text"
                placeholder="Favorite scenes, audio, direction..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-submit-score">
            Add to Cinema Diary
          </button>
        </form>
      </div>

      {/* Film Watchlist Collection */}
      <div className="watchlist-section mt-4">
        <h4>🎬 Recent Films & Watchlist</h4>
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <div key={item.id} className="watchlist-card">
              <div className="watchlist-card-header">
                <span className="movie-genre-tag">{item.genre}</span>
                <button
                  type="button"
                  className={`status-chip ${item.status === 'Watched' ? 'watched' : 'unwatched'}`}
                  onClick={() => toggleWatchStatus(item.id)}
                >
                  {item.status === 'Watched' ? '✓ Watched' : '+ Watchlist'}
                </button>
              </div>
              <h5>{item.title} <small>({item.year})</small></h5>
              <div className="movie-stars">
                {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
              </div>
              <p className="movie-notes">"{item.notes}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
