import { usuarioAdapter, UsuarioResponse } from '@/adapters/usuario.adapter'
import { AuthContext } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { UsuarioAutenticado } from '@/types/usuario.types'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const initRef = useRef(false)
  const fetchingRef = useRef(false)
  const currentAuthIdRef = useRef<string | null>(null)

  const fetchUsuario = useCallback(async (authId: string): Promise<UsuarioAutenticado> => {
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
  }, [])

  const syncUsuario = useCallback(
    async (authId: string) => {
      if (fetchingRef.current) return
      fetchingRef.current = true

      try {
        const nuevoUsuario = await fetchUsuario(authId)
        setUsuario(nuevoUsuario)
        currentAuthIdRef.current = authId
        setError(null)
      } catch {
        setError('Error al cargar usuario')
      } finally {
        fetchingRef.current = false
      }
    },
    [fetchUsuario],
  )

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!initRef.current) return

      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
        await syncUsuario(session.user.id)
      }

      if (event === 'SIGNED_OUT') {
        setUsuario(null)
        currentAuthIdRef.current = null
        setError(null)
      }
    })

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const u = await fetchUsuario(session.user.id)
          setUsuario(u)
          currentAuthIdRef.current = session.user.id
        }
      } catch {
        setError('Error al cargar la sesión')

        try {
          await supabase.auth.signOut()
        } catch {}
      } finally {
        setLoading(false)
        initRef.current = true
      }
    }

    initAuth()

    const handleVisibilityChange = async () => {
      if (document.visibilityState !== 'visible') return
      if (!initRef.current) return

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError || !session) {
          setUsuario(null)
          currentAuthIdRef.current = null
          return
        }

        if (currentAuthIdRef.current === session.user.id) return

        await syncUsuario(session.user.id)
      } catch {}
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      subscription.unsubscribe()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [fetchUsuario, syncUsuario])

  const login = async (email: string, password: string) => {
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error)
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
