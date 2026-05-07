import React from 'react';
import '../styles/Sidebar.css';

/* ─── OWNER nav items ─── */
const OWNER_NAV = [
  { id: 'profile', icon: '🐾', label: 'Moj profil & Pas' },
  { id: 'reservations', icon: '📅', label: 'Moje rezervacije' },
  { id: 'history', icon: '🕐', label: 'Povijest šetnji' },
  { id: 'tracking', icon: '📍', label: 'Gdje je moj pas?' },
];

/* ─── WALKER nav items ─── */
const WALKER_NAV = [
  { id: 'profile',   icon: '🧑', label: 'Moj profil' },
  { id: 'termini',   icon: '🕐', label: 'Moji termini' },
  { id: 'aktivan',   icon: '✈️',  label: 'Aktivna šetnja' },
  { id: 'recenzije', icon: '⭐', label: 'Moje recenzije' },
];

export default function Sidebar({ role, activePage, onNavigate, isOnline, onToggleOnline }) {
  const navItems = role === 'walker' ? WALKER_NAV : OWNER_NAV;

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">🐾 PawTracker</div>
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

      {/* Walker gets online toggle at bottom */}
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
  );
}
