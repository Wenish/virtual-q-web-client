import axios, { AxiosResponse } from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { AccessTokenData, AuthContext, User } from '../contexts/AuthContext'

const localStorageUserKey = 'user'
const localStorageTokenKey = 'token'

const endpointToken = `${import.meta.env.VITE_HOST_API}/auth/token/`

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userJson = localStorage.getItem(localStorageUserKey)
    return userJson ? JSON.parse(userJson) : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(localStorageTokenKey)
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
    const token: string = response.data.access

    setUser(user)
    setToken(token)

    localStorage.setItem(localStorageUserKey, JSON.stringify(user))
    localStorage.setItem(localStorageTokenKey, token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem(localStorageUserKey)
    localStorage.removeItem(localStorageTokenKey)
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

  useEffect(() => {
    const userJson = localStorage.getItem(localStorageUserKey)
    if (userJson) {
      setUser(JSON.parse(userJson))
    }

    const savedToken = localStorage.getItem(localStorageTokenKey)
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, token, decodedToken, login, logout, isLoggedIn }}
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
