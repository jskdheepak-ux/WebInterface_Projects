import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Students from './pages/Students'
import ReportCard from './pages/ReportCard'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/report/:id" element={<ReportCard />} />
      </Routes>
    </>
  )
}

export default App
