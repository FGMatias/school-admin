import { UsuarioAutenticado } from './usuario.types'

export interface AuthResponse {
  user: UsuarioAutenticado
  token: string
}

export interface AuthState {
  usuario: UsuarioAutenticado | null
  loading: boolean
  error: string | null
}
