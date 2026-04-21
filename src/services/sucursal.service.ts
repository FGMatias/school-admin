import { sucursalAdapter, type SucursalRpcResponse } from '@/adapters/sucursal.adapter'
import { supabase } from '@/lib/supabase'
import type { AsignarAdminFormValues, SucursalFormValues } from '@/schemas/sucursal.schema'
import { Sucursal, SucursalConAdmin } from '@/types/sucursal.types'

export const sucursalService = {
  listar: async (idColegio: number): Promise<SucursalConAdmin[]> => {
    const { data, error } = await supabase.rpc('listar_sucursales', {
      p_id_colegio: idColegio,
    })

    if (error) throw error
    if (!data) return []

    return (data as unknown as SucursalRpcResponse[]).map(sucursalAdapter.toApp)
  },

  crear: async (idColegio: number, values: SucursalFormValues): Promise<Sucursal> => {
    const payload = sucursalAdapter.toCreate(idColegio, values)
    const { data, error } = await supabase.from('sucursal').insert(payload).select().single()

    if (error) throw error
    return data
  },

  editar: async (id: number, values: SucursalFormValues): Promise<Sucursal> => {
    const payload = sucursalAdapter.toUpdate(values)
    const { data, error } = await supabase
      .from('sucursal')
      .update(payload)
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
    const payload = sucursalAdapter.toAssignAdmin(idSucursal, idColegio, values)
    const { error } = await supabase.rpc('crear_admin_sucursal', payload)

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
