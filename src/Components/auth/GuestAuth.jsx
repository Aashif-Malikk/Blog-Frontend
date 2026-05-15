import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function GuestAuth() {

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    return isLoggedIn
        ? <Navigate to="/home" />
        : <Outlet />
}