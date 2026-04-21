import { periodoAdapter } from '@/adapters/periodo.adapter'
import { supabase } from '@/lib/supabase'
import type { PeriodoFormValues } from '@/schemas/periodo.schema'
import type { PeriodoAcademico } from '@/types/periodo.types'

export const periodoService = {
  listar: async (idColegio: number): Promise<PeriodoAcademico[]> => {
    const { data, error } = await supabase
      .from('periodo_academico')
      .select('*')
      .eq('id_colegio', idColegio)
      .order('anio', { ascending: false })
      .order('fecha_inicio', { ascending: false })

    if (error) throw error
    if (!data) return []

    return data.map(periodoAdapter.toApp)
  },

  crear: async (idColegio: number, values: PeriodoFormValues): Promise<PeriodoAcademico> => {
    const payload = periodoAdapter.toInsert(idColegio, values)
    const { data, error } = await supabase
      .from('periodo_academico')
      .insert(payload)
      .select()
      .single()

    if (error) throw error
    return periodoAdapter.toApp(data)
  },

  editar: async (id: number, values: PeriodoFormValues): Promise<PeriodoAcademico> => {
    const payload = periodoAdapter.toUpdate(values)
    const { data, error } = await supabase
      .from('periodo_academico')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return periodoAdapter.toApp(data)
  },

  cambiarEstado: async (id: number, estado: boolean): Promise<void> => {
    const { error } = await supabase
      .from('periodo_academico')
      .update({ estado, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  },
}
