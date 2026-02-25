import { AuthContext } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { Usuario } from '@/types'
import { useEffect, useState, type ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsuario = async (authId: string) => {
    const { data, error } = await supabase
      .from('usuario')
      .select(
        `
                *,
                rol (*),
                colegio (*),
                usuario_sucursal (
                    id_sucursal,
                    sucursal (id, nombre)
                )
                `,
      )
      .eq('id_auth', authId)
      .single()

    if (error) throw error
    return data as Usuario
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const usuario = await fetchUsuario(session.user.id)
          setUsuario(usuario)
        }
      } catch (err) {
        setError('Error al cargar la sesión')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const usuario = await fetchUsuario(session.user.id)
          setUsuario(usuario)
        } catch (err) {
          setError('Error al cargar usuario')
          console.error(err)
        }
      }

      if (event === 'SIGNED_OUT') {
        setUsuario(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
