import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WalkersCarousel from '../components/Walkerscarousel'
import Footer from '../components/Footer'
import styles from './Home.module.css'
import BallsSection from '../components/BallsSection'
import { Search, CalendarDays, MapPin } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'


const makeIcon = () => L.divIcon({
  className: '',
  html: `<svg width="16" height="20" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 0C4.925 0 0 4.925 0 11c0 7.5 11 17 11 17S22 18.5 22 11C22 4.925 17.075 0 11 0z" fill="#A2FF00"/>
    <circle cx="11" cy="11" r="4" fill="#1C3320"/>
  </svg>`,
  iconSize: [16, 20],
  iconAnchor: [8, 20],
  popupAnchor: [0, -20],
})


function useScrollValue(ref) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const raw = (windowH - rect.top) / (windowH + rect.height)
      setValue(Math.min(1, Math.max(0, raw)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return value
}


function useReveal(ref, threshold = 0.15) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add(styles.visible) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}


export default function Home() {
  const navigate = useNavigate()

  const ctaBtnsRef     = useRef(null)
  const ctaTextRef     = useRef(null)
  const ballsTitleRef  = useRef(null)
  const ball1Ref       = useRef(null)
  const ball2Ref       = useRef(null)
  const ball3Ref       = useRef(null)
  const mapSectionRef  = useRef(null)
  const workflowRef    = useRef(null)
  const boneImgRef     = useRef(null)

  useReveal(ctaBtnsRef,    0.2)
  useReveal(ctaTextRef,    0.3)
  useReveal(ballsTitleRef, 0.2)
  useReveal(ball1Ref,      0.2)
  useReveal(ball2Ref,      0.2)
  useReveal(ball3Ref,      0.2)
  useReveal(mapSectionRef, 0.1)
  useReveal(workflowRef,   0.1)
  useReveal(boneImgRef,    0.2)


  return (
    <div className={styles.page}>
      <Navbar />

      {/* 1. HERO – naslov centriran */}
      <section className={`${styles.hero} hero`}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Šetaona</h1>
          <p className={styles.heroSub}>
            Tvoj pas zaslužuje nekoga tko ga stvarno voli.
          </p>
        </div>
        <div className={styles.scrollHint}>
          <span>Prošećimo</span>
          <div className={styles.scrollArrow} />
        </div>
      </section>  

      {/* 2. CTA – buttoni centrirani */}
      <section data-nav-light className={styles.ctaSection}>
        <div ref={ctaBtnsRef} className={styles.ctaButtons}>
          
          <div className={styles.ctaItem}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaCardImg}>
                <img src="/vlasnik.png" alt="Vlasnik" />
              </div>
              <button className={styles.ctaBtn} onClick={() => navigate('/register/owner')}>
                Vlasnik
              </button>
              <p className={`${styles.ctaDesc} ${styles.ctaDescAnimated}`}>
                Pronađi provjerenog šetača za svog psa. Prati ga uživo, čitaj recenzije i rezerviraj za nekoliko sekundi.
              </p>
            </div>
          </div>

          <div className={styles.ctaItem}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaCardImg}>
                <img src="/setac.png" alt="Šetač" />
              </div>
              <button className={styles.ctaBtn} onClick={() => navigate('/register/walker')}>
                Šetač
              </button>
              <p className={`${styles.ctaDesc} ${styles.ctaDescAnimated}`}>
                Zaradi radeći ono što voliš. Postavi dostupnost, prihvaćaj termine i gradi svoju bazu klijenata.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BALLS  */}
      <BallsSection />

      {/* 4. MAPA */}
      <section ref={mapSectionRef} className={styles.mapSection}>
        <div className={styles.mapBox}>
          <MapContainer
            center={[45.815, 15.982]}
            zoom={13}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            <Marker position={[45.815, 15.982]} icon={makeIcon()}>
              <Popup>Ana Kovač – Maksimir ⭐ 4.9</Popup>
            </Marker>
            <Marker position={[45.804, 15.971]} icon={makeIcon()}>
              <Popup>Marko Perić – Trnje ⭐ 4.7</Popup>
            </Marker>
            <Marker position={[45.822, 15.962]} icon={makeIcon()}>
              <Popup>Petra Horvat – Črnomerec ⭐ 4.8</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className={styles.mapInfo}>
          <h2 className={styles.mapTitle}>Pronađi šetača<br />u svojoj blizini</h2>
          <ul className={styles.mapList}>
            <li>
              <img src="/icons/location.png" alt="" className={styles.mapListIcon} />
              Vidi šetače na mapi u realnom vremenu
            </li>
            <li>
              <img src="/icons/filter.png" alt="" className={styles.mapListIcon} />
              Filtriraj po udaljenosti – 1, 3 ili 5 km
            </li>
            <li>
              <img src="/icons/check.png" alt="" className={styles.mapListIcon} />
              Vidi tko je online i odmah dostupan
            </li>
            <li>
              <img src="/icons/review.png" alt="" className={styles.mapListIcon} />
              Sortiraj po ocjenama i recenzijama
            </li>
            <li>
              <img src="/icons/paw.png" alt="" className={styles.mapListIcon} />
              Pronađi šetača koji odgovara tvom psu
            </li>
          </ul>
          <button className={styles.mapBtn} onClick={() => navigate('/walkers')}>
            Pretraži šetače →
          </button>
        </div>
      </section>

      {/* 5. KARTICE ŠETAČA */}
        <WalkersCarousel />   

      {/* 6. WORKFLOW */}
      <section data-nav-light ref={workflowRef} className={styles.workflowSection}>
        <p className={styles.workflowSub}>Kako funkcionira Šetaona?</p>
        <h2 className={styles.workflowTitle}>Tri koraka do savršene šetnje</h2>

        <div className={styles.workflowCards}>

          <div className={styles.workflowCard} onClick={() => navigate('/walkers')}>
            <div className={styles.workflowCardNum}>01</div>
            <Search size={52} strokeWidth={1} className={styles.workflowCardIcon} />
            <h3 className={styles.workflowCardTitle}>Pronađi</h3>
            <p className={styles.workflowCardText}>
              Pretraži šetače u blizini, čitaj recenzije i odaberi onoga koji odgovara tvom psu.
            </p>
          </div>

          <div className={styles.workflowCard} onClick={() => navigate('/book')}>
            <div className={styles.workflowCardNum}>02</div>
            <CalendarDays size={52} strokeWidth={1} className={styles.workflowCardIcon} />
            <h3 className={styles.workflowCardTitle}>Rezerviraj</h3>
            <p className={styles.workflowCardText}>
              Odaberi datum i vrijeme, vidi slobodne šetače i potvrdi rezervaciju u par klikova.
            </p>
          </div>

          <div className={styles.workflowCard} onClick={() => navigate('/dashboard/owner')}>
            <div className={styles.workflowCardNum}>03</div>
            <MapPin size={52} strokeWidth={1} className={styles.workflowCardIcon} />
            <h3 className={styles.workflowCardTitle}>Prati</h3>
            <p className={styles.workflowCardText}>
              Prati svog psa uživo na mapi. Po završetku dobij rutu i trajanje šetnje.
            </p>
          </div>

        </div>
      </section>

      {/* 7. KOST – button rotiran zajedno s kosti */}
      <section className={styles.boneSection}>
        <div ref={boneImgRef} className={styles.boneWrapper}>
          <img src="/kost-bez-background.png" alt="kost" className={styles.boneImg} />
          <div className={styles.boneOverlay}>
            <p className={styles.boneEngraved}>Daj svom psu najbolje.</p>
            <button className={styles.boneBtn} onClick={() => navigate('/register')}>
              Pridruži se →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}