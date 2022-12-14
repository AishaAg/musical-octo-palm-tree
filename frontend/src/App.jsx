import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Home'
import Signup from './Signup'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Link to="/">Expenses!</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
