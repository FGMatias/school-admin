import type { GradoFormValues } from '@/schemas/grado.schema'
import type { Grado } from '@/types/grado.types'
import { Database } from '@/types/supabase'

type FilaGrado = Database['public']['Tables']['grado']['Row']
type InsertGrado = Database['public']['Tables']['grado']['Insert']
type UpdateGrado = Database['public']['Tables']['grado']['Update']

export const gradoAdapter = {
  toApp: (row: FilaGrado): Grado => ({
    id: row.id,
    id_colegio: row.id_colegio,
    nivel: row.nivel as Grado['nivel'],
    nombre: row.nombre,
    estado: row.estado ?? true,
    created_at: row.created_at ?? '',
    updated_at: row.updated_at ?? '',
  }),

  toInsert: (idColegio: number, values: GradoFormValues): InsertGrado => ({
    id_colegio: idColegio,
    nombre: values.nombre.trim(),
    nivel: values.nivel as InsertGrado['nivel'],
  }),

  toUpdate: (values: GradoFormValues): UpdateGrado => ({
    nombre: values.nombre.trim(),
    nivel: values.nivel as UpdateGrado['nivel'],
    updated_at: new Date().toISOString(),
  }),
}
