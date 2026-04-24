import { SeccionFormValues } from '@/schemas/seccion.schema'
import { Seccion } from '@/types/seccion.types'
import { Database } from '@/types/supabase'

type FilaSeccion = Database['public']['Tables']['seccion']['Row']
type InsertSeccion = Database['public']['Tables']['seccion']['Insert']
type UpdateSeccion = Database['public']['Tables']['seccion']['Update']

type SupabaseSeccionJoin = FilaSeccion & {
  sucursal: {
    nombre: string
  } | null
}

export type SeccionConSucursal = Seccion & {
  sucursal: {
    nombre: string
  } | null
}

export const seccionAdapter = {
  toApp: (row: SupabaseSeccionJoin): SeccionConSucursal => ({
    id: row.id,
    id_grado: row.id_grado,
    id_sucursal: row.id_sucursal,
    nombre: row.nombre,
    capacidad: row.capacidad ?? 0,
    estado: row.estado ?? true,
    created_at: row.created_at ?? '',
    updated_at: row.updated_at ?? '',
    sucursal: row.sucursal ? { nombre: row.sucursal.nombre } : null,
  }),

  toInsert: (idGrado: number, values: SeccionFormValues): InsertSeccion => ({
    id_grado: idGrado,
    id_sucursal: values.id_sucursal,
    nombre: values.nombre.trim(),
    capacidad: values.capacidad,
  }),

  toUpdate: (values: SeccionFormValues): UpdateSeccion => ({
    id_sucursal: values.id_sucursal,
    nombre: values.nombre.trim(),
    capacidad: values.capacidad,
    updated_at: new Date().toISOString(),
  }),
}
