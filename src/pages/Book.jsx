import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Dog,
  ChevronRight,
  ChevronLeft,
  Check,
  Star,
  Repeat,
  Zap,
} from "lucide-react";
import styles from "./Book.module.css";
// import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";

// ── Mock data ──────────────────────────────────────────────────────────────────
const WALKERS = [
  {
    id: 1,
    name: "Ana Horvat",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 4.9,
    reviews: 127,
    price: 12,
    tags: ["Veliki psi", "Grupne šetnje"],
    available: true,
  },
  {
    id: 2,
    name: "Marko Šimić",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 4.7,
    reviews: 84,
    price: 10,
    tags: ["Mali psi", "Solo šetnje"],
    available: true,
  },
  {
    id: 3,
    name: "Petra Kovač",
    avatar: "https://i.pravatar.cc/80?img=23",
    rating: 5.0,
    reviews: 203,
    price: 15,
    tags: ["Sve veličine", "Trening"],
    available: false,
  },
];

const DOGS = [
  { id: 1, name: "Rocky", breed: "Labrador", size: "Veliki" },
  { id: 2, name: "Luna", breed: "Chihuahua", size: "Mali" },
];

const TIME_SLOTS = [
  "07:00", "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

const DURATIONS = [
  { label: "30 min", value: 30, price: 0.5 },
  { label: "60 min", value: 60, price: 1 },
  { label: "90 min", value: 90, price: 1.4 },
];

// Generate next 14 days
const getDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};
const DAYS = getDays();
const DAY_NAMES = ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"];
const MONTH_NAMES = [
  "Sij","Velj","Ožu","Tra","Svi","Lip","Srp","Kol","Ruj","Lis","Stu","Pro"
];

// ── Step indicator ─────────────────────────────────────────────────────────────
const STEPS = ["Šetač", "Termin", "Pas", "Potvrda"];

