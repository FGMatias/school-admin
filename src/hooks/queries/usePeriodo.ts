import { supabase } from '@/lib/supabase'
import { PeriodoAcademico, PeriodoFormValues } from '@/types/periodo.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../useAuth'

const KEYS = {
  all: ['periodos'] as const,
  list: (idColegio: number) => [...KEYS.all, 'list', idColegio] as const,
  detail: (id: number) => [...KEYS.all, 'detail', id] as const,
}

export function usePeriodo() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0

  return useQuery({
    queryKey: KEYS.list(idColegio),
    queryFn: async (): Promise<PeriodoAcademico[]> => {
      const { data, error } = await supabase
        .from('periodo_academico')
        .select('*')
        .eq('id_colegio', idColegio)
        .order('anio', { ascending: false })
        .order('fecha_inicio', { ascending: false })

      if (error) throw error

      return data ?? []
    },
    enabled: idColegio > 0,
  })
}

export function useCrearPeriodo() {
  const { usuario } = useAuth()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (values: PeriodoFormValues) => {
      const { data, error } = await supabase
        .from('periodo_academico')
        .insert({
          id_colegio: usuario!.id_colegio,
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}

export function useEditarPeriodo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, values }: { id: number; values: PeriodoFormValues }) => {
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}

export function useToggleEstadoPeriodo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, estado }: { id: number; estado: boolean }) => {
      const { error } = await supabase
        .from('periodo_academico')
        .update({ estado, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}
