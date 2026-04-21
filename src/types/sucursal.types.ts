import { AdminSucursal } from './usuario.types'

export interface Sucursal {
  id: number
  id_colegio: number
  nombre: string
  direccion: string | null
  estado: boolean
  created_at: string
  updated_at: string
}

export interface SucursalConAdmin extends Sucursal {
  administrador: AdminSucursal | null
}
