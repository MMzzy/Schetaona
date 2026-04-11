import { useState } from 'react'
import Navbar from '../components/Navbar'
import styles from './Register.module.css'

function Register() {
  const [role, setRole] = useState(null)
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    phone: '',
    city: '',
    profilePhoto: null,
    biography: '',
    experience: 'Početnik',
    walkingZone: '',
    walkingServices: [],
    maxDogs: '',
    dogName: '',
    dogBreed: '',
    dogAge: '',
    dogGender: 'Muški',
    dogPhoto: null,
    healthIssues: '',
    dogSocialization: 'Dobra',
    dogEnergy: 50,
    specialNotes: '',
  })

  const maxSteps = role === 'walker' ? 4 : 4

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckbox = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }))
  }

  const handleNext = () => {
    if (step < maxSteps - 1) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleRegister = () => {
    console.log('Register:', formData, role)
  }

  const progressPercent = ((step + 1) / maxSteps) * 100

  /* ── ROLE SELECTION ── */
  if (!role) {
    return (
      <div>
        <Navbar />
        <div className={styles.page}>
          <div className={styles.card}>
            <div className={styles.regHeader}>
              <h1>Schetaona</h1>
              <p>Povežite se sa najboljim šetačima pasa u vašem susjedstvu</p>
            </div>
            <div className={styles.roleSelection}>
              <button
                className={styles.roleBtn}
                onClick={() => { setRole('owner'); setStep(0) }}
              >
                <span className={styles.roleIcon}>🐕</span>
                <span className={styles.roleTitle}>Vlasnik psa</span>
                <span className={styles.roleDesc}>Pronađite idealnog šetača za svog ljubimca</span>
              </button>
              <button
                className={styles.roleBtn}
                onClick={() => { setRole('walker'); setStep(0) }}
              >
                <span className={styles.roleIcon}>👤</span>
                <span className={styles.roleTitle}>Šetač pasa</span>
                <span className={styles.roleDesc}>Zaradite šetajući pse u svom susjedstvu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── STEP FORM ── */
  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>

          {/* Top bar */}
          <div className={styles.regTop}>
            <button className={styles.backBtn} onClick={() => setRole(null)}>
              ← Nazad na početnu
            </button>
            <div className={styles.progressInfo}>
              <span>Korak {step + 1} od {maxSteps}</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Step 0 — Account info (both) */}
          {step === 0 && (
            <div className={styles.stepContent}>
              <h2>Kreirajte račun</h2>
              <p>Osnovne informacije za prijavu</p>
              <div className={styles.formGroup}>
                <label>Puno ime *</label>
                <input
                  type="text"
                  placeholder="Ana Anić"
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="ana@example.com"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Lozinka *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Potvrdi lozinku *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange('confirmPassword', e.target.value)}
                />
              </div>
              <div className={styles.socialButtons}>
                <button className={styles.socialBtn}>
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                  Google
                </button>
                <button className={styles.socialBtn}>
                  <img src="https://www.svgrepo.com/show/452222/apple.svg" alt="Apple" />
                  Apple
                </button>
              </div>
            </div>
          )}

          {/* Step 1 — Personal info (both) */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2>Osobne informacije</h2>
              <p>Pomozite drugima da vas bolje upoznaju</p>
              <div className={styles.formGroup}>
                <label>Datum rođenja *</label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={formData.birthDate}
                  onChange={e => handleInputChange('birthDate', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Broj telefona *</label>
                <input
                  type="tel"
                  placeholder="+385 91 234 5678"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Grad *</label>
                <input
                  type="text"
                  placeholder="Zagreb"
                  value={formData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Profilna fotografija</label>
                <div className={styles.fileUpload}>
                  <input type="file" accept="image/*" onChange={e => handleInputChange('profilePhoto', e.target.files[0])} />
                  <span>Povucite sliku ovdje ili kliknite za upload</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Kratka biografija</label>
                <textarea
                  placeholder="Volim pse od malena i uživam u šetnji prirodom..."
                  value={formData.biography}
                  onChange={e => handleInputChange('biography', e.target.value)}
                />
                <span className={styles.charCount}>{formData.biography.length} / 200</span>
              </div>
            </div>
          )}

          {/* Step 2 — Walker: Experience & services */}
          {role === 'walker' && step === 2 && (
            <div className={styles.stepContent}>
              <h2>Iskustvo i usluge</h2>
              <p>Podijelite iskustvo s potencijalnim vlasnicima</p>
              <div className={styles.formGroup}>
                <label>Nivo iskustva *</label>
                <div className={styles.radioOptions}>
                  {['Početnik', 'Srednje', 'Iskusan'].map(opt => (
                    <div key={opt} className={styles.radioOption}>
                      <input
                        type="radio"
                        name="experience"
                        value={opt}
                        checked={formData.experience === opt}
                        onChange={e => handleInputChange('experience', e.target.value)}
                      />
                      <label>{opt}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Maksimalno pasa odjednom *</label>
                <div className={styles.buttonGroup}>
                  {['1', '2', '3+'].map(num => (
                    <button
                      key={num}
                      className={`${styles.btnOption} ${formData.maxDogs === num ? styles.active : ''}`}
                      onClick={() => handleInputChange('maxDogs', num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Zona šetanja *</label>
                <input
                  type="text"
                  placeholder="npr. Trešnjevka, Maksimir"
                  value={formData.walkingZone}
                  onChange={e => handleInputChange('walkingZone', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ponuđene usluge *</label>
                {['30 min šetnja', '60 min šetnja', 'Grupna šetnja', 'Čuvanje ljubimca'].map(service => (
                  <div key={service} className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={formData.walkingServices.includes(service)}
                      onChange={() => handleCheckbox('walkingServices', service)}
                    />
                    <label>{service}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Owner: Dog info */}
          {role === 'owner' && step === 2 && (
            <div className={styles.stepContent}>
              <h2>O vašem psu</h2>
              <p>Recite nam nešto o svom ljubimcu</p>
              <div className={styles.formGroup}>
                <label>Ime psa *</label>
                <input
                  type="text"
                  placeholder="Buco"
                  value={formData.dogName}
                  onChange={e => handleInputChange('dogName', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Pasmina *</label>
                <input
                  type="text"
                  placeholder="Labrador"
                  value={formData.dogBreed}
                  onChange={e => handleInputChange('dogBreed', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Starost (godine) *</label>
                <input
                  type="number"
                  placeholder="2"
                  value={formData.dogAge}
                  onChange={e => handleInputChange('dogAge', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Spol *</label>
                <div className={styles.buttonGroup}>
                  {['Muški', 'Ženski'].map(gender => (
                    <button
                      key={gender}
                      className={`${styles.btnOption} ${formData.dogGender === gender ? styles.active : ''}`}
                      onClick={() => handleInputChange('dogGender', gender)}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Fotografija psa</label>
                <div className={styles.fileUpload}>
                  <input type="file" accept="image/*" onChange={e => handleInputChange('dogPhoto', e.target.files[0])} />
                  <span>Povucite sliku ovdje ili kliknite za upload</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Walker: Availability */}
          {role === 'walker' && step === 3 && (
            <div className={styles.stepContent}>
              <h2>Dostupnost</h2>
              <p>Kada ste dostupni za šetanje?</p>
              <div className={styles.formGroup}>
                <label>Sedmična dostupnost *</label>
                <div className={styles.availabilityTable}>
                  {['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'].map(day => (
                    <div key={day} className={styles.availabilityRow}>
                      <span className={styles.dayName}>{day}</span>
                      {['Jutro', 'Popodne', 'Večer'].map(time => (
                        <button
                          key={time}
                          className={`${styles.timeBtn} ${formData[`${day}-${time}`] ? styles.active : ''}`}
                          onClick={() => handleInputChange(`${day}-${time}`, !formData[`${day}-${time}`])}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Cijena po 30 min šetnji *</label>
                <div className={styles.priceInput}>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.pricePerWalk || ''}
                    onChange={e => handleInputChange('pricePerWalk', e.target.value)}
                  />
                  <span>€</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Owner: Health & behaviour */}
          {role === 'owner' && step === 3 && (
            <div className={styles.stepContent}>
              <h2>Zdravlje i ponašanje</h2>
              <p>Pomozite šetaču da bolje razumije vašeg psa</p>
              <div className={styles.formGroup}>
                <label>Zdravstveni problemi ili alergije</label>
                <textarea
                  placeholder="npr. problemi sa kukovima, alergije..."
                  value={formData.healthIssues}
                  onChange={e => handleInputChange('healthIssues', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Socijalizacija sa drugim psima *</label>
                <div className={styles.buttonGroup}>
                  {['Odlična', 'Dobra', 'Ograničena', 'Loša'].map(soc => (
                    <button
                      key={soc}
                      className={`${styles.btnOption} ${formData.dogSocialization === soc ? styles.active : ''}`}
                      onClick={() => handleInputChange('dogSocialization', soc)}
                    >
                      {soc}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Nivo energije *</label>
                <div className={styles.sliderContainer}>
                  <span>Nisko</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.dogEnergy}
                    onChange={e => handleInputChange('dogEnergy', parseInt(e.target.value))}
                  />
                  <span>Visoko</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Posebne napomene za šetače</label>
                <textarea
                  placeholder="npr. voli da juri lopticu, plaši se glasnih zvukova..."
                  value={formData.specialNotes}
                  onChange={e => handleInputChange('specialNotes', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={styles.navButtons}>
            <button className={styles.btnBack} onClick={handleBack}>
              ← NAZAD
            </button>
            <button
              className={styles.btnNext}
              onClick={step === maxSteps - 1 ? handleRegister : handleNext}
            >
              {step === maxSteps - 1 ? 'REGISTRIRAJ SE' : 'DALJE →'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register
