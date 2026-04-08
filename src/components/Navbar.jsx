// Navbar.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PawPrint } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [dark, setDark] = useState(true)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    document.body.style.setProperty(
      '--navbar-offset', 
      visible ? '50px' : '0px'  // 52px = visina tvog navbara
    )
  }, [visible])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      // Sakrij kad scrollaš dolje, prikaži kad scrollaš gore
      if (currentY > lastY && currentY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastY(currentY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <nav className={`${styles.navbar} ${dark ? styles.navDark : styles.navLight} ${visible ? styles.navVisible : styles.navHidden}`}>
      <Link to="/" className={styles.logo}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <PawPrint size={30} color="currentColor" />
      </Link>

      <div className={styles.links}>
        <Link to="/walkers" className={styles.walkersBtn}>Šetači</Link>
        <div className={styles.divider} />
        <Link to="/login" className={styles.textLink}>Prijava</Link>
        <Link to="/register" className={styles.textLink}>Registracija</Link>
      </div>
    </nav>
  )
}