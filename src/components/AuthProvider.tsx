import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { AccessTokenData, AuthContext, User } from '../contexts/AuthContext'
import { virtualqApi } from '../api/virtualq.api'

const localStorageUserKey = 'user'
const localStorageAccessTokenKey = 'accessToken'
const localStorageRefreshTokenKey = 'refreshToken'

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userJson = localStorage.getItem(localStorageUserKey)
    return userJson ? JSON.parse(userJson) : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(localStorageAccessTokenKey)
  })

  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    return localStorage.getItem(localStorageRefreshTokenKey)
  })

  const parseJwt = (token: string): AccessTokenData | null => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  const login = async (username: string, password: string) => {
    const response = await virtualqApi.auth.token.post({ username, password })
    const user: User = { username }
    const accessToken: string = response.data.access
    const refreshToken: string = response.data.refresh

    setUser(user)
    setToken(accessToken)
    setRefreshToken(refreshToken)

    localStorage.setItem(localStorageUserKey, JSON.stringify(user))
    localStorage.setItem(localStorageAccessTokenKey, accessToken)
    localStorage.setItem(localStorageRefreshTokenKey, refreshToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setRefreshToken(null)

    localStorage.removeItem(localStorageUserKey)
    localStorage.removeItem(localStorageAccessTokenKey)
    localStorage.removeItem(localStorageRefreshTokenKey)
  }

  const decodedToken = useCallback(() => {
    if (!token) return null
    return parseJwt(token)
  }, [token])

  const isTokenExpired = useCallback(() => {
    const tokenData = decodedToken()
    if (!tokenData) return true
    return tokenData.exp * 1000 < Date.now()
  }, [decodedToken])

  const isLoggedIn = useCallback(() => {
    return !!user && !!token && !isTokenExpired()
  }, [user, token, isTokenExpired])

  const refreshAccessToken = useCallback(async () => {
    try {
      if (!refreshToken) throw 'No refresh token'

      const response = await virtualqApi.auth.token.refresh.post({
        refresh: refreshToken,
      })

      setToken(response.data.access)
    } catch (error) {
      console.error('Failed to refresh access token:', error)
      logout()
    }
  }, [refreshToken])

  useEffect(() => {
    const refreshToken = () => {
      if (isLoggedIn()) {
        refreshAccessToken()
      }
    }

    const intervalId = setInterval(refreshToken, 3_600_000) // 1 hour

    return () => clearInterval(intervalId)
  }, [token, refreshAccessToken, isLoggedIn])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        decodedToken,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
