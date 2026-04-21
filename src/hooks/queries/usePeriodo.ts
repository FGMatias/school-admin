import { useAuth } from '@/hooks/useAuth'
import type { PeriodoFormValues } from '@/schemas/periodo.schema'
import { periodoService } from '@/services/periodo.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const KEYS = {
  all: ['periodos'] as const,
  list: (idColegio: number) => [...KEYS.all, 'list', idColegio] as const,
}

export function usePeriodos() {
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
  const idColegio = usuario?.id_colegio ?? 0
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ values }: { values: PeriodoFormValues }) => {
      if (!usuario?.id_colegio) throw new Error('No se encontró el colegio del usuario')
      return periodoService.crear(idColegio, values)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Periodo académico creado', {
        description: 'El año escolar fue registrado correctamente.',
      })
    },
    onError: () => {
      toast.error('Error al crear', {
        description: 'No se pudo crear el periodo académico. Intenta nuevamente.',
      })
    },
  })
}

export function useEditarPeriodo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: PeriodoFormValues }) =>
      periodoService.editar(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success('Periodo académico actualizado', {
        description: 'Los cambios se guardaron correctamente.',
      })
    },
    onError: () => {
      toast.error('Error al actualizar', {
        description: 'Hubo un problema al guardar los cambios.',
      })
    },
  })
}

export function useToggleEstadoPeriodo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: boolean }) =>
      periodoService.cambiarEstado(id, estado),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: KEYS.all })
      toast.success(variables.estado ? 'Periodo habilitado' : 'Periodo inhabilitado', {
        description: 'El estado se actualizó correctamente.',
      })
    },
    onError: () => {
      toast.error('Error de actualización', {
        description: 'No se pudo cambiar el estado del periodo.',
      })
    },
  })
}
