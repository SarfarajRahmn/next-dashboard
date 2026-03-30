// components/providers/auth-provider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { authClient, type Session } from "@/lib/auth/auth-client"

interface AuthContextType {
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSession()
  }, [])

  const loadSession = async () => {
    try {
      const { data } = await authClient.getSession()
      setSession(data)
    } catch (error) {
      console.error("Failed to load session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    })

    if (error) throw error
    await loadSession()
  }

  const signOut = async () => {
    await authClient.signOut()
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
