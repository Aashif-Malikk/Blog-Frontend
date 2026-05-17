import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignUp.css'
const API_BASE = 'https://blog-project-d6fu.onrender.com'
// const API_BASE = 'http://localhost:4000'


const MASONRY_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=70',
]

const FEATURES = [
  {
    icon: 'bi-cloud-arrow-up',
    title: 'Upload Your Best Work',
    text: 'Showcase high-quality images to the world.',
  },
  {
    icon: 'bi-currency-dollar',
    title: 'Set Your Price',
    text: "You're in control of your earnings.",
  },
  {
    icon: 'bi-globe2',
    title: 'Reach Global Audience',
    text: 'Get discovered by buyers and followers.',
  },
]

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [user, setuser] = useState({})
  const [msg, setmsg] = useState("")

  const inpHandler = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);

    fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setmsg(data.message);
      })
  }

  return (
    <div className="signup-page py-4 py-lg-5 px-3">
      <div className="signup-shell mx-auto">
        <div className="signup-card bg-white row g-0">
          {/* Form — left on desktop, first on mobile */}
          <div className="col-12 col-md-6 order-1">
            <div className="signup-form-panel d-flex flex-column h-100 px-4 px-lg-5 py-4 py-lg-5">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <Link
                  to="/home"
                  className="text-dark text-decoration-none d-inline-flex align-items-center gap-2 fw-bold fs-5"
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
                <span className="small text-secondary">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="fw-semibold text-decoration-none pp-link-muted">
                    Log in
                  </Link>
                </span>
              </div>

              <div className="flex-grow-1 d-flex align-items-start">
                <div className="w-100" style={{ maxWidth: 400 }}>
                  <h1 className="h2 fw-bold text-dark mb-2">Create Account</h1>
                  <p className="text-secondary mb-4">Join PixelPost and start your journey.</p>

                  <form className="d-flex flex-column gap-3" onSubmit={submitHandler}>
                    <div>
                      <label htmlFor="signup-name" className="form-label fw-semibold small">
                        Full Name
                      </label>
                      <div className="input-group signup-input-group rounded-3 overflow-hidden border">
                        <span className="input-group-text signup-input-icon border-0 text-secondary rounded-0">
                          <i className="bi bi-person" aria-hidden />
                        </span>
                        <input
                          id="signup-name"
                          type="text"
                          className="form-control signup-input-field border-0 shadow-none rounded-0"
                          placeholder="Enter your full name"
                          autoComplete="name"
                          name='fullName'
                          onChange={inpHandler}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signup-email" className="form-label fw-semibold small">
                        Email Address
                      </label>
                      <div className="input-group signup-input-group rounded-3 overflow-hidden border">
                        <span className="input-group-text signup-input-icon border-0 text-secondary rounded-0">
                          <i className="bi bi-envelope" aria-hidden />
                        </span>
                        <input
                          id="signup-email"
                          type="email"
                          className="form-control signup-input-field border-0 shadow-none rounded-0"
                          placeholder="Enter your email"
                          autoComplete="email"
                          name='email'
                          onChange={inpHandler}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signup-password" className="form-label fw-semibold small">
                        Password
                      </label>
                      <div className="input-group signup-input-group rounded-3 overflow-hidden border">
                        <span className="input-group-text signup-input-icon border-0 text-secondary rounded-0">
                          <i className="bi bi-lock" aria-hidden />
                        </span>
                        <input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          className="form-control signup-input-field border-0 shadow-none rounded-0"
                          placeholder="Create a password"
                          autoComplete="new-password"
                          minLength={8}
                        />
                        <button
                          type="button"
                          className="btn btn-link text-secondary border-0 signup-input-icon text-decoration-none px-3"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} aria-hidden />
                        </button>
                      </div>
                      <div className="form-text">Password must be at least 8 characters</div>
                    </div>

                    <div>
                      <label htmlFor="signup-confirm" className="form-label fw-semibold small">
                        Confirm Password
                      </label>
                      <div className="input-group signup-input-group rounded-3 overflow-hidden border">
                        <span className="input-group-text signup-input-icon border-0 text-secondary rounded-0">
                          <i className="bi bi-lock" aria-hidden />
                        </span>
                        <input
                          id="signup-confirm"
                          type={showConfirm ? 'text' : 'password'}
                          className="form-control signup-input-field border-0 shadow-none rounded-0"
                          placeholder="Confirm your password"
                          autoComplete="new-password"
                          name='password'
                          onChange={inpHandler}
                        />
                        <button
                          type="button"
                          className="btn btn-link text-secondary border-0 signup-input-icon text-decoration-none px-3"
                          onClick={() => setShowConfirm((v) => !v)}
                          aria-label={showConfirm ? 'Hide password' : 'Show password'}
                        >
                          <i className={showConfirm ? 'bi bi-eye-slash' : 'bi bi-eye'} aria-hidden />
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-pp btn-lg w-100 rounded-3 d-inline-flex align-items-center justify-content-center gap-2 py-3 mt-2"
                    >
                      <i className="bi bi-box-arrow-up" aria-hidden />
                      Sign Up
                    </button>
                    <p className='w-100 text-center fw-bold'>{msg}</p>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Marketing — right on desktop; stacked below on mobile */}
          <div className="col-12 col-md-6 order-2">
            <div className="signup-marketing text-white position-relative">
              <div className="signup-masonry" aria-hidden>
                {MASONRY_IMAGES.map((url, i) => (
                  <div
                    key={i}
                    className="signup-masonry-cell"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                ))}
              </div>
              <div className="signup-masonry-overlay d-flex flex-column justify-content-between p-4 p-lg-5">
                <div className="flex-grow-1 d-flex flex-column justify-content-center py-4 py-lg-5">
                  <h2 className="display-6 fw-bold mb-3">Share. Sell. Get Seen.</h2>
                  <div className="signup-accent-bar mb-4" />
                  <p className="lead text-white-50 mb-0" style={{ maxWidth: '22rem' }}>
                    Join thousands of photographers and creators around the world.
                  </p>
                </div>

                <ul className="list-unstyled d-flex flex-column gap-4 mb-0">
                  {FEATURES.map((f) => (
                    <li key={f.title} className="d-flex gap-3">
                      <span className="signup-feature-icon">
                        <i className={`bi ${f.icon} fs-5`} aria-hidden />
                      </span>
                      <div>
                        <div className="fw-semibold">{f.title}</div>
                        <p className="small text-white-50 mb-0">{f.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
