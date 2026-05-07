import { useState } from 'react'

const INITIAL_APPOINTMENTS = [
  {
    id: 1,
    dogName: 'Buddy',
    dogImg: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=80&q=80',
    owner: 'Petra Novak',
    date: '12. travnja 2026',
    time: '14:00',
    status: 'confirmed',
  },
  {
    id: 2,
    dogName: 'Max',
    dogImg: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80',
    owner: 'Ivan Horvat',
    date: '13. travnja 2026',
    time: '10:00',
    status: 'pending',
  },
  {
    id: 3,
    dogName: 'Luna',
    dogImg: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=80&q=80',
    owner: 'Ana Kovačić',
    date: '15. travnja 2026',
    time: '09:00',
    status: 'pending',
  },
  {
    id: 4,
    dogName: 'Rex',
    dogImg: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=80&q=80',
    owner: 'Tomislav Babić',
    date: '10. travnja 2026',
    time: '11:00',
    status: 'confirmed',
  },
]

const STATUS_LABEL = {
  confirmed: 'Potvrđeno',
  pending: 'Na čekanju',
  done: 'Završeno',
}

export default function WalkerTermini() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)

  const accept = (id) =>
    setAppointments(a => a.map(x => x.id === id ? { ...x, status: 'confirmed' } : x))

  const decline = (id) =>
    setAppointments(a => a.filter(x => x.id !== id))

  const confirmed = appointments.filter(a => a.status === 'confirmed').length
  const pending   = appointments.filter(a => a.status === 'pending').length

  return (
    <>
      <div className="stats-row stats-row-2" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-number">{confirmed}</div>
          <div className="stat-label">Potvrđeni termini</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏳</span>
          <div className="stat-number">{pending}</div>
          <div className="stat-label">Na čekanju</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {appointments.map(apt => (
          <div key={apt.id} className="card-padded" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img
                src={apt.dogImg}
                alt={apt.dogName}
                style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--brown)' }}>
                  {apt.dogName}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                  Vlasnik: {apt.owner}
                </div>
                <div style={{ display: 'flex', gap: 14, marginTop: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    📅 {apt.date}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    🕐 {apt.time}
                  </span>
                </div>
              </div>
              <span className={`badge badge-${apt.status === 'confirmed' ? 'confirmed' : apt.status === 'pending' ? 'pending' : 'done'}`}>
                {STATUS_LABEL[apt.status]}
              </span>
            </div>

            {apt.status === 'pending' && (
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button className="btn-lime" style={{ flex: 1, justifyContent: 'center', borderRadius: 12, padding: '12px 0' }}
                  onClick={() => accept(apt.id)}>
                  ✓ Prihvati
                </button>
                <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center', borderRadius: 12, padding: '12px 0' }}
                  onClick={() => decline(apt.id)}>
                  ✕ Odbij
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
