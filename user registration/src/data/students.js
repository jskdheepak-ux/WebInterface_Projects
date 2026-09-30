const students = [
  {
    id: 1,
    name: 'Priya',
    rollNo: '101',
    tamil: 85,
    english: 78,
    maths: 92,
    science: 88,
    social: 80
  },
  {
    id: 2,
    name: 'Sona',
    rollNo: '102',
    tamil: 90,
    english: 85,
    maths: 95,
    science: 91,
    social: 88
  },
  {
    id: 3,
    name: 'Miro',
    rollNo: '103',
    tamil: 70,
    english: 75,
    maths: 68,
    science: 72,
    social: 78
  }
]

export const getStoredStudents = () => {
  const data = localStorage.getItem('students_list')
  if (!data) {
    localStorage.setItem('students_list', JSON.stringify(students))
    return students
  }
  try {
    return JSON.parse(data)
  } catch {
    return students
  }
}

export const saveStudents = (newStudents) => {
  localStorage.setItem('students_list', JSON.stringify(newStudents))
  window.dispatchEvent(new Event('students_updated'))
}

export const addStudent = (student) => {
  const current = getStoredStudents()
  const nextId = current.length > 0 ? Math.max(...current.map((s) => s.id)) + 1 : 1
  const updated = [...current, { ...student, id: nextId }]
  saveStudents(updated)
  return nextId
}

export default students
