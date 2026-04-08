import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './Walkers.module.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const makeIcon = (active = false) => new L.DivIcon({
  className: '',
  html: `<svg width="${active ? 20 : 16}" height="${active ? 26 : 20}" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 0C4.925 0 0 4.925 0 11c0 7.5 11 17 11 17S22 18.5 22 11C22 4.925 17.075 0 11 0z" fill="#A2FF00"/>
    <circle cx="11" cy="11" r="4" fill="#1C3320"/>
  </svg>`,
  iconSize: [active ? 20 : 16, active ? 26 : 20],
  iconAnchor: [active ? 10 : 8, active ? 26 : 20],
  popupAnchor: [0, active ? -26 : -20],
})

const walkersData = [
  { id: 1, name: 'Ana Kovač',    area: 'Maksimir',    rating: 4.9, reviews: 32, online: true,  img: 'https://i.pravatar.cc/150?img=47', lat: 45.815, lng: 15.982, walks: 128 },
  { id: 2, name: 'Marko Perić',  area: 'Trnje',       rating: 4.7, reviews: 18, online: true,  img: 'https://i.pravatar.cc/150?img=11', lat: 45.804, lng: 15.971, walks: 64  },
  { id: 3, name: 'Petra Horvat', area: 'Črnomerec',   rating: 4.8, reviews: 45, online: false, img: 'https://i.pravatar.cc/150?img=45', lat: 45.822, lng: 15.962, walks: 210 },
  { id: 4, name: 'Ivan Blažić',  area: 'Sesvete',     rating: 4.5, reviews: 12, online: false, img: 'https://i.pravatar.cc/150?img=12', lat: 45.830, lng: 16.010, walks: 38  },
  { id: 5, name: 'Maja Lučić',   area: 'Novi Zagreb', rating: 4.6, reviews: 27, online: true,  img: 'https://i.pravatar.cc/150?img=44', lat: 45.790, lng: 15.975, walks: 95  },
  { id: 6, name: 'Luka Novak',   area: 'Gornji Grad', rating: 5.0, reviews: 8,  online: false, img: 'https://i.pravatar.cc/150?img=15', lat: 45.817, lng: 15.978, walks: 22  },
]

export default function Walkers() {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('rating')
  const [distance, setDistance] = useState('')
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [hovered, setHovered] = useState(null)
  const pageRef = useRef(null)

  useEffect(() => {
    if (pageRef.current) pageRef.current.scrollTop = 0
  }, [])

  const filtered = walkersData
    .filter(w => onlineOnly ? w.online : true)
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : a.rating - b.rating)

  return (
    <div className={styles.page} ref={pageRef}>
      <Navbar/>

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.headerEyebrow}>Zagreb · {filtered.length} šetača</p>
          <h1 className={styles.headerTitle}>Pronađi šetača</h1>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className={`${styles.filterBar}`}>
        <div className={styles.filterGroup}>
          <button className={`${styles.filterChip} ${sortBy === 'rating' ? styles.filterChipActive : ''}`} onClick={() => setSortBy('rating')}>↓ Najviša ocjena</button>
          <button className={`${styles.filterChip} ${sortBy === 'ratingAsc' ? styles.filterChipActive : ''}`} onClick={() => setSortBy('ratingAsc')}>↑ Najniža ocjena</button>
        </div>
        <div className={styles.filterGroup}>
          {['', '1', '3', '5'].map(d => (
            <button key={d} className={`${styles.filterChip} ${distance === d ? styles.filterChipActive : ''}`} onClick={() => setDistance(d)}>
              {d === '' ? 'Sve udaljenosti' : `Do ${d} km`}
            </button>
          ))}
        </div>
        <label className={styles.onlineToggle} onClick={() => setOnlineOnly(p => !p)}>
          <div className={`${styles.toggleTrack} ${onlineOnly ? styles.toggleActive : ''}`}>
            <div className={styles.toggleThumb} />
          </div>
          <span>Samo online</span>
        </label>
      </div>

      {/* MAIN */}
      <main className={`${styles.main}`}>

        {/* Lista */}
        <div className={styles.leftPanel}>
          {filtered.map((walker, idx) => (
            <div
              key={walker.id}
              className={`${styles.card} ${hovered === walker.id ? styles.cardActive : ''}`}
              onClick={() => navigate(`/walkers/${walker.id}`)}
              onMouseEnter={() => setHovered(walker.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div className={styles.cardImgWrap}>
                <img src={walker.img} alt={walker.name} className={styles.cardImg} />
                {walker.online && <span className={styles.onlineDot} />}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardName}>{walker.name}</h3>
                  <span className={styles.cardRatingBadge}>
                    <img src="/icons/star.png" alt="★" className={styles.starIcon} />
                    {walker.rating}
                  </span>
                </div>
                <p className={styles.cardArea}>{walker.area}, Zagreb</p>
                <div className={styles.cardMeta}>
                  <span>{walker.reviews} recenzija</span>
                  <span className={styles.cardDot}>·</span>
                  <span>{walker.walks} šetnji</span>
                </div>
              </div>
              <button className={styles.cardBtn} onClick={e => { e.stopPropagation(); navigate(`/walkers/${walker.id}`) }}>
                Profil →
              </button>
            </div>
          ))}
        </div>

        {/* Mapa */}
        <div className={styles.mapPanel}>
          <div className={styles.mapWrapper}>
            <MapContainer center={[45.810, 15.978]} zoom={13} style={{ width: '100%', height: '100%' }} zoomControl={false}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                {filtered.map(walker => (
                  <Marker
                    key={walker.id}
                    position={[walker.lat, walker.lng]}
                    icon={makeIcon(hovered === walker.id)}
                    eventHandlers={{
                      mouseover: (e) => {
                        e.target.openPopup()
                        setHovered(walker.id)
                      },
                      mouseout: (e) => {
                        e.target.closePopup()
                        setHovered(null)
                      },
                    }}
                  >
                    <Popup closeButton={false} autoPan={false}>
                      <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '12px' }}>
                        <strong style={{ fontFamily: 'Roboto Mono, monospace',fontWeight: '700', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{walker.name}</strong>
                        <span>📍 {walker.area}</span><br />
                        <span>★ {walker.rating} · {walker.reviews} recenzija</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>

      </main>

      {/* BOOK CTA */}
      <section className={styles.bookCta}>
        <div className={styles.bookCtaInner}>
          <p className={styles.bookCtaEyebrow}>Spreman za šetnju?</p>
          <h2 className={styles.bookCtaTitle}>Rezerviraj termin</h2>
          <p className={styles.bookCtaText}>Odaberi datum i pronađi slobodnog šetača koji odgovara tvom psu.</p>
          <button className={styles.bookCtaBtn} onClick={() => navigate('/book')}>Rezerviraj sada →</button>
        </div>
      </section>

      <Footer />
    </div>
  )
}