import React, { useState } from 'react';

/**
 * =========================================================================
 * TOPIC: Student Dashboard Application
 * COLLEGE: Neymar Engineering College
 * PROFILES: Cristiano Ronaldo & Lionel Messi (Male Profiles)
 * THEME: Purple and White
 * =========================================================================
 * 
 * TASK BREAKDOWN:
 * - Task 1: App, Header, StudentCard, SubjectList, Footer components
 * - Task 2: Header Component displaying College Name & Student Dashboard
 * - Task 3: StudentCard Component receiving details via Props
 * - Task 4: SubjectList with array ["React","Java","Python","SQL","DBMS"] in <ul>
 * - Task 5: JSX Expressions ({semester}, {year}, {subjects.length})
 * - Task 6: Conditional Rendering (Attendance >= 75% & CGPA >= 8)
 * - Task 7: Inline Styling (Name: Blue, CGPA: Green, Attendance: Orange)
 * - Task 8: External/Embedded CSS for attractive Purple & White theme
 */

// =========================================================================
// TASK 2: Header Component
// =========================================================================
export function Header() {
  return (
    <header className="dashboard-header">
      <div className="header-container">
        <div className="college-branding">
          <div className="college-logo-icon">
            <span className="college-initials">NEC</span>
          </div>
          <div className="college-info">
            <h1 className="college-name">Neymar Engineering College</h1>
            <p className="college-tagline">Affiliated to Anna University | Approved by AICTE | NAAC 'A++' Grade</p>
          </div>
        </div>

        <div className="header-title-badge">
          <div className="badge-pill">
            <span className="live-indicator"></span>
            Academic Year 2025–2026
          </div>
          <h2 className="dashboard-title">Student Dashboard</h2>
        </div>
      </div>
    </header>
  );
}

