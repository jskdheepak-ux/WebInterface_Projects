import { Link, useParams } from "react-router-dom";
import students from "../data/students";

function ReportCard() {
  const { id } = useParams();

  const student = students.find(
    (student) => student.id === Number(id)
  );

  if (!student) {
    return (
      <div className="page">
        <h2>Student Not Found</h2>
        <Link to="/students">Back to Students</Link>
      </div>
    );
  }

  const total =
    student.tamil +
    student.english +
    student.maths +
    student.science +
    student.social;

  const average = total / 5;

  let grade;

  if (average >= 90) {
    grade = "A+";
  } else if (average >= 80) {
    grade = "A";
  } else if (average >= 70) {
    grade = "B";
  } else if (average >= 60) {
    grade = "C";
  } else {
    grade = "D";
  }

  const result = average >= 40 ? "PASS" : "FAIL";

  return (
    <div className="page">
      <h1>Student Report Card</h1>

      <div className="report">
        <h2>{student.name}</h2>
        <p>Roll No: {student.rollNo}</p>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tamil</td>
              <td>{student.tamil}</td>
            </tr>
            <tr>
              <td>English</td>
              <td>{student.english}</td>
            </tr>
            <tr>
              <td>Maths</td>
              <td>{student.maths}</td>
            </tr>
            <tr>
              <td>Science</td>
              <td>{student.science}</td>
            </tr>
            <tr>
              <td>Social</td>
              <td>{student.social}</td>
            </tr>
            <tr>
              <th>Total</th>
              <th>{total}</th>
            </tr>
            <tr>
              <th>Average</th>
              <th>{average.toFixed(2)}</th>
            </tr>
            <tr>
              <th>Grade</th>
              <th>{grade}</th>
            </tr>
            <tr>
              <th>Result</th>
              <th>{result}</th>
            </tr>
          </tbody>
        </table>

        <Link to="/students">Back to Students</Link>
      </div>
    </div>
  );
}

export default ReportCard;
