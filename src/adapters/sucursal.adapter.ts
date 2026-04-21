import { AsignarAdminFormValues, SucursalFormValues } from '@/schemas/sucursal.schema'
import type { SucursalConAdmin } from '@/types'
import { Database } from '@/types/supabase'

type FilaSucursal = Database['public']['Tables']['sucursal']['Row']

export type SucursalRpcResponse = FilaSucursal & {
  admin_id?: string
  admin_nombre?: string
  admin_apellido?: string
  admin_estado?: boolean
  admin_correo?: string
}

export const sucursalAdapter = {
  toApp: (row: SucursalRpcResponse): SucursalConAdmin => ({
    id: row.id,
    id_colegio: row.id_colegio,
    nombre: row.nombre,
    direccion: row.direccion,
    estado: row.estado ?? true,
    created_at: row.created_at ?? '',
    updated_at: row.updated_at ?? '',
    administrador: row.admin_id
      ? {
          id: row.admin_id,
          nombre: row.admin_nombre!,
          apellido: row.admin_apellido!,
          estado: row.admin_estado ?? true,
          correo: row.admin_correo ?? null,
        }
      : null,
  }),

  toCreate: (idColegio: number, values: SucursalFormValues) => ({
    id_colegio: idColegio,
    nombre: values.nombre.trim(),
    direccion: values.direccion?.trim() || null,
  }),

  toUpdate: (values: SucursalFormValues) => ({
    nombre: values.nombre.trim(),
    direccion: values.direccion ? values.direccion.trim() : null,
    updated_at: new Date().toISOString(),
  }),

  toAssignAdmin: (idSucursal: number, idColegio: number, values: AsignarAdminFormValues) => ({
    p_id_sucursal: idSucursal,
    p_id_colegio: idColegio,
    p_nombre: values.nombre.trim(),
    p_apellido: values.apellido.trim(),
    p_correo: values.correo.trim().toLowerCase(),
  }),
}
