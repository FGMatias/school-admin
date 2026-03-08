import { supabase } from '@/lib/supabase'
import type { PeriodoAcademico, PeriodoFormValues } from '@/types/periodo.types'

export const periodoService = {
  listar: async (idColegio: number): Promise<PeriodoAcademico[]> => {
    const { data, error } = await supabase
      .from('periodo_academico')
      .select('*')
      .eq('id_colegio', idColegio)
      .order('anio', { ascending: false })
      .order('fecha_inicio', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  crear: async (idColegio: number, values: PeriodoFormValues): Promise<PeriodoAcademico> => {
    const { data, error } = await supabase
      .from('periodo_academico')
      .insert({
        id_colegio: idColegio,
        nombre: values.nombre.trim(),
        anio: values.anio,
        fecha_inicio: values.fecha_inicio,
        fecha_fin: values.fecha_fin,
      })
      .select()
      .single()

    if (error) throw error
    return data as PeriodoAcademico
  },

  editar: async (id: number, values: PeriodoFormValues): Promise<PeriodoAcademico> => {
    const { data, error } = await supabase
      .from('periodo_academico')
      .update({
        nombre: values.nombre.trim(),
        anio: values.anio,
        fecha_inicio: values.fecha_inicio,
        fecha_fin: values.fecha_fin,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as PeriodoAcademico
  },

  cambiarEstado: async (id: number, estado: boolean): Promise<void> => {
    const { error } = await supabase
      .from('periodo_academico')
      .update({ estado, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  },
}
