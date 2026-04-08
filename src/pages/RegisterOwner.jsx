import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function RegisterOwner() {
  return (
    <div>
      <Navbar />

      <main className="register-page">
        <div className="register-box">
          <h2>Registracija – Vlasnik</h2>

          {/* Kreiranje accounta */}
          <div className="register-form">
            <label>Ime</label>
            <input type="text" placeholder="Upiši ime" />

            <label>Prezime</label>
            <input type="text" placeholder="Upiši prezime" />

            <label>Email</label>
            <input type="email" placeholder="Upiši email" />

            <label>Lozinka</label>
            <input type="password" placeholder="Kreiraj lozinku" />

            <label>Potvrdi lozinku</label>
            <input type="password" placeholder="Ponovi lozinku" />
          </div>

          {/* Odvojač */}
          <div className="register-divider">
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

          {/* Forma o psu */}
          <div className="dog-form">
            <h3>Podaci o psu</h3>

            <label>Ime psa</label>
            <input type="text" placeholder="Upiši ime psa" />

            <label>Pasmina</label>
            <input type="text" placeholder="Upiši pasminu" />

            <label>Dob (godine)</label>
            <input type="number" placeholder="Upiši dob" />

            <label>Spol</label>
            <select>
              <option value="">Odaberi</option>
              <option value="muski">Muški</option>
              <option value="zenski">Ženski</option>
            </select>

            <label>Bolesti ili ozljede</label>
            <textarea placeholder="Upiši ako pas ima neke bolesti ili ozljede (ostavi prazno ako nema)" />

            <label>Socijalizacija s drugim psima</label>
            <select>
              <option value="">Odaberi</option>
              <option value="odlicna">Odlična – voli sve pse</option>
              <option value="dobra">Dobra – uglavnom ok</option>
              <option value="ogranicena">Ograničena – treba oprez</option>
              <option value="lose">Loša – ne slaže se s psima</option>
            </select>
          </div>

          <button className="register-submit">Registriraj se</button>

          <p className="register-login">Već imaš račun? <a href="/login">Prijavi se</a></p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RegisterOwner