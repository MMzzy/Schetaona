import { useRef, useState, useEffect } from 'react';
import styles from './BallsSection.module.css';

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3)
}

function BallsSection() {
  const outerRef = useRef(null)
  const [scrollVal, setScrollVal] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // kreće kad je element na 50% viewporta
      const raw = (-rect.top + window.innerHeight * 0.5) / (rect.height - window.innerHeight * 0.5)
      setScrollVal(Math.min(1, Math.max(0, raw)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const getP = (start, end) => {
    const raw = (scrollVal - start) / (end - start)
    return Math.min(1, Math.max(0, raw))
  }

  const titleP = easeOut(getP(0.00, 0.15))
  const ball1 = easeOut(getP(0.15, 0.45))
  const ball2 = easeOut(getP(0.40, 0.65))
  const ball3 = easeOut(getP(0.60, 0.85))

  return (
    <div ref={outerRef} data-nav-light className={styles.ballsOuter}>
      <div className={styles.ballsSticky}>
        <h2 className={styles.ballsSectionTitle} style={{
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 30}px)`
        }}>
          Zašto Šetaona?
        </h2>

        <div className={styles.ballsGrid}>
          <div className={styles.ballItem} style={{
            top: '0%', left: '2%',
            opacity: 1,
            transform: `translateX(${(1 - ball1) * -110}vw) translateY(${Math.sin((1 - ball1) * Math.PI) * -300}px)`
          }}>
            <img src="/loptica-bez-background.png" alt="loptica" className={styles.ballImg} />
            <div className={styles.ballTextOverlay}>
              <h3 className={styles.ballOverlayTitle}>Tko?</h3>
              <p className={styles.ballOverlayText}>Provjereni šetači s recenzijama pravih korisnika.</p>
            </div>
          </div>

          <div className={styles.ballItem} style={{
            top: '15%', right: '9%',
            opacity: 1,
            transform: `translateX(${(1 - ball2) * 110}vw) translateY(${Math.sin((1 - ball2) * Math.PI) * -300}px)`
          }}>
            <img src="/loptica-bez-background.png" alt="loptica" className={styles.ballImg} />
            <div className={styles.ballTextOverlay}>
              <h3 className={styles.ballOverlayTitle}>Što?</h3>
              <p className={styles.ballOverlayText}>Šetnje, GPS praćenje i izvještaj po završetku.</p>
            </div>
          </div>

          <div className={styles.ballItem} style={{
            top: '50%', left: '27%',
            opacity: 1,
            transform: `translateX(${(1 - ball3) * -110}vw) translateY(${Math.sin((1 - ball3) * Math.PI) * -300}px)`
          }}>
            <img src="/loptica-bez-background.png" alt="loptica" className={styles.ballImg} />
            <div className={styles.ballTextOverlay}>
              <h3 className={styles.ballOverlayTitle}>Zašto?</h3>
              <p className={styles.ballOverlayText}>Jer tvoj pas zaslužuje pažnju čak i kad ti ne možeš.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BallsSection