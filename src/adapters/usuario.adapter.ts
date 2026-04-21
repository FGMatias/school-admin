import { Database } from '@/types/supabase'
import type { UsuarioAutenticado } from '@/types/usuario.types'

type FilaUsuario = Database['public']['Tables']['usuario']['Row']
type FilaRol = Database['public']['Tables']['rol']['Row']
type FilaColegio = Database['public']['Tables']['colegio']['Row']
type FilaSucursal = Database['public']['Tables']['sucursal']['Row']

export type UsuarioResponse = FilaUsuario & {
  rol: FilaRol
  colegio: FilaColegio
  usuario_sucursal: Array<{ sucursal: FilaSucursal }>
}

export const usuarioAdapter = {
  toApp: (data: UsuarioResponse): UsuarioAutenticado => {
    const sucursalAsignada = data.usuario_sucursal?.[0]?.sucursal
    return {
      id: data.id,
      id_auth: data.id_auth,
      id_rol: data.id_rol as 1 | 2,
      id_colegio: data.id_colegio,
      nombre: data.nombre,
      apellido: data.apellido,
      estado: data.estado ?? true,
      created_at: data.created_at ?? '',
      updated_at: data.updated_at ?? '',
      rol: {
        id: data.rol.id,
        nombre: data.rol.nombre,
        descripcion: data.rol.descripcion ?? '',
        nivel_alcance: data.rol.nivel_alcance,
        estado: data.rol.estado ?? true,
        created_at: data.rol.created_at ?? '',
        updated_at: data.rol.updated_at ?? '',
      },
      colegio: {
        id: data.colegio.id,
        nombre: data.colegio.nombre,
        ruc: data.colegio.ruc,
        direccion: data.colegio.direccion,
        estado: data.colegio.estado ?? true,
        created_at: data.colegio.created_at ?? '',
        updated_at: data.colegio.updated_at ?? '',
      },
      sucursal: sucursalAsignada
        ? {
            id: sucursalAsignada.id,
            id_colegio: sucursalAsignada.id_colegio,
            nombre: sucursalAsignada.nombre,
            direccion: sucursalAsignada.direccion,
            estado: sucursalAsignada.estado ?? true,
            created_at: sucursalAsignada.created_at ?? '',
            updated_at: sucursalAsignada.updated_at ?? '',
          }
        : null,
    }
  },
}
