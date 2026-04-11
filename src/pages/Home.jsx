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

  // ── Snap-section refs (no wrapper divs — pinned sections detected by position) ──
  const heroRef        = useRef(null)
  const ctaSectionRef  = useRef(null)
  const mapSectionRef  = useRef(null)
  const workflowRef    = useRef(null)
  const boneSectionRef = useRef(null)

  // Inner-element refs for reveal animations
  const ctaBtnsRef    = useRef(null)
  const ctaTextRef    = useRef(null)
  const ballsTitleRef = useRef(null)
  const ball1Ref      = useRef(null)
  const ball2Ref      = useRef(null)
  const ball3Ref      = useRef(null)
  const boneImgRef    = useRef(null)

  useReveal(ctaBtnsRef,    0.2)
  useReveal(ctaTextRef,    0.3)
  useReveal(ballsTitleRef, 0.2)
  useReveal(ball1Ref,      0.2)
  useReveal(ball2Ref,      0.2)
  useReveal(ball3Ref,      0.2)
  useReveal(mapSectionRef, 0.1)
  useReveal(workflowRef,   0.1)
  useReveal(boneImgRef,    0.2)

  // ── Section scroll-snapping ────────────────────────────────────────────────────
  useEffect(() => {
    // Desktop-only threshold
    const DESKTOP_WIDTH = 1024

    // Natural document offset — walks offsetParent chain so CSS transforms
    // (e.g. the reveal translateY on mapSection / workflowSection) do NOT skew
    // the snap target. getBoundingClientRect includes transforms; offsetTop does not.
    const absTop = (el) => {
      let top = 0
      let e = el
      while (e && e !== document.body) {
        top += e.offsetTop
        e = e.offsetParent
      }
      return top
    }

    // Snap points align with the natural (un-transformed) section tops.
    // The Balls carousel exits exactly at mapTop and Walkers exits at wfTop,
    // so snapping to those values means d=0 on carousel exit — no backward
    // re-snap, no navbar activation.
    const getPoints = () => {
      const h   = heroRef.current
      const cta = ctaSectionRef.current
      const map = mapSectionRef.current
      const wf  = workflowRef.current
      const bon = boneSectionRef.current
      if (!h || !cta || !map || !wf || !bon) return []

      const ctaTop = absTop(cta)
      const mapTop = absTop(map)
      const wfTop  = absTop(wf)

      return [
        { y: absTop(h),                  pinned: false }, // 0 Hero
        { y: ctaTop,                     pinned: false }, // 1 CTA
        { y: ctaTop + cta.offsetHeight,  pinned: true  }, // 2 Balls entry
        { y: mapTop,                     pinned: false }, // 3 Map
        { y: mapTop + map.offsetHeight,  pinned: true  }, // 4 Walkers entry
        { y: wfTop,                      pinned: false }, // 5 Workflow
        { y: absTop(bon),                pinned: false }, // 6 Bone
      ]
    }

    // Which snap point are we currently at / past?
    const curIdx = (pts) => {
      let i = 0
      pts.forEach((p, idx) => { if (p.y <= window.scrollY + 10) i = idx })
      return i
    }

    let busy  = false
    let rafId = null
    let timers = { busy: null, snap: null }
    let lastScrollDir = 0
    let lastScrollY   = window.scrollY

    // Custom smooth scroll — consistent 750 ms regardless of distance
    const snapTo = (targetY) => {
      const startY = window.scrollY
      const dist   = targetY - startY
      if (Math.abs(dist) < 4) return

      busy = true
      clearTimeout(timers.busy)
      if (rafId) cancelAnimationFrame(rafId)

      const DURATION = 750
      const t0       = performance.now()
      const ease     = (t) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t // easeInOutQuad

      const tick = (now) => {
        const t = Math.min((now - t0) / DURATION, 1)
        window.scrollTo(0, startY + dist * ease(t))
        if (t < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          busy = false
          rafId = null
        }
      }
      rafId = requestAnimationFrame(tick)
      timers.busy = setTimeout(() => { busy = false }, DURATION + 200)
    }

    // Combined scroll listener:
    //  1. Tracks scroll direction (only while not in our own snapTo animation).
    //  2. After scroll settles on desktop + downward direction, snaps to nearest
    //     non-pinned section (carries user out of Balls/Walkers carousels).
    const onScroll = () => {
      if (!busy) {
        const y = window.scrollY
        lastScrollDir = y > lastScrollY ? 1 : y < lastScrollY ? -1 : lastScrollDir
        lastScrollY = y
      }

      // Snap-settle only on desktop and only after scrolling down
      if (window.innerWidth < DESKTOP_WIDTH) return
      clearTimeout(timers.snap)
      timers.snap = setTimeout(() => {
        if (busy) return
        if (lastScrollDir !== 1) return           // upward scroll → fully manual
        const pts = getPoints()
        if (!pts.length) return
        if (pts[curIdx(pts)].pinned) return       // inside carousel — don't interfere

        // Past the last snap point (bone section) → let user scroll freely to footer
        if (window.scrollY > pts[pts.length - 1].y + 50) return

        let best = { y: null, d: Infinity }
        pts.forEach((p) => {
          if (p.pinned) return
          const d = Math.abs(p.y - window.scrollY)
          if (d < best.d) best = { y: p.y, d }
        })
        if (best.d > 8) snapTo(best.y)
      }, 150)
    }

    // Wheel handler — desktop only; intercepts downward scroll on non-pinned sections.
    // Upward scroll is returned untouched so the user can scroll back freely.
    const onWheel = (e) => {
      if (window.innerWidth < DESKTOP_WIDTH) return

      const pts = getPoints()
      if (!pts.length) return
      const idx = curIdx(pts)

      if (pts[idx].pinned) return                           // let Balls/Walkers scroll freely
      if (e.target.closest?.('.leaflet-container')) return  // let map zoom

      const dir = e.deltaY > 0 ? 1 : -1

      // Upward scroll is completely manual — no snapping
      if (dir === -1) return

      // At or past the last snap point — let the user scroll naturally to the footer
      if (idx >= pts.length - 1) return

      // Intercept downward scroll and snap to next section
      e.preventDefault()
      if (busy) return

      snapTo(pts[idx + 1].y)
    }

    window.addEventListener('wheel',  onWheel,  { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true  })

    return () => {
      window.removeEventListener('wheel',  onWheel)
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(timers.busy)
      clearTimeout(timers.snap)
    }
  }, [])


  return (
    <div className={styles.page}>
      <Navbar />

      {/* 1. HERO */}
      <section ref={heroRef} className={`${styles.hero} hero`}>
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

      {/* 2. CTA */}
      <section ref={ctaSectionRef} data-nav-light className={styles.ctaSection}>
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

      {/* 3. BALLS — pinned scroll-driven (no wrapper div) */}
      <BallsSection />

      {/* 4. MAPA */}
      <section ref={mapSectionRef} className={styles.mapSection}>
        <div className={styles.mapInner}>
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
        </div>
      </section>

      {/* 5. WALKERS CAROUSEL — pinned scroll-driven (no wrapper div) */}
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

      {/* 7. KOST */}
      <section ref={boneSectionRef} className={styles.boneSection}>
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
