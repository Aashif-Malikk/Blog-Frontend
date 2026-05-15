import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Auth() {
    // ✅ localStorage is always readable, no cookie issues
    let isLoggedIn = localStorage.getItem("isLoggedIn")

    return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />
}