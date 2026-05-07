import React, { useState } from 'react';
import '../styles/OwnerProfile.css';

const DAYS = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];

const DEFAULT_AVAILABILITY = {
  days: [true, true, true, false, true, true, false],
  morningFrom: '07:00',
  morningTo: '10:00',
  afternoonFrom: '14:00',
  afternoonTo: '18:00',
};

const DEFAULT_OWNER = {
  firstName: 'Ivana',
  lastName: 'Marković',
  email: 'ivana@email.com',
  phone: '+385 91 234 5678',
  city: 'Zagreb',
  address: 'Ilica 42, 10000',
  bio: 'Strastvena ljubiteljica pasa iz Zagreba. Buddy je moj trogodišnji zlatni retriver koji obožava šetnje u parku Bundek i igru s loptom.',
};

const DEFAULT_DOG = {
  name: 'Buddy',
  breed: 'Golden Retriever',
  age: '3 godine',
  weight: '30 kg',
  healthNotes: 'Zdrav, svi cjepovi ažurirani',
  socialization: 'Odličan s djecom i drugim psima',
  notes: 'Treba povodac cijelo vrijeme · Alergičan na ambroziju · Voli park Bundek',
};

const DEFAULT_PREFS = {
  push: true,
  email: true,
  sms: false,
  tracking: true,
};

/* ─── Modal component ─── */
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

