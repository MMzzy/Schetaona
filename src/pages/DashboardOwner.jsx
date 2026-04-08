import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function DashboardOwner() {
  return (
    <div>
      <Navbar />

      <main className="dashboard-page">
        <h2>Moj profil – Vlasnik</h2>

        {/* Podaci o psu */}
        <div className="dashboard-section">
          <h3>Moj pas</h3>
          <div className="dog-info">
            <p><strong>Ime:</strong> Rex</p>
            <p><strong>Pasmina:</strong> Labrador</p>
            <p><strong>Dob:</strong> 3 godine</p>
            <p><strong>Socijalizacija:</strong> Odlična</p>
            <p><strong>Bolesti/ozljede:</strong> Nema</p>
          </div>
          <button>Uredi podatke</button>
        </div>

        {/* Rezervacije */}
        <div className="dashboard-section">
          <h3>Moje rezervacije</h3>
          <div className="reservation">
            <p><strong>Šetač:</strong> Ana Kovač</p>
            <p><strong>Datum:</strong> 18.03.2026. u 15:00</p>
            <p><strong>Status:</strong> ✅ Potvrđeno</p>
            <button>Otkaži</button>
          </div>
          <div className="reservation">
            <p><strong>Šetač:</strong> Marko Perić</p>
            <p><strong>Datum:</strong> 20.03.2026. u 10:00</p>
            <p><strong>Status:</strong> ⏳ Na čekanju</p>
            <button>Otkaži</button>
          </div>
          <button className="btn-new">Nova rezervacija</button>
        </div>

        {/* Gdje je moj ljubimac */}
        <div className="dashboard-section">
          <h3>📍 Gdje je moj ljubimac?</h3>
          <div className="tracking-map">
            🗺️ Mapa praćenja dolazi ovdje (Leaflet.js)
          </div>
          <div className="walk-history">
            <h4>Povijest šetnji</h4>
            <div className="walk">
              <p><strong>15.03.2026.</strong> · Ana Kovač · 45 min · 3.2 km</p>
              <button>Pogledaj rutu</button>
            </div>
            <div className="walk">
              <p><strong>12.03.2026.</strong> · Marko Perić · 30 min · 2.1 km</p>
              <button>Pogledaj rutu</button>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default DashboardOwner