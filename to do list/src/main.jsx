import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './To-Do.jsx'
import './To-Do.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
