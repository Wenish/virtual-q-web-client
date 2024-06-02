import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, token } = useAuth()

  const location = useLocation()

  const parseJwt = (
    token: string
  ): {
    exp: number
  } | null => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  const isTokenExpired = (token: string | null) => {
    if (!token) return true
    const tokenData = parseJwt(token)
    if (!tokenData) return true
    return tokenData.exp * 1000 < Date.now()
  }

  const isLoggedIn = !isTokenExpired(token) && user

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />
  )
}

export default ProtectedRoute
