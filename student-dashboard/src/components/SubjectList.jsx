import React from 'react';

/**
 * SubjectList Component (Tasks 4 & 5)
 * 
 * Task 4:
 * - Store the subjects inside an array: ["React", "Java", "Python", "SQL", "DBMS"]
 * - Display them inside an unordered list (<ul>)
 * 
 * Task 5: JSX Expressions:
 * - Current Semester : {semester}
 * - Current Year : {year}
 * - Total Subjects : {subjects.length}
 */
function SubjectList({ semester = "VI", year = "III" }) {
  // Task 4: Store subjects inside an array
  const subjects = ["React", "Java", "Python", "SQL", "DBMS"];

  return (
    <div className="subject-list-container">
      <div className="subject-header">
        <h4 className="subject-title">Registered Subjects & Enrolment</h4>
      </div>

      {/* Task 5: JSX Expressions */}
      <div className="academic-meta-grid">
        <div className="meta-card">
          <span className="meta-label">Current Semester :</span>
          <span className="meta-value">{semester}</span>
        </div>
        <div className="meta-card">
          <span className="meta-label">Current Year :</span>
          <span className="meta-value">{year}</span>
        </div>
        <div className="meta-card">
          <span className="meta-label">Total Subjects :</span>
          <span className="meta-value">{subjects.length}</span>
        </div>
      </div>

      {/* Task 4: Display them inside an unordered list */}
      <div className="subject-list-section">
        <h5 className="list-title">Course Curriculum:</h5>
        <ul className="subjects-ul">
          {subjects.map((subject, index) => (
            <li key={index} className="subject-li">
              <span className="subject-badge">{index + 1}</span>
              <span className="subject-name">{subject}</span>
              <span className="subject-code">CS-30{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SubjectList;
