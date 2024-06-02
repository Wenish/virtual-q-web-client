import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth()

  const location = useLocation()

  return isLoggedIn() ? (
    children
  ) : (
    <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />
  )
}

export default ProtectedRoute
