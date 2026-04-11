import Navbar from '../components/Navbar'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.wrapper}>

        {/* Left — social info */}
        <div className={styles.infoPanel}>
          <div>
            <div className={styles.infoHeader}>
              <h2>Pronađi nas</h2>
              <p>Uvijek smo tu za tebe</p>
            </div>

            <div className={styles.infoLinks}>
              <div className={styles.infoItem}>
                <span className={styles.infoItemLabel}>Email</span>
                <a href="mailto:kontakt@schetaona.hr" className={styles.infoItemLink}>
                  kontakt@schetaona.hr
                </a>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoItemLabel}>Instagram</span>
                <a href="https://instagram.com/schetaona" target="_blank" rel="noreferrer" className={styles.infoItemLink}>
                  @schetaona
                </a>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoItemLabel}>Facebook</span>
                <a href="https://facebook.com/schetaona" target="_blank" rel="noreferrer" className={styles.infoItemLink}>
                  Schetaona
                </a>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoItemLabel}>Telefon</span>
                <a href="tel:+385912345678" className={styles.infoItemLink}>
                  +385 91 234 5678
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.infoDivider} />
            <p className={styles.infoTagline}>Povežite se sa najboljim šetačima pasa u vašem susjedstvu</p>
          </div>
        </div>

        {/* Right — contact form */}
        <div className={styles.formPanel}>
          <div className={styles.formHeader}>
            <h1>Kontaktiraj nas</h1>
            <p>Pošalji nam poruku i javit ćemo se uskoro</p>
          </div>

          <form className={styles.form}>
            <div className={styles.nameRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Ime *</label>
                <input type="text" placeholder="Ime" className={styles.input} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Prezime</label>
                <input type="text" placeholder="Prezime" className={styles.input} />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>E-mail *</label>
              <input type="email" placeholder="tvoj@email.com" className={styles.input} />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Usluga</label>
              <select className={styles.select}>
                <option value="">Odaberi uslugu</option>
                <option value="setnja">Šetanje psa</option>
                <option value="cuvanje">Čuvanje psa</option>
                <option value="suradnja">Suradnja</option>
                <option value="ostalo">Ostalo</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Poruka</label>
              <textarea
                placeholder="Opiši što te zanima..."
                className={styles.textarea}
                rows={4}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>Pošalji</button>
          </form>
        </div>

      </div>
    </div>
  )
}
