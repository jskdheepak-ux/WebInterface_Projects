import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <h2>Student Report Card</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
      </div>
    </nav>
  )
}

export default Navbar
