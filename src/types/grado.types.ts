import { Nivel } from '@/constants/nivel'
import { Seccion } from './seccion.types'

export interface Grado {
  id: number
  id_colegio: number
  nivel: Nivel
  nombre: string
  estado: boolean
  created_at: string
  updated_at: string
}

export interface GradoConSecciones extends Grado {
  secciones: Seccion[]
}
