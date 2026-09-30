import { useState } from "react"; 
import "./App.css"; 

function AttendanceTracker() { 
  const [students, setStudents] = useState([ 
    { id: 1, name: "Anu", status: "" }, 
    { id: 2, name: "Charu ", status: "" }, 
    { id: 3, name: "Deepa", status: "" }, 
    { id: 4, name: "Deepika", status: "" }, 
    { id: 5, name: "Enosh", status: "" }, 
    { id: 6, name: "Harini", status: "" }, 
    { id: 7, name: "John", status: "" }, 
    { id: 8, name: "karthi", status: "" }, 
    { id: 9, name: "Madhu", status: "" }, 
    { id: 10, name: "Nila", status: "" }, 
    { id: 11, name: "Nadhini", status: "" }, 
    { id: 12, name: "Nivi", status: "" }, 
    { id: 13, name: "Pradeep", status: "" }, 
    { id: 14, name: "Rose", status: "" }, 
    { id: 15, name: "Raj", status: "" }, 
    { id: 16, name: "Sam", status: "" }, 
    { id: 17, name: "sanu", status: "" }, 
    { id: 18, name: "Santhosh", status: "" }, 
    { id: 19, name: "Shalini", status: "" }, 
    { id: 20, name: "Uma", status: "" }, 
  ]); 

  const markAttendance = (id, status) => { 
    setStudents( 
      students.map((student) => 
        student.id === id 
          ? { ...student, status: status } 
          : student 
      ) 
    ); 
  }; 

  const presentCount = students.filter( 
    (student) => student.status === "Present" 
  ).length; 

  const absentCount = students.filter( 
    (student) => student.status === "Absent" 
  ).length; 

  const resetAttendance = () => { 
    setStudents( 
      students.map((student) => ({ 
        ...student, 
        status: "", 
      })) 
    ); 
  }; 

  return ( 
    <div className="app"> 
      <header> 
        <h1>🎓 College Attendance Tracker</h1> 
        <p>Mark attendance for your students</p> 
      </header> 

      {/* Summary Cards */} 
      <div className="summary"> 
        <div className="summary-card total"> 
          <h3>Total Students</h3> 
          <p>{students.length}</p> 
        </div> 
        <div className="summary-card present-card"> 
          <h3>Present</h3> 
          <p>{presentCount}</p> 
        </div> 
        <div className="summary-card absent-card"> 
          <h3>Absent</h3> 
          <p>{absentCount}</p> 
        </div> 
      </div> 

      {/* Student Attendance List */} 
      <div className="attendance-container"> 
        <div className="attendance-header"> 
          <h2>Student Attendance</h2> 
          <button 
            className="reset-btn" 
            onClick={resetAttendance} 
          > 
            ↻ Reset 
          </button> 
        </div> 
        <div className="student-list"> 
          {students.map((student) => ( 
            <div className="student-row" key={student.id}> 
              <div className="student-info"> 
                <span className="roll-number"> 
                  {student.id} 
                </span> 
                <h3>{student.name}</h3> 
              </div> 

              <div className="attendance-buttons"> 
                <button 
                  className={ 
                    student.status === "Present" 
                      ? "present-btn selected" 
                      : "present-btn" 
                  } 
                  onClick={() => 
                    markAttendance(student.id, "Present") 
                  } 
                > 
                  ✓ Present 
                </button> 
                <button 
                  className={ 
                    student.status === "Absent" 
                      ? "absent-btn selected" 
                      : "absent-btn" 
                  } 
                  onClick={() => 
                    markAttendance(student.id, "Absent") 
                  } 
                > 
                  ✕ Absent 
                </button> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div> 
    </div> 
  ); 
} 

export default AttendanceTracker;
