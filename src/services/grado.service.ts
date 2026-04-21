import { gradoAdapter } from '@/adapters/grado.adapter'
import { supabase } from '@/lib/supabase'
import type { GradoFormValues } from '@/schemas/grado.schema'
import type { Grado } from '@/types/grado.types'

export const gradoService = {
  listar: async (idColegio: number): Promise<Grado[]> => {
    const { data, error } = await supabase.from('grado').select('*').eq('id_colegio', idColegio)

    if (error) throw error
    if (!data) return []

    return data.map(gradoAdapter.toApp)
  },

  crear: async (idColegio: number, values: GradoFormValues): Promise<Grado> => {
    const payload = gradoAdapter.toInsert(idColegio, values)
    const { data, error } = await supabase.from('grado').insert(payload).select().single()

    if (error) throw error
    return gradoAdapter.toApp(data)
  },

  editar: async (id: number, values: GradoFormValues): Promise<Grado> => {
    const payload = gradoAdapter.toUpdate(values)
    const { data, error } = await supabase
      .from('grado')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return gradoAdapter.toApp(data)
  },

  cambiarEstado: async (id: number, estado: boolean): Promise<void> => {
    const { error } = await supabase
      .from('grado')
      .update({ estado, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  },
}
