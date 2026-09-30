import React, { useState } from 'react';
import Header from './components/Header';
import StudentCard from './components/StudentCard';
import Footer from './components/Footer';
import './App.css';

/**
 * App Component (Task 1)
 * Combines:
 * - Header (Task 2)
 * - StudentCard (Task 3, 6, 7)
 * - SubjectList (Task 4, 5)
 * - Footer
 * 
 * Includes profiles for:
 * 1. Lionel Messi (CSE, Year III)
 * 2. Cristiano Ronaldo (IT, Year III)
 */
function App() {
  const initialStudents = [
    {
      id: 1,
      name: "Lionel Messi",
      regNo: "REC-1010",
      department: "CSE (Computer Science & Engineering)",
      year: "III",
      semester: "VI",
      cgpa: 9.85,
      attendance: 92,
      jerseyNo: "10",
      badgeTitle: "University Gold Medalist & AI Scholar",
      quote: "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Cristiano Ronaldo",
      regNo: "REC-1007",
      department: "IT (Information Technology)",
      year: "III",
      semester: "VI",
      cgpa: 8.95,
      attendance: 88,
      jerseyNo: "07",
      badgeTitle: "Honor Roll Scholar & Tech Lead",
      quote: "Talent without working hard is nothing. Consistent discipline creates champions.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
    }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState('all'); // 'all', '1', '2'
  const [showLiveTester, setShowLiveTester] = useState(false);

  // Helper to adjust student stats to test conditional rendering live
  const handleStatChange = (id, field, value) => {
    setStudents(prev =>
      prev.map(st => (st.id === id ? { ...st, [field]: parseFloat(value) } : st))
    );
  };

  const displayedStudents = selectedStudent === 'all'
    ? students
    : students.filter(st => st.id.toString() === selectedStudent);

  return (
    <div className="app-layout">
      {/* Task 2: Header Component */}
      <Header />

      <main className="dashboard-content">
        {/* Hero Section */}
        <section className="hero-banner">
          <div className="hero-tag">
            <span className="sparkle">✨</span> Academic Excellence & Eligibility Portal
          </div>
          <h2 className="hero-heading">
            Student Performance & Placement <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="hero-subtext">
            Monitor real-time semester examination eligibility, CGPA rankings, curriculum subjects, and campus placement qualifications.
          </p>

          {/* Quick Metrics Bar */}
          <div className="metrics-row">
            <div className="metric-badge">
              <span className="metric-val">{students.length}</span>
              <span className="metric-lbl">Students Enrolled</span>
            </div>
            <div className="metric-badge">
              <span className="metric-val">5</span>
              <span className="metric-lbl">Core Subjects</span>
            </div>
            <div className="metric-badge">
              <span className="metric-val">VI</span>
              <span className="metric-lbl">Semester</span>
            </div>
            <div className="metric-badge">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Placement Success</span>
            </div>
          </div>
        </section>

        {/* View Selection & Live Simulator Controls */}
        <div className="portal-controls">
          <div className="student-filter-tabs">
            <button
              className={`tab-btn ${selectedStudent === 'all' ? 'tab-active' : ''}`}
              onClick={() => setSelectedStudent('all')}
            >
              👥 All Students ({students.length})
            </button>
            <button
              className={`tab-btn ${selectedStudent === '1' ? 'tab-active' : ''}`}
              onClick={() => setSelectedStudent('1')}
            >
              🪄 Lionel Messi (#10)
            </button>
            <button
              className={`tab-btn ${selectedStudent === '2' ? 'tab-active' : ''}`}
              onClick={() => setSelectedStudent('2')}
            >
              ⚽ Cristiano Ronaldo (#07)
            </button>
          </div>

          <button
            className={`simulator-toggle ${showLiveTester ? 'sim-active' : ''}`}
            onClick={() => setShowLiveTester(!showLiveTester)}
            title="Test conditional rendering by adjusting attendance and CGPA in real-time"
          >
            <span>⚡</span> {showLiveTester ? "Close Live Tester" : "Test Conditional Values"}
          </button>
        </div>

        {/* Live Simulator Panel for Task 6 Verification */}
        {showLiveTester && (
          <div className="simulator-panel">
            <div className="sim-intro">
              <h4>🛠️ Real-Time Conditional Rendering Simulator</h4>
              <p>Drag the sliders below to test Exam Eligibility (&ge; 75%) and Placement Status (&ge; 8.0 CGPA).</p>
            </div>
            <div className="sim-grid">
              {students.map(st => (
                <div key={st.id} className="sim-card">
                  <div className="sim-student-name">
                    <strong>{st.name}</strong>
                    <span className="sim-reg-tag">{st.regNo}</span>
                  </div>

                  <div className="sim-slider-group">
                    <div className="sim-slider-label">
                      <span>Attendance: <strong>{st.attendance}%</strong></span>
                      <span className={`sim-tag ${st.attendance >= 75 ? 'tag-pass' : 'tag-fail'}`}>
                        {st.attendance >= 75 ? 'Exam Eligible' : 'Not Eligible'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={st.attendance}
                      onChange={(e) => handleStatChange(st.id, 'attendance', e.target.value)}
                    />
                  </div>

                  <div className="sim-slider-group">
                    <div className="sim-slider-label">
                      <span>CGPA: <strong>{st.cgpa}</strong></span>
                      <span className={`sim-tag ${st.cgpa >= 8.0 ? 'tag-pass' : 'tag-fail'}`}>
                        {st.cgpa >= 8.0 ? 'Eligible' : 'Need Improvement'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5.0"
                      max="10.0"
                      step="0.1"
                      value={st.cgpa}
                      onChange={(e) => handleStatChange(st.id, 'cgpa', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task 1 & 3: Student Cards Grid */}
        <div className={`students-cards-container ${displayedStudents.length === 1 ? 'single-view' : 'multi-view'}`}>
          {displayedStudents.map((student) => (
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

      {/* Task 1: Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
