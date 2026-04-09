import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>

        {/* Big heading */}
        <div className={styles.headingRow}>
          <h1 className={styles.bigTitle}>Kontaktiraj nas</h1>
        </div>

        {/* Two-column content */}
        <div className={styles.contentRow}>

          {/* Left – contact info */}
          <div className={styles.leftCol}>
            <div className={styles.infoBlock}>
              <p className={styles.infoLine}>Zagreb, Hrvatska</p>
              <p className={styles.infoLine}>2024</p>
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Radno vrijeme</p>
              <p className={styles.infoLine}>Ponedjeljak – Petak</p>
              <p className={styles.infoLine}>09:00 – 17:00</p>
            </div>
          </div>

          {/* Right – form */}
          <div className={styles.rightCol}>
            <form className={styles.form}>

              <div className={styles.nameRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Ime (obavezno)</label>
                  <input
                    type="text"
                    placeholder="Ime"
                    className={styles.input}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Prezime</label>
                  <input
                    type="text"
                    placeholder="Prezime"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Usluga</label>
                <div className={styles.selectWrapper}>
                  <select className={styles.select}>
                    <option value="">Odaberi uslugu</option>
                    <option value="setnja">Šetanje psa</option>
                    <option value="cuvanje">Čuvanje psa</option>
                    <option value="suradnja">Suradnja</option>
                    <option value="ostalo">Ostalo</option>
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>E-mail (obavezno)</label>
                <input
                  type="email"
                  placeholder="tvoj@email.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="newsletter" className={styles.checkbox} />
                <label htmlFor="newsletter" className={styles.checkboxLabel}>
                  Prijavi me na novosti i obavijesti
                </label>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Opis upita</label>
                <textarea
                  placeholder="Opiši što te zanima..."
                  className={styles.textarea}
                  rows={5}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>Pošalji</button>

            </form>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <a href="mailto:kontakt@setaona.hr" className={styles.emailLink}>
              kontakt@setaona.hr
            </a>
          </div>
          <div className={styles.bottomMid}>
            <p className={styles.bottomMidText}>Zagreb, Hrvatska · 2024</p>
            <p className={styles.bottomMidText}>Radno vrijeme</p>
            <p className={styles.bottomMidText}>Pon – Pet · 09:00 – 17:00</p>
          </div>
          <div className={styles.bottomRight}>
            <span className={styles.phoneLink}>+385 91 234 5678</span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
