import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  return (
    <div>
      <Navbar />

      <main className="login-page">
        <div className="login-box">
          <h2>Prijava</h2>

          {/* Login forma */}
          <div className="login-form">
            <label>Email</label>
            <input type="email" placeholder="Upiši email" />

            <label>Lozinka</label>
            <input type="password" placeholder="Upiši lozinku" />

            <button className="login-submit">Prijavi se</button>
          </div>

          {/* Odvojač */}
          <div className="login-divider">
            <span>ili</span>
          </div>

          {/* Social login */}
          <div className="social-login">
            <button className="google-btn">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Nastavi s Googleom
            </button>
            <button className="apple-btn">
              <img src="https://www.svgrepo.com/show/452222/apple.svg" alt="Apple" />
              Nastavi s Appleom
            </button>
          </div>

          <p className="login-register">Nemaš račun? <a href="/register">Registriraj se</a></p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login