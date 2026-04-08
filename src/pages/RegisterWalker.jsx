import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function RegisterWalker() {
  return (
    <div>
      <Navbar />

      <main className="register-page">
        <div className="register-box">
          <h2>Registracija – Šetač</h2>

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

          {/* Forma o šetaču */}
          <div className="walker-form">
            <h3>Podaci o tebi</h3>

            <label>Datum rođenja</label>
            <input type="date" />

            <label>Broj mobitela</label>
            <input type="tel" placeholder="Upiši broj mobitela" />

            <label>Grad</label>
            <input type="text" placeholder="Upiši grad" />

            <label>Zona šetanja</label>
            <input type="text" placeholder="Upiši kvart ili područje gdje šetaš" />

            <label>Iskustvo s psima</label>
            <select>
              <option value="">Odaberi</option>
              <option value="pocetnik">Početnik – nemam puno iskustva</option>
              <option value="srednje">Srednje – imam iskustva s psima</option>
              <option value="iskusan">Iskusan – radim s psima duže vrijeme</option>
            </select>

            <label>Možeš li šetati više pasa odjednom?</label>
            <select>
              <option value="">Odaberi</option>
              <option value="jedan">Ne, samo jedan pas</option>
              <option value="dva">Da, do 2 psa</option>
              <option value="vise">Da, i više od 2 psa</option>
            </select>

            <label>Kratki opis o sebi</label>
            <textarea placeholder="Predstavi se vlasnicima – tko si, zašto voliš pse, što možeš ponuditi..." />

            <label>Profilna fotografija</label>
            <input type="file" accept="image/*" />
          </div>

          <button className="register-submit">Registriraj se</button>

          <p className="register-login">Već imaš račun? <a href="/login">Prijavi se</a></p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RegisterWalker