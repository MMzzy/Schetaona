import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function DashboardWalker() {
  return (
    <div>
      <Navbar />

      <main className="dashboard-page">
        <h2>Moj profil – Šetač</h2>

        {/* Status */}
        <div className="dashboard-section">
          <h3>Moj status</h3>
          <div className="status-toggle">
            <p>Trenutno si: <strong>Offline</strong></p>
            <button>Postavi se Online</button>
          </div>
        </div>

        {/* Termini */}
        <div className="dashboard-section">
          <h3>Moji termini</h3>
          <div className="reservation">
            <p><strong>Vlasnik:</strong> Tomislav Babić</p>
            <p><strong>Pas:</strong> Rex (Labrador, 3 god.)</p>
            <p><strong>Datum:</strong> 18.03.2026. u 15:00</p>
            <p><strong>Status:</strong> ✅ Potvrđeno</p>
            <button>Prihvati</button>
            <button>Odbij</button>
          </div>
        </div>

        {/* Aktivna šetnja */}
        <div className="dashboard-section">
          <h3>Aktivna šetnja</h3>
          <div className="active-walk">
            <p>Trenutno nema aktivne šetnje.</p>
            <button>Započni šetnju</button>
          </div>
          <div className="tracking-map">
            🗺️ GPS praćenje dolazi ovdje (Leaflet.js)
          </div>
        </div>

        {/* Recenzije */}
        <div className="dashboard-section">
          <h3>Moje recenzije</h3>
          <p>Prosječna ocjena: ⭐ 4.9</p>
          <div className="review">
            <div className="review-header">
              <strong>Tomislav B.</strong>
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p>Odličan šetač, pas ga obožava!</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default DashboardWalker