import React, { useState } from 'react';
import '../styles/WalkerProfile.css';

const DAYS = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];

const DEFAULT_AVAIL = {
  days: [true, true, true, false, true, true, false],
  morningFrom: '08:00',
  morningTo: '13:00',
  afternoonFrom: '14:00',
  afternoonTo: '18:00',
};

const DEFAULT_WALKER = {
  firstName: 'Marko',
  lastName: 'Horvat',
  email: 'marko@email.com',
  phone: '+385 95 678 9012',
  city: 'Zagreb',
  experience: '5 godina',
  pricePerHour: '15',
  radius: '5',
  maxDogs: '3',
  bio: 'Iskusan šetač pasa s 5 godina iskustva. Volim prirodu i vježbanje, a najviše od svega volim provoditi vrijeme s psima. Certificiran sam za prvu pomoć životinjama.',
};

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </div>
  );
}

export default function WalkerProfile({ isOnline }) {
  const [walker, setWalker] = useState(DEFAULT_WALKER);
  const [avail, setAvail]   = useState(DEFAULT_AVAIL);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]   = useState(walker);
  const [skills, setSkills] = useState([
    '🐕 Trening pasa', '🏥 Prva pomoć za životinje',
    '🐾 Velike pasmine', '🧠 Posebne potrebe',
    '🌧 Šetnje po svim vremenima', '💉 Poznavanje cjepiva',
  ]);

  const openEdit = () => { setDraft(walker); setEditing(true); };
  const save = () => { setWalker(draft); setEditing(false); };

  const toggleDay = (i) => {
    const days = [...avail.days];
    days[i] = !days[i];
    setAvail({ ...avail, days });
  };

  return (
    <>
      {/* ─── Hero ─── */}
      <div className="walker-hero">
        <div className="walker-hero-banner">
          <div className="walker-hero-banner-pattern" />
          {/* Offline/Online pill top right */}
          <div className="walker-offline-pill">
            <span style={{ color: isOnline ? '#3a8c24' : '#888' }}>
              {isOnline ? '🟢' : '⚫'}
            </span>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
        <div className="walker-hero-body">
          <div className="walker-avatar-col">
            <div className="walker-avatar">🧑</div>
          </div>
          <div className="walker-info-col">
            <div className="walker-name-row">
              <div>
                <div className="walker-name">{walker.firstName} {walker.lastName}</div>
                <div className="walker-role-badge">🚶 Šetač pasa · ✅ Verificiran</div>
              </div>
              <button className="btn-primary" onClick={openEdit}>✎ Uredi profil</button>
            </div>
            <div className="walker-bio-bubble">{walker.bio}</div>
            <div className="walker-meta-row">
              <div className="meta-chip"><span>📍</span>{walker.city}, Hrvatska</div>
              <div className="meta-chip"><span>📧</span>{walker.email}</div>
              <div className="meta-chip"><span>📱</span>{walker.phone}</div>
              <div className="meta-chip"><span>🕐</span>Iskustvo: {walker.experience}</div>
              <div className="meta-chip"><span>📅</span>Dostupnost: Pon–Pet 8–18h, Sub 9–15h</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Stats / Earnings ─── */}
      <div className="stats-row stats-row-4">
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <div className="stat-number">248</div>
          <div className="stat-label">Ukupno šetnji</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💵</span>
          <div className="stat-number">12.400 kn</div>
          <div className="stat-label">Ukupna zarada</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-number">4.9</div>
          <div className="stat-label">Prosječna ocjena</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div className="stat-number">12</div>
          <div className="stat-label">Aktivni klijenti</div>
        </div>
      </div>

      {/* ─── Info grid ─── */}
      <div className="walker-grid">

        {/* Professional info */}
        <div className="card-padded">
          <div className="section-heading"><span>💼</span> Profesionalni podaci</div>
          <div className="info-row"><span className="info-label">Iskustvo</span><span className="info-value">{walker.experience}</span></div>
          <div className="info-row">
            <span className="info-label">Cijena / sat</span>
            <span className="info-value" style={{ color: 'var(--green)', fontSize: 17, fontWeight: 800 }}>{walker.pricePerHour} €</span>
          </div>
          <div className="info-row"><span className="info-label">Radijus rada</span><span className="info-value">{walker.radius} km od centra</span></div>
          <div className="info-row"><span className="info-label">Max pasa</span><span className="info-value">{walker.maxDogs} istovremeno</span></div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="info-value" style={{ color: isOnline ? 'var(--green)' : '#888' }}>
              {isOnline ? '🟢 Dostupan' : '⚫ Nedostupan'}
            </span>
          </div>
        </div>

        {/* Availability */}
        <div className="card-padded">
          <div className="section-heading"><span>📅</span> Dostupnost</div>
          <div className="avail-grid">
            {DAYS.map((day, i) => (
              <button
                key={day}
                className={`avail-day ${avail.days[i] ? 'on' : 'off'}`}
                onClick={() => toggleDay(i)}
              >
                <div className="avail-day-name">{day}</div>
                {avail.days[i] ? '✓' : '–'}
              </button>
            ))}
          </div>
          <div className="avail-time-row">
            <div className="avail-time-group">
              <label>Jutro od</label>
              <input type="time" className="time-input" value={avail.morningFrom}
                onChange={e => setAvail({ ...avail, morningFrom: e.target.value })} />
            </div>
            <div className="avail-time-group">
              <label>Jutro do</label>
              <input type="time" className="time-input" value={avail.morningTo}
                onChange={e => setAvail({ ...avail, morningTo: e.target.value })} />
            </div>
            <div className="avail-time-group">
              <label>Poslijepodne od</label>
              <input type="time" className="time-input" value={avail.afternoonFrom}
                onChange={e => setAvail({ ...avail, afternoonFrom: e.target.value })} />
            </div>
            <div className="avail-time-group">
              <label>Poslijepodne do</label>
              <input type="time" className="time-input" value={avail.afternoonTo}
                onChange={e => setAvail({ ...avail, afternoonTo: e.target.value })} />
            </div>
          </div>
        </div>

      </div>

      {/* ─── Skills ─── */}
      <div className="card-padded" style={{ marginBottom: 24 }}>
        <div className="section-heading"><span>🎓</span> Certifikati i vještine</div>
        <div className="tags-wrap">
          {skills.map((s, i) => <span key={i} className="tag">{s}</span>)}
        </div>
      </div>

      {/* ─── EDIT MODAL ─── */}
      {editing && (
        <Modal title="✎ Uredi profil šetača" onClose={() => setEditing(false)}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ime</label>
              <input className="form-input" value={draft.firstName} onChange={e => setDraft({ ...draft, firstName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Prezime</label>
              <input className="form-input" value={draft.lastName} onChange={e => setDraft({ ...draft, lastName: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input className="form-input" type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Telefon</label>
            <input className="form-input" value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Grad</label>
              <input className="form-input" value={draft.city} onChange={e => setDraft({ ...draft, city: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Iskustvo</label>
              <input className="form-input" value={draft.experience} onChange={e => setDraft({ ...draft, experience: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Cijena / sat (€)</label>
              <input className="form-input" type="number" value={draft.pricePerHour} onChange={e => setDraft({ ...draft, pricePerHour: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Radijus (km)</label>
              <input className="form-input" type="number" value={draft.radius} onChange={e => setDraft({ ...draft, radius: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Max pasa istovremeno</label>
            <input className="form-input" type="number" value={draft.maxDogs} onChange={e => setDraft({ ...draft, maxDogs: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">O meni</label>
            <textarea className="form-textarea" value={draft.bio} onChange={e => setDraft({ ...draft, bio: e.target.value })} />
          </div>
          <div className="modal-actions">
            <button className="btn-ghost" onClick={() => setEditing(false)}>Odustani</button>
            <button className="btn-primary" onClick={save}>Spremi</button>
          </div>
        </Modal>
      )}
    </>
  );
}
