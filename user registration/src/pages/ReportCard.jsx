import { useParams, Link } from 'react-router-dom'
import { getStoredStudents } from '../data/students'

function ReportCard() {
  const { id } = useParams()
  const students = getStoredStudents()
  const student = students.find((s) => s.id.toString() === id.toString())

  if (!student) {
    return (
      <div className="page">
        <h2>Student Not Found</h2>
        <p>No student records match ID: {id}</p>
        <Link to="/students" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Back to Students
        </Link>
      </div>
    )
  }

  const subjects = [
    { name: 'Tamil', mark: Number(student.tamil) || 0 },
    { name: 'English', mark: Number(student.english) || 0 },
    { name: 'Maths', mark: Number(student.maths) || 0 },
    { name: 'Science', mark: Number(student.science) || 0 },
    { name: 'Social', mark: Number(student.social) || 0 }
  ]

  const total = subjects.reduce((sum, sub) => sum + sub.mark, 0)
  const percentage = (total / subjects.length).toFixed(1)
  const isPassed = subjects.every((sub) => sub.mark >= 35)

  const getSubjectGrade = (mark) => {
    if (mark >= 90) return 'A+'
    if (mark >= 80) return 'A'
    if (mark >= 70) return 'B'
    if (mark >= 60) return 'C'
    if (mark >= 50) return 'D'
    if (mark >= 35) return 'E'
    return 'F'
  }

  return (
    <div className="page">
      <div className="header-flex">
        <div>
          <h1>Student Report Card</h1>
          <p>
            <strong>Name:</strong> {student.name} &nbsp;|&nbsp; <strong>Roll No:</strong> {student.rollNo}
          </p>
        </div>
        <div>
          <span className={isPassed ? 'badge-pass' : 'badge-fail'}>
            {isPassed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
          </span>
        </div>
      </div>

      <div className="report">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Total Marks</th>
              <th>Marks Obtained</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub) => {
              const pass = sub.mark >= 35
              return (
                <tr key={sub.name}>
                  <td>{sub.name}</td>
                  <td>100</td>
                  <td>{sub.mark}</td>
                  <td>{getSubjectGrade(sub.mark)}</td>
                  <td style={{ color: pass ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                    {pass ? 'Pass' : 'Fail'}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr style={{ background: '#f8f8f8', fontWeight: 'bold' }}>
              <td>Total</td>
              <td>500</td>
              <td>{total}</td>
              <td>{getSubjectGrade(percentage)}</td>
              <td style={{ color: isPassed ? '#28a745' : '#dc3545' }}>
                {percentage}%
              </td>
            </tr>
          </tfoot>
        </table>

        <Link to="/students">← Back to Students</Link>
      </div>
    </div>
  )
}

export default ReportCard
