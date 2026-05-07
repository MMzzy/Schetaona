import { Link } from 'react-router-dom'

export default function DashboardTopbar({ role, onNavigate }) {
  return (
    <div className="dashboard-topbar">
      <div className="topbar-left">
        <span className="topbar-logo">🐾 Šetaona</span>
      </div>
      <div className="topbar-right">
        {role === 'owner' && (
          <>
            <Link to="/walkers" className="topbar-btn">
              🦮 Pronađi šetača
            </Link>
            <button className="topbar-btn" onClick={() => onNavigate('reservations')}>
              📅 Rezervacije
            </button>
          </>
        )}
        {role === 'walker' && (
          <>
            <button className="topbar-btn" onClick={() => onNavigate('zahtjevi')}>
              🔔 Zahtjevi
            </button>
            <button className="topbar-btn" onClick={() => onNavigate('termini')}>
              📅 Termini
            </button>
          </>
        )}
        <Link to="/login" className="topbar-btn topbar-logout">
          Odjava
        </Link>
      </div>
    </div>
  )
}
