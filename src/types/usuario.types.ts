import { RolUsuarioId } from '@/constants/roles'
import { Colegio } from './colegio.types'
import { Sucursal } from './sucursal.types'
import { Rol } from './rol.types'

export interface Usuario {
  id: string
  id_auth: string
  id_rol: RolUsuarioId
  id_colegio: number
  nombre: string
  apellido: string
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

export interface UsuarioAutenticado extends Usuario {
  rol: Rol
  colegio: Colegio
  sucursal: Sucursal | null
}
