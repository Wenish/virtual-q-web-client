import { createContext } from 'react'

export const AuthContext = createContext<AuthContext | undefined>(undefined)

export type User = {
  username: string
}

export type AccessTokenData = {
  token_type: 'access'
  exp: number
  iat: number
  jti: string
  user_id: number
}

export type AuthContext = {
  user: User | null
  token: string | null
  refreshToken: string | null
  decodedToken: () => AccessTokenData | null
  login: (username: string, password: string) => void
  logout: () => void
  isLoggedIn: () => boolean
}
