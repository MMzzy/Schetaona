import { useRef, useState, useEffect } from "react";
import styles from "./BallsSection.module.css";

function CurvedBallText({ title, lines }) {
  function renderWrapped(text, cy, fontSize, r) {
    const chars = [...text];
    const charW = fontSize * 0.58;
    return chars.map((char, i) => {
      const offset = (i - (chars.length - 1) / 2) * charW;
      const theta = offset / r;
      const x = (100 + r * Math.sin(theta)).toFixed(2);
      const sx = Math.cos(theta).toFixed(3);
      const op = Math.max(0.45, Math.cos(theta)).toFixed(3);
      return (
        <text
          key={i}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          opacity={op}
          transform={`translate(${x},${cy})
  scale(${sx},1)`}
        >
          {char}
        </text>
      );
    });
  }
  return (
    <svg
      className={styles.ballSvg}
      viewBox="0 0
  200 200"
      aria-hidden="true"
    >
      <g fontFamily="var(--font-display)" fontWeight="700" fill="#E3DAC9">
        {renderWrapped(title, 80, 30, 75)}
      </g>
      {lines.map((line, i) => (
        <g
          key={i}
          fontFamily="var(--font-body)"
          fontWeight="700"
          fill="#E3DAC9"
        >
          {renderWrapped(line, 102 + i * 17, 17, 95)}
        </g>
      ))}
    </svg>
  );
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

const ballsData = [
  {
    title: "Tko?",
    lines: ["Provjereni šetači", "s recenzijama", "pravih korisnika."],
  },
  {
    title: "Što?",
    lines: ["Šetnje, GPS praćenje", "i izvještaj", "po završetku."],
  },
  {
    title: "Zašto?",
    lines: ["Jer tvoj pas zaslužuje", "pažnju čak", "i kad ti ne možeš."],
  },
];

const deskDirs = [-110, 110, -110];

export default function BallsSection() {
  const outerRef = useRef(null);
  const [scrollVal, setScrollVal] = useState(0);
  const isMobile = window.innerWidth <= 480;

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const raw =
        (-rect.top + window.innerHeight * 0.5) /
        (rect.height - window.innerHeight * 0.5);
      setScrollVal(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getP = (start, end) =>
    Math.min(1, Math.max(0, (scrollVal - start) / (end - start)));

  const titleP = easeOut(getP(0.0, 0.08));
  const deskBalls = [
    easeOut(getP(0.15, 0.45)),
    easeOut(getP(0.4, 0.65)),
    easeOut(getP(0.6, 0.85)),
  ];

  return (
    <div ref={outerRef} data-nav-light className={styles.ballsOuter}>
      <div className={styles.ballsSticky}>
        <h2
          className={styles.ballsSectionTitle}
          style={
            isMobile
              ? {}
              : { "--opacity": titleP, "--ty": `${(1 - titleP) * 30}px` }
          }
        >
          Zašto Šetaona?
        </h2>

        {isMobile ? (
          ballsData.map((ball, i) => (
            <div key={i} className={styles.ballItemMobile}>
              <img
                src="/loptica-bez-background.png"
                alt="loptica"
                className={styles.ballImg}
              />
              <CurvedBallText title={ball.title} lines={ball.lines} />
            </div>
          ))
        ) : (
          <div className={styles.ballsGrid}>
            {ballsData.map((ball, i) => (
              <div
                key={i}
                className={`${styles.ballItem}
  ${styles[`ballItem${i + 1}`]}`}
                style={{
                  "--tx": `${(1 - deskBalls[i]) * deskDirs[i]}vw`,
                  "--ty": `${Math.sin((1 - deskBalls[i]) * Math.PI) * -300}px`,
                }}
              >
                <img
                  src="/loptica-bez-background.png"
                  alt="loptica"
                  className={styles.ballImg}
                />
                <CurvedBallText title={ball.title} lines={ball.lines} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
