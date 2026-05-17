import { useState } from 'react'
import { Link } from 'react-router-dom'
import './LogIn.css'
import { useNavigate } from 'react-router-dom'
const API_BASE = 'https://blog-project-d6fu.onrender.com'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1600&q=80'

function LogIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [user, setuser] = useState({})
  const [msg, setmsg] = useState(null)
  const navigate = useNavigate()

  const inpHandler = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);

    fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("isLoggedIn", "true")
          navigate("/home")
          window.location.reload()
        } else {
          setmsg(data.msg || data.error || "Login failed")
        }
      })
      .catch((error) => {
        console.error(error)
        setmsg("Login failed. Please try again.")
      })

  }

  return (
    <div className="login-page bg-white">
      <div className="row g-0">
        {/* Hero — full width on mobile, left half on lg */}
        <div className="col-12 col-lg-6 order-2 order-lg-1">
          <div
            className="login-hero text-white d-flex flex-column"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="login-hero-overlay d-flex flex-column flex-grow-1">
              <div className="p-4 p-lg-5">
                <Link
                  to="/home"
                  className="text-white text-decoration-none d-inline-flex align-items-center gap-2 fw-bold fs-5"
                >
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-2 text-white fw-bold small"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#7C4DFF',
                      fontSize: '0.85rem',
                    }}
                    aria-hidden
                  >
                    p
                  </span>
                  PixelPost
                </Link>
              </div>

              <div className="px-4 px-lg-5 flex-grow-1 d-flex flex-column justify-content-center py-5">
                <h1 className="display-5 fw-bold mb-3">Welcome Back!</h1>
                <div className="login-accent-bar mb-4" />
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '28rem' }}>
                  Log in to your account and continue sharing your vision.
                </p>
              </div>

              <div className="p-4 p-lg-5 mt-auto">
                <div className="d-flex gap-3 align-items-start">
                  <i className="bi bi-quote fs-2 flex-shrink-0" style={{ color: '#7C4DFF' }} aria-hidden />
                  <div>
                    <p className="mb-3 fst-italic text-white-50">
                      PixelPost is my go-to platform to showcase and sell my photography.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="col-12 col-lg-6 order-1 order-lg-2">
          <div className="login-form-panel d-flex flex-column bg-white px-4 px-lg-5 py-4 py-lg-0">
            <div className="text-end small text-secondary mb-3 mb-lg-4 pt-lg-4">
              Don&apos;t have an account?{' '}
              <Link to="/auth/signup" className="fw-semibold text-decoration-none pp-link-muted">
                Sign up
              </Link>
            </div>

            <div className="flex-grow-1 d-flex align-items-center justify-content-center py-lg-5">
              <div className="w-100" style={{ maxWidth: 420 }}>
                <h2 className="h2 fw-bold text-dark mb-2">Log In</h2>
                <p className="text-secondary mb-4">Welcome back! Please enter your details.</p>

                <form
                  onSubmit={submitHandler}
                  className="d-flex flex-column gap-3"
                >
                  <div>
                    <label htmlFor="login-email" className="form-label fw-semibold small">
                      Email Address
                    </label>
                    <div className="input-group login-input-group rounded-3 overflow-hidden border">
                      <span className="input-group-text login-input-icon border-0 text-secondary rounded-0">
                        <i className="bi bi-envelope" aria-hidden />
                      </span>
                      <input
                        id="login-email"
                        type="email"
                        className="form-control login-input-field border-0 shadow-none rounded-0"
                        placeholder="Enter your email"
                        autoComplete="email"
                        name='email'
                        onChange={inpHandler}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="form-label fw-semibold small">
                      Password
                    </label>
                    <div className="input-group login-input-group rounded-3 overflow-hidden border">
                      <span className="input-group-text login-input-icon border-0 text-secondary rounded-0">
                        <i className="bi bi-lock" aria-hidden />
                      </span>
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-control login-input-field border-0 shadow-none rounded-0"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        name='password'
                        onChange={inpHandler}
                      />
                      <button
                        type="button"
                        className="btn btn-link text-secondary border-0 login-input-icon text-decoration-none px-3"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} aria-hidden />
                      </button>
                    </div>
                  </div>

                  <div className="text-end">
                    <a href="#forgot" className="small fw-semibold text-decoration-none pp-link-muted">
                      Forgot password?
                    </a>
                  </div>

                  <button type="submit" className="btn btn-pp btn-lg w-100 rounded-3 d-inline-flex align-items-center justify-content-center gap-2 py-3">
                    <i className="bi bi-box-arrow-in-right" aria-hidden />
                    Log In
                  </button>
                </form>
              </div>
            </div>

            <div className="text-center small text-secondary pb-4 d-flex align-items-center justify-content-center gap-2">
              <i className="bi bi-shield-check" aria-hidden />
              <span>We respect your privacy. Your data is safe with us.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
