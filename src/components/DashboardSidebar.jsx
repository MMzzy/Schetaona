const OWNER_NAV = [
  { id: 'profile',      icon: '🐾', label: 'Moj profil' },
  { id: 'reservations', icon: '📅', label: 'Moje rezervacije' },
  { id: 'history',      icon: '🕐', label: 'Povijest šetnji' },
  { id: 'tracking',     icon: '📍', label: 'Gdje je moj pas?' },
]

const WALKER_NAV = [
  { id: 'profile',   icon: '🧑', label: 'Moj profil' },
  { id: 'zahtjevi',  icon: '🔔', label: 'Zahtjevi' },
  { id: 'termini',   icon: '🕐', label: 'Moji termini' },
  { id: 'aktivan',   icon: '✈️',  label: 'Aktivna šetnja' },
  { id: 'recenzije', icon: '⭐', label: 'Moje recenzije' },
]

export default function DashboardSidebar({ role, activePage, onNavigate, isOnline, onToggleOnline }) {
  const navItems = role === 'walker' ? WALKER_NAV : OWNER_NAV

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">🐾 Šetaona</div>
      <div className="sidebar-sub">Dog Walking Dashboard</div>

      <div className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {role === 'walker' && (
        <div className="sidebar-footer">
          <div className="online-row">
            <div className="online-indicator">
              <span className={`online-dot ${isOnline ? '' : 'offline'}`} />
              {isOnline ? 'Online' : 'Offline'}
            </div>
            <button
              className={`toggle-track ${isOnline ? 'on' : ''}`}
              onClick={onToggleOnline}
              aria-label="Toggle online status"
            >
              <div className="toggle-thumb" />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
