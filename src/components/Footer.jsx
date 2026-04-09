import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { Instagram, Facebook } from 'lucide-react'
import { SiTiktok } from 'react-icons/si'

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.left}>
        <nav className={styles.bigLinks}>
          <Link to="/walkers">Šetači</Link>
          <Link to="/register">Registracija</Link>
          <Link to="/login">Prijava</Link>
          <Link to="/contact">Kontakt</Link>
        </nav>
      </div>

      <div className={styles.middle}>
        <Link to="/walkers">Pronađi šetača</Link>
        <Link to="/register/walker">Postani šetač</Link>
        <Link to="/register/owner">Registriraj psa</Link>
        <Link to="/book">Rezerviraj termin</Link>
        <Link to="/dashboard/owner">Gdje je moj pas?</Link>
      </div>

      <div className={styles.right}>
        <p className={styles.newsletterText}>
          Budi prvi koji sazna o novim šetačima, akcijama i savjetima za tvog ljubimca.
        </p>
        <div className={styles.newsletterForm}>
          <input type="email" placeholder="Email adresa" className={styles.input} />
          <button className={styles.subscribeBtn}>Prijavi se</button>
        </div>
        <div className={styles.social}>
          <span>Prati nas:</span>
          <a href="https://www.instagram.com/setaona?igsh=MWNieXU2azk0dmEwZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="https://www.facebook.com/share/18UTWutK1d/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
          <a href="#" aria-label="TikTok"><SiTiktok size={20} /></a>
        </div>
      </div>

      <p className={styles.copy}>© 2026 Schetaona</p>

    </footer>
  )
}