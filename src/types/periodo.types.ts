export interface PeriodoAcademico {
  id: number
  id_colegio: number
  nombre: string
  anio: number
  fecha_inicio: string
  fecha_fin: string
  estado: boolean
  created_at: string
  updated_at: string
}

export interface PeriodoFiltros {
  busqueda: string
  estado: 'todos' | 'activo' | 'inactivo'
}

export type { PeriodoFormValues } from '@/schemas/periodo.schema'
