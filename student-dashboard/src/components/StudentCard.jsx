import React from 'react';
import SubjectList from './SubjectList';

/**
 * StudentCard Component (Tasks 3, 6, 7)
 * 
 * Task 3: Props:
 * - name, regNo, department, year, semester, cgpa, attendance, photo
 * 
 * Task 6: Conditional Rendering:
 * - If attendance >= 75% -> "Attendance Status : Eligible for Semester Exam" else "Not Eligible"
 * - If cgpa >= 8 -> "Placement Status : Eligible" else "Need Improvement"
 * 
 * Task 7: Inline Styling:
 * - Student Name (Blue)
 * - CGPA (Green)
 * - Attendance (Orange)
 */
function StudentCard({
  name,
  regNo,
  department,
  year,
  semester = "VI",
  cgpa,
  attendance,
  photo,
  badgeTitle,
  jerseyNo,
  quote
}) {
  // Task 6: Conditional checks
  const isAttendanceEligible = attendance >= 75;
  const isPlacementEligible = cgpa >= 8;

  // Task 7: Inline Styles
  const studentNameInlineStyle = {
    color: 'blue',
    fontWeight: '700',
    fontSize: '1.5rem',
    margin: '0 0 4px 0'
  };

  const cgpaInlineStyle = {
    color: 'green',
    fontWeight: '700',
    fontSize: '1.2rem'
  };

  const attendanceInlineStyle = {
    color: 'orange',
    fontWeight: '700',
    fontSize: '1.2rem'
  };

  return (
    <div className="student-card">
      {/* Top Banner with Jersey / Tag */}
      <div className="card-top">
        <span className="jersey-tag">#{jerseyNo || '10'}</span>
        <span className="dept-tag">{department}</span>
      </div>

      {/* Student Photo & Identity */}
      <div className="student-header-info">
        <div className="photo-container">
          <img
            src={photo}
            alt={name}
            className="student-photo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80";
            }}
          />
          <div className="verified-badge">✓</div>
        </div>

        <div className="name-and-title">
          {/* Task 7: Inline style for Student Name (Blue) */}
          <h3 style={studentNameInlineStyle} className="student-name">
            Name : {name}
          </h3>
          {badgeTitle && <p className="badge-subtitle">{badgeTitle}</p>}
          {quote && <p className="student-quote">"{quote}"</p>}
        </div>
      </div>

      {/* Task 3: Student Details Table/List */}
      <div className="student-details-list">
        <div className="detail-item">
          <span className="detail-label">Register No :</span>
          <span className="detail-value highlight-reg">{regNo}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Department :</span>
          <span className="detail-value">{department}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Year :</span>
          <span className="detail-value">{year}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">CGPA :</span>
          {/* Task 7: Inline style for CGPA (Green) */}
          <span style={cgpaInlineStyle} className="detail-value">
            {cgpa}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Attendance :</span>
          {/* Task 7: Inline style for Attendance (Orange) */}
          <span style={attendanceInlineStyle} className="detail-value">
            {attendance}%
          </span>
        </div>
      </div>

      {/* Visual Attendance Bar */}
      <div className="attendance-bar-container">
        <div className="attendance-bar-label">
          <span>Attendance Ratio</span>
          <span>{attendance}%</span>
        </div>
        <div className="attendance-track">
          <div
            className={`attendance-fill ${isAttendanceEligible ? 'fill-green' : 'fill-red'}`}
            style={{ width: `${Math.min(attendance, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Task 6: Conditional Rendering for Attendance & Placement Status */}
      <div className="status-container">
        <h4 className="status-heading">Academic & Placement Eligibility</h4>

        {/* Conditional Attendance Status */}
        <div className={`status-box ${isAttendanceEligible ? 'eligible' : 'not-eligible'}`}>
          <div className="status-label-group">
            <span className="status-title">Attendance Status :</span>
            <span className="status-badge">
              {isAttendanceEligible ? "Eligible for Semester Exam" : "Not Eligible"}
            </span>
          </div>
          <span className="status-icon-mark">{isAttendanceEligible ? "✅" : "⚠️"}</span>
        </div>

        {/* Conditional Placement Status */}
        <div className={`status-box ${isPlacementEligible ? 'eligible-placement' : 'warning-placement'}`}>
          <div className="status-label-group">
            <span className="status-title">Placement Status :</span>
            <span className="status-badge">
              {isPlacementEligible ? "Eligible" : "Need Improvement"}
            </span>
          </div>
          <span className="status-icon-mark">{isPlacementEligible ? "🎯" : "📈"}</span>
        </div>
      </div>

      {/* Task 4 & 5: Subject List embedded */}
      <div className="card-subject-wrapper">
        <SubjectList semester={semester} year={year} />
      </div>
    </div>
  );
}

export default StudentCard;
