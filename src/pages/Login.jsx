import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from './Login.module.css'
import { supabase } from '../lib/supabaseClient'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setError(null)
    setLoading(true)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role === 'walker') navigate('/dashboard/walker')
    else navigate('/dashboard/owner')
  }

  return (
    <div>
      <Navbar />
      <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>

          <div className={styles.loginImage}>
            <div className={styles.loginImagePlaceholder}>
              theschetaona
            </div>
          </div>

          <div className={styles.loginForm}>
            <div className={styles.formHeader}>
              <h1>Login</h1>
            </div>

            {error && (
              <div style={{ color: '#e53e3e', fontSize: '14px', marginBottom: '12px', padding: '10px', background: '#fff5f5', borderRadius: '6px', border: '1px solid #fed7d7' }}>
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                placeholder="mark.johnson@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <label>Password</label>
                <a href="#" className={styles.forgotLink}>Forgot?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
              />
            </div>

            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button onClick={handleSignIn} className={styles.signInBtn} disabled={loading}>
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>

            <div className={styles.createAccount}>
              <Link to="/register" className={styles.createAccountBtn}>
                Create an account
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
