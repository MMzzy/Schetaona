import { useState } from 'react'
import '../dashboard.css'
import DashboardSidebar from '../components/DashboardSidebar'
import Navbar from '../components/Navbar'
import OwnerProfileSection from './OwnerProfileSection'

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

const PAGE_META = {
  profile:      { title: 'Moj profil',       sub: 'Upravljajte svojim profilom i podacima psa' },
  reservations: { title: 'Moje rezervacije',  sub: 'Pregled nadolazećih i prošlih šetnji' },
  history:      { title: 'Povijest šetnji',   sub: 'Sve prošle šetnje vašeg ljubimca' },
  tracking:     { title: 'Gdje je moj pas?',  sub: 'Pratite lokaciju u realnom vremenu' },
}

export default function DashboardOwner() {
  const [activePage, setActivePage] = useState('profile')

  const meta = PAGE_META[activePage] ?? { title: '', sub: '' }

  const renderPage = () => {
    switch (activePage) {
      case 'profile':      return <OwnerProfileSection />
      case 'reservations': return <PlaceholderPage icon="📅" title="Moje rezervacije" subtitle="Ovdje će biti prikazane rezervacije" />
      case 'history':      return <PlaceholderPage icon="🕐" title="Povijest šetnji" subtitle="Ovdje će biti prikazana povijest šetnji" />
      case 'tracking':     return <PlaceholderPage icon="📍" title="Gdje je moj pas?" subtitle="Ovdje će biti prikazana karta praćenja" />
      default:             return null
    }
  }

  return (
    <div className="dashboard-layout">
      <Navbar loggedIn={true} role="owner" alwaysVisible />
      <DashboardSidebar
        role="owner"
        activePage={activePage}
        onNavigate={setActivePage}
      />
      <main className="dashboard-main">
        <div className="page-title">{meta.title}</div>
        <div className="page-sub">{meta.sub}</div>
        {renderPage()}
      </main>
    </div>
  )
}
