import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type {
  Sucursal,
  SucursalConAdmin,
  SucursalFormValues,
  AsignarAdminFormValues,
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
      if (!data) return []

      return data.map((row: Record<string, unknown>) => ({
        id: row.id as number,
        id_colegio: row.id_colegio as number,
        nombre: row.nombre as string,
        direccion: row.direccion as string,
        estado: row.estado as boolean,
        created_at: row.created_at as string,
        updated_at: row.updated_at as string,
        administrador: row.admin_id
          ? {
              id: row.admin_id as string,
              nombre: row.admin_nombre as string,
              apellido: row.admin_apellido as string,
              estado: row.admin_estado as boolean,
              correo: (row.admin_correo as string) ?? null,
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

export function useCrearAdminSucursal() {
  const { usuario } = useAuth()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({
      idSucursal,
      values,
    }: {
      idSucursal: number
      values: AsignarAdminFormValues
    }) => {
      const { error } = await supabase.rpc('crear_admin_sucursal', {
        p_id_sucursal: idSucursal,
        p_id_colegio: usuario!.id_colegio,
        p_nombre: values.nombre.trim(),
        p_apellido: values.apellido.trim(),
        p_correo: values.correo.trim().toLowerCase(),
      })

      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({queryKey: KEYS.all})
    }
  })
}

export function useResetPasswordAdmin() {
  return useMutation({
    mutationFn: async (idUsuario: string) => {
      const { error } = await supabase.rpc('reset_password_admin', {
        p_id_usuario: idUsuario,
      })

      if (error) throw error
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
