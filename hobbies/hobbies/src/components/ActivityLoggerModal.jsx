import { useState } from 'react';

export default function ActivityLoggerModal({ hobbies, onClose, onSave }) {
  const [hobbyId, setHobbyId] = useState(hobbies[0]?.id || 'cricket');
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState('45');
  const [type, setType] = useState('Practice / Session');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      hobbyId,
      title: title.trim(),
      minutes: parseInt(minutes, 10) || 30,
      type,
      notes: notes.trim(),
      date: new Date().toLocaleDateString(),
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content activity-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">⏱️</span>
            <div>
              <span className="modal-category">Activity Tracker</span>
              <h2>Log Hobby Activity</h2>
            </div>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="activity-logger-form">
          <div className="form-group">
            <label>Select Hobby</label>
            <select value={hobbyId} onChange={(e) => setHobbyId(e.target.value)}>
              {hobbies.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.icon} {h.name} ({h.category})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Activity Summary / Title</label>
            <input
              type="text"
              placeholder="e.g. Net session practice, Watched Interstellar, Jam session..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Duration (Minutes)</label>
              <input
                type="number"
                min="5"
                max="480"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Activity Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Practice / Drills">Practice / Drills</option>
                <option value="Live Match / Game">Live Match / Game</option>
                <option value="Watching / Analysis">Watching / Analysis</option>
                <option value="Music / Jam Session">Music / Jam Session</option>
                <option value="Casual Free Play">Casual Free Play</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Optional Notes / Key Learnings</label>
            <textarea
              rows="3"
              placeholder="What went great? Highlights, scores, or favorite tracks..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="modal-actions-row">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit-primary">
              💾 Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
