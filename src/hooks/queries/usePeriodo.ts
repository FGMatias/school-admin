import { useAuth } from '@/hooks/useAuth'
import { periodoService } from '@/services/periodo.service'
import type { PeriodoFormValues } from '@/types/periodo.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const KEYS = {
  all: ['periodos'] as const,
  list: (idColegio: number) => [...KEYS.all, 'list', idColegio] as const,
}

export function usePeriodo() {
  const { usuario } = useAuth()
  const idColegio = usuario?.id_colegio ?? 0

  return useQuery({
    queryKey: KEYS.list(idColegio),
    queryFn: () => periodoService.listar(idColegio),
    enabled: idColegio > 0,
  })
}

export function useCrearPeriodo() {
  const { usuario } = useAuth()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ values }: { values: PeriodoFormValues }) => {
      if (!usuario?.id_colegio) {
        throw new Error('No se encontró el colegio del usuario activo')
      }
      return periodoService.crear(usuario.id_colegio, values)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  })
}

export function useEditarPeriodo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: PeriodoFormValues }) =>
      periodoService.editar(id, values),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  })
}

export function useToggleEstadoPeriodo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: boolean }) =>
      periodoService.cambiarEstado(id, estado),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  })
}
