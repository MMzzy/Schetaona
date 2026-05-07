const REVIEWS = [
  {
    id: 1,
    name: 'Petra Novak',
    dog: 'Buddy',
    stars: 5,
    date: '4. travnja 2026',
    text: 'Marko je odličan šetač! Buddy se uvijek veseli njihovim šetnjama. Vrlo profesionalan i pouzdan.',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Ivan Horvat',
    dog: 'Max',
    stars: 5,
    date: '2. travnja 2026',
    text: 'Izvrsna komunikacija i briga o psu. Max je bio prezadovoljan!',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Ana Kovačić',
    dog: 'Luna',
    stars: 4,
    date: '30. ožujka 2026',
    text: 'Odličan šetač, šalje fotografije s šetnje što mi puno znači. Toplo preporučujem.',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 4,
    name: 'Tomislav Babić',
    dog: 'Rex',
    stars: 5,
    date: '22. ožujka 2026',
    text: 'Super iskustvo, Marko je siguran i brižan. Rex ga obožava. Definitivno ću rezervirati opet!',
    img: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
]

const totalReviews = REVIEWS.length
const avgRating = (REVIEWS.reduce((s, r) => s + r.stars, 0) / totalReviews).toFixed(1)
const fiveStars = REVIEWS.filter(r => r.stars === 5).length

function Stars({ count, size = 16, green = false }) {
  return (
    <span style={{ color: green ? 'var(--green)' : '#f5a623', fontSize: size, letterSpacing: 1 }}>
      {Array.from({ length: 5 }, (_, i) => i < count ? '★' : '☆').join('')}
    </span>
  )
}

export default function WalkerRecenzije() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      <div className="card-padded">
        <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', minWidth: 100 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 400, color: 'var(--brown)', lineHeight: 1 }}>
              {avgRating}
            </div>
            <Stars count={Math.round(parseFloat(avgRating))} size={20} />
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{totalReviews} recenzija</div>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            {[5, 4, 3, 2, 1].map(star => {
              const cnt = REVIEWS.filter(r => r.stars === star).length
              const pct = totalReviews ? (cnt / totalReviews) * 100 : 0
              return (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)', width: 14, textAlign: 'right' }}>{star}</span>
                  <span style={{ color: '#f5a623', fontSize: 13 }}>★</span>
                  <div style={{ flex: 1, height: 8, background: 'var(--warm)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'var(--lime)', borderRadius: 4, transition: 'width 0.4s ease' }} />
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--muted)', width: 14 }}>{cnt}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="stats-row stats-row-2">
        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <div className="stat-number">{totalReviews}</div>
          <div className="stat-label">Ukupno recenzija</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div className="stat-number">{fiveStars}</div>
          <div className="stat-label">5-zvjezdice</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {REVIEWS.map(r => (
          <div key={r.id} className="card-padded">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <img src={r.img} alt={r.name}
                style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--brown)' }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>Pas: {r.dog}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{r.date}</div>
                </div>
                <Stars count={r.stars} size={15} green />
                <div style={{
                  marginTop: 10, background: 'var(--warm)', borderRadius: 12,
                  padding: '12px 14px', fontSize: 13, lineHeight: 1.6,
                  color: 'var(--brown)', fontFamily: 'var(--font-body)',
                }}>
                  {r.text}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
