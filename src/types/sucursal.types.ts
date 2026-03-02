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
  correo: string | null
  estado: boolean
}

export interface SucursalConAdmin extends Sucursal {
  administrador: AdminSucursal | null
}

export interface SucursalFiltros {
  busqueda: string
  estado: 'todos' | 'activo' | 'inactivo'
}

export type { AsignarAdminFormValues, SucursalFormValues } from '@/schemas/sucursal.schema'
