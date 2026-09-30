import { Link } from "react-router-dom";
import students from "../data/students";

function Students() {
  return (
    <div className="page">
      <h1>Students List</h1>

      <div className="student-list">
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <h2>{student.name}</h2>
            <p>Roll No: {student.rollNo}</p>

            <Link to={`/report/${student.id}`}>
              View Report
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
