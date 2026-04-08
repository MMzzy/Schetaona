import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WalkersCarousel.module.css";

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

const walkers = [
  {
    name: "Ana Kovač",
    area: "Maksimir",
    rating: "4.9",
    reviews: 32,
    rotate: "-5deg",
    img: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400&h=500&fit=crop",
  },
  {
    name: "Marko Perić",
    area: "Trnje",
    rating: "4.7",
    reviews: 18,
    rotate: "3deg",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop",
  },
  {
    name: "Petra Horvat",
    area: "Črnomerec",
    rating: "4.8",
    reviews: 45,
    rotate: "-2deg",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=500&fit=crop",
  },
  {
    name: "Ivan Blažić",
    area: "Sesvete",
    rating: "4.5",
    reviews: 12,
    rotate: "4deg",
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=500&fit=crop",
  },
  {
    name: "Maja Lučić",
    area: "Novi Zagreb",
    rating: "4.6",
    reviews: 27,
    rotate: "-3deg",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=500&fit=crop",
  },
];

export default function WalkersCarousel() {
  const outerRef = useRef(null);
  const [scrollVal, setScrollVal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const el = outerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const raw = -rect.top / (rect.height - window.innerHeight);
        setScrollVal(Math.min(1, Math.max(0, raw)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const getP = (start, end) => {
    const raw = (scrollVal - start) / (end - start);
    return Math.min(1, Math.max(0, raw));
  };

  // Naslov: pojavi se na početku, nestane kad kartice počnu, vrati se na kraju
  const isMobile = window.innerWidth < 768;

  const titleIn = easeOut(getP(0.0, 0.0));
  const titleOut = isMobile
    ? easeOut(getP(0.08, 0.4))
    : easeOut(getP(0.08, 0.25));
  const titleBack = isMobile
    ? easeOut(getP(0.75, 0.95))
    : easeOut(getP(0.52, 0.7))
  const titleOpacity = Math.min(1, titleIn * (1 - titleOut) + titleBack);
  const titleY = (1 - Math.max(titleIn, titleBack)) * 50;

  return (
    <div ref={outerRef} data-nav-light className={styles.outer}>
      <div className={styles.sticky}>
        <h2
          className={styles.title}
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Pronađi idealnog šetača
        </h2>

        {walkers.map((walker, i) => {
          const isMobile = window.innerWidth < 768;
          const spacing = isMobile ? 0.15 : 0.08;
          const start = 0.08 + i * spacing;
          const end = start + 0.58;
          const p = getP(start, end);
          const x = isMobile ? 120 - 200 * easeOut(p) : 110 - 150 * easeOut(p);

          return (
            <div
              key={i}
              className={styles.card}
              style={{
                left: `${x}vw`,
                rotate: walker.rotate,
              }}
              onClick={() => navigate("/walkers")}
            >
              <div className={styles.cardImg}>
                <img src={walker.img} alt={walker.name} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{walker.name}</h3>
                <p className={styles.cardArea}>📍 {walker.area}</p>
                <p className={styles.cardRating}>
                  ⭐ {walker.rating} · {walker.reviews} recenzija
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
