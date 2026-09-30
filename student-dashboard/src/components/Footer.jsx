import React from 'react';

/**
 * Footer Component (Task 1)
 */
function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-brand">Royal Engineering College &copy; {new Date().getFullYear()}</p>
          <p className="footer-desc">Student Information & Academic Performance Management System</p>
        </div>
        <div className="footer-right">
          <span className="footer-pill">React 18 + Vite</span>
          <span className="footer-pill">Tasks 1–8 Implemented</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