export default function OwnerProfile() {
  const [owner, setOwner]     = useState(DEFAULT_OWNER);
  const [dog, setDog]         = useState(DEFAULT_DOG);
  const [avail, setAvail]     = useState(DEFAULT_AVAILABILITY);
  const [prefs, setPrefs]     = useState(DEFAULT_PREFS);
  const [editOwner, setEditOwner] = useState(false);
  const [editDog, setEditDog]     = useState(false);

  /* form drafts */
  const [ownerDraft, setOwnerDraft] = useState(owner);
  const [dogDraft, setDogDraft]     = useState(dog);

  const openOwnerEdit = () => { setOwnerDraft(owner); setEditOwner(true); };
  const openDogEdit   = () => { setDogDraft(dog);     setEditDog(true); };

  const saveOwner = () => { setOwner(ownerDraft); setEditOwner(false); };
  const saveDog   = () => { setDog(dogDraft);     setEditDog(false); };

  const toggleDay = (i) => {
    const days = [...avail.days];
    days[i] = !days[i];
    setAvail({ ...avail, days });
  };

  const togglePref = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  return (
    <>
      {/* ─── Hero ─── */}
      <div className="owner-hero">
        <div className="owner-banner">
          <div className="owner-banner-pattern" />
        </div>
        <div className="owner-hero-body">
          <div className="owner-avatar-wrap">
            <div className="owner-avatar">👤</div>
            <button className="avatar-edit-btn" onClick={openOwnerEdit} aria-label="Uredi profil">✎</button>
          </div>
          <div className="owner-name-row">
            <div>
              <div className="owner-name">{owner.firstName} {owner.lastName}</div>
              <div className="role-badge">🏠 Vlasnik psa</div>
            </div>
            <button className="btn-primary" onClick={openOwnerEdit}>✎ Uredi profil</button>
          </div>
          <div className="owner-bio">{owner.bio}</div>
          <div className="owner-meta-row">
            <div className="meta-chip"><span>📍</span>{owner.city}, Hrvatska</div>
            <div className="meta-chip"><span>📧</span>{owner.email}</div>
            <div className="meta-chip"><span>📱</span>{owner.phone}</div>
            <div className="meta-chip"><span>📅</span>Član od: Siječanj 2025</div>
          </div>
        </div>
      </div>

      {/* ─── Stats ─── */}
      <div className="stats-row stats-row-3">
        <div className="stat-card">
          <span className="stat-icon">🦮</span>
          <div className="stat-number">24</div>
          <div className="stat-label">Ukupno šetnji</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-number">4.9</div>
          <div className="stat-label">Prosj. ocjena šetača</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🤝</span>
          <div className="stat-number">3</div>
          <div className="stat-label">Omiljeni šetači</div>
        </div>
      </div>

      {/* ─── Owner info + Dog info ─── */}
      <div className="owner-grid">

        {/* Personal info card */}
        <div className="card-padded">
          <div className="section-heading"><span>👤</span> Osobni podaci</div>
          <div className="info-row"><span className="info-label">Ime i prezime</span><span className="info-value">{owner.firstName} {owner.lastName}</span></div>
          <div className="info-row"><span className="info-label">E-mail</span><span className="info-value">{owner.email}</span></div>
          <div className="info-row"><span className="info-label">Telefon</span><span className="info-value">{owner.phone}</span></div>
          <div className="info-row"><span className="info-label">Grad</span><span className="info-value">{owner.city}</span></div>
          <div className="info-row"><span className="info-label">Adresa</span><span className="info-value">{owner.address}</span></div>
          <div style={{ marginTop: 16 }}>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={openOwnerEdit}>
              ✎ Uredi osobne podatke
            </button>
          </div>
        </div>

        {/* Dog card */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="dog-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80"
              alt={dog.name}
            />
            <div className="dog-img-overlay" />
            <div className="dog-img-name">{dog.name}</div>
            <button className="dog-img-edit" onClick={openDogEdit} aria-label="Uredi psa">✎</button>
          </div>
          <div className="dog-details">
            <div className="info-row"><span className="info-label">Pasmina</span><span className="info-value">{dog.breed}</span></div>
            <div className="info-row"><span className="info-label">Dob</span><span className="info-value">{dog.age}</span></div>
            <div className="info-row"><span className="info-label">Težina</span><span className="info-value">{dog.weight}</span></div>
            <div className="info-row"><span className="info-label">Zdravlje</span><span className="info-value">{dog.healthNotes}</span></div>
            <div style={{ marginTop: 16 }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={openDogEdit}>
                🐾 Uredi podatke o psu
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ─── Availability + Notifications ─── */}
      <div className="owner-grid">

        {/* Availability */}
        <div className="card-padded">
          <div className="section-heading"><span>📅</span> Dostupnost za šetnje</div>
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
              <input
                type="time"
                className="time-input"
                value={avail.morningFrom}
                onChange={e => setAvail({ ...avail, morningFrom: e.target.value })}
              />
            </div>
            <div className="avail-time-group">
              <label>Jutro do</label>
              <input
                type="time"
                className="time-input"
                value={avail.morningTo}
                onChange={e => setAvail({ ...avail, morningTo: e.target.value })}
              />
            </div>
            <div className="avail-time-group">
              <label>Poslijepodne od</label>
              <input
                type="time"
                className="time-input"
                value={avail.afternoonFrom}
                onChange={e => setAvail({ ...avail, afternoonFrom: e.target.value })}
              />
            </div>
            <div className="avail-time-group">
              <label>Poslijepodne do</label>
              <input
                type="time"
                className="time-input"
                value={avail.afternoonTo}
                onChange={e => setAvail({ ...avail, afternoonTo: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card-padded">
          <div className="section-heading"><span>🔔</span> Postavke obavijesti</div>
          {[
            { key: 'push',     label: 'Push obavijesti',   desc: 'Šetnje i rezervacije' },
            { key: 'email',    label: 'E-mail obavijesti', desc: 'Potvrde i sažetci' },
            { key: 'sms',      label: 'SMS poruke',        desc: 'Hitne situacije' },
            { key: 'tracking', label: 'Praćenje lokacije', desc: 'Dijeli lokaciju psa' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="pref-row">
              <div>
                <div className="pref-label">{label}</div>
                <div className="pref-desc">{desc}</div>
              </div>
              <button
                className={`toggle-track ${prefs[key] ? 'on' : ''}`}
                onClick={() => togglePref(key)}
                aria-label={label}
              >
                <div className="toggle-thumb" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ─── Safety notes ─── */}
      <div className="card-padded" style={{ marginBottom: 24 }}>
        <div className="section-heading"><span>🏅</span> Napomene za šetače</div>
        <div className="tags-wrap">
          {dog.notes.split(' · ').map((n, i) => (
            <span key={i} className="tag">{n}</span>
          ))}
        </div>
      </div>

      {/* ─── OWNER EDIT MODAL ─── */}
      {editOwner && (
        <Modal title="✎ Uredi profil vlasnika" onClose={() => setEditOwner(false)}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ime</label>
              <input className="form-input" value={ownerDraft.firstName} onChange={e => setOwnerDraft({ ...ownerDraft, firstName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Prezime</label>
              <input className="form-input" value={ownerDraft.lastName} onChange={e => setOwnerDraft({ ...ownerDraft, lastName: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input className="form-input" type="email" value={ownerDraft.email} onChange={e => setOwnerDraft({ ...ownerDraft, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Telefon</label>
            <input className="form-input" value={ownerDraft.phone} onChange={e => setOwnerDraft({ ...ownerDraft, phone: e.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Grad</label>
              <input className="form-input" value={ownerDraft.city} onChange={e => setOwnerDraft({ ...ownerDraft, city: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Adresa</label>
              <input className="form-input" value={ownerDraft.address} onChange={e => setOwnerDraft({ ...ownerDraft, address: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">O meni</label>
            <textarea className="form-textarea" value={ownerDraft.bio} onChange={e => setOwnerDraft({ ...ownerDraft, bio: e.target.value })} />
          </div>
          <div className="modal-actions">
            <button className="btn-ghost" onClick={() => setEditOwner(false)}>Odustani</button>
            <button className="btn-primary" onClick={saveOwner}>Spremi</button>
          </div>
        </Modal>
      )}

      {/* ─── DOG EDIT MODAL ─── */}
      {editDog && (
        <Modal title="🐾 Uredi podatke o psu" onClose={() => setEditDog(false)}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ime psa</label>
              <input className="form-input" value={dogDraft.name} onChange={e => setDogDraft({ ...dogDraft, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Pasmina</label>
              <input className="form-input" value={dogDraft.breed} onChange={e => setDogDraft({ ...dogDraft, breed: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Dob</label>
              <input className="form-input" value={dogDraft.age} onChange={e => setDogDraft({ ...dogDraft, age: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Težina</label>
              <input className="form-input" value={dogDraft.weight} onChange={e => setDogDraft({ ...dogDraft, weight: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Zdravstvene napomene</label>
            <input className="form-input" value={dogDraft.healthNotes} onChange={e => setDogDraft({ ...dogDraft, healthNotes: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Socijalizacija</label>
            <input className="form-input" value={dogDraft.socialization} onChange={e => setDogDraft({ ...dogDraft, socialization: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Napomene za šetače (odvojite s " · ")</label>
            <textarea className="form-textarea" value={dogDraft.notes} onChange={e => setDogDraft({ ...dogDraft, notes: e.target.value })} />
          </div>
          <div className="modal-actions">
            <button className="btn-ghost" onClick={() => setEditDog(false)}>Odustani</button>
            <button className="btn-primary" onClick={saveDog}>Spremi</button>
          </div>
        </Modal>
      )}
    </>
  );
}
