export interface Sucursal {
  id: number
  id_colegio: number
  nombre: string
  direccion: string | null
  estado: boolean
  created_at: string
  updated_at: string
}

export interface AdminSucursal {
  id: string
  nombre: string
  apellido: string
  estado: boolean
}

export interface SucursalConAdmin extends Sucursal {
  administrador: AdminSucursal | null
}

export type { SucursalFormValues } from '@/schemas/sucursal.schema'

export interface SucursalFiltros {
  busqueda: string
  estado: 'todos' | 'activo' | 'inactivo'
}

export interface UsuarioDisponible {
  id: string
  nombre: string
  apellido: string
  estado: boolean
  rol: {
    nombre: string
  }
}
