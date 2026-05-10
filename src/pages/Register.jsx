import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from './Register.module.css'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

const DAY_MAP = {
  'Pon': 'mon', 'Uto': 'tue', 'Sri': 'wed',
  'Čet': 'thu', 'Pet': 'fri', 'Sub': 'sat', 'Ned': 'sun',
}

function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, profile, loading: authLoading } = useAuth()
  const [role, setRole] = useState(null)
  const [step, setStep] = useState(0)

  // Read role from URL (e.g. /register?role=owner)
  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam === 'owner' || roleParam === 'walker') {
      setRole(roleParam)
    }
  }, [])

  // After OAuth redirect: user is logged in but has no profile yet → create it and redirect
  useEffect(() => {
    if (authLoading || !user || !role || profile) return
    const isOAuth = user.app_metadata?.provider !== 'email'
    if (!isOAuth) return

    async function finishOAuthProfile() {
      setLoading(true)
      const { error } = await supabase.from('profiles').insert({
        id: user.id,
        full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? '',
        email: user.email,
        role,
        city: '',
        phone: '',
      })
      setLoading(false)
      if (error) { setError(error.message); return }
      navigate(role === 'walker' ? '/dashboard/walker' : '/dashboard/owner')
    }
    finishOAuthProfile()
  }, [authLoading, user, role, profile])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
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

  const maxSteps = 4

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

  const handleOAuth = async (provider) => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/register?role=${role}`,
      },
    })
    if (error) setError(error.message)
  }

  const handleRegister = async () => {
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Lozinke se ne podudaraju')
      return
    }
    if (!formData.email || !formData.password) {
      setError('Email i lozinka su obavezni')
      return
    }

    setLoading(true)

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    const userId = authData.user.id

    // 2. Insert into profiles
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      full_name: formData.fullName,
      email: formData.email,
      role,
      city: formData.city,
      phone: formData.phone,
    })

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    if (role === 'walker') {
      // 3. Insert walker_profiles
      const { data: walkerProfile, error: wpError } = await supabase
        .from('walker_profiles')
        .insert({
          user_id: userId,
          bio: formData.biography,
          experience: formData.experience,
          walking_zone: formData.walkingZone,
          hourly_rate: formData.pricePerWalk ? parseFloat(formData.pricePerWalk) : null,
          max_dogs: formData.maxDogs === '3+' ? 3 : parseInt(formData.maxDogs) || 1,
          is_online: false,
          avg_rating: 0,
          radius_km: 5,
        })
        .select()
        .single()

      if (wpError) {
        setError(wpError.message)
        setLoading(false)
        return
      }

      // 4. Insert walker_availability
      const availability = { walker_id: walkerProfile.id }
      for (const [croatian, english] of Object.entries(DAY_MAP)) {
        availability[english] = !!(
          formData[`${croatian}-Jutro`] ||
          formData[`${croatian}-Popodne`] ||
          formData[`${croatian}-Večer`]
        )
      }
      availability.morning_from = '08:00'
      availability.morning_to = '12:00'
      availability.afternoon_from = '13:00'
      availability.afternoon_to = '17:00'

      const { error: avError } = await supabase.from('walker_availability').insert(availability)
      if (avError) {
        setError(avError.message)
        setLoading(false)
        return
      }

      navigate('/dashboard/walker')
    } else {
      // Owner — dog info stored when dogs table is ready (SQL provided separately)
      navigate('/dashboard/owner')
    }
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

          {error && (
            <div style={{ color: '#e53e3e', fontSize: '14px', margin: '0 0 16px', padding: '10px', background: '#fff5f5', borderRadius: '6px', border: '1px solid #fed7d7' }}>
              {error}
            </div>
          )}

          {/* Step 0 — Account info */}
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
                <button className={styles.socialBtn} type="button" onClick={() => handleOAuth('google')}>
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                  Google
                </button>
                <button className={styles.socialBtn} type="button" onClick={() => handleOAuth('apple')}>
                  <img src="https://www.svgrepo.com/show/452222/apple.svg" alt="Apple" />
                  Apple
                </button>
              </div>
            </div>
          )}

          {/* Step 1 — Personal info */}
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
              disabled={loading}
            >
              {step === maxSteps - 1
                ? (loading ? 'REGISTRACIJA...' : 'REGISTRIRAJ SE')
                : 'DALJE →'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register
