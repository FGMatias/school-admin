import { seccionAdapter, type SeccionConSucursal } from '@/adapters/seccion.adapter'
import { supabase } from '@/lib/supabase'
import type { SeccionFormValues } from '@/schemas/seccion.schema'

export const seccionService = {
  listarPorGrado: async (idGrado: number): Promise<SeccionConSucursal[]> => {
    const { data, error } = await supabase
      .from('seccion')
      .select(
        `
          *,
          sucursal (nombre)    
        `,
      )
      .eq('id_grado', idGrado)
      .order('created_at', { ascending: false })

    if (error) throw error
    if (!data) return []

    return data.map(seccionAdapter.toApp)
  },

  crear: async (idGrado: number, values: SeccionFormValues): Promise<SeccionConSucursal> => {
    const payload = seccionAdapter.toInsert(idGrado, values)
    const { data, error } = await supabase
      .from('seccion')
      .insert(payload)
      .select(
        `
          *,  
          sucursal (nombre)    
        `,
      )
      .single()

    if (error) throw error
    return seccionAdapter.toApp(data)
  },

  editar: async (id: number, values: SeccionFormValues): Promise<SeccionConSucursal> => {
    const payload = seccionAdapter.toUpdate(values)
    const { data, error } = await supabase
      .from('seccion')
      .update(payload)
      .eq('id', id)
      .select(
        `
          *,
          sucursal (nombre)    
        `,
      )
      .single()

    if (error) throw error
    return seccionAdapter.toApp(data)
  },

  cambiarEstado: async (id: number, estado: boolean): Promise<void> => {
    const { error } = await supabase
      .from('seccion')
      .update({ estado, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  },
}
