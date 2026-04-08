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
import { LanguageProvider } from './context/LanguageContext'
import './App.css'


function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App