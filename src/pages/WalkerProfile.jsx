import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Star, MapPin, Award, Calendar, Heart, Shield } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './WalkerProfile.module.css'

const walkersData = [
  {
    id: 1,
    name: 'Ana Kovač',
    location: 'Maksimir, Zagreb',
    rating: 4.9,
    reviews: 32,
    walks: 210,
    dogs: 87,
    years: 5,
    response: '100%',
    online: true,
    img: 'https://i.pravatar.cc/300?img=47',
    about: `Bok! Ja sam Ana, certificirana profesionalna šetačica pasa s više od 5 godina iskustva u brizi za pse svih veličina i pasmina. Moja ljubav prema životinjama počela je rano i posvetila sam svoju karijeru pružanju najboljeg mogućeg iskustva za tvog ljubimca.

Razumijem da svaki pas ima jedinstvene potrebe i karakter. Bez obzira treba li tvoj ljubimac energičnu šetnju, lagane šetnje ili posebnu pažnju zbog dobi ili zdravstvenih stanja, prilagođavam svaku šetnju njegovim individualnim potrebama.

Certificirana sam za prvu pomoć za kućne ljubimce, osigurana i vezana. Tvoj mir je moj prioritet i šaljem foto-ažuriranja durante svake šetnje!`,
  },
  {
    id: 2,
    name: 'Marko Perić',
    location: 'Trnje, Zagreb',
    rating: 4.7,
    reviews: 18,
    walks: 64,
    dogs: 30,
    years: 3,
    response: '95%',
    online: true,
    img: 'https://i.pravatar.cc/300?img=11',
    about: `Bok! Ja sam Marko, šetač pasa s 3 godine iskustva. Specijaliziram se za energične pasmine i velike pse. Svaka šetnja je avantura!

Volim raditi s psima koji trebaju puno kretanja i stimulacije. Imam posebno iskustvo s ovčarskim pasminama i retrieversima.`,
  },
  {
    id: 3,
    name: 'Petra Horvat',
    location: 'Črnomerec, Zagreb',
    rating: 4.8,
    reviews: 45,
    walks: 320,
    dogs: 120,
    years: 7,
    response: '98%',
    online: false,
    img: 'https://i.pravatar.cc/300?img=45',
    about: `Bok! Ja sam Petra, iskusna šetačica s 7 godina rada s psima. Posebno se brinem za starije pse i pse s posebnim potrebama.

Moj pristup je nježan i pažljiv. Svaki pas dobiva individualnu pažnju i brigu kakvu zaslužuje.`,
  },
  {
    id: 4,
    name: 'Ivan Blažić',
    location: 'Sesvete, Zagreb',
    rating: 4.5,
    reviews: 12,
    walks: 38,
    dogs: 20,
    years: 2,
    response: '90%',
    online: false,
    img: 'https://i.pravatar.cc/300?img=12',
    about: `Bok! Ja sam Ivan, mladi entuzijast koji voli pse. Iako sam tek na početku karijere, svom poslu pristupam s punom predanošću i strašću.`,
  },
  {
    id: 5,
    name: 'Maja Lučić',
    location: 'Novi Zagreb',
    rating: 4.6,
    reviews: 27,
    walks: 95,
    dogs: 45,
    years: 4,
    response: '97%',
    online: true,
    img: 'https://i.pravatar.cc/300?img=44',
    about: `Bok! Ja sam Maja, šetačica s 4 godine iskustva. Specijaliziram se za male pasmine i štenad. Svaki pas je poseban i tretira ga s puno ljubavi.`,
  },
  {
    id: 6,
    name: 'Luka Novak',
    location: 'Gornji Grad, Zagreb',
    rating: 5.0,
    reviews: 8,
    walks: 22,
    dogs: 15,
    years: 1,
    response: '100%',
    online: false,
    img: 'https://i.pravatar.cc/300?img=15',
    about: `Bok! Ja sam Luka, novi šetač ali s velikim srcem za pse. Odrastao sam uz pse i znam kako se brinuti o njima s ljubavlju i odgovornošću.`,
  },
]

const certifications = [
  { text: 'Osiguran i vezan', icon: Shield },
  { text: 'Prva pomoć za pse', icon: Award },
  { text: 'Posebne potrebe', icon: Heart },
  { text: 'Fleksibilan raspored', icon: Calendar },
]

const services = [
  { name: '30-minutna šetnja', price: '15€', duration: '30 min' },
  { name: '60-minutna šetnja', price: '25€', duration: '60 min' },
  { name: 'Grupna šetnja', price: '20€/pas', duration: '45 min' },
  { name: 'Čuvanje ljubimca', price: '50€', duration: 'po danu' },
]

const reviewsData = [
  { id: 1, author: 'Tomislav B.', rating: 5.0, date: '15. ožujka 2026.', text: 'Odličan šetač! Pas je uvijek sretan. Toplo preporučujem!' },
  { id: 2, author: 'Marija K.', rating: 5.0, date: '10. ožujka 2026.', text: 'Koristimo već 6 mjeseci i ne možemo biti sretniji. Naš pas se uzbuđuje čim ga vidi!' },
  { id: 3, author: 'Petra H.', rating: 4.9, date: '28. veljače 2026.', text: 'Pouzdana, brižna i izvrsna komunikacija. Tretira naše pse kao svoje.' },
  { id: 4, author: 'Ivan B.', rating: 4.9, date: '20. veljače 2026.', text: 'Jako iskusan s energičnim psima. Zna točno kako se nositi s našim Australian Shepherdom.' },
]

