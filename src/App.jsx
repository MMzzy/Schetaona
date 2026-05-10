import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Walkers from './pages/Walkers'
import WalkerProfile from './pages/WalkerProfile'
import Book from './pages/Book'
import DashboardOwner from './pages/DashboardOwner'
import DashboardWalker from './pages/DashboardWalker'
import RegisterOwner from './pages/RegisterOwner'
import RegisterWalker from './pages/RegisterWalker'
import Contact from './pages/Contact'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import './App.css'


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <AuthProvider>
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/owner" element={<RegisterOwner />} />
          <Route path="/register/walker" element={<RegisterWalker />} />
          <Route path="/walkers" element={<Walkers />} />
          <Route path="/walkers/:id" element={<WalkerProfile />} />
          <Route path="/book" element={<Book />} />
          <Route path="/dashboard/owner" element={<DashboardOwner />} />
          <Route path="/dashboard/walker" element={<DashboardWalker />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
    </AuthProvider>
  )
}

export default App