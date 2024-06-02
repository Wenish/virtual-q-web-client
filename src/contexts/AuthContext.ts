import { createContext } from 'react'

export const AuthContext = createContext<AuthContext | undefined>(undefined)

export type User = {
  username: string
}

export type AuthContext = {
  user: User | null
  token: string | null
  login: (username: string, password: string) => void
  logout: () => void
}
