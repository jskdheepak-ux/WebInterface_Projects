import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStoredStudents, addStudent } from '../data/students'

function Home() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    tamil: '',
    english: '',
    maths: '',
    science: '',
    social: ''
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [newStudentId, setNewStudentId] = useState(null)

  useEffect(() => {
    setStudents(getStoredStudents())
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.rollNo.trim()) {
      alert('Please fill in student name and roll number.')
      return
    }

    const newStudent = {
      name: formData.name.trim(),
      rollNo: formData.rollNo.trim(),
      tamil: Number(formData.tamil) || 0,
      english: Number(formData.english) || 0,
      maths: Number(formData.maths) || 0,
      science: Number(formData.science) || 0,
      social: Number(formData.social) || 0
    }

    const createdId = addStudent(newStudent)
    setStudents(getStoredStudents())
    setNewStudentId(createdId)
    setSuccessMessage(`Student ${formData.name} registered successfully!`)

    setFormData({
      name: '',
      rollNo: '',
      tamil: '',
      english: '',
      maths: '',
      science: '',
      social: ''
    })
  }

  return (
    <div className="page">
      <h1>Student Registration Portal</h1>
      <p>Register new students and track their academic report cards seamlessly.</p>

      {/* Summary statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Students</h4>
          <div className="stat-value">{students.length}</div>
        </div>
        <div className="stat-card">
          <h4>Quick Navigation</h4>
          <Link to="/students" style={{ textDecoration: 'none', color: '#00d9ff', fontWeight: 'bold' }}>
            View All Students →
          </Link>
        </div>
      </div>

      {successMessage && (
        <div className="alert-success">
          {successMessage}{' '}
          {newStudentId && (
            <Link to={`/report/${newStudentId}`} style={{ fontWeight: 'bold', marginLeft: '10px', color: '#155724' }}>
              View Report Card →
            </Link>
          )}
        </div>
      )}

      {/* Registration Form */}
      <div className="form-container">
        <h2>Register New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Student Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Priya"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rollNo">Roll Number *</label>
              <input
                id="rollNo"
                name="rollNo"
                type="text"
                placeholder="e.g. 104"
                value={formData.rollNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tamil">Tamil Marks (0-100)</label>
              <input
                id="tamil"
                name="tamil"
                type="number"
                min="0"
                max="100"
                placeholder="0 - 100"
                value={formData.tamil}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="english">English Marks (0-100)</label>
              <input
                id="english"
                name="english"
                type="number"
                min="0"
                max="100"
                placeholder="0 - 100"
                value={formData.english}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="maths">Maths Marks (0-100)</label>
              <input
                id="maths"
                name="maths"
                type="number"
                min="0"
                max="100"
                placeholder="0 - 100"
                value={formData.maths}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="science">Science Marks (0-100)</label>
              <input
                id="science"
                name="science"
                type="number"
                min="0"
                max="100"
                placeholder="0 - 100"
                value={formData.science}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="social">Social Marks (0-100)</label>
              <input
                id="social"
                name="social"
                type="number"
                min="0"
                max="100"
                placeholder="0 - 100"
                value={formData.social}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Register Student
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
