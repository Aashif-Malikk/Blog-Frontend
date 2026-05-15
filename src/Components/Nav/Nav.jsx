import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const NAV_ITEMS = [
  { to: '/home', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/allCategories', label: 'Categories' },
  { to: '/sell', label: 'Sell' },
]

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `nav-link text-black fw-bold fw-semibold pp-link px-lg-2 ${isActive ? 'active' : ''}`

  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    if (!mobileOpen) return undefined
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)')
    const onChange = () => {
      if (mq.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const searchForm = (extraClassName = '') => (
    <form
      className={`d-flex flex-grow-1 my-2 my-lg-0 mx-lg-3 nav-desktop-search ${extraClassName}`}
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="input-group rounded-pill bg-light border-1 shadow-sm overflow-hidden w-100">
        <span className="input-group-text bg-transparent border-0 ps-3">
          <i className="bi bi-search text-dark" aria-hidden />
        </span>
        <input
          className="form-control border-0 bg-transparent shadow-none"
          type="search"
          placeholder="Search photos, creators, collections…"
          aria-label="Search"
        />
      </div>
    </form>
  )

  const authButtons = (stacked = false) => (
    <div
      className={`d-flex gap-2 ${stacked ? 'flex-column px-3 pb-4' : 'flex-column flex-sm-row align-items-stretch align-items-sm-center gap-1'}`}
    >
      {!localStorage.getItem("isLoggedIn") && (
        <>
          <Link
            to="/auth/login"
            className="btn fw-bold btn-outline-pp px-4 order-sm-1"
            onClick={stacked ? closeMobile : undefined}
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="btn fw-bold btn-pp px-4 order-sm-2"
            onClick={stacked ? closeMobile : undefined}
          >
            SignUp
          </Link>
        </>
      )}
    </div>
  )

  const navList = (onNavigate) => (
    <ul className="navbar-nav d-flex flex-column flex-lg-row align-items-lg-center gap-lg-4 mb-0 list-unstyled px-3 px-lg-0 py-2 py-lg-0">
      {NAV_ITEMS.map(({ to, label }) => (
        <li key={to} className="nav-item w-100 w-lg-auto">
          <NavLink className={linkClass} to={to} onClick={onNavigate}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )

  return (
    <nav className="navbar navbar-light bg-white sticky-top shadow-sm py-3">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link
            className="navbar-brand fw-bold fs-3 d-flex align-items-center me-2"
            to="/home"
            onClick={closeMobile}
          >
            Pixel<span className="text-primary">Post</span>
          </Link>

          <button
            className="navbar-toggler d-lg-none rounded-3 border-0 shadow-sm"
            type="button"
            aria-controls="navMobileDrawer"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Desktop: inline nav + search + auth */}
          <div className="d-none d-lg-flex align-items-center flex-grow-1 ms-lg-4 gap-3">
            <div className="flex-grow-1 d-flex justify-content-center">
              <ul className="navbar-nav flex-row align-items-center gap-lg-4 mb-0 list-unstyled">
                {NAV_ITEMS.map(({ to, label }) => (
                  <li key={to} className="nav-item">
                    <NavLink className={linkClass} to={to}>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {searchForm('flex-shrink-1')}
            <div className="flex-shrink-0">{authButtons(false)}</div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      <button
        type="button"
        className={`nav-mobile-backdrop border-0 p-0 ${mobileOpen ? 'nav-mobile-backdrop--open' : ''}`}
        aria-label="Close menu"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={closeMobile}
      />

      {/* Mobile drawer from right */}
      <div
        id="navMobileDrawer"
        className={`nav-mobile-drawer ${mobileOpen ? 'nav-mobile-drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="nav-mobile-drawer-header d-flex align-items-center justify-content-between p-3 border-bottom">
          <span className="fw-bold text-dark">Menu</span>
          <button
            type="button"
            className="btn btn-link text-dark text-decoration-none p-2 lh-1"
            aria-label="Close menu"
            onClick={closeMobile}
          >
            <i className="bi bi-x-lg fs-5" aria-hidden />
          </button>
        </div>
        <div className="nav-mobile-nav flex-grow-1">{navList(closeMobile)}</div>
        <div className="px-3 pt-2 border-top">{searchForm('w-100')}</div>
        {authButtons(true)}
      </div>
    </nav>
  )
}

export default Nav
