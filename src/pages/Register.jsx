import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Register() {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />

      <main className="register-choice-page">
        <h2>Registracija</h2>
        <p>Odaberi kako želiš koristiti Schetaonu</p>

        <div className="register-choice">
          <div className="choice-card" onClick={() => navigate('/register/owner')}>
            <span>🐾</span>
            <h3>Vlasnik</h3>
            <p>Tražim pouzdanog šetača za svog psa</p>
            <button>Registriraj se kao vlasnik</button>
          </div>

          <div className="choice-card" onClick={() => navigate('/register/walker')}>
            <span>🦮</span>
            <h3>Šetač</h3>
            <p>Želim šetati pse i zaraditi</p>
            <button>Registriraj se kao šetač</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Register