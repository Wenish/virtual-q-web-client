import axios, { AxiosResponse } from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { AccessTokenData, AuthContext, User } from '../contexts/AuthContext'

const localStorageUserKey = 'user'
const localStorageAccessTokenKey = 'accessToken'
const localStorageRefreshTokenKey = 'refreshToken'

const endpointToken = `${import.meta.env.VITE_HOST_API}/auth/token/`
const endpointTokenRefresh = `${import.meta.env.VITE_HOST_API}/auth/token/refresh/`

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
    const response = await axios.post<
      AuthTokenResponse,
      AxiosResponse<AuthTokenResponse, AuthTokenBody>,
      AuthTokenBody
    >(endpointToken, {
      username,
      password,
    })
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

  const decodedToken = () => {
    if (!token) return null
    return parseJwt(token)
  }

  const isTokenExpired = () => {
    const tokenData = decodedToken()
    if (!tokenData) return true
    return tokenData.exp * 1000 < Date.now()
  }

  const isLoggedIn = () => {
    return !!user && !!token && !isTokenExpired()
  }

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) throw 'No refresh token'

      const response = await axios.post<
        AuthTokenRefreshResponse,
        AxiosResponse<AuthTokenRefreshResponse, AuthTokenRefreshBody>,
        AuthTokenRefreshBody
      >(endpointTokenRefresh, {
        refresh: refreshToken,
      })

      setToken(response.data.access)
    } catch (error) {
      console.error('Failed to refresh access token:', error)
      logout()
    }
  }

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (isTokenExpired()) {
        refreshAccessToken()
      }
    }

    const intervalId = setInterval(checkTokenExpiry, 60000)

    return () => clearInterval(intervalId)
  }, [token, isTokenExpired, refreshAccessToken])

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

type AuthTokenResponse = {
  refresh: string
  access: string
}

type AuthTokenBody = {
  username: string
  password: string
}

type AuthTokenRefreshResponse = {
  access: string
}

type AuthTokenRefreshBody = {
  refresh: string
}
