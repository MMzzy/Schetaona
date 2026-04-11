import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignIn = () => {
    console.log('Sign in:', { email, password, rememberMe })
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

            <button onClick={handleSignIn} className={styles.signInBtn}>
              SIGN IN
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