function StepBar({ current }) {
  return (
    <div className={styles.stepBar}>
      {STEPS.map((s, i) => (
        <div key={s} className={styles.stepItem}>
          <div
            className={`${styles.stepDot} ${
              i < current ? styles.stepDone : i === current ? styles.stepActive : ""
            }`}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          <span className={styles.stepLabel}>{s}</span>
          {i < STEPS.length - 1 && (
            <div className={`${styles.stepLine} ${i < current ? styles.stepLineDone : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Step 0: Choose walker ──────────────────────────────────────────────────────
function StepWalker({ selected, onSelect }) {
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Odaberi šetača</h2>
      <p className={styles.stepSub}>Svi šetači su verificirani i osigurani.</p>
      <div className={styles.walkerList}>
        {WALKERS.map((w) => (
          <button
            key={w.id}
            className={`${styles.walkerCard} ${selected?.id === w.id ? styles.walkerSelected : ""} ${!w.available ? styles.walkerUnavailable : ""}`}
            onClick={() => w.available && onSelect(w)}
            disabled={!w.available}
          >
            <div className={styles.walkerAvatar}>
              <img src={w.avatar} alt={w.name} />
              {w.available && <span className={styles.onlineDot} />}
            </div>
            <div className={styles.walkerInfo}>
              <div className={styles.walkerName}>{w.name}</div>
              <div className={styles.walkerMeta}>
                <Star size={13} className={styles.starIcon} />
                <span>{w.rating}</span>
                <span className={styles.muted}>({w.reviews} recenzija)</span>
              </div>
              <div className={styles.walkerTags}>
                {w.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
            <div className={styles.walkerPrice}>
              <span className={styles.priceAmount}>{w.price} €</span>
              <span className={styles.perHour}>/h</span>
              {!w.available && <span className={styles.unavailableBadge}>Nedostupan</span>}
            </div>
            {selected?.id === w.id && (
              <div className={styles.selectedCheck}><Check size={16} /></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 1: Choose date/time/duration ─────────────────────────────────────────
function StepDatetime({ date, time, duration, onDate, onTime, onDuration }) {
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Odaberi termin</h2>
      <p className={styles.stepSub}>Dostupni termini prikazani u realnom vremenu.</p>

      {/* Calendar strip */}
      <div className={styles.calLabel}><Calendar size={14} /> Datum</div>
      <div className={styles.calStrip}>
        {DAYS.map((d) => {
          const isSelected = date && d.toDateString() === date.toDateString();
          return (
            <button
              key={d.toISOString()}
              className={`${styles.dayBtn} ${isSelected ? styles.daySelected : ""}`}
              onClick={() => onDate(d)}
            >
              <span className={styles.dayName}>{DAY_NAMES[d.getDay()]}</span>
              <span className={styles.dayNum}>{d.getDate()}</span>
              <span className={styles.dayMonth}>{MONTH_NAMES[d.getMonth()]}</span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <div className={styles.calLabel}><Clock size={14} /> Vrijeme polaska</div>
      <div className={styles.timeGrid}>
        {TIME_SLOTS.map((slot) => {
          const isSelected = time === slot;
          // Mock: make some slots unavailable
          const unavail = ["09:00", "15:00"].includes(slot);
          return (
            <button
              key={slot}
              className={`${styles.timeBtn} ${isSelected ? styles.timeSelected : ""} ${unavail ? styles.timeUnavail : ""}`}
              onClick={() => !unavail && onTime(slot)}
              disabled={unavail}
            >
              {slot}
              {unavail && <span className={styles.timeCross}>✕</span>}
            </button>
          );
        })}
      </div>

      {/* Duration */}
      <div className={styles.calLabel}><Zap size={14} /> Trajanje</div>
      <div className={styles.durationRow}>
        {DURATIONS.map((d) => (
          <button
            key={d.value}
            className={`${styles.durBtn} ${duration?.value === d.value ? styles.durSelected : ""}`}
            onClick={() => onDuration(d)}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 2: Choose dog + notes ─────────────────────────────────────────────────
function StepDog({ dog, notes, recurring, onDog, onNotes, onRecurring }) {
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Koji pas ide u šetnju?</h2>
      <p className={styles.stepSub}>Dodaj napomene šetaču ako trebaš.</p>

      <div className={styles.dogList}>
        {DOGS.map((d) => (
          <button
            key={d.id}
            className={`${styles.dogCard} ${dog?.id === d.id ? styles.dogSelected : ""}`}
            onClick={() => onDog(d)}
          >
            <div className={styles.dogEmoji}>🐕</div>
            <div>
              <div className={styles.dogName}>{d.name}</div>
              <div className={styles.dogBreed}>{d.breed} · {d.size}</div>
            </div>
            {dog?.id === d.id && <div className={styles.selectedCheck}><Check size={16} /></div>}
          </button>
        ))}
        <button className={styles.dogCardAdd}>
          <span className={styles.plusIcon}>+</span>
          <span>Dodaj psa</span>
        </button>
      </div>

      <label className={styles.fieldLabel}>Napomene šetaču (opcija)</label>
      <textarea
        className={styles.textarea}
        rows={3}
        placeholder="npr. Rocky ne voli bicikle, preferira park..."
        value={notes}
        onChange={(e) => onNotes(e.target.value)}
      />

      <button
        className={`${styles.recurringBtn} ${recurring ? styles.recurringActive : ""}`}
        onClick={() => onRecurring(!recurring)}
      >
        <Repeat size={16} />
        <span>Ponavljajuća šetnja (svaki tjedan)</span>
        <div className={styles.toggle}><div className={styles.toggleKnob} /></div>
      </button>
    </div>
  );
}

// ── Step 3: Summary + confirm ──────────────────────────────────────────────────
function StepConfirm({ walker, date, time, duration, dog, notes, recurring, onConfirm, loading }) {
  const total = walker && duration ? (walker.price * duration.price).toFixed(2) : "—";
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Potvrdi rezervaciju</h2>
      <p className={styles.stepSub}>Provjeri detalje prije potvrde.</p>

      <div className={styles.summary}>
        {/* Walker */}
        <div className={styles.summaryRow}>
          <div className={styles.summaryIcon}><Star size={16} /></div>
          <div className={styles.summaryBody}>
            <div className={styles.summaryLabel}>Šetač</div>
            <div className={styles.summaryValue}>{walker?.name ?? "—"}</div>
          </div>
        </div>
        {/* Date/time */}
        <div className={styles.summaryRow}>
          <div className={styles.summaryIcon}><Calendar size={16} /></div>
          <div className={styles.summaryBody}>
            <div className={styles.summaryLabel}>Datum i vrijeme</div>
            <div className={styles.summaryValue}>
              {date
                ? `${date.getDate()}. ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
                : "—"}{" "}
              u {time ?? "—"}, {duration?.label ?? "—"}
            </div>
          </div>
        </div>
        {/* Location */}
        <div className={styles.summaryRow}>
          <div className={styles.summaryIcon}><MapPin size={16} /></div>
          <div className={styles.summaryBody}>
            <div className={styles.summaryLabel}>Lokacija</div>
            <div className={styles.summaryValue}>Tvoja adresa (iz profila)</div>
          </div>
        </div>
        {/* Dog */}
        <div className={styles.summaryRow}>
          <div className={styles.summaryIcon}><Dog size={16} /></div>
          <div className={styles.summaryBody}>
            <div className={styles.summaryLabel}>Pas</div>
            <div className={styles.summaryValue}>{dog?.name ?? "—"}</div>
          </div>
        </div>
        {notes && (
          <div className={styles.notesBox}>
            <span className={styles.summaryLabel}>Napomene: </span>{notes}
          </div>
        )}
        {recurring && (
          <div className={styles.recurringBadge}>
            <Repeat size={13} /> Ponavljajuća šetnja – svaki tjedan
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className={styles.priceBox}>
        <div className={styles.priceLine}>
          <span>Cijena šetnje ({duration?.label})</span>
          <span>{total} €</span>
        </div>
        <div className={styles.priceLine}>
          <span>Provizija platforme</span>
          <span>0.00 €</span>
        </div>
        <div className={`${styles.priceLine} ${styles.priceTotal}`}>
          <span>Ukupno</span>
          <span>{total} €</span>
        </div>
      </div>

      <button
        className={styles.confirmBtn}
        onClick={onConfirm}
        disabled={loading}
      >
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          <>
            <Check size={18} /> Potvrdi rezervaciju
          </>
        )}
      </button>
      <p className={styles.payNote}>Plaćanje gotovinom ili karticom pri susretu.</p>
    </div>
  );
}

// ── Success overlay ────────────────────────────────────────────────────────────
function SuccessScreen({ walker, date, time, onDone }) {
  return (
    <div className={styles.successWrap}>
      <div className={styles.successPaw}>🐾</div>
      <h2 className={styles.successTitle}>Rezervacija potvrđena!</h2>
      <p className={styles.successSub}>
        {walker?.name} dolazi po tvojeg psa
        {date ? ` ${date.getDate()}. ${MONTH_NAMES[date.getMonth()]}` : ""}{" "}
        u {time ?? "—"}.
      </p>
      <button className={styles.confirmBtn} onClick={onDone}>
        Idi na dashboard →
      </button>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function Book() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // form state
  const [walker, setWalker] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [dog, setDog] = useState(null);
  const [notes, setNotes] = useState("");
  const [recurring, setRecurring] = useState(false);

  const canNext = [
    !!walker,
    !!(date && time && duration),
    !!dog,
    true,
  ][step];

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };
  const handleBack = () => setStep((s) => s - 1);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <>
      {/* <Navbar variant="minimal" /> */}
      <main className={styles.page}>
        {/* Left decorative strip */}
        <div className={styles.strip} />

        <div className={styles.container}>
          {/* Header */}
          <div className={styles.pageHeader}>
            <span className={styles.pageEyebrow}>Rezervacija</span>
            <h1 className={styles.pageTitle}>Zakaži šetnju</h1>
          </div>

          {success ? (
            <SuccessScreen
              walker={walker}
              date={date}
              time={time}
              onDone={() => navigate("/dashboard/owner")}
            />
          ) : (
            <div className={styles.card}>
              <StepBar current={step} />

              {step === 0 && (
                <StepWalker selected={walker} onSelect={setWalker} />
              )}
              {step === 1 && (
                <StepDatetime
                  date={date}
                  time={time}
                  duration={duration}
                  onDate={setDate}
                  onTime={setTime}
                  onDuration={setDuration}
                />
              )}
              {step === 2 && (
                <StepDog
                  dog={dog}
                  notes={notes}
                  recurring={recurring}
                  onDog={setDog}
                  onNotes={setNotes}
                  onRecurring={setRecurring}
                />
              )}
              {step === 3 && (
                <StepConfirm
                  walker={walker}
                  date={date}
                  time={time}
                  duration={duration}
                  dog={dog}
                  notes={notes}
                  recurring={recurring}
                  onConfirm={handleConfirm}
                  loading={loading}
                />
              )}

              {/* Navigation */}
              <div className={styles.navRow}>
                {step > 0 ? (
                  <button className={styles.backBtn} onClick={handleBack}>
                    <ChevronLeft size={18} /> Natrag
                  </button>
                ) : (
                  <div />
                )}
                {step < 3 && (
                  <button
                    className={styles.nextBtn}
                    onClick={handleNext}
                    disabled={!canNext}
                  >
                    Dalje <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
