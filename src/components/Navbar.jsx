// Navbar.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PawPrint, X } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar({ loggedIn = false, role = null, alwaysVisible = false }) {
  const [visible, setVisible] = useState(true)
  const [dark, setDark] = useState(true)
  const [lastY, setLastY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)

  useEffect(() => {
    document.body.style.setProperty(
      '--navbar-offset',
      visible ? '52px' : '0px'
    )
  }, [visible])

  useEffect(() => {
    if (alwaysVisible) return
    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastY && currentY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastY(currentY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY, alwaysVisible])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  const handlePawClick = (e) => {
    e.preventDefault()
    setMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setMenuClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setMenuClosing(false)
    }, 200)
  }

  return (
    <>
      <nav className={`${styles.navbar} ${dark ? styles.navDark : styles.navLight} ${visible ? styles.navVisible : styles.navHidden}`}>
        <Link to="/" className={styles.logo} onClick={handlePawClick}>
          <PawPrint size={34} color="currentColor" />
        </Link>

        <div className={styles.links}>
          {(!loggedIn || role === 'owner') && (
            <Link to="/walkers" className={styles.walkersBtn}>Šetači</Link>
          )}
          <div className={styles.divider} />
          {loggedIn ? (
            <Link to="/login" className={styles.textLink}>Odjava</Link>
          ) : (
            <>
              <Link to="/login" className={styles.textLink}>Prijava</Link>
              <Link to="/register" className={styles.textLink}>Registracija</Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className={`${styles.menuOverlay} ${menuClosing ? styles.closing : ''}`}>
          {/* Top row mirrors navbar so X sits exactly where the paw is */}
          <div className={styles.menuTopRow}>
            <button className={styles.closeBtn} onClick={closeMenu} aria-label="Zatvori meni">
              <X size={18} color="#1C3320" />
            </button>
          </div>

          <div className={styles.menuContent}>
            <div className={styles.menuMain}>
              <Link to="/" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>HOME</Link>
              {loggedIn ? (
                <>
                  <Link to="/contact" onClick={closeMenu}>KONTAKT</Link>
                  <Link to={role === 'walker' ? '/dashboard/walker' : '/dashboard/owner'} onClick={closeMenu}>PROFIL</Link>
                  <Link to="/login" onClick={closeMenu}>ODJAVA</Link>
                </>
              ) : (
                <>
                  <Link to="/walkers" onClick={closeMenu}>ŠETAČI</Link>
                  <Link to="/contact" onClick={closeMenu}>KONTAKT</Link>
                  <Link to="/login" onClick={closeMenu}>PRIJAVA</Link>
                  <Link to="/register" onClick={closeMenu}>REGISTRACIJA</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
