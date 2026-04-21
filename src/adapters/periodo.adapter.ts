import type { PeriodoFormValues } from '@/schemas/periodo.schema'
import type { PeriodoAcademico } from '@/types/periodo.types'
import { Database } from '@/types/supabase'

type FilaPeriodo = Database['public']['Tables']['periodo_academico']['Row']
type InsertPeriodo = Database['public']['Tables']['periodo_academico']['Insert']
type UpdatePeriodo = Database['public']['Tables']['periodo_academico']['Update']

export const periodoAdapter = {
  toApp: (row: FilaPeriodo): PeriodoAcademico => ({
    id: row.id,
    id_colegio: row.id_colegio,
    nombre: row.nombre,
    anio: row.anio,
    fecha_inicio: row.fecha_inicio,
    fecha_fin: row.fecha_fin,
    estado: row.estado ?? true,
    created_at: row.created_at ?? '',
    updated_at: row.updated_at ?? '',
  }),

  toInsert: (idColegio: number, values: PeriodoFormValues): InsertPeriodo => ({
    id_colegio: idColegio,
    nombre: values.nombre.trim(),
    anio: values.anio,
    fecha_inicio: values.fecha_inicio,
    fecha_fin: values.fecha_fin,
  }),

  toUpdate: (values: PeriodoFormValues): UpdatePeriodo => ({
    nombre: values.nombre.trim(),
    anio: values.anio,
    fecha_inicio: values.fecha_inicio,
    fecha_fin: values.fecha_fin,
    updated_at: new Date().toISOString(),
  }),
}
