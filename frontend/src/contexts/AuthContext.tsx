'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { auth } from '@/lib/auth'
import { clientApi } from '@/lib/client-api'
import type { UserProfile } from '@/types'

interface AuthContextValue {
  user: UserProfile | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchMe = useCallback(async (t: string) => {
    try {
      const me = await clientApi.auth.me()
      setUser(me)
      setToken(t)
    } catch {
      auth.clear()
      setUser(null)
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const t = auth.getToken()
    if (t) {
      fetchMe(t)
    } else {
      setIsLoading(false)
    }
  }, [fetchMe])

  const login = async (email: string, password: string) => {
    const { access, refresh } = await clientApi.auth.login(email, password)
    auth.setTokens(access, refresh)
    await fetchMe(access)
  }

  const logout = () => {
    auth.clear()
    setUser(null)
    setToken(null)
  }

  const refresh = async () => {
    const t = auth.getToken()
    if (t) await fetchMe(t)
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
