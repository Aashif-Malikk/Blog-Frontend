import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Navbar from './Components/Nav/Nav'
import Home from './Components/Home/Home'
import Sell from './Components/Sell/Sell'
import { Categories2 } from './Components/Categories/Categories'
import LogIn from './Components/LogIn/LogIn'
import SignUp from './Components/SignUp/SignUp'
import GuestAuth from './Components/auth/GuestAuth'
import Auth from './Components/auth/Auth'

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function PageStub({ title }) {
  return (
    <main className="container py-5">
      <h1 className="display-6 fw-bold">{title}</h1>
      <p className="text-secondary mb-0">This section is a placeholder for future content.</p>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="allCategories" element={<Categories2 />} />
        <Route path="blog" element={<PageStub title="Blog" />} />
        {/* <Route path="categories" element={<PageStub title="Categories" />} /> */}
        <Route path="photos" element={<PageStub title="Photos" />} />

        <Route element={<><GuestAuth /></>}>
          <Route path="auth/login" element={<LogIn />} />
          <Route path="auth/signup" element={<SignUp />} />
        </Route>

        <Route element={<><Auth /></>}>
          <Route path="sell" element={<Sell />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
