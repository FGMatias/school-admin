import { usuarioAdapter, UsuarioResponse } from '@/adapters/usuario.adapter'
import { AuthContext } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { UsuarioAutenticado } from '@/types/usuario.types'
import { useEffect, useRef, useState, type ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const initializeRef = useRef(false)

  const fetchUsuario = async (authId: string): Promise<UsuarioAutenticado> => {
    const { data, error } = await supabase
      .from('usuario')
      .select(
        `
        *,
        rol (*),
        colegio (*),
        usuario_sucursal (
          sucursal (*)
        )
      `,
      )
      .eq('id_auth', authId)
      .single()

    if (error) throw error
    if (!data) throw new Error(`No se encontró usuario para id_auth: ${authId}`)

    return usuarioAdapter.toApp(data as unknown as UsuarioResponse)
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!initializeRef.current) return

      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const usuario = await fetchUsuario(session.user.id)
          setUsuario(usuario)
        } catch {
          setError('Error al cargar usuario')
        }
      }

      if (event === 'SIGNED_OUT') {
        setUsuario(null)
        setError(null)
      }
    })

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const usuario = await fetchUsuario(session.user.id)
          setUsuario(usuario)
        }
      } catch {
        setError('Error al cargar la sesión')

        try {
          await supabase.auth.signOut()
        } catch {}
      } finally {
        setLoading(false)
        initializeRef.current = true
      }
    }

    initAuth()

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log(error)
      throw error
    }
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