const CTA_WORDS = ['sutra?', 'u utorak?', 'sljedeći tjedan?', 'danas?']

export default function WalkerProfile() {
  const navigate = useNavigate()
  const { id } = useParams()

  const walker = walkersData.find(w => w.id === parseInt(id)) || walkersData[0]

  const [ctaIndex, setCtaIndex] = useState(0)
  const [ctaAnim, setCtaAnim] = useState('enter')

  useEffect(() => {
    const interval = setInterval(() => {
      setCtaAnim('exit')
      setTimeout(() => {
        setCtaIndex(i => (i + 1) % CTA_WORDS.length)
        setCtaAnim('enter')
      }, 350)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.page}>
      <Navbar/>

      <div className={styles.outer}>

        {/* HERO KARTICA */}
        <div className={styles.heroCard}>
          <div className={styles.heroInner}>

            <div className={styles.heroImgWrap}>
              <img src={walker.img} alt={walker.name} className={styles.heroImg} />
              {walker.online && (
                <span className={styles.onlineBadge}>
                  <span className={styles.onlineDot} />
                  Online sada
                </span>
              )}
            </div>

            <div className={styles.heroInfo}>
              <h1 className={styles.heroName}>{walker.name}</h1>

              <div className={styles.heroLocation}>
                <MapPin size={16} />
                <span>{walker.location}</span>
              </div>

              <div className={styles.heroRating}>
                <Star size={18} fill="#A2FF00" color="#A2FF00" />
                <span className={styles.ratingNum}>{walker.rating}</span>
                <span className={styles.ratingDot}>·</span>
                <span className={styles.ratingReviews}>{walker.reviews} recenzija</span>
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{walker.years}+</span>
                  <span className={styles.statLabel}>godina</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{walker.dogs}+</span>
                  <span className={styles.statLabel}>pasa</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{walker.walks}+</span>
                  <span className={styles.statLabel}>šetnji</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{walker.response}</span>
                  <span className={styles.statLabel}>odgovor</span>
                </div>
              </div>

              <button className={styles.bookBtn} onClick={() => navigate('/book')}>
                Rezerviraj sada
              </button>
            </div>

          </div>
        </div>

        {/* GRID */}
        <div className={styles.grid}>

          <div className={styles.leftCol}>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>O meni</h2>
              <div className={styles.aboutText}>
                {walker.about.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className={styles.certs}>
                {certifications.map((cert, i) => {
                  const Icon = cert.icon
                  return (
                    <div key={i} className={styles.certItem}>
                      <div className={styles.certIcon}>
                        <Icon size={20} color="#1C3320" />
                      </div>
                      <span>{cert.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Recenzije</h2>
              <div className={styles.reviewsList}>
                {reviewsData.map((review, i) => (
                  <div key={review.id} className={`${styles.review} ${i !== reviewsData.length - 1 ? styles.reviewBorder : ''}`}>
                    <div className={styles.reviewHeader}>
                      <div>
                        <h4 className={styles.reviewAuthor}>{review.author}</h4>
                        <div className={styles.reviewRating}>
                          <Star size={12} fill="#A2FF00" color="#A2FF00" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <span className={styles.reviewDate}>{review.date}</span>
                    </div>
                    <p className={styles.reviewText}>{review.text}</p>
                  </div>
                ))}
              </div>
              <button className={styles.allReviewsBtn}>Sve recenzije →</button>
            </div>

          </div>

          <div className={styles.rightCol}>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Usluge</h2>
              <div className={styles.services}>
                {services.map((service, i) => (
                  <div key={i} className={styles.service}>
                    <div className={styles.serviceRow}>
                      <span className={styles.serviceName}>{service.name}</span>
                      <span className={styles.servicePrice}>{service.price}</span>
                    </div>
                    <div className={styles.serviceDuration}>{service.duration}</div>
                    {i !== services.length - 1 && <div className={styles.serviceDivider} />}
                  </div>
                ))}
              </div>
              <p className={styles.servicesNote}>Sve šetnje uključuju vodu, vrećice i foto-ažuriranja.</p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Dostupnost</h2>
              <div className={styles.availability}>
                <div className={styles.availItem}>
                  <span className={styles.availDay}>Radni dani</span>
                  <span className={styles.availTime}>7:00 – 19:00</span>
                </div>
                <div className={styles.availItem}>
                  <span className={styles.availDay}>Vikend</span>
                  <span className={styles.availTime}>8:00 – 18:00</span>
                </div>
              </div>
              <div className={styles.availNote}>
                <strong>Prima nove klijente!</strong> Dostupno i isti dan.
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className={styles.bottomCta}>
          <h3 className={styles.bottomCtaTitle}>
            Šetnja ti treba{' '}
            <span className={styles.ctaAnimWrap}>
              <span
                key={ctaIndex}
                className={`${styles.ctaWord} ${ctaAnim === 'enter' ? styles.ctaWordEnter : styles.ctaWordExit}`}
              >
                {CTA_WORDS[ctaIndex]}
              </span>
            </span>
          </h3>
          <p className={styles.bottomCtaText}>Daj svom psu pažnju koju zaslužuje</p>
          <button className={styles.bottomCtaBtn} onClick={() => navigate('/book')}>
            Zakažite šetnju →
          </button>
        </div>

      </div>

      <Footer />
    </div>
  )
}