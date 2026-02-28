import type { RolUsuario } from '@/constants/roles'

export interface Usuario {
  id: string
  id_auth: string
  id_rol: number
  id_colegio: number
  nombre: string
  apellido: string
  estado: boolean
  created_at: string
  rol: {
    id: number
    nombre: RolUsuario
    nivel_alcance: 'COLEGIO' | 'SUCURSAL'
  }
  colegio: {
    id: number
    nombre: string
  }
  usuario_sucursal?: {
    id_sucursal: number
    sucursal: {
      id: number
      nombre: string
    }
  }[]
}

export interface AuthState {
  usuario: Usuario | null
  loading: boolean
  error: string | null
}
