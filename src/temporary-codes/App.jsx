import React, { useState } from 'react';
import './styles/global.css';
import Sidebar from './components/Sidebar';

/* Owner pages */
import OwnerProfile from './components/owner/OwnerProfile';

/* Walker pages */
import WalkerProfile  from './components/walker/WalkerProfile';
import WalkerTermini  from './components/walker/WalkerTermini';
import AktivnaSetnja  from './components/walker/AktivnaSetnja';
import WalkerRecenzije from './components/walker/WalkerRecenzije';

/*
  APP ENTRY POINT
  ─────────────────────────────────────────────────────────
  In your real app, replace `role` with the value that comes
  from your auth context/session:

    const { user } = useAuth();
    const role = user.role; // 'owner' | 'walker'

  The prop-drilling here is intentional — keep it simple and
  lift role/isOnline state to wherever your auth lives.
*/

/* Placeholder page for pages not yet implemented */
function PlaceholderPage({ icon, title, subtitle }) {
  return (
    <div className="card-padded" style={{ textAlign: 'center', padding: '72px 40px' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: 'var(--brown)', marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: 'var(--muted)' }}>{subtitle}</div>
    </div>
  );
}

const PAGE_META = {
  /* owner */
  profile:      { title: 'Moj profil & Pas',  sub: 'Upravljajte svojim profilom i podacima psa' },
  reservations: { title: 'Moje rezervacije',  sub: 'Pregled nadolazećih i prošlih šetnji' },
  history:      { title: 'Povijest šetnji',   sub: 'Sve prošle šetnje vašeg ljubimca' },
  tracking:     { title: 'Gdje je moj pas?',  sub: 'Pratite lokaciju u realnom vremenu' },
  /* walker */
  termini:      { title: 'Moji termini',      sub: 'Nadolazeće rezervacije' },
  aktivan:      { title: 'Aktivna šetnja',    sub: 'Pokrenite šetnju i podijelite lokaciju s vlasnikom' },
  recenzije:    { title: 'Moje recenzije',    sub: 'Što vlasnici kažu o vašim uslugama' },
};

export default function App() {
  /*
    ── TO INTEGRATE WITH YOUR AUTH ──────────────────────────
    Replace the two lines below with your real auth values:

      const { user } = useAuth();
      const role = user?.role ?? 'owner';     // 'owner' | 'walker'

    Keep isOnline / setIsOnline as local state or lift it to
    your context if the online status needs to be shared with
    the backend.
    ─────────────────────────────────────────────────────────
  */
  const role = 'walker'; // ← swap to 'owner' or pull from auth context

  const defaultPage = role === 'walker' ? 'profile' : 'profile';
  const [activePage, setActivePage] = useState(defaultPage);
  const [isOnline, setIsOnline]     = useState(true);

  const meta = PAGE_META[activePage] ?? { title: '', sub: '' };

  const renderPage = () => {
    if (role === 'owner') {
      switch (activePage) {
        case 'profile':      return <OwnerProfile />;
        case 'reservations': return <PlaceholderPage icon="📅" title="Moje rezervacije" subtitle="Ovdje će biti prikazane rezervacije" />;
        case 'history':      return <PlaceholderPage icon="🕐" title="Povijest šetnji" subtitle="Ovdje će biti prikazana povijest šetnji" />;
        case 'tracking':     return <PlaceholderPage icon="📍" title="Gdje je moj pas?" subtitle="Ovdje će biti prikazana karta praćenja" />;
        default:             return null;
      }
    }

    // walker
    switch (activePage) {
      case 'profile':   return <WalkerProfile isOnline={isOnline} />;
      case 'termini':   return <WalkerTermini />;
      case 'aktivan':   return <AktivnaSetnja />;
      case 'recenzije': return <WalkerRecenzije />;
      default:          return null;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        role={role}
        activePage={activePage}
        onNavigate={setActivePage}
        isOnline={isOnline}
        onToggleOnline={() => setIsOnline(o => !o)}
      />

      <main className="dashboard-main">
        <div className="page-title">{meta.title}</div>
        <div className="page-sub">{meta.sub}</div>
        {renderPage()}
      </main>
    </div>
  );
}
