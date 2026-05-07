import { useState, useEffect, useRef } from 'react'

const DOG_CLIENTS = [
  { id: 1, name: 'Buddy', owner: 'Petra Novak', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=80&q=80' },
  { id: 2, name: 'Max',   owner: 'Ivan Horvat',  img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&q=80' },
  { id: 3, name: 'Luna',  owner: 'Ana Kovačić',  img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=80&q=80' },
]

const BASE_LAT = 45.815
const BASE_LNG = 15.982

export default function AktivnaSetnja() {
  const [walking, setWalking]         = useState(false)
  const [selectedDog, setSelectedDog] = useState(null)
  const [elapsed, setElapsed]         = useState(0)
  const [distance, setDistance]       = useState(0)
  const [position, setPosition]       = useState({ lat: BASE_LAT, lng: BASE_LNG })
  const [trail, setTrail]             = useState([])
  const [mapLoaded, setMapLoaded]     = useState(false)

  const timerRef    = useRef(null)
  const simRef      = useRef(null)
  const mapRef      = useRef(null)
  const leafletMap  = useRef(null)
  const markerRef   = useRef(null)
  const polylineRef = useRef(null)

  useEffect(() => {
    if (window.L) { setMapLoaded(true); return }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
    script.onload = () => setMapLoaded(true)
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (!mapLoaded || leafletMap.current) return
    const L = window.L
    leafletMap.current = L.map(mapRef.current).setView([BASE_LAT, BASE_LNG], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(leafletMap.current)
  }, [mapLoaded])

  useEffect(() => {
    if (!mapLoaded || !leafletMap.current) return
    const L = window.L

    const icon = L.divIcon({
      className: '',
      html: `<div style="width:32px;height:32px;background:var(--lime,#b5f03d);border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 10px rgba(0,0,0,0.25);">🐾</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    if (markerRef.current) {
      markerRef.current.setLatLng([position.lat, position.lng])
    } else {
      markerRef.current = L.marker([position.lat, position.lng], { icon })
        .addTo(leafletMap.current)
        .bindPopup('Šetač je ovdje!')
    }

    if (walking && trail.length > 1) {
      if (polylineRef.current) polylineRef.current.remove()
      polylineRef.current = L.polyline(trail.map(p => [p.lat, p.lng]), {
        color: '#b5f03d', weight: 4, opacity: 0.85,
      }).addTo(leafletMap.current)
    }

    leafletMap.current.panTo([position.lat, position.lng])
  }, [position, trail, walking, mapLoaded])

  useEffect(() => {
    if (walking) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [walking])

  const simulateGPS = () => {
    setPosition(prev => {
      const next = {
        lat: prev.lat + (Math.random() - 0.49) * 0.0008,
        lng: prev.lng + (Math.random() - 0.49) * 0.0008,
      }
      setTrail(t => {
        const newTrail = [...t, next]
        if (newTrail.length > 1) {
          const last = newTrail[newTrail.length - 2]
          const dlat = (next.lat - last.lat) * 111
          const dlng = (next.lng - last.lng) * 111 * Math.cos(next.lat * Math.PI / 180)
          setDistance(d => +(d + Math.sqrt(dlat * dlat + dlng * dlng)).toFixed(3))
        }
        return newTrail
      })
      return next
    })
  }

  const startWalk = () => {
    if (!selectedDog) return
    setWalking(true)
    setElapsed(0)
    setDistance(0)
    setTrail([position])
    simRef.current = setInterval(simulateGPS, 3000)
  }

  const stopWalk = () => {
    setWalking(false)
    clearInterval(simRef.current)
  }

  useEffect(() => () => { clearInterval(simRef.current) }, [])

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {walking && (
        <div className="card-padded" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <img src={selectedDog?.img} alt={selectedDog?.name}
            style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--brown)' }}>
              Šetnja u tijeku — {selectedDog?.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              Vlasnik: {selectedDog?.owner} · Lokacija se dijeli
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="stat-card" style={{ padding: '14px 18px', minWidth: 90 }}>
              <div className="stat-number" style={{ fontSize: 20 }}>{fmt(elapsed)}</div>
              <div className="stat-label">Trajanje</div>
            </div>
            <div className="stat-card" style={{ padding: '14px 18px', minWidth: 90 }}>
              <div className="stat-number" style={{ fontSize: 20 }}>{distance.toFixed(1)} km</div>
              <div className="stat-label">Udaljenost</div>
            </div>
          </div>
        </div>
      )}

      {!walking ? (
        <div className="card-padded">
          <div className="section-heading"><span>🐾</span> Odaberi psa za šetnju</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {DOG_CLIENTS.map(dog => (
              <div
                key={dog.id}
                onClick={() => setSelectedDog(dog)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 16px',
                  borderRadius: 14,
                  border: `2px solid ${selectedDog?.id === dog.id ? 'var(--lime)' : 'var(--border)'}`,
                  background: selectedDog?.id === dog.id ? 'var(--tag-bg)' : 'var(--cream)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <img src={dog.img} alt={dog.name}
                  style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--brown)', fontSize: 15 }}>{dog.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Vlasnik: {dog.owner}</div>
                </div>
                {selectedDog?.id === dog.id && (
                  <span style={{ marginLeft: 'auto', color: 'var(--green)', fontSize: 18 }}>✓</span>
                )}
              </div>
            ))}
          </div>
          <button
            className="btn-lime"
            style={{
              width: '100%', justifyContent: 'center',
              padding: '14px 0', fontSize: 15,
              opacity: selectedDog ? 1 : 0.5,
              cursor: selectedDog ? 'pointer' : 'not-allowed',
            }}
            onClick={startWalk}
            disabled={!selectedDog}
          >
            ▶ Pokreni šetnju
          </button>
          {!selectedDog && (
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
              Odaberite psa kako biste pokrenuli šetnju
            </div>
          )}
        </div>
      ) : (
        <button
          className="btn-ghost"
          style={{ width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 15, border: '2px solid #e0cfc0' }}
          onClick={stopWalk}
        >
          ■ Završi šetnju
        </button>
      )}

      <div className="card" style={{ overflow: 'hidden' }}>
        <div ref={mapRef} style={{ height: 400, width: '100%', borderRadius: 'var(--radius)' }} />
        {!mapLoaded && (
          <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
            Učitavanje karte…
          </div>
        )}
      </div>

      <div style={{
        background: 'var(--tag-bg)', borderRadius: 14, padding: '14px 18px',
        fontSize: 13, color: 'var(--tag-text)', display: 'flex', gap: 8, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 16 }}>ℹ️</span>
        <span>
          Dok je šetnja aktivna, vlasnik psa može pratiti lokaciju u realnom vremenu putem stranice <strong>"Gdje je moj pas?"</strong>.
          Lokacija se automatski dijeli kad pokrenete šetnju.
        </span>
      </div>
    </div>
  )
}
