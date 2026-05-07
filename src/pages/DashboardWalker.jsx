import { useState } from 'react'
import '../dashboard.css'
import DashboardSidebar from '../components/DashboardSidebar'
import Navbar from '../components/Navbar'
import WalkerProfileSection from './WalkerProfileSection'
import WalkerTermini from './WalkerTermini'
import AktivnaSetnja from './AktivnaSetnja'
import WalkerRecenzije from './WalkerRecenzije'

const PAGE_META = {
  profile:   { title: 'Moj profil',       sub: 'Upravljajte svojim profilom i postavkama' },
  termini:   { title: 'Moji termini',      sub: 'Nadolazeće rezervacije' },
  aktivan:   { title: 'Aktivna šetnja',    sub: 'Pokrenite šetnju i podijelite lokaciju s vlasnikom' },
  recenzije: { title: 'Moje recenzije',    sub: 'Što vlasnici kažu o vašim uslugama' },
  zahtjevi:  { title: 'Zahtjevi',          sub: 'Upravljajte zahtjevima vlasnika za šetnje' },
}

function PlaceholderPage({ icon, title, subtitle }) {
  return (
    <div className="card-padded" style={{ textAlign: 'center', padding: '72px 40px' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: 'var(--brown)', marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: 'var(--muted)' }}>{subtitle}</div>
    </div>
  )
}

export default function DashboardWalker() {
  const [activePage, setActivePage] = useState('profile')
  const [isOnline, setIsOnline] = useState(true)

  const meta = PAGE_META[activePage] ?? { title: '', sub: '' }

  const renderPage = () => {
    switch (activePage) {
      case 'profile':   return <WalkerProfileSection isOnline={isOnline} onToggleOnline={() => setIsOnline(o => !o)} />
      case 'termini':   return <WalkerTermini />
      case 'aktivan':   return <AktivnaSetnja />
      case 'recenzije': return <WalkerRecenzije />
      case 'zahtjevi':  return <PlaceholderPage icon="🔔" title="Zahtjevi" subtitle="Ovdje će biti prikazani zahtjevi vlasnika za šetnje" />
      default:          return null
    }
  }

  return (
    <div className="dashboard-layout">
      <Navbar loggedIn={true} role="walker" alwaysVisible />
      <DashboardSidebar
        role="walker"
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
  )
}
