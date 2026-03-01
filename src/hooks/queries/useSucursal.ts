import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type {
  Sucursal,
  SucursalConAdmin,
  SucursalFormValues,
  UsuarioDisponible,
} from '@/types/sucursal.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const KEYS = {
  all: ['sucursales'] as const,
  list: (idColegio: number) => [...KEYS.all, 'list', idColegio] as const,
  detail: (id: number) => [...KEYS.all, 'detail', id] as const,
  adminsDisponibles: (idColegio: number) => [...KEYS.all, 'admins-disponibles', idColegio] as const,
}

export function useSucursal() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0

  return useQuery({
    queryKey: KEYS.list(idColegio),
    queryFn: async (): Promise<SucursalConAdmin[]> => {
      const { data, error } = await supabase.rpc('listar_sucursales', {
        p_id_colegio: idColegio,
      })

      if (error) throw error

      return (data ?? []).map((row: any) => ({
        id: row.id,
        id_colegio: row.id_colegio,
        nombre: row.nombre,
        direccion: row.direccion,
        estado: row.estado,
        created_at: row.created_at,
        updated_at: row.updated_at,
        administrador: row.admin_id
          ? {
              id: row.admin_id,
              nombre: row.admin_nombre,
              apellido: row.admin_apellido,
              estado: row.admin_estado,
            }
          : null,
      }))
    },
    enabled: idColegio > 0,
  })
}

export function useCrearSucursal() {
  const { usuario } = useAuth()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (values: SucursalFormValues) => {
      const { data, error } = await supabase
        .from('sucursal')
        .insert({
          id_colegio: usuario!.id_colegio,
          nombre: values.nombre.trim(),
          direccion: values.direccion.trim() || null,
        })
        .select()
        .single()

      if (error) throw error
      return data as Sucursal
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}

export function useEditarSucursal() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, values }: { id: number; values: SucursalFormValues }) => {
      const { data, error } = await supabase
        .from('sucursal')
        .update({
          nombre: values.nombre.trim(),
          direccion: values.direccion.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Sucursal
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}

export function useToggleEstadoSucursal() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, estado }: { id: number; estado: boolean }) => {
      const { error } = await supabase
        .from('sucursal')
        .update({ estado, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}

export function useAdminsDisponibles() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0

  return useQuery({
    queryKey: KEYS.adminsDisponibles(idColegio),
    queryFn: async (): Promise<UsuarioDisponible[]> => {
      const { data, error } = await supabase
        .from('usuario')
        .select(
          `
                id,
                nombre,
                apellido,
                estado,
                rol:id_rol (
                    nombre
                )    
            `,
        )
        .eq('id_colegio', idColegio)
        .eq('estado', true)

      if (error) throw error

      return (data ?? [])
        .filter((u: any) => u.rol?.nombre === 'ADMIN_SUCURSAL')
        .map((u: any) => ({
          id: u.id,
          nombre: u.nombre,
          apellido: u.apellido,
          estado: u.estado,
          rol: { nombre: u.rol.nombre },
        }))
    },
    enabled: idColegio > 0,
  })
}

export function useAsignarAdmin() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ idSucursal, idUsuario }: { idSucursal: number; idUsuario: string }) => {
      const { error } = await supabase.rpc('asignar_admin_sucursal', {
        p_id_sucursal: idSucursal,
        p_id_usuario: idUsuario,
      })

      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}

export function useQuitarAdmin() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (idSucursal: number) => {
      const { error } = await supabase
        .from('usuario_sucursal')
        .update({ estado: false, updated_at: new Date().toISOString() })
        .eq('id_sucursal', idSucursal)
        .eq('estado', true)

      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}
