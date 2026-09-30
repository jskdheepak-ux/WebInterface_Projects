import React from 'react';

/**
 * Header Component (Task 2)
 * Displays:
 * 1. College Name
 * 2. Student Dashboard
 */
function Header() {
  return (
    <header className="dashboard-header">
      <div className="header-container">
        <div className="college-branding">
          <div className="college-logo-icon">
            <span className="college-initials">REC</span>
          </div>
          <div className="college-info">
            <h1 className="college-name">Royal Engineering College</h1>
            <p className="college-tagline">Department of Computer Science & Engineering | Academic Year 2025–2026</p>
          </div>
        </div>

        <div className="header-title-badge">
          <div className="badge-pill">
            <span className="live-indicator"></span>
            Live Academic Portal
          </div>
          <h2 className="dashboard-title">Student Dashboard</h2>
        </div>
      </div>
    </header>
  );
}

export default Header;
