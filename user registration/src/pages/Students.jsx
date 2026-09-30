import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getStoredStudents, saveStudents } from '../data/students'

function Students() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setStudents(getStoredStudents())
  }, [])

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const updated = students.filter((s) => s.id !== id)
      saveStudents(updated)
      setStudents(updated)
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toString().includes(search)
  )

  return (
    <div className="page">
      <div className="header-flex">
        <h1>Registered Students</h1>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
          + Register Student
        </Link>
      </div>

      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search by student name or roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p>No students found. <Link to="/">Register a student now</Link>.</p>
      ) : (
        <div className="student-list">
          {filteredStudents.map((student) => {
            const total =
              student.tamil +
              student.english +
              student.maths +
              student.science +
              student.social
            const percentage = ((total / 500) * 100).toFixed(1)

            return (
              <div className="student-card" key={student.id}>
                <div>
                  <h3>{student.name}</h3>
                  <p><strong>Roll No:</strong> {student.rollNo}</p>
                  <p><strong>Total Marks:</strong> {total} / 500 ({percentage}%)</p>
                </div>
                <div>
                  <Link to={`/report/${student.id}`}>View Report Card</Link>
                  <button
                    onClick={() => handleDelete(student.id, student.name)}
                    className="btn-delete"
                    title="Delete Student"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Students