// =========================================================================
// TASK 4 & TASK 5: SubjectList Component
// =========================================================================
export function SubjectList({ semester = "VI", year = "III" }) {
  // Task 4: Store subjects inside an array
  const subjects = ["React", "Java", "Python", "SQL", "DBMS"];

  return (
    <div className="subject-list-card">
      <div className="subject-header">
        <div className="subject-icon-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
        </div>
        <h3 className="subject-heading">Registered Subjects & Curriculum</h3>
      </div>

      {/* Task 5: JSX Expressions */}
      <div className="academic-meta-grid">
        <div className="meta-box">
          <span className="meta-label">Current Semester :</span>
          <span className="meta-val semester-highlight">{semester}</span>
        </div>
        <div className="meta-box">
          <span className="meta-label">Current Year :</span>
          <span className="meta-val year-highlight">{year}</span>
        </div>
        <div className="meta-box">
          <span className="meta-label">Total Subjects :</span>
          <span className="meta-val total-highlight">{subjects.length}</span>
        </div>
      </div>

      {/* Task 4: Display inside an unordered list */}
      <div className="subjects-section">
        <h4 className="subjects-subheading">Core Enrolled Courses</h4>
        <ul className="subjects-ul">
          {subjects.map((subject, index) => (
            <li key={index} className="subject-li">
              <span className="subject-number">0{index + 1}</span>
              <span className="subject-name">{subject}</span>
              <span className="subject-code">NEC-{100 + (index + 1) * 4}</span>
              <span className="subject-credits">4 Credits</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// =========================================================================
// TASK 3, TASK 6, TASK 7: StudentCard Component
// =========================================================================
export function StudentCard({
  name,
  regNo,
  department,
  year,
  semester = "VI",
  cgpa,
  attendance,
  photo,
  jerseyNo = "10",
  badgeTitle = "Undergraduate Scholar",
  quote
}) {
  // Task 6: Conditional Rendering Logic
  const isExamEligible = attendance >= 75;
  const isPlacementEligible = cgpa >= 8.0;

  // Task 7: Inline Styles
  const nameStyle = {
    color: 'blue',
    fontWeight: '700',
    fontSize: '1.45rem',
    letterSpacing: '-0.02em',
    marginBottom: '4px'
  };

  const cgpaStyle = {
    color: 'green',
    fontWeight: '700',
    fontSize: '1.25rem'
  };

  const attendanceStyle = {
    color: 'orange',
    fontWeight: '700',
    fontSize: '1.25rem'
  };

  return (
    <div className="student-profile-card">
      <div className="card-top-banner">
        <span className="jersey-badge">#{jerseyNo}</span>
        <span className="department-tag">{department}</span>
      </div>

      <div className="card-profile-header">
        <div className="avatar-wrapper">
          <img
            src={photo}
            alt={name}
            className="student-avatar-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
            }}
          />
          <div className="avatar-verified-ring">✓</div>
        </div>

        <div className="profile-identity">
          {/* Task 7: Inline styling for Student Name (Blue) */}
          <h2 style={nameStyle} className="student-name-text">
            {name}
          </h2>
          <p className="student-role-subtitle">{badgeTitle}</p>
          {quote && <p className="student-quote">"{quote}"</p>}
        </div>
      </div>

      {/* Task 3: Display Details */}
      <div className="details-info-table">
        <div className="detail-row">
          <span className="detail-label">Register No :</span>
          <span className="detail-value reg-highlight">{regNo}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Department :</span>
          <span className="detail-value">{department}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Year :</span>
          <span className="detail-value">{year} Year</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">CGPA :</span>
          {/* Task 7: Inline styling for CGPA (Green) */}
          <span style={cgpaStyle} className="detail-value">
            {cgpa} <span className="cgpa-scale">/ 10.0</span>
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Attendance :</span>
          {/* Task 7: Inline styling for Attendance (Orange) */}
          <span style={attendanceStyle} className="detail-value">
            {attendance}%
          </span>
        </div>
      </div>

      {/* Visual Attendance Bar */}
      <div className="attendance-progress-box">
        <div className="progress-label-row">
          <span>Attendance Record</span>
          <span className="progress-pct">{attendance}%</span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${attendance >= 75 ? 'fill-good' : 'fill-low'}`}
            style={{ width: `${Math.min(attendance, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Task 6: Conditional Rendering */}
      <div className="status-section">
        <h4 className="status-section-title">Eligibility & Academic Standing</h4>

        {/* Attendance Status */}
        <div className={`status-card ${isExamEligible ? 'status-success' : 'status-danger'}`}>
          <div className="status-icon">{isExamEligible ? '✓' : '✗'}</div>
          <div className="status-text-group">
            <span className="status-label">Attendance Status :</span>
            <span className="status-result">
              {isExamEligible ? (
                <strong>Eligible for Semester Exam</strong>
              ) : (
                <strong>Not Eligible</strong>
              )}
            </span>
          </div>
        </div>

        {/* Placement Status */}
        <div className={`status-card ${isPlacementEligible ? 'status-placement-good' : 'status-placement-warning'}`}>
          <div className="status-icon">{isPlacementEligible ? '★' : '▲'}</div>
          <div className="status-text-group">
            <span className="status-label">Placement Status :</span>
            <span className="status-result">
              {isPlacementEligible ? (
                <strong>Eligible</strong>
              ) : (
                <strong>Need Improvement</strong>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Embedded SubjectList Component */}
      <div className="card-subjects-container">
        <SubjectList semester={semester} year={year} />
      </div>
    </div>
  );
}

// =========================================================================
// TASK 1: Footer Component
// =========================================================================
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-column">
            <div className="footer-logo">
              <span className="footer-logo-badge">NEC</span>
              <h3 className="footer-college-title">Neymar Engineering College</h3>
            </div>
            <p className="footer-desc">
              Empowering future tech leaders with premier curriculum, athletic discipline, and industry-grade engineering excellence.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Academic Portals</h4>
              <ul>
                <li><a href="#exam">Controller of Examinations</a></li>
                <li><a href="#placement">Placement & Career Cell</a></li>
                <li><a href="#library">Digital Library (E-Resources)</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Campus Contact</h4>
              <p className="contact-item">📍 Neymar Knowledge Campus, Chennai</p>
              <p className="contact-item">📞 +91 44 2828 1010</p>
              <p className="contact-item">✉️ registrar@neymarcollege.edu.in</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {currentYear} Neymar Engineering College. All Rights Reserved.</p>
          <div className="footer-badges">
            <span className="accreditation-pill">NAAC A++</span>
            <span className="accreditation-pill">NBA Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// =========================================================================
// TASK 1: Master App Component
// =========================================================================
export default function App() {
  // Profiles for Ronaldo and Messi at Neymar Engineering College
  const students = [
    {
      id: 1,
      name: "Cristiano Ronaldo",
      regNo: "NEC-2024-007",
      department: "Computer Science and Engineering (CSE)",
      year: "III",
      semester: "VI",
      cgpa: 8.85,
      attendance: 86,
      jerseyNo: "07",
      badgeTitle: "Honor Roll Scholar & Tech Lead",
      quote: "Talent without working hard is nothing. Consistent discipline creates champions.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Lionel Messi",
      regNo: "NEC-2024-010",
      department: "Information Technology (IT)",
      year: "III",
      semester: "VI",
      cgpa: 9.62,
      attendance: 94,
      jerseyNo: "10",
      badgeTitle: "University Rank Holder & AI Researcher",
      quote: "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
    }
  ];

  const [activeTab, setActiveTab] = useState('all');

  const filteredStudents = activeTab === 'all'
    ? students
    : students.filter(st => st.id.toString() === activeTab);

  return (
    <div className="app-layout">
      {/* Header */}
      <Header />

      {/* Main Body */}
      <main className="dashboard-main">
        <section className="dashboard-hero">
          <div className="hero-content">
            <div className="hero-pill">
              <span>🌟 Academic Management Portal</span>
            </div>
            <h2 className="hero-title">
              Neymar Engineering College <span className="text-purple-gradient">Student Portal</span>
            </h2>
            <p className="hero-subtitle">
              Comprehensive student evaluation metrics, real-time semester examination clearance, subject enrolment, and placement drive eligibility tracking.
            </p>
          </div>
        </section>

        {/* Profile Filter Buttons */}
        <div className="controls-bar">
          <div className="filter-button-group">
            <button
              className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Profiles ({students.length})
            </button>
            <button
              className={`filter-btn ${activeTab === '1' ? 'active' : ''}`}
              onClick={() => setActiveTab('1')}
            >
              ⚽ Cristiano Ronaldo (#07)
            </button>
            <button
              className={`filter-btn ${activeTab === '2' ? 'active' : ''}`}
              onClick={() => setActiveTab('2')}
            >
              🪄 Lionel Messi (#10)
            </button>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className={`students-grid ${filteredStudents.length === 1 ? 'single-col' : 'two-col'}`}>
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              regNo={student.regNo}
              department={student.department}
              year={student.year}
              semester={student.semester}
              cgpa={student.cgpa}
              attendance={student.attendance}
              photo={student.photo}
              badgeTitle={student.badgeTitle}
              jerseyNo={student.jerseyNo}
              quote={student.quote}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
