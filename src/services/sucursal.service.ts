import { supabase } from '@/lib/supabase'
import {
  AsignarAdminFormValues,
  Sucursal,
  SucursalConAdmin,
  SucursalFormValues,
} from '@/types/sucursal.types'

export const sucursalService = {
  listar: async (idColegio: number): Promise<SucursalConAdmin[]> => {
    const { data, error } = await supabase.rpc('listar_sucursales', {
      p_id_colegio: idColegio,
    })

    if (error) throw error
    if (!data) return []

    return (data as any[]).map((row) => ({
      id: row.id,
      id_colegio: row.id_colegio,
      nombre: row.nombre,
      direccion: row.direccion,
      estado: row.estado,
      created_at: row.created_at,
      updated_at: row.updated_at,
      administrador: row.admin_id
        ? {
            id: row.admin_id,
            nombre: row.admin_nombre,
            apellido: row.admin_apellido,
            estado: row.admin_estado,
            correo: row.admin_correo ?? null,
          }
        : null,
    }))
  },

  crear: async (idColegio: number, values: SucursalFormValues): Promise<Sucursal> => {
    const { data, error } = await supabase
      .from('sucursal')
      .insert({
        id_colegio: idColegio,
        nombre: values.nombre.trim(),
        direccion: values.direccion.trim() || null,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  editar: async (id: number, values: SucursalFormValues): Promise<Sucursal> => {
    const { data, error } = await supabase
      .from('sucursal')
      .update({
        nombre: values.nombre.trim(),
        direccion: values.direccion.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return data
  },

  cambiarEstado: async (id: number, estado: boolean): Promise<void> => {
    const { error } = await supabase
      .from('sucursal')
      .update({ estado, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  },

  crearAdmin: async (
    idSucursal: number,
    idColegio: number,
    values: AsignarAdminFormValues,
  ): Promise<void> => {
    const { error } = await supabase.rpc('crear_admin_sucursal', {
      p_id_sucursal: idSucursal,
      p_id_colegio: idColegio,
      p_nombre: values.nombre.trim(),
      p_apellido: values.apellido.trim(),
      p_correo: values.correo.trim().toLowerCase(),
    })

    if (error) throw error
  },

  resetContrasena: async (idUsuario: string): Promise<void> => {
    const { error } = await supabase.rpc('reset_password_admin', {
      p_id_usuario: idUsuario,
    })

    if (error) throw error
  },

  quitarAdmin: async (idSucursal: number): Promise<void> => {
    const { error } = await supabase
      .from('usuario_sucursal')
      .update({ estado: false, updated_at: new Date().toISOString() })
      .eq('id_sucursal', idSucursal)
      .eq('estado', true)

    if (error) throw error
  },
}
